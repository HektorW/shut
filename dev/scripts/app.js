/** 
 *
 * First point for the app
 * Initialize Global components and creates a game
 * 
 */

define(['prefixer', 'game'], function(Prefixer, Game) {

	var game;


	function App() {}

	App.prototype.init = function() {
		Prefixer.prefixAll();
		
		this.game = new Game();
		
    return this;
	};

	return App;
});