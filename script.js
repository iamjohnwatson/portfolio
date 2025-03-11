document.addEventListener('DOMContentLoaded', function() {
    // Set current date for cover letter
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
      const currentDate = new Date();
      dateElement.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileNavToggle) {
      mobileNavToggle.addEventListener('click', function() {
        navLinks.classList.toggle('open');
      });
    }
    
    // Intersection Observer for scroll-triggered animations
    function initScrollObservers() {
      const elements = document.querySelectorAll('.animate-on-scroll');
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      elements.forEach(el => observer.observe(el));
    }
    initScrollObservers();
    
    // Parallax effect for background layers
    window.addEventListener('scroll', function() {
      const scrollY = window.scrollY;
      document.querySelectorAll('.parallax-layer').forEach((layer, index) => {
        const speed = (index + 1) * 0.2;
        layer.style.transform = `translateY(${scrollY * speed}px)`;
      });
      updateProgressBar();
    });
    
    // Particle effects in header
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
      headerParticles.addEventListener('mousemove', function(e) {
        const offsetX = (e.clientX / window.innerWidth - 0.5) * 20;
        const offsetY = (e.clientY / window.innerHeight - 0.5) * 20;
        headerParticles.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
      headerParticles.addEventListener('mouseleave', function() {
        headerParticles.style.transform = 'translate(0, 0)';
      });
    }
    
    // Scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.addEventListener('click', function() {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      });
    }
    
    // Update progress bar on scroll
    function updateProgressBar() {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      const progressBar = document.querySelector('.progress-bar');
      if (progressBar) {
        progressBar.style.width = Math.round(scrollPercent * 100) + '%';
      }
    }
  });
  