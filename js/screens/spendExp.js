game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function() {

	me.game.world.addChild(new me.Sprite(50, 50, me.loader.getImage('exp-screen')), -10);

	me.input.bindKey(me.input.KEY.F1, "F1");
	me.input.bindKey(me.input.KEY.F2, "F2");
	me.input.bindKey(me.input.KEY.F3, "F3");
	me.input.bindKey(me.input.KEY.F4, "F4");
	me.input.bindKey(me.input.KEY.F5, "F5");
	var exp1cost = ((game.data.exp1 + 1) * 10);
	


	me.game.world.addChild(new (me.Renderable.extend({

		init: function() {
			this._super(me.Renderable, 'init', [10, 10,  300, 50]);
			this.font = new me.Font("Arial", 26, "white");
		},
 
	draw: function(renderer) {

		this.font.draw(renderer.getContext(), "Press F1 - F4 To Spend, F5 To Skip", this.pos.x, this.pos.y);
		this.font.draw(renderer.getContext(), "Current Exp: " + game.data.exp.toString(), this.pos.x, this.pos.y + 50);
		this.font.draw(renderer.getContext(), "F1: Increase Gold Production CURRENT LEVEL" + game.data.exp1.toString() + " COST " + exp1cost, this.pos.x, this.pos.y + 100);
		this.font.draw(renderer.getContext(), "F2: Add Starting Gold", this.pos.x, this.pos.y + 150);
		this.font.draw(renderer.getContext(), "F3: Increase Attack Damage", this.pos.x, this.pos.y + 200);
		this.font.draw(renderer.getContext(), "F4: Increase Health", this.pos.x, this.pos.y + 250);


	},

	})));

	this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge) {
		if (action === "F1") {
			if (game.data.exp >= exp1cost) {
				game.data.exp1 += 1;
				game.data.exp -= exp1cost;
				me.state.change(me.state.PLAY);
			}
			else  {
				console.log("NOT ENOUGH EXPERIENCE");
			}

		}
		else if (action === "F2") {

		}
		else if (action === "F3") {

		}
		else if (action === "F4") {

		}
		else if (action === "F5") {
			me.state.change(me.state.PLAY);
		}
	});


	},
	
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
	me.input.unbindKey(me.input.KEY.F1, "F1");
	me.input.unbindKey(me.input.KEY.F2, "F2");
	me.input.unbindKey(me.input.KEY.F3, "F3");
	me.input.unbindKey(me.input.KEY.F4, "F4");
	me.input.unbindKey(me.input.KEY.F5, "F5");

	me.event.unsubscribe(this.handler);
	}
});
