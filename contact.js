// Contact Form Handler
$(document).ready(function() {
    // Form submission handler
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        var name = $('#name').val().trim();
        var email = $('#email').val().trim();
        var phone = $('#phone').val().trim();
        var subject = $('#subject').val().trim();
        var message = $('#message').val().trim();
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return false;
        }
        
        // Email validation
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address.');
            return false;
        }
        
        // Simulate form submission (in a real application, this would send data to a server)
        submitForm(name, email, phone, subject, message);
    });
    
    // Simulate form submission
    function submitForm(name, email, phone, subject, message) {
        // Show loading state
        var submitBtn = $('#contactForm button[type="submit"]');
        var originalText = submitBtn.text();
        submitBtn.prop('disabled', true).text('Sending...');
        
        // Simulate server delay
        setTimeout(function() {
            // Hide the form
            $('#contactForm').fadeOut(400, function() {
                // Show success message
                $('#formSuccess').fadeIn(400);
                
                // Log form data (in production, this would be sent to a server)
                console.log('Form submitted with the following data:');
                console.log('Name:', name);
                console.log('Email:', email);
                console.log('Phone:', phone);
                console.log('Subject:', subject);
                console.log('Message:', message);
                
                // Reset form after 5 seconds and show it again
                setTimeout(function() {
                    $('#formSuccess').fadeOut(400, function() {
                        $('#contactForm')[0].reset();
                        submitBtn.prop('disabled', false).text(originalText);
                        $('#contactForm').fadeIn(400);
                    });
                }, 5000);
            });
        }, 1500);
    }
    
    // Add input animations
    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    });
    
    $('.form-control').on('blur', function() {
        if (!$(this).val()) {
            $(this).parent().removeClass('focused');
        }
    });
    
    // Character counter for message textarea
    var maxLength = 500;
    $('#message').on('input', function() {
        var currentLength = $(this).val().length;
        
        // Add counter if it doesn't exist
        if (!$('#charCounter').length) {
            $(this).after('<small id="charCounter" style="display: block; text-align: right; color: #666; margin-top: 5px;"></small>');
        }
        
        $('#charCounter').text(currentLength + ' / ' + maxLength + ' characters');
        
        if (currentLength > maxLength) {
            $('#charCounter').css('color', '#C4515C');
        } else {
            $('#charCounter').css('color', '#666');
        }
    });
    
    // Add smooth scroll for better UX
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        var target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });
    
    // Add entrance animations to info boxes
    $(window).on('scroll', function() {
        $('.info-box').each(function() {
            var elementTop = $(this).offset().top;
            var viewportBottom = $(window).scrollTop() + $(window).height();
            
            if (elementTop < viewportBottom - 100) {
                $(this).addClass('visible');
            }
        });
    });
});
