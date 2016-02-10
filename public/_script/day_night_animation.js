// Assign vendor prefixes to requestAnimationFrame
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.oRequestAnimationFrame ||
                            window.msRequestAnimationFrame;

// Define functions for daylight
function drawSun (x, y) {
  // Draw the circle and fill it
  ctx.fillStyle = "rgba(247, 206, 0, 0.7)";
  ctx.beginPath();
  ctx.arc(x, y, 100, 2*Math.PI, 0);
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

function sunAnimation() {
  var x = hourMap[now.getHours().toString()], y = 30;
  ctx.clearRect(0, 0, screen.width, 500);
  ctx.save();
  drawSun(x, y);
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

// Define variables and functions for moon animation

// Write a function that make a circle
function drawCircle(x, y, radius, color) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2*Math.PI);
  ctx.fillStyle = color || "white";
  ctx.fill();
}

// Write a function that makes a dot
function drawDot(x, y) {
  ctx.fillStyle = "white";
  ctx.fillRect(x,y,1,1); // fill in the pixel at (x,y)
}

function drawMoonCraters() {
  // Fill moon with craters
  drawCircle(-40, -55, 7, "rgba(165, 165, 165, 0.1)");
  drawCircle(80, 40, 5, "rgba(165, 165, 165, 0.1)");
  drawCircle(-25, 45, 17, "rgba(165, 165, 165, 0.1)");
  drawCircle(0, -80, 8, "rgba(165, 165, 165, 0.1)");
  drawCircle(80, 0, 8, "rgba(165, 165, 165, 0.1)");
  drawCircle(40, -15, 12, "rgba(165, 165, 165, 0.1)");
  drawCircle(25, 55, 7, "rgba(165, 165, 165, 0.1)");
  drawCircle(-65, 5, 12, "rgba(165, 165, 165, 0.1)");
  drawCircle(40, -65, 15, "rgba(165, 165, 165, 0.1)");
  drawCircle(-10, -10, 22, "rgba(165, 165, 165, 0.1)");
}

// Write a function that will draw the moon at
// given x, y
function moonAnimation() {
  var x = hourMap[now.getHours().toString()], y = 100;
  // Clear canvas
  ctx.clearRect(0, 0, screen.width, 500);
  // Save state of canvas
  ctx.save();
  // Draw the full-moon shape
  drawCircle(x, y, 100, "rgb(234, 231, 211)");
  // Translate canvas to circle center
  ctx.translate(x, y);
  var time = new Date();
  // Rotate canvas at circle center with every
  // half second moving clockwise
  ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
  // Fill moon with craters
  drawMoonCraters();
  // Restore canvas to previous state
  ctx.restore();
  requestAnimationFrame(moonAnimation);
}





// When page loads get current hour and if
// it is between daylight hours run code
// below.
// FOR TESTING THE DIFFERENT TIME SHIFTS
// var timeArr = [
//   'December 17, 1995 00:00:00',
//   'December 17, 1995 01:00:00',
//   'December 17, 1995 02:00:00',
//   'December 17, 1995 03:00:00',
//   'December 17, 1995 04:00:00',
//   'December 17, 1995 05:00:00',
//   'December 17, 1995 06:00:00',
//   'December 17, 1995 07:00:00',
//   'December 17, 1995 08:00:00',
//   'December 17, 1995 09:00:00',
//   'December 17, 1995 10:00:00',
//   'December 17, 1995 11:00:00',
//   'December 17, 1995 12:00:00',
//   'December 17, 1995 13:00:00',
//   'December 17, 1995 14:00:00',
//   'December 17, 1995 15:00:00',
//   'December 17, 1995 16:00:00',
//   'December 17, 1995 17:00:00',
//   'December 17, 1995 18:00:00',
//   'December 17, 1995 19:00:00',
//   'December 17, 1995 20:00:00',
//   'December 17, 1995 21:00:00',
//   'December 17, 1995 22:00:00',
//   'December 17, 1995 23:00:00'
// ];
// var now = new Date(timeArr[24]);
var now = new Date();
//console.log(now.getHours());

// Only draw sun animation between 6am and 6:59pm
if (now.getHours() > 5 && now.getHours() < 19) {
  // Create a canvas the length of the
  // screen and append it to the body
  var canvas = document.createElement("canvas");

  canvas.setAttribute("width", screen.width);
  canvas.setAttribute("height", 500);
  $(canvas).css({
    "position": "absolute",
    "z-index": -450
  });

  $("body").prepend(canvas);

  var ctx = canvas.getContext("2d");
  // Create Map of x values based
  // on screenwidth
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

  // Sun is not up at 6th hr, only between 7th hr and 18th hr
  if (now.getHours() > 6 && now.getHours() < 19) {
    sunAnimation();
  }

  // At 6am (before sun in frame)
  if (now.getHours() === 6) {
    $("body").css({
      "background": "linear-gradient(rgba(228, 152, 156, 1), rgb(51, 142, 172))" /* Standard syntax */
    });
  }
  // At 7am
  else if (now.getHours() === 7) {
    $("body").css({
      "background": "linear-gradient(rgba(228, 152, 156, 0.7), rgb(51, 142, 172))" /* Standard syntax */
    });
  }
  // At 8am
  else if (now.getHours() === 8) {
    $("body").css({
      "background": "linear-gradient(rgba(228, 152, 156, 0.5), rgb(51, 142, 172))" /* Standard syntax */
    });
  }
  // At 4pm
  else if (now.getHours() === 16) {
    $("body").css({
      "background": "linear-gradient(rgba(232, 100, 67, 0.5), rgba(43, 121, 167, 0.5))" /* Standard syntax */
    });
  }
  // At 5pm
  else if (now.getHours() === 17) {
    $("body").css({
      "background": "linear-gradient(rgba(232, 100, 67, 0.7), rgba(43, 121, 167, 0.7))" /* Standard syntax */
    });
  }
  // At 6pm (sun is out of frame)
  else if (now.getHours() === 18) {
    $("body").css({
      "background": "linear-gradient(rgba(232, 100, 67, 1), rgba(43, 121, 167, 1))" /* Standard syntax */
    });
  }
}



else if (now.getHours() < 6 || now.getHours() > 18) {
  var hourMap = {
    "20": (screen.width * 9/9),
    "21": (screen.width * 8/9),
    "22": (screen.width * 7/9),
    "23": (screen.width * 6/9),
    "0": (screen.width * 5/9),
    "1": (screen.width * 4/9),
    "2": (screen.width * 3/9),
    "3": (screen.width * 2/9),
    "4": (screen.width * 1/9)
  };

  // Remove clouds
  $(".clouds").css({
    "display": "none"
  });

  // Change the body background color to night
  $("body").css({
    "background": "rgb(30, 30, 30)"
  });

  $("#listTitle").css({
    "color": "white",
    "border": "1px solid rgba(200,200,200, 0.3)",
    "border-radius": "0.3em",
    "background-color": "rgba(30, 30, 30, 0.5)"
  });

  // Create html skyCanvas
  var skyCanvas = document.createElement("canvas");
  // Set context for canvas
  var ctx = skyCanvas.getContext("2d");
  // Set width and height of canvas
  skyCanvas.setAttribute("width", screen.width);
  skyCanvas.setAttribute("height", 900);
  $(skyCanvas).css({
    "z-index": -500,
    "position": "absolute"
  });
  // Prepend to body
  $("body").prepend(skyCanvas);

  // For loop the random generation of
  // stars (circles and dots)
  for (var i = 0; i < 1000; i++) {
    var x = Math.floor(Math.random()*screen.width);
    var y = Math.floor(Math.random()*900);
    var radius = Math.floor(Math.random()*2);
    if (i % 2 === 0) {
      drawCircle(x, y, radius);
    }
    else {
      drawDot(x, y);
    }
  }

  // Create html moonCanvas
  var moonCanvas = document.createElement("canvas");
  // Set context for canvas
  var ctx = moonCanvas.getContext("2d");
  // Set width and height of canvas
  moonCanvas.setAttribute("width", screen.width);
  moonCanvas.setAttribute("height", 500);
  $(moonCanvas).css({
    "position": "absolute",
    "z-index": -450
  });
  // Prepend to body
  $("body").prepend(moonCanvas);

  // Moon is not up at 19th hr or 5th hr
  if (now.getHours() !== 19 && now.getHours() !== 5) {
    moonAnimation();
  }

  if (now.getHours() === 19) {
    $("body").css({
      "background": "linear-gradient(rgb(30, 30, 30), rgb(43, 121, 167))" /* Standard syntax */
    });
  }
  else if (now.getHours() === 5) {
    $("body").css({
      "background": "linear-gradient(rgb(30, 30, 30), rgb(228, 152, 156))" /* Standard syntax */
    });
  }
}
