// Login Page JavaScript

$(document).ready(function() {
    // Valid credentials (for demo purposes)
    const validCredentials = {
        password: 'birthday'
    };

    // Check if user is already logged in
    if (sessionStorage.getItem('isLoggedIn') === 'true') {
        window.location.href = 'index.html';
        return;
    }

    // Check for remembered login
    if (localStorage.getItem('rememberedUser')) {
        $('#username').val(localStorage.getItem('rememberedUser'));
        $('#remember').prop('checked', true);
    }

    // Form submission handler
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        
        const username = $('#username').val().trim();
        const password = $('#password').val();
        const remember = $('#remember').is(':checked');
        
        // Hide any previous error messages
        $('#errorMessage').removeClass('show');
        
        // Add loading state
        $('.btn-login').addClass('loading');
        
        // Simulate authentication delay
        setTimeout(function() {
            // Validate credentials (password must be "birthday")
            if (username && password === validCredentials.password) {
                // Success!
                handleLoginSuccess(username, remember);
            } else {
                // Failed
                handleLoginFailure();
            }
        }, 800);
    });

    // Handle successful login
    function handleLoginSuccess(username, remember) {
        // Remove loading state
        $('.btn-login').removeClass('loading');
        
        // Add success animation
        $('.login-box').addClass('success');
        
        // Store login state
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Handle remember me
        if (remember) {
            localStorage.setItem('rememberedUser', username);
        } else {
            localStorage.removeItem('rememberedUser');
        }
        
        // Show success message and redirect
        $('.btn-login .btn-text').html('Welcome, ' + username + '! 🎊');
        
        setTimeout(function() {
            // Redirect to main page
            window.location.href = 'index.html';
        }, 1500);
    }

    // Handle failed login
    function handleLoginFailure() {
        // Remove loading state
        $('.btn-login').removeClass('loading');
        
        // Show error message
        $('#errorMessage').addClass('show');
        
        // Shake the password field
        $('#password').css('animation', 'shake 0.5s ease-in-out');
        setTimeout(function() {
            $('#password').css('animation', '');
        }, 500);
        
        // Clear password field
        $('#password').val('').focus();
    }

    // Input field animations
    $('.form-control').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        $(this).parent().removeClass('focused');
    });

    // Clear error message when user starts typing
    $('#username, #password').on('input', function() {
        $('#errorMessage').removeClass('show');
    });

    // Add confetti effect on successful login (optional enhancement)
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#f7dc6f', '#a29bfe', '#fd79a8'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = $('<div class="confetti"></div>');
            confetti.css({
                'position': 'fixed',
                'width': '10px',
                'height': '10px',
                'background': colors[Math.floor(Math.random() * colors.length)],
                'left': Math.random() * 100 + '%',
                'top': '-10px',
                'opacity': Math.random(),
                'transform': 'rotate(' + Math.random() * 360 + 'deg)',
                'z-index': '9999'
            });
            
            $('body').append(confetti);
            
            confetti.animate({
                top: '100%',
                left: '+=' + (Math.random() * 200 - 100) + 'px',
                opacity: 0
            }, Math.random() * 3000 + 2000, function() {
                $(this).remove();
            });
        }
    }

    // Keyboard shortcuts
    $(document).on('keydown', function(e) {
        // Press Enter to submit when focused on form
        if (e.key === 'Enter' && $(document.activeElement).closest('#loginForm').length) {
            $('#loginForm').submit();
        }
    });

    // Add subtle parallax effect to balloons on mouse move
    $(document).on('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        $('.balloon').each(function(index) {
            const speed = (index + 1) * 5;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            $(this).css('transform', 'translate(' + x + 'px, ' + y + 'px)');
        });
    });
});
