json-schema-orm
===============

Object-relational mapping from JSON Schema data.

It's not perfect yet, but already working.

See [test data files](https://github.com/Sendanor/json-schema-orm/tree/master/tests/data) and how we use them in [our tests](https://github.com/Sendanor/json-schema-orm/blob/master/tests/test-build.js).

Basic usage
-----------

Let's say you have JavaScript/JSON objects like these:

```json
{
	"name": "Test data",
	"date": "2013-09-02T05:48:41",
	"points": [
		{"x":10, "y":20},
		{"x":20, "y":30},
		{"x":30, "y":40}
	]
}
```

And [JSON schema](2013-09-02T05:48:41) for that data:

```jsonschema
{
	"title": "Point Collection JSON Schema",
	"oneOf": [
		{ "$ref": "#/definitions/PointCollection" }
	],
	"definitions": {
		"PointCollection": {
			"type": "object",
			"properties": {
				"name": { "type": "string" },
				"date": { "$ref": "#/definitions/Date" },
				"points": {
					"type": "array",
					"items": { "$ref": "#/definitions/Point" },
					"minItems": 1
				}
			},
			"required": ["points"]
		},
		"Date": {
			"type": "string",
			"pattern": "^[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$"
		},
		"Point": {
			"type": "object",
			"properties": {
				"x": { "type": "number" },
				"y": { "type": "number" }
			}
		}
	}
}
```

Because everything cannot be done automatically you can create helper file to define specializations:

```javascript
module.exports = {
	'constructors': {
		'Date': function(opts) {
			return new Date(opts);
		}
	},
	'methods': {
		'Point': function(Point, types) {
			Point.prototype.toString = function() {
				return '[object Point('+ this.x + ',' + this.y + ')]';
			};
		},
		'PointCollection': function(PointCollection, types) {
			PointCollection.prototype.push = function(point) {
				/* ... */
			};
		}
	}
};
```

Then you can use `json-schema-orm` to build constructors:

```javascript
var schema = JSON.parse(fs.readFileSync(__dirname + '/schema.json', {'encoding':'utf8'}));
var schema_orm = require('./orm.js');
var orm = require('json-schema-orm').build({'orm': schema_orm, 'schema':schema});

var PointCollection = orm.PointCollection;
var Point = orm.Point;
```

After that the constructors can be used the same way as usually:

```javascript
var collection = new PointCollection({   
    "name": "Test data",
    "date": "2013-09-02T05:48:41",
    "points": [
        {"x":10, "y":20},  
        {"x":20, "y":30},
        {"x":30, "y":40}
	]
});

var point = Point({x:100,y:200});
console.log( point.x ); // 100
console.log( point.y ); // 200
collection.push(point);
```

License
-------

The MIT license, see [LICENSE](https://raw.github.com/Sendanor/json-schema-orm/master/LICENSE).
