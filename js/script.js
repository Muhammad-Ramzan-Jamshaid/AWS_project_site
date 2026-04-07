// AWS Project Site - Main JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth scrolling functionality for anchor links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Get the target attribute
            const targetId = this.getAttribute('href');
            
            // Only handle internal '#' links
            if (targetId.startsWith('#')) {
                e.preventDefault();
                
                // Remove active class from all links
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
                
                if (targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Offset for fixed navbar
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: "smooth"
                        });
                    }
                }
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });
    
    // Add scroll event listener to update navbar styling on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.custom-navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 10px 30px rgba(255, 102, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.85)';
            navbar.style.boxShadow = '0 4px 30px rgba(255, 102, 0, 0.08)';
        }
    });
    // Video Modal Logic (YouTube Iframe)
    const videoModal = document.getElementById('videoModal');
    const projectVideo = document.getElementById('projectVideo');
    // Using the requested YouTube video ID: dXSsyZuGx08
    const youtubeSrc = "https://www.youtube.com/embed/dXSsyZuGx08?autoplay=1&rel=0";
    
    if (videoModal && projectVideo) {
        // Stop video by clearing src when modal closes
        videoModal.addEventListener('hidden.bs.modal', function () {
            projectVideo.setAttribute('src', '');
        });

        // Auto-play video by injecting src immediately when modal starts to open
        // Using show.bs.modal instead of shown.bs.modal for instant triggering
        videoModal.addEventListener('show.bs.modal', function () {
            projectVideo.setAttribute('src', youtubeSrc);
        });
    }

    // Team Slider Navigation Logic
    const teamSlider = document.getElementById('teamSlider');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    if (teamSlider && btnPrev && btnNext) {
        // Calculate the scroll amount dynamically based on card size
        const getScrollAmount = () => {
            const firstItem = teamSlider.querySelector('.team-slider-item');
            return firstItem ? firstItem.offsetWidth + 24 : 344; // 24px is the flex gap
        };

        btnNext.addEventListener('click', () => {
            teamSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        btnPrev.addEventListener('click', () => {
            teamSlider.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });
    }

    // Console greeting
    console.log("%cAWS Project loaded successfully!", "color: #ff6600; font-size: 16px; font-weight: bold;");
});
