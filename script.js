// Particles.js Initialization
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00a896' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00a896', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Progress Bar
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = `${scrollPercent}%`;
});

// Scroll-Triggered Reveals
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

reveals.forEach(reveal => revealObserver.observe(reveal));

// Skill Charts
const chartObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const canvas = entry.target;
            const percentage = parseInt(canvas.getAttribute('data-percentage'));
            const ctx = canvas.getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [percentage, 100 - percentage],
                        backgroundColor: ['#00a896', 'transparent'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '80%',
                    responsive: true,
                    maintainAspectRatio: false,
                    animation: { animateRotate: true, animateScale: true },
                    tooltips: { enabled: false },
                    hover: { mode: null }
                }
            });
            chartObserver.unobserve(canvas);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.chart-container canvas').forEach(chart => {
    chartObserver.observe(chart);
});

// Parallax Effect
window.addEventListener('scroll', () => {
    document.querySelectorAll('.background').forEach(bg => {
        const section = bg.parentElement;
        const sectionTop = section.getBoundingClientRect().top;
        const speed = 0.3;
        bg.style.transform = `translateY(${sectionTop * speed}px)`;
    });
});

// Modal Windows
const modalBtns = document.querySelectorAll('.modal-btn');
const modals = document.querySelectorAll('.modal');
const closes = document.querySelectorAll('.close');

modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const modalId = btn.getAttribute('data-modal');
        document.getElementById(modalId).style.display = 'block';
    });
});

closes.forEach(close => {
    close.addEventListener('click', () => {
        modals.forEach(modal => modal.style.display = 'none');
    });
});

window.addEventListener('click', (e) => {
    modals.forEach(modal => {
        if (e.target === modal) modal.style.display = 'none';
    });
});

// Section Transitions
const sections = document.querySelectorAll('section');
const colors = ['#1a2a3a', '#2a3a4a', '#3a4a5a', '#4a5a6a', '#5a6a7a', '#6a7a8a'];
window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            section.style.backgroundColor = colors[index % colors.length];
        }
    });
});