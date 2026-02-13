// Contact Form JavaScript
(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    $(document).ready(function() {
        
        // Form validation and submission
        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            var name = $('#name').val().trim();
            var email = $('#email').val().trim();
            var subject = $('#subject').val().trim();
            var message = $('#message').val().trim();
            
            // Validation flag
            var isValid = true;
            
            // Validate name
            if (name === '') {
                showError('nameError', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('emailError', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('messageError', 'Please enter a message');
                isValid = false;
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If validation passes, submit the form
            if (isValid) {
                submitForm(name, email, subject, message);
            } else {
                showErrorMessage();
            }
        });
        
        // Real-time validation on blur
        $('#name').on('blur', function() {
            var name = $(this).val().trim();
            if (name === '') {
                showError('nameError', 'Please enter your name');
            } else {
                clearError('nameError');
            }
        });
        
        $('#email').on('blur', function() {
            var email = $(this).val().trim();
            if (email === '') {
                showError('emailError', 'Please enter your email');
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
            } else {
                clearError('emailError');
            }
        });
        
        $('#message').on('blur', function() {
            var message = $(this).val().trim();
            if (message === '') {
                showError('messageError', 'Please enter a message');
            } else if (message.length < 10) {
                showError('messageError', 'Message must be at least 10 characters long');
            } else {
                clearError('messageError');
            }
        });
        
        // Clear error on input focus
        $('.form-control').on('focus', function() {
            var fieldId = $(this).attr('id');
            clearError(fieldId + 'Error');
            hideMessages();
        });
    });
    
    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show individual field error
    function showError(elementId, message) {
        $('#' + elementId).text(message).fadeIn();
        $('#' + elementId.replace('Error', '')).addClass('has-error');
    }
    
    // Clear individual field error
    function clearError(elementId) {
        $('#' + elementId).text('').hide();
        $('#' + elementId.replace('Error', '')).removeClass('has-error');
    }
    
    // Clear all errors
    function clearErrors() {
        $('.error-message').text('').hide();
        $('.form-control').removeClass('has-error');
    }
    
    // Show error message
    function showErrorMessage() {
        $('#successMessage').hide();
        $('#errorMessage').fadeIn();
        
        // Scroll to the error message
        $('html, body').animate({
            scrollTop: $('#errorMessage').offset().top - 100
        }, 500);
    }
    
    // Show success message
    function showSuccessMessage() {
        $('#errorMessage').hide();
        $('#successMessage').fadeIn();
        
        // Scroll to the success message
        $('html, body').animate({
            scrollTop: $('#successMessage').offset().top - 100
        }, 500);
    }
    
    // Hide messages
    function hideMessages() {
        $('#successMessage').fadeOut();
        $('#errorMessage').fadeOut();
    }
    
    // Submit form function
    function submitForm(name, email, subject, message) {
        // Show loading state
        $('.btn-text').hide();
        $('.btn-loading').show();
        $('.btn-primary').prop('disabled', true);
        
        // Simulate form submission (replace with actual AJAX call to server)
        setTimeout(function() {
            // In a real application, you would send the data to a server here
            // For now, we'll just simulate a successful submission
            
            console.log('Form Data:', {
                name: name,
                email: email,
                subject: subject,
                message: message
            });
            
            // Reset loading state
            $('.btn-text').show();
            $('.btn-loading').hide();
            $('.btn-primary').prop('disabled', false);
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            $('#contactForm')[0].reset();
            
            // Hide success message after 5 seconds
            setTimeout(function() {
                $('#successMessage').fadeOut();
            }, 5000);
            
        }, 1500); // Simulate network delay
    }
    
    // Add CSS class for form field with error
    var style = document.createElement('style');
    style.textContent = `
        .form-control.has-error {
            border-color: #C4515C;
            box-shadow: 0 0 8px rgba(196, 81, 92, 0.3);
        }
    `;
    document.head.appendChild(style);
    
})();
