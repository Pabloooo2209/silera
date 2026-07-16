const navbar = document.getElementById('navbar');
const formStartedAt = Date.now();

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const revealElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
      if (!entry.isIntersecting) return;
      window.setTimeout(() => entry.target.classList.add('visible'), index * 60);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });
  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => element.classList.add('visible'));
}

function setMenu(open) {
  const menu = document.getElementById('mobileNav');
  const button = document.getElementById('hamburger');
  if (!menu || !button) return;
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

function toggleMenu() {
  const menu = document.getElementById('mobileNav');
  setMenu(!menu?.classList.contains('open'));
}

function closeMenu() { setMenu(false); }

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeMenu();
});

function getPayload() {
  return Object.fromEntries(new FormData(document.getElementById('contactForm')).entries());
}

function validateForm() {
  const form = document.getElementById('contactForm');
  const honeypot = form?.querySelector('[name="_honey"]');
  if (!form || honeypot?.value) return false;
  if (!form.reportValidity()) return false;

  const name = document.getElementById('pName').value.trim();
  const phone = document.getElementById('pPhone').value.trim();
  if (!name || !phone) {
    window.alert('Por favor completa tu nombre y teléfono para continuar.');
    return false;
  }

  if (Date.now() - formStartedAt < 1800) {
    window.alert('Revisa la información antes de enviarla.');
    return false;
  }
  return true;
}

function buildWhatsAppMessage(payload) {
  return [
    'Nueva solicitud de información - Centro Silera', '',
    `*Nombre:* ${payload['Nombre del padre/madre'] || '-'}`,
    `*Teléfono:* ${payload['Teléfono'] || '-'}`,
    `*Correo:* ${payload['Correo electrónico'] || '-'}`,
    `*Niño/a:* ${payload['Nombre del niño/a'] || '-'}`,
    `*Edad:* ${payload['Edad del niño/a'] || '-'}`,
    `*Programa:* ${payload['Programa de interés'] || '-'}`,
    `*Mensaje:* ${payload['Mensaje'] || '-'}`
  ].join('\n');
}

function submitForm(eventOrMethod, requestedMethod) {
  let method = eventOrMethod;
  if (eventOrMethod && typeof eventOrMethod.preventDefault === 'function') {
    eventOrMethod.preventDefault();
    method = requestedMethod || 'email';
  }
  if (!validateForm()) return false;

  const form = document.getElementById('contactForm');
  const emailButton = document.getElementById('btnEmail');
  const whatsappButton = document.getElementById('btnWa');
  const payload = getPayload();

  if (method === 'whatsapp') {
    const whatsappUrl = `https://wa.me/18492202209?text=${encodeURIComponent(buildWhatsAppMessage(payload))}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    form.style.display = 'none';
    document.getElementById('succIco').textContent = '✓';
    document.getElementById('succIco').style.background = '#D1FAE5';
    document.getElementById('succTitle').textContent = '¡Abriendo WhatsApp!';
    document.getElementById('succMsg').textContent = 'Se abrió el chat con tu información. Revisa el mensaje y pulsa Enviar para compartirlo con Centro Silera.';
    document.getElementById('formSuccess').classList.add('show');
    return false;
  }

  emailButton.disabled = true;
  whatsappButton.disabled = true;
  emailButton.textContent = 'Enviando…';

  fetch('https://formsubmit.co/ajax/centrosilera@gmail.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(response => {
      if (!response.ok) throw new Error('Form submission failed');
      return response.json();
    })
    .then(() => {
      form.style.display = 'none';
      document.getElementById('succIco').textContent = '✓';
      document.getElementById('succTitle').textContent = '¡Correo enviado!';
      document.getElementById('succMsg').textContent = 'Gracias por contactarnos. Centro Silera responderá tu consulta tan pronto como sea posible.';
      document.getElementById('formSuccess').classList.add('show');
    })
    .catch(() => {
      form.style.display = 'none';
      document.getElementById('formError').classList.add('show');
    })
    .finally(() => {
      emailButton.disabled = false;
      whatsappButton.disabled = false;
      emailButton.textContent = 'Por correo electrónico';
    });
  return false;
}

function resetForm() {
  const form = document.getElementById('contactForm');
  form.reset();
  form.style.display = 'block';
  document.getElementById('formSuccess').classList.remove('show');
  document.getElementById('formError').classList.remove('show');
  document.getElementById('pPhone')?.closest('.fg')?.classList.remove('has-error');
  document.getElementById('pPhone')?.setCustomValidity('');
}

document.getElementById('currentYear').textContent = new Date().getFullYear();

Object.assign(window, {
  toggleMenu,
  closeMenu,
  submitForm,
  resetForm
});
