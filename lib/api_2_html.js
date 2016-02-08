var fs = require("fs");

function api2Html(apiArray, callback) {
    var listTitle = "";
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

    // Output string is the first half of the html
    // with style tag
    var outputString = "<style> body { background-color: rgb(51, 142, 172); } h1 { max-width: 390px; min-width: 205px; margin: 20px auto; padding: 10px 5px; background-color: rgb(243, 191, 127); font-family: Arial, Helvetica, sans-serif; font-size: 2.3em; font-weight: 500; text-align: center; border-radius: 0.3em; } ul { max-width: 375px; min-width: 205px; margin: auto; background-color: rgb(142, 212, 127); padding: 25px 40px 50px 50px; border-radius: 1em; } li { font-family: Tahoma, Geneva, sans-serif; font-size: 1.3em; font-weight: 100; border-bottom: 1px solid black; list-style: circle;padding: 10px;margin: 10px 0px;}</style><body>";

    // Append the h1 with the listTitle
    // and begin the openning ul tag
    outputString += "<h1>" + listTitle + "</h1><ul>";

    // Append each list item to the unordered list
    listItems.forEach(function(item) {
      outputString += "<li>" + item + "</li>";
    });
    // When all list items appended close the
    // unordered list and body tags.
    outputString += "</ul></body>";

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
