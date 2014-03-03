define([
	'classy',
	'util/Color'
], function(
	Classy,
	Color
) {

	var Animation = Classy.extend({

		__init__: function() {
			this.animations = [];
		},


		update: function() {

		}

	});

	return new Animation();
});