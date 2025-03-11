document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Particles.js
    particlesJS('particles-js', {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: '#3498db' },
            shape: { type: 'circle' },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#3498db',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 3,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out'
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            },
            modes: {
                grab: { distance: 200, line_linked: { opacity: 0.5 } },
                push: { particles_nb: 4 }
            }
        },
        retina_detect: true
    });

    // Mouse Trace
    document.addEventListener('mousemove', (e) => {
        const trace = document.createElement('div');
        trace.className = 'mouse-trace';
        trace.style.left = `${e.pageX - 7.5}px`;
        trace.style.top = `${e.pageY - 7.5}px`;
        document.body.appendChild(trace);
        setTimeout(() => {
            trace.style.opacity = '0';
            setTimeout(() => trace.remove(), 500);
        }, 100);
    });

    // ScrollMagic
    const controller = new ScrollMagic.Controller();
    const sections = ['#hero', '#home', '#footer'];
    sections.forEach((section) => {
        new ScrollMagic.Scene({
            triggerElement: section,
            triggerHook: 0.8,
            reverse: false
        })
            .setClassToggle(section, 'fade-in')
            .addTo(controller);
    });

    // Date
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.getAttribute('data-filter');
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.classList.add('show');
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
    
    // Portfolio Modals
    const previewButtons = document.querySelectorAll('.portfolio-preview');
    const previewModals = document.querySelectorAll('.portfolio-preview-modal');
    const closeButtons = document.querySelectorAll('.close-preview');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const previewId = button.getAttribute('data-id');
            const modal = document.getElementById(`${previewId}-preview`);
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-preview-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    });
    
    previewModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            previewModals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });

    // Interactive Donut Charts using Chart.js
    const donutData = [
        { id: 'donut-chart-1', percentage: 85, title: 'Data Viz' },
        { id: 'donut-chart-2', percentage: 90, title: 'Financial Reporting' },
        { id: 'donut-chart-3', percentage: 80, title: 'HTML/CSS' },
        { id: 'donut-chart-4', percentage: 75, title: 'JavaScript' },
        { id: 'donut-chart-5', percentage: 70, title: 'Adobe Illustrator' },
        { id: 'donut-chart-6', percentage: 85, title: 'Data Analysis' }
    ];

    donutData.forEach(data => {
        const ctx = document.getElementById(data.id).getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [data.percentage, 100 - data.percentage],
                    backgroundColor: [getComputedStyle(document.documentElement).getPropertyValue('--secondary-color'), '#f0f0f0'],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '70%',
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    animateRotate: true,
                    animateScale: true
                },
                tooltips: {
                    enabled: false
                },
                hover: {
                    mode: null
                }
            }
        });
    });

    // Animations
    const elements = document.querySelectorAll('.skill-card, .overview-card, .education-card, .portfolio-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('scroll', animateOnScroll);
    
    updateProgressBar();
    animateOnScroll();
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .overview-card, .education-card, .portfolio-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        if (elementPosition < screenPosition - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    document.querySelector('.progress-bar').style.width = scrollPercentRounded + '%';
}