var express = require("express");

var app = express();

app.use(express.static("./public"));


app.listen(3000);

console.log("Express app running on port 3000");

module.exports = app;
