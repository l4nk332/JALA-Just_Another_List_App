// Make a function that can take a specific time
// value and run the animation according to the
// inputed time frame
function runAnimation(timeValue) {
  // Set current time to inputed timeValue (full date and time)
  var now = timeValue;
  //console.log("Time value is: " + now);

  // Assign vendor prefixes to requestAnimationFrame
  var requestAnimationFrame = window.requestAnimationFrame ||
                              window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame ||
                              window.oRequestAnimationFrame ||
                              window.msRequestAnimationFrame;

  // Define functions for daylight
  function drawSun (x, y) {
    // Draw the circle and fill it
    sunCtx.fillStyle = "rgba(247, 206, 0, 0.7)";
    sunCtx.beginPath();
    sunCtx.arc(x, y, 100, 2*Math.PI, 0);
    sunCtx.fill();
  }

  function drawLongRay () {
    sunCtx.beginPath();
    sunCtx.strokeStyle = "rgba(255, 84, 0, 0.3)";
    sunCtx.lineWidth = 8;
    sunCtx.moveTo(0, -180);
    sunCtx.lineTo(0, -115);
    sunCtx.stroke();
  }

  function drawShortRay () {
    sunCtx.beginPath();
    sunCtx.strokeStyle = "rgba(255, 0, 0, 0.3)";
    sunCtx.lineWidth = 5;
    sunCtx.moveTo(0, -140);
    sunCtx.lineTo(0, -110);
    sunCtx.stroke();
  }

  function drawSunRays() {
    sunCtx.lineCap = 'round';
    for (var i = 0; i < 12; i++) {
      // Run drawRay function
      if (i % 2 === 0) {
        drawLongRay();
      } else {
        drawShortRay();
      }
      // Rotate and repeat drawRay
      sunCtx.rotate(Math.PI/6);
    }
  }

  function sunAnimation() {
    var x = hourMap[now.getHours().toString()], y = 30;
    sunCtx.clearRect(0, 0, screen.width, 500);
    sunCtx.save();
    drawSun(x, y);
    // Translate Canvas to center of circle
    sunCtx.translate(x, y);
    var time = new Date();
    // Rotate canvas at circle center with every
    // half second moving clockwise
    sunCtx.rotate( ((2*Math.PI)/30)*time.getSeconds() + ((2*Math.PI)/30000)*time.getMilliseconds() );
    // Draw rays
    drawSunRays();
    // Restore canvas to original state
    sunCtx.restore();
    requestAnimationFrame(sunAnimation);
  }

  // Define variables and functions for night
  function drawCircle(x, y, radius, color) {
    skyCtx.beginPath();
    skyCtx.arc(x, y, radius, 0, 2*Math.PI);
    skyCtx.fillStyle = color || "white";
    skyCtx.fill();
  }

  function drawDot(x, y) {
    skyCtx.fillStyle = "white";
    skyCtx.fillRect(x,y,1,1); // fill in the pixel at (x,y)
  }

  function drawCrater(x, y, radius, color) {
    moonCtx.beginPath();
    moonCtx.arc(x, y, radius, 0, 2*Math.PI);
    moonCtx.fillStyle = color || "white";
    moonCtx.fill();
  }

  function drawMoonCraters() {
    // Fill moon with craters
    drawCrater(-40, -55, 7, "rgba(165, 165, 165, 0.1)");
    drawCrater(80, 40, 5, "rgba(165, 165, 165, 0.1)");
    drawCrater(-25, 45, 17, "rgba(165, 165, 165, 0.1)");
    drawCrater(0, -80, 8, "rgba(165, 165, 165, 0.1)");
    drawCrater(80, 0, 8, "rgba(165, 165, 165, 0.1)");
    drawCrater(40, -15, 12, "rgba(165, 165, 165, 0.1)");
    drawCrater(25, 55, 7, "rgba(165, 165, 165, 0.1)");
    drawCrater(-65, 5, 12, "rgba(165, 165, 165, 0.1)");
    drawCrater(40, -65, 15, "rgba(165, 165, 165, 0.1)");
    drawCrater(-10, -10, 22, "rgba(165, 165, 165, 0.1)");
  }

  // Write a function that will draw the moon at
  // given x, y
  function moonAnimation() {
    var x = nightMap[now.getHours().toString()], y = 100;
    // Clear canvas
    moonCtx.clearRect(0, 0, screen.width, 500);
    // Save state of canvas
    moonCtx.save();
    // Draw the full-moon shape
    drawCrater(x, y, 100, "rgb(234, 231, 211)");
    // Translate canvas to circle center
    moonCtx.translate(x, y);
    var time = new Date();
    // Rotate canvas at circle center with every
    // half second moving clockwise
    moonCtx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds() );
    // Fill moon with craters
    drawMoonCraters();
    // Restore canvas to previous state
    moonCtx.restore();
    requestAnimationFrame(moonAnimation);
  }


  // IF/ELSE logic determining which animation to run
  // with corresponding background

  // Only draw sun animation between 6am and 6:59pm
  if (now.getHours() > 5 && now.getHours() < 19) {
    // Add clouds if not present
    if ($(".clouds").css("display") === "none") {
      $(".clouds").css({
      "display": "inline"
      });
    }
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
    // Change the body background color to day
    $("body").css({
      "background": "rgb(51, 142, 172)"
    });
    var sunCtx = canvas.getContext("2d");
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
        "background": "linear-gradient(rgba(228, 152, 156, 1), rgb(51, 142, 172))"
      });
    }
    // At 7am
    else if (now.getHours() === 7) {
      $("body").css({
        "background": "linear-gradient(rgba(228, 152, 156, 0.7), rgb(51, 142, 172))"
      });
    }
    // At 8am
    else if (now.getHours() === 8) {
      $("body").css({
        "background": "linear-gradient(rgba(228, 152, 156, 0.5), rgb(51, 142, 172))"
      });
    }
    // At 4pm
    else if (now.getHours() === 16) {
      $("body").css({
        "background": "linear-gradient(rgba(232, 100, 67, 0.5), rgba(43, 121, 167, 0.5))"
      });
    }
    // At 5pm
    else if (now.getHours() === 17) {
      $("body").css({
        "background": "linear-gradient(rgba(232, 100, 67, 0.7), rgba(43, 121, 167, 0.7))"
      });
    }
    // At 6pm (sun is out of frame)
    else if (now.getHours() === 18) {
      $("body").css({
        "background": "linear-gradient(rgba(232, 100, 67, 1), rgba(43, 121, 167, 1))"
      });
    }
  }



  else if (now.getHours() < 6 || now.getHours() > 18) {
    var nightMap = {
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
    var skyCtx = skyCanvas.getContext("2d");
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
    var moonCtx = moonCanvas.getContext("2d");
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
        "background": "linear-gradient(rgb(30, 30, 30), rgb(43, 121, 167))"
      });
    }
    else if (now.getHours() === 5) {
      $("body").css({
        "background": "linear-gradient(rgb(30, 30, 30), rgb(228, 152, 156))"
      });
    }
  }
}

// Initial state of page should be current time
var initTime = new Date();
console.log("Current time is: " + initTime);
// Run animation with current time
runAnimation(initTime);


// // FOR TESTING THE DIFFERENT TIME SHIFTS
// // USE AN INDEX OF ARRAY AS ARGUMENT FOR
// // runAnimation()
//
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
// var testDate = new Date(timeArr[0]);
// runAnimation(testDate);
