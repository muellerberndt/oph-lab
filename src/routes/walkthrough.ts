import {
    BookOpen,
    Lightbulb,
    Eye,
    Globe,
    Shield,
    Flame,
    Link,
    Orbit,
    Clock,
    Apple,
    Telescope,
    Moon,
    Atom,
    Zap,
    Lock,
    Layers,
    Box,
    Scale,
    Merge,
    Target,
    Infinity,
    Search,
    Library,
    type LucideIcon,
} from 'lucide-react';

export type PartId = 'foundation' | 'chain1-gr' | 'chain2-qft' | 'predictions' | 'reference';

export type WalkthroughStep = {
    to: string;
    label: string;
    icon: LucideIcon;
    part: PartId;
    seoTitle: string;
};

export const PART_LABELS: Record<PartId, string> = {
    'foundation': 'Foundation',
    'chain1-gr': 'Chain 1: Axioms \u2192 General Relativity',
    'chain2-qft': 'Chain 2: Axioms \u2192 Quantum Field Theory',
    'predictions': 'Predictions & Synthesis',
    'reference': 'Reference',
};

export const PART_COLORS: Record<PartId, string> = {
    'foundation': 'var(--accent-gold)',
    'chain1-gr': 'var(--accent-rose)',
    'chain2-qft': 'var(--accent-blue)',
    'predictions': 'var(--accent-green)',
    'reference': 'var(--text-muted)',
};

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
    // Foundation
    { to: '/', icon: BookOpen, label: 'Introduction', part: 'foundation', seoTitle: 'OPH Lab — Current Theorem Surface, Branches, and Open Scaffolds' },
    { to: '/hints/', icon: Lightbulb, label: 'Five Hints', part: 'foundation', seoTitle: 'Five Experimental Hints That Reality Is Not What It Seems' },
    { to: '/no-objective-reality/', icon: Eye, label: 'No Objective Reality', part: 'foundation', seoTitle: 'Why There Is No Objective Reality — The 10 Hardest Questions in Physics' },
    { to: '/the-screen/', icon: Globe, label: 'The Holographic Screen', part: 'foundation', seoTitle: 'The Holographic Screen — How a 2D Sphere Creates 3D Spacetime' },
    { to: '/axioms/', icon: Shield, label: 'Core Axioms + MAR', part: 'foundation', seoTitle: 'Core Axioms and MAR (Axiom 5) in the Current OPH Ledger' },

    // Chain 1: Axioms -> General Relativity
    { to: '/entropy/', icon: Flame, label: 'Entropy & Area Bound', part: 'chain1-gr', seoTitle: 'Entropy & the Holographic Principle — From Bits to Black Holes' },
    { to: '/entanglement-geometry/', icon: Link, label: 'Entanglement \u2192 Geometry', part: 'chain1-gr', seoTitle: 'How Entanglement Creates Geometry — The Ryu-Takayanagi Formula' },
    { to: '/lorentz/', icon: Orbit, label: 'Lorentz from the Screen', part: 'chain1-gr', seoTitle: 'Lorentz Kinematics on the OPH Screen and BW Branch' },
    { to: '/modular-flow/', icon: Clock, label: 'Time from Modular Flow', part: 'chain1-gr', seoTitle: 'Modular Flow on the OPH BW Branch' },
    { to: '/gravity/', icon: Apple, label: 'Gravity from Entanglement', part: 'chain1-gr', seoTitle: 'Conditional Gravity Branch from Entanglement and Null-Modular Data' },
    { to: '/de-sitter/', icon: Telescope, label: 'The de Sitter Universe', part: 'chain1-gr', seoTitle: 'Solving the Cosmological Constant Problem — de Sitter Space from Holography' },
    { to: '/dark-matter/', icon: Moon, label: 'Dark Matter', part: 'chain1-gr', seoTitle: 'Dark Matter & MOND Explained — Galaxy Rotation Curves from Holography' },
    { to: '/classical-physics/', icon: Orbit, label: 'Classical Physics Emerges', part: 'chain1-gr', seoTitle: 'How Classical Physics Emerges from Quantum Gravity' },

    // Chain 2: Axioms -> QFT
    { to: '/quantum-mechanics/', icon: Atom, label: 'QM from Consistency', part: 'chain2-qft', seoTitle: 'Why Quantum Mechanics? Deriving the Born Rule from First Principles' },
    { to: '/entanglement/', icon: Zap, label: 'Bell & Entanglement', part: 'chain2-qft', seoTitle: 'Bell\u2019s Theorem & Quantum Entanglement — Interactive Simulator' },
    { to: '/error-correction/', icon: Lock, label: 'Quantum Error Correction', part: 'chain2-qft', seoTitle: 'Spacetime as Quantum Error Correcting Code — HaPPY Code Explained' },
    { to: '/gauge-symmetry/', icon: Layers, label: 'Gauge from Gluing', part: 'chain2-qft', seoTitle: 'Origin of Gauge Symmetry — Why SU(3)\u00d7SU(2)\u00d7U(1)?' },
    { to: '/standard-model/', icon: Box, label: 'The Standard Model', part: 'chain2-qft', seoTitle: 'Deriving the Standard Model — Particle Physics from Holography' },
    { to: '/masses/', icon: Scale, label: 'Matter Continuations', part: 'chain2-qft', seoTitle: 'Matter Continuations — Current OPH Sector Status' },
    { to: '/unification/', icon: Merge, label: 'Coupling Unification', part: 'chain2-qft', seoTitle: 'Grand Unification Without GUTs — Coupling Constant Convergence' },
    { to: '/qft-emerges/', icon: Atom, label: 'QFT Emerges', part: 'chain2-qft', seoTitle: 'How Quantum Field Theory Emerges from a Holographic Screen' },

    // Predictions & Synthesis
    { to: '/predictions/', icon: Target, label: 'Testable Predictions', part: 'predictions', seoTitle: 'Testable Predictions of Quantum Gravity — Gravitational Wave Signatures' },
    { to: '/synthesis/', icon: Infinity, label: 'Two Parameters, All of Physics', part: 'predictions', seoTitle: 'OPH Synthesis — Structural Results, Branches, and Continuation Lanes' },

    // Reference
    { to: '/glossary/', icon: Search, label: 'Glossary', part: 'reference', seoTitle: 'Quantum Gravity & Holography Glossary — Key Terms Explained' },
    { to: '/resources/', icon: Library, label: 'Further Reading', part: 'reference', seoTitle: 'Further Reading — OPH Papers, Book, Challenge, and Study Resources' },
];
