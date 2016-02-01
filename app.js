var express = require("express");
// CORS -> Cross Origin Resource Sharing
// This module allows the api to be accessed by other urls
// other than its own.
var cors = require("cors");
var bodyParser = require("body-parser");
var app = express();


var testItems = [
  {
    listText: "'To-do...'"
  },
];

// This will parse both json and http encoded data
// placing variables neatly on the req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use(function(req, res, next) {

  console.log(req.method + " request for " + req.url + " - " + JSON.stringify(req.body));
  next();

});

app.use(express.static("./public"));

// Adds cross resource sharing, allowing any domain to req api
app.use(cors());

app.get("/jala-api", function(req, res) {
  res.json(testItems);
});

app.post("/jala-api", function(req, res) {
  // Push new list-item into jala-api
  testItems.push(req.body);
  // Respond with updated api
  res.json(testItems);
});

// Listens for a DELETE req provided w/ given term
app.delete("/jala-api/:term", function(req, res) {
  testItems = testItems.filter(function(item) {
    return item.listText.toLowerCase() !== "'" + req.params.term.toLowerCase() + "'";
  });
  res.json(testItems);
});

app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
