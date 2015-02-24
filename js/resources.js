game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */

	 /*helps computer figure out where my images are stored so it can use them*/
	 {name:"background-tiles", type:"image", src:"data/img/background-tiles.png"},
	 {name:"meta-tiles", type:"image", src:"data/img/meta-tiles.png"},
	 {name:"orc", type:"image", src:"data/img/orcSpear.png"},
	 {name:"tower", type:"image", src:"data/img/tower_round.svg.png"},
	  {name:"creep1", type:"image", src:"data/img/brainmonster.png"},
	  {name:"title-screen", type:"image", src:"data/img/titlescreen.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */

 	 /*helps computer figure out where my levels are stored so it can use them*/
 	 {name:"level01", type:"tmx", src:"data/map/level01.tmx"},

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
