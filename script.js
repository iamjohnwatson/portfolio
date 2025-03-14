document.addEventListener('DOMContentLoaded', function () {
    // Loading Screen
    const loadingScreen = document.createElement('div');
    loadingScreen.classList.add('loading-screen');
    const loadingAnimation = document.createElement('div');
    loadingAnimation.classList.add('loading-animation');
    loadingScreen.appendChild(loadingAnimation);
    document.body.appendChild(loadingScreen);

    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        setTimeout(() => loadingScreen.remove(), 500);
    }, 1500);

    // Check for GSAP and ScrollTrigger
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded!');
        document.querySelectorAll('[data-animate]').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    } else {
        gsap.registerPlugin(ScrollTrigger);

        // Scroll Progress Bar
        const progressBar = document.querySelector('.progress-bar');
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = `${scrollProgress}%`;
        });

        // Donut Charts
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skill = item.getAttribute('data-skill');
            const percent = parseInt(item.getAttribute('data-percent'));
            const canvas = item.querySelector('.skill-canvas');
            const ctx = canvas.getContext('2d');

            if (ctx) {
                const gradient = ctx.createLinearGradient(0, 0, 200, 0);
                gradient.addColorStop(0, '#FF6F61');
                gradient.addColorStop(0.5, '#FFCA28');
                gradient.addColorStop(1, '#26A69A');

                new Chart(canvas, {
                    type: 'doughnut',
                    data: {
                        labels: [skill, ''],
                        datasets: [{
                            data: [percent, 100 - percent],
                            backgroundColor: [gradient, '#333'],
                            borderWidth: 0
                        }]
                    },
                    options: {
                        cutout: '70%',
                        responsive: true,
                        maintainAspectRatio: false,
                        animation: { animateScale: true, animateRotate: true },
                        plugins: { legend: { display: false }, tooltip: { enabled: false } },
                        rotation: 0
                    }
                });

                const percentText = document.createElement('div');
                percentText.classList.add('percent-text');
                percentText.textContent = `${percent}%`;
                item.appendChild(percentText);
            }
        });

        // Skill Details Toggle
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                const skill = item.getAttribute('data-skill');
                skillItems.forEach(si => si.classList.remove('active'));
                document.querySelectorAll('.skill-detail-item').forEach(di => di.classList.remove('active'));

                item.classList.add('active');
                const detailItem = document.querySelector(`.skill-detail-item[data-skill="${skill}"]`);
                if (detailItem) detailItem.classList.add('active');
            });
        });
        if (skillItems[0]) skillItems[0].click();

        // Scroll Animations
        document.querySelectorAll('[data-animate]').forEach(el => {
            const type = el.getAttribute('data-animate');
            let animation;
            switch (type) {
                case 'fade-in':
                    animation = gsap.from(el, { opacity: 0, duration: 1 });
                    break;
                case 'slide-up':
                    animation = gsap.from(el, { opacity: 0, y: 50, duration: 1 });
                    break;
                case 'slide-right':
                    animation = gsap.from(el, { opacity: 0, x: -50, duration: 1 });
                    break;
                case 'slide-left':
                    animation = gsap.from(el, { opacity: 0, x: 50, duration: 1 });
                    break;
            }
            ScrollTrigger.create({
                trigger: el,
                start: 'top 80%',
                onEnter: () => {
                    animation.play();
                    el.classList.add('is-visible');
                },
                once: true
            });
        });

        // Smooth Scrolling
        document.querySelectorAll('nav a, .cta-buttons a, .scroll-indicator').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Portfolio Hover Effects
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.portfolio-overlay'), { opacity: 1, duration: 0.3 });
            });
            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.portfolio-overlay'), { opacity: 0, duration: 0.3 });
            });
        });

        // Profile Orbit Particles
        const profileShape = document.querySelector('.profile-shape');
        if (profileShape) {
            const orbitContainer = document.createElement('div');
            orbitContainer.classList.add('profile-orbit-container');
            profileShape.appendChild(orbitContainer);

            for (let i = 0; i < 8; i++) {
                const particle = document.createElement('div');
                particle.classList.add('profile-orbit-particle');
                const size = Math.random() * 3 + 2;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.background = i % 2 === 0 ? '#26A69A' : '#FFCA28';
                particle.style.left = '50%';
                particle.style.top = '50%';
                orbitContainer.appendChild(particle);

                const radiusX = 150 + Math.random() * 30;
                const radiusY = 120 + Math.random() * 20;
                const duration = 10 + Math.random() * 5;
                const direction = i % 2 === 0 ? 1 : -1;

                gsap.to(particle, {
                    motionPath: {
                        path: [
                            { x: radiusX * direction, y: 0 },
                            { x: 0, y: radiusY },
                            { x: -radiusX * direction, y: 0 },
                            { x: 0, y: -radiusY },
                            { x: radiusX * direction, y: 0 }
                        ],
                        curviness: 1
                    },
                    duration: duration,
                    repeat: -1,
                    ease: 'none'
                });
                gsap.to(particle, {
                    opacity: Math.random() * 0.5 + 0.3,
                    duration: Math.random() * 2 + 1,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });
            }
        }

        // Theme Toggle
        const themeToggle = document.createElement('div');
        themeToggle.classList.add('theme-toggle');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.appendChild(themeToggle);

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            themeToggle.innerHTML = document.body.classList.contains('light-mode')
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });

        // Scroll-to-Top Button
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.classList.add('scroll-top-btn');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        Object.assign(scrollTopBtn.style, {
            position: 'fixed',
            bottom: '30px',
            left: '30px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'var(--surface-color)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: '1000',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
            opacity: '0',
            transition: 'opacity 0.3s'
        });
        document.body.appendChild(scrollTopBtn);

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            scrollTopBtn.style.opacity = window.pageYOffset > 300 ? '1' : '0';
        });

        // Refresh ScrollTrigger
        window.addEventListener('load', () => {
            setTimeout(() => ScrollTrigger.refresh(), 500);
        });
    }
});
