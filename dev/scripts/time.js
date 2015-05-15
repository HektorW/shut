define(['classy'], function(Classy) {

	var Time = Classy.extend({

		lastTime: 0.0,
		elapsed: 0.0, // seconds  (0.016)
		elapsedMs: 0.0,
		sinceStart: 0.0,

		__init__: function() {},

		start: function() {
			this.lastTime = this.now();
		},
		pause: function() {
			this.pauseTime = this.now();
		},

		update: function() {
			var t = performance.now();

			this.time = t;
			this.elapsedMs = t - this.lastTime;
			this.elapsed = this.elapsedMs / 1000.0;
			this.lastTime = t;

			this.sinceStart += this.elapsed;

		},

		now: function() {
			return performance.now();
		}

	});

	return Time;
});