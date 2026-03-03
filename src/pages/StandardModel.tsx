import { useMemo, useState } from 'react';
import { Explainer } from '../components/Explainer';

type AdmissibilityChecks = {
    loopCoherent: boolean;
    anomalyFree: boolean;
    chiralStable: boolean;
    singleHiggs: boolean;
    cpCapable: boolean;
    weakUvComplete: boolean;
};

type CheckKey = keyof AdmissibilityChecks;

type GaugeCandidate = {
    id: string;
    label: string;
    group: string;
    chiFaith: number;
    nonAbelianFactors: number;
    nc: number;
    ng: number;
    checks: AdmissibilityChecks;
};

const ADMISSIBILITY_LABELS: Array<{ key: CheckKey; label: string; details: string }> = [
    { key: 'loopCoherent', label: '[z]=0 loop-coherent gluing', details: 'DHR transportability of charges across patches' },
    { key: 'anomalyFree', label: 'Perturbative + global anomaly-free', details: 'ABJ, Witten SU(2), and mixed gravitational anomalies' },
    { key: 'chiralStable', label: 'Refinement-stable chiral matter', details: 'No unprotected relevant vector-like masses at UV' },
    { key: 'singleHiggs', label: 'Single-Higgs Yukawa complete', details: 'Mass generation with one (1,2,1/2) scalar doublet' },
    { key: 'cpCapable', label: 'Intrinsic CP-capable', details: 'Physical CKM-like CP phases exist' },
    { key: 'weakUvComplete', label: 'Weak sector UV-completable', details: 'One-loop weak-sector behavior remains UV admissible' },
];

const CANDIDATES: GaugeCandidate[] = [
    {
        id: 'u1',
        label: 'Minimal abelian',
        group: 'U(1)',
        chiFaith: 1,
        nonAbelianFactors: 0,
        nc: 1,
        ng: 1,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: false,
            singleHiggs: false,
            cpCapable: false,
            weakUvComplete: false,
        },
    },
    {
        id: 'su2u1',
        label: 'Weak-only product',
        group: 'SU(2) x U(1)',
        chiFaith: 2,
        nonAbelianFactors: 1,
        nc: 1,
        ng: 2,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: false,
            singleHiggs: true,
            cpCapable: false,
            weakUvComplete: true,
        },
    },
    {
        id: 'su5',
        label: 'Simple-group GUT',
        group: 'SU(5)',
        chiFaith: 5,
        nonAbelianFactors: 1,
        nc: 5,
        ng: 3,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: true,
            singleHiggs: false,
            cpCapable: true,
            weakUvComplete: false,
        },
    },
    {
        id: 'sm33',
        label: 'SM quotient candidate',
        group: '[SU(3) x SU(2) x U(1)] / Z6, Nc=3, Ng=3',
        chiFaith: 6,
        nonAbelianFactors: 2,
        nc: 3,
        ng: 3,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: true,
            singleHiggs: true,
            cpCapable: true,
            weakUvComplete: true,
        },
    },
    {
        id: 'sm34',
        label: 'SM-like with extra generation',
        group: '[SU(3) x SU(2) x U(1)] / Z6, Nc=3, Ng=4',
        chiFaith: 6,
        nonAbelianFactors: 2,
        nc: 3,
        ng: 4,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: true,
            singleHiggs: true,
            cpCapable: true,
            weakUvComplete: true,
        },
    },
    {
        id: 'sm53',
        label: 'Higher-color product',
        group: '[SU(5) x SU(2) x U(1)] / Z10, Nc=5, Ng=3',
        chiFaith: 10,
        nonAbelianFactors: 2,
        nc: 5,
        ng: 3,
        checks: {
            loopCoherent: true,
            anomalyFree: true,
            chiralStable: true,
            singleHiggs: true,
            cpCapable: true,
            weakUvComplete: true,
        },
    },
];

const DEFAULT_ACTIVE_CHECKS: Record<CheckKey, boolean> = {
    loopCoherent: true,
    anomalyFree: true,
    chiralStable: true,
    singleHiggs: true,
    cpCapable: true,
    weakUvComplete: true,
};

export function StandardModelPage() {
    const [stage, setStage] = useState(5);
    const [activeChecks, setActiveChecks] = useState<Record<CheckKey, boolean>>(DEFAULT_ACTIVE_CHECKS);
    const [ncTrial, setNcTrial] = useState(3);
    const [ngTrial, setNgTrial] = useState(3);

    const elimination = useMemo(() => {
        let survivors = [...CANDIDATES];

        if (stage >= 1) {
            survivors = survivors.filter(candidate =>
                ADMISSIBILITY_LABELS.every(({ key }) => !activeChecks[key] || candidate.checks[key])
            );
        }
        if (stage >= 2 && survivors.length > 0) {
            const minChi = Math.min(...survivors.map(candidate => candidate.chiFaith));
            survivors = survivors.filter(candidate => candidate.chiFaith === minChi);
        }
        if (stage >= 3 && survivors.length > 0) {
            const minNonAbelian = Math.min(...survivors.map(candidate => candidate.nonAbelianFactors));
            survivors = survivors.filter(candidate => candidate.nonAbelianFactors === minNonAbelian);
        }
        if (stage >= 4 && survivors.length > 0) {
            const minNc = Math.min(...survivors.map(candidate => candidate.nc));
            survivors = survivors.filter(candidate => candidate.nc === minNc);
        }
        if (stage >= 5 && survivors.length > 0) {
            const minNg = Math.min(...survivors.map(candidate => candidate.ng));
            survivors = survivors.filter(candidate => candidate.ng === minNg);
        }

        return survivors;
    }, [activeChecks, stage]);

    const ncIsOdd = ncTrial % 2 === 1;
    const su2DoubletsPerGeneration = ncTrial + 1;
    const cpPhases = ((ngTrial - 1) * (ngTrial - 2)) / 2;
    const weakOneLoopNumerator = 22 - ngTrial * (ncTrial + 1);
    const weakAsymptoticallyFree = weakOneLoopNumerator > 0;

    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>The Standard Model</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This page follows the newest manuscript derivation: the admissible compact sector class is reduced by
                MAR lexicographic minimality to the unique global quotient
                {' '}<strong>[SU(3) x SU(2) x U(1)] / Z6</strong> with <strong>Nc=3</strong> and <strong>Ng=3</strong>.
            </p>

            <div className="demo-container">
                <div className="demo-label">Admissibility + MAR Eliminator</div>

                <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                        <span style={{ color: 'var(--accent-gold)' }}>Derivation stage</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>{stage} / 5</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="5"
                        step="1"
                        value={stage}
                        onChange={event => setStage(Number(event.target.value))}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px', fontSize: '0.7em', color: 'var(--text-muted)' }}>
                        <span>Start</span>
                        <span>Admissible</span>
                        <span>min chi</span>
                        <span>min N_nonab</span>
                        <span>min N_c</span>
                        <span>min N_g</span>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '12px', padding: '12px', borderLeft: '3px solid var(--accent-blue)' }}>
                    <div style={{ fontSize: '0.8em', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                        Toggle admissibility filters
                    </div>
                    <div style={{ display: 'grid', gap: '8px' }}>
                        {ADMISSIBILITY_LABELS.map(condition => (
                            <label key={condition.key} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', alignItems: 'start', fontSize: '0.76em' }}>
                                <input
                                    type="checkbox"
                                    checked={activeChecks[condition.key]}
                                    onChange={event => {
                                        const enabled = event.target.checked;
                                        setActiveChecks(previous => ({ ...previous, [condition.key]: enabled }));
                                    }}
                                />
                                <span style={{ color: 'var(--text-secondary)' }}>
                                    <strong>{condition.label}</strong>
                                    <br />
                                    <span style={{ color: 'var(--text-muted)' }}>{condition.details}</span>
                                </span>
                            </label>
                        ))}
                    </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78em' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Candidate</th>
                                <th style={{ textAlign: 'left', padding: '8px' }}>Group</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>chi_faith</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>N_nonab</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>N_c</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>N_g</th>
                                <th style={{ textAlign: 'center', padding: '8px' }}>Alive</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CANDIDATES.map(candidate => {
                                const isAlive = elimination.some(survivor => survivor.id === candidate.id);
                                return (
                                    <tr key={candidate.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                        <td style={{ padding: '8px', color: 'var(--text-secondary)' }}>{candidate.label}</td>
                                        <td style={{ padding: '8px', color: 'var(--text-muted)' }}>{candidate.group}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{candidate.chiFaith}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{candidate.nonAbelianFactors}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{candidate.nc}</td>
                                        <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{candidate.ng}</td>
                                        <td
                                            style={{
                                                padding: '8px',
                                                textAlign: 'center',
                                                color: isAlive ? 'var(--accent-green)' : 'var(--accent-rose)',
                                                fontWeight: 700,
                                            }}
                                        >
                                            {isAlive ? 'YES' : 'NO'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '10px', fontSize: '0.78em', color: 'var(--text-secondary)' }}>
                    Survivors at current stage: <strong style={{ color: 'var(--accent-cyan)' }}>{elimination.length}</strong>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '28px' }}>N_c and N_g Subproof Playground</h3>
            <p style={{ marginBottom: '12px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                Independent checks used after product-group structure is fixed.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-rose)' }}>
                    <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Color-count test</h4>
                    <div style={{ marginBottom: '8px', fontSize: '0.8em', color: 'var(--text-secondary)' }}>
                        Witten condition: N_doublets = N_c + 1 must be even.
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="9"
                        step="1"
                        value={ncTrial}
                        onChange={event => setNcTrial(Number(event.target.value))}
                    />
                    <div style={{ fontSize: '0.82em', marginTop: '8px' }}>
                        N_c = <strong>{ncTrial}</strong>, N_doublets = <strong>{su2DoubletsPerGeneration}</strong>, parity ={' '}
                        <strong style={{ color: ncIsOdd ? 'var(--accent-green)' : 'var(--accent-rose)' }}>{ncIsOdd ? 'passes' : 'fails'}</strong>
                    </div>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
                    <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Generation-count test</h4>
                    <div style={{ marginBottom: '8px', fontSize: '0.8em', color: 'var(--text-secondary)' }}>
                        CP phases: (N_g-1)(N_g-2)/2; weak AF numerator: 22 - N_g(N_c+1).
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={ngTrial}
                        onChange={event => setNgTrial(Number(event.target.value))}
                    />
                    <div style={{ fontSize: '0.82em', marginTop: '8px' }}>
                        N_g = <strong>{ngTrial}</strong>, CP phases = <strong>{cpPhases}</strong>, AF numerator ={' '}
                        <strong style={{ color: weakAsymptoticallyFree ? 'var(--accent-green)' : 'var(--accent-rose)' }}>{weakOneLoopNumerator}</strong>
                    </div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Concept Dictionary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div><strong>chi_faith</strong>: faithful edge capacity (minimal faithful representation dimension).</div>
                    <div><strong>N_nonab</strong>: number of nonabelian simple factors.</div>
                    <div><strong>N_c</strong>: color-fundamental dimension of complex nonabelian factor.</div>
                    <div><strong>N_g</strong>: number of chiral generations.</div>
                    <div><strong>[z]=0</strong>: loop-coherent gluing / transportability condition.</div>
                    <div><strong>Z6 quotient</strong>: trivially acting center subgroup for realized matter reps.</div>
                </div>
            </div>

            <div className="math-block">
                Final selection: G_phys = [SU(3) x SU(2) x U(1)] / Z6, N_c = 3, N_g = 3
            </div>

            <Explainer title="Why a product group is selected">
                <p>
                    The minimal faithful carrier that simultaneously supports pseudoreal weak doublets and complex
                    color triplets is C^3 tensor C^2. Commuting actions on this carrier force product-group structure
                    rather than a simple unification group.
                </p>
            </Explainer>

            <Explainer title="How MAR differs from plain minimality">
                <p>
                    MAR does not pick the absolutely smallest group. It minimizes only after admissibility filters are
                    enforced. This prevents trivial sectors (like pure U(1)) that fail chiral, CP, or Yukawa criteria.
                </p>
            </Explainer>
        </div>
    );
}
