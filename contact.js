$(document).ready(function() {
	$("#contactForm").submit(function(e) {
		e.preventDefault();

		var name = $("#name").val();
		var email = $("#email").val();
		var phone = $("#phone").val();
		var subject = $("#subject").val();
		var message = $("#message").val();

		if (name && email && subject && message) {
			$("#formMessage")
				.removeClass("alert-danger")
				.addClass("alert alert-success")
				.html("<strong>Success!</strong> Thank you for your message, " + name + ". We'll get back to you soon!")
				.slideDown();

			$("#contactForm")[0].reset();

			setTimeout(function() {
				$("#formMessage").slideUp();
			}, 5000);
		} else {
			$("#formMessage")
				.removeClass("alert-success")
				.addClass("alert alert-danger")
				.html("<strong>Error!</strong> Please fill in all required fields.")
				.slideDown();
		}
	});

	$(".form-control").on("focus", function() {
		$(this).parent().addClass("focused");
	});

	$(".form-control").on("blur", function() {
		if ($(this).val() === "") {
			$(this).parent().removeClass("focused");
		}
	});
});
