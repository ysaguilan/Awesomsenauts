game.LoadProfile = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {

	me.game.world.addChild(new me.Sprite(50, 50, me.loader.getImage('load-screen')), -10);
	document.getElementById('input').style.visibility = "hidden";
	document.getElementById('load').style.visibility = "hidden";

	me.input.unbindKey(me.input.KEY.B);
	me.input.unbindKey(me.input.KEY.Q);
	me.input.unbindKey(me.input.KEY.E);
	me.input.unbindKey(me.input.KEY.W);
	me.input.unbindKey(me.input.KEY.A);
	var exp1cost = ((game.data.exp1 + 1) * 10);
	


	me.game.world.addChild(new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [10, 10,  300, 50]);
			this.font = new me.Font("Arial", 26, "white");
		},
 
	draw: function(renderer) {

		this.font.draw(renderer.getContext(), "Enter Your Username And Password", this.pos.x, this.pos.y);

	},

	})));



	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	document.getElementById('input').style.visibility = "hidden";
	document.getElementById('register').style.visibility = "hidden";
	}
});
