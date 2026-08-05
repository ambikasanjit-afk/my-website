/* =========================================================
   NEXUS.AI — Main Script
   Sections: Loader/3D setup, Hero Scene, Cursor, Nav,
   Tilt Cards, Filters, Counters, Newsletter, Perf checks
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  AOS.init({ duration: 800, once: true, offset: 60 });

  const isLowPower = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  initLoader();
  initCursor();
  initNavbar();
  initHeroScene(isLowPower, prefersReducedMotion);
  initTiltCards();
  initFilters();
  initCounters();
  initNewsletter();
  initScrollAnimations();
});

/* ---------- Loading Screen ---------- */
function initLoader() {
  const loader = document.getElementById('loader');
  const fill = document.getElementById('loaderFill');
  let progress = 0;

  const interval = setInterval(() => {
    progress += Math.random() * 18;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      setTimeout(() => loader.classList.add('loaded'), 300);
    }
    fill.style.width = progress + '%';
  }, 180);

  // Small rotating icosahedron in the loader canvas
  const canvas = document.getElementById('loader-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(160, 160);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.z = 4;

  const geo = new THREE.IcosahedronGeometry(1.3, 0);
  const mat = new THREE.MeshBasicMaterial({ color: 0x4fd8ff, wireframe: true });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);

  function animateLoader() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.015;
    renderer.render(scene, camera);
    if (!loader.classList.contains('loaded')) requestAnimationFrame(animateLoader);
  }
  animateLoader();
}

/* ---------- Custom Cursor ---------- */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (window.matchMedia('(max-width: 900px)').matches) return;

  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });

  function loop() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  document.querySelectorAll('a, button, .tool-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

/* ---------- Navbar ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

/* ---------- Hero 3D Scene ---------- */
function initHeroScene(isLowPower, prefersReducedMotion) {
  const canvas = document.getElementById('heroCanvas');
  const hero = document.getElementById('hero');

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isLowPower });
  renderer.setSize(hero.clientWidth, hero.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isLowPower ? 1 : 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, hero.clientWidth / hero.clientHeight, 0.1, 1000);
  camera.position.z = 6;

  // Lighting
  const ambient = new THREE.AmbientLight(0x8a5cff, 0.6);
  scene.add(ambient);
  const point = new THREE.PointLight(0x4fd8ff, 2, 20);
  point.position.set(3, 3, 5);
  scene.add(point);

  // --- Core "brain" — a distorted icosahedron cluster ---
  const coreGroup = new THREE.Group();
  const coreGeo = new THREE.IcosahedronGeometry(1.6, isLowPower ? 1 : 3);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x4fd8ff,
    emissive: 0x1a3a5c,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  coreGroup.add(core);

  const innerGlow = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.1, 1),
    new THREE.MeshBasicMaterial({ color: 0x8a5cff, transparent: true, opacity: 0.25 })
  );
  coreGroup.add(innerGlow);
  scene.add(coreGroup);

  // --- Particle field connected by lines (AI network) ---
  const particleCount = isLowPower ? 120 : 400;
  const positions = new Float32Array(particleCount * 3);
  const radius = 5.5;
  for (let i = 0; i < particleCount; i++) {
    const r = radius * (0.6 + Math.random() * 0.8);
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0x4fd8ff,
    size: 0.045,
    transparent: true,
    opacity: 0.85,
  });
  const particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);

  // Connective lines between nearby particles (network look), computed once
  const lineGeo = new THREE.BufferGeometry();
  const linePositions = [];
  const maxDist = 1.6;
  const sampleLimit = isLowPower ? 60 : 180;
  for (let i = 0; i < Math.min(particleCount, sampleLimit); i++) {
    const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
    for (let j = i + 1; j < Math.min(particleCount, sampleLimit); j++) {
      const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2];
      const d = Math.hypot(ax - bx, ay - by, az - bz);
      if (d < maxDist) {
        linePositions.push(ax, ay, az, bx, by, bz);
      }
    }
  }
  lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
  const lineMat = new THREE.LineBasicMaterial({ color: 0x8a5cff, transparent: true, opacity: 0.15 });
  const networkLines = new THREE.LineSegments(lineGeo, lineMat);
  scene.add(networkLines);

  // --- Floating rings ---
  const rings = [];
  const ringColors = [0x4fd8ff, 0x8a5cff, 0xff4fd8];
  for (let i = 0; i < 3; i++) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.4 + i * 0.5, 0.015, 8, 80),
      new THREE.MeshBasicMaterial({ color: ringColors[i], transparent: true, opacity: 0.35 })
    );
    ring.rotation.x = Math.random() * Math.PI;
    ring.rotation.y = Math.random() * Math.PI;
    rings.push(ring);
    scene.add(ring);
  }

  // Mouse parallax
  let targetRotX = 0, targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.4;
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.4;
  });

  // Scroll-based camera pull-back
  let scrollFactor = 0;
  window.addEventListener('scroll', () => {
    scrollFactor = Math.min(window.scrollY / hero.clientHeight, 1);
  });

  const clock = new THREE.Clock();

  function animate() {
    const t = clock.getElapsedTime();

    if (!prefersReducedMotion) {
      coreGroup.rotation.y += 0.0025;
      coreGroup.rotation.x += 0.001;
      particles.rotation.y += 0.0006;
      networkLines.rotation.y += 0.0006;
      rings.forEach((ring, i) => {
        ring.rotation.z += 0.0015 * (i + 1);
        ring.rotation.x += 0.0008 * (i + 1);
      });
      innerGlow.scale.setScalar(1 + Math.sin(t * 1.5) * 0.08);
    }

    camera.rotation.x += (targetRotX - camera.rotation.x) * 0.04;
    camera.rotation.y += (targetRotY - camera.rotation.y) * 0.04;
    camera.position.z = 6 + scrollFactor * 4;
    camera.position.y = -scrollFactor * 1.5;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = hero.clientWidth / hero.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(hero.clientWidth, hero.clientHeight);
  });
}

/* ---------- Tilt / Glow Cards ---------- */
function initTiltCards() {
  const cards = document.querySelectorAll('.tool-card');
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) * 6;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.setProperty('--mx', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--my', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

/* ---------- Category Filters ---------- */
function initFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.tool-card');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('hidden', !match);
      });
    });
  });
}

/* ---------- Animated Counters ---------- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(el => observer.observe(el));

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '+';
    const duration = 1600;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
}

/* ---------- Newsletter ---------- */
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  const input = document.getElementById('newsletterEmail');
  const message = document.getElementById('formMessage');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!valid) {
      message.textContent = 'Please enter a valid email address.';
      message.style.color = '#ff4fd8';
      return;
    }

    message.textContent = `You're in! Confirmation sent to ${email}.`;
    message.style.color = '#4fd8ff';
    form.reset();
  });
}

/* ---------- GSAP Scroll Animations ---------- */
function initScrollAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.tools-section, .spotlight-section, .stats-section, .newsletter-section').forEach(section => {
    gsap.fromTo(section, { opacity: 0.9 }, {
      opacity: 1,
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
      }
    });
  });

  gsap.to('.hero-content', {
    yPercent: 25,
    opacity: 0.3,
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
}