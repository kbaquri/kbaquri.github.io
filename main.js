/* ============================================
   SAMEER MURTAZA — PORTFOLIO
   Three.js 3D Scene + Interactions
   ============================================ */

// ==========================================
// Sketchfab Embed Replaced Custom 3D Avatar
// ==========================================


// ==========================================
// NAVIGATION
// ==========================================

(function () {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');
  const allNavLinks = navLinks ? navLinks.querySelectorAll('a') : [];

  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
      navOverlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
  }

  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Active section highlighting
  const sections = document.querySelectorAll('section[id]');
  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = navLinks ? navLinks.querySelector(`a[href="#${id}"]`) : null;
      if (link) {
        link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();
})();


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

(function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


// ==========================================
// SMOOTH SCROLL (fallback)
// ==========================================

(function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
})();


// ==========================================
// STAT COUNTER ANIMATION
// ==========================================

(function () {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    if (animated) return;
    const hero = document.getElementById('hero');
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    if (rect.bottom < 100 || rect.top > window.innerHeight) return;

    animated = true;
    stats.forEach(stat => {
      const text = stat.textContent;
      const match = text.match(/(\d+)/);
      if (!match) return;
      const target = parseInt(match[0]);
      const suffix = text.replace(match[0], '');
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      function update() {
        current += step;
        if (current >= target) { stat.textContent = target + suffix; return; }
        stat.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      }
      update();
    });
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();
})();


// ==========================================
// PROJECT CARD TILT EFFECT
// ==========================================

(function () {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotX = (y - rect.height / 2) / rect.height * -4;
      const rotY = (x - rect.width / 2) / rect.width * 4;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ==========================================
// SHOW MORE / LESS PROJECTS TOGGLE
// ==========================================

function toggleExtraProjects() {
  const extras = document.querySelectorAll('.extra-project');
  const btn = document.getElementById('toggleProjects');
  const isHidden = extras[0] && extras[0].style.display === 'none';

  extras.forEach(el => {
    if (isHidden) {
      el.style.display = '';
      // Re-observe for reveal animation
      el.classList.remove('revealed');
      setTimeout(() => {
        el.classList.add('revealed');
      }, 100);
    } else {
      el.style.display = 'none';
    }
  });

  if (btn) {
    btn.innerHTML = isHidden
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg> Show Less'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg> Show More Projects';
  }
}


// ==========================================
// SKILL TAG HOVER EFFECT
// ==========================================

(function () {
  document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function () {
      this.style.transform = '';
    });
  });
})();
