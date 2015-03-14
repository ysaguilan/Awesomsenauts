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
		var gameTimerManager = me.pool.pull("gameTimerManager", 0, 0, {});
		/*adds the variable gamemanager to game/screen*/
		me.game.world.addChild(gameTimerManager, 0); 

			/*variable that stores GameManager; placed at 0,0 cause it doesn't matter where it's placed*/
		var heroDeathManager = me.pool.pull("heroDeathManager", 0, 0, {});
		/*adds the variable gamemanager to game/screen*/
		me.game.world.addChild(heroDeathManager, 0); 

		var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {});
		/*adds the variable gamemanager to game/screen*/
		me.game.world.addChild(experienceManager, 0); 

		var spendGold = me.pool.pull("SpendGold", 0, 0, {});
		/*adds the variable gamemanager to game/screen*/
		me.game.world.addChild(spendGold, 0); 

		/*binds the right key for player movement or action*/
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.LEFT, "left");
		me.input.bindKey(me.input.KEY.SPACE, "jump");
		me.input.bindKey(me.input.KEY.A, "attack");
		me.input.bindKey(me.input.KEY.B, "buy");
		me.input.bindKey(me.input.KEY.Q, "skill");
		me.input.bindKey(me.input.KEY.W, "skill2");
		me.input.bindKey(me.input.KEY.E, "skill3");
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
