const WINDOWDIMENSION = 1000
const BLOCKHOLDERDIMENSION = 400
const GAMEDIMENSION = WINDOWDIMENSION - BLOCKHOLDERDIMENSION
const GRIDBLOCKSIZE = 10
const BLOCKSIZE = GAMEDIMENSION/GRIDBLOCKSIZE;
const SHAPECOLORS = {
  colors: {
    "red": 0xCC0000,
    "blue": 0x0000FF,
    "green": 0x00B300,
    "pink": 0xFF69B4,
    "fushia": 0xFF0080
  }
}

//game variavble
var game = new Phaser.Game(GAMEDIMENSION, WINDOWDIMENSION, Phaser.AUTO, 'container', {preload: preload, create: create, update: update});

//Globals
let shape; //current shape your using
let shapeArray; //array of all rendered shapes
let grid; //grid on board

//Called first
function preload() {
  game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE; //keeps aspect ratio but stretch to fill
  game.scale.pageAlignHorizontally = true; //align game vertically in the window
  game.stage.backgroundColor = '#e2e2e2'; // game background
}

//Called second
function create() {
  // Enable Box2D physics
  game.physics.startSystem(Phaser.Physics.ARCADE);

  // allow grid to be a group of objects
  grid = game.add.group();

  //set the yAxis of the grid (spans from top to block holder)
  let yGrid = GAMEDIMENSION;

  //generate row of grid blocks
  drawGrid(yGrid)

  //begin block generation
  blockGenerator();

  // Set up handlers for mouse events
  // game.input.onDown.add(mouseDragStart, this);

}

//Continuously called last
function update() {

}

//function called at create, creates the game grid
function drawGrid(yGrid) {
  for (let y = 0; y < GRIDBLOCKSIZE; y++) {
    let xGrid = 0;
    for (let x = 0; x < GRIDBLOCKSIZE; x++) {
      let graphics = this.game.add.graphics(); // adds to the world stage
      graphics.lineStyle(4, 0xffffff, 1);
      graphics.drawRect(xGrid, yGrid-BLOCKSIZE, BLOCKSIZE, BLOCKSIZE);
      grid.add(graphics) // moves from world stage to group as a child
      xGrid += BLOCKSIZE;
    }
  yGrid -= BLOCKSIZE;
  }
}



//pick a ranom element from SHAPECOLORS
function getRandomShapeColor() {
  let result;
  let count = 0;
  for(let u in SHAPECOLORS.colors) {
    if (Math.random() < 1/++count) {
      result = u;
    }
  }
  console.log(SHAPECOLORS.colors[result])
  return SHAPECOLORS.colors[result];
}

//SHAPE GENERATE FUNCTIONS

// //drawshape function invokes other functions based on random integers
function drawShapes(randInt) {

  //8 distinct shape function closures
  switch(randInt) {

    //five vertical squares
    case 0:
      //draw five vertical squares shape
      return function fiveVerticalSquares(randomColor) {
        let blockShape = game.add.graphics(0,0);
        let blockShape2 = game.add.graphics(0, BLOCKSIZE);
        let blockShape3 = game.add.graphics(0, BLOCKSIZE*2);
        let blockShape4 = game.add.graphics(0, BLOCKSIZE*3);
        let blockShape5 = game.add.graphics(0, BLOCKSIZE*4);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        blockShape4.beginFill(randomColor);
        blockShape4.lineStyle(2, 0xffffff, 0.5);

        blockShape5.beginFill(randomColor);
        blockShape5.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape4.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape5.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)
        shapeSprite.addChild(blockShape5)
      }
    break;

    //three adj squares
    case 1:
      //draw the three adjacent squares shape
      return function threeAdjacentSquares(randomColor) {
        let blockShape = this.game.add.graphics(0,0);
        let blockShape2 = this.game.add.graphics(BLOCKSIZE,0);
        let blockShape3 = this.game.add.graphics(BLOCKSIZE*2, 0);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
      }
    break;

    // 7 shape
    case 2:
      //draw mirrorred L shape
      return function lShapeMirrored(randomColor) {
        let blockShape = game.add.graphics(0,0);
        let blockShape2 = game.add.graphics(BLOCKSIZE, 0);
        let blockShape3 = game.add.graphics(BLOCKSIZE*2, 0);
        let blockShape4 = game.add.graphics(BLOCKSIZE*2, BLOCKSIZE*1);
        let blockShape5 = game.add.graphics(BLOCKSIZE*2, BLOCKSIZE*2);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        blockShape4.beginFill(randomColor);
        blockShape4.lineStyle(2, 0xffffff, 0.5);

        blockShape5.beginFill(randomColor);
        blockShape5.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape4.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape5.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)
        shapeSprite.addChild(blockShape5)
      }

    //generate square shape
    case 3:
      return function squareShape(randomColor) {
        let blockShape = game.add.graphics(0,0);
        let blockShape2 = game.add.graphics(BLOCKSIZE, 0);
        let blockShape3 = game.add.graphics(0, BLOCKSIZE);
        let blockShape4 = game.add.graphics(BLOCKSIZE, BLOCKSIZE);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        blockShape4.beginFill(randomColor);
        blockShape4.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape4.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)
      }

    //generate small mirrored L
    case 4:
      return function lShapeSmallMirrored(randomColor) {
        let blockShape = game.add.graphics(0,0);
        let blockShape2 = game.add.graphics(BLOCKSIZE, 0);
        let blockShape3 = game.add.graphics(BLOCKSIZE, BLOCKSIZE);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
      }
    break;

    //generate small L
    case 5:
      return function lShapeSmall(randomColor) {
        let blockShape = game.add.graphics(0,0);
        let blockShape2 = game.add.graphics(0, BLOCKSIZE);
        let blockShape3 = game.add.graphics(BLOCKSIZE, BLOCKSIZE);

        // set a fill and line style
        blockShape.beginFill(randomColor);
        blockShape.lineStyle(2, 0xffffff, 0.5);

        blockShape2.beginFill(randomColor);
        blockShape2.lineStyle(2, 0xffffff, 0.5);

        blockShape3.beginFill(randomColor);
        blockShape3.lineStyle(2, 0xffffff, 0.5);

        //draw rectangles
        blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
        blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

        //create the sprite that will be located at x,y
        shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
      }
  break;

  case 6:
    return function singleSquare(randomColor) {
      let blockShape = game.add.graphics(0,0);

      // set a fill and line style
      blockShape.beginFill(randomColor);
      blockShape.lineStyle(2, 0xffffff, 0.5);

      //draw rectangles
      blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

      //create the sprite that will be located at x,y
      shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

      //add children to the sprite
      shapeSprite.addChild(blockShape)
    }
  break;

  default:
    return function largeSquare(randomColor) {
      let blockShape = game.add.graphics(0,0);
      let blockShape2 = game.add.graphics(0, BLOCKSIZE);
      let blockShape3 = game.add.graphics(0, BLOCKSIZE*2);
      let blockShape4 = game.add.graphics(BLOCKSIZE, BLOCKSIZE*2);
      let blockShape5 = game.add.graphics(BLOCKSIZE*2, BLOCKSIZE*2);
      let blockShape6 = game.add.graphics(BLOCKSIZE, BLOCKSIZE);
      let blockShape7 = game.add.graphics(BLOCKSIZE*2, BLOCKSIZE);
      let blockShape8 = game.add.graphics(BLOCKSIZE*2, 0);
      let blockShape9 = game.add.graphics(BLOCKSIZE, 0);

      // set a fill and line style
      blockShape.beginFill(randomColor);
      blockShape.lineStyle(2, 0xffffff, 0.5);

      blockShape2.beginFill(randomColor);
      blockShape2.lineStyle(2, 0xffffff, 0.5);

      blockShape3.beginFill(randomColor);
      blockShape3.lineStyle(2, 0xffffff, 0.5);

      blockShape4.beginFill(randomColor);
      blockShape4.lineStyle(2, 0xffffff, 0.5);

      blockShape5.beginFill(randomColor);
      blockShape5.lineStyle(2, 0xffffff, 0.5);

      blockShape6.beginFill(randomColor);
      blockShape6.lineStyle(2, 0xffffff, 0.5);

      blockShape7.beginFill(randomColor);
      blockShape7.lineStyle(2, 0xffffff, 0.5);

      blockShape8.beginFill(randomColor);
      blockShape8.lineStyle(2, 0xffffff, 0.5);

      blockShape9.beginFill(randomColor);
      blockShape9.lineStyle(2, 0xffffff, 0.5);

      //draw rectangles
      blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape2.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape3.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape4.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape5.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape6.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape7.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape8.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);
      blockShape9.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

      //create the sprite that will be located at x,y
      shapeSprite = game.add.sprite(2*BLOCKSIZE, GAMEDIMENSION+(BLOCKSIZE));

      //add children to the sprite
      shapeSprite.addChild(blockShape)
      shapeSprite.addChild(blockShape2)
      shapeSprite.addChild(blockShape3)
      shapeSprite.addChild(blockShape4)
      shapeSprite.addChild(blockShape5)
      shapeSprite.addChild(blockShape6)
      shapeSprite.addChild(blockShape7)
      shapeSprite.addChild(blockShape8)
      shapeSprite.addChild(blockShape9)
    }
  break;
  }
}


//random int generation between 1 and 6
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

//selects a random shape
function blockGenerator() {
  //an array of functions

  let closure = drawShapes(getRandomInt(8))
  closure(getRandomShapeColor())
}
