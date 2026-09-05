// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Subtle custom cursor dot (desktop only) =====
const cursorDot = document.getElementById('cursorDot');
const isFinePointer = window.matchMedia('(pointer: fine)').matches;

if (isFinePointer) {
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.opacity = '1';
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
  });
  window.addEventListener('mouseleave', () => {
    cursorDot.style.opacity = '0';
  });
}

// ===== Contact form validation (front-end only, no backend) =====
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const fields = {
  name: { input: document.getElementById('name'), error: document.getElementById('nameError') },
  email: { input: document.getElementById('email'), error: document.getElementById('emailError') },
  message: { input: document.getElementById('message'), error: document.getElementById('messageError') },
};

function validateField(key) {
  const { input, error } = fields[key];
  const value = input.value.trim();

  if (value === '') {
    error.textContent = 'Bagian ini wajib diisi.';
    return false;
  }

  if (key === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      error.textContent = 'Coba periksa lagi format emailnya.';
      return false;
    }
  }

  if (key === 'message' && value.length < 10) {
    error.textContent = 'Ceritakan sedikit lebih detail (min. 10 karakter).';
    return false;
  }

  error.textContent = '';
  return true;
}

Object.keys(fields).forEach((key) => {
  fields[key].input.addEventListener('blur', () => validateField(key));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const results = Object.keys(fields).map((key) => validateField(key));
  const allValid = results.every(Boolean);

  if (!allValid) {
    formStatus.textContent = 'Ada bagian yang perlu diperbaiki dulu ya.';
    formStatus.style.color = '#FF5D8F';
    return;
  }

  // Tidak ada backend di demo ini — ganti bagian ini dengan
  // pemanggilan API/email service kamu (mis. fetch ke endpoint sendiri,
  // atau layanan seperti Formspree/EmailJS).
  formStatus.textContent = 'Pesan terkirim! Terima kasih sudah mampir 👋';
  formStatus.style.color = '#FFC93C';
  form.reset();
});
