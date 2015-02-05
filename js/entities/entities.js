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
		/*keeps track of direction your character is going*/
		this.facing = "right";
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();
		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118,119,120, 121, 122, 123, 124, 125], 60);
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 71, 72,], 80);

		this.renderable.setCurrentAnimation("idle");
	},

	update: function(delta){
		this.now = new Date().getTime();
		/*checks if right key has been pressed*/
		if (me.input.isKeyPressed("right")) {
			/*adds to the position of x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick
			me.timer.tick makes the movement look smooth*/
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.facing = "right";
			/*flips player animation to opposite direction*/
			this.flipX(true);
			
		}
		/*checks if left key has been pressed*/
		else if(me.input.isKeyPressed("left")) {
			this.facing = "left";
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
		/*enables space key for jump action*//*makes double jump not possible*/

		 if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
		 	this.body.jumping = true;
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

	else if (this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")) {
		if (!this.renderable.isCurrentAnimation("walk")) {
			this.renderable.setCurrentAnimation("walk");
		}
	}
	else if (!this.renderable.isCurrentAnimation("attack")){
		this.renderable.setCurrentAnimation("idle");
	}
	

	me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	collideHandler: function(response) {
		if (response.b.type ==='EnemyBaseEntity') {
			var ydif = this.pos.y  - response.b.pos.y;
			var xdif = this.pos.x - response.b.pos.x;

			console.log("xdif" + xdif + " ydif " + ydif);
			/*checks if player has made contact to the top ofr enemy base if it has then player wont go throught the top*/
			if (ydif<-40 && xdif<70 && xdif>-35) {
				this.body.falling = false;
				this.body.vel.y = -1;
			}
			/*wont allow player go through the right side of enemy base*/
			else if (xdif>-35 && this.facing==='right' && (xdif<0) && ydif>-50) {
				this.body.vel.x = 0;
				this.pos.x = this.pos.x -1;
			}
			/*wont allow player go through the left side of enemy base*/
			else if (xdif<70 && this.facing==='left' && (xdif>0)) {
				this.body.vel.x = 0; 
				this.pos.x = this.pos.x +1;
			}

			if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= 900) {
				this.lastHit = this.now;
				response.b.loseHealth();
			}
		}
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
				return (new me.Rect(0, 0, 100, 78)).toPolygon();
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
				return (new me.Rect(0, 0, 100, 78)).toPolygon();
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
		/*update towers animation and health*/
		this.body.update(delta);
		/*calls on entity*/
		this._super(me.Entity, "update", [delta]);
		/*returns true*/
		return true;
		},
	onCollision: function() {

	},

	loseHealth: function() {
		/*makes tower lose health every time it hits*/
		this.health--;
	}
});


game.EnemyCreep = me.Entity.extend({
	/*constructor function; asks for three parameters*/
	init: function(x, y, settings) {
		this._super(me.Entity, 'init', [x, y, {
			/*calls image given the name of creep1*/
			image: "creep1",
			/*gives width of image; tells screen to preserve the amount of space given*/
			width: 32,
			/*gives height of image; tells screen to preserve the amount of space given*/
			height: 64,
			/*sprite height passes the main information tells us the width of the image*/
			spritewidth: "32",
			/*sprite height passes the main information tells us the width of the image*/
			spriteheight: "64",
			getShape: function(){
					/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return (new me.Rect(0, 0, 32, 64)).toPolygon();
			}

		}]);
		/*stores enemy creep health*/
		this.health = 10;
		/*always updates enemy checks for changes*/
		this.alwaysUpdate = true;
		/*sets enemy creep velocity x = 3, y = 20*/
		this.body.setVelocity(3, 20);
		/*this class type is enemy creep*/
		this.type = "EnemyCreep";
		/*adds walk animation to EnemyCreep*/
		this.renderable.addAnimation("walk", [3, 4, 5], 80);
		/*sets walk animation*/
		this.renderable.setCurrentAnimation("walk");
	},
});

/*runs all the timers and occurances that happened that are not really inside of the PlayerEntity, BaseEntities, or EnemyCreep Entites 
wont appear on the screen its an object*/
game.GameManager = Object.extend ({
	/*constructor function; asks for three parameters*/
	init: function(x, y, settings) {
		/**/
		this.now = new Date().getTime();
		/*keeps track of the last time a creep has been made*/
		this.lastCreep = new Date().getTime();
		/*updates for changes*/
		this.alwaysUpdate = true;
	},
	update: function() {
		/*update function keeps track of timer*/
		this.now = new Date().getTime();
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
		/*returns all of this to true*/
		return true;
	}
});
