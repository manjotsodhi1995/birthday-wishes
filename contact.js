$(document).ready(function() {
  $("#contactForm").on("submit", function(e) {
    e.preventDefault();

    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();

    if (name && email && subject && message) {
      $("#contactForm").fadeOut("slow", function() {
        $("#successMessage").fadeIn("slow");
      });

      setTimeout(function() {
        $("#name").val("");
        $("#email").val("");
        $("#subject").val("");
        $("#message").val("");
        $("#successMessage").fadeOut("slow", function() {
          $("#contactForm").fadeIn("slow");
        });
      }, 5000);
    }
  });

  $('body').addClass('peach-after');
});
