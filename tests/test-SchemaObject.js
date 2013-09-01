"use strict";

var SchemaObject = require('../lib/SchemaObject.js');
var assert = require('assert');

/* */
describe('SchemaObject', function(){

	it('should be function', function(){
		assert.strictEqual( typeof SchemaObject, 'function' );
	});

	// SchemaObject.validate()
	describe('.validate()', function(){
		it('should be function', function(){
			assert.strictEqual( typeof SchemaObject.validate, 'function' );
		});
	});

	// SchemaObject.valid()
	describe('.valid()', function(){
		it('should be function', function(){
			assert.strictEqual( typeof SchemaObject.valid, 'function' );
		});
	});

});

/* EOF */
