var tilesize = 50;


function randomColor() {

  var r = (Math.floor(Math.random()*255));
  var g = (Math.floor(Math.random()*255));
  var b = (Math.floor(Math.random()*255));

  return "rgb(" + r + "," + g + "," + b + ")";
}

var tilegrid = [];
var entities = ["cat_l", "dagger", "heart", "wall"]

function random_int(min, max) {
  var x = Math.floor(Math.random()*(max-min+1)) + min;
  return x;
}

function random_element(arr) {
  var x = arr[random_int(0, arr.length-1)];
  return x;
}

function initialize_random(width, height) {
  tilegrid = [];
  for(var y = 0; y < height; y++) {
    tilegrid.push([]);
    for(var x = 0; x < width; x++) {
      tilegrid[y].push([]);
      var entity = random_element(entities);
      tilegrid[y][x].push(entity);
    }
  }
}

function draw(canvas) {

  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var height = tilegrid.length;
  var width = 0;
  if (height > 0) { width = tilegrid[0].length; }

  /* fill with random colors */
  for (var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      ctx.fillStyle = randomColor();
      ctx.fillRect(x*tilesize,y*tilesize,tilesize,tilesize);
    }
  }

  /* draw what's in tilegrid*/
  for (var y = 0; y < height; y++) {
    for(var x = 0; x < width; x++) {
      for(var entity_index = 0; entity_index < tilegrid[y][x].length; entity_index++) {
        var entity_name = tilegrid[y][x][entity_index];
        var img = document.getElementById(entity_name);
        ctx.drawImage(img, x*tilesize, y*tilesize, tilesize, tilesize); 
      }
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
    var width = canvas.width/tilesize;
    var height = canvas.height/tilesize;
    initialize_random(width, height);
    draw(canvas);
});

canvas.addEventListener("mouseup", 
  function(e) { doMouseUp(e, canvas); }, 
  false);

}

