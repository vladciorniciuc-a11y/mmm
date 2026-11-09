/**
 * ==============================================================================
 * LUXURY SHOWROOM - INTERACTION ENGINE
 * Smart Auto-Hide, Laser Progress, VIP Calendar & WhatsApp Dispatch
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSmartNavbar();
  initLaserAndScrollProgress();
  initVipCalendarModal();
  initFleetFiltering();
  initHeroSearch();
});

/**
 * 1. Smart Auto-Hide & Reveal Sticky Navbar (Zero Layout Thrashing, GPU Accelerated)
 */
function initSmartNavbar() {
  const navbar = document.getElementById('shNavbar');
  if (!navbar) return;

  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateNavbar = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 40) {
      navbar.classList.add('is-scrolled');
    } else {
      navbar.classList.remove('is-scrolled');
    }

    // Smart Auto-Hide Logic:
    // Scroll down > 120px: hide
    // Scroll up by at least 6px: reveal instantly
    if (currentScrollY > 120) {
      if (currentScrollY > lastScrollY + 6) {
        navbar.classList.add('is-hidden');
      } else if (currentScrollY < lastScrollY - 6) {
        navbar.classList.remove('is-hidden');
      }
    } else {
      navbar.classList.remove('is-hidden');
    }

    lastScrollY = Math.max(0, currentScrollY);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  }, { passive: true });

  updateNavbar();
}

/**
 * 2. Laser Progress Bar & Scroll-To-Top Circular Progress Ring
 */
function initLaserAndScrollProgress() {
  const progressBar = document.getElementById('shProgressBar');
  const scrollTopBtn = document.getElementById('shScrollTopBtn');
  const progressCircle = document.getElementById('shScrollProgressCircle');
  const circleCircumference = 138.2; // 2 * PI * 22

  if (!progressBar && !scrollTopBtn) return;

  let ticking = false;

  const onScrollProgress = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(scrollY / docHeight, 0), 1) : 0;

    // 1. Update Laser Bar on Navbar
    if (progressBar) {
      progressBar.style.width = (progress * 100) + '%';
    }

    // 2. Update Circular Ring & Visibility on Scroll-To-Top
    if (scrollTopBtn && progressCircle) {
      if (scrollY > 300) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }

      const offset = circleCircumference - (progress * circleCircumference);
      progressCircle.style.strokeDashoffset = offset;
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScrollProgress);
      ticking = true;
    }
  }, { passive: true });

  onScrollProgress();

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/**
 * 3. Interactive VIP Calendar Modal with Direct WhatsApp Dispatch
 */
function initVipCalendarModal() {
  const modal = document.getElementById('modalVipCalendar');
  const openBtn = document.getElementById('btnOpenVipModal');
  const closeBtn = document.getElementById('closeVipModalBtn');
  const form = document.getElementById('vipModalForm');
  const slotButtons = document.querySelectorAll('.sh-time-slot-btn');
  const dateInput = document.getElementById('vipDate');

  if (!modal) return;

  // Set default minimum date to today
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Open modal on click or if URL hash is #vip
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (window.location.hash === '#vip') {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Time Slots selection
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // Form Submission -> WhatsApp
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('vipName')?.value.trim();
      const phone = document.getElementById('vipPhone')?.value.trim();
      const date = dateInput?.value || 'Data neprecizată';
      const activeSlot = document.querySelector('.sh-time-slot-btn.active')?.getAttribute('data-time') || '11:30';
      const model = document.getElementById('vipModel')?.value || 'General Showroom';
      const notes = document.getElementById('vipNotes')?.value.trim() || '';

      if (!name || !phone) {
        alert('Vă rugăm să introduceți numele și numărul de telefon.');
        return;
      }

      let message = `Bună ziua, doresc o programare pentru vizionare privată VIP în showroom.\n\n` +
                    `👤 Nume: ${name}\n` +
                    `📞 Telefon: ${phone}\n` +
                    `📅 Data dorită: ${date}\n` +
                    `⏰ Interval orar: ${activeSlot}\n` +
                    `🏎️ Model de interes: ${model}`;

      if (notes) {
        message += `\n📝 Notă particulară: ${notes}`;
      }

      closeModal();
      const waUrl = `https://wa.me/40744000000?text=${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
}

/**
 * 4. Fleet Category and Budget Filtering
 */
function initFleetFiltering() {
  const pills = document.querySelectorAll('.sh-filter-pill');
  const cards = document.querySelectorAll('.sh-car-card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filter = pill.getAttribute('data-filter') || 'all';
      filterFleet(filter);
    });
  });

  window.filterFleet = function(filter) {
    cards.forEach(card => {
      const price = parseInt(card.getAttribute('data-price') || '0', 10);
      const make = card.getAttribute('data-make') || '';
      let match = true;

      if (filter === 'under-150') {
        match = price < 150000;
      } else if (filter === '150-250') {
        match = price >= 150000 && price <= 250000;
      } else if (filter === '250-350') {
        match = price >= 250000 && price <= 350000;
      } else if (filter === 'over-350') {
        match = price > 350000;
      } else if (filter !== 'all') {
        match = make.toLowerCase() === filter.toLowerCase();
      }

      if (match) {
        card.style.display = 'flex';
        setTimeout(() => { card.style.opacity = '1'; }, 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => { card.style.display = 'none'; }, 200);
      }
    });
  };
}

/**
 * 5. Hero Search Integration (Inspired by AutoVibe)
 */
function initHeroSearch() {
  const searchBtn = document.getElementById('btnHeroSearch');
  const makeSelect = document.getElementById('searchMake');
  const yearSelect = document.getElementById('searchYear');
  const budgetSelect = document.getElementById('searchBudget');
  const fleetSection = document.getElementById('stoc');
  const cards = document.querySelectorAll('.sh-car-card');

  if (!searchBtn) return;

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const selectedMake = (makeSelect?.value || '').toLowerCase();
    const selectedYear = (yearSelect?.value || '').trim();
    const selectedBudget = budgetSelect?.value || 'all';

    cards.forEach(card => {
      const cardMake = (card.getAttribute('data-make') || '').toLowerCase();
      const cardYear = (card.getAttribute('data-year') || '').trim();
      const cardPrice = parseInt(card.getAttribute('data-price') || '0', 10);

      let makeOk = !selectedMake || cardMake.includes(selectedMake);
      let yearOk = true;
      if (selectedYear === '2020+') {
        yearOk = parseInt(cardYear, 10) >= 2020;
      } else if (selectedYear) {
        yearOk = (cardYear === selectedYear);
      }

      let budgetOk = true;
      if (selectedBudget === 'under-150') budgetOk = cardPrice < 150000;
      else if (selectedBudget === '150-250') budgetOk = cardPrice >= 150000 && cardPrice <= 250000;
      else if (selectedBudget === '250-350') budgetOk = cardPrice >= 250000 && cardPrice <= 350000;
      else if (selectedBudget === 'over-350') budgetOk = cardPrice > 350000;

      if (makeOk && yearOk && budgetOk) {
        card.style.display = 'flex';
        card.style.opacity = '1';
      } else {
        card.style.opacity = '0';
        card.style.display = 'none';
      }
    });

    document.querySelectorAll('.sh-filter-pill').forEach(p => p.classList.remove('active'));

    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
