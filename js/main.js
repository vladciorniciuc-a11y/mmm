/**
 * ==============================================================================
 * AUTOVIBE LUXURY LANDING PAGE (LP) - INTERACTION ENGINE
 * Model: Lamborghini Huracán Sterrato (1 of 1499)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initPerspectiveSwitcher();
  initShowcaseHotspots();
  initColorSwatches();
  initLightbox();
  initModals();
  initLeasingCalculator();
  initWhatsAppLead();
  initScrollspyAndDock();
  initScrollProgress();
  initDynamicStickyNavbar();
  initMobileNavSidebar();
  initEngineSoundSimulator();
  initTelemetryCounters();
  initHeroVideoControls();
});

/* ==============================================================================
   1. PERSPECTIVE / STUDIO PHOTO SWITCHER
   ============================================================================== */
const CAR_PHOTOS = [
  {
    src: 'images/photo_1.jpg',
    label: 'Față 3/4 · Alee Showroom Privat Piatra Neamț',
    badge: 'PERSPECTIVĂ PRINCIPALĂ'
  },
  {
    src: 'images/photo_2.jpg',
    label: 'Profil Tehnic All-Terrain · Gardă Înălțată +44mm & Snorkel',
    badge: 'PROFIL ALL-TERRAIN'
  },
  {
    src: 'images/photo_3.jpg',
    label: 'Bloc Optic Full LED · Y-Shape DRL Impecabil',
    badge: 'DETALIU OPTIC'
  },
  {
    src: 'images/photo_4.jpg',
    label: 'Jante 19" Morus Forjate · Frâne Carbon-Ceramice (CCB)',
    badge: 'JANTĂ & ETRIERE'
  },
  {
    src: 'images/photo_5.jpg',
    label: 'Volan Alcantara · Selector ANIMA cu Mod Exclusiv RALLY',
    badge: 'COCKPIT PILOT'
  },
  {
    src: 'images/photo_6.jpg',
    label: 'Interior Bicolor Nero Ade / Arancio Leonis & Consolă HMI',
    badge: 'HABITACLU COMPLET'
  },
  {
    src: 'images/photo_7.jpg',
    label: 'Tetieră Piele Nappa · Sigla Taurului Brodată Portocaliu',
    badge: 'MANUFACTURĂ LUX'
  },
  {
    src: 'images/photo_8_rear.jpg',
    label: 'Vedere Posterioară · Difuzor Ranforsat & Evacuări Duble Raliu',
    badge: 'UNGHI POSTERIOR'
  },
  {
    src: 'images/photo_9_plaque.jpg',
    label: 'Plăcuță Mecanică Originală · Ordine Aprindere Motor V10',
    badge: 'ADN COLECȚIE'
  }
];

let currentPhotoIndex = 1; // Default to side profile photo_2.jpg for interactive hotspots

function switchToPhoto(index) {
  const mainImg = document.getElementById('studioMainImage');
  const captionText = document.getElementById('studioCaptionText');
  const stageBadge = document.getElementById('studioBadge');
  const camButtons = document.querySelectorAll('.cam-btn');
  const hotspotsLayer = document.getElementById('hotspotsLayer');
  const floatingCallout = document.getElementById('stageFloatingCallout');

  if (!mainImg || !CAR_PHOTOS[index]) return;
  currentPhotoIndex = index;
  const data = CAR_PHOTOS[index];

  // Fade transition
  mainImg.style.opacity = '0';
  mainImg.style.transform = 'scale(0.98)';

  setTimeout(() => {
    mainImg.src = data.src;
    if (captionText) captionText.textContent = data.label;
    if (stageBadge) stageBadge.textContent = data.badge;

    mainImg.style.opacity = '1';
    mainImg.style.transform = 'scale(1)';

    // Show hotspots and callout only when side profile (index 1) is shown
    const isSideProfile = (index === 1);
    if (hotspotsLayer) {
      hotspotsLayer.style.opacity = isSideProfile ? '1' : '0';
      hotspotsLayer.style.pointerEvents = isSideProfile ? 'auto' : 'none';
      hotspotsLayer.style.transition = 'opacity 0.25s ease';
    }
    if (floatingCallout) {
      floatingCallout.style.opacity = isSideProfile ? '1' : '0';
      floatingCallout.style.transition = 'opacity 0.25s ease';
    }
  }, 200);

  // Toggle active button
  camButtons.forEach((b, i) => {
    if (i === index) b.classList.add('active');
    else b.classList.remove('active');
  });
}

function initPerspectiveSwitcher() {
  const mainImg = document.getElementById('studioMainImage');
  const camButtons = document.querySelectorAll('.cam-btn');

  if (!mainImg) return;

  camButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      if (index === currentPhotoIndex) return;
      switchToPhoto(index);
    });
  });
}

/* ==============================================================================
   1B. SHOWCASE INTERACTIVE HOTSPOTS & LIVE COMPONENT INSPECTOR
   ============================================================================== */
const HOTSPOT_DATA = {
  snorkel: {
    badge: 'AERODINAMICĂ & ADN RALIU',
    title: 'Snorkel Plafon & Admisie Forțată',
    desc: 'Admisia ridicată pe pavilion captează exclusiv aer curat, fără particule de praf sau criblură de pe drumuri neasfaltate. Asigură longevitatea absolută a motorului V10 și un timbru acustic visceral direct deasupra habitaclului.',
    calloutDesc: 'Captează aer curat deasupra mașinii pe drumuri de macadam, protejând admisia motorului V10 și oferind un sunet spectaculos în habitaclu.'
  },
  lights: {
    badge: 'ILUMINARE & TRASEU NOCTURN',
    title: 'Proiectoare Raliu LED & Scut Față',
    desc: 'Două proiectoare LED de mare intensitate montate pe capotă, omologate rutier, inspirate din bolizii de raliu. Scut frontal masiv din aluminiu ranforsat cu unghi de atac de 19.5 grade.',
    calloutDesc: 'Iluminare de mare distanță pentru macadam și scut de protecție din aluminiu cu unghi de atac de 19.5°.'
  },
  brakes: {
    badge: 'FRÂNARE & ȘASIU ULTRA-UȘOR',
    title: 'Jante 19" Morus & Frâne CCB',
    desc: 'Discuri carbon-ceramice (380 mm față / 356 mm spate) cu etriere monobloc vopsite negru lucios, rezistente la temperaturi extreme și fading pe macadam. Jante forjate Morus ușurate de 19 inch.',
    calloutDesc: 'Discuri carbon-ceramice 380mm și jante forjate Morus rezistente la vibrații pe macadam.'
  },
  clearance: {
    badge: 'GEOMETRIE ALL-TERRAIN',
    title: 'Gardă la Sol +44 mm & Scut Aluminiu',
    desc: 'Suspensie magnetoreologică înălțată cu 44 mm (gardă totală 171 mm), praguri ranforsate și protecții inferioare din duraluminiu de 2.5 mm pentru caroserie pe orice denivelare.',
    calloutDesc: 'Gardă la sol mărită la 171 mm, ecartamente lărgite și scuturi din duraluminiu de 2.5 mm.'
  },
  exhaust: {
    badge: 'PERFORMANȚĂ & EVACUARE V10',
    title: 'Difuzor Ranforsat & Evacuare Ridicată',
    desc: 'Tobe finale duble repoziționate la înălțime mare pentru a preveni coliziunea cu denivelările la unghiuri de degajare abrupte (24.0 grade). Difuzor posterior cu aripioare optimizate pentru flux de aer murdar.',
    calloutDesc: 'Evacuare dublă repoziționată la înălțime mare și difuzor ranforsat cu unghi de degajare de 24°.'
  }
};

let activePinKey = 'snorkel';

function selectHotspot(pinKey) {
  const data = HOTSPOT_DATA[pinKey];
  if (!data) return;
  activePinKey = pinKey;

  // Ensure side profile is active so hotspots match the silhouette
  if (currentPhotoIndex !== 1) {
    switchToPhoto(1);
  }

  // Update pin active state
  const hotspots = document.querySelectorAll('.car-hotspot');
  hotspots.forEach(pin => {
    if (pin.getAttribute('data-pin') === pinKey) {
      pin.classList.add('active');
    } else {
      pin.classList.remove('active');
    }
  });

  // Update floating callout on stage
  const sfcBadge = document.getElementById('sfcBadge');
  const sfcTitle = document.getElementById('sfcTitle');
  const sfcDesc = document.getElementById('sfcDesc');
  if (sfcBadge) sfcBadge.textContent = data.badge;
  if (sfcTitle) sfcTitle.textContent = data.title;
  if (sfcDesc) sfcDesc.textContent = data.calloutDesc;

  // Update Live Inspector in sidebar
  const inspectorBadge = document.getElementById('inspectorBadge');
  const inspectorTitle = document.getElementById('inspectorTitle');
  const inspectorDesc = document.getElementById('inspectorDesc');
  const inspectorBox = document.getElementById('inspectorLiveBox');

  if (inspectorBadge) inspectorBadge.textContent = data.badge;
  if (inspectorTitle) inspectorTitle.textContent = data.title;
  if (inspectorDesc) inspectorDesc.textContent = data.desc;

  if (inspectorBox) {
    inspectorBox.classList.add('flash');
    setTimeout(() => inspectorBox.classList.remove('flash'), 450);
  }
}

function initShowcaseHotspots() {
  const hotspots = document.querySelectorAll('.car-hotspot');
  const catPills = document.querySelectorAll('.cat-pill');
  const btnInspectorAsk = document.getElementById('btnInspectorAsk');
  const conciergeInput = document.getElementById('conciergeMessage');

  hotspots.forEach(pin => {
    pin.addEventListener('click', () => {
      const pinKey = pin.getAttribute('data-pin');
      selectHotspot(pinKey);

      // Sync category pills
      catPills.forEach(cp => {
        if (cp.getAttribute('data-cat') === pinKey) {
          cp.classList.add('active');
        } else {
          cp.classList.remove('active');
        }
      });
    });
  });

  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(cp => cp.classList.remove('active'));
      pill.classList.add('active');
      const cat = pill.getAttribute('data-cat');
      if (cat === 'all') {
        selectHotspot('snorkel');
      } else if (HOTSPOT_DATA[cat]) {
        selectHotspot(cat);
      }
    });
  });

  if (btnInspectorAsk && conciergeInput) {
    btnInspectorAsk.addEventListener('click', () => {
      const data = HOTSPOT_DATA[activePinKey];
      if (!data) return;
      const questionTag = `[Întrebare despre: ${data.title}]: `;
      if (!conciergeInput.value.includes(data.title)) {
        conciergeInput.value = (conciergeInput.value ? conciergeInput.value + '\n' : '') + questionTag;
      }
      conciergeInput.focus();
      conciergeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

/* ==============================================================================
   1C. COLOR SWATCHES SELECTOR
   ============================================================================== */
function initColorSwatches() {
  const swatches = document.querySelectorAll('.color-swatch-btn');
  const captionText = document.getElementById('studioCaptionText');

  swatches.forEach(btn => {
    btn.addEventListener('click', () => {
      swatches.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const colorName = btn.getAttribute('data-color');
      if (captionText) {
        const originalText = captionText.textContent;
        captionText.textContent = `Nuanță selectată: ${colorName} · Exemplarul prezentat este finisat Arancio Xanto`;
        setTimeout(() => {
          if (captionText && captionText.textContent.includes(colorName)) {
            captionText.textContent = originalText;
          }
        }, 3500);
      }
    });
  });
}

/* ==============================================================================
   2. LIGHTBOX DIALOG FULLSCREEN
   ============================================================================== */
function initLightbox() {
  const dialog = document.getElementById('lightboxDialog');
  const openBtn = document.getElementById('openFullscreenBtn');
  const closeBtn = document.getElementById('closeLightboxBtn');
  const lightboxImg = document.getElementById('lightboxImg');

  if (!dialog || !openBtn) return;

  openBtn.addEventListener('click', () => {
    const activePhoto = CAR_PHOTOS[currentPhotoIndex];
    if (lightboxImg) lightboxImg.src = activePhoto.src;
    dialog.showModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}

/* ==============================================================================
   3. MODAL HANDLERS (Leasing, Test Drive, VIN)
   ============================================================================== */
function initModals() {
  const modalOverlays = document.querySelectorAll('.lp-modal-overlay');
  const closeButtons = document.querySelectorAll('.modal-close-btn');

  // Trigger buttons
  const btnTestDrive = document.getElementById('btnActionTestDrive');
  const btnHeroPrivate = document.getElementById('btnHeroPrivateView');
  const btnVIN = document.getElementById('btnActionVIN');
  const btnLeasing = document.getElementById('btnActionLeasing');

  if (btnTestDrive) {
    btnTestDrive.addEventListener('click', () => openModal('modalTestDrive'));
  }
  if (btnHeroPrivate) {
    btnHeroPrivate.addEventListener('click', () => openModal('modalTestDrive'));
  }
  if (btnVIN) {
    btnVIN.addEventListener('click', () => openModal('modalVIN'));
  }
  if (btnLeasing) {
    btnLeasing.addEventListener('click', () => openModal('modalLeasing'));
  }

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.lp-modal-overlay');
      if (modal) modal.classList.remove('active');
    });
  });

  modalOverlays.forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modalOverlays.forEach(m => m.classList.remove('active'));
    }
  });
}

function openModal(modalId) {
  const target = document.getElementById(modalId);
  if (target) {
    target.classList.add('active');
  }
}

/* ==============================================================================
   4. DYNAMIC LEASING CALCULATOR
   ============================================================================== */
const CAR_TOTAL_PRICE = 268888; // EUR TVA inclus

function initLeasingCalculator() {
  const downPaymentSlider = document.getElementById('calcDownPayment');
  const periodSlider = document.getElementById('calcPeriod');
  const downPaymentDisplay = document.getElementById('calcDownPaymentDisplay');
  const downPaymentAmount = document.getElementById('calcDownPaymentAmount');
  const periodDisplay = document.getElementById('calcPeriodDisplay');
  const monthlyResult = document.getElementById('calcMonthlyResult');
  const btnWhatsAppLeasing = document.getElementById('btnWhatsAppLeasing');

  if (!downPaymentSlider || !periodSlider) return;

  function calculate() {
    const downPercent = parseInt(downPaymentSlider.value, 10);
    const months = parseInt(periodSlider.value, 10);

    const downEur = Math.round((CAR_TOTAL_PRICE * downPercent) / 100);
    const principal = CAR_TOTAL_PRICE - downEur;

    // Financial leasing formula with ~5.5% annual interest
    const annualInterest = 0.055;
    const monthlyRate = annualInterest / 12;
    const monthlyPayment = Math.round(
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );

    if (downPaymentDisplay) downPaymentDisplay.textContent = `${downPercent}%`;
    if (downPaymentAmount) downPaymentAmount.textContent = `${downEur.toLocaleString('ro-RO')} €`;
    if (periodDisplay) periodDisplay.textContent = `${months} luni`;
    if (monthlyResult) monthlyResult.textContent = `${monthlyPayment.toLocaleString('ro-RO')} € / lună`;

    if (btnWhatsAppLeasing) {
      const text = `Bună ziua! Mă interesează o simulare de leasing pentru Lamborghini Sterrato (268.888 € cu TVA): Avans ${downPercent}% (${downEur} €), pe o perioadă de ${months} luni (estimat ${monthlyPayment} €/lună). Vă rog să mă contactați.`;
      btnWhatsAppLeasing.href = `https://wa.me/40744000000?text=${encodeURIComponent(text)}`;
    }
  }

  downPaymentSlider.addEventListener('input', calculate);
  periodSlider.addEventListener('input', calculate);
  calculate();
}

/* ==============================================================================
   5. WHATSAPP DIRECT LEAD DISPATCHER
   ============================================================================== */
function initWhatsAppLead() {
  const inputMsg = document.getElementById('conciergeMessage');
  const btnSend = document.getElementById('btnSendConcierge');

  if (!btnSend) return;

  btnSend.addEventListener('click', (e) => {
    e.preventDefault();
    const customMsg = inputMsg ? inputMsg.value.trim() : '';
    const baseText = customMsg || 'Bună ziua, sunt interesat de exemplarul Lamborghini Huracán Sterrato (268.888 € cu TVA) din Piatra Neamț. Doresc să stabilim o vizionare privată.';
    const waUrl = `https://wa.me/40744000000?text=${encodeURIComponent(baseText)}`;
    window.open(waUrl, '_blank');
  });
}

/* ==============================================================================
   6. SCROLLSPY & LEFT DOCK NAVIGATION
   ============================================================================== */
function initScrollspyAndDock() {
  const sections = document.querySelectorAll('section[id]');
  const dockItems = document.querySelectorAll('.dock-item');
  const navLinks = document.querySelectorAll('.lp-nav-link');
  const mobileLinks = document.querySelectorAll('.mnp-nav-link');

  if (!sections.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (!currentId) return;

    dockItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === `#${currentId}`) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    mobileLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
}

/* ==============================================================================
   7. SCROLL-TO-TOP & CONCENTRIC PROGRESS RING
   ============================================================================== */
function initScrollProgress() {
  const scrollBtn = document.getElementById('scrollTopBtn');
  const progressCircle = document.getElementById('scrollProgressCircle');

  if (!scrollBtn || !progressCircle) return;

  const totalLength = 125.66; // 2 * PI * r (r=20 pe viewBox 44x44)

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);

    const offset = totalLength - (progress * totalLength);
    progressCircle.style.strokeDashoffset = offset;

    if (scrollTop > 350) {
      scrollBtn.classList.add('visible');
    } else {
      scrollBtn.classList.remove('visible');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==============================================================================
   7B. MOBILE OFF-CANVAS QUICK NAVIGATION SIDEBAR DRAWER
   ============================================================================== */
function initMobileNavSidebar() {
  const drawer = document.getElementById('mobileNavDrawer');
  const toggleBtn = document.getElementById('mobileNavToggleBtn');
  const closeBtn = document.getElementById('closeMobileNavBtn');
  const backdrop = document.getElementById('mobileNavBackdrop');
  const links = document.querySelectorAll('.mnp-nav-link');

  if (!drawer || !toggleBtn) return;

  function openDrawer() {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
    });
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeDrawer);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        closeDrawer();
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 180);
        }
      }
    });
  });
}

/* ==============================================================================
   8. WEB AUDIO V10 ENGINE SOUND SIMULATOR
   ============================================================================== */
function initEngineSoundSimulator() {
  const audioTrigger = document.getElementById('btnPlayEngineSound');
  if (!audioTrigger) return;

  let audioCtx = null;
  let isPlaying = false;

  audioTrigger.addEventListener('click', () => {
    if (isPlaying) return;

    try {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      isPlaying = true;
      audioTrigger.classList.add('playing');
      const label = audioTrigger.querySelector('.audio-btn-label');
      if (label) label.textContent = 'Accelerează V10 8.000 RPM...';

      // Synthesize realistic dual V10 natural rev
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';

      const now = audioCtx.currentTime;

      // Start at idle 120Hz (720 RPM) -> Peak 666Hz (8000 RPM)
      osc1.frequency.setValueAtTime(110, now);
      osc1.frequency.exponentialRampToValueAtTime(640, now + 1.2);
      osc1.frequency.exponentialRampToValueAtTime(780, now + 2.0);
      osc1.frequency.exponentialRampToValueAtTime(140, now + 3.2);

      osc2.frequency.setValueAtTime(55, now);
      osc2.frequency.exponentialRampToValueAtTime(320, now + 1.2);
      osc2.frequency.exponentialRampToValueAtTime(390, now + 2.0);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 3.2);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
      gain.gain.linearRampToValueAtTime(0.35, now + 2.0);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 3.4);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 3.4);
      osc2.stop(now + 3.4);

      setTimeout(() => {
        isPlaying = false;
        audioTrigger.classList.remove('playing');
        if (label) label.textContent = 'Ascultă Sunetul Evacuării V10 (8.000 RPM)';
      }, 3500);

    } catch (e) {
      console.log('Web Audio API not supported or blocked:', e);
      isPlaying = false;
    }
  });
}

/* ==============================================================================
   9. RIMAC STYLE TELEMETRY COUNTERS
   ============================================================================== */
function initTelemetryCounters() {
  const telemetrySection = document.getElementById('telemetrie');
  if (!telemetrySection) return;

  const countElements = document.querySelectorAll('[data-count]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        countElements.forEach(el => {
          const target = parseFloat(el.getAttribute('data-count'));
          const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
          const duration = 1800; // ms
          const startTime = performance.now();

          function updateCount(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = (target * ease).toFixed(decimals);

            el.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = target.toFixed(decimals);
            }
          }

          requestAnimationFrame(updateCount);
        });
      }
    });
  }, { threshold: 0.3 });

  observer.observe(telemetrySection);
}

/* ==============================================================================
   10. HERO CINEMATIC VIDEO CONTROLS
   ============================================================================== */
function initHeroVideoControls() {
  const video = document.getElementById('heroBgVideo');
  const btnToggle = document.getElementById('btnToggleHeroVideo');
  const btnSwitch = document.getElementById('btnSwitchHeroVideo');
  const statusIcon = document.getElementById('videoStatusIcon');
  const frameName = document.getElementById('videoFrameName');

  if (!video || !btnToggle || !btnSwitch) return;

  btnToggle.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      if (statusIcon) statusIcon.textContent = '⏸️';
    } else {
      video.pause();
      if (statusIcon) statusIcon.textContent = '▶️';
    }
  });

  const videoPlaylist = [
    { src: 'videos/sterrato_night_360.mp4', label: 'Noapte' },
    { src: 'videos/sterrato_desert_360.mp4', label: 'Deșert' }
  ];
  let currentVideoIndex = 0;

  btnSwitch.addEventListener('click', () => {
    currentVideoIndex = (currentVideoIndex + 1) % videoPlaylist.length;
    const next = videoPlaylist[currentVideoIndex];

    video.style.opacity = '0';
    setTimeout(() => {
      video.src = next.src;
      video.play();
      if (frameName) frameName.textContent = next.label;
      video.style.opacity = '0.52';
    }, 400);
  });
}


/* ==============================================================================
   DYNAMIC STICKY NAVBAR (TALL AT HERO, COMPACT ON SCROLL)
   ============================================================================== */
function initDynamicStickyNavbar() {
  const navbar = document.querySelector('.lp-navbar');
  if (!navbar) return;

  const handleNavbarScroll = () => {
    if (window.scrollY > 20 || window.location.hash === '#scrolled' || window.location.search.includes('scrolled=1')) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }
  };

  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
}
