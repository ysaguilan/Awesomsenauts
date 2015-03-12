game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {

	me.game.world.addChild(new me.Sprite(50, 50, me.loader.getImage('exp-screen')), -10);


	me.game.world.addChild(new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [10, 10,  300, 50]);
			this.font = new me.Font("Arial", 46, "white");
		},

	draw: function(renderer) {

			this.font.draw(renderer.getContext(), "Press F1 - F4 To Spend, F5 To Skip", this.pos.x, this.pos.y);
			this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
			this.font.draw(renderer.getContext(), "F1: Increase Gold Production" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 100);
			this.font.draw(renderer.getContext(), "F2: Add Starting Gold" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 150);
			this.font.draw(renderer.getContext(), "F3: Increase Attack Damage" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
			this.font.draw(renderer.getContext(), "F4: Increase Health" + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);

	},

	})));


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

	}
});
