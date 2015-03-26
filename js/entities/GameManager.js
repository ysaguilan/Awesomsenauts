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

game.HeroDeathManager = Object.extend({
	init: function(x, y, settings) {
	/*updates for changes*/
	this.alwaysUpdate = true;
	},

	update: function() {
		if(game.data.player.dead) {
		me.game.world.removeChild(game.data.player);
		me.state.current().resetPlayer(10, 0);
		}
		return true;
	}
});

game.ExperienceManager = Object.extend({
	init: function(x, y, settings) {
		this.alwaysUpdate = true;
		this.gameover = false;
	},
	update: function() {
		if (game.data.win === true && !this.gameover) {
			this.gameOver(true);
		}
		else if(game.data.win === false && !this.gameover) {
			this.gameOver(false);
		}
	
		return true;
	},
	gameOver: function(win) {
		if (win) {
			game.data.exp += 10;
		}
		else {
			game.data.exp += 1;
		}
	
		this.gameOver = true;
		me.save.exp = game.data.exp;
		//testing purpose only
		me.save.exp2 = 4;
	}
});

game.SpendGold = Object.extend({
	init: function(x, y, settings) {
		this.now = new Date().getTime();
		/*keeps track of the last time a creep has been made*/
		this.lastBuy = new Date().getTime();
		this.paused = false;
		/*updates for changes*/
		this.alwaysUpdate = true;
		this.updateWhenPaused = true;
		this.buying = false;
	},
	update: function() {
		this.now = new Date().getTime();
		if (me.input.isKeyPressed("buy") && this.now - this.lastBuy >= 1000) {
			this.lastBuy = this.now;
			if (!this.buying) {
				this.startBuying();
			}
			else {
				this.stopBuying();
			}
		}

		return true;
	},
	startBuying: function() {
		this.buying = true;
		me.state.pause(me.state.PLAY);
		game.data.pausePos = me.game.viewport.localToWorld(0, 0);
		game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage('gold-screen'));
		game.data.buyscreen.updateWhenPaused = true;
		game.data.buyscreen.setOpacity(0.8);
		me.game.world.addChild(game.data.buyscreen, 34);
		game.data.player.body.setVelocity(0, 0);
		me.state.pause(me.state.PLAY);
		me.input.bindKey(me.input.KEY.F1, "F1", true);
		me.input.bindKey(me.input.KEY.F2, "F2", true);
		me.input.bindKey(me.input.KEY.F3, "F3", true);
		me.input.bindKey(me.input.KEY.F4, "F4", true);
		me.input.bindKey(me.input.KEY.F5, "F5", true);
		me.input.bindKey(me.input.KEY.F6, "F6", true);
		this.setBuyText();
	},

	setBuyText: function() {
		game.data.buytext = new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y,  300, 50]);
			this.font = new me.Font("Arial", 26, "white");
			this.updateWhenPaused = true;
			this.alwaysUpdate = true;
		},
 
	draw: function(renderer) {

		this.font.draw(renderer.getContext(), "Press F1 - F6 To Spend, B To Exit. Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
		this.font.draw(renderer.getContext(), "Skill1: Increases Damage. Current Level: " + game.data.skill1 + " Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
		this.font.draw(renderer.getContext(), "Skill2: Run Faster "+ game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y, this.pos.x, this.pos.y + 80);
		this.font.draw(renderer.getContext(), "Skill3: Increase Health "+ game.data.skill3 + " Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
		this.font.draw(renderer.getContext(), "Q Ability: Speed Burst " + game.data.ability1 +  " Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
		this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health " + game.data.ability2 + " Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200, this.pos.x, this.pos.y + 210);
		this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear" + game.data.ability3 + " Cost: " +((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240, this.pos.x, this.pos.y + 250);


	},

	}));
me.game.world.addChild(game.data.buytext, 35);

	},
	stopBuying: function() {
		this.buying = false;
		me.state.resume(me.state.PLAY);
		game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
		me.game.world.removeChild(game.data.buyscreen);
		
		me.input.unbindKey(me.input.KEY.F1, "F1", true);
		me.input.unbindKey(me.input.KEY.F2, "F2", true);
		me.input.unbindKey(me.input.KEY.F3, "F3", true);
		me.input.unbindKey(me.input.KEY.F4, "F4", true);
		me.input.unbindKey(me.input.KEY.F5, "F5", true);
		me.input.unbindKey(me.input.KEY.F6, "F6", true);
		me.game.world.removeChild(game.data.buytext);
	}
});