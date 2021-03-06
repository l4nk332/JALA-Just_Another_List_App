$(document).ready(function() {
  // Initialize Tooltipster
  $('.tooltip').tooltipster({
    theme: "tooltipster-light",
    delay: 1200,
    timer: 1500
  });

  // This is a boolean that keeps track of the hiddenToggle
  // being either on or off
  var hidden = false;
  // If text field is empty then checkbox is disabled and
  // blurred
  $("body").on("blur", ".text", function() {
    if(!this.value) {
      $(this).prev(".check").addClass("strikeToggle");
      $(this).prev(".check").prop("disabled", true);
    } else {
      $(this).prev(".check").removeClass("strikeToggle");
      $(this).prev(".check").prop("disabled", false);
    }
  });

  // Toggle strikethrough item when checked is true.
  $("body").on('click', ".check", function() {
    $(this).next('.text').toggleClass("strikeToggle");

    if($(this).next(".text").prop("disabled")) {
      $(this).next('.text').prop("disabled", false);
    } else {
      $(this).next('.text').prop("disabled", true);
      // If Hidden Toggle is on then hide the checked item
      if (hidden) {
        $(this).parent("li").addClass("hiddenToggle");
      }
    }
  });

  // Allow for shift+click multi select list item
  $("body").on('click', ".check", function() {
    // A function that returns the index of a the first
    // checked item it finds
    function returnCheckedItem(startIndex) {
      var checkedArr = [];
      // Traverse backward from startIndex
      for (var i=startIndex-1; i > -1; i--) {
        var currentNode = $("li").get(i);
        // If item is found checked return its index
        if ($(currentNode).children(".text").hasClass("strikeToggle")) {
          checkedArr.push(i);
        }
      }
      if (checkedArr.length > 0) {
        return checkedArr[checkedArr.length-1];
      } else {
        // If no item is found checked return false
        return false;
      }
    }

    // A function that takes two indexes and checks all
    // items between them
    function batchCheck(indx1, indx2) {
      // If false check everything to beginning of list
      if (indx2 === false) {
        indx2 = 0;
      }
      // Traverse backward from startIndex
      for (var i=indx1; i > indx2-1; i--) {
        var currentNode = $("li").get(i);
        // If checkbox is not disabled
        if (!$(currentNode).children(".check").prop("disabled")) {
          // Add strikeToggle and disable textbox
          $(currentNode).children(".text").addClass("strikeToggle");
          $(currentNode).children(".text").prop("disabled", true);
          // Change checkbox value to checked
          $(currentNode).children(".check").prop('checked', true);
          // If Hidden Toggle is on then hide the checked item
          if (hidden) {
            $(currentNode).addClass("hiddenToggle");
          }
        }
      }
    }

    // If item shift+clicked is unchecked check it and all
    // list items up to next prev checked sibling
    if (event.shiftKey) {
      var startNode = $(this).parent("li");
      var startIndx = $("li").index(startNode);
      //console.log(returnCheckedItem(startIndx));
      var endIndx = returnCheckedItem(startIndx);
      batchCheck(startIndx, endIndx);
    }
  });

  // Toggle Show/Hide Completed
  $("body").on("click", "#hiddenButton", function() {
    $("ul").children("li").each(function () {
      if ($(this).children(".check").prop("checked")) {
        $(this).toggleClass("hiddenToggle");
      }
    });
    hidden = (!hidden);
    // Toggle a class that shows if toggleHidden is enabled
    $(this).toggleClass("toggleEnabled");
  });


  // On hover show 'X'
  $("body").on("mouseenter", ".list-item",
    function() {
      $(this).children(".deleteIcon").removeClass("hiddenToggle");
    });
  $("body").on("mouseleave", ".list-item",
    function() {
      $(this).children(".deleteIcon").addClass("hiddenToggle");
    }
  );


  // 'X'.onclick remove item
  // and delete the node element
  $("body").on("click", ".deleteIcon", function() {
    $(this).parent("li").fadeOut(300, function() { $(this).remove(); });
    // Make a DELETE request for the json data at jala-api
    $.ajax({
        url: '/jala-api/' + $(this).siblings(".text").val(),
        type: 'DELETE'
    });
    // Disable the export button
    $(".downloadLink").removeAttr('href');
    $("#exportButton").addClass("disabled");
    $("#send-email").addClass("disabled");
  });

  // All checked items will be removed when 'remove button' is clicked.
  $("body").on("click", "#removeButton", function() {
    $("ul").children("li").each(function () {
      if ($(this).children(".check").prop("checked")) {
        $(this).remove();

        // Make a DELETE request for the json data at jala-api
        $.ajax({
            url: '/jala-api/' + $(this).children(".text").val(),
            type: 'DELETE'
        });

      }
    });
    // Disable the export button
    $(".downloadLink").removeAttr('href');
    $("#exportButton").addClass("disabled");
    $("#send-email").addClass("disabled");
  });

  // Create a way to add list items
  // appending them to the end using templating
  $("body").on("click", "#addItemButton", function() {
    $("ul").append("<li class='list-item'><input type='checkbox' class='check strikeToggle' disabled tabindex='-1'><input class='text' maxlength='30' tabindex='0'><span class='hiddenToggle deleteIcon'>&#x2715;</span></li>");
  });


  // Allow list-item to be dragged and moved
  $("ul").sortable({
    cursor: "move",
    containment: "body",
  });


  // Make a GET request for the json data at jala-api

  $.getJSON('/jala-api', function(terms) {
    // For each term in jala-api append to list
    terms.forEach(function(term) {
      if (term.listText) {
        $("ul").append("<li class='list-item'><input type='checkbox' class='check' tabindex='-1'><input class='text' maxlength='30' value=" + term.listText + " tabindex='0'><span class='hiddenToggle deleteIcon'>&#x2715;</span></li>");
      } else if (term.listTitle) {
        $(".list-header").children("input").val(term.listTitle);
      }
      // Disable the export button
      $(".downloadLink").removeAttr('href');
      $("#exportButton").addClass("disabled");
    });
    // If the api has less than 8 terms fill in (append)
    // enough empty items to fill list.
    if (terms.length < 8) {
      for (var i = 0; i < 8 - terms.length; i++){
        $("ul").append("<li class='list-item'><input type='checkbox' class='check strikeToggle' disabled tabindex='-1'><input class='text' maxlength='30' tabindex='0'><span class='hiddenToggle deleteIcon'>&#x2715;</span></li>");
      }
    }
  });


  // Make a POST request when 'Save' button is clicked
  // and save current state of list to the jale-api

  $("body").on("click", "#saveButton", function() {
    var jsonArr = [];
    var jsonTitle = $(".list-header").children("input").val();
    //console.log(jsonTitle);
    $("ul").children("li").each(function () {
      jsonArr.push({listText: $(this).children(".text").val()});
    });
    $.post('/jala-api', {listTitle: jsonTitle, listArr: JSON.stringify(jsonArr)}, function () {
      // Replace spaces in list title so that it is not
      // in file name.
      jsonTitle = jsonTitle.replace(/\s/g, "_");
      // Disable button for a short period so that
      // multiple post requests aren't accidentally
      // made
      $("#saveButton").addClass("disabled");
      $("#saveButton").prop("disabled", true);
      // Add href with value when save clicked
      // Change the Export button to link to the correct file
      $(".downloadLink").attr("href", "./lists/" + jsonTitle + ".txt");
      $("#exportButton").removeClass("disabled");
      $("#send-email").removeClass("disabled");
      // Enable 'save' button
      setTimeout(function() {
        $("#saveButton").removeClass("disabled");
        $("#saveButton").prop("disabled", false);
      }, 1500);
    });

  });


  // When listTitle is changed disable the Export button
  $("body").on("change", $(".list-header").children("input"), function() {
    // Disable the export button
    $(".downloadLink").removeAttr('href');
    $("#exportButton").addClass("disabled");
    $("#send-email").addClass("disabled");
  });


  // When list-items are changed disable the Export button
  $("body").on("change", $("li").children(".text"),function() {
    // Disable the export button
    $(".downloadLink").removeAttr('href');
    $("#exportButton").addClass("disabled");
    $("#send-email").addClass("disabled");
  });


  // When enter key is pressed add to the list
  $(document).keypress(function(e) {
    if(e.which == 13) {
        event.preventDefault();
        // Add new list-item
        $("ul").append("<li class='list-item'><input type='checkbox' class='check strikeToggle' disabled tabindex='-1'><input class='text' maxlength='30' tabindex='0'><span class='hiddenToggle deleteIcon'>&#x2715;</span></li>");
    }
  });


  // When 'Send This List' is clicked toggleHidden off so that
  // email form pops up.
  $("body").on("click", "#emailButton", function() {
    // If email button is not disabled
    if (!$(this).hasClass("disabled")) {
      $("#emailButton").addClass("disabled");
      $(".email-form").show("drop", { direction: "up" },1000);
    }
  });

  // When email input box value is changed. Disable 'send'
  // until 'save' is clicked again.
  $("body").on("input", $(".email-input"),function() {
    // Disable the 'send' button
    $("#send-email").addClass("disabled");
  });

  // When 'Send' is clicked make a req and hide the email form
  $("body").on("click", "#send-email", function() {
    if (!$(this).hasClass("disabled")) {
      // Send a request to send an email
      $.post('/jala-email', {email: $(".email-input").val(), title: $("#listTitle").val(), type: "html"}, function() {
        // Reset application
        $("#emailButton").removeClass("disabled");
        $(".email-form").hide("drop", { direction: "up" }, 1000);
        $(this).removeAttr("title");
      });
    } else {
      $(this).attr("title", "Please save before sending");
    }
  });
});
