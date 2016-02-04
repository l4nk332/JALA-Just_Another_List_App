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
  var fileName = api2File(testItems);
  console.log("The File Name is: " + fileName);
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
  console.log(req.body.email);
  res.end();
  // var mailOptions = {
  //     from: "Admin",
  //     to: "ianwillyjabour@icloud.com",
  //     subject: "Testing",
  //     text: "Email from application"
  // };
  //
  // transporter.sendMail(mailOptions, function(err, info) {
  //     if (err) {
  //         return console.log(err);
  //     }
  //     console.log("Message sent: " + info.response);
  // });

});



app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
