$(document).ready(function () {
  // Hardcoded credentials for client-side demo
  var VALID_USERNAME = "admin";
  var VALID_PASSWORD = "birthday123";

  // If already logged in, go straight to the birthday page
  if (sessionStorage.getItem("loggedIn") === "true") {
    window.location.href = "index.html";
    return;
  }

  $("#loginForm").on("submit", function (e) {
    e.preventDefault();

    var username = $("#username").val().trim();
    var password = $("#password").val().trim();
    var $error = $(".error-message");

    // Hide any previous error
    $error.hide();

    // Validate empty fields
    if (!username || !password) {
      $error.text("Please fill in all fields.").fadeIn("fast");
      return;
    }

    // Check credentials
    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      sessionStorage.setItem("loggedIn", "true");
      // Brief visual feedback before redirect
      $(".login-btn")
        .text("Welcome!")
        .css({
          background: "linear-gradient(135deg, #27ae60, #2ecc71)",
          "pointer-events": "none",
        });
      setTimeout(function () {
        window.location.href = "index.html";
      }, 600);
    } else {
      $error.text("Invalid username or password.").fadeIn("fast");
      // Shake the card
      $(".login-card")
        .css("animation", "none")
        .delay(10)
        .queue(function (next) {
          $(this).css("animation", "shakeError 0.5s ease");
          next();
        });
    }
  });
});
