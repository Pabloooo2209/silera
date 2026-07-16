import { PROGRAMS, findPrograms, getProgramByTitle } from './programs-data.js';

const ICONS = {
  baby: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="8"/><path d="M9 11h.01M15 11h.01M9.5 15c1.6 1.2 3.4 1.2 5 0M12 4c0-2 2.7-2.4 3.4-.8"/></svg>',
  blocks: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="8" height="8" rx="2"/><rect x="13" y="5" width="8" height="8" rx="2"/><path d="M7 14v2M6 15h2M16 9h2"/></svg>',
  palette: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3a9 9 0 1 0 0 18h1.2a2 2 0 0 0 1.4-3.4 1.8 1.8 0 0 1 1.3-3.1H18A3 3 0 0 0 21 11a9 9 0 0 0-9-8Z"/><path d="M7.5 10h.01M9.5 6.8h.01M14 6.5h.01"/></svg>',
  book: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5ZM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></svg>',
  music: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></svg>',
  clock: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  message: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 15a3 3 0 0 1-3 3H9l-5 3v-6a8 8 0 1 1 16 0Z"/><path d="M8 11h8M8 14h5"/></svg>',
  phone: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8.5 3 11 7.5 8 9c1.5 3 3.5 5 6.5 6.5l1.5-3 4.5 2.5v3c0 1.7-1.3 3-3 3C9.5 21 3 14.5 3 6.5c0-1.7 1.3-3 3-3h2.5Z"/></svg>',
  mail: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
  map: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  check: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16.5 9"/></svg>',
  school: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 10 9-6 9 6M5 9v10h14V9M3 20h18M9 19v-5h6v5"/></svg>',
  people: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 14a4.5 4.5 0 0 1 6.5 4"/></svg>',
  food: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21c5 0 8-3.6 8-8H4c0 4.4 3 8 8 8ZM6 9c0-2 1-3 1-5M11 9c0-2 1-3 1-5M16 9c0-2 1-3 1-5"/></svg>',
  shield: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 20 6v5c0 5.2-3.3 8.3-8 10-4.7-1.7-8-4.8-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  heart: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 5.7c-2.2-2.2-5.7-2.2-7.8 0L12 6.8l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.5a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
  leaf: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 4C11 4 5 8 5 15c0 3 2 5 5 5 7 0 10-7 10-16Z"/><path d="M4 21c3-6 7-9 13-12"/></svg>',
  health: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3v5a4 4 0 0 0 8 0V3M6 3h4M14 3h4M12 12v2a5 5 0 0 0 5 5h1"/><circle cx="19" cy="19" r="2"/></svg>',
  camera: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h4l2-3h4l2 3h4v13H4V7Z"/><circle cx="12" cy="13" r="4"/></svg>',
  calendar: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01"/></svg>',
  star: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg>',
  sparkle: '<svg class="ui-svg" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 1.2 4.3L17 9l-3.8 1.7L12 15l-1.2-4.3L7 9l3.8-1.7L12 3ZM18 14l.8 2.2L21 17l-2.2.8L18 20l-.8-2.2L15 17l2.2-.8L18 14Z"/></svg>'
};

const PROGRAM_SELECT_VALUE = {
  'Maternal': 'Maternal (0–2 años)',
  'Pre-Kínder': 'Pre-Kínder (3–4 años)',
  'Kínder': 'Kínder (5 años)',
  'Preparación Escolar': 'Preparación Escolar',
  'Cuido Extendido': 'Cuido Extendido'
};

function createProgramDialog() {
  const dialog = document.createElement('dialog');
  dialog.id = 'programDialog';
  dialog.className = 'silera-dialog';
  dialog.setAttribute('aria-labelledby', 'programDialogTitle');
  dialog.innerHTML = '<div class="dialog-shell" id="programDialogContent"></div>';
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.body.append(dialog);
  return dialog;
}

function renderProgramDialog(dialog, program) {
  const content = dialog.querySelector('#programDialogContent');
  content.innerHTML = `
    <button class="dialog-close" type="button" aria-label="Cerrar detalles">×</button>
    <div class="dialog-icon">${ICONS[program.icon] || ICONS.book}</div>
    <div class="dialog-kicker">Detalle del programa</div>
    <h2 class="dialog-title" id="programDialogTitle">${program.title}</h2>
    <p class="dialog-description">${program.description}</p>
    <div class="dialog-meta">
      <div><span>Edades orientativas</span><strong>${program.ageLabel}</strong></div>
      <div><span>Horario</span><strong>${program.schedule}</strong></div>
    </div>
    <ul class="dialog-list">${program.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
    <p class="dialog-note">La asignación, los servicios y los cupos deben confirmarse directamente con Centro Silera.</p>
    <div class="dialog-actions">
      <button type="button" class="btn-outline-light dialog-select-program">Consultar este programa</button>
      <a class="btn-primary" target="_blank" rel="noopener noreferrer" href="https://wa.me/18492202209?text=${encodeURIComponent(`Hola, quiero información sobre ${program.title} en Centro Silera`)}">Preguntar por WhatsApp</a>
    </div>`;

  content.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  content.querySelector('.dialog-select-program').addEventListener('click', () => {
    selectProgram(program);
    dialog.close();
  });
}

function openProgram(dialog, program) {
  renderProgramDialog(dialog, program);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function selectProgram(program, age = '') {
  const programSelect = document.getElementById('cProg');
  const ageSelect = document.getElementById('cAge');
  const mappedValue = PROGRAM_SELECT_VALUE[program.title];

  if (mappedValue && programSelect) programSelect.value = mappedValue;
  if (ageSelect && age !== '') {
    ageSelect.value = Number(age) === 0 ? 'Menos de 1 año' : `${age} año${Number(age) === 1 ? '' : 's'}`;
  }
  document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.setTimeout(() => document.getElementById('pName')?.focus({ preventScroll: true }), 550);
}

function enhanceProgramCards(dialog) {
  document.querySelectorAll('.prog-card').forEach(card => {
    const title = card.querySelector('h3')?.textContent.trim();
    const program = title ? getProgramByTitle(title) : null;
    if (!program) return;

    card.dataset.program = program.id;
    const icon = card.querySelector('.prog-icon');
    if (icon) icon.innerHTML = ICONS[program.icon] || ICONS.book;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'prog-details-btn';
    button.textContent = 'Ver detalles';
    button.setAttribute('aria-label', `Ver detalles de ${program.title}`);
    button.addEventListener('click', () => openProgram(dialog, program));
    card.append(button);
  });
}

function initProgramFinder(dialog) {
  const form = document.getElementById('programFinder');
  const result = document.getElementById('finderResult');
  if (!form || !result) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const age = document.getElementById('finderAge').value;
    const needsExtended = document.getElementById('finderSchedule').value === 'extended';
    if (age === '') return;

    const matches = findPrograms(age, needsExtended);
    const primary = matches[0];
    if (!primary) {
      result.innerHTML = '<div><strong>Consulta directamente con Silera</strong><p>El centro puede orientarte según la edad y las necesidades de tu familia.</p></div>';
      result.hidden = false;
      return;
    }

    const names = matches.map(program => program.title).join(' + ');
    result.innerHTML = `
      <div><strong>Opción orientativa: ${names}</strong><p>${primary.description}</p></div>
      <div class="finder-result-actions">
        <button type="button" data-action="details">Ver detalles</button>
        <button type="button" data-action="contact">Consultar cupo</button>
      </div>`;
    result.hidden = false;
    result.querySelector('[data-action="details"]').addEventListener('click', () => openProgram(dialog, primary));
    result.querySelector('[data-action="contact"]').addEventListener('click', () => selectProgram(primary, age));
  });
}

function createGalleryDialog() {
  const dialog = document.createElement('dialog');
  dialog.id = 'galleryDialog';
  dialog.className = 'silera-dialog';
  dialog.setAttribute('aria-labelledby', 'galleryDialogTitle');
  dialog.innerHTML = '<div class="dialog-shell" id="galleryDialogContent"></div>';
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  document.body.append(dialog);
  return dialog;
}

function openGalleryItem(dialog, item) {
  const label = item.querySelector('.gi-overlay span')?.textContent.trim() || 'Espacio de Centro Silera';
  const art = item.querySelector('.gi-inner');
  const artClass = [...(art?.classList || [])].find(name => /^g\d+$/.test(name)) || 'g1';
  const artContent = art?.textContent.trim() || '';
  const content = dialog.querySelector('#galleryDialogContent');
  content.innerHTML = `
    <button class="dialog-close" type="button" aria-label="Cerrar galería">×</button>
    <div class="lightbox-art ${artClass}">${artContent}</div>
    <h2 class="lightbox-label" id="galleryDialogTitle">${label}</h2>
    <p class="lightbox-copy">Vista ilustrativa. Sustituye esta tarjeta por una fotografía real del centro cuando esté disponible.</p>`;
  content.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
}

function enhanceGallery(dialog) {
  document.querySelectorAll('.gi').forEach(item => {
    const label = item.querySelector('.gi-overlay span')?.textContent.trim() || 'Ver imagen';
    item.tabIndex = 0;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-haspopup', 'dialog');
    item.setAttribute('aria-label', `Ampliar: ${label}`);
    item.addEventListener('click', () => openGalleryItem(dialog, item));
    item.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openGalleryItem(dialog, item);
      }
    });
  });
}

function formatDominicanPhone(value) {
  let digits = value.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length <= 3) return digits ? `(${digits}` : '';
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

function initPhoneField() {
  const phone = document.getElementById('pPhone');
  if (!phone) return;

  const validate = () => {
    const digits = phone.value.replace(/\D/g, '');
    const valid = /^(809|829|849)\d{7}$/.test(digits);
    phone.setCustomValidity(phone.value && !valid ? 'Escribe un número dominicano válido de 10 dígitos.' : '');
    phone.closest('.fg')?.classList.toggle('has-error', Boolean(phone.value && !valid));
  };

  phone.addEventListener('input', () => {
    phone.value = formatDominicanPhone(phone.value);
    validate();
  });
  phone.addEventListener('blur', validate);
}

function iconKeyForText(value) {
  const text = value.toLocaleLowerCase('es');
  if (text.includes('whatsapp') || text.includes('comunicación') || text.includes('dudas')) return 'message';
  if (text.includes('correo') || text.includes('email')) return 'mail';
  if (text.includes('teléfono') || text.includes('llamar')) return 'phone';
  if (text.includes('dirección') || text.includes('llegar') || text.includes('guarocuya') || text.includes('contáct')) return 'map';
  if (text.includes('opiniones') || text.includes('reseña') || text.includes('experiencia')) return 'star';
  if (text.includes('inscripción') || text.includes('visita')) return 'calendar';
  if (text.includes('galería') || text.includes('foto') || text.includes('monitoreo')) return 'camera';
  if (text.includes('segur') || text.includes('higiene') || text.includes('control de acceso')) return 'shield';
  if (text.includes('alimenta') || text.includes('desayuno') || text.includes('almuerzo') || text.includes('merienda')) return 'food';
  if (text.includes('salud') || text.includes('emergencia') || text.includes('botiquín')) return 'health';
  if (text.includes('amor') || text.includes('emocional') || text.includes('cuidado integral')) return 'heart';
  if (text.includes('naturaleza') || text.includes('aire libre') || text.includes('valores')) return 'leaf';
  if (text.includes('familia') || text.includes('maestro') || text.includes('atención cercana')) return 'people';
  if (text.includes('escuela') || text.includes('centro') || text.includes('fundado') || text.includes('instalaciones')) return 'school';
  if (text.includes('actividad académica') || text.includes('lectura')) return 'book';
  if (text.includes('arte') || text.includes('creativ')) return 'palette';
  if (text.includes('horario') || text.includes('extendido') || text.includes('apertura') || text.includes('descanso') || text.includes('salida')) return 'clock';
  if (text.includes('niño') || text.includes('maternal')) return 'baby';
  if (text.includes('confianza')) return 'star';
  if (text.includes('oferta') || text.includes('aprendiz') || text.includes('método')) return 'blocks';
  return 'check';
}

function replaceIconElement(element, label = '') {
  if (!element) return;
  element.innerHTML = ICONS[iconKeyForText(label)] || ICONS.check;
}

function replaceLeadingSymbol(element) {
  if (!element) return;
  const label = element.textContent.trim().replace(/^[^\p{L}\p{N}]+/u, '');
  element.innerHTML = `${ICONS[iconKeyForText(label)]}<span>${label}</span>`;
}

function enhanceContentIcons() {
  document.querySelectorAll('.section-label').forEach(replaceLeadingSymbol);
  document.querySelectorAll('.mini-card').forEach(card => replaceIconElement(card.querySelector('.mini-icon'), card.querySelector('strong')?.textContent || ''));
  document.querySelectorAll('.af').forEach(card => replaceIconElement(card.querySelector('.af-icon'), card.querySelector('h4')?.textContent || ''));
  document.querySelectorAll('.ch-item').forEach(card => replaceIconElement(card.querySelector('.ch-icon'), card.querySelector('strong')?.textContent || ''));
  document.querySelectorAll('.cc-card').forEach(card => replaceIconElement(card.querySelector('.cc-icon'), card.querySelector('.cc-title')?.textContent || ''));
  document.querySelectorAll('.stat-card').forEach(card => replaceIconElement(card.querySelector('.stat-icon'), card.querySelector('.stat-label')?.textContent || ''));
  document.querySelectorAll('.why-card').forEach(card => replaceIconElement(card.querySelector('.wc-icon'), card.querySelector('.wc-title')?.textContent || ''));
  document.querySelectorAll('.why-list li').forEach(item => replaceIconElement(item.querySelector('span'), item.textContent));
  document.querySelectorAll('.cuidado-schedule-row').forEach(row => replaceIconElement(row.querySelector('.cs-label span'), row.querySelector('.cs-label')?.textContent || ''));
  document.querySelectorAll('.test-card').forEach(card => replaceIconElement(card.querySelector('.t-q'), card.querySelector('.t-name')?.textContent || ''));

  replaceIconElement(document.querySelector('.hero-card-av'), 'Centro Silera');
  document.querySelectorAll('.float-badge').forEach(replaceLeadingSymbol);
  document.querySelectorAll('.hero-pills .hpill').forEach(replaceLeadingSymbol);
  replaceLeadingSymbol(document.querySelector('.about-big-top'));
  replaceLeadingSymbol(document.querySelector('.hero-badge'));
  replaceLeadingSymbol(document.querySelector('.sched-card h4'));

  document.querySelectorAll('.map-action-btn').forEach(replaceLeadingSymbol);
  document.querySelectorAll('.send-options button').forEach(replaceLeadingSymbol);
  document.querySelectorAll('.foot-col a').forEach(link => {
    if (/^[^\p{L}\p{N}]+/u.test(link.textContent.trim())) replaceLeadingSymbol(link);
  });

  const visitButton = [...document.querySelectorAll('.hero-btns .btn-primary')]
    .find(button => button.textContent.includes('Agenda una visita'));
  if (visitButton) {
    visitButton.textContent = visitButton.textContent.replace(/\s*✨\s*/u, ' ').trim();
    visitButton.insertAdjacentHTML('afterbegin', ICONS.calendar);
  }
}

function enhancePrimaryIcons() {
  const waFab = document.querySelector('.wa-fab');
  if (waFab) waFab.innerHTML = ICONS.message;

  document.querySelectorAll('.socials a').forEach(link => {
    const title = link.getAttribute('title');
    if (title === 'Llamar') link.innerHTML = ICONS.phone;
    if (title === 'Correo') link.innerHTML = ICONS.mail;
    if (title === 'WhatsApp') link.innerHTML = ICONS.message;
    if (title === 'Cómo llegar') link.innerHTML = ICONS.map;
  });

  document.querySelectorAll('.ci-item').forEach(item => {
    const label = item.querySelector('strong')?.textContent.trim();
    const icon = item.querySelector('.ci-ico');
    if (!icon) return;
    if (label === 'Dirección') icon.innerHTML = ICONS.map;
    if (label === 'Teléfono') icon.innerHTML = ICONS.phone;
    if (label === 'WhatsApp') icon.innerHTML = ICONS.message;
    if (label === 'Email') icon.innerHTML = ICONS.mail;
  });
}

function markConversionLinks() {
  document.querySelectorAll('a[href^="tel:"]').forEach(link => link.dataset.conversion = 'phone');
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(link => link.dataset.conversion = 'whatsapp');
  document.querySelectorAll('a[href*="google.com/maps/dir"]').forEach(link => link.dataset.conversion = 'directions');
  document.querySelectorAll('[data-conversion]').forEach(link => {
    link.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('silera:conversion', { detail: { action: link.dataset.conversion } }));
    });
  });
}

const programDialog = createProgramDialog();
const galleryDialog = createGalleryDialog();
enhanceProgramCards(programDialog);
initProgramFinder(programDialog);
enhanceGallery(galleryDialog);
initPhoneField();
enhanceContentIcons();
enhancePrimaryIcons();
markConversionLinks();

window.SileraPrograms = Object.freeze(PROGRAMS.map(program => ({ ...program })));
