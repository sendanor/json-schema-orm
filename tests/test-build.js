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
		var orm = build({'orm': schema_orm, 'schema':schema});

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

		['Integer', 'ID', 'Weekday', 'Minutes'].forEach(function(type_name) {
			describe('new orm.'+type_name+'("1")', function() {
				var x = new orm[type_name]("1");
			
				it('should be object', function(){
					assert.strictEqual( typeof x, 'object' );
				});
				
				describe('.valueOf()', function() {
					it('should be number', function(){
						assert.strictEqual( typeof x.valueOf(), 'number' );
					});
					it('should be 1', function(){
						assert.strictEqual( x.valueOf(), 1 );
					});
				});

				describe('.toString()', function() {
					it('should be string', function(){
						assert.strictEqual( typeof x.toString(), 'string' );
					});
					it('should be "1"', function(){
						assert.strictEqual( x.toString(), "1" );
					});
				});

			});
		});

		['Double', 'Range', 'Time', 'Price'].forEach(function(type_name) {
			describe('new orm.'+type_name+'("1.5")', function() {
				var x = new orm[type_name]("1.5");
			
				it('should be object', function(){
					assert.strictEqual( typeof x, 'object' );
				});
				
				describe('.valueOf()', function() {
					it('should be number', function(){
						assert.strictEqual( typeof x.valueOf(), 'number' );
					});
					it('should be 1.5', function(){
						assert.strictEqual( x.valueOf(), 1.5 );
					});
				});

				describe('.toString()', function() {
					it('should be string', function(){
						assert.strictEqual( typeof x.toString(), 'string' );
					});
					it('should be "1.5"', function(){
						assert.strictEqual( x.toString(), "1.5" );
					});
				});

			});
		});

		[{value:1}, {value:'1',should_be:true}, {value:0}, {value:'0',should_be:false}, {value:true}, {value:false}].forEach(function(test) {
			var value = test.value;
			var should_be = (test.should_be === undefined) ? (value ? true : false) : test.should_be;
			['Boolean'].forEach(function(type_name) {

				describe('new orm.'+type_name+'('+JSON.stringify(value)+')', function() {
					var x = new orm[type_name](value);
					
					it('should be object', function(){
						assert.strictEqual( typeof x, 'object' );
					});
					
					describe('.valueOf()', function() {
						it('should be number', function(){
							assert.strictEqual( typeof x.valueOf(), 'boolean' );
						});
						it('should be ' + should_be, function(){
							assert.strictEqual( x.valueOf(), should_be );
						});
					});

					describe('.toString()', function() {
						it('should be string', function(){
							assert.strictEqual( typeof x.toString(), 'string' );
						});
						it('should be "' + should_be + '"', function(){
							assert.strictEqual( x.toString(), ''+should_be );
						});
					});

				});

			});
		});


			describe('new orm.Point({x:10,y:20})', function() {
				var p = new orm.Point({x:10,y:20});
			
				it('should be object', function(){
					assert.strictEqual( typeof p, 'object' );
				});
				
				describe('.valueOf()', function() {
					it('should be object', function(){
						assert.strictEqual( typeof p.valueOf(), 'object' );
					});
					it('should be {x:10,y:20}', function(){
						assert.deepEqual( p.valueOf(), {x:10,y:20} );
					});
				});

				describe('.toString()', function() {
					it('should be string', function(){
						assert.strictEqual( typeof p.toString(), 'string' );
					});
					it('should be "[object Point(10,20)]"', function(){
						assert.strictEqual( p.toString(), "[object Point(10,20)]" );
					});
				});

				describe('.x', function() {
					it('should be number', function(){
						assert.strictEqual( typeof p.x, 'number' );
					});
					it('should be 10"', function(){
						assert.strictEqual( p.x, 10 );
					});
				});

				describe('.y', function() {
					it('should be number', function(){
						assert.strictEqual( typeof p.y, 'number' );
					});
					it('should be 20"', function(){
						assert.strictEqual( p.y, 20 );
					});
				});

			});

	});

});

/* EOF */
