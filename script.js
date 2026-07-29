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
    weddingDate: new Date('2026-09-04T19:00:00+03:00'),
    defaultLang: 'en',
    loaderDuration: 2800,
  };

  /* ═══════════════════════════════════════════════════════════
     TRANSLATIONS
     ═══════════════════════════════════════════════════════════ */
  const i18n = {
    en: {
      loader: 'Loading your invitation',
      hero_prelude: 'Together with their families',
      hero_subtitle: 'joyfully invite you to celebrate their wedding',
      hero_date_label: 'Wedding Date',
      hero_date: '04 September 2026',
      hero_venue_label: 'Venue',
      hero_venue_name: 'View Restaurant',
      hero_venue_city: 'Tartous, Syria',
      scroll_down: 'Scroll',
      story_eyebrow: 'Our Story',
      story_lead: 'Every love story is beautiful, but ours is our favorite.',
      story_body: 'What began with a simple hello became a journey filled with love, laughter and unforgettable memories.',
      story_closing: 'Today we invite you to celebrate the beginning of our forever.',
      countdown_eyebrow: 'Countdown',
      countdown_title: 'Until We Say I Do',
      countdown_days: 'Days',
      countdown_hours: 'Hours',
      countdown_minutes: 'Minutes',
      countdown_seconds: 'Seconds',
      details_eyebrow: 'The Celebration',
      details_title: 'Wedding Details',
      detail_date_title: 'Date',
      detail_date_value: '04 September 2026',
      detail_time_title: 'Time',
      detail_time_value: '7:00 PM',
      detail_venue_title: 'Venue',
      detail_venue_value: 'View Restaurant<br>Tartous, Syria',
      venue_eyebrow: 'Location',
      venue_title: 'Find Us',
      venue_maps_btn: 'Open in Google Maps',
      thanks_title: 'Thank You',
      thanks_body: 'Your presence is the greatest gift we could ask for.',
      thanks_closing: 'See you on our special day.',
      footer_tagline: 'Made with Love',
    },
    ar: {
      loader: 'جاري تحميل دعوتكم',
      hero_prelude: 'مع ذويهما الكرام',
      hero_subtitle: 'يسعدهم دعوتكم للاحتفال بزفافهما',
      hero_date_label: 'تاريخ الزفاف',
      hero_date: '04 سبتمبر 2026',
      hero_venue_label: 'المكان',
      hero_venue_name: 'مطعم View',
      hero_venue_city: 'طرطوس، سوريا',
      scroll_down: 'تمرير',
      story_eyebrow: 'قصتنا',
      story_lead: 'كل قصة حب جميلة، لكن قصتنا هي الأجمل.',
      story_body: 'ما بدأ بـ"مرحباً" بسيط تحوّل إلى رحلة مليئة بالحب والضحك وذكريات لا تُنسى.',
      story_closing: 'اليوم ندعوكم للاحتفال ببداية أبديتنا معاً.',
      countdown_eyebrow: 'العد التنازلي',
      countdown_title: 'حتى نقول نعم',
      countdown_days: 'أيام',
      countdown_hours: 'ساعات',
      countdown_minutes: 'دقائق',
      countdown_seconds: 'ثوانٍ',
      details_eyebrow: 'الاحتفال',
      details_title: 'تفاصيل الزفاف',
      detail_date_title: 'التاريخ',
      detail_date_value: '04 سبتمبر 2026',
      detail_time_title: 'الوقت',
      detail_time_value: '7:00 مساءً',
      detail_venue_title: 'المكان',
      detail_venue_value: 'مطعم View<br>طرطوس، سوريا',
      venue_eyebrow: 'الموقع',
      venue_title: 'موقعنا',
      venue_maps_btn: 'فتح في خرائط Google',
      thanks_title: 'شكراً لكم',
      thanks_body: 'حضوركم أجمل هدية يمكننا تلقيها.',
      thanks_closing: 'نراكم في يومنا المميز.',
      footer_tagline: 'صُنع بحب',
    },
  };

  /* ═══════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════ */
  let currentLang = CONFIG.defaultLang;
  let lenis = null;
  let musicStarted = false;

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
  };

  let countdownInterval = null;
  let prevCountdown = { days: '', hours: '', minutes: '', seconds: '' };

  /* ═══════════════════════════════════════════════════════════
     LANGUAGE SYSTEM
     ═══════════════════════════════════════════════════════════ */
  function setLanguage(lang) {
    if (!i18n[lang]) return;
    currentLang = lang;

    DOM.html.lang = lang;
    DOM.html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (i18n[lang][key]) {
        el.innerHTML = i18n[lang][key];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (i18n[lang][key]) {
        el.placeholder = i18n[lang][key];
      }
    });

    DOM.langBtns.forEach((btn) => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', isActive);
    });

    localStorage.setItem('wedding-lang', lang);
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
  function initLoader() {
    DOM.body.classList.add('is-loading');

    gsap.to(DOM.loaderFill, {
      width: '100%',
      duration: CONFIG.loaderDuration / 1000,
      ease: 'power2.inOut',
    });

    gsap.fromTo('.loader__monogram',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' }
    );

    setTimeout(() => {
      gsap.to(DOM.loader, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.inOut',
        onComplete: () => {
          DOM.loader.classList.add('is-hidden');
          DOM.body.classList.remove('is-loading');
          initHeroAnimation();
          tryAutoPlayMusic();
        },
      });
    }, CONFIG.loaderDuration);
  }

  /* ═══════════════════════════════════════════════════════════
     LENIS SMOOTH SCROLL
     ═══════════════════════════════════════════════════════════ */
  function initLenis() {
    lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenis.on('scroll', ({ scroll, progress }) => {
      if (DOM.progressBar) {
        DOM.progressBar.style.width = `${progress * 100}%`;
      }

      const heroHeight = DOM.hero ? DOM.hero.offsetHeight : 0;
      DOM.body.classList.toggle('scrolled-past-hero', scroll > heroHeight * 0.5);
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target && lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.8 });
        }
      });
    });
  }

  /* ═══════════════════════════════════════════════════════════
     GSAP ANIMATIONS
     ═══════════════════════════════════════════════════════════ */
  function initHeroAnimation() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero__prelude', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo('.hero__name--groom', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
      .fromTo('.hero__amp', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8 }, '-=0.8')
      .fromTo('.hero__name--bride', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.2 }, '-=0.6')
      .fromTo('.hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.5')
      .fromTo('.hero__bottom', { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }, '-=0.4');

    if (DOM.heroImage) {
      gsap.to(DOM.heroImage, {
        scale: 1,
        duration: 2.5,
        ease: 'power2.out',
      });

      gsap.to(DOM.heroImage, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: DOM.hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }

  /* ═══════════════════════════════════════════════════════════
     STORY — Parallax & floating decor
     ═══════════════════════════════════════════════════════════ */
  function initStoryDecor() {
    const story = document.getElementById('story');
    if (!story || !window.gsap) return;

    gsap.utils.toArray('.story__butterfly, .story__heart, .story__branch, .story__wave, .story__lines, .story__particle').forEach((el, i) => {
      gsap.from(el, {
        y: 20,
        duration: 2,
        delay: i * 0.04,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: story,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
    });

    story.querySelectorAll('[data-story-parallax]').forEach((el) => {
      const speed = parseFloat(el.dataset.storyParallax) || 0.05;
      gsap.to(el, {
        y: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: story,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    });

    story.querySelectorAll('[data-story-float]').forEach((el, i) => {
      const isHeart = String(el.dataset.storyFloat).startsWith('h');
      gsap.to(el, {
        y: isHeart ? '+=5' : '+=12',
        x: i % 2 === 0 ? '+=6' : '-=6',
        rotation: isHeart ? 2 : 5,
        duration: isHeart ? 5.5 : 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.35,
      });
    });

    story.querySelectorAll('.story__particle').forEach((el, i) => {
      gsap.to(el, {
        y: '+=6',
        duration: 4 + i * 0.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.15,
      });
    });

    gsap.to('.story__content--frame', {
      y: -16,
      ease: 'none',
      scrollTrigger: {
        trigger: story,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      },
    });
  }

  function initScrollAnimations() {
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
      gsap.fromTo(
        el,
        { opacity: 0, y: 30, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
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
  }

  /* ═══════════════════════════════════════════════════════════
     COUNTDOWN
     ═══════════════════════════════════════════════════════════ */
  function pad(num) {
    return String(num).padStart(2, '0');
  }

  function animateCountChange(element, newValue) {
    if (!element || element.textContent === newValue) return;

    element.classList.add('is-flipping');
    element.textContent = newValue;

    setTimeout(() => {
      element.classList.remove('is-flipping');
    }, 400);
  }

  function updateCountdown() {
    const now = new Date();
    const diff = CONFIG.weddingDate - now;

    if (diff <= 0) {
      ['Days', 'Hours', 'Minutes', 'Seconds'].forEach((unit) => {
        const el = DOM[`count${unit}`];
        if (el) el.textContent = '00';
      });
      clearInterval(countdownInterval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const values = {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    };

    Object.entries(values).forEach(([key, val]) => {
      if (prevCountdown[key] !== val) {
        const el = DOM[`count${key.charAt(0).toUpperCase() + key.slice(1)}`];
        animateCountChange(el, val);
        prevCountdown[key] = val;
      }
    });
  }

  function initCountdown() {
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
  }

  /* ═══════════════════════════════════════════════════════════
     MUSIC — Auto-play, no UI controls
     ═══════════════════════════════════════════════════════════ */
  function tryAutoPlayMusic() {
    if (musicStarted || !DOM.bgMusic) return;

    DOM.bgMusic.volume = 0.45;

    DOM.bgMusic.play()
      .then(() => {
        musicStarted = true;
      })
      .catch(() => {
        /* Browser requires user gesture — retried on interaction */
      });
  }

  function initMusic() {
    if (!DOM.bgMusic) return;

    DOM.bgMusic.volume = 0.45;

    /* Attempt immediately when file is ready */
    DOM.bgMusic.addEventListener('canplaythrough', tryAutoPlayMusic, { once: true });

    /* Retry on any natural user interaction */
    ['click', 'touchstart', 'keydown', 'pointerdown', 'wheel'].forEach((eventName) => {
      document.addEventListener(eventName, tryAutoPlayMusic, { passive: true });
    });

    if (lenis) {
      lenis.on('scroll', tryAutoPlayMusic);
    } else {
      window.addEventListener('scroll', tryAutoPlayMusic, { passive: true });
    }

    /* First attempt after brief delay */
    setTimeout(tryAutoPlayMusic, 500);
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
     INITIALIZATION
     ═══════════════════════════════════════════════════════════ */
  function init() {
    initLanguage();
    initLoader();
    initLenis();
    initScrollAnimations();
    initStoryDecor();
    initCountdown();
    initMouseGlow();
    initMusic();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
