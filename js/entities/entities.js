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
			spriteheight: "64",
			/*function creates new shape*/
			getShape: function() {
				/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
		/*sets speed 5 units to the right*/
		this.body.setVelocity(5, 20);

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118,119,120, 121, 122, 123, 124, 125], 60);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 71, 72,], 80);

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

		 if (me.input.isKeyPressed("jump") && !this.jumping && !this.falling) {
		 	this.jumping = true;
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
		}

		if (me.input.isKeyPressed("attack")) {
		if (!this.renderable.isCurrentAnimation("attack")) {
			console.log(this.renderable.setCurrentAnimation("attack"));
			/*sets the current animation to attack and once its over
			returns to idle*/
			this.renderable.setCurrentAnimation("attack", "idle");
			/*makes so that the next time we start this sequence we can begin from the first animation,
			not where we left off when we switch to another animation*/
		}
	}

	else if (this.body.vel.x !== 0) {
		if (!this.renderable.isCurrentAnimation("walk")) {
			this.renderable.setCurrentAnimation("walk");
		}
	}
	else{
		this.renderable.setCurrentAnimation("idle");
	}
	if (me.input.isKeyPressed("attack")) {
		if (!this.renderable.isCurrentAnimation("attack")) {
			console.log(this.renderable.setCurrentAnimation("attack"));
			/*sets the current animation to attack and once its over
			returns to idle*/
			this.renderable.setCurrentAnimation("attack", "idle");
			/*makes so that the next time we start this sequence we can begin from the first animation,
			not where we left off when we switch to another animation*/
		}
	}
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
	}
});

game.PlayerBaseEntity = me.Entity.extend({
	/*constructor function; asks for three parameters*/
	init: function (x, y, settings) {
		/*reaches into the constructor of entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*calls image given the name of tower*/
			image: "tower",
			/*gives width of image; tells screen to preserve the amount of space given*/
			width: 100,
			/*gives the height of image; tells screen to preserve the amount of space given*/
			height: 100,
			/*sprite width passes the main information tells us the width of the image*/
			spritewidth:"100",
			/*sprite height passes the main information tells us the width of the image*/
			spriteheight: "100",
	/*function creates new shape*/
			getShape: function(){
				/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		/*variable that hold whether the player has died or not*/
		this.broken = false;
		/*variable that holds health*/
		this.health = 10;
		/*upadates what happends to tower even whe not visible*/
		this.alwaysUpdate = true;
		/*if someone runs into a tower they dont go through, it will be able to collide withone another*/
		this.body.onCollision = this.onCollision.bind(this);
		/*uses different type for other collisions to check and what your running into when hittng other things*/
		this.type = "PlayerBaseEntity";

		/*animation for when base is fine*/
		this.renderable.addAnimation("idle", [0]);
		/*animation for when base is broken*/
		this.renderable.addAnimation("broken", [1]);
		/*sets current animation to idle*/
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
		/*checks whether health is equal to of lower than 0*/
		if (this.health <= 0) {
			/*if it is player dies*/
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	onCollision: function() {

	}
});

game.EnemyBaseEntity = me.Entity.extend({
	/*constructor function; asks for three parameters*/
	init: function (x, y, settings) {
		/*reaches into the constructor of entity*/
		this._super(me.Entity, 'init', [x, y, {
			/*calls image given the name of tower*/
			image: "tower",
			/*gives width of image; tells screen to preserve the amount of space given*/
			width: 100,
			/*gives the height of image; tells screen to preserve the amount of space given*/
			height: 100,
			/*sprite width passes the main information tells us the width of the image*/
			spritewidth:"100",
			/*sprite height passes the main information tells us the width of the image*/
			spriteheight: "100",
/*function creates new shape*/
			getShape: function(){
				/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return (new me.Rect(0, 0, 100, 100)).toPolygon();
			}
		}]);
		/*variable that hold whether the player has died or not*/
		this.broken = false;
		/*variable that holds health*/
		this.health = 10;
		/*upadates what happends to tower even whe not visible*/
		this.alwaysUpdate = true;
		/*if someone runs into a tower they dont go through, it will be able to collide withone another*/
		this.body.onCollision = this.onCollision.bind(this);
		/*uses different type for other collisions to check and what your running into when hittng other things*/
		this.type = "EnemyBaseEntity";

			/*animation for when base is fine*/
		this.renderable.addAnimation("idle", [0]);
		/*animation for when base is broken*/
		this.renderable.addAnimation("broken", [1]);
		/*sets current animation to idle*/
		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta) {
			/*checks whether health is equal to of lower than 0*/
		if (this.health <= 0) {
			/*if it is player dies*/
			this.broken = true;
			this.renderable.setCurrentAnimation("broken");
		}
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
		},
	onCollision: function() {

	}
});