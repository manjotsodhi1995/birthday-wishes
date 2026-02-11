$(document).ready(function () {
	var VALID_USERNAME = "admin";
	var VALID_PASSWORD = "admin123";

	var $form = $("#loginForm");
	var $username = $("#username");
	var $password = $("#password");
	var $error = $("#errorMessage");
	var $btn = $("#loginBtn");

	function showError(msg) {
		$error.text(msg).addClass("visible");
		$username.addClass("input-error");
		$password.addClass("input-error");

		setTimeout(function () {
			$username.removeClass("input-error");
			$password.removeClass("input-error");
		}, 600);
	}

	function hideError() {
		$error.removeClass("visible");
	}

	$username.on("input", hideError);
	$password.on("input", hideError);

	$form.on("submit", function (e) {
		e.preventDefault();

		var username = $.trim($username.val());
		var password = $.trim($password.val());

		if (!username || !password) {
			showError("Please fill in all fields.");
			return;
		}

		if (username !== VALID_USERNAME || password !== VALID_PASSWORD) {
			showError("Invalid username or password.");
			return;
		}

		// Successful login
		sessionStorage.setItem("birthday_authenticated", "true");

		$btn.text("Welcome! \uD83C\uDF89").css({
			"pointer-events": "none",
			"background": "linear-gradient(135deg, #00c853, #64dd17)"
		});

		setTimeout(function () {
			window.location.href = "index.html";
		}, 800);
	});
});
