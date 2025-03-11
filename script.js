document.addEventListener('DOMContentLoaded', function() {
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
        // Fallback: make all animated elements visible
        document.querySelectorAll('[data-animate]').forEach(element => {
            console.log('Fallback applied to:', element);
            element.style.opacity = '1';
            element.style.transform = 'none';
        });
        document.querySelectorAll('[data-no-animate]').forEach(element => {
            console.log('Fallback applied to:', element);
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
        
        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
        
        // Initialize Donut Charts
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            const skill = item.getAttribute('data-skill');
            const percent = item.getAttribute('data-percent');
            const ctx = item.querySelector('.skill-chart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: [skill, ''],
                    datasets: [{
                        data: [percent, 100 - percent],
                        backgroundColor: ['#00f2fe', '#333'],
                        borderWidth: 0
                    }]
                },
                options: {
                    cutout: '70%',
                    responsive: true,
                    maintainAspectRatio: true,
                    animation: {
                        animateScale: true,
                        animateRotate: true
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { enabled: false }
                    }
                }
            });
            
            // Add percent text in the center
            const centerText = document.createElement('div');
            centerText.style.position = 'absolute';
            centerText.style.top = '50%';
            centerText.style.left = '50%';
            centerText.style.transform = 'translate(-50%, -50%)';
            centerText.style.fontSize = '1.8em';
            centerText.style.fontWeight = 'bold';
            centerText.style.color = '#00f2fe';
            centerText.style.textAlign = 'center';
            centerText.style.width = '80px';
            centerText.style.lineHeight = '1.1';
            centerText.textContent = percent + '%';
            item.style.position = 'relative';
            item.appendChild(centerText);
        });
        
        // Skill Details Toggle
        skillItems.forEach(item => {
            item.addEventListener('click', () => {
                const skill = item.getAttribute('data-skill');
                const detailItems = document.querySelectorAll('.skill-detail-item');
                
                detailItems.forEach(detailItem => {
                    detailItem.classList.remove('active');
                    if (detailItem.getAttribute('data-skill') === skill) {
                        detailItem.classList.add('active');
                    }
                });
                
                // Highlight the selected skill
                skillItems.forEach(si => {
                    si.style.transform = '';
                    si.style.boxShadow = '';
                });
                
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            });
        });
        
        // Animate elements on scroll with debugging
        const animateElements = document.querySelectorAll('[data-animate]');
        animateElements.forEach(element => {
            console.log('Processing element for animation:', element, 'with data-debug:', element.closest('[data-debug]')?.getAttribute('data-debug'));
            const animationType = element.getAttribute('data-animate');
            let animation;
            
            switch(animationType) {
                case 'fade-in':
                    animation = gsap.from(element, { 
                        opacity: 0, 
                        duration: 1 
                    });
                    break;
                case 'slide-up':
                    animation = gsap.from(element, { 
                        opacity: 0, 
                        y: 50, 
                        duration: 1 
                    });
                    break;
                case 'slide-right':
                    animation = gsap.from(element, { 
                        opacity: 0, 
                        x: -50, 
                        duration: 1 
                    });
                    break;
                case 'slide-left':
                    animation = gsap.from(element, { 
                        opacity: 0, 
                        x: 50, 
                        duration: 1 
                    });
                    break;
                default:
                    animation = gsap.from(element, { 
                        opacity: 0, 
                        duration: 1 
                    });
            }
            
            ScrollTrigger.create({
                trigger: element,
                start: "top 80%", // Can test with "top top" if needed
                onEnter: () => {
                    console.log('Triggering animation for:', element, 'in section:', element.closest('[data-debug]')?.getAttribute('data-debug'));
                    animation.play();
                    element.classList.add('is-visible');
                },
                onEnterBack: () => {
                    console.log('Triggering back animation for:', element, 'in section:', element.closest('[data-debug]')?.getAttribute('data-debug'));
                    animation.play();
                    element.classList.add('is-visible');
                },
                once: false // Allow multiple triggers for debugging
            });
        });
        
        // Parallax effect for sections
        document.querySelectorAll('.story-section').forEach(section => {
            gsap.to(section, {
                backgroundPosition: `50% ${innerHeight / 2}px`,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a, .cta-buttons a, .scroll-indicator').forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                
                if (menuToggle.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                }
                
                const targetId = link.getAttribute('href');
                if (!targetId || targetId === '#') return;
                
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop,
                        behavior: 'smooth'
                    });
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
        
        // Add particle background effect to the introduction section
        const introSection = document.getElementById('introduction');
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
            particle.style.background = 'rgba(0, 242, 254, ' + (Math.random() * 0.5 + 0.2) + ')';
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
        
        // Add theme toggle functionality
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
                document.documentElement.style.setProperty('--surface-color', '#1e1e1e');
                document.documentElement.style.setProperty('--text-color', '#e0e0e0');
                document.documentElement.style.setProperty('--text-secondary', '#b0b0b0');
            }
        });
        
        // Fix typing effect for introduction heading
        const introHeading = document.querySelector('#introduction h2');
        if (introHeading) {
            console.log('Intro heading found:', introHeading); // Debug log
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
        
        // Add scroll-to-top button
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
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
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
        
        // Add custom cursor effect
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        const cursorDot = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        document.body.appendChild(cursorDot);
        
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15
            });
            
            gsap.to(cursorDot, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
        });
        
        // Make elements interactive with cursor
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
        
        // Add preloader for portfolio items
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
                    onComplete: () => {
                        preloader.remove();
                    }
                });
            }, Math.random() * 1000 + 500);
        });
    }
});
