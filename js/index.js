const WINDOWDIMENSION = 800
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
let spriteGroup; //array of all rendered shapes
let grid; //grid on board
let pendingShapes;
//the currently held down sprite
let activeSprite;
let score;
let spritePositions = [];
let pendingSpritePositions = [];

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

  //init block array
  spriteGroup = game.add.group();

  //current shape choices
  pendingShapes = game.add.group();

  blockGenerator();

  // Set up handlers for mouse events
  game.input.onDown.add(mouseDragStart, this);
  game.input.onUp.add(mouseDragEnd, this);

}

//Continuously called last
function update() {

}

function mouseDragEnd(activeSprite) {
  activeSprite = selectedSprite(pendingShapes)

  if(activeSprite) {
    if(selectedSpriteInBounds(activeSprite) && clashFree()) {

      //add active sprite to sprite group when its officially put down
      spriteGroup.add(activeSprite)

      //promise to snap the block in first, then we disable the drag
      let disableBlockDrag = new Promise(function(resolve, reject) {
        let blockSnap = activeSprite.input.enableSnap(BLOCKSIZE, BLOCKSIZE, false, true)
        resolve(blockSnap)
      })
      disableBlockDrag.then(function() {
        activeSprite.inputEnabled = false
        activeSprite.input.disableDrag()

        //check to see if the line needs to be destoryed
        lineInspector()
        // gameOver()
        
        //if you are out of shapes down in the minibox, generate more
        if(pendingShapes.children.length === 0) {
          blockGenerator();
        }

        if(pendingShapes.children.length > 0) {
          let over = gameOver();
          if(over) {
            console.log("gameover")
            game.state.restart()
          }
        }
      })
    } else {
      resetSpritePosition(activeSprite)
    }
  }
}

function clashFree() {

  //variable to be returned shows if theres a collision or not
  let noCollision = true
  //if sprite group is empty, we dont care about collisions
  if(spriteGroup.length > 0) {
    //check the current sprite you are holding to see if its x and y values match up with an existing one on the board
    activeSprite.children.forEach(sprite => {
      let activeX = Math.round(sprite.worldPosition.x/BLOCKSIZE)*BLOCKSIZE;
      let activeY = Math.round(sprite.worldPosition.y/BLOCKSIZE)*BLOCKSIZE;
      spriteGroup.children.forEach(placedSprite => {
        placedSprite.children.forEach(spriteGraphic => {
          if(spriteGraphic.worldPosition.x === activeX && spriteGraphic.worldPosition.y === activeY) {
            noCollision = false
          }
        })
      })
    })
  }
  return noCollision
}

function mouseDragStart() {
  activeSprite = selectedSprite(pendingShapes)
}

function selectedSprite(pendingShapes) {
  let selectedChild
  pendingShapes.forEach(child => {
    if(child.input.pointerOver()) {
      selectedChild = child
    }
  })
  return selectedChild
}


function selectedSpriteInBounds(activeSprite) {
  let inBounds = true
  activeSprite.children.forEach(child=>{
    //check to see if child is out of bounds. We are checking the center of each block in a sprite
    if(child.worldPosition.x+(BLOCKSIZE/2) > GAMEDIMENSION || child.worldPosition.y+(BLOCKSIZE/2) > GAMEDIMENSION || child.worldPosition.x+(BLOCKSIZE/2) < 0 || child.worldPosition.y+(BLOCKSIZE/2) < 0) {
      inBounds = false
    }
  })
  return inBounds
}

function resetSpritePosition(activeSprite) {
  activeSprite.position.x = activeSprite.cameraOffset.x
  activeSprite.position.y = activeSprite.cameraOffset.y
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
      return function fiveVerticalSquares(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)
        shapeSprite.addChild(blockShape5)

        return shapeSprite
      }
    break;

    //three adj squares
    case 1:
      //draw the three adjacent squares shape
      return function threeAdjacentSquares(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)

        return shapeSprite
      }
    break;

    // 7 shape
    case 2:
      //draw mirrorred L shape
      return function lShapeMirrored(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)
        shapeSprite.addChild(blockShape5)

        return shapeSprite
      }

    //generate square shape
    case 3:
      return function squareShape(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)
        shapeSprite.addChild(blockShape4)

        return shapeSprite
      }

    //generate small mirrored L
    case 4:
      return function lShapeSmallMirrored(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)

        return shapeSprite
      }
    break;

    //generate small L
    case 5:
      return function lShapeSmall(randomColor, coordinates) {
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
        shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

        //add children to the sprite
        shapeSprite.addChild(blockShape)
        shapeSprite.addChild(blockShape2)
        shapeSprite.addChild(blockShape3)

        return shapeSprite
      }
  break;

  case 6:
    return function singleSquare(randomColor, coordinates) {
      let blockShape = game.add.graphics(0,0);

      // set a fill and line style
      blockShape.beginFill(randomColor);
      blockShape.lineStyle(2, 0xffffff, 0.5);

      //draw rectangles
      blockShape.drawRect(0, 0, BLOCKSIZE, BLOCKSIZE);

      //create the sprite that will be located at x,y
      shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

      //add children to the sprite
      shapeSprite.addChild(blockShape)
      //sprite responds to mouse pointer
      shapeSprite.inputEnabled = true;
      shapeSprite.input.enableDrag(false);
      return shapeSprite
    }
  break;

  default:
    return function largeSquare(randomColor, coordinates) {
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
      shapeSprite = game.add.sprite(coordinates.x, coordinates.y);

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
      //sprite responds to mouse pointer
      shapeSprite.inputEnabled = true;
      shapeSprite.input.enableDrag(true);
      return shapeSprite
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
  let coordinates = {
    0: {
      x: BLOCKSIZE, y: GAMEDIMENSION+(BLOCKSIZE)
    },
    1: {
      x: BLOCKSIZE*6, y: GAMEDIMENSION+(BLOCKSIZE)
    },
    2: {
      x: BLOCKSIZE*4, y: GAMEDIMENSION+(BLOCKSIZE*5)
    }
  }
  for(i=0; i<3; i++) {
    let closure = drawShapes(getRandomInt(8))
    //begin block generation
    let newShape = closure(getRandomShapeColor(), coordinates[i])
    newShape.inputEnabled = true;
    newShape.input.enableDrag(true);
    game.physics.enable(newShape)
    pendingShapes.add(newShape)
  }
}


//destroy garbage lines
function lineInspector() {
  let rowsToDelete = checkRows();
} 

function checkBlockOnBoard(coordinates) {
  let exists = false;

  spriteGroup.children.forEach(sprite => {
    sprite.children.forEach(block => {
      if(block.position.x === coordinates.x && block.position.y === coordinates.y) {
        exists = true;
      }
    })
  })
  // debugger
  return exists
}

function checkRows() {
  coordinates = {x: 0, y: 0}
  for (let i = 0; i < GRIDBLOCKSIZE; i++) {
    let count = 0;
    for(let u = 0; u < GRIDBLOCKSIZE; u++) {
      // console.log(checkBlockOnBoard(coordinates))
      //if there exists a block on the game with these particular coordinates
      if(checkBlockOnBoard(coordinates)) {
        count++
      } 
      coordinates.x += BLOCKSIZE;
    }
    if(count === 10) {
      // console.log("full line")
    }
    // console.log(count)
    coordinates.x = 0;
    coordinates.y += BLOCKSIZE;
  }
}

function gameOver() {
  spriteCoordinates();
  pendingSpriteCoordinates();
  for (let j = 0; j < GRIDBLOCKSIZE; j++) {
    for (let i = 0; i < GRIDBLOCKSIZE; i++) {
      let addedX = i*BLOCKSIZE;
      let addedY = j*BLOCKSIZE;
      let pseudoPosition = shiftSprite(addedX,addedY); //this 'shifts' the blocks through every possible position on the board
      maxClashCount = pendingSpritePositions.length;
      for (let k = 0; k < maxClashCount; k++) {
        let clashCount = 0;
        let clashAtPosition = spriteCompare(pseudoPosition[k] )
        if (!clashAtPosition) {
          return false;
        }
      }
    }
  }
  return true;
}

function spriteCompare(sprite) {
  let clashTest = false;
  sprite.forEach(spriteChild => {
    spritePositions.find(clash => {
      if (clash.x === spriteChild.x && clash.y === spriteChild.y || spriteChild.x >= GAMEDIMENSION || spriteChild.y >= GAMEDIMENSION) {
        clashTest = true;
      }
    })
  })
  return clashTest;
}

function shiftSprite(addedX,addedY) {
  let alteredPositionArray = []
  pendingSpritePositions.forEach(sprite=> {
    let eachSprite = [];
    sprite.forEach(child => {
      eachSprite.push({x:child.x + addedX, y:child.y + addedY})
    })
    alteredPositionArray.push(eachSprite)
  })
  return alteredPositionArray;
}

// Generate an array of objects storing x and y coordinates of all places sprites
function spriteCoordinates() {
  spritePositions = [];
  spriteGroup.children.forEach(sprite => {
    sprite.children.forEach(spriteChild => {
      let activeX = Math.abs(Math.round(spriteChild.worldPosition.x/BLOCKSIZE)*BLOCKSIZE);
      let activeY = Math.abs(Math.round(spriteChild.worldPosition.y/BLOCKSIZE)*BLOCKSIZE);
      spritePositions.push({x:activeX, y: activeY});
    })
  })
}

function pendingSpriteCoordinates() {
  pendingSpritePositions = [];
  pendingShapes.forEach(sprite => {
    let eachSprite = [];
    let spriteLength = sprite.children.length;
    sprite.children.forEach(spriteChild => {
      eachSprite.push({x:spriteChild.position.x, y:spriteChild.position.y});
    })
    pendingSpritePositions.push(eachSprite);
  })
}