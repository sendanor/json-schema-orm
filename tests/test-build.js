"use strict";

var build = require('../lib/build.js');
var assert = require('assert');

/** JSON Schema for testing */
var schema = JSON.parse(require('fs').readFileSync(__dirname + '/data/schema.json', {'encoding':'utf8'}));
var schema_orm = require('./data/orm.js');

/* */
describe('build', function(){

	it('should be function', function(){
		assert.strictEqual( typeof build, 'function' );
	});

	describe('orm', function(){
		var orm = build({'orm':orm, 'schema':schema});

		it('should be object', function(){
			assert.strictEqual( typeof orm, 'object' );
		});

		['Integer', 'Double', 'Boolean', 'Range', 'Time', 'Weekday', 'Price', 'Minutes', 'ID'].forEach(function(type_name) {
			describe('.'+type_name, function(){
				it('should be function', function(){
					assert.strictEqual( typeof orm[type_name], 'function' );
				});
			});
		});

		describe('new orm.Integer("1")', function() {
			var x = new orm.Integer("1");
			
			it('should be object', function(){
				assert.strictEqual( typeof x, 'object' );
			});

		});

	});

});

/* EOF */
