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
        setTimeout(() => {
            loadingScreen.remove();
        }, 500);
    }, 1500);

    // Initialize GSAP and ScrollTrigger with error handling
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not loaded!');
        document.querySelectorAll('[data-animate]').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        document.querySelectorAll('[data-no-animate]').forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
    } else {
        gsap.registerPlugin(ScrollTrigger);

        // Initialize Scroll Progress Bar
        const progressBar = document.querySelector('.progress-bar');
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollProgress = (scrollTop / scrollHeight) * 100;
            progressBar.style.width = scrollProgress + '%';
        });

        // Remove Donut Charts initialization block (no longer needed)

        // Skill Details Toggle
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                const skill = item.getAttribute('data-skill');
                console.log('Clicked skill:', skill); // Debug log
                const detailItems = document.querySelectorAll('.skill-detail-item');

                // Remove active class from all skill items and detail items
                skillItems.forEach(si => {
                    si.classList.remove('active');
                    si.style.transform = '';
                    si.style.boxShadow = '';
                });
                detailItems.forEach(di => di.classList.remove('active'));

                // Add active class to the clicked item and its corresponding detail
                item.classList.add('active');
                const detailItem = document.querySelector(`.skill-detail-item[data-skill="${skill}"]`);
                if (detailItem) {
                    detailItem.classList.add('active');
                } else {
                    console.error(`Detail item not found for skill: ${skill}`);
                }

                // Apply hover effect to active item
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            });
        });

        // Set initial active state (default to first skill)
        const initialSkill = skillItems[0];
        if (initialSkill) {
            initialSkill.click(); // Trigger click to set initial active state
        }

        // Animate elements on scroll
        const animateElements = document.querySelectorAll('[data-animate]');
        animateElements.forEach(element => {
            const animationType = element.getAttribute('data-animate');
            let animation;

            switch (animationType) {
                case 'fade-in':
                    animation = gsap.from(element, { opacity: 0, duration: 1 });
                    break;
                case 'slide-up':
                    animation = gsap.from(element, { opacity: 0, y: 50, duration: 1 });
                    break;
                case 'slide-right':
                    animation = gsap.from(element, { opacity: 0, x: -50, duration: 1 });
                    break;
                case 'slide-left':
                    animation = gsap.from(element, { opacity: 0, x: 50, duration: 1 });
                    break;
                default:
                    animation = gsap.from(element, { opacity: 0, duration: 1 });
            }

            ScrollTrigger.create({
                trigger: element,
                start: 'top 80%',
                onEnter: () => {
                    animation.play();
                    element.classList.add('is-visible');
                },
                onEnterBack: () => {
                    animation.play();
                    element.classList.add('is-visible');
                },
                once: false
            });
        });

        // Parallax effect for sections
        document.querySelectorAll('.story-section').forEach(section => {
            gsap.to(section, {
                backgroundPosition: `50% ${window.innerHeight / 2}px`,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a, .cta-buttons a, .scroll-indicator').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                if (targetId && targetId !== '#') {
                    const targetSection = document.querySelector(targetId);
                    if (targetSection) {
                        window.scrollTo({
                            top: targetSection.offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });

        // Portfolio item hover effects
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                gsap.to(item.querySelector('.portfolio-overlay'), {
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            item.addEventListener('mouseleave', () => {
                gsap.to(item.querySelector('.portfolio-overlay'), {
                    y: 60,
                    duration: 0.3,
                    ease: 'power2.in'
                });
            });
        });

        // Particle background effect for introduction section
        const introSection = document.getElementById('introduction');
        if (introSection) {
            const particlesContainer = document.createElement('div');
            particlesContainer.classList.add('particles-container');
            particlesContainer.style.position = 'absolute';
            particlesContainer.style.top = '0';
            particlesContainer.style.left = '0';
            particlesContainer.style.width = '100%';
            particlesContainer.style.height = '100%';
            particlesContainer.style.overflow = 'hidden';
            particlesContainer.style.zIndex = '-1';
            introSection.appendChild(particlesContainer);

            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.position = 'absolute';
                particle.style.width = Math.random() * 5 + 2 + 'px';
                particle.style.height = particle.style.width;
                particle.style.background = `rgba(0, 242, 254, ${Math.random() * 0.5 + 0.2})`;
                particle.style.borderRadius = '50%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.left = Math.random() * 100 + '%';

                gsap.to(particle, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    opacity: Math.random() * 0.5 + 0.5,
                    duration: Math.random() * 10 + 10,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.inOut'
                });

                particlesContainer.appendChild(particle);
            }
        }

        // Floating Particle Orbit around Profile Image
        const profileShape = document.querySelector('.profile-shape');
        if (profileShape) {
            const orbitContainer = document.createElement('div');
            orbitContainer.classList.add('profile-orbit-container');
            profileShape.appendChild(orbitContainer);

            const numParticles = 8;
            for (let i = 0; i < numParticles; i++) {
                const particle = document.createElement('div');
                particle.classList.add('profile-orbit-particle');

                const size = Math.random() * 3 + 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';

                const color = i % 2 === 0 ? '#26A69A' : '#FFCA28';
                particle.style.background = color;

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
                        curviness: 1,
                        autoRotate: false
                    },
                    duration: duration,
                    repeat: -1,
                    ease: 'none',
                    transformOrigin: '50% 50%'
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
            if (document.body.classList.contains('light-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                document.documentElement.style.setProperty('--background-color', '#f0f0f0');
                document.documentElement.style.setProperty('--surface-color', '#ffffff');
                document.documentElement.style.setProperty('--text-color', '#333333');
                document.documentElement.style.setProperty('--text-secondary', '#666666');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                document.documentElement.style.setProperty('--background-color', '#121212');
                document.documentElement.style.setProperty('--surface-color', '#1E1E2E');
                document.documentElement.style.setProperty('--text-color', '#F5F5F5');
                document.documentElement.style.setProperty('--text-secondary', '#B0BEC5');
            }
        });

        // Typing Effect for Introduction Heading
        const introHeading = document.querySelector('#introduction h2');
        if (introHeading) {
            const originalText = introHeading.textContent;
            introHeading.textContent = '';
            let i = 0;
            const typeEffect = setInterval(() => {
                if (i < originalText.length) {
                    introHeading.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeEffect);
                }
            }, 100);
        } else {
            console.error('Introduction heading not found!');
        }

        // Scroll-to-Top Button
        const scrollTopBtn = document.createElement('div');
        scrollTopBtn.classList.add('scroll-top-btn');
        scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        scrollTopBtn.style.position = 'fixed';
        scrollTopBtn.style.bottom = '30px';
        scrollTopBtn.style.left = '30px';
        scrollTopBtn.style.width = '50px';
        scrollTopBtn.style.height = '50px';
        scrollTopBtn.style.borderRadius = '50%';
        scrollTopBtn.style.backgroundColor = 'var(--surface-color)';
        scrollTopBtn.style.display = 'flex';
        scrollTopBtn.style.justifyContent = 'center';
        scrollTopBtn.style.alignItems = 'center';
        scrollTopBtn.style.cursor = 'pointer';
        scrollTopBtn.style.zIndex = '1000';
        scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        scrollTopBtn.style.opacity = '0';
        scrollTopBtn.style.visibility = 'hidden';
        scrollTopBtn.style.transition = 'opacity 0.3s, visibility 0.3s';
        document.body.appendChild(scrollTopBtn);

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.style.opacity = '1';
                scrollTopBtn.style.visibility = 'visible';
            } else {
                scrollTopBtn.style.opacity = '0';
                scrollTopBtn.style.visibility = 'hidden';
            }
        });

        // Custom Cursor
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursor);
        document.body.appendChild(cursorDot);

        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.15 });
            gsap.to(cursorDot, { x: e.clientX, y: e.clientY, duration: 0.1 });
        });

        const interactiveElements = document.querySelectorAll('a, button, .skill-item, .portfolio-item, .social-icon, .theme-toggle, .scroll-top-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.border = '2px solid var(--accent-color)';
                cursorDot.style.backgroundColor = 'var(--accent-color)';
            });

            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.border = '2px solid var(--primary-color)';
                cursorDot.style.backgroundColor = 'var(--primary-color)';
            });
        });

        // Preloader for Portfolio Items
        portfolioItems.forEach(item => {
            const preloader = document.createElement('div');
            preloader.classList.add('portfolio-preloader');
            preloader.style.position = 'absolute';
            preloader.style.top = '0';
            preloader.style.left = '0';
            preloader.style.width = '100%';
            preloader.style.height = '100%';
            preloader.style.display = 'flex';
            preloader.style.justifyContent = 'center';
            preloader.style.alignItems = 'center';
            preloader.style.backgroundColor = 'var(--surface-color)';
            preloader.style.zIndex = '1';

            const spinner = document.createElement('div');
            spinner.style.width = '30px';
            spinner.style.height = '30px';
            spinner.style.border = '3px solid transparent';
            spinner.style.borderTopColor = 'var(--primary-color)';
            spinner.style.borderRadius = '50%';
            spinner.style.animation = 'spin 1s linear infinite';

            preloader.appendChild(spinner);
            item.appendChild(preloader);

            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.5,
                    onComplete: () => preloader.remove()
                });
            }, Math.random() * 1000 + 500);
        });

        // Force a refresh of ScrollTrigger after all animations are set up
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 1000);
    }
});
