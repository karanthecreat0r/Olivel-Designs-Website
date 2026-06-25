(function () {
  document.documentElement.classList.add('motion-ready');

  var contactBar = document.querySelector('.contact-bar');
  if (contactBar && !contactBar.querySelector('.header-socials')) {
    var socials = document.createElement('div');
    socials.className = 'header-socials';
    socials.setAttribute('aria-label', 'Olivèl Designs social media');
    socials.innerHTML =
      '<a href="https://www.instagram.com/oliveldesigns/" target="_blank" rel="noreferrer" aria-label="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.4" cy="6.7" r="1"></circle></svg></a>' +
      '<a href="https://www.facebook.com/oliveldesigns" target="_blank" rel="noreferrer" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v7h4v-7h3.5l.5-4h-4V9c0-.7.3-1 1-1Z"></path></svg></a>' +
      '<a href="https://www.linkedin.com/company/olivel-design-studio/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><rect x="3" y="9" width="4" height="12"></rect><circle cx="5" cy="5" r="2"></circle><path d="M11 21V9h4v2c1-1.5 2.4-2.4 4.2-2.4 3 0 3.8 2 3.8 5.2V21h-4v-6.3c0-1.5-.3-2.7-2-2.7-1.8 0-2 1.5-2 3.1V21h-4Z"></path></svg></a>' +
      '<a href="https://www.youtube.com/@OlivelDesignsofficial" target="_blank" rel="noreferrer" aria-label="YouTube"><svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4"></rect><path class="play" d="m10 9 5 3-5 3Z"></path></svg></a>' +
      '<a href="https://wa.me/917339666149" target="_blank" rel="noreferrer" aria-label="WhatsApp"><svg viewBox="0 0 24 24"><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.4-4.7A8.5 8.5 0 1 1 20.5 11.7Z"></path><path d="M8.2 7.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.7 1.7c.1.3.1.5-.1.7l-.6.7c-.2.2-.2.4-.1.6.6 1.2 1.6 2.2 2.8 2.8.2.1.4.1.6-.1l.8-1c.2-.2.4-.3.7-.2l1.7.8c.3.1.4.3.4.5 0 .5-.2 1.5-1 2.1-.7.6-1.7.8-2.8.5-1.4-.4-3.2-1.3-4.8-2.9-1.3-1.3-2.2-2.9-2.6-4.3-.3-1-.1-1.8.4-2.4.4-.4.8-.6 1.2-.6Z"></path></svg></a>';
    contactBar.insertBefore(socials, contactBar.lastElementChild);
  }

  var progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  function updateProgress() {
    var total = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (total > 0 ? window.scrollY / total : 0) + ')';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      document.body.classList.toggle('menu-open', open);
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 820) {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
      }
    });
  }

  document.querySelectorAll('[data-year]').forEach(function (item) { item.textContent = new Date().getFullYear(); });

  var animatedItems = document.querySelectorAll('.reveal, h1, h2, .image-frame, .project-frame, .gallery-item, .service-card, .content-card, .process-grid article, .service-line, .review-card, .review-summary, .insta-card');
  animatedItems.forEach(function (item, index) {
    if (item.matches('h1, h2')) item.classList.add('motion-heading');
    else if (item.matches('.image-frame, .project-frame, .gallery-item, .insta-card')) item.classList.add('motion-image');
    else item.classList.add('motion-item');
    item.style.setProperty('--motion-delay', (index % 4) * 70 + 'ms');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    animatedItems.forEach(function (item) { observer.observe(item); });
  } else {
    animatedItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  var carousel = document.querySelector('.insta-track');
  if (carousel) {
    document.querySelectorAll('[data-carousel]').forEach(function (button) {
      button.addEventListener('click', function () {
        var direction = button.getAttribute('data-carousel') === 'next' ? 1 : -1;
        carousel.scrollBy({ left: direction * Math.min(carousel.clientWidth * 0.82, 390), behavior: 'smooth' });
      });
    });
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.setInterval(function () {
        var atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 20;
        carousel.scrollTo({ left: atEnd ? 0 : carousel.scrollLeft + 360, behavior: 'smooth' });
      }, 4500);
    }
  }

  var lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    var lightboxImage = lightbox.querySelector('img');
    var lightboxLabel = lightbox.querySelector('p');
    document.querySelectorAll('[data-lightbox]').forEach(function (item) {
      item.addEventListener('click', function () {
        lightboxImage.src = item.getAttribute('data-lightbox');
        lightboxLabel.textContent = item.getAttribute('data-label') || '';
        lightbox.classList.add('is-open');
      });
    });
    lightbox.addEventListener('click', function (event) { if (event.target === lightbox || event.target.closest('button')) lightbox.classList.remove('is-open'); });
  }

  var contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(contactForm);
      var subject = encodeURIComponent('Interior enquiry from ' + data.get('name'));
      var body = encodeURIComponent('Name: ' + data.get('name') + '\nPhone: ' + data.get('phone') + '\nLocation: ' + data.get('location') + '\nProperty: ' + data.get('property') + '\n\nProject details:\n' + data.get('message'));
      window.location.href = 'mailto:info@oliveldesigns.com?subject=' + subject + '&body=' + body;
    });
  }
})();
