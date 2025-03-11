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

// Skill Charts
const observer = new IntersectionObserver(entries => {
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
            observer.unobserve(canvas);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.chart-container canvas').forEach(chart => {
    observer.observe(chart);
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