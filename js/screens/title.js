game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {

	me.game.world.addChild(new me.Sprite(50, 50, me.loader.getImage('title-screen')), -10);


	me.game.world.addChild(new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [270, 240,  300, 50]);
			this.font = new me.Font("Arial", 46, "white");
			me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
		},

	draw: function(renderer) {
			this.font.draw(renderer.getContext(), "Awsomenauts", 450, 130);
			this.font.draw(renderer.getContext(), "Start A New Game", this.pos.x, this.pos.y);
	},

	update: function(dt) {
		return true;
	},

	newGame: function() {
		me.input.releasePointerEvent('pointerdown', this);

		me.state.change(me.state.NEW);
	}

	})));

	me.game.world.addChild(new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [380, 330,  250, 50]);
			this.font = new me.Font("Arial", 46, "white");
			me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
		},

	draw: function(renderer) {
			this.font.draw(renderer.getContext(), "Continue", this.pos.x, this.pos.y);
	},

	update: function(dt) {
		return true;
	},

	newGame: function() {


		me.input.releasePointerEvent('pointerdown', this);

		me.state.change(me.state.LOAD);
	}

	})));
	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
