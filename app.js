// Custom module for building list as .html
var api2Html = require("./lib/api_2_html");
// Custom module for building list as a .txt file
var api2File = require("./lib/api_2_txt");
var reqLogger = require("./lib/reqLogger");
var fs = require("fs");
var express = require("express");
// CORS -> Cross Origin Resource Sharing
// This module allows the api to be accessed by other urls
// other than its own.
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();
// nodemailer allows the creation of an smtp transporter
// object and will be used to email the list.
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport('smtps://justanotherlistapp%40gmail.com:microphonecheck12@smtp.gmail.com');


var testItems = [
  {
    listText: "'To-do...'"
  }
];

// This will parse both json and http encoded data
// placing variables neatly on the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {

  //console.log(req.method + " request for " + req.url + " - " + JSON.stringify(req.body));
  // Provide custom module reqLogger with decorated request object
  // to create log files accordingly
  reqLogger(req);
  next();

});

app.use(express.static("./public"));

// Adds cross resource sharing, allowing any domain to req api
app.use(cors());

app.get("/jala-api", function(req, res) {
  res.json(testItems);
});

// This gives the txtName and html vars scope
// for both the saving of the api to a file
// and email the file contents.
var txtName;
var htmlName;
// Listens for a POST req provided and replaces api
// with updated list.
app.post("/jala-api", function(req, res) {
  //console.log(req.body);
  //console.log(JSON.parse(req.body.listArr));
  var listArr = (JSON.parse(req.body.listArr));
  // Clear the api
  testItems = [];
  // Update the list-header
  testItems.push({listTitle: req.body.listTitle});
  //console.log(req.body.listTitle);
  // Push new list-item into jala-api if it has some
  // form of text that passes the regex
  //console.log(/^\s*\w/g.test(req.body.listText));
  listArr.forEach(function(item) {
    if (/^\s*\w/g.test(item.listText)) {
      // The ' ' allow for spaces to be saved to api
      item.listText = "'" + item.listText + "'";
      testItems.push(item);
    }
  });
  // Respond with updated api
  res.json(testItems);
  // Run the api2File module to create a local copy
  // of the list in txt template
  txtName = api2File(testItems);
  console.log("Creating: " + txtName);
  // Run the api2Html module to create a local copy
  // of the list in html template
  htmlName = api2Html(testItems);
  console.log("Creating: " + htmlName);
});

// Listens for a DELETE req provided w/ given term
app.delete("/jala-api/:term", function(req, res) {
  testItems = testItems.filter(function(item) {
    return item.listText !== "'" + req.params.term + "'";
  });
  res.json(testItems);
});


// Handle email request
app.post('/jala-email', function(req, res) {
  var emailFile = txtName;
  if (req.body.type === "html") {
    // Re-assign emailed file to html if
    // specified in request.
    emailFile = htmlName;
  }
  // console.log("Email: " + req.body.email);
  // console.log("Subject: " + req.body.title);
  // Use fs module to read saved api list file and use its
  // contents as the email body.
  //console.log("About to read: " + txtName);
  fs.readFile("./public/lists/" + emailFile, function(err, data) {
    var mailOptions = {
        from: "JALA",
        to: req.body.email,
        subject: req.body.title,
        html: data
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            return console.log(err);
        }
        console.log("Message sent to: " + req.body.email + "\n" + "Subject: " + req.body.title + "\n" + info.response);
        res.end();
    });
  });

});


// If second argument is -p flag and the third argument is
// a valid number, the application will listen on the
// specified number. Otherwise run on port 3000.
var portNumber;

if (process.argv[2] === "-p" && /\d+/g.test(process.argv[3])) {
  portNumber = Number(process.argv[3]);
} else {
  portNumber = 3000;
}

app.listen(portNumber);

console.log("Express app running on port " + portNumber);

module.exports = app;
