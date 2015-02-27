game.GameManager = Object.extend({
	init: function(x, y, settings){
		this.now = new Date().getTime();
		this.lastCreep = new Date();
		this.alwaysUpdate = true;
		this.paused = false;
	},

	update: function(){
		this.now = new Date().getTime();

		if(game.data.player.dead) {
			me.game.worldremoveChild(game.data.player)
			me.state.current().resetPlayer(10,0)
		}

		if (Math.round(this.now/1000)%10 === 0 && (this.now - this.lastCreep>= 100)) {
			game.data.gold += 1;
			console.log("current gold" + game.data.gold);
		};

		if (Math.round(this.now/ 1000)%10 === 0 && (this.now - this.lastCreep >= 100)) {
			this.lastCreep = this.now;{
			var creepe = me.pool.pull("EnemyCreep", 1000, 0 {});
			me.game.world.addChild(creepe, 5);
		};
		return true;
	}
	});