// Terms Aggregation
function TermsAggregation()
{
	var _name,
		_fieldName,
		_aggregations = [];

	this.getType = function()
	{
		return 'aggregation';
	};

	this.getInfo = function()
	{
		return {
			'name': 'Terms Aggregation',
			'text': 'The Terms Aggregation lists the different present values with their count',
			'url': 'https://www.elastic.co/guide/en/elasticsearch/reference/current/search-aggregations-bucket-terms-aggregation.html',
			'form': {
				'name': {
					'type': 'text',
					'required': true,
					'value': _name
				},
				'field name': {
					'type': 'text',
					'required': true,
					'value': _fieldName
				}
			}
		};
	};

	this.updateField = function(name, value)
	{
		switch(name) {
			case 'name':
				_name = value;
				break;
			case 'field name':
				_fieldName = value;
				break;
		}
	};

	this.getNestings = function()
	{
		return {
			'aggregations': {
				'type': 'aggregation',
				'multiple': true
			}
		};
	};

	this.addNesting = function(name, part)
	{
		if (name == 'aggregations') {
			_aggregations.push(part);
		}
	};

	this.removeNesting = function(name, part)
	{
		if (name == 'aggregations') {
			var index = _aggregations.indexOf(part);
			if (index > -1) {
				_aggregations.splice(index, 1);
			}
		}
	};

	this.isSetUp = function()
	{
		return _name && _fieldName;
	};

	this.canRun = function()
	{
		var allOk = this.isSetUp();

		for (var i = 0; i < _aggregations.length; i++) {
			if (!_aggregations[ i ].canRun()) {
				return false;
			}
		}

		return allOk;
	};

	this.getName = function()
	{
		return _name;
	};

	this.getName = function()
	{
		return _name;
	};

	this.toJson = function()
	{
		var jsonObject = {
			"terms": {
				"field": _fieldName
			}
		};

		if (_aggregations.length > 0) {
			jsonObject.aggregations = {};

			for (var i = 0; i < _aggregations.length; i++) {
				jsonObject.aggregations[ _aggregations[i].getName() ] = _aggregations[i].toJson();
			}
		}

		return jsonObject;
	}
}
