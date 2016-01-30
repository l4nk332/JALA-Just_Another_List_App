$(document).ready(function() {

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
  // Toggle strikethrough item and move it to the top
  // when checked is true.
  $("body").on('click', ".check", function() {
  $(this).next('.text').toggleClass("strikeToggle");
  if($(this).next(".text").prop("disabled")) {
      $(this).next('.text').prop("disabled", false);
    } else {
      $(this).next('.text').prop("disabled", true);
    }
  });

  // Toggle Show/Hide Completed
  $("body").on("click", "#hiddenButton", function() {
    $("ul").children("li").each(function () {
      if ($(this).children(".check").prop("checked")) {
        $(this).toggleClass("hiddenToggle");
      }
    });
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
  });

  // Create a way to add list items
  // appending them to the end using templating
  $("body").on("click", "#addItemButton", function() {
    $("ul").append("<li class='list-item'><input type='checkbox' class='check strikeToggle' disabled><input class='text'/><span class='hiddenToggle deleteIcon'>&#x2715;</span></li>");
  });


  // Allow list-item to be dragged and moved
  $("ul").sortable({
    cursor: "move",
    containment: "#list-container",
  });

});
