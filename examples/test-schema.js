"use strict";
module.exports = {
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
			"pattern": "^[0-9]{4}\\-[0-9]{2}\\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}Z$"
		},
		"Point": {
			"type": "object",
			"properties": {
				"x": { "type": "number" },
				"y": { "type": "number" }
			}
		}
	}
};
