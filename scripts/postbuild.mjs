import { cp, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const indexHtml = path.join(distDir, 'index.html');

const routes = [
  'hints',
  'no-objective-reality',
  'the-screen',
  'axioms',
  'entropy',
  'entanglement-geometry',
  'lorentz',
  'modular-flow',
  'gravity',
  'de-sitter',
  'dark-matter',
  'classical-physics',
  'quantum-mechanics',
  'entanglement',
  'error-correction',
  'gauge-symmetry',
  'standard-model',
  'masses',
  'unification',
  'qft-emerges',
  'predictions',
  'synthesis',
  'glossary',
  'resources',
];

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  await mkdir(routeDir, { recursive: true });
  await cp(indexHtml, path.join(routeDir, 'index.html'));
}
