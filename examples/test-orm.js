"use strict";
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
