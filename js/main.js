document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  // Preloader
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  // Scroll top button
  let scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const toggleScrollTop = function () {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', toggleScrollTop);
    document.addEventListener('scroll', toggleScrollTop);
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Init AOS
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  // Init GLightbox
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  // Init PureCounter
  new window.PureCounter();

  // Init Swiper sliders
  document.querySelectorAll('.init-swiper').forEach(function (swiperElement) {
    let config = JSON.parse(
      swiperElement.querySelector('.swiper-config').innerHTML.trim()
    );
    new Swiper(swiperElement, config);
  });

  // Init Isotope
  document.querySelectorAll('.isotope-layout').forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function () {
      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function (filters) {
        filters.addEventListener('click', function () {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });
    });
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

  // Mobile nav toggle
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  // Hide mobile nav on same-page/hash links
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  // Navmenu Scrollspy
  let navmenulinks = document.querySelectorAll('.navmenu a');
  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
});

const teamSlider = document.getElementById('teamSlider');

if (teamSlider) {
  const getScrollAmount = () => {
    const firstItem = teamSlider.querySelector('.team-slider-item');
    return firstItem ? firstItem.offsetWidth + 24 : 344;
  };

  const moveNext = () => {
    // Check if we're near the end of the scroll container
    if (Math.ceil(teamSlider.scrollLeft + teamSlider.clientWidth) >= teamSlider.scrollWidth - 10) {
      // Disable smooth scrolling temporarily to allow instant layout shift
      teamSlider.style.scrollBehavior = 'auto';

      // Move the first element to the end of the line
      const firstItem = teamSlider.firstElementChild;
      teamSlider.appendChild(firstItem);

      // Instantly rewind scrollLeft by the width of the moved element 
      // so the viewer experiences zero visual change
      teamSlider.scrollLeft -= getScrollAmount();

      // Force the browser to register the instant shift before starting the animation
      void teamSlider.offsetWidth;

      // Re-enable smooth scroll and move to next item after a brief timeout
      setTimeout(() => {
        teamSlider.style.scrollBehavior = 'smooth';
        teamSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
      }, 20);

      return; // Exit early so we don't trigger the default scrollBy below
    }
    // Default smooth scroll to the next slide
    teamSlider.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
  };

  let autoScrollInterval = setInterval(moveNext, 2000);

  // Pause auto-scrolling when interacting
  teamSlider.addEventListener('mouseenter', () => clearInterval(autoScrollInterval));
  teamSlider.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(moveNext, 2000);
  });
}

