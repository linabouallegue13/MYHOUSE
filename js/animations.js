/* ============================================================
   MY HOUSE — Premium Animation Engine
   Custom Cursor · Cinematic Curtain · Parallax · Split Text
   Scroll Progress · Stat Counters · Smooth Interactions
   ============================================================ */

(function () {
  'use strict';

  /* ── Helpers ─────────────────────────────────────────────── */
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => [...ctx.querySelectorAll(s)];
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
  const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── On DOM Ready ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    initPageLoader();
    initScrollProgress();
    initEnhancedReveal();
    initSplitText();
    initParallax();
    initHeroAtmosphereSwitcher();
    initSpaceVisualizerAutoPlay();
    initBackToTop();
    initInspirationsFilter();
    initInspirationsLightbox();

    if (!isTouchDevice() && !isMobile()) {
      initCustomCursor();
    }
  });

  /* ============================================================
     PAGE LOADER — Cinematic curtain (Homepage or first view)
     ============================================================ */
  function initPageLoader() {
    const isHomePage = window.location.pathname.endsWith('index.html') ||
                       window.location.pathname.endsWith('/') ||
                       window.location.pathname === '';

    if (prefersReducedMotion() || !isHomePage) {
      document.body.classList.add('page-ready');
      return;
    }

    // Create loader DOM
    const loader = document.createElement('div');
    loader.className = 'mh-loader';
    loader.setAttribute('aria-hidden', 'true');
    loader.innerHTML = `
      <div class="mh-loader__curtain"></div>
      <div class="mh-loader__content">
        <img class="mh-loader__logo"
             src="assets/images/brand/logo-white.svg"
             alt=""
             onerror="this.style.display='none'">
        <p class="mh-loader__text">MY HOUSE • SHOWROOM</p>
        <span class="mh-loader__line"></span>
      </div>
    `;
    document.body.prepend(loader);

    const dismiss = () => {
      loader.classList.add('is-done');
      document.body.classList.add('page-ready');
      setTimeout(() => {
        loader.remove();
      }, 900);
    };

    // Fast, crisp intro (800ms)
    setTimeout(dismiss, 850);
  }

  /* ============================================================
     SCROLL PROGRESS BAR
     ============================================================ */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'mh-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ============================================================
     ENHANCED SCROLL REVEAL
     ============================================================ */
  function initEnhancedReveal() {
    if (prefersReducedMotion()) {
      $$('.reveal, .reveal-stagger, .section-label--animated, .line-draw').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    $$('.reveal, .reveal-stagger, .line-draw, .section-label--animated').forEach(el => {
      observer.observe(el);
    });
  }

  /* ============================================================
     SPLIT TEXT — Handles Latin chars and Arabic words safely
     ============================================================ */
  function initSplitText() {
    if (prefersReducedMotion()) return;

    $$('.split-text').forEach(el => {
      const text = el.textContent.trim();
      const hasArabic = /[\u0600-\u06FF]/.test(text) || document.documentElement.dir === 'rtl';

      if (hasArabic) {
        // Arabic cursive: animate by words to protect character connections
        el.classList.add('word-mode');
        const words = text.split(/\s+/);
        el.innerHTML = words.map(w => `<span class="word">${w}</span>`).join(' ');
      } else {
        // Latin: animate each character smoothly
        const words = text.split(/\s+/);
        let charIndex = 0;
        el.innerHTML = words.map(word => {
          const chars = [...word].map(char => {
            charIndex++;
            const delay = (charIndex * 0.025).toFixed(3);
            return `<span class="char" style="transition-delay: ${delay}s">${char}</span>`;
          }).join('');
          return `<span class="word">${chars}</span>`;
        }).join(' ');
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(el);
    });
  }

  /* ============================================================
     PARALLAX — Hero background
     ============================================================ */
  function initParallax() {
    if (prefersReducedMotion() || isMobile()) return;

    const heroBg = $('.hero__bg') || $('.page-hero__bg');
    if (!heroBg) return;

    let ticking = false;
    const factor = 0.28;

    const update = () => {
      const offset = window.scrollY * factor;
      heroBg.style.setProperty('--parallax-y', `${offset}px`);
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ============================================================
     STAT COUNTERS — Animated numbers
     ============================================================ */
  function initStatCounters() {
    if (prefersReducedMotion()) return;

    const counters = $$('[data-counter]');
    if (!counters.length) return;

    const easeOutQuad = (t) => t * (2 - t);

    const animateCounter = (el) => {
      const target = parseFloat(el.dataset.counter);
      const duration = 1400;
      const prefix = el.dataset.counterPrefix || '';
      const suffix = el.dataset.counterSuffix || '';
      const decimals = el.dataset.counterDecimals ? parseInt(el.dataset.counterDecimals) : 0;
      const start = performance.now();

      const step = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value = target * easeOutQuad(progress);
        el.textContent = prefix + value.toFixed(decimals) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    counters.forEach(el => observer.observe(el));
  }

  /* ============================================================
     CUSTOM CURSOR
     ============================================================ */
  function initCustomCursor() {
    if (prefersReducedMotion()) return;

    document.documentElement.classList.add('has-custom-cursor');

    const cursor = document.createElement('div');
    cursor.className = 'mh-cursor';
    cursor.innerHTML = `
      <div class="mh-cursor__ring"></div>
      <div class="mh-cursor__dot"></div>
    `;
    document.body.appendChild(cursor);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let dotX = mouseX;
    let dotY = mouseY;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    const hoverSelectors = 'a, button, [role="button"], .collection-card, .product-card, .category-card, .btn, label, input, select, textarea, [onclick]';

    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSelectors)) {
        cursor.classList.add('is-hovering');
      }
    });

    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSelectors)) {
        cursor.classList.remove('is-hovering');
      }
    });

    document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
    document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));

    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
    });

    const DOT_SPEED = 0.22;
    const RING_SPEED = 0.12;

    const dot = cursor.querySelector('.mh-cursor__dot');
    const ring = cursor.querySelector('.mh-cursor__ring');

    const loop = () => {
      dotX += (mouseX - dotX) * DOT_SPEED;
      dotY += (mouseY - dotY) * DOT_SPEED;
      ringX += (mouseX - ringX) * RING_SPEED;
      ringY += (mouseY - ringY) * RING_SPEED;

      dot.style.transform = `translate(calc(${dotX}px - 50%), calc(${dotY}px - 50%))`;
      ring.style.transform = `translate(calc(${ringX}px - 50%), calc(${ringY}px - 50%))`;

      requestAnimationFrame(loop);
    };

    loop();
  }

  /* ============================================================
     HERO ATMOSPHERE SWITCHER
     ============================================================ */
  function initHeroAtmosphereSwitcher() {
    const buttons = $$('.hero-switcher__btn');
    const heroBg = $('.hero__bg');
    if (!buttons.length || !heroBg) return;

    const atmospheres = {
      carrelage: 'assets/images/headers/hero_home.jpg',
      sanitaire: 'assets/images/headers/hero_bathrooms.jpg',
      cuisine: 'assets/images/electromenager/kitchen_hero_lifestyle.jpg'
    };

    // Preload atmosphere images immediately so switching is instantaneous
    Object.values(atmospheres).forEach(src => {
      const img = new Image();
      img.src = src;
    });

    const setAtmosphere = (key) => {
      if (!atmospheres[key]) return;
      buttons.forEach(b => b.classList.toggle('active', b.dataset.atmosphere === key));
      heroBg.style.transition = 'opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      heroBg.style.opacity = '0.25';
      setTimeout(() => {
        heroBg.style.backgroundImage = `url('${atmospheres[key]}')`;
        heroBg.style.opacity = '1';
      }, 150);
    };

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setAtmosphere(btn.dataset.atmosphere);
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        setAtmosphere(btn.dataset.atmosphere);
      }, { passive: false });
    });
  }

  /* ============================================================
     SPACE VISUALIZER AUTO-PLAY
     ============================================================ */
  function initSpaceVisualizerAutoPlay() {
    const visualizer = $('.space-visualizer');
    const steps = $$('.space-visualizer__step');
    const slides = $$('.space-visualizer__slide');
    if (!visualizer || !steps.length || !slides.length) return;

    let current = 0;
    let isPaused = false;

    const goTo = (index) => {
      current = index % steps.length;
      steps.forEach((s, i) => s.classList.toggle('active', i === current));
      slides.forEach((sl, i) => sl.classList.toggle('active', i === current));
    };

    setInterval(() => {
      if (!isPaused) {
        goTo(current + 1);
      }
    }, 5500);

    visualizer.addEventListener('mouseenter', () => { isPaused = true; });
    visualizer.addEventListener('mouseleave', () => { isPaused = false; });

    steps.forEach((step, idx) => {
      step.addEventListener('click', () => {
        goTo(idx);
      });
    });
  }


  /* ============================================================
     BACK TO TOP BUTTON
     ============================================================ */
  function initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'mh-back-to-top';
    btn.setAttribute('type', 'button');
    btn.setAttribute('aria-label', 'Retour en haut');
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    `;
    document.body.appendChild(btn);

    const onScroll = () => {
      if (window.scrollY > 400) {
        btn.classList.add('is-visible');
      } else {
        btn.classList.remove('is-visible');
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ============================================================
     INSPIRATIONS FILTER TABS
     ============================================================ */
  function initInspirationsFilter() {
    const filterBtns = $$('.insp-filter-btn');
    const items = $$('.gallery-item[data-category]');
    if (!filterBtns.length || !items.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.filter;
        filterBtns.forEach(b => b.classList.toggle('active', b === btn));

        items.forEach(item => {
          const itemCat = item.dataset.category;
          const match = (cat === 'all' || itemCat === cat);
          if (match) {
            item.style.display = '';
            item.style.opacity = '0';
            item.style.transform = 'translateY(15px)';
            requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.4s ease, transform 0.4s var(--ease-luxury)';
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            });
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ============================================================
     INSPIRATIONS LIGHTBOX MODAL
     ============================================================ */
  function initInspirationsLightbox() {
    const galleryItems = $$('.gallery-item');
    if (!galleryItems.length) return;

    // Create lightbox DOM
    const lightbox = document.createElement('div');
    lightbox.className = 'insp-lightbox';
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.innerHTML = `
      <div class="insp-lightbox__dialog">
        <button type="button" class="insp-lightbox__close" aria-label="Fermer">
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <div class="insp-lightbox__img-wrap">
          <img class="insp-lightbox__img" src="" alt="">
        </div>
        <div class="insp-lightbox__footer">
          <div>
            <h3 class="insp-lightbox__title"></h3>
            <p class="insp-lightbox__desc"></p>
          </div>
          <a class="btn btn--primary insp-lightbox__cta" target="_blank" rel="noopener" href="">
            Demander conseil sur ce projet &rarr;
          </a>
        </div>
      </div>
    `;
    document.body.appendChild(lightbox);

    const img = lightbox.querySelector('.insp-lightbox__img');
    const titleEl = lightbox.querySelector('.insp-lightbox__title');
    const descEl = lightbox.querySelector('.insp-lightbox__desc');
    const ctaEl = lightbox.querySelector('.insp-lightbox__cta');
    const closeBtn = lightbox.querySelector('.insp-lightbox__close');

    const open = (item) => {
      const srcImg = item.querySelector('img');
      const caption = item.querySelector('.gallery-item__caption');
      if (!srcImg) return;

      img.src = srcImg.src;
      img.alt = srcImg.alt || 'Inspiration MY HOUSE';
      const text = caption ? caption.textContent.trim() : (srcImg.alt || 'Réalisation d\'exception');
      titleEl.textContent = text;
      descEl.textContent = 'Projet réalisé avec les matériaux et finitions haut de gamme MY HOUSE Showroom.';

      const waMsg = encodeURIComponent(`Bonjour MY HOUSE, je souhaite des renseignements sur cette inspiration vue sur votre site : ${text}`);
      ctaEl.href = `https://wa.me/21651056656?text=${waMsg}`;

      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    galleryItems.forEach(item => {
      // Add zoom icon indicator
      if (!item.querySelector('.gallery-item__zoom-icon')) {
        const icon = document.createElement('div');
        icon.className = 'gallery-item__zoom-icon';
        icon.innerHTML = `
          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="11" y1="8" x2="11" y2="14"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
        `;
        item.appendChild(icon);
      }

      item.addEventListener('click', () => open(item));
    });

    closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('is-open')) close();
    });
  }

})();
