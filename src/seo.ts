import { WALKTHROUGH_STEPS } from './routes/walkthrough';

export type SeoMeta = {
  title: string;
  description: string;
};

const DEFAULT_DESCRIPTION =
  'Interactive guide to Observer Patch Holography: explore gravity, quantum mechanics, gauge symmetry, and the Standard Model as emergent structure from observer-local information patches.';

const DEFAULT_TITLE = 'OPH Lab — Theory of Everything Interactive Guide';
const SITE_SUFFIX = ' | OPH Lab';

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Interactive guide to Observer Patch Holography: derive relativity, quantum mechanics, and gauge structure from five axioms on a holographic screen.',
  '/hints': 'Review the experimental and conceptual clues that motivate Observer Patch Holography as a deeper account of physical reality.',
  '/no-objective-reality': 'Explore the argument that physics should be built from observer-local descriptions instead of a single objective frame.',
  '/the-screen': 'Learn how OPH models reality on a holographic screen and uses local patches to recover spacetime structure.',
  '/axioms': 'See the five core OPH axioms, including MAR, and how they anchor the derivation program.',
  '/entropy': 'Follow the entropy and area-bound intuition that connects finite information capacity to holographic physics.',
  '/entanglement-geometry': 'Understand how entanglement structure gives rise to geometry in the OPH reconstruction program.',
  '/lorentz': 'Study the OPH route from screen-local consistency to Lorentz symmetry and relativistic structure.',
  '/modular-flow': 'See how modular flow contributes an emergent account of time in the OPH framework.',
  '/gravity': 'Trace the OPH argument from entanglement and consistency constraints to emergent gravitational dynamics.',
  '/de-sitter': 'Explore the OPH treatment of de Sitter space, cosmological horizons, and the cosmological constant problem.',
  '/dark-matter': 'Review the OPH discussion of dark-matter-style phenomena, galaxy rotation curves, and MOND-like behavior.',
  '/classical-physics': 'Follow how classical physics emerges as an effective description of deeper observer-patch dynamics.',
  '/quantum-mechanics': 'Inspect the OPH argument that quantum mechanics arises from overlap consistency across observers.',
  '/entanglement': 'Use the entanglement lesson to connect Bell-style correlations and OPH’s observer-consistency story.',
  '/error-correction': 'Learn how quantum error correction ideas fit into the OPH account of spacetime and holography.',
  '/gauge-symmetry': 'See how gauge symmetry is framed as a gluing phenomenon in the OPH reconstruction.',
  '/standard-model': 'Review the OPH route toward Standard Model structure as emergent effective physics.',
  '/masses': 'Explore the OPH discussion of particle masses, hierarchies, and effective coupling structure.',
  '/unification': 'Inspect the coupling-unification lesson and the OPH account of apparent grand-unification patterns.',
  '/qft-emerges': 'Follow the argument that quantum field theory is an effective layer emerging from deeper screen dynamics.',
  '/predictions': 'Review the empirical and phenomenological predictions highlighted by the OPH research program.',
  '/synthesis': 'See how OPH ties the derivation chain together into one synthesis across gravity, quantum mechanics, and particle physics.',
  '/glossary': 'Use the OPH Lab glossary for concise definitions of the core holography, gravity, and quantum-information terms.',
  '/resources': 'Find the main papers, book, challenge, and supporting reading for deeper study of Observer Patch Holography.',
};

function normalizePathname(pathname: string): string {
  if (!pathname || pathname === '/') {
    return '/';
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function getSeoMeta(pathname: string): SeoMeta {
  const normalized = normalizePathname(pathname);
  const step = WALKTHROUGH_STEPS.find((item) => normalizePathname(item.to) === normalized);

  return {
    title: step ? `${step.seoTitle}${SITE_SUFFIX}` : DEFAULT_TITLE,
    description: ROUTE_DESCRIPTIONS[normalized] ?? DEFAULT_DESCRIPTION,
  };
}

export function getCanonicalUrl(pathname: string): string {
  const normalized = normalizePathname(pathname);

  if (normalized === '/') {
    return 'https://oph-lab.floatingpragma.io/';
  }

  return `https://oph-lab.floatingpragma.io${normalized}/`;
}
