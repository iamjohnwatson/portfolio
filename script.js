// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    initializeApp();
});

// Main initialization function
function initializeApp() {
    // Set current date in the cover letter
    setCurrentDate();
    
    // Initialize tab navigation
    initTabs();
    
    // Initialize mobile navigation
    initMobileNav();
    
    // Initialize dark mode toggle
    initDarkMode();
    
    // Initialize header particles
    createHeaderParticles();
    
    // Initialize orbit simulator
    initOrbitSimulator();
    
    // Initialize skill stories
    initSkillStories();
    
    // Initialize portfolio filters
    initPortfolioFilters();
    
    // Initialize portfolio previews
    initPortfolioPreviews();
    
    // Initialize scroll-based animations
    initScrollAnimations();
    
    // Initialize story progress bar
    initStoryProgress();
    
    // Initialize data visualizations
    initDataVisualizations();
    
    // Initialize typing animation
    initTypingAnimation();
    
    // Initialize donut charts
    initDonutCharts();
}

// Set current date in the cover letter
function setCurrentDate() {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);
    document.getElementById('current-date').textContent = formattedDate;
}

// Initialize tab navigation
function initTabs() {
    const tabs = document.querySelectorAll('.tabs li');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Check if there's a hash in the URL
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        switchTab(tabId);
    }
}

// Switch between tabs
function switchTab(tabId) {
    // Update URL hash
    window.location.hash = tabId;
    
    // Remove active class from all tabs and content
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Add active class to selected tab and content
    document.querySelector(`.tabs li[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');
    
    // Scroll to top of the content
    window.scrollTo({
        top: document.querySelector('nav').offsetTop,
        behavior: 'smooth'
    });
    
    // Reset and reinitialize scroll animations for the new tab
    resetScrollAnimations();
    checkScrollAnimations();
    
    // Reinitialize data visualizations if portfolio tab is active
    if (tabId === 'portfolio') {
        initPortfolioVisualization();
    }
    
    // Reinitialize donut charts if resume tab is active
    if (tabId === 'resume') {
        initDonutCharts();
    }
}

// Initialize mobile navigation
function initMobileNav() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navTabs = document.querySelector('.tabs');
    
    mobileToggle.addEventListener('click', () => {
        navTabs.classList.toggle('show');
    });
    
    // Close mobile menu when a tab is clicked
    document.querySelectorAll('.tabs li').forEach(tab => {
        tab.addEventListener('click', () => {
            navTabs.classList.remove('show');
        });
    });
}

// Initialize dark mode toggle
function initDarkMode() {
    const themeToggle = document.getElementById('theme-switch');
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save theme preference
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Reinitialize visualizations for theme change
        initDonutCharts();
        if (document.getElementById('portfolio').classList.contains('active')) {
            initPortfolioVisualization();
        }
    });
}

// Create header particles
function createHeaderParticles() {
    const headerParticles = document.getElementById('header-particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Random positioning
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Random size
        const size = Math.random() * 5 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Random animation delay
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        headerParticles.appendChild(particle);
    }
}

// Initialize orbit simulator with Matter.js
function initOrbitSimulator() {
    // This is a placeholder for the Matter.js implementation
    // In a real implementation, we would use Matter.js to create
    // a physics-based orbit simulation
    
    // For now, we'll use CSS animations as defined in the CSS file
}

// Initialize skill stories
function initSkillStories() {
    const skillCards = document.querySelectorAll('.skill-card');
    const skillStoryModal = document.querySelector('.skill-story-modal');
    const closeBtn = document.querySelector('.close-skill-story');
    const storyTitle = document.querySelector('.skill-story-title');
    const storyBody = document.querySelector('.skill-story-body');
    
    // Skill story content
    const skillStories = {
        'Financial Reporting': {
            title: 'Financial Reporting Excellence',
            content: `
                <p>My journey in financial reporting began at Reuters, where I specialized in covering technology companies. I've developed a keen eye for financial trends, market movements, and the ability to translate complex financial data into compelling narratives.</p>
                <p>I've covered major financial events, earnings reports, and market shifts, always focusing on providing clear, accurate information that helps readers understand the broader economic context.</p>
                <p>My approach combines rigorous data analysis with storytelling, ensuring that financial information is not just accurate but accessible and engaging.</p>
            `
        },
        'Data Visualization': {
            title: 'Data Visualization Journey',
            content: `
                <p>My passion for data visualization emerged from the need to make complex financial information more accessible. I've developed skills in various visualization tools and programming languages to create compelling visual stories.</p>
                <p>I've used D3.js, Chart.js, and other libraries to create interactive visualizations that help readers understand trends, patterns, and relationships in data. I've also used Adobe Illustrator to create static visualizations for print and digital media.</p>
                <p>My approach to data visualization focuses on clarity, accuracy, and engagement, ensuring that visualizations not only look good but also effectively communicate the underlying data story.</p>
            `
        },
        'Multimedia Production': {
            title: 'Multimedia Production Skills',
            content: `
                <p>In today's digital media landscape, the ability to create content across multiple formats is essential. I've developed skills in podcast production, video editing, and digital content creation.</p>
                <p>I've hosted podcasts on technology and financial topics, edited video content for social media, and created digital content for various platforms. These experiences have honed my ability to tell stories in different formats and reach diverse audiences.</p>
                <p>My multimedia skills complement my writing and data visualization abilities, allowing me to create comprehensive, multi-format content packages.</p>
            `
        },
        'Research & Analysis': {
            title: 'Research & Analysis Methodology',
            content: `
                <p>Thorough research and analysis form the foundation of my work. I've developed systematic approaches to gathering, analyzing, and interpreting data from various sources.</p>
                <p>My research process involves identifying reliable sources, cross-referencing information, and applying analytical frameworks to extract meaningful insights. I'm particularly skilled at identifying trends and patterns in data that others might miss.</p>
                <p>I combine quantitative analysis with qualitative research, ensuring a comprehensive understanding of the topics I cover. This balanced approach allows me to provide nuanced, insightful reporting on complex issues.</p>
            `
        }
    };
    
    // Open modal with appropriate content when skill card is clicked
    skillCards.forEach(card => {
        card.addEventListener('click', () => {
            const skill = card.getAttribute('data-skill');
            storyTitle.textContent = skillStories[skill].title;
            storyBody.innerHTML = skillStories[skill].content;
            skillStoryModal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        skillStoryModal.style.display = 'none';
        document.body.style.overflow = ''; // Enable scrolling
    });
    
    // Close modal when clicking outside content
    skillStoryModal.addEventListener('click', (e) => {
        if (e.target === skillStoryModal) {
            skillStoryModal.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling
        }
    });
}

// Initialize portfolio filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Initialize portfolio previews
function initPortfolioPreviews() {
    const previewButtons = document.querySelectorAll('.portfolio-preview');
    const previewModals = document.querySelectorAll('.portfolio-preview-modal');
    const closeButtons = document.querySelectorAll('.close-preview');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const previewId = button.getAttribute('data-id');
            const modal = document.getElementById(`${previewId}-preview`);
            
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-preview-modal');
            modal.style.display = 'none';
            document.body.style.overflow = ''; // Enable scrolling
        });
    });
    
    previewModals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = ''; // Enable scrolling
            }
        });
    });
}

// Initialize scroll-based animations
function initScrollAnimations() {
    // Create a ScrollMagic controller
    const controller = new ScrollMagic.Controller();
    
    // Initialize animations for headings
    document.querySelectorAll('.animated-heading').forEach(heading => {
        new ScrollMagic.Scene({
            triggerElement: heading,
            triggerHook: 0.8,
            reverse: false
        })
        .on('enter', () => {
            heading.style.animationPlayState = 'running';
        })
        .addTo(controller);
    });
    
    // Set up scroll event listener for reveal animations
    window.addEventListener('scroll', _.throttle(checkScrollAnimations, 200));
    
    // Initial check for elements in viewport
    checkScrollAnimations();
}

// Check which elements should be animated based on scroll position
function checkScrollAnimations() {
    const revealElements = document.querySelectorAll('.reveal-element:not(.revealed)');
    
    revealElements.forEach(element => {
        if (isElementInViewport(element)) {
            element.classList.add('revealed');
        }
    });
}

// Reset scroll animations when switching tabs
function resetScrollAnimations() {
    document.querySelectorAll('.reveal-element').forEach(element => {
        element.classList.remove('revealed');
    });
}

// Check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
    );
}

// Initialize story progress bar
function initStoryProgress() {
    const progressBar = document.querySelector('.progress-bar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollProgress = (scrollTop / scrollHeight) * 100;
        
        progressBar.style.width = `${scrollProgress}%`;
    });
}

// Initialize data visualizations
function initDataVisualizations() {
    // Initialize portfolio visualization when the portfolio tab is active
    if (document.getElementById('portfolio').classList.contains('active')) {
        initPortfolioVisualization();
    }
}

// Initialize portfolio visualization
function initPortfolioVisualization() {
    const container = document.getElementById('portfolio-visualization');
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Portfolio data
    const portfolioData = [
        { category: 'Data Visualization', count: 12 },
        { category: 'Articles', count: 35 },
        { category: 'Projects', count: 8 }
    ];
    
    // Set up dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;
    const margin = { top: 40, right: 20, bottom: 40, left: 60 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Create scales
    const xScale = d3.scaleBand()
        .domain(portfolioData.map(d => d.category))
        .range([0, chartWidth])
        .padding(0.3);
    
    const yScale = d3.scaleLinear()
        .domain([0, d3.max(portfolioData, d => d.count)])
        .nice()
        .range([chartHeight, 0]);
    
    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    svg.append('g')
        .attr('transform', `translate(0,${chartHeight})`)
        .call(xAxis)
        .selectAll('text')
        .style('font-size', '12px');
    
    svg.append('g')
        .call(yAxis)
        .selectAll('text')
        .style('font-size', '12px');
    
    // Create bars with animation
    svg.selectAll('.bar')
        .data(portfolioData)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => xScale(d.category))
        .attr('width', xScale.bandwidth())
        .attr('y', chartHeight)
        .attr('height', 0)
        .attr('fill', (d, i) => {
            const colors = ['#3498db', '#e74c3c', '#2ecc71'];
            return colors[i % colors.length];
        })
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200)
        .attr('y', d => yScale(d.count))
        .attr('height', d => chartHeight - yScale(d.count));
    
    // Add labels
    svg.selectAll('.label')
        .data(portfolioData)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => xScale(d.category) + xScale.bandwidth() / 2)
        .attr('y', d => yScale(d.count) - 10)
        .attr('text-anchor', 'middle')
        .style('font-size', '14px')
        .style('font-weight', 'bold')
        .style('opacity', 0)
        .text(d => d.count)
        .transition()
        .duration(1000)
        .delay((d, i) => i * 200 + 500)
        .style('opacity', 1);
    
    // Add title
    svg.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', -15)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('font-weight', 'bold')
        .text('Portfolio Breakdown');
}

// Initialize typing animation
function initTypingAnimation() {
    // Use Anime.js for text animation
    const typingText = document.querySelector('.typing-text');
    const text = typingText.textContent;
    typingText.innerHTML = '';
    
    // Create spans for each character
    for (let i = 0; i < text.length; i++) {
        const span = document.createElement('span');
        span.textContent = text[i];
        span.style.opacity = '0';
        typingText.appendChild(span);
    }
    
    // Animate each character
    anime({
        targets: '.typing-text span',
        opacity: 1,
        duration: 50,
        easing: 'linear',
        delay: anime.stagger(100)
    });
}

// Initialize donut charts
function initDonutCharts() {
    document.querySelectorAll('.donut-chart').forEach(chart => {
        const percentage = chart.getAttribute('data-percentage');
        const chartId = chart.id;
        
        // Clear any existing content
        chart.innerHTML = '';
        chart.appendChild(chart.querySelector('.donut-label'));
        
        // Create SVG
        const svg = d3.select(chart)
            .append('svg')
            .attr('width', 150)
            .attr('height', 150)
            .attr('class', 'd3-donut')
            .append('g')
            .attr('transform', 'translate(75,75)');
        
        // Create arc generator
        const arc = d3.arc()
            .innerRadius(55)
            .outerRadius(75)
            .startAngle(0)
            .cornerRadius(5);
        
        // Background arc
        svg.append('path')
            .attr('d', arc.endAngle(2 * Math.PI))
            .attr('fill', '#f0f0f0');
        
        // Foreground arc with animation
        const foreground = svg.append('path')
            .attr('fill', getChartColor(chartId))
            .attr('d', arc.endAngle(0));
        
        // Animate the foreground arc
        foreground.transition()
            .duration(1500)
            .attrTween('d', function() {
                const interpolate = d3.interpolate(0, 2 * Math.PI * (percentage / 100));
                return function(t) {
                    return arc.endAngle(interpolate(t))();
                };
            });
    });
}

// Get color for each chart
function getChartColor(chartId) {
    const colors = {
        'dataviz-chart': '#3498db',
        'financial-chart': '#2ecc71',
        'html-chart': '#e74c3c',
        'js-chart': '#f39c12',
        'illustrator-chart': '#9b59b6',
        'analysis-chart': '#1abc9c'
    };
    
    return colors[chartId] || '#3498db';
}