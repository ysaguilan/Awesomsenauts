game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

		me.levelDirector.loadLevel("level01");

		this.resetPlayer(0, 420);

		/*variable that stores GameManager; placed at 0,0 cause it doesn't matter where it's placed*/
		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		/*adds the variable gamemanager to game/screen*/
		me.game.world.addChild(gamemanager, 0); 

		/*binds the right key for player movement right*/
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	},
	
		resetPlayer: function(x, y){
		/*stores a pulled instance of the player*/
		game.data.player = me.pool.pull("orc", x, y, {});
		/*adds player to world*/
		me.game.world.addChild(game.data.player, 5);
		}
});
