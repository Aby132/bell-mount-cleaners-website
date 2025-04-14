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
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Show loading overlay
            document.getElementById('loadingOverlay').classList.remove('hidden');

            // Get form data
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                message: document.getElementById('message').value.trim()
            };

            try {
                const response = await emailjs.send('service_6ua284p', 'template_wkyx519', {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone_number: formData.phone,
                    message: formData.message
                });

                if (response.status === 200) {
                    showMessage('Message sent successfully! We will get back to you soon.', 'success');
                    contactForm.reset();
                }
            } catch (error) {
                console.error('EmailJS error:', error);
                showMessage('Failed to send message. Please try again.', 'error');
            } finally {
                document.getElementById('loadingOverlay').classList.add('hidden');
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

    formMessageText.textContent = message;
    
    // Set icon based on message type
    if (type === 'success') {
        formMessageIcon.innerHTML = '<i class="fas fa-check-circle text-green-500 text-4xl"></i>';
        formMessageText.className = 'text-green-600 mt-2';
    } else {
        formMessageIcon.innerHTML = '<i class="fas fa-exclamation-circle text-red-500 text-4xl"></i>';
        formMessageText.className = 'text-red-600 mt-2';
    }

    formMessage.classList.remove('hidden');
    formMessage.classList.add('popup-enter');
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