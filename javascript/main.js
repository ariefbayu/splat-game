/**
 * @fileoverview
 * Draw lines, polygons, circles, etc on the screen.
 * Render text in a certain font to the screen.
 */
var gamejs = require('gamejs');
var draw = require('gamejs/draw');
var font = require('gamejs/font');

var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;

var rowCount = cellCount = 10;
var boardBorder = 3;
var cellBorder = 4;
var topBoardMargin = screenHeight / 12;

var cellHeight = cellWidth = (screenWidth - (boardBorder*2)) / cellCount;

var buttonPos = new Array(logic.colors.length);

var display;

var playButtonSize = [100, 40];
var pbX = pbY = -1;
var gameStarted = false;

function drawWinScreen(){
   var dialogSize = [240, 130];
   var dialogX = (screenWidth / 2) - (dialogSize[0] / 2);
   var dialogY = (screenHeight / 2) - (dialogSize[1] / 2);
   display.fill("#F58799", new gamejs.Rect([dialogX, dialogY], dialogSize));
   draw.rect(display, "#4B51AD", new gamejs.Rect([dialogX, dialogY], dialogSize), 2);

   var congrateFont = new font.Font("30px Verdana");
   var textCongrate = congrateFont.render("Congratulation!", "#000000");
   var congratePosX = (screenWidth / 2) - (textCongrate.getSize()[0] / 2);
   display.blit(textCongrate, [congratePosX, dialogY + 10]);

   var finFont = new font.Font("14px Verdana");
   var textFin = finFont.render("Finished in " + logic.step + " steps.", "#000000");
   var finPosX = (screenWidth / 2) - (textFin.getSize()[0] / 2);
   display.blit(textFin, [finPosX, dialogY + 10 + textCongrate.getSize()[1]]);

   
   pbX = (screenWidth / 2) - (playButtonSize[0] / 2);
   pbY = dialogY + 20 + textCongrate.getSize()[1] + textFin.getSize()[1];
   display.fill("#2FEB5E", new gamejs.Rect([pbX, pbY], playButtonSize));
   draw.rect(display, "#4B51AD", new gamejs.Rect([pbX, pbY], playButtonSize), 2);

   var finFont = new font.Font("14px Verdana");
   var textFin = finFont.render("Play Again!", "#000000");
   var finPosX = (screenWidth / 2) - (textFin.getSize()[0] / 2);
   display.blit(textFin, [finPosX, pbY - 10 + (playButtonSize[1] / 2)]);

}
function drawGameObject(){
   display.clear();

   display.fill("#6ABA7E", new gamejs.Rect([0, 0], [screenWidth, screenHeight]));
//   draw.rect(display, "#4B51AD", new gamejs.Rect([0, 0], [screenWidth, screenHeight]), 2);

   var defaultFont = new font.Font("20px Verdana");
   var textSurface = defaultFont.render("Step: " + logic.step, "#000000");
   display.blit(textSurface, [10, 10]);

   for(row = 0; row < rowCount; row++){
      for(cell = 0; cell < cellCount; cell++){
         var leftPosX = (cell * cellWidth) + boardBorder;
         var leftPosY = (row * cellHeight) + topBoardMargin;
         var currentColor = logic.getColorAt(row, cell);
         display.fill(currentColor, new gamejs.Rect([leftPosX+cellBorder, leftPosY+cellBorder], [cellWidth-cellBorder, cellHeight-cellBorder]));
         draw.rect(display, "#000000", new gamejs.Rect([leftPosX+cellBorder, leftPosY+cellBorder], [cellWidth-cellBorder, cellHeight-cellBorder]), 2);
      }
   }

   var colorButtonTop = topBoardMargin * 10;
   var colorButtonLeft = screenWidth / 8;

   for(colorIdx = 0; colorIdx < logic.colors.length; colorIdx++){
      buttonPos[colorIdx] = [colorButtonLeft * (colorIdx + 1), colorButtonTop];
      display.fill(logic.colors[colorIdx], new gamejs.Rect([colorButtonLeft * (colorIdx + 1), colorButtonTop], [cellWidth, cellHeight]));
      draw.rect(display, "#000000", new gamejs.Rect([colorButtonLeft * (colorIdx + 1), colorButtonTop], [cellWidth, cellHeight]), 2);
   }

   if(logic.completed){
      drawWinScreen();
   }
}

function drawMenuScreen(){
   var dialogSize = [240, 130];
   var dialogX = (screenWidth / 2) - (dialogSize[0] / 2);
   var dialogY = (screenHeight / 2) - (dialogSize[1] / 2);
//   display.fill("#F58799", new gamejs.Rect([dialogX, dialogY], dialogSize));
//   draw.rect(display, "#4B51AD", new gamejs.Rect([dialogX, dialogY], dialogSize), 2);
   display.fill("#F58799", new gamejs.Rect([0, 0], [screenWidth, screenHeight]));
   draw.rect(display, "#4B51AD", new gamejs.Rect([0, 0], [screenWidth, screenHeight]), 2);


   var congrateFont = new font.Font("30px Verdana");
   var textCongrate = congrateFont.render("Splat!", "#000000");
   var congratePosX = (screenWidth / 2) - (textCongrate.getSize()[0] / 2);
   display.blit(textCongrate, [congratePosX, dialogY + 10]);

   var finFont = new font.Font("14px Verdana");
   var textFin = finFont.render("A simple coloring game.", "#000000");
   var finPosX = (screenWidth / 2) - (textFin.getSize()[0] / 2);
   display.blit(textFin, [finPosX, dialogY + 10 + textCongrate.getSize()[1]]);

   
   pbX = (screenWidth / 2) - (playButtonSize[0] / 2);
   pbY = dialogY + 20 + textCongrate.getSize()[1] + textFin.getSize()[1];
   display.fill("#2FEB5E", new gamejs.Rect([pbX, pbY], playButtonSize));
   draw.rect(display, "#4B51AD", new gamejs.Rect([pbX, pbY], playButtonSize), 2);

   var finFont = new font.Font("14px Verdana");
   var textFin = finFont.render("Play!", "#000000");
   var finPosX = (screenWidth / 2) - (textFin.getSize()[0] / 2);
   display.blit(textFin, [finPosX, pbY - 10 + (playButtonSize[1] / 2)]);

   var ccFont = new font.Font("10px Verdana");
   var textCc = ccFont.render("(c)2013 Arief Bayu Purwanto", "#000000");
   var ccPosX = screenWidth - textCc.getSize()[0] - 5;
   var ccPosY = screenHeight - textCc.getSize()[1] - 5;
   display.blit(textCc, [ccPosX, ccPosY]);

   var pwrdFont = new font.Font("10px Verdana");
   var textPwrd = pwrdFont.render("Powered By: GameJS", "#000000");
   var ccPosX = 5;
   var ccPosY = screenHeight - textPwrd.getSize()[1] - 5;
   display.blit(textPwrd, [ccPosX, ccPosY]);

}

function main() {
   // set resolution & title
   display = gamejs.display.setMode([screenWidth, screenHeight]);
   gamejs.display.setCaption("Splat!");

   if(!gameStarted){
      drawMenuScreen();
   } else {

      logic.initialize(rowCount, cellCount);

      drawGameObject();

   }

   gamejs.onEvent(function(event) {
      var pos = event.pos;
      // handle key / mouse events
      var clickedIdx = -1;
      if(!gameStarted){
         if(event.type === gamejs.event.MOUSE_UP){
            //console.log(event.pos);
            if( (pos[0] > pbX && pos[0] < (pbX + playButtonSize[0])
             && (pos[1] > pbY && pos[1] < (pbY + playButtonSize[1]) ))) {
               gameStarted = true;
               logic.initialize(rowCount, cellCount);
               drawGameObject();
            }
         }

         return;
      }
      if(!logic.completed){
         if(event.type === gamejs.event.MOUSE_UP){
            //console.log(event.pos);
            for(idx = 0; idx < logic.colors.length; idx++){
               if( (pos[0] > buttonPos[idx][0] && pos[0] < (buttonPos[idx][0]+cellWidth)
                && (pos[1] > buttonPos[idx][1] && pos[1] < (buttonPos[idx][1]+cellHeight) ))) {
                  //console.log("color " + (idx+1));
                  clickedIdx = idx;
                  break;
               }
            }
         }

         if(clickedIdx != -1){
            console.log("color " + (clickedIdx+1));
            logic.paint(clickedIdx);
            drawGameObject();
         }
      } else {
         if(event.type === gamejs.event.MOUSE_UP){
            //console.log(event.pos);
            if( (pos[0] > pbX && pos[0] < (pbX + playButtonSize[0])
             && (pos[1] > pbY && pos[1] < (pbY + playButtonSize[1]) ))) {
               //console.log("color " + (idx+1));
               logic.initialize(rowCount, cellCount);
               drawGameObject();
            }
         }
      }

   });

};

// gamejs.ready will call your main function
// once all components and resources are ready.
gamejs.ready(main);
