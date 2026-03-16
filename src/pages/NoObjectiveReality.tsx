import { useMemo, type KeyboardEvent } from 'react';
import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

interface Question {
    problem: string;
    conventional: string;
    hiddenAssumption: string;
    ophResolution: string;
}

const QUESTIONS: Question[] = [
    {
        problem: 'How do gravity and QM fit together?',
        conventional: 'Try to quantize the gravitational field. Leads to non-renormalizable infinities.',
        hiddenAssumption: 'Spacetime is fundamental and must be quantized.',
        ophResolution: 'Spacetime is emergent from information. Gravity = consistency condition on entanglement. Einstein\'s equations are derived, not quantized.',
    },
    {
        problem: 'The measurement problem',
        conventional: 'Wave function collapses upon observation. Nobody agrees on what triggers collapse.',
        hiddenAssumption: 'A God\'s-eye view exists where the wave function is "really" in superposition.',
        ophResolution: 'There is no God\'s-eye view. "Collapse" is just belief-updating within a patch. Born probabilities are the unique consistent assignment.',
    },
    {
        problem: 'Why is the universe so uniform?',
        conventional: 'Distant regions had no causal contact but have the same temperature. Invoke inflation.',
        hiddenAssumption: 'Non-uniformity is the default; uniformity needs explaining.',
        ophResolution: 'Uniformity IS the default (MaxEnt). Non-uniformity needs explaining, not the other way around.',
    },
    {
        problem: 'Where is all the supersymmetry?',
        conventional: 'MSSM predicts superpartner particles. None found at the LHC.',
        hiddenAssumption: 'MSSM-like beta functions require superpartner particles.',
        ophResolution: 'Edge modes at patch boundaries produce the same beta-function shifts. Same math, no particles.',
    },
    {
        problem: 'The cosmological constant problem',
        conventional: 'QFT predicts vacuum energy 10\u00b9\u00b2\u2070 times too large.',
        hiddenAssumption: 'Vacuum energy gravitates like other energy.',
        ophResolution: 'Gravity is derived from null surfaces. Vacuum energy is null-blind (T\u2096\u2096 = 0). \u039b comes from screen capacity, not vacuum energy. The 120-order discrepancy was never real.',
    },
    {
        problem: 'The dark matter problem',
        conventional: 'Galaxy rotation curves are flat. Add invisible massive particles.',
        hiddenAssumption: 'Extra gravitational pull must come from extra matter.',
        ophResolution: 'Markov imperfection (information deficit at large scales) mimics extra gravity. MOND scale a\u2080 derived from \u039b. No particles needed.',
    },
    {
        problem: 'Black hole information paradox',
        conventional: 'Information seems to be destroyed when it falls into a black hole.',
        hiddenAssumption: 'Inside and outside the black hole are independent subsystems.',
        ophResolution: 'They\'re not independent. The interior is encoded in boundary data. Information comes out because finite capacity leaves nowhere else for it to go.',
    },
    {
        problem: 'Why three generations?',
        conventional: 'The Standard Model has 3 copies of each fermion type. No explanation why.',
        hiddenAssumption: 'Generation count is a free parameter.',
        ophResolution: 'CP violation requires \u2265 3. UV stability (asymptotic freedom) allows \u2264 5. Minimality selects exactly 3.',
    },
    {
        problem: 'Proton stability',
        conventional: 'Grand Unified Theories predict proton decay. Never observed.',
        hiddenAssumption: 'Forces were unified in a simple group that was then broken.',
        ophResolution: 'OPH has a product gauge group from the start (from patch gluing), not a simple group. No leptoquark bosons, no proton decay.',
    },
    {
        problem: 'The hard problem of consciousness',
        conventional: 'How does subjective experience arise from objective physical processes?',
        hiddenAssumption: 'Objective reality is primary; subjectivity must be derived from it.',
        ophResolution: 'Subjectivity is the starting point. Every description is already a view from somewhere. The "hard problem" dissolves: there is no objective reality for experience to "arise from."',
    },
];

export function NoObjectiveRealityPage() {
    const [flippedIndices, setFlippedIndices] = useLabSetting('noObjective.flippedIndices');
    const { resetKeys } = useLabState();
    const flippedSet = useMemo(() => new Set(flippedIndices), [flippedIndices]);

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
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>No Objective Reality</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                The deepest insight of OPH is also the simplest: <strong>there is no God's-eye view</strong>.
                Every piece of evidence you have for an "objective world" is itself a subjective experience.
                You've never stepped outside your perspective to verify that reality exists independently.
            </p>
            <p style={{ marginBottom: '16px' }}>
                What you call "objective" is actually <em>intersubjective</em>: the consistent overlap of many viewpoints.
                OPH takes this seriously. Reality IS the process of making observations between observers consistent.
            </p>
            <p style={{ marginBottom: '32px', color: 'var(--text-muted)', fontSize: '0.9em' }}>
                Every major puzzle in physics contains a hidden assumption. Use <strong>Reveal OPH Resolution</strong> on each card.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <button
                    className="btn btn-ghost"
                    style={{ fontSize: '0.72em', padding: '4px 10px' }}
                    onClick={() => resetKeys(['noObjective.flippedIndices'])}
                >
                    Reset Flipped Cards
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {QUESTIONS.map((q, i) => {
                    const isFlipped = flippedSet.has(i);
                    return (
                    <div
                        key={i}
                        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
                        onClick={() => toggle(i)}
                        onKeyDown={(event) => handleCardKeyDown(event, i)}
                        role="button"
                        tabIndex={0}
                        aria-label={`${q.problem}: ${isFlipped ? 'show hidden assumption side' : 'show OPH resolution side'}`}
                    >
                        <div className="flip-card-inner" style={{ minHeight: '220px' }}>
                            <div className="flip-card-front" style={{ padding: '16px' }}>
                                <div style={{ fontSize: '0.65em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-rose)', marginBottom: '6px' }}>
                                    The Problem
                                </div>
                                <h4 style={{ fontSize: '0.9em', margin: '0 0 8px 0' }}>{q.problem}</h4>
                                <p style={{ fontSize: '0.8em', margin: '0 0 8px 0' }}>{q.conventional}</p>
                                <div style={{ fontSize: '0.75em', color: 'var(--accent-amber)' }}>
                                    Hidden assumption: {q.hiddenAssumption}
                                </div>
                                <div className="flip-action-row">
                                    <span className="flip-cue">Front side</span>
                                    <button
                                        className="flip-action-btn"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            toggle(i);
                                        }}
                                    >
                                        Reveal OPH Resolution
                                    </button>
                                </div>
                            </div>
                            <div className="flip-card-back" style={{ padding: '16px' }}>
                                <div style={{ fontSize: '0.65em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-green)', marginBottom: '6px' }}>
                                    OPH Resolution
                                </div>
                                <h4 style={{ fontSize: '0.9em', margin: '0 0 8px 0' }}>{q.problem}</h4>
                                <p style={{ fontSize: '0.8em', margin: 0 }}>{q.ophResolution}</p>
                                <div className="flip-action-row">
                                    <span className="flip-cue">Back side</span>
                                    <button
                                        className="flip-action-btn"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            toggle(i);
                                        }}
                                    >
                                        Back to Problem
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )})}
            </div>

            <Explainer title="The ether move">
                <p>
                    Each resolution follows the same pattern &mdash; what Bernhard Mueller calls "the ether move."
                    In 1905, Einstein didn't solve the ether problem; he dissolved it by removing a false assumption
                    (absolute space). OPH applies the same move to a dozen problems simultaneously: remove the
                    assumption of objective reality, and the puzzles evaporate.
                </p>
            </Explainer>
        </div>
    );
}
