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
    initStatCounters();

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

})();
