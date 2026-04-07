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
    // Video Modal Logic
    const videoModal = document.getElementById('videoModal');
    const projectVideo = document.getElementById('projectVideo');
    
    if (videoModal && projectVideo) {
        // Stop video when modal closes
        videoModal.addEventListener('hidden.bs.modal', function () {
            projectVideo.pause();
            projectVideo.currentTime = 0;
        });

        // Auto-play video when modal opens
        videoModal.addEventListener('shown.bs.modal', function () {
            projectVideo.play();
        });
    }

    // Console greeting
    console.log("%cAWS Project loaded successfully!", "color: #ff6600; font-size: 16px; font-weight: bold;");
});
