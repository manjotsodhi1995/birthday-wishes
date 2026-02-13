$(document).ready(function () {
	// Simple email regex
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	// Clear error state on input focus
	$('#contactForm input, #contactForm textarea').on('focus', function () {
		$(this).removeClass('input-error');
		$(this).closest('.form-group').find('.error-text').fadeOut(200);
	});

	// Form submission handler
	$('#contactForm').on('submit', function (e) {
		e.preventDefault();

		var isValid = true;

		var name = $('#contactName').val().trim();
		var email = $('#contactEmail').val().trim();
		var subject = $('#contactSubject').val().trim();
		var message = $('#contactMessage').val().trim();

		// Validate Name
		if (name === '') {
			$('#contactName').addClass('input-error');
			$('#nameError').fadeIn(200);
			isValid = false;
		}

		// Validate Email
		if (email === '') {
			$('#contactEmail').addClass('input-error');
			$('#emailError').text('Please enter your email').fadeIn(200);
			isValid = false;
		} else if (!emailRegex.test(email)) {
			$('#contactEmail').addClass('input-error');
			$('#emailError').text('Please enter a valid email').fadeIn(200);
			isValid = false;
		}

		// Validate Subject
		if (subject === '') {
			$('#contactSubject').addClass('input-error');
			$('#subjectError').fadeIn(200);
			isValid = false;
		}

		// Validate Message
		if (message === '') {
			$('#contactMessage').addClass('input-error');
			$('#messageError').fadeIn(200);
			isValid = false;
		}

		if (isValid) {
			// Hide form, show success
			$('.contact-form-card').fadeOut(400, function () {
				$('.success-message').fadeIn(400);
			});
		}
	});
});
