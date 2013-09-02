/* User defined customizations for JSON Schema based ORM */
module.exports = {
	'constructors': {
		'Integer': function(opts) {
			return parseInt(opts, 10);
		},
		'Double': function(opts) {
			return parseFloat(opts);
		},
		'Boolean': function(opts) {
			if(typeof opts === 'boolean') { return opts; }
			if(typeof opts === 'number') { return (opts === 0) ? false : true; }
			return (''+opts === '0') ? false : true;
		}
	},
	'methods': {
		'Point': function(Point, types) {
			Point.prototype.toString = function() {
				return '[object Point('+ this.x + ',' + this.y + ')]';
			};
		}
	}
};
/* EOF */
