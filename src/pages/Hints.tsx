import { useMemo, type KeyboardEvent } from 'react';
import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

interface Hint {
    title: string;
    intuition: string;
    reality: string;
    detail: string;
}

const HINTS: Hint[] = [
    {
        title: '1. The Speed of Light Is Invariant',
        intuition: 'Speeds add up. If you throw a ball from a moving train, the ball moves faster relative to the ground.',
        reality: 'Light travels at c regardless of the observer\'s motion. Michelson-Morley (1887) found no luminiferous ether. Einstein took the hint: space and time are not what they seem.',
        detail: 'This led to special relativity: time dilates, lengths contract, and simultaneity is relative. The deeper lesson is that spacetime geometry depends on the observer\'s state of motion.',
    },
    {
        title: '2. Observation Changes the Outcome',
        intuition: 'Objects have definite properties whether or not anyone looks. The moon is there even when nobody is watching.',
        reality: 'In the double-slit experiment, particles behave as waves when unobserved but as particles when measured. The act of observation is part of the physics.',
        detail: 'Quantum mechanics says properties don\'t exist until measured. Bell\'s theorem (1964) proved this isn\'t just ignorance: no local hidden variable theory can reproduce quantum predictions.',
    },
    {
        title: '3. Information Lives on Surfaces',
        intuition: 'Information fills volume. A bigger box holds more stuff. A bigger hard drive stores more data.',
        reality: 'Bekenstein and Hawking showed that a black hole\'s entropy (information content) scales with its surface area, not its volume: S = A/(4l\u209a\u00b2).',
        detail: 'The holographic principle generalizes this: the maximum information in any region is bounded by its boundary area in Planck units. The universe is, in a deep sense, two-dimensional.',
    },
    {
        title: '4. Entanglement Is Real',
        intuition: 'Correlations between distant particles must come from a shared cause in their common past.',
        reality: 'Quantum entanglement produces correlations that exceed any classical bound (Bell inequality: S \u2264 2, but quantum mechanics gives S = 2\u221a2 \u2248 2.83). No local explanation works.',
        detail: 'These correlations are not signals (no faster-than-light communication). They are structural: the world is fundamentally nonlocal in its correlations, even though it\'s local in its dynamics.',
    },
    {
        title: '5. The Universe Is Fine-Tuned',
        intuition: 'The laws of physics just are what they are. There\'s nothing to explain about the values of fundamental constants.',
        reality: 'The parameters of physics appear suspiciously tuned for complexity. Tiny changes to quark masses, coupling constants, or the cosmological constant would make atoms, stars, or chemistry impossible.',
        detail: 'This is the fine-tuning problem. OPH dissolves it: the parameters aren\'t inputs to be tuned but outputs of consistency conditions. They have the values they do because no other values are self-consistent.',
    },
];

export function HintsPage() {
    const [flippedIndices, setFlippedIndices] = useLabSetting('hints.flippedIndices');
    const { resetKeys } = useLabState();
    const flipped = useMemo(() => new Set(flippedIndices), [flippedIndices]);

    const toggle = (i: number) => {
        setFlippedIndices(previous => {
            const next = new Set(previous);
            if (next.has(i)) next.delete(i); else next.add(i);
            return Array.from(next.values()).sort((a, b) => a - b);
        });
    };

    const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>, index: number) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle(index);
        }
    };

    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Foundation</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Five Hints That Broke Physics</h1>
            </div>

            <p style={{ marginBottom: '24px' }}>
                Over the past century, five experimental discoveries shattered our intuitive picture of reality.
                Each one is a hint that the conventional framework, objective reality existing in a spacetime container, is wrong.
            </p>

            <p style={{ marginBottom: '32px', color: 'var(--text-muted)', fontSize: '0.9em' }}>
                Use the <strong>Reveal Reality</strong> button on each card (or press Enter/Space when focused).
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button
                    className="btn btn-ghost"
                    style={{ fontSize: '0.72em', padding: '4px 10px' }}
                    onClick={() => resetKeys(['hints.flippedIndices'])}
                >
                    Reset Flipped Cards
                </button>
            </div>

            {HINTS.map((hint, i) => {
                const isFlipped = flipped.has(i);
                return (
                    <div
                        key={i}
                        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => toggle(i)}
                        onKeyDown={(event) => handleCardKeyDown(event, i)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${hint.title}: ${isFlipped ? 'show intuition side' : 'reveal reality side'}`}
                        style={{ marginBottom: '16px' }}
                    >
                    <div className="flip-card-inner">
                        <div className="flip-card-front">
                            <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                                Intuition
                            </div>
                            <h3 style={{ fontSize: '1em', margin: '0 0 12px 0' }}>{hint.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>{hint.intuition}</p>
                            <div className="flip-action-row">
                                <span className="flip-cue">Front side</span>
                                <button
                                    className="flip-action-btn"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        toggle(i);
                                    }}
                                >
                                    Reveal Reality
                                </button>
                            </div>
                        </div>
                        <div className="flip-card-back">
                            <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-green)', marginBottom: '8px' }}>
                                Reality
                            </div>
                            <h3 style={{ fontSize: '1em', margin: '0 0 12px 0' }}>{hint.title}</h3>
                            <p style={{ margin: 0, fontSize: '0.9em' }}>{hint.reality}</p>
                            <div className="flip-action-row">
                                <span className="flip-cue">Back side</span>
                                <button
                                    className="flip-action-btn"
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        toggle(i);
                                    }}
                                >
                                    Back to Intuition
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                );
            })}

            <Explainer title="The deeper pattern">
                <p>
                    Each hint points in the same direction: the conventional picture assumes an objective, observer-independent reality
                    existing in a spacetime container. But experiments keep showing that observers, information,
                    and boundaries are more fundamental than the "stuff" inside.
                </p>
                <p>
                    OPH takes these hints seriously and builds a framework where observer patches on a holographic screen
                    are the starting point: not spacetime, not particles, not fields.
                </p>
            </Explainer>
        </div>
    );
}
