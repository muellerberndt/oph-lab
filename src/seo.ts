import { WALKTHROUGH_STEPS } from './routes/walkthrough';

export type SeoMeta = {
  title: string;
  description: string;
};

const DEFAULT_DESCRIPTION =
  'Interactive guide to OPH: exact finite results, branch conditions, exploratory simulator receipts, physical attachments not derived by those results, and primary paper links.';

const DEFAULT_TITLE = 'OPH Lab | Research Status and Interactive Derivations';
const SITE_SUFFIX = ' | OPH Lab';

const ROUTE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Explore the OPH research surface: self-reading observer patches, exact finite results, conditional gravity and gauge branches, physical bridges not supplied by those results, and exploratory simulator receipts.',
  '/hints': 'Review the experimental and conceptual clues that motivate Observer Patch Holography as a deeper account of physical reality.',
  '/no-objective-reality': 'Explore the operational OPH starting point: physical descriptions are observer-local records, without treating that modeling choice as a proof of a final ontology.',
  '/the-screen': 'Learn how OPH models a holographic screen, uses local patches to test a conditional route to spacetime structure, and reads the S0 to S3 sphere ladder as a role map.',
  '/axioms': 'See the three OPH axioms, the declared sector completions, the physical identifications they do not supply, and the technical premises used by the papers.',
  '/entropy': 'Follow the entropy and area-bound intuition that connects finite information capacity to holographic physics.',
  '/entanglement-geometry': 'Understand how entanglement structure enters the conditional OPH geometry-reconstruction branch and which physical attachment it does not supply.',
  '/lorentz': 'Study the OPH route from screen-local consistency to Lorentz symmetry and relativistic structure.',
  '/modular-flow': 'See how modular flow enters the explicit Bisognano-Wichmann branch without promoting the branch assumptions into unconditional results.',
  '/gravity': 'Trace the conditional OPH gravity branch from generalized entropy and null-modular data to the Jacobson-type Einstein relation.',
  '/de-sitter': 'Explore the OPH cosmic-capacity closure boundary, the bounded generation-register counterfamily, the non-evaluable direct N closure, and two conditional reserve candidates.',
  '/dark-matter': 'Review the OPH discussion of dark-matter-style phenomena, galaxy rotation curves, and MOND-like behavior.',
  '/classical-physics': 'Follow the classical limits of the conditional OPH gravity branch and the thermodynamic, dimension, clock, and cosmological attachments it requires.',
  '/quantum-mechanics': 'Inspect the OPH quantum-algebraic basis: quantum mechanics is the algebraic information language used by the reconstruction program.',
  '/entanglement': 'Use the entanglement lesson to connect Bell-style correlations and the OPH observer-consistency story.',
  '/error-correction': 'Learn how quantum error correction ideas fit into the OPH account of spacetime and holography.',
  '/gauge-symmetry': 'See how gauge symmetry is framed as a gluing phenomenon in the OPH reconstruction.',
  '/standard-model': 'Review the OPH route toward Standard Model structure as emergent effective physics and its connection to the Standard Model unified with gravity search route.',
  '/masses': 'Review the OPH matter-sector surface, including the capacity-electroweak hierarchy bridge, Higgs/top split, and downstream continuation lanes.',
  '/neutrinos': 'Audit the rejected target-informed OPH weighted-cycle neutrino candidate, its NuFIT 6.1 correlated-profile failure, basis and Takagi defects, and the source-closure gates required before any physical neutrino prediction.',
  '/unification': 'Inspect the coupling-unification lesson and the OPH account of apparent grand-unification patterns, Standard Model plus gravity, and broader physics unification.',
  '/qft-emerges': 'Inspect the common free-scalar continuum and quantum-detector comparison, the declared local gauge action, and the physical interacting-field assumptions.',
  '/consensus-protocol': 'Explore OPH as observer-based fixed-point consensus: overlap repair, Lyapunov descent, schedule-independent normal form, controlled coarse-graining, holonomy obstructions, and record stability.',
  '/screen-microphysics': 'Inspect the federated patch-carrier architecture used by OPH to model records, measurement, checkpoint/restoration, public hardware evidence, and observer synchronization.',
  '/predictions': 'Inspect the frozen primitive twelve-port degree-six branch, its exact coefficient ratios, unarmed comparison boundary, and other OPH pressure tests.',
  '/synthesis': 'See how OPH connects exact finite results, declared branch conditions, exploratory receipts, and the physical attachments those results require.',
  '/glossary': 'Use the OPH Lab glossary for concise definitions of the core holography, gravity, and quantum-information terms.',
  '/resources': 'Find the OPH paper stack, guided Learn chapters, book, simulator receipts, challenge, and supporting technical resources.',
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
