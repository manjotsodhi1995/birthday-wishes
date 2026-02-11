$(document).ready(function() {
    // Check if user is already logged in
    if (isUserLoggedIn()) {
        window.location.href = 'index.html';
    }

    // Form validation and submission
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Get form values
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const rememberMe = $('#rememberMe').is(':checked');

        // Validate inputs
        let isValid = true;

        if (username === '') {
            showError('usernameError', 'Username is required');
            isValid = false;
        } else if (username.length < 3) {
            showError('usernameError', 'Username must be at least 3 characters');
            isValid = false;
        }

        if (password === '') {
            showError('passwordError', 'Password is required');
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
            isValid = false;
        }

        if (!isValid) {
            return;
        }

        // Show loading state
        const $submitBtn = $('.login-btn');
        $submitBtn.addClass('loading').prop('disabled', true);

        // Simulate authentication (in real app, this would be an API call)
        setTimeout(function() {
            // Demo credentials - in production, this should be server-side validation
            const validCredentials = {
                'admin': 'admin123',
                'user': 'user123',
                'simran': 'birthday2024',
                'guest': 'guest123'
            };

            if (validCredentials[username] && validCredentials[username] === password) {
                // Authentication successful
                handleSuccessfulLogin(username, rememberMe);
            } else {
                // Authentication failed
                handleFailedLogin($submitBtn);
            }
        }, 1500);
    });

    // Real-time validation
    $('#username').on('blur', function() {
        const username = $(this).val().trim();
        if (username === '') {
            showError('usernameError', 'Username is required');
        } else if (username.length < 3) {
            showError('usernameError', 'Username must be at least 3 characters');
        } else {
            clearError('usernameError');
        }
    });

    $('#password').on('blur', function() {
        const password = $(this).val().trim();
        if (password === '') {
            showError('passwordError', 'Password is required');
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters');
        } else {
            clearError('passwordError');
        }
    });

    // Clear error on input
    $('#username, #password').on('input', function() {
        const errorId = $(this).attr('id') + 'Error';
        clearError(errorId);
        $('#loginError').fadeOut();
    });

    // Forgot password handler
    $('.forgot-password').on('click', function(e) {
        e.preventDefault();
        alert('Please contact the administrator to reset your password.');
    });
});

// Helper functions
function showError(elementId, message) {
    $('#' + elementId).text(message).fadeIn();
}

function clearError(elementId) {
    $('#' + elementId).text('').fadeOut();
}

function clearErrors() {
    $('.error-message').text('').hide();
    $('#loginError').fadeOut();
    $('#loginSuccess').fadeOut();
}

function handleSuccessfulLogin(username, rememberMe) {
    // Store authentication data
    const authData = {
        username: username,
        loggedIn: true,
        loginTime: new Date().getTime()
    };

    if (rememberMe) {
        // Store in localStorage for persistent login
        localStorage.setItem('authData', JSON.stringify(authData));
    } else {
        // Store in sessionStorage for session-only login
        sessionStorage.setItem('authData', JSON.stringify(authData));
    }

    // Show success message
    $('#loginSuccess').fadeIn();

    // Redirect to main page after short delay
    setTimeout(function() {
        window.location.href = 'index.html';
    }, 1500);
}

function handleFailedLogin($submitBtn) {
    // Remove loading state
    $submitBtn.removeClass('loading').prop('disabled', false);

    // Show error message
    $('#loginError').fadeIn();

    // Shake animation
    $('.login-box').css('animation', 'shake 0.5s');
    setTimeout(function() {
        $('.login-box').css('animation', '');
    }, 500);
}

function isUserLoggedIn() {
    // Check both localStorage and sessionStorage
    const localAuth = localStorage.getItem('authData');
    const sessionAuth = sessionStorage.getItem('authData');

    const authData = localAuth || sessionAuth;

    if (authData) {
        try {
            const parsed = JSON.parse(authData);
            return parsed.loggedIn === true;
        } catch (e) {
            return false;
        }
    }

    return false;
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
