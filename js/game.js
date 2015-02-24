
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0,
		enemyBaseHealth: 10,
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		orcBaseDamage: 10,
		orcBaseHealth: 100,
		orcBaseSpeed: 3,
		orcBaseDefense: 0, 
		playerAttackTimer: 1000,
		creepAttackTimer: 1000,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		GameManager: "",
		player:""
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		/*adds orc player to pool*/ /*true allows us to make many instances of the class*/
		me.pool.register("orc", game.PlayerEntity, true);
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		me.pool.register("GameManager", game.GameManager);
		
		//me.state.set(me.state.MENU, new game.TitleScreen());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};
