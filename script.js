document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transition
    const pageTransition = document.createElement('div');
    pageTransition.className = 'page-transition';
    pageTransition.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(pageTransition);
    
    // Fade out page transition after content loads
    setTimeout(() => {
        pageTransition.classList.add('fade-out');
        setTimeout(() => {
            pageTransition.remove();
        }, 500);
    }, 800);
    
    // Set current date for cover letter
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = currentDate.toLocaleDateString('en-US', options);
    }
    
    // Add scroll indicator to header
    const header = document.querySelector('header');
    if (header) {
        const scrollIndicator = document.createElement('div');
        scrollIndicator.className = 'scroll-indicator';
        scrollIndicator.innerHTML = '<i class="fas fa-chevron-down"></i><span>Scroll Down</span>';
        header.appendChild(scrollIndicator);
        
        scrollIndicator.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;
        document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
          // Adjust the multiplier (speed) for each layer differently.
          const speed = (index + 1) * 0.2; 
          layer.style.transform = `translateY(${scrollY * speed}px)`;
        });
      });
      
    
    // Initialize intersection observers for scroll animations
    initScrollObservers();
    
    // Tab switching functionality
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
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
    
    // Portfolio preview functionality
    const previewButtons = document.querySelectorAll('.portfolio-preview');
    const previewModals = document.querySelectorAll('.portfolio-preview-modal');
    const closeButtons = document.querySelectorAll('.close-preview');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const previewId = button.getAttribute('data-id');
            const modal = document.getElementById(`${previewId}-preview`);
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('active');
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-preview-modal');
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500);
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside the content
    previewModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 500);
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            previewModals.forEach(modal => {
                if (modal.style.display === 'flex') {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        modal.style.display = 'none';
                    }, 500);
                    document.body.style.overflow = 'auto';
                }
            });
        }
    });
    
    // Mobile nav toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const tabsContainer = document.querySelector('.tabs');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            tabsContainer.classList.toggle('open');
        });
    }
    
    // Initialize skill cards
    initSkillCards();
    
    // Initialize parallax effect for header
    initParallax();
    
    // Initialize cursor trail effect
    initCursorTrail();
    
    // Set up scroll event listeners
    window.addEventListener('scroll', handleScroll);
    
    // Initial calls
    handleScroll();
    
    // Add particle animation to header
    const headerParticles = document.querySelector('.header-particles');
if (headerParticles) {
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';
    headerParticles.appendChild(particle);
  }
  // Parallax effect for particles on mousemove
  headerParticles.addEventListener('mousemove', function(e) {
    const offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
    const offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
    headerParticles.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
  headerParticles.addEventListener('mouseleave', function() {
    headerParticles.style.transform = 'translate(0, 0)';
  });
}


// Initialize intersection observers for scroll animations
function initScrollObservers() {
    // Create observer for general sections
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all sections that should animate on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.2 });
        
        elements.forEach(el => observer.observe(el));
      }
      document.addEventListener('DOMContentLoaded', animateOnScroll);      
    
    // Observe story intro sections
    const storyIntros = document.querySelectorAll('.story-intro');
    storyIntros.forEach(intro => {
        sectionObserver.observe(intro);
    });
    
    // Observe footer
    const footer = document.querySelector('footer');
    if (footer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footer.classList.add('footer-in-view');
                }
            });
        }, { threshold: 0.1 });
        footerObserver.observe(footer);
    }
}

// Handle scroll events
function handleScroll() {
    // Update progress bar
    updateProgressBar();
    
    // Add shadow to nav when scrolled
    const nav = document.querySelector('nav');
    if (window.scrollY > 10) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
    
    // Hide/show scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    }
}

// Update scroll progress bar
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrollPercentRounded + '%';
    }
}

// Global function to switch tabs (used by buttons)
function switchTab(tabId) {
    const tabs = document.querySelectorAll('.tabs li');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        if (tab.getAttribute('data-tab') === tabId) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    tabContents.forEach(content => {
        if (content.id === tabId) {
            content.classList.add('active');
            // Trigger scroll observers to detect newly visible content
            setTimeout(() => {
                window.dispatchEvent(new Event('scroll'));
            }, 100);
        } else {
            content.classList.remove('active');
        }
    });
    
    // Scroll to top of the content
    const navHeight = document.querySelector('nav').offsetHeight;
    window.scrollTo({ top: navHeight, behavior: 'smooth' });
}

// Skill card modal functionality
function initSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillStoryModal = document.querySelector('.skill-story-modal');
    const skillStoryTitle = document.querySelector('.skill-story-title');
    const skillStoryBody = document.querySelector('.skill-story-body');
    const closeSkillStory = document.querySelector('.close-skill-story');
    
    // Skill stories content
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
                setTimeout(() => {
                    skillStoryModal.classList.add('active');
                }, 10);
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeSkillStory.addEventListener('click', () => {
        skillStoryModal.classList.remove('active');
        setTimeout(() => {
            skillStoryModal.style.display = 'none';
        }, 500);
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === skillStoryModal) {
            skillStoryModal.classList.remove('active');
            setTimeout(() => {
                skillStoryModal.style.display = 'none';
            }, 500);
            document.body.style.overflow = 'auto';
        }
    });
}

// Initialize parallax effect for header
function initParallax() {
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            const moveX = mouseX * 20;
            const moveY = mouseY * 20;
            
            const headerParticles = document.querySelector('.header-particles');
            if (headerParticles) {
                headerParticles.style.transform = `translate(${moveX - 10}px, ${moveY - 10}px)`;
            }
        });
    }
}

// Initialize cursor trail effect
function initCursorTrail() {
    const maxTrails = 5;
    const trails = [];
    
    for (let i = 0; i < maxTrails; i++) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        document.body.appendChild(trail);
        trails.push({
            element: trail,
            x: 0,
            y: 0,
            size: 8 - (i * 1.5),
            active: false
        });
    }
    
    document.addEventListener('mousemove', (e) => {
        trails.forEach((trail, index) => {
            setTimeout(() => {
                trail.x = e.clientX;
                trail.y = e.clientY;
                trail.element.style.left = trail.x + 'px';
                trail.element.style.top = trail.y + 'px';
                trail.element.style.width = trail.size + 'px';
                trail.element.style.height = trail.size + 'px';
                trail.element.style.opacity = '1';
                
                setTimeout(() => {
                    trail.element.style.opacity = '0';
                }, 200);
            }, index * 50);
        });
    });
}