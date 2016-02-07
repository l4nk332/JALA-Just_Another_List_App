var fs = require("fs");

function api2Html(apiArray, callback) {
    var listTitle = "";
    var titleUnderline = "";
    var listItems = [];
    // Assign list title to a variable
    // and assign list items to array
    apiArray.forEach(function (obj) {
      if (obj.listTitle) {
        listTitle = obj.listTitle;
      } else if (obj.listText) {
        listItems.push(obj.listText.replace(/^'|'$/g, ""));
      }
    });

    // Create an underline for the list title
    // according to its length
    for (var i = 0; i < listTitle.length; i++) {
      titleUnderline += "-";
    }

    // Title as H1 and begin unordered list
    var outputString = "<h1>" + listTitle + "</h1><ul>";

    // Append each list item to the unordered list
    listItems.forEach(function(item) {
      outputString += "<li>" + item + "</li>";
    });
    // When all list items appended close the
    // unordered list.
    outputString += "</ul>";

    // Replace spaces in list title so that it is not
    // in file name.
    listTitle = listTitle.replace(/\s/g, "_");

    // Write the file with the name being the list title
    fs.writeFile("./public/lists/" + listTitle + ".html", outputString, function(err) {
      console.log("HTML File Created");
    });

    // Return the newly created file name
    return (listTitle + ".html");

}

module.exports = api2Html;
