"use strict";

/* Convert JSON files to JavaScript Object Constructors using JSON Schema */

//var tv4 = require('tv4');
var is = require('nor-is');
var util = require('util');

/** Base constructor */
function SchemaObject(opts) {
	if(!(this instanceof SchemaObject)) {
		return new SchemaObject(opts);
	}
	//if(!schema) { throw new TypeError("schema not set"); }

	// Validate using schema
	//var result = tv4.validateResult(opts, schema);
	//if(!result.valid) { throw new TypeError("Options are not valid"); }

	//this._schema = schema;
	this._data = opts;
}

/** Set the primitive value of the object */
SchemaObject.prototype._setValueOf = function(data) {
	this._data = data;
	return this;
};

/** Get the primitive value of the object */
SchemaObject.prototype.valueOf = function() {
	return this._data;
};

/** Get the string presentation of the object */
SchemaObject.prototype.toString = function() {
	return ''+this._data;
};

/** Validates the object
 * @returns {object} An object like `{"valid": false, "error": {...}, "missing": [...]}`
 */
SchemaObject.validate = function(self, schema) {
	return require('tv4').validateResult( (self instanceof SchemaObject) ? self.valueOf() : self, schema);
};

/** Returns true if the object is valid, otherwise false.
 * @returns {boolean} Result of validation.
 */
SchemaObject.valid = function(self, schema) {
	return SchemaObject.validate(self, schema).valid;
};

// Exports
module.exports = SchemaObject;

/* EOF */
