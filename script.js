document.addEventListener('DOMContentLoaded', function() {
    // Set current date for cover letter
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('en-US', options);
    
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
            document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-preview-modal');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modal when clicking outside the content
    previewModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal with Escape key
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
    
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const tabsContainer = document.querySelector('.tabs');

if (mobileNavToggle) {
  mobileNavToggle.addEventListener('click', () => {
    tabsContainer.classList.toggle('open');
  });
}

    // Mobile menu toggle (if needed for smaller screens)
    window.addEventListener('resize', adjustLayout);
    adjustLayout();
    
    // Initialize animation styles for scroll animations
    const elements = document.querySelectorAll('.skill-card, .job, .education, .portfolio-item');
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Initialize donut charts
    initDonutCharts();
    
    // Animate timeline items
    animateTimelineItems();
    
    // Initialize skill cards
    initSkillCards();
    
    // Set up scroll event listeners
    window.addEventListener('scroll', updateProgressBar);
    window.addEventListener('scroll', animateOnScroll);
    
    // Initial calls
    updateProgressBar();
    animateOnScroll();
    
// Add particle animation to header
const headerParticles = document.querySelector('.header-particles');
if (headerParticles) {
  // Existing particle creation loop
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDuration = (Math.random() * 10 + 5) + 's';
    particle.style.animationDelay = (Math.random() * 5) + 's';
    headerParticles.appendChild(particle);
  }
  // Add mousemove interactivity for a parallax effect
  headerParticles.addEventListener('mousemove', function(e) {
    const offsetX = (e.clientX / window.innerWidth - 0.5) * 20; // Adjust multiplier as needed
    const offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
    headerParticles.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
  headerParticles.addEventListener('mouseleave', function() {
    headerParticles.style.transform = 'translate(0, 0)';
  });
}

});

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
        } else {
            content.classList.remove('active');
        }
    });
    
    // Scroll to top of the content
    window.scrollTo({ top: document.querySelector('nav').offsetTop, behavior: 'smooth' });
}

// Responsive layout adjustments
function adjustLayout() {
    // Any responsive adjustments can go here
}

// Animate elements when they come into view
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

// Initialize donut charts
function initDonutCharts() {
    const donutCharts = document.querySelectorAll('.donut-chart');
    donutCharts.forEach(chart => {
        const percentage = chart.getAttribute('data-percentage');
        chart.style.setProperty('--percentage', percentage + '%');
    });
}

// Animate timeline items when they come into view
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
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
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

// Update scroll progress bar
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.offsetHeight;
    const winHeight = window.innerHeight;
    const scrollPercent = scrollTop / (docHeight - winHeight);
    const scrollPercentRounded = Math.round(scrollPercent * 100);
    document.querySelector('.progress-bar').style.width = scrollPercentRounded + '%';
}
