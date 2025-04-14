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

    return true;
}

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
            if (mobileMenu && !mobileMenu.classList.contains('hidden') && 
                !mobileMenu.contains(event.target) && 
                !mobileMenuButton.contains(event.target)) {
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
            const formMessageText = document.getElementById('formMessageText');
            const formMessageIcon = document.getElementById('formMessageIcon');
            const loadingOverlay = document.getElementById('loadingOverlay');
            
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                showMessage('error', 'Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(formData.email)) {
                showMessage('error', 'Please enter a valid email address.');
                return;
            }

            // Show loading overlay
            loadingOverlay.classList.remove('hidden');

            // If EmailJS is available, send the email
            if (typeof emailjs !== 'undefined') {
                emailjs.send("service_6ua284p", "template_449up3l", {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                })
                .then(function(response) {
                    // Hide loading overlay
                    loadingOverlay.classList.add('hidden');
                    showMessage('success', "Message sent successfully! We'll get back to you soon.");
                    contactForm.reset();
                })
                .catch(function(error) {
                    // Hide loading overlay
                    loadingOverlay.classList.add('hidden');
                    showMessage('error', "Sorry, there was an error sending your message. Please try again later.");
                    console.error("EmailJS Error:", error);
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

        if (totalSlides > 0) {
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

// Function to show message popup
function showMessage(message, type) {
    const formMessage = document.getElementById('formMessage');
    const formMessageText = document.getElementById('formMessageText');
    const formMessageIcon = document.getElementById('formMessageIcon');

    // Clear any existing timeouts
    if (window.messageTimeout) {
        clearTimeout(window.messageTimeout);
    }

    formMessageText.textContent = message;
    formMessageIcon.innerHTML = type === 'success' 
        ? '<i class="fas fa-check-circle text-green-500 text-4xl"></i>'
        : '<i class="fas fa-exclamation-circle text-red-500 text-4xl"></i>';
    
    formMessage.classList.remove('hidden');
    formMessage.classList.add('popup-enter');

    // Auto-hide message after 5 seconds for success messages
    if (type === 'success') {
        window.messageTimeout = setTimeout(() => {
            closeFormMessage();
        }, 5000);
    }
}

// Function to close message popup
function closeFormMessage() {
    const formMessage = document.getElementById('formMessage');
    formMessage.classList.add('hidden');
    formMessage.classList.remove('popup-enter');
}

// Form validation functions
function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Update the phone validation function
function validatePhone(phone) {
    // Remove all non-digit characters and check for exactly 10 digits
    const cleanPhone = phone.replace(/\D/g, '');
    return cleanPhone.length === 10;
}

function validateSize(size) {
    return size > 0 && size <= 10000;
}

// Quote form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    const loadingOverlay = document.getElementById('loadingOverlay');

    if (quoteForm) {
        quoteForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Basic form validation
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.replace(/\D/g, ''), // Remove non-digits
                size: document.getElementById('size').value,
                service: document.getElementById('service').value,
                property: document.getElementById('property').value,
                message: document.getElementById('message').value.trim()
            };

            // Validate phone number
            if (formData.phone.length !== 10) {
                showMessage('Please enter a valid 10-digit phone number.', 'error');
                return;
            }

            // Show loading overlay
            loadingOverlay.classList.remove('hidden');

            try {
                // Send email using EmailJS
                const response = await emailjs.send('service_6ua284p', 'template_wkyx519', {
                    to_name: "Bell Mount Cleaners",
                    from_name: formData.name,
                    from_email: formData.email,
                    phone_number: formData.phone,
                    property_size: formData.size + " sqm",
                    service_type: formData.service,
                    property_type: formData.property,
                    message: formData.message,
                    subject: "New Cleaning Quote Request"
                });

                // Check response status
                if (response.status === 200) {
                    showMessage('Quote request sent successfully! We will contact you soon.', 'success');
                    quoteForm.reset();
                }
            } catch (error) {
                console.error('EmailJS error:', error);
                showMessage('Failed to send quote request. Please try again.', 'error');
            } finally {
                loadingOverlay.classList.add('hidden');
            }
        });
    }
});