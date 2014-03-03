define([], function() {

	var pow = Math.pow,
		sqrt = Math.sqrt,
		abs = Math.abs;


	function vecDistSq(x1, y1, x2, y2) {
		return pow(x1 - x2, 2) + pow(y1 - y2, 2);
	}

	function vecDist(x1, y1, x2, y2) {
		return sqrt(vecDistSq(x1, y1, x2, y2));
	}



	var Collisions = {


		collision: function(a, b) {
			var fn = this[a.type + '_' + b.type + '_collision'];
			if (fn) {
				return fn(a, b);
			}

			fn = this[b.type + '_' + a.type + '_collision'];
			if (fn) {
				return fn(b, a);
			}
			throw 'Collision between bounding types ' + a.type + ' and ' + b.type + ' is not supported';

		},


		circle_circle_collision: function(a, b) {
			return vecDistSq(a.x, a.y, b.x, b.y) > pow(a.radius + b.raiud, 2);
		},

		circle_rectangle_collision: function(circle, rect) {
			var circledist_x = abs(circle.x - rect.x);
			var circledist_y = abs(circle.y - rect.y);

			var half_w = rect.width / 2;
			var half_h = rect.height / 2;

			var r = circle.radius;

			if (circledist_x > (half_w / 2 + r)) return false;
			if (circledist_y > (half_h / 2 + r)) return false;

			if (circledist_x <= half_w) return true;
			if (circledist_y <= half_h) return true;

			var cornerDistSq = pow(circledist_x - half_w, 2) + pow(circledist_y - half_h, 2);

			return cornerDistSq <= pow(r, 2);
		},

		// static, not rotated
		rectangle_rectangle_collision: function(a, b) {
			return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
		}

	};

	return Collisions;

});