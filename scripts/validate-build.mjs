import { existsSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const html = readFileSync(resolve(dist, 'index.html'), 'utf8');
const localResources = [...html.matchAll(/(?:src|href|content)="(\.?\/?assets\/[^"]+)"/g)]
  .map(match => match[1].replace(/^\.\//, '').replace(/^\//, ''));
const missing = [...new Set(localResources.filter(resource => !existsSync(resolve(dist, resource))))];

if (missing.length) {
  console.error(`Recursos faltantes en dist: ${missing.join(', ')}`);
  process.exit(1);
}

console.log(JSON.stringify({ status: 'ok', resources: new Set(localResources).size }));
