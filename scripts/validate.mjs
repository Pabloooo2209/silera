import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROGRAMS, findPrograms } from '../assets/programs-data.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const failures = [];

const matches = (expression) => [...html.matchAll(expression)];
const ids = matches(/\sid="([^"]+)"/g).map(match => match[1]);
const duplicateIds = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
if (duplicateIds.length) failures.push(`IDs duplicados: ${duplicateIds.join(', ')}`);

const internalAnchors = matches(/href="#([^"]+)"/g).map(match => match[1]);
const missingAnchors = [...new Set(internalAnchors.filter(anchor => !ids.includes(anchor)))];
if (missingAnchors.length) failures.push(`Anclas inexistentes: ${missingAnchors.join(', ')}`);

for (const match of matches(/<a\b[^>]*target="_blank"[^>]*>/g)) {
  if (!/rel="[^"]*noopener[^"]*"/.test(match[0])) failures.push(`Enlace externo sin noopener: ${match[0].slice(0, 100)}`);
}

const jsonLd = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!jsonLd) failures.push('Falta JSON-LD');
else {
  try { JSON.parse(jsonLd[1]); } catch { failures.push('JSON-LD inválido'); }
}

for (const asset of [
  'assets/brand-mark.svg',
  'public/assets/social-preview.svg',
  'assets/enhancements.css',
  'assets/core.js',
  'assets/enhancements.js',
  'assets/programs-data.js',
  'manifest.webmanifest',
  'public/robots.txt'
]) {
  if (!existsSync(resolve(root, asset))) failures.push(`Falta el recurso ${asset}`);
}

if (PROGRAMS.length !== 6) failures.push('La oferta de programas no contiene las seis opciones esperadas');
for (const age of [0, 1, 2, 3, 4, 5, 6]) {
  if (!findPrograms(age).length) failures.push(`No existe recomendación para la edad ${age}`);
}

if (!html.includes('id="programFinder"')) failures.push('Falta el orientador de programas');
if (!html.includes('id="pPhone"')) failures.push('Falta el teléfono del formulario');

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(JSON.stringify({
  status: 'ok',
  htmlBytes: Buffer.byteLength(html),
  ids: ids.length,
  internalAnchors: internalAnchors.length,
  programs: PROGRAMS.length
}));
