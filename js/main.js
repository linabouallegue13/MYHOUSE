/* ============================================================
   MY HOUSE — Main Interactive JavaScript
   Includes: Nav, Language Switcher (FR/AR RTL), Filters,
   Product Inquiries (WhatsApp modal), and Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initLanguageSwitcher();
  initScrollReveal();
  initCatalog();
  initContactForm();
  initInquiryModal();
});

/* ---------- Navigation ---------- */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const menu = document.querySelector('.nav__menu');

  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
      document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking nav links
    menu.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        menu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ---------- Language Switcher (FR / AR with RTL) ---------- */
const TRANSLATIONS = {
  fr: {
    nav_home: "Accueil",
    nav_collections: "Collections",
    nav_bathrooms: "Salles de bain",
    nav_inspirations: "Inspirations",
    nav_about: "À propos",
    nav_contact: "Contact",
    nav_nouveautes: "Nouveautés",
    filter_accessoires: "Équipements & Accessoires",
    nav_visit: "Visiter le showroom",
    hero_headline: "L'élégance commence chez vous.",
    hero_sub: "Découvrez nos collections de carrelage, grès cérame et sanitaires pour créer des espaces qui vous ressemblent.",
    btn_discover: "Découvrir nos collections",
    btn_visit: "Visiter notre showroom",
    btn_inquire: "Demander des informations",
    filter_all: "Toutes les collections",
    filter_marbre: "Effet marbre",
    filter_pierre: "Effet pierre",
    filter_beton: "Effet béton",
    filter_interieur: "Carrelage intérieur",
    filter_exterieur: "Carrelage extérieur",
    filter_gres: "Grès cérame",
    filter_bain: "Salles de bain",
    filter_electromenager: "Électroménager",
    filter_sanitaire: "Sanitaires & Salles de bain",
    search_placeholder: "Rechercher une collection...",
    footer_desc: "Showroom haut de gamme dédié aux carrelages, grès cérame et univers de salle de bain à Hammam Sousse, Tunisie."
  },
  ar: {
    nav_home: "الرئيسية",
    nav_collections: "مجموعاتنا",
    nav_bathrooms: "حمامات",
    nav_inspirations: "إلهام وتصاميم",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    nav_nouveautes: "وصل حديثاً",
    filter_accessoires: "تجهيزات وإكسسوارات",
    nav_visit: "زيارة المعرض",
    hero_headline: "الأناقة تبدأ في منزلك.",
    hero_sub: "اكتشف مجموعاتنا المميزة من البلاط، الخزف الحجري والأطقم الصحية لابتكار مساحات تليق بذوقك الرفيع.",
    btn_discover: "اكتشف مجموعاتنا",
    btn_visit: "زيارة صالة العرض",
    btn_inquire: "طلب معلومات",
    filter_all: "جميع المجموعات",
    filter_marbre: "مظهر رخامي",
    filter_pierre: "مظهر حجري",
    filter_beton: "مظهر إسمنتي",
    filter_interieur: "بلاط داخلي",
    filter_exterieur: "بلاط خارجي",
    filter_gres: "خزف حجري",
    filter_bain: "تصاميم حمامات",
    filter_electromenager: "أجهزة كهرومنزلية",
    filter_sanitaire: "أطقم حمامات",
    search_placeholder: "بحث عن مجموعة...",
    footer_desc: "صالة عرض راقية متخصصة في الخزف الرفيع، البورسلان وتجهيزات الحمامات الفاخرة بحمام سوسة، تونس."
  }
};

function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.nav__lang-btn');
  let currentLang = localStorage.getItem('myhouse_lang') || 'fr';

  function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('myhouse_lang', lang);

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update translated text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.textContent = TRANSLATIONS[lang][key];
      }
    });

    // Update input placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.dataset.i18nPlaceholder;
      if (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) {
        el.placeholder = TRANSLATIONS[lang][key];
      }
    });
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      setLanguage(btn.dataset.lang);
    });
  });

  // Apply default or stored language
  if (currentLang !== 'fr') {
    setLanguage(currentLang);
  }
}

/* ---------- Scroll Reveal Animations ---------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ---------- Catalog Filtering & Search ---------- */
function initCatalog() {
  const grid = document.getElementById('products-grid');
  if (!grid || typeof PRODUCTS_DATA === 'undefined') return;

  const filterBtns = document.querySelectorAll('.catalog-filter');
  const searchInput = document.getElementById('catalog-search-input');
  let activeCategory = 'all';
  let searchTerm = '';

  function renderProducts() {
    grid.innerHTML = '';

    const filtered = PRODUCTS_DATA.filter(item => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const matchSearch = !searchTerm ||
        item.name.toLowerCase().includes(searchTerm) ||
        item.finish.toLowerCase().includes(searchTerm) ||
        (item.reference && item.reference.toLowerCase().includes(searchTerm)) ||
        item.categoryLabel.toLowerCase().includes(searchTerm);
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--stone);">
          <p style="font-size: 1.25rem; margin-bottom: 0.5rem;">Aucune collection ne correspond à votre recherche.</p>
          <p style="font-size: 0.9rem;">Contactez notre showroom pour découvrir nos séries exclusives.</p>
        </div>
      `;
      return;
    }

    filtered.forEach(item => {
      const card = document.createElement('div');
      card.className = 'product-card reveal revealed';
      
      const isFav = myFavorites.some(f => f.name === item.name);
      const brandBadge = item.featured ? `<span class="collection-card__badge" style="background:var(--house-red); font-size:0.65rem; top:10px; left:10px;">SÉLECTION</span>` : '';
      const colorsHtml = (item.colors || []).map((c, i) => 
        `<span class="product-card__color-dot" style="background-color: ${c};" title="${(item.colorNames && item.colorNames[i]) || ''}"></span>`
      ).join('');

      card.innerHTML = `
        <button type="button" class="product-fav-btn ${isFav ? 'active' : ''}" data-name="${item.name}" title="Ajouter à mes favoris" onclick="toggleFavoriteProduct('${item.name}', '${item.dimensions}', '${item.finish}', '${item.image}', this)">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
        ${brandBadge}
        <div class="product-card__image" onclick="openProductQuickview('${item.id}')" title="Cliquer pour voir la fiche d'architecture complète">
          <img src="${item.image}" alt="Collection ${item.name} - MY HOUSE Hammam Sousse" loading="lazy">
        </div>
        <div class="product-card__body">
          <div class="product-card__category">${item.brand ? `${item.brand} &bull; ` : ''}${item.categoryLabel}</div>
          <h3 class="product-card__name" onclick="openProductQuickview('${item.id}')" style="cursor:pointer;">${item.name}</h3>
          <div class="product-card__info"><strong>Finition :</strong> ${item.finish}</div>
          <div class="product-card__info"><strong>Dimensions :</strong> ${item.dimensions}</div>
          <div class="product-card__colors">${colorsHtml}</div>
          <div class="product-card__ref">${item.reference ? `Réf : ${item.reference}` : ''}</div>
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.5rem; margin-top:0.5rem;">
            <button type="button" class="btn btn--outline-dark btn--sm" onclick="openProductQuickview('${item.id}')">
              Fiche détails
            </button>
            <button type="button" class="btn btn--primary btn--sm" onclick="openProductInquiry('${item.name}', '${item.reference || ''}', '${item.dimensions}', '${item.finish}')">
              Devis WhatsApp
            </button>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim().toLowerCase();
      renderProducts();
    });
  }

  // Initial render
  renderProducts();
}

/* ---------- Product Inquiry (Modal & Direct WhatsApp) ---------- */
function initInquiryModal() {
  if (document.getElementById('inquiry-modal')) return;

  const modalHtml = `
    <div id="inquiry-modal" style="display:none; position:fixed; inset:0; z-index:9999; background:rgba(23,25,27,0.7); backdrop-filter:blur(4px); align-items:center; justify-content:center; padding:1.5rem;">
      <div style="background:#FFFFFF; border-radius:8px; max-width:500px; width:100%; padding:2rem; position:relative; box-shadow:0 20px 40px rgba(0,0,0,0.2);">
        <button id="close-inquiry-modal" style="position:absolute; top:1rem; right:1rem; font-size:1.5rem; line-height:1; color:#8C8880; cursor:pointer;">&times;</button>
        <span style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.15em; color:#B3202A; font-weight:600;">MY HOUSE SHOWROOM</span>
        <h3 id="modal-product-title" style="font-size:1.5rem; margin:0.3rem 0 0.8rem; font-weight:500;">Collection</h3>
        <p id="modal-product-specs" style="font-size:0.9rem; color:#8C8880; margin-bottom:1.5rem;"></p>
        
        <form id="inquiry-form" style="display:flex; flex-direction:column; gap:1rem;">
          <input type="text" id="inquiry-name" placeholder="Votre nom complet *" required style="padding:0.75rem; border:1px solid #C4BEB5; border-radius:4px; font-size:0.95rem;">
          <input type="tel" id="inquiry-phone" placeholder="Votre numéro de téléphone *" required style="padding:0.75rem; border:1px solid #C4BEB5; border-radius:4px; font-size:0.95rem;">
          <textarea id="inquiry-msg" rows="3" placeholder="Votre message ou précisions (quantité, projet...)" style="padding:0.75rem; border:1px solid #C4BEB5; border-radius:4px; font-size:0.95rem; resize:vertical;"></textarea>
          
          <button type="submit" class="btn btn--primary" style="width:100%; padding:0.9rem; display:flex; gap:0.5rem; align-items:center; justify-content:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.653.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.239-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.2 2.124 3.243 5.147 4.549.719.311 1.28.497 1.718.636.723.23 1.381.198 1.901.12.58-.088 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351z"/></svg>
            Envoyer sur WhatsApp (+216 51 056 656)
          </button>
        </form>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);

  const modal = document.getElementById('inquiry-modal');
  const closeBtn = document.getElementById('close-inquiry-modal');
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
  }
}

let selectedProductForInquiry = {};
function openProductInquiry(name, ref, dim, finish) {
  selectedProductForInquiry = { name, ref, dim, finish };
  const modal = document.getElementById('inquiry-modal');
  if (!modal) return;

  document.getElementById('modal-product-title').textContent = `Collection ${name}`;
  document.getElementById('modal-product-specs').textContent = 
    `Dimensions : ${dim} | Finition : ${finish} ${ref ? `| Réf : ${ref}` : ''}`;

  modal.style.display = 'flex';

  const form = document.getElementById('inquiry-form');
  form.onsubmit = (e) => {
    e.preventDefault();
    const clientName = document.getElementById('inquiry-name').value;
    const clientPhone = document.getElementById('inquiry-phone').value;
    const clientMsg = document.getElementById('inquiry-msg').value;

    const text = `Bonjour MY HOUSE Showroom,\n\nJe souhaite avoir des informations sur la collection : *${name}* (${dim}, ${finish}${ref ? `, Réf: ${ref}` : ''}).\n\nNom : ${clientName}\nTéléphone : ${clientPhone}\n${clientMsg ? `Message : ${clientMsg}` : ''}`;
    
    const waUrl = `https://wa.me/21651056656?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    modal.style.display = 'none';
    form.reset();
  };
}

/* ---------- Contact Form Handling ---------- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    const text = `*Nouvelle demande via le site web MY HOUSE*\n\nNom: ${name}\nTéléphone: ${phone}\nSujet: ${subject}\n\nMessage:\n${message}`;
    const waUrl = `https://wa.me/21651056656?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');

    alert("Merci pour votre message ! Vous allez être redirigé vers WhatsApp pour finaliser l'envoi direct à nos conseillers.");
    form.reset();
  });
}



/* ---------- DYNAMIC FEATURES: Progress, BackToTop, Lightbox, Counters ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initProgressBar();
  initBackToTop();
  initLightbox();
  initAnimatedCounters();
});

/* 1. Scroll Progress Indicator */
function initProgressBar() {
  const bar = document.createElement('div');
  bar.className = 'scroll-progress-bar';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const progress = (window.scrollY / totalHeight) * 100;
      bar.style.width = `${progress}%`;
    }
  }, { passive: true });
}

/* 2. Back to Top Button */
function initBackToTop() {
  const btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.setAttribute('aria-label', 'Haut de page');
  btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>`;
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 3. Interactive Image Lightbox */
function initLightbox() {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.innerHTML = `
    <div class="image-lightbox__content">
      <button class="image-lightbox__close" aria-label="Fermer">&times;</button>
      <img src="" alt="" class="image-lightbox__img">
      <div class="image-lightbox__caption"></div>
    </div>
  `;
  document.body.appendChild(lightbox);

  const imgEl = lightbox.querySelector('.image-lightbox__img');
  const captionEl = lightbox.querySelector('.image-lightbox__caption');
  const closeBtn = lightbox.querySelector('.image-lightbox__close');

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });

  // Attach to product and gallery images
  document.addEventListener('click', (e) => {
    const cardImg = e.target.closest('.product-card__image img, .collection-card__image img, .gallery-item img');
    if (cardImg) {
      e.stopPropagation();
      imgEl.src = cardImg.src;
      captionEl.textContent = cardImg.alt || 'Aperçu haute résolution MY HOUSE';
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  });
}

/* 4. Animated Statistics Counters */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        let count = 0;
        const duration = 1500;
        const stepTime = 25;
        const steps = duration / stepTime;
        const increment = target / steps;

        const timer = setInterval(() => {
          count += increment;
          if (count >= target) {
            el.textContent = `${prefix}${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${prefix}${Math.floor(count)}${suffix}`;
          }
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}


/* 5. Surface Finish Simulator on Collections Page */
function switchSimulator(imgSrc, title, desc, btnEl) {
  const img = document.getElementById('sim-preview-img');
  if (!img) return;

  document.querySelectorAll('.surface-tab-btn').forEach(b => b.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  img.style.opacity = '0.3';
  img.style.transform = 'scale(0.98)';
  setTimeout(() => {
    img.src = imgSrc;
    img.style.opacity = '1';
    img.style.transform = 'scale(1)';
  }, 200);
}


/* ---------- 6. FAVORITES / MOODBOARD DRAWER & QUICK PILL ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initFavoritesSystem();
  initQuickShowroomPill();
});

let myFavorites = JSON.parse(localStorage.getItem('myhouse_favs') || '[]');

function initFavoritesSystem() {
  // 1. Create Drawer and Toggle Button
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'favorites-toggle-btn';
  toggleBtn.setAttribute('aria-label', 'Mes Collections Favorites');
  toggleBtn.innerHTML = `
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
    <span class="favorites-count-badge" id="fav-badge">${myFavorites.length}</span>
  `;
  document.body.appendChild(toggleBtn);

  const drawer = document.createElement('div');
  drawer.className = 'favorites-drawer';
  drawer.id = 'fav-drawer';
  drawer.innerHTML = `
    <div class="favorites-drawer__header">
      <div>
        <h3 style="font-size: 1.15rem; font-weight: 600;">Mon Moodboard</h3>
        <p style="font-size: 0.8rem; color: var(--stone);">Collections sélectionnées pour votre projet</p>
      </div>
      <button id="close-fav-drawer" style="font-size: 1.5rem; color: var(--stone); cursor: pointer; border: none; background: none;">&times;</button>
    </div>
    <div class="favorites-drawer__body" id="fav-drawer-body"></div>
    <div class="favorites-drawer__footer">
      <button type="button" class="btn btn--primary" id="export-favs-wa" style="width: 100%; display: flex; gap: 0.5rem; align-items: center; justify-content: center;">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.653.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.239-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.2 2.124 3.243 5.147 4.549.719.311 1.28.497 1.718.636.723.23 1.381.198 1.901.12.58-.088 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351z"/></svg>
        Envoyer ma sélection sur WhatsApp
      </button>
    </div>
  `;
  document.body.appendChild(drawer);

  const updateDrawerUI = () => {
    document.getElementById('fav-badge').textContent = myFavorites.length;
    const body = document.getElementById('fav-drawer-body');
    if (!body) return;

    if (myFavorites.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; color: var(--stone); margin: auto;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Votre sélection est vide</p>
          <p style="font-size: 0.85rem;">Cliquez sur le cœur d'une collection pour l'ajouter à votre projet.</p>
        </div>
      `;
      return;
    }

    body.innerHTML = myFavorites.map((item, idx) => `
      <div class="fav-item">
        <img src="${item.image}" alt="${item.name}">
        <div>
          <div class="fav-item__name">${item.name}</div>
          <div class="fav-item__specs">${item.dimensions} &bull; ${item.finish}</div>
        </div>
        <span class="fav-item__remove" onclick="removeFavorite(${idx})">&times;</span>
      </div>
    `).join('');
  };

  toggleBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    updateDrawerUI();
  });

  document.getElementById('close-fav-drawer').addEventListener('click', () => {
    drawer.classList.remove('open');
  });

  document.getElementById('export-favs-wa').addEventListener('click', () => {
    if (myFavorites.length === 0) {
      alert("Votre sélection est vide. Ajoutez d'abord des collections !");
      return;
    }
    const list = myFavorites.map(f => `- ${f.name} (${f.dimensions}, ${f.finish})`).join('\n');
    const msg = `Bonjour MY HOUSE Showroom,\n\nVoici ma sélection de collections préférées pour mon projet :\n\n${list}\n\nPourriez-vous m'indiquer la disponibilité et me préparer un devis ? Merci.`;
    window.open(`https://wa.me/21651056656?text=${encodeURIComponent(msg)}`, '_blank');
  });

  updateDrawerUI();
}

function toggleFavoriteProduct(name, dimensions, finish, image, btnEl) {
  const existingIdx = myFavorites.findIndex(f => f.name === name);
  if (existingIdx >= 0) {
    myFavorites.splice(existingIdx, 1);
    if (btnEl) btnEl.classList.remove('active');
  } else {
    myFavorites.push({ name, dimensions, finish, image });
    if (btnEl) btnEl.classList.add('active');
  }
  localStorage.setItem('myhouse_lang_favs', JSON.stringify(myFavorites));
  localStorage.setItem('myhouse_favs', JSON.stringify(myFavorites));
  
  const badge = document.getElementById('fav-badge');
  if (badge) badge.textContent = myFavorites.length;

  const drawer = document.getElementById('fav-drawer');
  if (drawer && drawer.classList.contains('open')) {
    const body = document.getElementById('fav-drawer-body');
    if (body) {
      body.innerHTML = myFavorites.map((item, idx) => `
        <div class="fav-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <div class="fav-item__name">${item.name}</div>
            <div class="fav-item__specs">${item.dimensions} &bull; ${item.finish}</div>
          </div>
          <span class="fav-item__remove" onclick="removeFavorite(${idx})">&times;</span>
        </div>
      `).join('');
    }
  }
}

function removeFavorite(idx) {
  myFavorites.splice(idx, 1);
  localStorage.setItem('myhouse_favs', JSON.stringify(myFavorites));
  document.getElementById('fav-badge').textContent = myFavorites.length;
  // Re-render drawer
  const body = document.getElementById('fav-drawer-body');
  if (body) {
    if (myFavorites.length === 0) {
      body.innerHTML = `
        <div style="text-align: center; color: var(--stone); margin: auto;">
          <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">Votre sélection est vide</p>
        </div>
      `;
    } else {
      body.innerHTML = myFavorites.map((item, i) => `
        <div class="fav-item">
          <img src="${item.image}" alt="${item.name}">
          <div>
            <div class="fav-item__name">${item.name}</div>
            <div class="fav-item__specs">${item.dimensions} &bull; ${item.finish}</div>
          </div>
          <span class="fav-item__remove" onclick="removeFavorite(${i})">&times;</span>
        </div>
      `).join('');
    }
  }
  // Also sync buttons on screen
  document.querySelectorAll('.product-fav-btn').forEach(btn => {
    const pName = btn.dataset.name;
    btn.classList.toggle('active', myFavorites.some(f => f.name === pName));
  });
}

/* 7. Floating Showroom Status Pill */
function initQuickShowroomPill() {
  const pill = document.createElement('a');
  pill.href = 'contact.html';
  pill.className = 'showroom-quick-pill';
  pill.innerHTML = `
    <span class="showroom-quick-pill__status"></span>
    <span><strong>Showroom ouvert</strong> &bull; Hammam Sousse</span>
  `;
  document.body.appendChild(pill);
}

/* 8. Tile Surface Calculator Calculation */
function calculateTileBoxes() {
  const areaInput = document.getElementById('calc-area');
  const sizeSelect = document.getElementById('calc-format');
  const wasteSelect = document.getElementById('calc-waste');

  if (!areaInput || !sizeSelect) return;

  const area = parseFloat(areaInput.value) || 0;
  const sqmPerBox = parseFloat(sizeSelect.value) || 1.42;
  const wasteMultiplier = parseFloat(wasteSelect.value) || 1.10;

  if (area <= 0) {
    document.getElementById('calc-result-sqm').textContent = '0 m²';
    document.getElementById('calc-result-boxes').textContent = '0 cartons';
    return;
  }

  const totalSqmNeeded = (area * wasteMultiplier).toFixed(2);
  const boxesNeeded = Math.ceil(totalSqmNeeded / sqmPerBox);

  document.getElementById('calc-result-sqm').textContent = `${totalSqmNeeded} m²`;
  document.getElementById('calc-result-boxes').textContent = `${boxesNeeded} cartons (${(boxesNeeded * sqmPerBox).toFixed(2)} m²)`;
}


/* ============================================================
   CREATIVE DYNAMIC EXTENSIONS: Custom Cursor, Space Visualizer,
   Enhanced QuickView Modal, and Live Filter Badges
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initSpaceVisualizer();
  initQuickviewModalDOM();
  updateCatalogFilterCounts();
});

/* 1. Custom Magnetic Cursor */
function initCustomCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile/touch

  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'custom-cursor-ring';

  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mouseX = -100, mouseY = -100;
  let ringX = -100, ringY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  }, { passive: true });

  const renderRing = () => {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(renderRing);
  };
  requestAnimationFrame(renderRing);

  // Hover detection
  const addHoverListeners = () => {
    document.querySelectorAll('a, button, input, select, textarea, .collection-card, .product-card, .category-card, .partner-card, .space-visualizer__step').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  };
  addHoverListeners();
  // Re-run on dynamic updates
  setTimeout(addHoverListeners, 1000);
}

/* 2. Interactive Space Visualizer on Homepage */
function initSpaceVisualizer() {
  const steps = document.querySelectorAll('.space-visualizer__step');
  const slides = document.querySelectorAll('.space-visualizer__slide');
  if (!steps.length || !slides.length) return;

  steps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      steps.forEach(s => s.classList.remove('active'));
      slides.forEach(sl => sl.classList.remove('active'));

      step.classList.add('active');
      if (slides[idx]) {
        slides[idx].classList.add('active');
      }
    });
  });
}

/* 3. Product QuickView Modal DOM & Logic */
function initQuickviewModalDOM() {
  if (document.getElementById('quickview-modal')) return;

  const modal = document.createElement('div');
  modal.id = 'quickview-modal';
  modal.className = 'product-quickview-modal';
  modal.innerHTML = `
    <div class="product-quickview-card">
      <button class="product-quickview__close" id="close-quickview">&times;</button>
      <div class="product-quickview__media">
        <img id="qv-img" src="" alt="Aperçu produit MY HOUSE">
      </div>
      <div class="product-quickview__details">
        <div class="product-quickview__brand-tag" id="qv-brand">MY HOUSE</div>
        <h3 class="product-quickview__title" id="qv-title">Produit</h3>
        <p class="product-quickview__desc" id="qv-desc">Description</p>
        
        <table class="product-quickview__specs-table">
          <tbody>
            <tr><td>Finition</td><td id="qv-finish">-</td></tr>
            <tr><td>Dimensions</td><td id="qv-dimensions">-</td></tr>
            <tr><td>Matière</td><td id="qv-material">-</td></tr>
            <tr><td>Référence</td><td id="qv-ref">-</td></tr>
          </tbody>
        </table>

        <div class="product-quickview__actions">
          <button type="button" class="btn btn--primary" id="qv-wa-btn" style="width:100%; display:flex; gap:0.5rem; justify-content:center; align-items:center;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.477-.15-.678.15-.2.301-.778.98-.953 1.18-.176.2-.351.226-.653.075s-1.272-.469-2.424-1.496c-.896-.799-1.501-1.787-1.677-2.088-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.101-.2.05-.376-.025-.527-.075-.15-.678-1.635-.929-2.239-.245-.588-.494-.509-.678-.518l-.578-.01c-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.509 1.079 2.91 1.229 3.111c.15.2 2.124 3.243 5.147 4.549.719.311 1.28.497 1.718.636.723.23 1.381.198 1.901.12.58-.088 1.78-.728 2.031-1.431.251-.703.251-1.305.176-1.431-.076-.126-.277-.201-.578-.351z"/></svg>
            Demander un devis WhatsApp (+216 51 056 656)
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const closeBtn = document.getElementById('close-quickview');
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

function openProductQuickview(productId) {
  if (typeof PRODUCTS_DATA === 'undefined') return;
  const prod = PRODUCTS_DATA.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('quickview-modal');
  if (!modal) return;

  document.getElementById('qv-img').src = prod.image;
  document.getElementById('qv-img').alt = prod.name;
  document.getElementById('qv-brand').textContent = prod.categoryLabel;
  document.getElementById('qv-title').textContent = prod.name;
  document.getElementById('qv-desc').textContent = prod.description || "Collection d'exception sélectionnée par MY HOUSE Showroom.";
  document.getElementById('qv-finish').textContent = prod.finish || 'Standard';
  document.getElementById('qv-dimensions').textContent = prod.dimensions || '-';
  document.getElementById('qv-material').textContent = prod.material || 'Céramique premium';
  document.getElementById('qv-ref').textContent = prod.reference || 'Sur demande';

  const waBtn = document.getElementById('qv-wa-btn');
  waBtn.onclick = () => {
    const text = `Bonjour MY HOUSE Showroom,\n\nJe souhaite recevoir un devis et les détails pour le produit : *${prod.name}* (Réf: ${prod.reference || 'N/A'}, Dimensions: ${prod.dimensions}). Merci !`;
    window.open(`https://wa.me/21651056656?text=${encodeURIComponent(text)}`, '_blank');
  };

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* 4. Update Filter Badges with Real Counts */
function updateCatalogFilterCounts() {
  if (typeof PRODUCTS_DATA === 'undefined') return;
  const buttons = document.querySelectorAll('.catalog-filter');
  if (!buttons.length) return;

  buttons.forEach(btn => {
    const cat = btn.dataset.category;
    let count = 0;
    if (cat === 'all') {
      count = PRODUCTS_DATA.length;
    } else {
      count = PRODUCTS_DATA.filter(p => p.category === cat).length;
    }
    const existingBadge = btn.querySelector('.catalog-filter__badge');
    if (existingBadge) {
      existingBadge.textContent = count;
    } else {
      const badge = document.createElement('span');
      badge.className = 'catalog-filter__badge';
      badge.textContent = count;
      btn.appendChild(badge);
    }
  });
}
