// ==========================================================================
// Initialization Functions
// ==========================================================================

// Initialize Typed.js for the hero section typing effect
// Displays your name dynamically
var typed = new Typed('#typed-name', {
    strings: ["Akash Sriram"], // Add more strings if desired (e.g., titles)
    typeSpeed: 50,            // Speed of typing in milliseconds
    startDelay: 500,          // Delay before starting
    showCursor: false         // Hide the blinking cursor
});

// Initialize AOS (Animate On Scroll) for fade-in effects
AOS.init({
    duration: 1000,    // Animation duration in milliseconds
    once: true,        // Animate only once per scroll
    offset: 100        // Trigger animations 100px before element is in view
});

// Initialize ScrollMagic controller for scroll-based animations
var controller = new ScrollMagic.Controller();

// ==========================================================================
// Timeline Animations
// ==========================================================================

// Animate each timeline item when it enters the viewport
document.querySelectorAll('.timeline-item').forEach(function(item) {
    // Create a new ScrollMagic scene for each item
    new ScrollMagic.Scene({
        triggerElement: item,     // Element to watch
        triggerHook: 0.8,        // Trigger when 80% of item is in view
        reverse: false           // Only animate once
    })
    .setClassToggle(item, 'visible') // Add 'visible' class to trigger CSS animation
    .addTo(controller);              // Register with controller
});

// ==========================================================================
// Skill Charts
// ==========================================================================

// Create radial progress bars for skills using Chart.js
document.querySelectorAll('.skill-chart').forEach(function(canvas) {
    var ctx = canvas.getContext('2d');
    var percentage = parseInt(canvas.getAttribute('data-percentage')); // Get percentage from HTML

    // Configure Chart.js to mimic a radial progress bar
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, 100 - percentage], // Progress vs remaining
                backgroundColor: ['#2ecc71', '#eee'], // Accent color and gray
                borderWidth: 0                        // No borders for cleaner look
            }]
        },
        options: {
            cutout: '70%',          // Hollow center for radial effect
            rotation: -90,          // Start at top
            circumference: 180,     // Half circle for progress bar
            tooltips: { enabled: false }, // Disable tooltips
            hover: { mode: null },        // Disable hover effects
            animation: {
                animateRotate: true,      // Animate rotation
                animateScale: true        // Animate scale on load
            },
            maintainAspectRatio: true     // Ensure chart stays circular
        }
    });
});

// ==========================================================================
// Cover Letter Animations
// ==========================================================================

// Highlight cover letter paragraphs as they scroll into view
document.querySelectorAll('.cover-letter-content p').forEach(function(p) {
    new ScrollMagic.Scene({
        triggerElement: p,
        triggerHook: 0.7,    // Trigger at 70% of viewport
        reverse: false       // Animate only once
    })
    .setClassToggle(p, 'highlight') // Add 'highlight' class for styling
    .addTo(controller);
});

// ==========================================================================
// Portfolio Filtering
// ==========================================================================

// Initialize Isotope for portfolio grid filtering
var grid = document.querySelector('.portfolio-grid');
var iso = new Isotope(grid, {
    itemSelector: '.portfolio-item', // Target portfolio items
    layoutMode: 'fitRows'            // Arrange in rows
});

// Handle filter button clicks
var filtersElem = document.querySelector('.portfolio-filters');
filtersElem.addEventListener('click', function(event) {
    // Check if clicked element is a filter button
    if (!event.target.matches('.filter-btn')) {
        return;
    }

    // Get filter value from data-filter attribute
    var filterValue = event.target.getAttribute('data-filter');

    // Apply filter to Isotope grid
    iso.arrange({ filter: filterValue });

    // Update active button styling
    filtersElem.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
});

// ==========================================================================
// Sticky Navigation
// ==========================================================================

// Make navigation sticky after scrolling past hero
window.addEventListener('scroll', function() {
    var nav = document.querySelector('.sticky-nav');
    var heroHeight = document.querySelector('#hero').offsetHeight;

    // Add 'fixed' class when scrolled past hero
    if (window.scrollY > heroHeight) {
        nav.classList.add('fixed');
    } else {
        nav.classList.remove('fixed');
    }
});

// ==========================================================================
// Progress Bar
// ==========================================================================

// Update progress bar width based on scroll position
window.addEventListener('scroll', function() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100; // Calculate percentage
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// ==========================================================================
// Contact Form Submission
// ==========================================================================

// Initialize EmailJS with your user ID (replace with your actual ID)
// Note: Sign up at emailjs.com to get your credentials
emailjs.init('YOUR_USER_ID');

// Handle form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (!this.checkValidity()) {
        this.reportValidity(); // Show browser validation messages
        return;
    }

    // Send form data via EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function() {
            // Success feedback
            alert('Message sent successfully!');
            this.reset(); // Clear form
        }, function(error) {
            // Error feedback
            alert('Failed to send message: ' + JSON.stringify(error));
        });
});