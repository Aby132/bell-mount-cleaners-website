// main.js

// Function to validate the contact form
function validateContactForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return false;
    }

    // Simple email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }

    alert('Your message has been sent!');
    return true;
}

// Event listener for the contact form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    if (validateContactForm()) {
        // Here you can add code to handle the form submission, e.g., sending an email
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu
        mobileMenuButton.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };

            const formMessage = document.getElementById('formMessage');
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                formMessage.textContent = "Please fill in all required fields.";
                formMessage.className = "mt-4 text-center text-red-600";
                formMessage.classList.remove('hidden');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                formMessage.textContent = "Please enter a valid email address.";
                formMessage.className = "mt-4 text-center text-red-600";
                formMessage.classList.remove('hidden');
                return;
            }

            // If EmailJS is available, send the email
            if (typeof emailjs !== 'undefined') {
                emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
                    to_email: "bellmountcleaners@gmail.com",
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                })
                .then(function(response) {
                    formMessage.textContent = "Message sent successfully! We'll get back to you soon.";
                    formMessage.className = "mt-4 text-center text-green-600";
                    formMessage.classList.remove('hidden');
                    contactForm.reset();
                })
                .catch(function(error) {
                    formMessage.textContent = "Sorry, there was an error sending your message. Please try again later.";
                    formMessage.className = "mt-4 text-center text-red-600";
                    formMessage.classList.remove('hidden');
                });
            }
        });
    }

    // Testimonial slider functionality
    const testimonialContainer = document.querySelector('.testimonial-container');
    if (testimonialContainer) {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.testimonial-slide');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        // Auto-rotate slides every 5 seconds
        setInterval(nextSlide, 5000);
        showSlide(currentSlide);
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    
    if (!mobileMenu.classList.contains('hidden') && 
        !mobileMenu.contains(event.target) && 
        !mobileMenuButton.contains(event.target)) {
        mobileMenu.classList.add('hidden');
    }
});