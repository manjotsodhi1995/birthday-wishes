$(document).ready(function () {
  var emailInput = $("#email");
  var passwordInput = $("#password");
  var loginBtn = $("#loginBtn");
  var alertBanner = $("#alertBanner");

  // Demo credentials
  var VALID_EMAIL = "demo@example.com";
  var VALID_PASSWORD = "password123";

  // Clear errors on input
  emailInput.on("input", function () {
    clearFieldError(emailInput, "#emailError");
    hideAlert();
  });

  passwordInput.on("input", function () {
    clearFieldError(passwordInput, "#passwordError");
    hideAlert();
  });

  // Form submit
  $("#loginForm").on("submit", function (e) {
    e.preventDefault();
    hideAlert();

    var email = emailInput.val().trim();
    var password = passwordInput.val().trim();
    var isValid = true;

    // Validate email
    if (!email) {
      showFieldError(emailInput, "#emailError", "Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showFieldError(emailInput, "#emailError", "Please enter a valid email");
      isValid = false;
    }

    // Validate password
    if (!password) {
      showFieldError(passwordInput, "#passwordError", "Password is required");
      isValid = false;
    } else if (password.length < 6) {
      showFieldError(
        passwordInput,
        "#passwordError",
        "Password must be at least 6 characters"
      );
      isValid = false;
    }

    if (!isValid) return;

    // Show loading state
    loginBtn.addClass("loading").prop("disabled", true);

    // Simulate network delay for UX
    setTimeout(function () {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        showAlert("success", "Login successful! Redirecting...");
        sessionStorage.setItem("authenticated", "true");

        setTimeout(function () {
          window.location.href = "index.html";
        }, 800);
      } else {
        showAlert("error", "Invalid email or password. Please try again.");
        loginBtn.removeClass("loading").prop("disabled", false);
        passwordInput.val("").focus();
      }
    }, 1000);
  });

  // Helper functions
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFieldError(input, errorSelector, message) {
    input.addClass("input-error");
    $(errorSelector).text(message).addClass("visible");
  }

  function clearFieldError(input, errorSelector) {
    input.removeClass("input-error");
    $(errorSelector).removeClass("visible");
  }

  function showAlert(type, message) {
    alertBanner
      .removeClass("alert-error alert-success")
      .addClass("alert-" + type)
      .text(message)
      .fadeIn(200);
  }

  function hideAlert() {
    alertBanner.fadeOut(200).removeClass("alert-error alert-success");
  }

  // Focus email on load
  emailInput.focus();
});
