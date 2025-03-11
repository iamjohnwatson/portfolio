document.addEventListener('DOMContentLoaded', function() {
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

    // Animations
    const elements = document.querySelectorAll('.skill-card, .job, .education, .portfolio-item');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    initDonutCharts();
    animateTimelineItems();
    initSkillCards();
    
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('scroll', animateOnScroll);
    
    updateProgressBar();
    animateOnScroll();
});

function animateOnScroll() {
    const elements = document.querySelectorAll('.skill-card, .job, .education, .portfolio-item');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight;
        if (elementPosition < screenPosition - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

function initDonutCharts() {
    const donutCharts = document.querySelectorAll('.donut-chart');
    donutCharts.forEach(chart => {
        const percentage = chart.getAttribute('data-percentage');
        chart.style.setProperty('--percentage', percentage);
    });
}

function animateTimelineItems() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => observer.observe(item));
}

function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillStoryModal = document.querySelector('.skill-story-modal');
    const skillStoryTitle = document.querySelector('.skill-story-title');
    const skillStoryBody = document.querySelector('.skill-story-body');
    const closeSkillStory = document.querySelector('.close-skill-story');
    
    const skillStories = {
        'Financial Reporting': {
            title: 'Financial Reporting Expertise',
            body: `<p>With over 5 years of experience in journalism, I've developed a deep understanding of financial markets, corporate reporting, economic trends and general news. At Reuters, I've specialized in covering U.S. technology companies, particularly in the electric vehicle and space sectors.</p>
                  <p>My current role requires me to combine quick breaking news reporting with clear, accessible explanations of complex financial concepts. I pride myself on breaking news that moves markets and providing insightful analysis that helps readers understand the bigger picture.</p>
                  <p>Key strengths:</p>
                  <ul>
                    <li>Breaking news coverage of quarterly earnings and major corporate announcements</li>
                    <li>Deep industry knowledge in technology and automotive sectors</li>
                    <li>Ability to translate complex financial data into compelling narratives</li>
                    <li>Strong network of industry sources and analysts</li>
                  </ul>`
        },
        'Data Visualization': {
            title: 'Data Visualization Skills',
            body: `<p>I believe that effective data visualization is essential for modern financial journalism. I've developed expertise in creating charts, maps and interactive visualizations that make complex financial information accessible and engaging.</p>
                  <p>My technical skills include:</p>
                  <ul>
                    <li>Creating custom visualizations using D3.js and other JavaScript libraries</li>
                    <li>Building interactive dashboards that allow readers to explore data</li>
                    <li>Designing clear, informative charts that highlight key trends and patterns</li>
                    <li>Using Datawrapper on a daily basis and training reporters on using the tool</li>
                  </ul>
                  <p>I regularly collaborate with reporters across the world to create visualizations that enhance my reporting and provide readers with deeper insights.</p>`
        },
        'Multimedia Production': {
            title: 'Multimedia Production Experience',
            body: `<p>Beyond traditional reporting, I've embraced multimedia storytelling to reach audiences across different platforms. My experience includes:</p>
                  <ul>
                    <li>Hosting and producing podcast episodes on general news, international relations</li>
                    <li>Developing proficiency in using the Adobe suite of software</li>
                    <li>Developing social media content strategies to extend the reach of my reporting</li>
                    <li>Collaborating with video teams to produce visual stories with previous employer</li>
                  </ul>
                  <p>I believe in meeting audiences where they are and adapting content to suit different platforms while maintaining journalistic integrity and clarity.</p>`
        },
        'Research & Analysis': {
            title: 'Research & Analysis Methodology',
            body: `<p>Thorough research and rigorous analysis form the foundation of my reporting. My approach includes:</p>
                  <ul>
                    <li>Analyzing financial statements and corporate disclosures to identify trends and anomalies</li>
                    <li>Conducting in-depth interviews with industry experts, executives, and analysts</li>
                    <li>Using data analysis tools to process large datasets and identify patterns</li>
                    <li>Maintaining comprehensive knowledge of regulatory environments and market dynamics</li>
                  </ul>
                  <p>I'm committed to accuracy and context in all my reporting, ensuring that readers receive not just information but understanding.</p>`
        }
    };
    
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skillType = card.getAttribute('data-skill');
            const skillStory = skillStories[skillType];
            if (skillStory) {
                skillStoryTitle.textContent = skillStory.title;
                skillStoryBody.innerHTML = skillStory.body;
                skillStoryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeSkillStory.addEventListener('click', () => {
        skillStoryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === skillStoryModal) {
            skillStoryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
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