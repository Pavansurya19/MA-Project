document.addEventListener('DOMContentLoaded', () => {
  // Sticky header treatment.
  const header = document.querySelector('.header');
  const updateHeader = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile navigation.
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.textContent = '☰';
    }));
  }

  // Reveal elements as they enter the viewport.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  // GA4 event helper. The Google tag is included in each HTML page.
  function trackEvent(name, params = {}) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    else console.info('GA4 not initialized:', name, params);
  }

  // Product filter controls.
  const filters = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.product-card');
  filters.forEach(button => button.addEventListener('click', () => {
    filters.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    const filter = button.dataset.filter;
    cards.forEach(card => card.hidden = filter !== 'all' && card.dataset.category !== filter);
  }));

  // Vehicle interest tracking. The enquiry page receives the selected vehicle.
  document.querySelectorAll('.product-action').forEach(button => {
    button.addEventListener('click', () => {
      const itemName = button.dataset.item || 'Unknown model';
      trackEvent('select_item', {
        item_list_name: 'Apex Motorworks vehicle range',
        items: [{ item_id: itemName.toLowerCase().replaceAll(' ', '_'), item_name: itemName }]
      });
      window.location.href = `contact.html?vehicle=${encodeURIComponent(itemName)}`;
    });
  });

  // Contact demo form: local validation only, no actual message delivery.
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const vehicle = new URLSearchParams(window.location.search).get('vehicle');
    if (vehicle) {
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      if (subject) subject.value = 'Vehicle enquiry';
      if (message) message.value = `I would like to know more about the ${vehicle}.`;
    }
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const status = document.getElementById('contact-status');
      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        status.textContent = 'Please complete all required fields correctly.';
        return;
      }
      trackEvent('demo_form_submit', { form_name: 'contact_demo' });
      status.textContent = 'Thank you! Demo validation succeeded. No message was sent or stored.';
      contactForm.reset();
    });
  }

  // Newsletter demo form: does not register an actual subscription.
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      const email = document.getElementById('newsletter-email');
      const status = document.getElementById('newsletter-status');
      if (!email.checkValidity() || !email.value.trim()) {
        email.reportValidity();
        status.textContent = 'Please enter a valid email address.';
        return;
      }
      trackEvent('demo_form_submit', { form_name: 'newsletter_demo' });
      status.textContent = 'Thank you! This demo did not create a real subscription.';
      newsletterForm.reset();
    });
  }
});