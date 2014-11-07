
"use strict";

var debug = require('nor-debug');

var orm = require('json-schema-orm').build({
	'orm': require('./test-orm.js'),
	'schema': require('./test-schema.js')
});

var PointCollection = orm.PointCollection;
var Point = orm.Point;

debug.assert(PointCollection).is('function');
debug.assert(Point).is('function');

var collection = new PointCollection({
	"name": "Test data",
	"date": "2013-09-02T05:48:41Z",
	"points": [
		{"x":10, "y":20},
		{"x":20, "y":30},
		{"x":30, "y":40}
	]
});

debug.assert(collection).is('object');
debug.assert(collection.name).is('string').equals("Test data");
debug.assert(collection.date).is('date');
debug.assert( collection.date.toISOString() ).is('date_string').equals('2013-09-02T05:48:41Z');

debug.assert(collection.points).is('array').length(3);

debug.assert(collection.points[0]).is('object');
debug.assert(collection.points[0].x).is('number').equals(10);
debug.assert(collection.points[0].y).is('number').equals(20);

debug.assert(collection.points[1]).is('object');
debug.assert(collection.points[1].x).is('number').equals(20);
debug.assert(collection.points[1].y).is('number').equals(30);

debug.assert(collection.points[2]).is('object');
debug.assert(collection.points[2].x).is('number').equals(30);
debug.assert(collection.points[2].y).is('number').equals(40);

var point = Point({x:100,y:200});
debug.assert(point).is('object');
debug.assert(point.x).is('number').equals(100);
debug.assert(point.y).is('number').equals(200);

debug.assert(collection.push).is('function');

collection.push(point);

debug.assert(collection.points).is('array').length(4);
debug.assert(collection.points[3]).is('object');
debug.assert(collection.points[3].x).is('number').equals(100);
debug.assert(collection.points[3].y).is('number').equals(200);
