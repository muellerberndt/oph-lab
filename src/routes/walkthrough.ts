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
    { to: '/', icon: BookOpen, label: 'Introduction', part: 'foundation' },
    { to: '/hints', icon: Lightbulb, label: 'Five Hints', part: 'foundation' },
    { to: '/no-objective-reality', icon: Eye, label: 'No Objective Reality', part: 'foundation' },
    { to: '/the-screen', icon: Globe, label: 'The Holographic Screen', part: 'foundation' },
    { to: '/axioms', icon: Shield, label: 'The Four Axioms', part: 'foundation' },

    // Chain 1: Axioms -> General Relativity
    { to: '/entropy', icon: Flame, label: 'Entropy & Area Bound', part: 'chain1-gr' },
    { to: '/entanglement-geometry', icon: Link, label: 'Entanglement \u2192 Geometry', part: 'chain1-gr' },
    { to: '/lorentz', icon: Orbit, label: 'Lorentz from the Screen', part: 'chain1-gr' },
    { to: '/modular-flow', icon: Clock, label: 'Time from Modular Flow', part: 'chain1-gr' },
    { to: '/gravity', icon: Apple, label: 'Gravity from Entanglement', part: 'chain1-gr' },
    { to: '/de-sitter', icon: Telescope, label: 'The de Sitter Universe', part: 'chain1-gr' },
    { to: '/dark-matter', icon: Moon, label: 'Dark Matter', part: 'chain1-gr' },
    { to: '/classical-physics', icon: Orbit, label: 'Classical Physics Emerges', part: 'chain1-gr' },

    // Chain 2: Axioms -> QFT
    { to: '/quantum-mechanics', icon: Atom, label: 'QM from Consistency', part: 'chain2-qft' },
    { to: '/entanglement', icon: Zap, label: 'Bell & Entanglement', part: 'chain2-qft' },
    { to: '/error-correction', icon: Lock, label: 'Quantum Error Correction', part: 'chain2-qft' },
    { to: '/gauge-symmetry', icon: Layers, label: 'Gauge from Gluing', part: 'chain2-qft' },
    { to: '/standard-model', icon: Box, label: 'The Standard Model', part: 'chain2-qft' },
    { to: '/masses', icon: Scale, label: 'Particle Masses', part: 'chain2-qft' },
    { to: '/unification', icon: Merge, label: 'Coupling Unification', part: 'chain2-qft' },
    { to: '/qft-emerges', icon: Atom, label: 'QFT Emerges', part: 'chain2-qft' },

    // Predictions & Synthesis
    { to: '/predictions', icon: Target, label: 'Testable Predictions', part: 'predictions' },
    { to: '/synthesis', icon: Infinity, label: 'Two Parameters, All of Physics', part: 'predictions' },

    // Reference
    { to: '/glossary', icon: Search, label: 'Glossary', part: 'reference' },
    { to: '/resources', icon: Library, label: 'Further Reading', part: 'reference' },
];
