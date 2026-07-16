export const PROGRAMS = [
  {
    id: 'maternal',
    title: 'Maternal',
    ageLabel: '0–2 años',
    minAge: 0,
    maxAge: 2,
    schedule: 'Consulta el horario y la disponibilidad directamente con Silera.',
    description: 'Estimulación temprana y cuidado cercano durante los primeros años.',
    features: ['Estimulación sensorial', 'Desarrollo del lenguaje', 'Socialización temprana'],
    icon: 'baby'
  },
  {
    id: 'pre-kinder',
    title: 'Pre-Kínder',
    ageLabel: '3–4 años',
    minAge: 3,
    maxAge: 4,
    schedule: 'Jornada regular de lunes a viernes; confirma el horario vigente.',
    description: 'Juego estructurado y actividades para fortalecer habilidades cognitivas, emocionales y sociales.',
    features: ['Lectoescritura inicial', 'Pensamiento lógico-matemático', 'Arte, valores y convivencia'],
    icon: 'blocks'
  },
  {
    id: 'kinder',
    title: 'Kínder',
    ageLabel: '5 años',
    minAge: 5,
    maxAge: 5,
    schedule: 'Jornada regular de lunes a viernes; confirma el horario vigente.',
    description: 'Preparación académica y social para iniciar la primaria con una base sólida.',
    features: ['Lectura y escritura básica', 'Inglés introductorio', 'Matemáticas iniciales'],
    icon: 'palette'
  },
  {
    id: 'preparacion-escolar',
    title: 'Preparación Escolar',
    ageLabel: '5–6 años',
    minAge: 5,
    maxAge: 6,
    schedule: 'Consulta la modalidad y el horario disponibles para el período actual.',
    description: 'Refuerzo de habilidades clave para facilitar la transición a la escuela primaria.',
    features: ['Comprensión lectora', 'Habilidades numéricas', 'Independencia y autonomía'],
    icon: 'book'
  },
  {
    id: 'actividades-extracurriculares',
    title: 'Actividades Extracurriculares',
    ageLabel: 'Según actividad',
    minAge: 0,
    maxAge: 6,
    schedule: 'Las actividades y sus horarios pueden cambiar; consulta la oferta vigente.',
    description: 'Talleres que complementan el desarrollo integral mediante movimiento, música y expresión.',
    features: ['Música y movimiento', 'Actividades físicas', 'Teatro y expresión'],
    icon: 'music',
    secondary: true
  },
  {
    id: 'cuido-extendido',
    title: 'Cuido Extendido',
    ageLabel: 'Según cupo',
    minAge: 0,
    maxAge: 6,
    schedule: 'Hasta las 6:00 PM, sujeto a disponibilidad y confirmación del centro.',
    description: 'Acompañamiento adicional para las familias que necesitan ampliar la jornada.',
    features: ['Lunes a viernes', 'Horario extendido sujeto a cupo', 'Consulta alimentación y condiciones'],
    icon: 'clock',
    secondary: true
  }
];

export function findPrograms(age, needsExtended = false) {
  const numericAge = Number(age);
  const matches = PROGRAMS.filter(program =>
    !program.secondary && numericAge >= program.minAge && numericAge <= program.maxAge
  );

  if (needsExtended) {
    const extended = PROGRAMS.find(program => program.id === 'cuido-extendido');
    if (extended) matches.push(extended);
  }

  return matches;
}

export function getProgramByTitle(title) {
  return PROGRAMS.find(program => program.title === title.trim());
}
