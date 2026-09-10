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
        ophResolution: 'OPH explores spacetime as a recovered observer-facing structure. A Jacobson-type Einstein relation is obtained on the declared generalized-entropy, null-bridge, projective, and stationarity branch; the physical attachment is conditional.',
    },
    {
        problem: 'The measurement problem',
        conventional: 'Wave function collapses upon observation. Nobody agrees on what triggers collapse.',
        hiddenAssumption: 'A God\'s-eye view exists where the wave function is "really" in superposition.',
        ophResolution: 'The formalism uses patch-relative states and local record conditioning instead of a privileged global readout. Born trace weights and Lüders updates live on declared algebra/instrument surfaces; no source production of the full physical instrument is derived.',
    },
    {
        problem: 'Why is the universe so uniform?',
        conventional: 'Distant regions had no causal contact but have the same temperature. Invoke inflation.',
        hiddenAssumption: 'Non-uniformity is the default; uniformity needs explaining.',
        ophResolution: 'A3 selects the least-informative state inside a fixed compatible constraint family. Turning that local principle into observed cosmological uniformity requires dynamics, initial-state, clock, and cosmological attachment.',
    },
    {
        problem: 'Where is all the supersymmetry?',
        conventional: 'MSSM predicts superpartner particles. None found at the LHC.',
        hiddenAssumption: 'MSSM-like beta functions require superpartner particles.',
        ophResolution: 'The published edge-running surface reproduces MSSM-like beta-shift behavior without introducing a superpartner sector. Physical running, thresholds, and endpoint matching retain their stated premises.',
    },
    {
        problem: 'The cosmological constant problem',
        conventional: 'QFT predicts vacuum energy 10\u00b9\u00b2\u2070 times too large.',
        hiddenAssumption: 'Vacuum energy gravitates like other energy.',
        ophResolution: 'The conditional null-surface branch leaves a metric term undetermined. OPH assigns that term to a separate global capacity lane. An exact bounded generation-register counterfamily is non-identifying, while universal A1–A3 membership is unproved. Direct N is not evaluable and emits no cosmic value. A physical closure requires the same-invariant bridge, a source-selected positive capacity carrier, and horizon-record saturation.',
    },
    {
        problem: 'The dark matter problem',
        conventional: 'Galaxy rotation curves are flat. Add invisible massive particles.',
        hiddenAssumption: 'Extra gravitational pull must come from extra matter.',
        ophResolution: 'Collar recovery is exact on the declared central-interface branch, or conditionally bounded for finite-range Gibbs states with uniform strong matrix mixing. Scalar CMI is recovery-only. The MOND curve is a continuation benchmark; a physical source requires source-tensor, conservation, normalization, and coupling receipts.',
    },
    {
        problem: 'Black hole information paradox',
        conventional: 'Information seems to be destroyed when it falls into a black hole.',
        hiddenAssumption: 'Inside and outside the black hole are independent subsystems.',
        ophResolution: 'OPH treats inside/outside records through a shared boundary and finite-capacity ledger. A complete evaporation, interior reconstruction, and information-release theorem requires the relevant dynamics and readout bridges.',
    },
    {
        problem: 'Why three generations?',
        conventional: 'The Standard Model has 3 copies of each fermion type. No explanation why.',
        hiddenAssumption: 'Generation count is a free parameter.',
        ophResolution: 'On the declared nonempty one-Higgs chiral class, CP capability requires at least 3 and the weak-sector clause bounds the count at 5; the clauses do not select a count inside the window, and three enters as a declared completion.',
    },
    {
        problem: 'Proton stability',
        conventional: 'Grand Unified Theories predict proton decay. Never observed.',
        hiddenAssumption: 'Forces were unified in a simple group that was then broken.',
        ophResolution: 'On the declared product-adjoint branch there is no simple-GUT X/Y generator, so the ordinary X/Y-mediated channel is absent. Other baryon-violating mechanisms are separate.',
    },
    {
        problem: 'The hard problem of consciousness',
        conventional: 'How does subjective experience arise from objective physical processes?',
        hiddenAssumption: 'Objective reality is primary; subjectivity must be derived from it.',
        ophResolution: 'Observer-local description is the starting point: every physical statement is tied to a bounded record-holding patch. This reframes the hard problem, but the physics corpus does not claim a theorem deriving or dissolving consciousness.',
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
                OPH begins without a privileged God's-eye description. Every physical assertion is represented through
                bounded observers, their records, and the maps that compare overlapping views.
            </p>
            <p style={{ marginBottom: '16px' }}>
                On the formal surface, objectivity is reconstructed as agreement of public records modulo declared
                silent or gauge equivalence. That operational claim is narrower than proving that no observer-independent
                ontology can exist.
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
                    These proposed resolutions follow what Bernhard Mueller calls "the ether move."
                    In 1905, Einstein replaced the unnecessary assumption of an ether with a different kinematic
                    framework. OPH asks whether replacing a privileged observer-independent description with
                    compatible bounded records can similarly reformulate several problems. The finite theorems do
                    not establish that every listed physical puzzle thereby disappears.
                </p>
            </Explainer>
        </div>
    );
}
