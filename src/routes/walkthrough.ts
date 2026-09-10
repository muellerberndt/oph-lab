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
    GitBranch,
    Cpu,
    Target,
    Infinity as InfinityIcon,
    Search,
    Library,
    type LucideIcon,
} from 'lucide-react';

export type PartId = 'foundation' | 'chain1-gr' | 'chain2-qft' | 'observer-machinery' | 'predictions' | 'reference';

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
    'observer-machinery': 'Consensus & Observers',
    'predictions': 'Predictions & Synthesis',
    'reference': 'Reference',
};

export const PART_COLORS: Record<PartId, string> = {
    'foundation': 'var(--accent-gold)',
    'chain1-gr': 'var(--accent-rose)',
    'chain2-qft': 'var(--accent-blue)',
    'observer-machinery': 'var(--accent-purple)',
    'predictions': 'var(--accent-green)',
    'reference': 'var(--text-muted)',
};

export const WALKTHROUGH_STEPS: WalkthroughStep[] = [
    // Foundation
    { to: '/', icon: BookOpen, label: 'Research Status', part: 'foundation', seoTitle: 'OPH Lab | Research Status and Interactive Derivations' },
    { to: '/hints/', icon: Lightbulb, label: 'Five Hints', part: 'foundation', seoTitle: 'Five Experimental Hints That Reality Is Not What It Seems' },
    { to: '/no-objective-reality/', icon: Eye, label: 'Observer-Local Reality', part: 'foundation', seoTitle: 'Observer-Local Reality | An Operational OPH Starting Point' },
    { to: '/the-screen/', icon: Globe, label: 'The Holographic Screen', part: 'foundation', seoTitle: 'The Holographic Screen | OPH Carrier and Spacetime Boundary' },
    { to: '/axioms/', icon: Shield, label: 'The Three Axioms', part: 'foundation', seoTitle: 'The Three OPH Axioms and Declared Completions in the OPH Ledger' },

    // Chain 1: Axioms -> General Relativity
    { to: '/entropy/', icon: Flame, label: 'Entropy & Area Bound', part: 'chain1-gr', seoTitle: 'Entropy & the Holographic Principle | From Bits to Black Holes' },
    { to: '/entanglement-geometry/', icon: Link, label: 'Entanglement \u2192 Geometry', part: 'chain1-gr', seoTitle: 'Entanglement and the Geometry Reconstruction Branch' },
    { to: '/lorentz/', icon: Orbit, label: 'Lorentz from the Screen', part: 'chain1-gr', seoTitle: 'Lorentz Kinematics on the OPH Screen and BW Branch' },
    { to: '/modular-flow/', icon: Clock, label: 'Time from Modular Flow', part: 'chain1-gr', seoTitle: 'Modular Flow on the OPH BW Branch' },
    { to: '/gravity/', icon: Apple, label: 'Gravity from Entanglement', part: 'chain1-gr', seoTitle: 'Conditional Gravity Branch from Entanglement and Null-Modular Data' },
    { to: '/de-sitter/', icon: Telescope, label: 'The de Sitter Universe', part: 'chain1-gr', seoTitle: 'Cosmic Capacity Closure Boundary | de Sitter Space in OPH' },
    { to: '/dark-matter/', icon: Moon, label: 'Dark-Sector Benchmark', part: 'chain1-gr', seoTitle: 'Dark-Sector Continuation | MOND and Rotation-Curve Benchmark' },
    { to: '/classical-physics/', icon: Orbit, label: 'Classical Limits', part: 'chain1-gr', seoTitle: 'Classical Limits of the Conditional OPH Gravity Branch' },

    // Chain 2: Axioms -> QFT
    { to: '/quantum-mechanics/', icon: Atom, label: 'QM in OPH', part: 'chain2-qft', seoTitle: 'Quantum Mechanics in OPH | Algebraic Boundary and Record Probabilities' },
    { to: '/entanglement/', icon: Zap, label: 'Bell & Entanglement', part: 'chain2-qft', seoTitle: 'Bell\u2019s Theorem & Quantum Entanglement | Interactive Simulator' },
    { to: '/error-correction/', icon: Lock, label: 'Quantum Error Correction', part: 'chain2-qft', seoTitle: 'Quantum Error Correction on the OPH Recovery Branch' },
    { to: '/gauge-symmetry/', icon: Layers, label: 'Gauge from Gluing', part: 'chain2-qft', seoTitle: 'Gauge Reconstruction from Patch Gluing | OPH' },
    { to: '/standard-model/', icon: Box, label: 'Standard Model Structure', part: 'chain2-qft', seoTitle: 'Standard Model Structure | Exact Results and Required Physical Attachments' },
    { to: '/masses/', icon: Scale, label: 'Matter Continuations', part: 'chain2-qft', seoTitle: 'Matter Continuations | OPH Sector Status' },
    { to: '/neutrinos/', icon: Atom, label: 'Neutrino Audit', part: 'chain2-qft', seoTitle: 'Neutrino Audit | Rejected Weighted-Cycle Candidate and Missing Source Certificates' },
    { to: '/unification/', icon: Merge, label: 'Coupling Unification', part: 'chain2-qft', seoTitle: 'Coupling-Unification Continuation | OPH' },
    { to: '/qft-emerges/', icon: Atom, label: 'QFT Boundary', part: 'chain2-qft', seoTitle: 'QFT Reconstruction Boundary | OPH' },

    // Consensus & observer machinery
    { to: '/consensus-protocol/', icon: GitBranch, label: 'Consensus Protocol', part: 'observer-machinery', seoTitle: 'Reality as a Consensus Protocol | Overlap Repair, Normal Form, and Records' },
    { to: '/screen-microphysics/', icon: Cpu, label: 'Screen Microphysics', part: 'observer-machinery', seoTitle: 'Federated Echosahedral Screen Microphysics in OPH' },

    // Predictions & Synthesis
    { to: '/predictions/', icon: Target, label: 'Prediction Registry', part: 'predictions', seoTitle: 'OPH Prediction Registry | Frozen Branches and Pressure Tests' },
    { to: '/synthesis/', icon: InfinityIcon, label: 'OPH Synthesis', part: 'predictions', seoTitle: 'OPH Synthesis | Closure Targets, Branches, and Continuation Lanes' },

    // Reference
    { to: '/glossary/', icon: Search, label: 'Glossary', part: 'reference', seoTitle: 'Quantum Gravity & Holography Glossary | Key Terms Explained' },
    { to: '/resources/', icon: Library, label: 'Further Reading', part: 'reference', seoTitle: 'Further Reading | OPH Papers, Book, Challenge, and Study Resources' },
];
