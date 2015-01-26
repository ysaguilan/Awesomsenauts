game.PlayerEntity = me.Entity.extend({
	/*constructor function; asks for three parameters*/
	init: function(x, y, settings) {
		/*reaches into the constructor of entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*calls image given the name of orc*/
			image: "orc",
			/*gives width of image; tells screen to preserve the amount of space given*/
			width: 64,
			/*gives height of image; tells screen to preserve the amount of space given*/
			height: 64,
			/*sprite width passes the main information tells us the width of the image*/
			spritewidth: "64",
			/*sprite height tells us the height of the image*/
			sprieheight: "64",
			/*function creates new shape*/
			getShape: function() {
				/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		/*sets speed 5 units to the right*/
		this.body.setVelocity(5, 20);
		this.renderable.addAnimation("idle", [78]);

		this.renderable.addAnimation("walk", [117, 118,119,120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		/*checks if right key has been pressed*/
		if (me.input.isKeyPressed("right")) {
			/*adds to the position of x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick
			me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			/*flips player animation to opposite direction*/
			this.flipX(true);
			
		}
		/*checks if left key has been pressed*/
		else if(me.input.isKeyPressed("left")) {
			/*adds to the position of x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick
			me.timer.tick makes the movement look smooth*/
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			/*flips player animation to opposite direction from where it was flipped*/
			this.flipX(false);
		}
		else{
			/*brings to velocity down to 0 when key isnt pressed*/
			this.body.vel.x = 0;
		}
		if (this.body.vel.x !== 0) {
		if (!this.renderable.isCurrentAnimation("walk")) {
			this.renderable.setCurrentAnimation("walk");
		}
	}
	else{
		this.renderable.setCurrentAnimation("idle");
	}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	}
});