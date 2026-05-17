// Basic interactivity and mock data handling
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const toastEl = $('#toast');
  const showToast = (msg, type = 'info') => {
    toastEl.textContent = msg;
    toastEl.style.borderColor = type === 'error' ? 'rgba(239, 68, 68, .45)' : 'rgba(92, 196, 139, .45)';
    toastEl.style.background = type === 'error' ? '#2a0f17' : '#0f182d';
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  const nowYear = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = nowYear;

  // LocalStorage helpers
  const getStore = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };
  const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  // Seed some mock donations for the feed if empty
  const seedIfNeeded = () => {
    const donations = getStore('donations', []);
    if (donations.length === 0) {
      setStore('donations', [
        { donorName: 'Priya', foodType: '3 veg thali meals', quantity: 3, pickupLocation: 'Shastri Nagar Bus Stop', readyUntil: '19:30', createdAt: Date.now() - 1000 * 60 * 45 },
        { donorName: 'Rahul', foodType: 'Bread & curry pack', quantity: 5, pickupLocation: 'City Library Gate', readyUntil: '20:00', createdAt: Date.now() - 1000 * 60 * 80 },
        { donorName: 'Community Kitchen', foodType: 'Rice & dal', quantity: 20, pickupLocation: 'Old Temple Street', readyUntil: '21:00', createdAt: Date.now() - 1000 * 60 * 20 },
      ]);
    }
  };

  const timeAgo = (ts) => {
    const diffMin = Math.max(1, Math.round((Date.now() - ts) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const hours = Math.round(diffMin / 60);
    return `${hours}h ago`;
  };

  const renderFeed = () => {
    const list = $('#feed-list');
    if (!list) return;
    const donations = getStore('donations', []);
    list.innerHTML = donations.map((d) => `
      <article class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">
          <h4 style="margin:.1rem 0">${d.foodType}</h4>
          <span class="tiny muted">${timeAgo(d.createdAt)}</span>
        </div>
        <p class="tiny muted">By ${d.donorName} • Qty: ${d.quantity}</p>
        <p class="tiny">📍 ${d.pickupLocation}</p>
        <p class="tiny muted">Best before ${d.readyUntil}</p>
        <button class="btn btn-sm btn-ghost" aria-label="Request this donation">I'm interested</button>
      </article>
    `).join('');
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const donorName = f.donorName.value.trim();
    const foodType = f.foodType.value.trim();
    const quantity = parseInt(f.quantity.value, 10) || 0;
    const readyUntil = f.readyUntil.value;
    const pickupLocation = f.pickupLocation.value.trim();
    const donorContact = f.donorContact.value.trim();
    if (!donorName || !foodType || !quantity || !readyUntil || !pickupLocation || !donorContact) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const donations = getStore('donations', []);
    donations.unshift({ donorName, foodType, quantity, readyUntil, pickupLocation, donorContact, createdAt: Date.now() });
    setStore('donations', donations);
    f.reset();
    renderFeed();
    showToast('Donation posted! We will match you soon.');
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const seekerName = f.seekerName.value.trim();
    const needFor = parseInt(f.needFor.value, 10) || 0;
    const seekerLocation = f.seekerLocation.value.trim();
    const timeWindow = f.timeWindow.value;
    const seekerContact = f.seekerContact.value.trim();
    if (!seekerName || !needFor || !seekerLocation || !timeWindow || !seekerContact) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const requests = getStore('requests', []);
    requests.unshift({ seekerName, needFor, seekerLocation, timeWindow, seekerContact, createdAt: Date.now() });
    setStore('requests', requests);
    f.reset();
    showToast('Request posted. We will notify nearby donors.');
  };

  const useLocation = async (inputEl) => {
    if (!('geolocation' in navigator)) {
      showToast('Location not available on this device.', 'error');
      return;
    }
    // Geolocation over non-HTTPS might be blocked by browsers when served from file://
    try {
      const id = showToast('Getting your location...');
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        inputEl.value = `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`;
        showToast('Location filled.');
      }, () => showToast('Could not get location.', 'error'), { enableHighAccuracy: true, timeout: 8000 });
    } catch {
      showToast('Location permission denied.', 'error');
    }
  };

  // Smooth scroll for anchor links
  const enableSmoothScroll = () => {
    $$('.nav a, .hero a').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    seedIfNeeded();
    renderFeed();

    const donateForm = $('#donate-form');
    const requestForm = $('#request-form');
    donateForm?.addEventListener('submit', handleDonateSubmit);
    requestForm?.addEventListener('submit', handleRequestSubmit);

    $('#donor-locate')?.addEventListener('click', () => useLocation($('#pickupLocation')));
    $('#seeker-locate')?.addEventListener('click', () => useLocation($('#seekerLocation')));

    enableSmoothScroll();
  });
})();// Basic interactivity and mock data handling
(function () {
  const $ = (sel, el = document) => el.querySelector(sel);
  const $$ = (sel, el = document) => Array.from(el.querySelectorAll(sel));

  const toastEl = $('#toast');
  const showToast = (msg, type = 'info') => {
    toastEl.textContent = msg;
    toastEl.style.borderColor = type === 'error' ? 'rgba(239, 68, 68, .45)' : 'rgba(92, 196, 139, .45)';
    toastEl.style.background = type === 'error' ? '#2a0f17' : '#0f182d';
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2600);
  };

  const nowYear = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = nowYear;

  // LocalStorage helpers
  const getStore = (key, fallback) => {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  };
  const setStore = (key, val) => localStorage.setItem(key, JSON.stringify(val));

  // Seed some mock donations for the feed if empty
  const seedIfNeeded = () => {
    const donations = getStore('donations', []);
    if (donations.length === 0) {
      setStore('donations', [
        { donorName: 'Priya', foodType: '3 veg thali meals', quantity: 3, pickupLocation: 'Shastri Nagar Bus Stop', readyUntil: '19:30', createdAt: Date.now() - 1000 * 60 * 45 },
        { donorName: 'Rahul', foodType: 'Bread & curry pack', quantity: 5, pickupLocation: 'City Library Gate', readyUntil: '20:00', createdAt: Date.now() - 1000 * 60 * 80 },
        { donorName: 'Community Kitchen', foodType: 'Rice & dal', quantity: 20, pickupLocation: 'Old Temple Street', readyUntil: '21:00', createdAt: Date.now() - 1000 * 60 * 20 },
      ]);
    }
  };

  const timeAgo = (ts) => {
    const diffMin = Math.max(1, Math.round((Date.now() - ts) / 60000));
    if (diffMin < 60) return `${diffMin}m ago`;
    const hours = Math.round(diffMin / 60);
    return `${hours}h ago`;
  };

  const renderFeed = () => {
    const list = $('#feed-list');
    if (!list) return;
    const donations = getStore('donations', []);
    list.innerHTML = donations.map((d) => `
      <article class="card">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:.5rem">
          <h4 style="margin:.1rem 0">${d.foodType}</h4>
          <span class="tiny muted">${timeAgo(d.createdAt)}</span>
        </div>
        <p class="tiny muted">By ${d.donorName} • Qty: ${d.quantity}</p>
        <p class="tiny">📍 ${d.pickupLocation}</p>
        <p class="tiny muted">Best before ${d.readyUntil}</p>
        <button class="btn btn-sm btn-ghost" aria-label="Request this donation">I'm interested</button>
      </article>
    `).join('');
  };

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const donorName = f.donorName.value.trim();
    const foodType = f.foodType.value.trim();
    const quantity = parseInt(f.quantity.value, 10) || 0;
    const readyUntil = f.readyUntil.value;
    const pickupLocation = f.pickupLocation.value.trim();
    const donorContact = f.donorContact.value.trim();
    if (!donorName || !foodType || !quantity || !readyUntil || !pickupLocation || !donorContact) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const donations = getStore('donations', []);
    donations.unshift({ donorName, foodType, quantity, readyUntil, pickupLocation, donorContact, createdAt: Date.now() });
    setStore('donations', donations);
    f.reset();
    renderFeed();
    showToast('Donation posted! We will match you soon.');
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const seekerName = f.seekerName.value.trim();
    const needFor = parseInt(f.needFor.value, 10) || 0;
    const seekerLocation = f.seekerLocation.value.trim();
    const timeWindow = f.timeWindow.value;
    const seekerContact = f.seekerContact.value.trim();
    if (!seekerName || !needFor || !seekerLocation || !timeWindow || !seekerContact) {
      showToast('Please fill all required fields.', 'error');
      return;
    }
    const requests = getStore('requests', []);
    requests.unshift({ seekerName, needFor, seekerLocation, timeWindow, seekerContact, createdAt: Date.now() });
    setStore('requests', requests);
    f.reset();
    showToast('Request posted. We will notify nearby donors.');
  };

  const useLocation = async (inputEl) => {
    if (!('geolocation' in navigator)) {
      showToast('Location not available on this device.', 'error');
      return;
    }
    // Geolocation over non-HTTPS might be blocked by browsers when served from file://
    try {
      const id = showToast('Getting your location...');
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        inputEl.value = `Lat ${latitude.toFixed(5)}, Lng ${longitude.toFixed(5)}`;
        showToast('Location filled.');
      }, () => showToast('Could not get location.', 'error'), { enableHighAccuracy: true, timeout: 8000 });
    } catch {
      showToast('Location permission denied.', 'error');
    }
  };

  // Smooth scroll for anchor links
  const enableSmoothScroll = () => {
    $$('.nav a, .hero a').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href') || '';
        if (href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  // Init
  document.addEventListener('DOMContentLoaded', () => {
    seedIfNeeded();
    renderFeed();

    const donateForm = $('#donate-form');
    const requestForm = $('#request-form');
    donateForm?.addEventListener('submit', handleDonateSubmit);
    requestForm?.addEventListener('submit', handleRequestSubmit);

    $('#donor-locate')?.addEventListener('click', () => useLocation($('#pickupLocation')));
    $('#seeker-locate')?.addEventListener('click', () => useLocation($('#seekerLocation')));

    enableSmoothScroll();
  });
})();