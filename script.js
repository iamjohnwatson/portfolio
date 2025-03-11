// Basic example using IntersectionObserver
const sections = document.querySelectorAll('.story-section');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.5 });

sections.forEach((section) => {
  observer.observe(section);
});

// Update progress bar width based on scroll position
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;
  const documentHeight = document.body.offsetHeight;
  const viewportHeight = window.innerHeight;
  const progressWidth = (scrollPosition / (documentHeight - viewportHeight)) * 100;
  
  document.querySelector('.progress-bar').style.width = `${progressWidth}%`;
});
