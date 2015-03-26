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
		this.checkBuyKeys();

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
		this.font.draw(renderer.getContext(), "Skill2: Run Faster "+ game.data.skill2 + " Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
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
	},

	checkBuyKeys: function() {
		if (me.input.isKeyPressed("F1")) {
			if (this.checkCost(1)) {
				this.makePurchase(1);
			}
		}
		else if (me.input.isKeyPressed("F2")) {
			if (this.checkCost(2)) {
				this.makePurchase(2);
			}
		}
		else if (me.input.isKeyPressed("F3")) {
			if (this.checkCost(3)) {
				this.makePurchase(3);
			}
		}
		else if (me.input.isKeyPressed("F4")) {
			if (this.checkCost(4)) {
				this.makePurchase(4);
			}
		}
		else if (me.input.isKeyPressed("F5")) {
			if (this.checkCost(5)) {
				this.makePurchase(5);
			}
		}
		else if (me.input.isKeyPressed("F6")) {
			if (this.checkCost(6)) {
				this.makePurchase(6);
			}
		}
	},

	checkCost: function(skill) {
		if (skill === 1 && (game.data.gold >= ((game.data.skill1+1)*10))) {
			return true;
		}
		else if (skill === 2 && (game.data.gold >= ((game.data.skill2+1)*10))) {
			return true;
		}
		else if (skill === 3 && (game.data.gold >= ((game.data.skill3+1)*10))) {
			return true;
		}
		else if (skill === 4 && (game.data.gold >= ((game.data.ability1+1)*10))) {
			return true;
		}
		else if (skill === 5 && (game.data.gold >= ((game.data.ability2+1)*10))) {
			return true;
		}
		else if (skill === 6 && (game.data.gold >= ((game.data.ability3+1)*10))) {
			return true;
		}

		else {
			return false;
		}
	},

	makePurchase: function(skill) {
		if(skill === 1) {
			game.data.gold -= ((game.data.skill1 + 1)* 10);
			game.data.skill += 1;
			game.data.playerAttack += 1;
		}
		else if(skill === 2) {
			game.data.gold -= ((game.data.skill2 + 1)* 10);
			game.data.skill += 1;
		}
		else if (skill === 3) {
			game.data.gold -= ((game.data.skill3 + 1)* 10);
			game.data.skill += 1;
		}
		else if (skill === 4) {
			game.data.gold -= ((game.data.ability1 + 1)* 10);
			game.data.ability1 += 1;
		}
		else if (skill === 5) {
			game.data.gold -= ((game.data.ability2 + 1)* 10);
			game.data.ability2 += 1;
		}
		else if (skill === 6) {
			game.data.gold -= ((game.data.ability3 + 1)* 10);
			game.data.ability3 += 1;

		}
	}
});