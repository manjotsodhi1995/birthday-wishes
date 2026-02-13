$(document).ready(function() {
  // Form submission handler
  $("#contactForm").on("submit", function(e) {
    e.preventDefault();
    
    // Get form values
    var name = $("#name").val();
    var email = $("#email").val();
    var subject = $("#subject").val();
    var message = $("#message").val();
    
    // Basic validation
    if (name && email && subject && message) {
      // Simulate form submission with animation
      $(".contact-form").fadeOut("slow", function() {
        $("#successMessage").fadeIn("slow");
      });
      
      // Log form data (in production, this would be sent to a server)
      console.log("Form submitted:", {
        name: name,
        email: email,
        subject: subject,
        message: message
      });
    }
  });
  
  // Send another message button
  $("#sendAnother").on("click", function() {
    $("#successMessage").fadeOut("slow", function() {
      // Reset form
      $("#contactForm")[0].reset();
      $(".contact-form").fadeIn("slow");
    });
  });
  
  // Add floating animation to balloons
  function animateBalloons() {
    $(".balloon-float").each(function(index) {
      var balloon = $(this);
      var delay = index * 500;
      
      setTimeout(function() {
        balloon.addClass("balloons-rotate-behaviour-one");
      }, delay);
    });
  }
  
  // Start balloon animation on page load
  animateBalloons();
  
  // Form field animations
  $(".form-control").on("focus", function() {
    $(this).parent().addClass("focused");
  });
  
  $(".form-control").on("blur", function() {
    if (!$(this).val()) {
      $(this).parent().removeClass("focused");
    }
  });
  
  // Add smooth scroll for back link
  $(".back-link").on("click", function(e) {
    // Allow default behavior but add smooth transition
    $(this).css("opacity", "0.7");
    setTimeout(function() {
      window.location.href = "index.html";
    }, 200);
  });
});
