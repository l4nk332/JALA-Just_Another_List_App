$(document).ready(function() {

  // If text field is empty then checkbox is disabled and
  // blurred
  $(".text").blur(function() {
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
  $(".check").on('click', function() {
  $(this).next('.text').toggleClass("strikeToggle");
  if($(this).next(".text").prop("disabled")) {
      $(this).next('.text').prop("disabled", false);
    } else {
      $(this).next('.text').prop("disabled", true);
    }
  });

  // Toggle Show/Hide Completed
  $("#hiddenButton").click(function() {
    $("ul").children("li").each(function () {
      if ($(this).children(".check").prop("checked")) {
        $(this).toggleClass("hiddenToggle");
      }
    });
  });


  // On hover show 'X'
  $(".list-item").hover(
    function() {
      $(this).children(".deleteIcon").removeClass("hiddenToggle");
    },
    function() {
      $(this).children(".deleteIcon").addClass("hiddenToggle");
    }
  );


  // 'X'.onclick remove item
  // and delete the node element
  $(".deleteIcon").click( function() {
    $(this).parent("li").fadeOut(300, function() { $(this).remove(); });
  });

  // Create a way to add list items
  // appending them to the end using templating



  // Allow list-item to be dragged and moved
  $("ul").sortable({
    cursor: "move",
    containment: "#list-container"
  });
  
});
