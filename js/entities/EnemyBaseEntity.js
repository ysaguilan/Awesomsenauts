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
		this.health = game.data.enemyBaseHealth;
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
			game.data.win = true;
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