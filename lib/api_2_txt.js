var fs = require("fs");

function api2File(apiArray) {
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

    // Append the title with the underline
    var outputString = listTitle + "\n" + titleUnderline + "\n";

    // Append each list item with correct formatting
    // to the outputString
    listItems.forEach(function(item) {
      outputString += "\n" + "* " + item + "\n";
    });

    // Write the file with the name being the list title
    fs.writeFile("./lists/" + listTitle + ".txt", outputString, function(err) {
      console.log("File Created");
    });
}

module.exports = api2File;
