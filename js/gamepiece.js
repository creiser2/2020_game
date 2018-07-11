class GamePiece {

  //drawshape function invokes other functions based on random integers
  static drawShapes(randInt) {

    //8 distinct shape function closures
    switch(randInt) {

      //five vertical squares
      case 0:
        //draw five vertical squares shape
        return function fiveVerticalSquares(randomColor, BLOCKSIZE, GAMEDIMENSION) {
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
}
