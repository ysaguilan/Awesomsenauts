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

			getShape: function() {
				/*returns new shape: rectangle*/ /*turns rectangle to polygon*/
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);
	},

	update: function(){

	}
});