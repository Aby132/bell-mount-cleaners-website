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

// Testimonial Slider Animation
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.testimonial-slider');
    if (!slider) return;

    let currentPosition = 0;
    let autoScrollInterval;
    const slideWidth = 320; // Width of each slide including gap
    const slides = slider.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    let isDragging = false;
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateSliderPosition() {
        slider.style.transform = `translateX(${currentPosition}px)`;
    }

    function startAutoScroll() {
        if (autoScrollInterval) return; // Prevent multiple intervals
        
        autoScrollInterval = setInterval(() => {
            if (isDragging) return; // Don't auto-scroll while dragging
            
            currentPosition -= slideWidth;
            if (currentPosition <= -slideWidth * (totalSlides - 1)) {
                currentPosition = 0;
            }
            updateSliderPosition();
        }, 5000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    // Touch and mouse events
    slider.addEventListener('mousedown', dragStart);
    slider.addEventListener('touchstart', dragStart);
    slider.addEventListener('mouseup', dragEnd);
    slider.addEventListener('touchend', dragEnd);
    slider.addEventListener('mouseleave', dragEnd);
    slider.addEventListener('mousemove', drag);
    slider.addEventListener('touchmove', drag);

    function dragStart(e) {
        isDragging = true;
        startX = e.type === 'mousedown' ? e.pageX : e.touches[0].clientX;
        prevTranslate = currentPosition;
        stopAutoScroll();
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const currentX = e.type === 'mousemove' ? e.pageX : e.touches[0].clientX;
        const diff = currentX - startX;
        currentPosition = prevTranslate + diff;
        updateSliderPosition();
    }

    function dragEnd() {
        isDragging = false;
        const movedBy = currentPosition - prevTranslate;
        
        if (Math.abs(movedBy) > 100) {
            if (movedBy > 0) {
                currentPosition = Math.min(0, currentPosition + slideWidth);
            } else {
                currentPosition = Math.max(-slideWidth * (totalSlides - 1), currentPosition - slideWidth);
            }
        } else {
            currentPosition = prevTranslate;
        }
        
        updateSliderPosition();
        startAutoScroll();
    }

    // Start auto-scroll
    startAutoScroll();
});

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
});