import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
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
  'consensus-protocol',
  'screen-microphysics',
  'predictions',
  'synthesis',
  'glossary',
  'resources',
];

const routeMeta = {
  hints: {
    title: 'Five Experimental Hints That Reality Is Not What It Seems | OPH Lab',
    description:
      'Review the experimental and conceptual clues that motivate Observer Patch Holography as a deeper account of physical reality.',
  },
  'no-objective-reality': {
    title: 'Why There Is No Objective Reality - The 10 Hardest Questions in Physics | OPH Lab',
    description:
      'Explore the argument that physics should be built from observer-local descriptions instead of a single objective frame.',
  },
  'the-screen': {
    title: 'The Holographic Screen - How a 2D Sphere Creates 3D Spacetime | OPH Lab',
    description:
      'Learn how OPH models reality on a holographic screen and uses local patches to recover spacetime structure.',
  },
  axioms: {
    title: 'Core Axioms and MAR (Axiom 5) for a Theory of Everything - Observer Patch Holography | OPH Lab',
    description:
      'See the five core OPH axioms, including MAR, and how they anchor the derivation program.',
  },
  entropy: {
    title: 'Entropy & the Holographic Principle - From Bits to Black Holes | OPH Lab',
    description:
      'Follow the entropy and area-bound intuition that connects finite information capacity to holographic physics.',
  },
  'entanglement-geometry': {
    title: 'How Entanglement Creates Geometry - The Ryu-Takayanagi Formula | OPH Lab',
    description:
      'Understand how entanglement structure gives rise to geometry in the OPH reconstruction program.',
  },
  lorentz: {
    title: 'Deriving Special Relativity from the Holographic Screen | OPH Lab',
    description:
      'Study the OPH route from screen-local consistency to Lorentz symmetry and relativistic structure.',
  },
  'modular-flow': {
    title: 'The Origin of Time - Modular Flow and the Unruh Effect | OPH Lab',
    description:
      'See how modular flow contributes an emergent account of time in the OPH framework.',
  },
  gravity: {
    title: 'Deriving Einstein\'s Equations from Entanglement - Emergent Gravity | OPH Lab',
    description:
      'Trace the OPH argument from entanglement and consistency constraints to emergent gravitational dynamics.',
  },
  'de-sitter': {
    title: 'Solving the Cosmological Constant Problem - de Sitter Space from Holography | OPH Lab',
    description:
      'Explore the OPH treatment of de Sitter space, cosmological horizons, and the cosmological constant problem.',
  },
  'dark-matter': {
    title: 'Dark Matter & MOND Explained - Galaxy Rotation Curves from Holography | OPH Lab',
    description:
      'Review the OPH discussion of dark-matter-style phenomena, galaxy rotation curves, and MOND-like behavior.',
  },
  'classical-physics': {
    title: 'How Classical Physics Emerges from Quantum Gravity | OPH Lab',
    description:
      'Follow how classical physics emerges as an effective description of deeper observer-patch dynamics.',
  },
  'quantum-mechanics': {
    title: 'Why Quantum Mechanics? Deriving the Born Rule from First Principles | OPH Lab',
    description:
      'Inspect the OPH argument that quantum mechanics arises from overlap consistency across observers.',
  },
  entanglement: {
    title: 'Bell\'s Theorem & Quantum Entanglement - Interactive Simulator | OPH Lab',
    description:
      'Use the entanglement lesson to connect Bell-style correlations and OPH\'s observer-consistency story.',
  },
  'error-correction': {
    title: 'Spacetime as Quantum Error Correcting Code - HaPPY Code Explained | OPH Lab',
    description:
      'Learn how quantum error correction ideas fit into the OPH account of spacetime and holography.',
  },
  'gauge-symmetry': {
    title: 'Origin of Gauge Symmetry - Why SU(3)xSU(2)xU(1)? | OPH Lab',
    description:
      'See how gauge symmetry is framed as a gluing phenomenon in the OPH reconstruction.',
  },
  'standard-model': {
    title: 'Deriving the Standard Model - Particle Physics from Holography | OPH Lab',
    description:
      'Review the OPH route toward Standard Model structure as emergent effective physics.',
  },
  masses: {
    title: 'Matter-Sector Continuations | OPH Lab',
    description:
      'Review the current OPH discussion of downstream matter-sector continuations and coupling structure.',
  },
  unification: {
    title: 'Grand Unification Without GUTs - Coupling Constant Convergence | OPH Lab',
    description:
      'Inspect the coupling-unification lesson and the OPH account of apparent grand-unification patterns.',
  },
  'qft-emerges': {
    title: 'How Quantum Field Theory Emerges from a Holographic Screen | OPH Lab',
    description:
      'Follow the argument that quantum field theory is an effective layer emerging from deeper screen dynamics.',
  },
  'consensus-protocol': {
    title: 'Reality as a Consensus Protocol - Overlap Repair, Normal Form, and Records | OPH Lab',
    description:
      'Explore the OPH consensus paper: overlap repair, Lyapunov descent, schedule-independent normal form, holonomy obstructions, and record stability.',
  },
  'screen-microphysics': {
    title: 'Screen Microphysics and Observer Synchronization in OPH | OPH Lab',
    description:
      'Inspect the finite screen-register architecture used by OPH to model records, measurement, checkpoint/restoration, and observer synchronization.',
  },
  predictions: {
    title: 'Predictions and Pressure Tests - Current OPH Empirical Surface | OPH Lab',
    description:
      'Review the current OPH pressure-test surface, separating public quantitative rows from continuation-level signatures and still-open phenomenology.',
  },
  synthesis: {
    title: 'OPH Synthesis - Recovered Core, Particles, Consensus, and Observer Machinery | OPH Lab',
    description:
      'See how OPH ties the derivation chain together across structural theorems, branch-conditional gravity results, particles, consensus, and observer machinery.',
  },
  glossary: {
    title: 'Quantum Gravity & Holography Glossary - Key Terms Explained | OPH Lab',
    description:
      'Use the OPH Lab glossary for concise definitions of the core holography, gravity, and quantum-information terms.',
  },
  resources: {
    title: 'Resources - Current OPH Five-Paper Stack and Study Surfaces | OPH Lab',
    description:
      'Find the current five-paper OPH stack, book, study surfaces, challenge, and supporting reading for deeper study of Observer Patch Holography.',
  },
};

function applyRouteMeta(html, canonicalUrl, meta) {
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="title" content="[^"]*" \/>/, `<meta name="title" content="${meta.title}" />`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonicalUrl}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta property="twitter:url" content="[^"]*" \/>/, `<meta property="twitter:url" content="${canonicalUrl}" />`)
    .replace(/<meta property="twitter:title" content="[^"]*" \/>/, `<meta property="twitter:title" content="${meta.title}" />`)
    .replace(/<meta property="twitter:description" content="[^"]*" \/>/, `<meta property="twitter:description" content="${meta.description}" />`)
    .replace('"url": "https://oph-lab.floatingpragma.io/"', `"url": "${canonicalUrl}"`);
}

const rootHtml = await readFile(indexHtml, 'utf8');

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  const routeIndexHtml = path.join(routeDir, 'index.html');
  const canonicalUrl = `https://oph-lab.floatingpragma.io/${route}/`;
  const meta = routeMeta[route];

  await mkdir(routeDir, { recursive: true });
  await cp(indexHtml, routeIndexHtml);
  await writeFile(routeIndexHtml, applyRouteMeta(rootHtml, canonicalUrl, meta));
}
