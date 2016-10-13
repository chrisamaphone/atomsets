var tilesize = 50;


function randomColor() {

  var r = (Math.floor(Math.random()*255));
  var g = (Math.floor(Math.random()*255));
  var b = (Math.floor(Math.random()*255));

  return "rgb(" + r + "," + g + "," + b + ")";
}

function draw(canvas) {

  var ctx = canvas.getContext('2d');

  var width = canvas.width/tilesize;
  var height = canvas.height/tilesize;

  for (var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      ctx.fillStyle = randomColor();
      ctx.fillRect(x*tilesize,y*tilesize,tilesize,tilesize);
    }
  }

}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function getTilePos(canvas, evt) {
  var mousepos = getMousePos(canvas, evt);
  var x = Math.floor(mousepos.x/tilesize);
  var y = Math.floor(mousepos.y/tilesize);
  return {x:x, y:y};
}


function redrawTile(x, y, canvas) {
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = randomColor();
  ctx.fillRect(x*tilesize, y*tilesize, tilesize, tilesize);
} 

function doMouseUp(e, canvas) {
  var pos = getTilePos(canvas, e);
  // alert("X=" + pos.x + ", Y = " + pos.y);  
  redrawTile(pos.x, pos.y, canvas);
}


// UI stuff
function ui() {

var canvas = document.getElementById('map');
var generateButton = document.getElementById("generateButton");

generateButton.addEventListener("click", function () {
    draw(canvas);
});

canvas.addEventListener("mouseup", 
  function(e) { doMouseUp(e, canvas); }, 
  false);

}

