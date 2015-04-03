game.PlayerEntity = me.Entity.extend({
	/*constructor function; asks for three parameters*/
	init: function(x, y, settings) {

		this.setSuper(x, y);
		this.setPlayerTimers();
		this.setAttributes();
		this.type = "PlayerEntity";
		this.setFlags();

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

		this.addAnimation();
		this.renderable.setCurrentAnimation("idle");
	},
	//sets super class
 	setSuper: function(y, x){
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
 	},

	setPlayerTimers: function(){
		this.now = new Date().getTime();
		this.lastHit = this.now;
		this.lastAttack = new Date().getTime();//havent used this
	},

	setAttributes: function () {
		this.health = game.data.playerHealth;
		/*sets speed 5 units to the right*/
		this.body.setVelocity(game.data.playerMoveSpeed, 20);
		/*sets attack damage*/
		this.attack = game.data.playerAttack;
	},

	setFlags: function(){
	/*keeps track of direction your character is going*/
	this.facing = "right";
	/*keeps track of whether character is dead; holds value of false*/
	this.dead = false;
	/*keeps track of attack*/
	this.attacking = false;
	},

	addAnimation: function(){
	this.renderable.addAnimation("idle", [78]);
	this.renderable.addAnimation("walk", [117, 118,119,120, 121, 122, 123, 124, 125], 60);
	this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 71, 72,], 80);
	},
	
	update: function(delta){
		this.now = new Date().getTime();
		this.dead = this.checkIfDead();

		this.checkIfKeyPressesAndMove();
		this.setAnimation();
	

	me.collision.check(this, true, this.collideHandler.bind(this), true);
		this.body.update(delta);

		this._super(me.Entity, "update", [delta]);
		return true;
	},

	checkIfDead: function() {
		if (this.health<=0) {
		return true;	
		}
		return false;
	},

	checkIfKeyPressesAndMove: function() {
		/*checks if right key has been pressed*/
		if (me.input.isKeyPressed("right")) {
			this.moveRight();
		}
		/*checks if left key has been pressed*/
		else if(me.input.isKeyPressed("left")) {
			this.moveLeft();
		}
		else{
			/*brings to velocity down to 0 when key isnt pressed*/
			this.body.vel.x = 0;
		}
		/*enables space key for jump action*//*makes double jump not possible*/

		 if (me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
		 	this.jump();
		}

		this.attacking = me.input.isKeyPressed("attack");
	},

	moveRight: function(){
	/*adds to the position of x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick
	me.timer.tick makes the movement look smooth*/
	this.body.vel.x += this.body.accel.x * me.timer.tick;
	this.facing = "right";
	/*flips player animation to opposite direction*/
	this.flipX(true);
			
	},

	moveLeft: function() {
	this.facing = "left";
	/*adds to the position of x by the velocity defined above in setVelocity() and multiplying it by me.timer.tick
	me.timer.tick makes the movement look smooth*/
	this.body.vel.x -= this.body.accel.x * me.timer.tick;
	/*flips player animation to opposite direction from where it was flipped*/
	this.flipX(false);
	},

	jump: function() {
	this.body.jumping = true;
	this.body.vel.y -= this.body.accel.y * me.timer.tick;
	},

	setAnimation: function() {

	if (this.attacking) {
		if (!this.renderable.isCurrentAnimation("attack")) {
		//(this.renderable.setCurrentAnimation("attack", "idle"));
		/*sets the current animation to attack and once its over
		returns to idle*/
		this.renderable.setCurrentAnimation("attack", "idle");
		/*makes so that the next time we start this sequence we can begin from the first animation,
		not where we left off when we switch to another animation*/
		this.renderable.setAnimationFrame();
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
	},

	loseHealth: function(damage) {
		this.health = this.health - damage;
	},

	collideHandler: function(response) {
		if (response.b.type ==='EnemyBaseEntity') {
			this.collideWithEnemyBase(response);
		}
			else if(response.b.type === 'EnemyCreep'){
				this.collideWithEnemyCreep(response);	
			}

				
			},

collideWithEnemyBase: function(response) {
	var ydif = this.pos.y  - response.b.pos.y;
	var xdif = this.pos.x - response.b.pos.x;

	//console.log("xdif" + xdif + " ydif " + ydif);
	/*checks if player has made contact to the top ofr enemy base if it has then player wont go throught the top*/
	if (ydif<-40 && xdif<70 && xdif>-35) {
		this.body.falling = false;
		this.body.vel.y = -1;
	}
	/*wont allow player go through the right side of enemy base*/
	else if (xdif>-35 && this.facing==='right' && (xdif<0) && ydif>-50) {
		this.body.vel.x = 0;
	}
	/*wont allow player go through the left side of enemy base*/
	else if (xdif<70 && this.facing==='left' && (xdif>0)) {
		this.body.vel.x = 0; 
	}

	if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer) {
		this.lastHit = this.now;
		response.b.loseHealth(game.data.playerAttack);
	}
},

collideWithEnemyCreep: function(response) {
	var xdif = this.pos.x - response.b.pos.x;
	var ydif = this.pos.y + response.b.pos.y;

	this.stopMovement(xdif);
	if(this.checkAttack(xdif, ydif)) {
		this.hitCreep(response);
	}
},
stopMovement: function(xdif) {
	if (xdif>0) {
		if (this.facing === "left") {
			this.body.vel.x = 0;
		}
	}
	else{
		if (this.facing === "right") {
		this.body.vel.x = 0;
		}
	}
}, 

checkAttack: function(xdif, ydif) {
	if (this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit>= game.data.playerAttackTimer && (Math.abs(ydif <=40) && ((xdif>0) && this.facing === "left") || ((xdif<0) && this.facing === "right"))) {
		this.lastHit = this.now;
		return true;
	}
	return false;
},

hitCreep: function(response) {
	//if the creeps health is less than our attack excutes code in if statement
	if (response.b.health <= game.data.playerAttack) {
		//adds one gold for a creep kill
		game.data.gold += 1;
		console.log("Current gold: " + game.data.gold);
	}
	response.b.loseHealth(game.data.playerAttack);
}	

});




