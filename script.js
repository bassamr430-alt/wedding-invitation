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
    loaderDuration: 550,
    timeZone: 'Asia/Damascus',
  };

  /* ═══════════════════════════════════════════════════════════
     STATE
     ═══════════════════════════════════════════════════════════ */
  let lenis = null;
  let musicShouldPlay = true;
  let musicIsAudible = false;

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
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.55, delay: 0.05, ease: 'power3.out' }
    );

    setTimeout(() => {
      gsap.to(DOM.loader, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.inOut',
        onComplete: () => {
          DOM.loader.classList.add('is-hidden');
          DOM.body.classList.remove('is-loading');
          initHeroAnimation();
          bootstrapMusic();
          unmuteMusic();
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
      unmuteMusic();

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
  function initHeroSplitText() {
    document.querySelectorAll('[data-split]').forEach((el) => {
      const text = el.textContent.trim();
      el.textContent = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'hero__char';
        span.textContent = char;
        el.appendChild(span);
      });
    });
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

    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
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

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.hero__overlay', { opacity: 0 }, { opacity: 1, duration: 1.8 })
      .fromTo('.hero__vignette', { opacity: 0 }, { opacity: 1, duration: 2 }, '-=1.4')
      .fromTo('.hero__lens-flare', { opacity: 0 }, { opacity: 0.7, duration: 2.5 }, '-=1.8')
      .fromTo('.hero__prelude', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 1 }, '-=1')
      .to('.hero__name--groom .hero__char', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
      }, '-=0.6')
      .fromTo('.hero__amp', { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.9 }, '-=0.5')
      .to('.hero__name--bride .hero__char', {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.out',
      }, '-=0.5')
      .fromTo('.hero__subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .fromTo('.hero__meta-card', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, stagger: 0.12 }, '-=0.5')
      .fromTo('.scroll-indicator', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.4');

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
  }

  /* ═══════════════════════════════════════════════════════════
     LIVE TIME (DAMASCUS) + WEDDING COUNTDOWN (DAYS)
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
    const daysText = String(days);

    if (prevCountdown.days !== daysText) {
      animateCountChange(DOM.countDays, daysText);
      prevCountdown.days = daysText;
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
     MUSIC — Instant muted boot + auto unmute + loop
     ═══════════════════════════════════════════════════════════ */
  const MUSIC_VOLUME = 0.45;

  function bootstrapMusic() {
    if (!DOM.bgMusic || !musicShouldPlay) return Promise.resolve(false);

    DOM.bgMusic.loop = true;
    DOM.bgMusic.volume = MUSIC_VOLUME;

    if (!DOM.bgMusic.paused && !DOM.bgMusic.ended) {
      return Promise.resolve(true);
    }

    DOM.bgMusic.muted = true;

    return DOM.bgMusic.play()
      .then(() => true)
      .catch(() => {
        if (typeof window.__weddingBootMusic === 'function') {
          window.__weddingBootMusic();
        }
        return false;
      });
  }

  function unmuteMusic() {
    if (!DOM.bgMusic || !musicShouldPlay || musicIsAudible) return;

    const applyUnmute = () => {
      DOM.bgMusic.muted = false;
      DOM.bgMusic.volume = MUSIC_VOLUME;
      musicIsAudible = true;
    };

    if (!DOM.bgMusic.paused) {
      applyUnmute();
      return;
    }

    DOM.bgMusic.muted = false;
    DOM.bgMusic.volume = MUSIC_VOLUME;

    DOM.bgMusic.play()
      .then(() => {
        musicIsAudible = true;
      })
      .catch(() => {
        DOM.bgMusic.muted = true;
        bootstrapMusic();
      });
  }

  function keepMusicAlive() {
    if (!DOM.bgMusic || !musicShouldPlay) return;

    if (DOM.bgMusic.paused || DOM.bgMusic.ended) {
      bootstrapMusic().then(() => {
        if (musicIsAudible) unmuteMusic();
      });
    }
  }

  function initMusic() {
    if (!DOM.bgMusic) return;

    DOM.bgMusic.loop = true;
    DOM.bgMusic.volume = MUSIC_VOLUME;
    DOM.bgMusic.setAttribute('playsinline', '');
    DOM.bgMusic.setAttribute('webkit-playsinline', '');

    bootstrapMusic();

    ['canplay', 'canplaythrough', 'loadeddata'].forEach((eventName) => {
      DOM.bgMusic.addEventListener(eventName, () => {
        bootstrapMusic().then(() => unmuteMusic());
      });
    });

    DOM.bgMusic.addEventListener('ended', () => {
      DOM.bgMusic.currentTime = 0;
      bootstrapMusic().then(() => {
        if (musicIsAudible) unmuteMusic();
      });
    });

    ['touchstart', 'touchend', 'click', 'pointerdown', 'keydown', 'wheel'].forEach((eventName) => {
      document.addEventListener(eventName, unmuteMusic, { passive: true, once: true });
    });

    window.addEventListener('pageshow', () => {
      bootstrapMusic().then(() => unmuteMusic());
    });

    window.addEventListener('focus', () => {
      keepMusicAlive();
      unmuteMusic();
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        keepMusicAlive();
        unmuteMusic();
      }
    });

    window.setInterval(keepMusicAlive, 2000);

    window.setTimeout(unmuteMusic, 300);
    window.setTimeout(unmuteMusic, 800);

    DOM.bgMusic.addEventListener('error', () => {
      console.warn('Background music failed to load.');
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

  function init() {
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
