/*runs all the timers and occurances that happened that are not really inside of the PlayerEntity, BaseEntities, or EnemyCreep Entites 
wont appear on the screen its an object*/
game.GameTimerManager = Object.extend ({
	/*constructor function; asks for three parameters*/
	init: function(x, y, settings) {
		/**/
		this.now = new Date().getTime();
		/*keeps track of the last time a creep has been made*/
		this.lastCreep = new Date().getTime();

		this.paused = false;
		/*updates for changes*/
		this.alwaysUpdate = true;
	},
	update: function() {
		/*update function keeps track of timer*/
		this.now = new Date().getTime();
		this.goldTimerCheck();
		this.creepTimerCheck();
		/*returns all of this to true*/
		return true;
	},

	goldTimerCheck: function() {
		if (Math.round(this.now/1000)%20 === 0 && (this.now - this.lastCreep >= 1000)) {
		game.data.gold += game.data.exp1 + 1;
		console.log("Current gold:" + game.data.gold)
		}
	},

	creepTimerCheck: function(){	
		/*Math.round checks if we have a multiple of ten*/
		/*checks what ever time stored in this.now divide by 1000; if its exactly on a second rounds it on a second*/
		/*% = mod; checks to see if we got a multiple of 10*/
		/*this.now - this.lastCreep >= 1000 = makes sure it not spawning over and over again checks if its been greater than a second before 
		spawning again*/
		if (Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep >= 1000)) {
			/*updates Creeps timer to this.now*/
			this.lastCreep = this.now;
			/*variable that stores, me.pool.pull("EnemyCreep", 1000, 0, {});*/
			var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
			/*adds var creepe */
			me.game.world.addChild(creepe, 5);
		}
	},

});
