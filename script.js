/**
 * AMMAR & RANA — Luxury Wedding Invitation
 * Main JavaScript Module
 */

(function () {
  'use strict';

  /* ═══════════════════════════════════════════════════════════
     CONFIGURATION
     ═══════════════════════════════════════════════════════════ */
  const CONFIG = {
    weddingDate: new Date('2026-09-04T19:30:00+03:00'),
    defaultLang: 'en',
    loaderDuration: 550,
    timeZone: 'Asia/Damascus',
    whatsapp: {
      ammar: '963934127948',
      rana: '963992047772',
      messageAr: 'مرحباً، أود الاعتذار عن حضور حفل الزفاف. شكراً لتفهمكم.',
      messageEn: 'Hello, I would like to regretfully decline attending the wedding. Thank you for your understanding.',
    },
  };

  const i18n = {
    en: {
      loader: 'Loading your invitation',
      loader_hint: 'Tap anywhere to enter',
      hero_opening: 'Because our joy is not complete without you',
      hero_honor: 'have the honor',
      hero_family_groom: 'the family of the late Ramzi Rahmoun',
      hero_family_bride: 'and the family of Mr. Haitham Ali',
      hero_invite: 'of inviting you to attend',
      hero_event: 'the wedding celebration of their children',
      hero_groom_name: 'AMMAR',
      hero_bride_name: 'RANA',
      hero_date_label: 'Wedding Date',
      hero_date: '<span class="hero__date-stack"><span class="nums-en">04</span><span>September</span><span class="nums-en">2026</span></span>',
      hero_venue_label: 'Venue',
      hero_venue_name: 'View Restaurant',
      hero_venue_city: 'Tartous',
      scroll_down: 'Scroll',
      story_eyebrow: 'Our Story',
      story_lead: 'Every love story is beautiful, but ours is our favorite.',
      timeline_1_title: 'How It Started',
      timeline_1_text: 'What began with a simple hello became a journey filled with love, laughter and unforgettable memories.',
      timeline_2_title: 'Growing Together',
      timeline_2_text: 'Through every season, our bond grew deeper, woven with trust, joy, and endless devotion.',
      timeline_3_title: 'Our Forever',
      timeline_3_text: 'Today we invite you to celebrate the beginning of our forever.',
      countdown_eyebrow: 'Countdown',
      countdown_title: 'Until We Say Yes',
      countdown_until: 'Until our wedding',
      countdown_days: 'Days',
      details_eyebrow: 'The Celebration',
      details_title: 'Wedding Details',
      detail_date_title: 'Date',
      detail_date_value: '<span class="hero__date-stack"><span class="nums-en">04</span><span>September</span><span class="nums-en">2026</span></span>',
      detail_time_title: 'Time',
      detail_time_value: '7:30 PM',
      detail_venue_title: 'Venue',
      detail_venue_value: 'View Restaurant<br>Tartous',
      venue_eyebrow: 'Location',
      venue_title: 'Find Us',
      venue_maps_btn: 'Open in Google Maps',
      notice_ar: 'حرصًا على راحتكم واستمتاع الجميع، نرجو أن تقتصر الدعوة على البالغين. شاكرين لكم حسن تفهّمكم.',
      notice_en: 'For the comfort and enjoyment of all our guests, we kindly request that this celebration be adults only. Thank you for your understanding.',
      regret_text: 'To decline, please send your regrets at least 5 days before the wedding.',
      regret_hint: 'Please tap here',
      regret_btn_ammar: 'Ammar',
      regret_btn_rana: 'Rana',
      thanks_title: 'Thank You',
      thanks_body: 'Your presence is the greatest gift we could ask for.',
      thanks_closing: 'See you on our special day.',
      footer_tagline: 'Made with Love',
    },
    ar: {
      loader: 'جاري تحميل دعوتكم',
      loader_hint: 'المس الشاشة للدخول',
      hero_opening: 'لأن الفرح لا يكتمل إلا بوجودكم',
      hero_honor: '',
      hero_family_groom: 'عائلة المرحوم<br>رمزي رحمون',
      hero_family_bride: 'عائلة السيد<br>هيثم علي',
      hero_invite: 'نتشرّف بدعوتكم لحضور حفل زفاف ولديهما',
      hero_event: '',
      hero_groom_name: 'عمار',
      hero_bride_name: 'رنا',
      hero_date_label: 'تاريخ الزفاف',
      hero_date: '<span class="hero__date-stack"><span class="nums-en">04</span><span>سبتمبر</span><span class="nums-en">2026</span></span>',
      hero_venue_label: 'مكان الحفل',
      hero_venue_name: 'مطعم فيو',
      hero_venue_city: 'طرطوس',
      scroll_down: 'مرر للأسفل',
      story_eyebrow: 'قصتنا',
      story_lead: 'كل قصة حب جميلة، لكن قصتنا هي الأجمل بالنسبة لنا.',
      timeline_1_title: 'البداية',
      timeline_1_text: 'ما بدأ بـ«مرحبًا» عابرة، تحوّل إلى رحلة مليئة بالحب والضحك وذكريات لا تُنسى.',
      timeline_2_title: 'ننمو معًا',
      timeline_2_text: 'ومع كل مرحلة من حياتنا، ازدادت علاقتنا عمقًا، وازدانت بالثقة والفرح والإخلاص الذي لا ينتهي.',
      timeline_3_title: 'بداية الأبد',
      timeline_3_text: 'واليوم، ندعوكم لمشاركتنا الاحتفال ببداية رحلتنا التي ستدوم إلى الأبد.',
      countdown_eyebrow: 'العدّ التنازلي',
      countdown_title: 'حتى نقول نعم',
      countdown_until: 'حتى موعد زفافنا',
      countdown_days: 'يومًا',
      details_eyebrow: 'موعد الاحتفال',
      details_title: 'تفاصيل حفل الزفاف',
      detail_date_title: 'التاريخ',
      detail_date_value: '<span class="hero__date-stack"><span class="nums-en">04</span><span>سبتمبر</span><span class="nums-en">2026</span></span>',
      detail_time_title: 'الوقت',
      detail_time_value: '7:30 PM',
      detail_venue_title: 'مكان الحفل',
      detail_venue_value: 'مطعم فيو<br>طرطوس',
      venue_eyebrow: 'مكان الحفل',
      venue_title: 'موقع الاحتفال',
      venue_maps_btn: 'فتح في خرائط Google',
      notice_ar: 'حرصًا على راحتكم واستمتاع الجميع، نرجو أن تقتصر الدعوة على البالغين. شاكرين لكم حسن تفهّمكم.',
      notice_en: 'For the comfort and enjoyment of all our guests, we kindly request that this celebration be adults only. Thank you for your understanding.',
      regret_text: 'للاعتذار، يرجى الاعتذار عن الحضور قبل 5 أيام من موعد الحفل.',
      regret_hint: 'يرجى الضغط هنا',
      regret_btn_ammar: 'عمار',
      regret_btn_rana: 'رنا',
      thanks_title: 'شكرًا لكم',
      thanks_body: 'حضوركم سيجعل فرحتنا أكثر جمالًا، ومشاركتكم ستبقى ذكرى نعتز بها دائمًا.',
      thanks_closing: 'نلقاكم في يومنا المميز.',
      footer_tagline: 'صُنع بحب',
    },
  };

  /* ═══════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════ */
  let currentLang = CONFIG.defaultLang;
  let lenis = null;
  let musicShouldPlay = true;
  let loaderFinished = false;

  /* ═══════════════════════════════════════════════════════════
     DOM REFERENCES
     ═══════════════════════════════════════════════════════════ */
  const DOM = {
    html: document.documentElement,
    body: document.body,
    loader: document.getElementById('loader'),
    loaderFill: document.querySelector('.loader__line-fill'),
    progressBar: document.querySelector('.scroll-progress__bar'),
    mouseGlow: document.querySelector('.mouse-glow'),
    bgMusic: document.getElementById('bgMusic'),
    langBtns: document.querySelectorAll('.lang-switcher__btn'),
    hero: document.getElementById('hero'),
    heroImage: document.querySelector('.hero__image'),
    countDays: document.getElementById('countDays'),
    countHours: document.getElementById('countHours'),
    countMinutes: document.getElementById('countMinutes'),
    countSeconds: document.getElementById('countSeconds'),
    countdownTimer: document.querySelector('.countdown'),
  };

  let countdownInterval = null;
  let prevCountdown = { days: '', hours: '', minutes: '', seconds: '' };

  function toWesternDigits(value) {
    return String(value)
      .replace(/[٠-٩]/g, (digit) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(digit)))
      .replace(/[۰-۹]/g, (digit) => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)));
  }

  function formatCountNumber(value) {
    return toWesternDigits(String(value));
  }

  /* ═══════════════════════════════════════════════════════════
     LANGUAGE
     ═══════════════════════════════════════════════════════════ */
  function setLanguage(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;

    DOM.html.lang = lang;
    DOM.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      const value = i18n[lang][key];
      if (value === undefined || el.hasAttribute('data-split')) return;
      if (!value) {
        el.textContent = '';
        el.setAttribute('hidden', '');
        return;
      }
      el.removeAttribute('hidden');
      const normalized = toWesternDigits(value);
      if (normalized.includes('<')) {
        el.innerHTML = normalized;
      } else {
        el.textContent = normalized;
      }
    });

    document.querySelectorAll('[data-split]').forEach((el) => {
      rebuildHeroNameSplit(el, loaderFinished);
    });

    document.querySelectorAll('[data-reveal]').forEach((el) => {
      el.style.filter = 'none';
      el.style.webkitFilter = 'none';
    });

    DOM.langBtns.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    if (DOM.countDays && prevCountdown.days !== '') {
      DOM.countDays.textContent = formatCountNumber(prevCountdown.days);
      DOM.countDays.setAttribute('lang', 'en');
      DOM.countDays.setAttribute('dir', 'ltr');
    }

    [DOM.countHours, DOM.countMinutes, DOM.countSeconds].forEach((el) => {
      if (!el) return;
      el.setAttribute('lang', 'en');
      el.setAttribute('dir', 'ltr');
    });

    localStorage.setItem('wedding-lang', lang);

    initWhatsAppButtons();
  }

  function initWhatsAppButtons() {
    const message = encodeURIComponent(
      currentLang === 'ar' ? CONFIG.whatsapp.messageAr : CONFIG.whatsapp.messageEn
    );
    const ammarBtn = document.getElementById('waAmmar');
    const ranaBtn = document.getElementById('waRana');

    if (ammarBtn && CONFIG.whatsapp.ammar) {
      ammarBtn.href = `https://wa.me/${CONFIG.whatsapp.ammar}?text=${message}`;
    }

    if (ranaBtn && CONFIG.whatsapp.rana) {
      ranaBtn.href = `https://wa.me/${CONFIG.whatsapp.rana}?text=${message}`;
    }
  }

  function initLanguage() {
    const saved = localStorage.getItem('wedding-lang');
    const browserLang = navigator.language.startsWith('ar') ? 'ar' : 'en';
    setLanguage(saved || browserLang);

    DOM.langBtns.forEach((btn) => {
      btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });
  }

  /* ═══════════════════════════════════════════════════════════
     LOADER
     ═══════════════════════════════════════════════════════════ */
  function revealHeroContent() {
    document.querySelectorAll('.hero__basmala, .hero__line, .hero__person-label, .hero__name, .hero__meta-card, .scroll-indicator').forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    if (DOM.hero) {
      DOM.hero.classList.add('hero--revealed');
    }
  }

  function initLoader() {
    DOM.body.classList.add('is-loading');

    const onLoaderDone = () => {
      DOM.loader.classList.add('is-hidden');
      DOM.body.classList.remove('is-loading');

      document.querySelectorAll('[data-split]').forEach((el) => {
        rebuildHeroNameSplit(el, true);
      });

      initHeroAnimation();
      window.setTimeout(revealHeroContent, 3200);
    };

    const finishLoader = () => {
      if (loaderFinished) return;
      loaderFinished = true;
      enableMusicSound();

      if (window.gsap && DOM.loader) {
        gsap.to(DOM.loader, {
          opacity: 0,
          duration: 0.25,
          ease: 'power2.inOut',
          onComplete: onLoaderDone,
        });
        return;
      }

      if (DOM.loader) {
        DOM.loader.style.display = 'none';
      }

      onLoaderDone();
    };

    DOM.loader.addEventListener('click', finishLoader);
    DOM.loader.addEventListener('touchstart', finishLoader, { passive: true });

    if (window.gsap) {
      gsap.to(DOM.loaderFill, {
        width: '100%',
        duration: CONFIG.loaderDuration / 1000,
        ease: 'power2.inOut',
      });

      gsap.fromTo('.loader__monogram',
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, delay: 0.05, ease: 'power3.out' }
      );
    } else if (DOM.loaderFill) {
      DOM.loaderFill.style.width = '100%';
    }

    setTimeout(finishLoader, CONFIG.loaderDuration);
  }

  /* ═══════════════════════════════════════════════════════════
     LENIS SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════ */
  function updateHeroScrollState(scrollY = 0) {
    const heroHeight = DOM.hero ? DOM.hero.offsetHeight : 0;
    DOM.body.classList.toggle('scrolled-past-hero', scrollY > heroHeight * 0.5);
  }

  function usesNativeScroll() {
    return window.matchMedia('(max-width: 768px), (prefers-reduced-motion: reduce)').matches;
  }

  function getScrollTop() {
    return window.scrollY || document.documentElement.scrollTop || 0;
  }

  function getScrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return max > 0 ? getScrollTop() / max : 0;
  }

  function initAnchorLinks(scroller) {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (!target) return;

        if (scroller && typeof scroller.scrollTo === 'function') {
          scroller.scrollTo(target, { offset: 0, duration: 1.8 });
          return;
        }

        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function initNativeScroll() {
    document.documentElement.classList.add('is-native-scroll');
    document.body.classList.add('is-native-scroll');

    const onScroll = () => {
      enableMusicSound();

      if (DOM.progressBar) {
        DOM.progressBar.style.width = `${getScrollProgress() * 100}%`;
      }

      updateHeroScrollState(getScrollTop());
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        onScroll();
        if (window.ScrollTrigger) ScrollTrigger.refresh();
      }, 200);
    }, { passive: true });

    onScroll();
    initAnchorLinks(null);
  }

  function initLenis() {
    if (usesNativeScroll() || typeof gsap === 'undefined') {
      initNativeScroll();
      return;
    }

    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ({ scroll, progress }) => {
      enableMusicSound();

      if (DOM.progressBar) {
        DOM.progressBar.style.width = `${progress * 100}%`;
      }

      updateHeroScrollState(scroll);
    });

    updateHeroScrollState(lenis.scroll);

    window.addEventListener('resize', () => {
      updateHeroScrollState(lenis.scroll);
    }, { passive: true });

    window.addEventListener('orientationchange', () => {
      setTimeout(() => updateHeroScrollState(lenis.scroll), 150);
    }, { passive: true });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    initAnchorLinks(lenis);
  }

  /* ═══════════════════════════════════════════════════════════
     GSAP ANIMATIONS
     ═══════════════════════════════════════════════════════════ */
  function initHeroSplitText() {
    document.querySelectorAll('[data-split]').forEach((el) => {
      rebuildHeroNameSplit(el, loaderFinished);
    });
  }

  function rebuildHeroNameSplit(el, showImmediately = false) {
    const key = el.dataset.i18n;
    const raw = (key && i18n[currentLang][key]) ? i18n[currentLang][key] : el.textContent;
    const text = toWesternDigits(String(raw).replace(/<[^>]*>/g, '')).trim();
    const isArabic = currentLang === 'ar';

    el.textContent = text;
    el.classList.add('hero__name--whole');
    el.setAttribute('dir', isArabic ? 'rtl' : 'ltr');
    el.setAttribute('lang', isArabic ? 'ar' : 'en');

    if (showImmediately) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  }

  function initHeroBokeh() {
    const canvas = document.querySelector('.hero__bokeh');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = null;
    let running = false;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const count = isMobile ? 14 : 24;
    const particles = [];

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 2.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.04,
          vy: -Math.random() * 0.06 - 0.01,
          opacity: Math.random() * 0.25 + 0.05,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.005;
        if (p.y < -10) p.y = h + 10;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.phase));
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        grad.addColorStop(0, `rgba(255, 248, 230, ${alpha})`);
        grad.addColorStop(1, 'rgba(200, 169, 106, 0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }

    resize();
    seed();
    running = true;
    tick();

    window.addEventListener('resize', () => { resize(); seed(); });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) { running = false; if (raf) cancelAnimationFrame(raf); }
      else { running = true; tick(); }
    });
  }

  function initFooterStars() {
    const canvas = document.querySelector('.footer__stars');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const stars = [];
    const count = window.matchMedia('(max-width: 768px)').matches ? 40 : 80;

    function resize() {
      const footer = canvas.parentElement;
      if (!footer) return;
      const rect = footer.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      stars.length = 0;
      for (let i = 0; i < count; i += 1) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.5 + 0.1,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.02 + 0.005,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        s.phase += s.speed;
        const alpha = s.opacity * (0.5 + 0.5 * Math.sin(s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(230, 215, 184, ${alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    }

    resize();
    seed();
    draw();
    window.addEventListener('resize', () => { resize(); seed(); });
  }

  function initStoryTimeline() {
    const items = document.querySelectorAll('.timeline__item');
    if (!items.length || !window.gsap) return;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const fromState = isMobile
      ? { opacity: 0, y: 24 }
      : { opacity: 0, x: -24 };

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        fromState,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }

  function initHeroAnimation() {
    initHeroSplitText();

    if (!window.gsap) {
      revealHeroContent();
      return;
    }

    gsap.set('.hero__basmala, .hero__line, .hero__person-label, .hero__meta-card, .scroll-indicator', { opacity: 0, y: 20 });
    gsap.set('.hero__name', { opacity: 0, y: '1.1em' });

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: revealHeroContent,
    });

    tl.fromTo('.hero__overlay', { opacity: 0 }, { opacity: 1, duration: 1.8 })
      .fromTo('.hero__vignette', { opacity: 0 }, { opacity: 1, duration: 2 }, '-=1.4')
      .fromTo('.hero__lens-flare', { opacity: 0 }, { opacity: 0.7, duration: 2.5 }, '-=1.8')
      .to('.hero__basmala', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=1.1')
      .to('.hero__line', { opacity: 1, y: 0, duration: 0.85, stagger: 0.1 }, '-=0.85')
      .to('.hero__person-label', { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 }, '-=0.55')
      .to('.hero__name--groom', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
      }, '-=0.45')
      .to('.hero__name--bride', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power4.out',
      }, '-=0.65')
      .to('.hero__meta-card', { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.45')
      .to('.scroll-indicator', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4');

    if (DOM.heroImage) {
      gsap.fromTo(DOM.heroImage, { scale: 1.18 }, { scale: 1.08, duration: 3.5, ease: 'power2.out' });

      gsap.to(DOM.heroImage, {
        scale: 1.15,
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: DOM.hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }

    const flare = document.querySelector('.hero__lens-flare');
    if (flare) {
      gsap.to(flare, {
        x: -20,
        y: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: DOM.hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     STORY — Parallax & floating decor
     ═══════════════════════════════════════════════════════════ */
  const STORY_HEART_SVG =
    '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path fill="#E53935" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>' +
    '</svg>';

  let storyHeartsTimer = null;

  function createStoryHeart() {
    const el = document.createElement('span');
    el.className = 'story__float-heart';
    const size = 16 + Math.random() * 22;
    const duration = 14 + Math.random() * 12;
    el.style.setProperty('--hx', `${2 + Math.random() * 96}%`);
    el.style.setProperty('--hs', `${size.toFixed(0)}px`);
    el.style.setProperty('--hd', `${duration.toFixed(1)}s`);
    el.style.setProperty('--dx', `${(-50 + Math.random() * 100).toFixed(0)}px`);
    el.style.setProperty('--dr', `${(-15 + Math.random() * 30).toFixed(0)}deg`);
    el.innerHTML = STORY_HEART_SVG;
    el.addEventListener('animationend', () => el.remove(), { once: true });
    return el;
  }

  function spawnStoryHeart(layer) {
    if (!layer) return;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const maxActive = isMobile ? 14 : 24;
    if (layer.children.length >= maxActive) return;
    layer.appendChild(createStoryHeart());
  }

  function initStoryFloatingHearts() {
    const layer = document.querySelector('.story__hearts-layer');
    if (!layer || layer.dataset.ready) return;
    layer.dataset.ready = 'true';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const burst = isMobile ? 14 : 28;

    if (reducedMotion) {
      for (let i = 0; i < burst; i += 1) {
        const el = createStoryHeart();
        el.style.animation = 'none';
        el.style.bottom = `${8 + Math.random() * 84}%`;
        el.style.left = `${2 + Math.random() * 96}%`;
        layer.appendChild(el);
      }
      return;
    }

    for (let i = 0; i < burst; i += 1) {
      setTimeout(() => spawnStoryHeart(layer), i * 350);
    }

    storyHeartsTimer = setInterval(() => spawnStoryHeart(layer), isMobile ? 1400 : 900);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(storyHeartsTimer);
      } else if (!storyHeartsTimer) {
        storyHeartsTimer = setInterval(() => spawnStoryHeart(layer), isMobile ? 1400 : 900);
      }
    });
  }

  function initStoryDecor() {
    const story = document.getElementById('story');
    if (!story || !window.gsap) return;

    const decorSelector = '.story__butterfly, .story__branch, .story__wave, .story__lines, .story__particle, .story__corner';

    gsap.utils.toArray(decorSelector).forEach((el, i) => {
      const targetOpacity = parseFloat(getComputedStyle(el).opacity) || 0.12;
      gsap.set(el, { opacity: 0, y: 16 });

      gsap.to(el, {
        opacity: targetOpacity,
        y: 0,
        duration: 2.2,
        delay: i * 0.03,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: story,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    });

    story.querySelectorAll('[data-story-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.storyParallax) || 0.05;
      gsap.to(el, {
        y: speed * 80,
        ease: 'none',
        scrollTrigger: {
          trigger: story,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2,
        },
      });
    });

    story.querySelectorAll('[data-story-drift]').forEach((el, i) => {
      gsap.to(el, {
        x: i % 2 === 0 ? 8 : -8,
        y: 6,
        duration: 10 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    story.querySelectorAll('[data-story-float]').forEach((el, i) => {
      const isHeart = String(el.dataset.storyFloat).startsWith('h');
      gsap.to(el, {
        y: isHeart ? '+=4' : '+=10',
        x: i % 2 === 0 ? '+=5' : '-=5',
        rotation: isHeart ? 3 : 4,
        duration: isHeart ? 6 : 9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.4,
      });
    });

    story.querySelectorAll('.story__particle').forEach((el, i) => {
      gsap.to(el, {
        y: '+=5',
        opacity: '+=0.03',
        duration: 5 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.12,
      });
    });

    gsap.to('.story__quote', {
      y: -16,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2.5,
      },
    });

    gsap.to('.story__bg-fog', {
      y: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 3,
      },
    });
  }

  function initScrollAnimations() {
    if (!window.gsap || !window.ScrollTrigger) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll('[data-reveal="fade"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    document.querySelectorAll('[data-reveal="blur"]').forEach((el) => {
      const isRtl = document.documentElement.dir === 'rtl';
      const fromState = isRtl
        ? { opacity: 0, y: 24 }
        : { opacity: 0, y: 30, filter: 'blur(8px)' };
      const toState = isRtl
        ? { opacity: 1, y: 0, clearProps: 'filter' }
        : { opacity: 1, y: 0, filter: 'blur(0px)' };

      gsap.fromTo(el, fromState, {
        ...toState,
        duration: 1.4,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    });

    document.querySelectorAll('[data-reveal="slide"]').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    document.querySelectorAll('[data-reveal="zoom"]').forEach((el, i) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    document.querySelectorAll('[data-reveal="scale"]').forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.88, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    window.addEventListener('load', () => {
      if (window.ScrollTrigger) ScrollTrigger.refresh();
    }, { once: true });
  }

  /* ═══════════════════════════════════════════════════════════
     LIVE TIME (DAMASCUS) + WEDDING COUNTDOWN (DAYS)
     ═══════════════════════════════════════════════════════════ */
  function pad(num) {
    return toWesternDigits(String(num).padStart(2, '0'));
  }

  function animateCountChange(element, newValue) {
    if (!element || element.textContent === newValue) return;

    element.classList.add('is-flipping');
    element.textContent = newValue;

    setTimeout(() => {
      element.classList.remove('is-flipping');
    }, 400);
  }

  function getDamascusParts(date = new Date()) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone: CONFIG.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).formatToParts(date);

    const read = (type) => Number(parts.find((part) => part.type === type).value);

    return {
      hour: read('hour') % 24,
      minute: read('minute'),
      second: read('second'),
    };
  }

  function updateDaysRemaining() {
    const diff = CONFIG.weddingDate - Date.now();
    const days = diff > 0 ? Math.floor(diff / 86400000) : 0;
    const daysText = formatCountNumber(days);

    if (prevCountdown.days !== String(days)) {
      if (DOM.countDays) {
        DOM.countDays.textContent = daysText;
        DOM.countDays.setAttribute('lang', 'en');
        DOM.countDays.setAttribute('dir', 'ltr');
      }
      prevCountdown.days = String(days);
    }

    return { diff, days };
  }

  function renderLiveClock() {
    const { hour, minute, second } = getDamascusParts();
    const { diff, days } = updateDaysRemaining();

    const hoursText = pad(hour);
    const minutesText = pad(minute);
    const secondsText = pad(second);

    if (prevCountdown.hours !== hoursText) {
      animateCountChange(DOM.countHours, hoursText);
      prevCountdown.hours = hoursText;
    }

    if (prevCountdown.minutes !== minutesText) {
      animateCountChange(DOM.countMinutes, minutesText);
      prevCountdown.minutes = minutesText;
    }

    if (prevCountdown.seconds !== secondsText) {
      if (DOM.countSeconds) DOM.countSeconds.textContent = secondsText;
      prevCountdown.seconds = secondsText;
    }

    if (DOM.countdownTimer) {
      const weddingPart = diff > 0
        ? `${days} days remaining until the wedding`
        : 'Wedding day has arrived';
      DOM.countdownTimer.setAttribute(
        'aria-label',
        `Damascus time ${hoursText} hours ${minutesText} minutes ${secondsText} seconds. ${weddingPart}`
      );
    }
  }

  function initCountdown() {
    renderLiveClock();
    countdownInterval = setInterval(renderLiveClock, 1000);
  }

  /* ═══════════════════════════════════════════════════════════
     MUSIC
     ═══════════════════════════════════════════════════════════ */
  const MUSIC_VOLUME = 0.45;

  function isMusicAudible() {
    return Boolean(
      DOM.bgMusic
      && !DOM.bgMusic.paused
      && !DOM.bgMusic.muted
      && DOM.bgMusic.readyState >= 2
    );
  }

  function playMutedMusic() {
    if (!DOM.bgMusic || !musicShouldPlay) return Promise.resolve();

    DOM.bgMusic.loop = true;
    DOM.bgMusic.volume = MUSIC_VOLUME;
    DOM.bgMusic.muted = true;

    if (!DOM.bgMusic.paused) return Promise.resolve();

    return DOM.bgMusic.play().catch(() => Promise.resolve());
  }

  function enableMusicSound() {
    if (!DOM.bgMusic || !musicShouldPlay || isMusicAudible()) return;

    DOM.bgMusic.loop = true;
    DOM.bgMusic.volume = MUSIC_VOLUME;
    DOM.bgMusic.muted = false;

    const start = () => DOM.bgMusic.play().catch(() => {
      DOM.bgMusic.muted = true;
      return playMutedMusic();
    });

    if (DOM.bgMusic.paused || DOM.bgMusic.ended) {
      start();
      return;
    }

    start();
  }

  function keepMusicAlive() {
    if (!DOM.bgMusic || !musicShouldPlay) return;

    if (DOM.bgMusic.paused || DOM.bgMusic.ended) {
      if (isMusicAudible()) {
        enableMusicSound();
      } else {
        playMutedMusic();
      }
    }
  }

  function initMusic() {
    if (!DOM.bgMusic) return;

    DOM.bgMusic.loop = true;
    DOM.bgMusic.volume = MUSIC_VOLUME;
    DOM.bgMusic.setAttribute('playsinline', '');
    DOM.bgMusic.setAttribute('webkit-playsinline', '');

    playMutedMusic();

    ['canplay', 'canplaythrough', 'loadeddata'].forEach((eventName) => {
      DOM.bgMusic.addEventListener(eventName, () => {
        playMutedMusic();
        enableMusicSound();
      });
    });

    DOM.bgMusic.addEventListener('ended', () => {
      DOM.bgMusic.currentTime = 0;
      enableMusicSound();
    });

    ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown', 'wheel'].forEach((eventName) => {
      document.addEventListener(eventName, enableMusicSound, { passive: true });
    });

    window.addEventListener('scroll', enableMusicSound, { passive: true });
    window.addEventListener('pageshow', enableMusicSound);
    window.addEventListener('focus', () => {
      keepMusicAlive();
      enableMusicSound();
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        keepMusicAlive();
        enableMusicSound();
      }
    });

    window.setInterval(keepMusicAlive, 1500);

    window.setTimeout(enableMusicSound, 400);
    window.setTimeout(enableMusicSound, 1200);

    DOM.bgMusic.addEventListener('error', () => {
      console.warn('Background music file not found. Add assets/music/wedding-music.m4a');
    });
  }

  /* ═══════════════════════════════════════════════════════════
     MOUSE GLOW
     ═══════════════════════════════════════════════════════════ */
  function initMouseGlow() {
    if (!DOM.mouseGlow || window.matchMedia('(hover: none)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let glowX = 0;
    let glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      DOM.mouseGlow.classList.add('is-visible');
    });

    document.addEventListener('mouseleave', () => {
      DOM.mouseGlow.classList.remove('is-visible');
    });

    function animateGlow() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      DOM.mouseGlow.style.left = `${glowX}px`;
      DOM.mouseGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateGlow);
    }

    animateGlow();
  }

  /* ═══════════════════════════════════════════════════════════
     AMBIENT — Site-wide floating decor
     ═══════════════════════════════════════════════════════════ */
  const AMBIENT_SVG = {
    heart: (stroke) =>
      `<svg viewBox="0 0 24 22" fill="none" aria-hidden="true"><path d="M12 20 C12 20 2 13 2 7 C2 3 5 1 8 3 C10 1 14 1 16 3 C19 1 22 3 22 7 C22 13 12 20 12 20Z" stroke="${stroke}" stroke-width="0.5"/></svg>`,
    butterfly: (stroke) =>
      `<svg viewBox="0 0 90 70" fill="none" aria-hidden="true"><path d="M45 35 C30 15 12 18 8 32 C22 35 35 35 45 35 C55 35 68 35 82 32 C78 18 60 15 45 35Z" stroke="${stroke}" stroke-width="0.55"/><path d="M45 35 C30 55 12 52 8 38 C22 35 35 35 45 35Z" stroke="${stroke}" stroke-width="0.55"/><path d="M45 35 C60 55 78 52 82 38 C68 35 55 35 45 35Z" stroke="${stroke}" stroke-width="0.55"/><path d="M45 28 L45 42" stroke="${stroke}" stroke-width="0.4"/><path d="M45 28 L42 22 M45 28 L48 22" stroke="${stroke}" stroke-width="0.35"/></svg>`,
    petal: (stroke) =>
      `<svg viewBox="0 0 16 22" fill="none" aria-hidden="true"><path d="M8 2 C4 6 2 12 8 20 C14 12 12 6 8 2Z" stroke="${stroke}" stroke-width="0.45" fill="${stroke}" fill-opacity="0.08"/></svg>`,
    branch: (stroke) =>
      `<svg viewBox="0 0 120 140" fill="none" aria-hidden="true"><path d="M15 130 Q35 80 25 35 Q45 55 65 18 Q50 75 95 12" stroke="${stroke}" stroke-width="0.5"/><path d="M55 45 Q72 42 82 36 M40 78 Q58 74 68 68" stroke="${stroke}" stroke-width="0.35"/></svg>`,
  };

  function ambientRand(min, max) {
    return min + Math.random() * (max - min);
  }

  function ambientEdgePosition() {
    const zone = Math.random();
    if (zone < 0.28) return { x: ambientRand(2, 13), y: ambientRand(8, 92) };
    if (zone < 0.56) return { x: ambientRand(87, 98), y: ambientRand(8, 92) };
    if (zone < 0.78) return { x: ambientRand(8, 92), y: ambientRand(2, 11) };
    return { x: ambientRand(8, 92), y: ambientRand(89, 98) };
  }

  function createAmbientItem(type, opts = {}) {
    const dark = opts.dark;
    const stroke = dark ? '#E6D7B8' : Math.random() > 0.5 ? '#C8A96A' : '#E6D7B8';
    const pos = type === 'petal' ? { x: ambientRand(6, 94), y: ambientRand(-8, -2) } : ambientEdgePosition();
    const el = document.createElement('span');
    const animClass =
      type === 'petal' ? 'ambient-item--petal' : type === 'branch' ? 'ambient-item--sway' : 'ambient-item--float';
    const sizeClass =
      type === 'heart'
        ? 'ambient-item--heart'
        : type === 'butterfly'
          ? 'ambient-item--butterfly'
          : type === 'petal'
            ? 'ambient-item--petal-shape'
            : type === 'branch'
              ? 'ambient-item--branch'
              : 'ambient-item--dot';

    el.className = `ambient-item ${animClass} ${sizeClass}`;
    el.setAttribute('aria-hidden', 'true');

    const opacity = ambientRand(opts.opacityMin ?? 0.06, opts.opacityMax ?? 0.14);
    const size =
      type === 'heart'
        ? ambientRand(10, 18)
        : type === 'butterfly'
          ? ambientRand(36, 58)
          : type === 'petal'
            ? ambientRand(10, 16)
            : type === 'branch'
              ? ambientRand(70, 110)
              : ambientRand(2, 4);

    el.style.setProperty('--ax', `${pos.x}%`);
    el.style.setProperty('--ay', `${pos.y}%`);
    el.style.setProperty('--ao', opacity.toFixed(3));
    el.style.setProperty('--as', `${size}px`);
    el.style.setProperty('--ad', `${ambientRand(28, 52).toFixed(0)}s`);
    el.style.setProperty('--adel', `${ambientRand(0, 12).toFixed(1)}s`);
    el.style.setProperty('--dx', `${ambientRand(-18, 18).toFixed(0)}px`);
    el.style.setProperty('--dy', `${ambientRand(-22, 14).toFixed(0)}px`);
    el.style.setProperty('--dr', `${ambientRand(-6, 6).toFixed(1)}deg`);

    if (type === 'dot') {
      return el;
    }

    el.innerHTML = AMBIENT_SVG[type](stroke);
    return el;
  }

  function initAmbientCanvas(canvas, dark) {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return null;

    let w = 0;
    let h = 0;
    let raf = null;
    let running = false;
    const particles = [];
    const count = window.matchMedia('(max-width: 768px)').matches ? 10 : 16;
    const colorBase = dark ? '230, 215, 184' : '200, 169, 106';

    function resize() {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function seed() {
      particles.length = 0;
      for (let i = 0; i < count; i += 1) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.2 + 0.4,
          vx: (Math.random() - 0.5) * 0.06,
          vy: (Math.random() - 0.5) * 0.05 - 0.015,
          opacity: Math.random() * 0.12 + 0.04,
          phase: Math.random() * Math.PI * 2,
        });
      }
    }

    function tick() {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.006;
        if (p.x < -4) p.x = w + 4;
        if (p.x > w + 4) p.x = -4;
        if (p.y < -4) p.y = h + 4;
        if (p.y > h + 4) p.y = -4;
        const alpha = p.opacity * (0.65 + 0.35 * Math.sin(p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colorBase}, ${alpha})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      tick();
    }

    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    resize();
    seed();

    const ro = new ResizeObserver(() => {
      resize();
      seed();
    });
    ro.observe(canvas.parentElement);

    return { start, stop, destroy: () => { stop(); ro.disconnect(); } };
  }

  function buildAmbientLayer(container, options = {}) {
    const dark = options.dark || container.classList.contains('section--thanks') || container.classList.contains('footer');
    const density = options.density ?? 1;
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const lowEnd = isMobile || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    const useCanvas = !lowEnd && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const layer = document.createElement('div');
    layer.className = `section-ambient${dark ? ' section-ambient--dark' : ''}`;
    layer.setAttribute('aria-hidden', 'true');

    layer.innerHTML =
      '<div class="section-ambient__glow section-ambient__glow--tl"></div>' +
      '<div class="section-ambient__glow section-ambient__glow--br"></div>';

    const counts = {
      heart: Math.round((isMobile ? 2 : 3) * density),
      butterfly: Math.round((isMobile ? 1 : 2) * density),
      petal: Math.round((isMobile ? 2 : 4) * density),
      branch: lowEnd ? 0 : Math.round(2 * density),
      dot: Math.round((isMobile ? 3 : 5) * density),
    };

    Object.keys(counts).forEach((type) => {
      for (let i = 0; i < counts[type]; i += 1) {
        layer.appendChild(
          createAmbientItem(type, {
            dark,
            opacityMin: dark ? 0.05 : 0.06,
            opacityMax: dark ? 0.11 : 0.13,
          })
        );
      }
    });

    if (useCanvas) {
      const canvas = document.createElement('canvas');
      canvas.className = 'section-ambient__canvas';
      canvas.setAttribute('aria-hidden', 'true');
      layer.appendChild(canvas);
      layer._ambientCanvas = initAmbientCanvas(canvas, dark);
    }

    if (options.afterOverlay) {
      const overlay = container.querySelector('.hero__overlay');
      if (overlay) overlay.after(layer);
      else container.appendChild(layer);
    } else {
      container.prepend(layer);
    }

    requestAnimationFrame(() => {
      layer.querySelectorAll('.ambient-item').forEach((item, i) => {
        setTimeout(() => item.classList.add('is-visible'), 80 + i * 120);
      });
    });

    if (layer._ambientCanvas && 'IntersectionObserver' in window) {
      const controller = layer._ambientCanvas;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) controller.start();
            else controller.stop();
          });
        },
        { threshold: 0.05 }
      );
      io.observe(container);
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) controller.stop();
        else if (container.getBoundingClientRect().bottom > 0 && container.getBoundingClientRect().top < window.innerHeight) {
          controller.start();
        }
      });
    }

    return layer;
  }

  function initAmbientDecor() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    document.querySelectorAll('.section:not(.section--story)').forEach((section) => {
      if (!section.querySelector('.section-ambient')) {
        buildAmbientLayer(section);
      }
    });

    const footer = document.querySelector('.footer');
    if (footer && !footer.querySelector('.section-ambient')) {
      buildAmbientLayer(footer, { dark: true, density: 1 });
    }

    const heroBg = document.querySelector('.hero__bg');
    if (heroBg && !heroBg.querySelector('.section-ambient')) {
      buildAmbientLayer(heroBg, { dark: true, density: 0.55, afterOverlay: true });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     INITIALIZATION
     ═══════════════════════════════════════════════════════════ */
  function initFooterClosing() {
    const footer = document.querySelector('.footer__inner');
    if (!footer || !window.gsap) return;

    gsap.fromTo(
      footer.children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.footer',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }

  function initArabicFont() {
    if (!('FontFace' in window)) return;

    const sources = [
      'assets/fonts/HSN Shahd Regular Regular.ttf',
      'assets/fonts/HSN-Shahd-Regular.ttf',
    ];

    sources.forEach((src) => {
      const font = new FontFace('HSN Shahd', `url("${src}")`);
      font.load()
        .then((loaded) => {
          document.fonts.add(loaded);
          document.documentElement.classList.add('font-shahd-ready');
        })
        .catch(() => {});
    });
  }

  function init() {
    initLanguage();
    initArabicFont();
    initMusic();
    initHeroBokeh();
    initLoader();
    initLenis();
    initScrollAnimations();
    initStoryDecor();
    initStoryFloatingHearts();
    initStoryTimeline();
    initAmbientDecor();
    initCountdown();
    initMouseGlow();
    initFooterStars();
    initFooterClosing();
    initWhatsAppButtons();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
