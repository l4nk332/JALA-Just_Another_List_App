function drawCircle () {
  // Draw the circle and fill it
  ctx.beginPath();
  ctx.arc(x, y, 100, 2*Math.PI, 0);
  ctx.fillStyle = "rgba(247, 206, 0, 0.7)";
  ctx.fill();
}

function drawLongRay () {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 84, 0, 0.3)";
  ctx.lineWidth = 8;
  ctx.moveTo(0, -180);
  ctx.lineTo(0, -115);
  ctx.stroke();
}

function drawShortRay () {
  ctx.beginPath();
  ctx.strokeStyle = "rgba(255, 0, 0, 0.3)";
  ctx.lineWidth = 5;
  ctx.moveTo(0, -140);
  ctx.lineTo(0, -110);
  ctx.stroke();
}

function drawSunRays() {
  ctx.lineCap = 'round';
  for (var i = 0; i < 12; i++) {
    // Run drawRay function
    if (i % 2 === 0) {
      drawLongRay();
    } else {
      drawShortRay();
    }
    // Rotate and repeat drawRay
    ctx.rotate(Math.PI/6);
  }
}

// Assign vendor prefixes to requestAnimationFrame
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

function sunAnimation() {
  ctx.clearRect(0, 0, screen.width, 500);
  ctx.save();
  drawCircle();
  // Translate Canvas to center of circle
  ctx.translate(x, y);
  var time = new Date();
  // Rotate canvas at circle center with every
  // half second moving clockwise
  ctx.rotate( ((2*Math.PI)/30)*time.getSeconds() + ((2*Math.PI)/30000)*time.getMilliseconds() );
  // Draw rays
  drawSunRays();
  // Restore canvas to original state
  ctx.restore();
  requestAnimationFrame(sunAnimation);
}



// When page loads get current hour and if
// it is between daylight hours run code
// below.
var now = new Date();
console.log(now.getHours());
//if (now.getHours() > 6 && now.getHours() < 19) {

  // Create a canvas the length of the
  // screen and append it to the body
  var canvas = document.createElement("canvas");

  canvas.setAttribute("width", screen.width);
  canvas.setAttribute("height", 500);
  $(canvas).css({
    "position": "absolute",
    "z-index": "-400"
  });

  $("body").prepend(canvas);

  var ctx = canvas.getContext("2d");
  // Create Map of x values based
  // on hours and screenwidth
  var hourMap = {
    "7": (screen.width * 11/11),
    "8": (screen.width * 10/11),
    "9": (screen.width * 9/11),
    "10": (screen.width * 8/11),
    "11": (screen.width * 7/11),
    "12": (screen.width * 6/11),
    "13": (screen.width * 5/11),
    "14": (screen.width * 4/11),
    "15": (screen.width * 3/11),
    "16": (screen.width * 2/11),
    "17": (screen.width * 1/11),
    "18": (screen.width * 0/11)
  };

  var x = hourMap[now.getHours().toString()], y = 30;
  //var x = hourMap["18"], y = 30; // For Testing Purposes only
  sunAnimation();

// If first or last hours of daylight reddish tint
if (now.getHours() === 7 || now.getHours() === 18) {
  // Change body (sky) tint
  document.body.style.backgroundColor = "rgb(245, 134, 150)";
  // Change sun tint
}

// Else if second to first or last hours slighter reddish tint

// Else if third to first or last hours slightest reddish tint

// Else just normal blue tint
