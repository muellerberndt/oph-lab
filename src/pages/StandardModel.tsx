import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { MINI_UNIVERSE_SIMULATION_URL, STANDARD_MODEL_SURFACE } from '../content/paperSurface';
import { useLabSetting, useLabState } from '../state/labState';

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
    { key: 'loopCoherent', label: 'Combined loop-coherent gluing', details: '[z]=0 plus an allowed strictification with trivial represented holonomy' },
    { key: 'anomalyFree', label: 'Perturbative + global anomaly-free', details: 'ABJ, Witten SU(2), and mixed gravitational anomalies' },
    { key: 'chiralStable', label: 'Refinement-stable chiral matter', details: 'No unprotected relevant vector-like masses at UV' },
    { key: 'singleHiggs', label: 'Single-Higgs Yukawa complete', details: 'Mass generation with one (1,2,1/2) scalar doublet' },
    { key: 'cpCapable', label: 'Intrinsic CP-capable', details: 'Physical CKM-like CP phases exist' },
    { key: 'weakUvComplete', label: 'Weak sector UV-completable', details: 'One-loop weak-sector behavior is UV admissible' },
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

export function StandardModelPage() {
    const [stage, setStage] = useLabSetting('standardModel.stage');
    const [activeChecksRaw, setActiveChecks] = useLabSetting('standardModel.activeChecks');
    const [ncTrial, setNcTrial] = useLabSetting('standardModel.ncTrial');
    const [ngTrial, setNgTrial] = useLabSetting('standardModel.ngTrial');
    const { resetKeys } = useLabState();
    const activeChecks = activeChecksRaw as Record<CheckKey, boolean>;

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
                The first two axioms and compact Lie classification force the abstract type
                {' '}<strong>u(1) + su(2) + su(3)</strong> on the twelve-port branch.
                No source reconstruction of the complete current is derived. Inside the declared fifteen-state
                representation fixture, the hypercharges, anomaly cancellations, <strong>three colors</strong>,
                and the common Z6 kernel are exact. The global quotient
                {' '}<strong>[SU(3) x SU(2) x U(1)] / Z6</strong> additionally requires a complete
                character lattice and a same-source loop-to-kernel identification.
                The rank-three band is a candidate family carrier; the CP-capability and weak-sector clauses
                give the window 3 to 5, and <strong>N_g = 3</strong> enters as a declared completion without a
                physical derivation. Physical three-family status
                requires a rank-45 attachment, source-selected matter action, and quantum-field-theory construction.
                The fixed-stage tensor category first chooses one common strict transport representative and
                retains only seeds with trivial loop action under that same choice; the receipt intertwines those
                choices across refinement.
            </p>

            <div className="card" style={{ marginBottom: '20px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Recovered-core audit</h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {STANDARD_MODEL_SURFACE.map((item) => (
                        <div key={item} style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '20px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h3 style={{ margin: '0 0 10px', fontSize: '0.95em' }}>Finite carrier readout (exploratory)</h3>
                <p style={{ margin: '0 0 10px', fontSize: '0.84em' }}>
                    The OPH-FPE Z<sub>6</sub> census and v2 family readout make charge, triality, and weak-duality
                    grammar checks live on committed carrier structures. The package is explicitly non-evidential:
                    its labels do not establish a physical generation count, matter family, Yukawa sector, or particle.
                </p>
                <a href={MINI_UNIVERSE_SIMULATION_URL}>Inspect the simulation surface &rarr;</a>
            </div>

            <div className="demo-container">
                <div className="demo-label">Admissibility Filters + Sector Comparison</div>

                <div style={{ marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        <button
                            className="btn btn-ghost"
                            style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            onClick={() =>
                                resetKeys([
                                    'standardModel.stage',
                                    'standardModel.activeChecks',
                                    'standardModel.ncTrial',
                                    'standardModel.ngTrial',
                                ])
                            }
                        >
                            Reset SM Derivation Controls
                        </button>
                    </div>
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
                        <span>min color</span>
                        <span>min generations</span>
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
                    Survivors in this stage: <strong style={{ color: 'var(--accent-cyan)' }}>{elimination.length}</strong>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '28px' }}>Color and Generation Subproof Playground</h3>
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
                    <div><strong>[z]=0</strong>: the triangle defect can be strictified; transportability also requires an allowed strictification with trivial represented loop holonomy.</div>
                    <div><strong>Z6 kernel</strong>: center subgroup acting trivially on every state in the declared matter fixture.</div>
                </div>
            </div>

            <div className="math-block">
                Axiom-forced Lie type: u(1) + su(2) + su(3). Declared fixture:
                N_c = 3 with a common Z6 kernel. No matter, global-form, or family selection is derived.
            </div>

            <Explainer title="Product structure inside the declared fixture">
                <p>
                    The charged-double-triplet fixture carries commuting weak and color actions and gives an
                    exact matrix witness for the forced Lie type. This fixture is a declared realization.
                    The source reconstruction must produce its own complete response map and bracket.
                </p>
            </Explainer>

            <Explainer title="How the declared completions relate to the admissibility filters">
                <p>
                    The admissibility filters cut the candidate class first: trivial sectors such as pure U(1)
                    fail the chiral, CP, or Yukawa criteria. The minimization stages in the demo are a comparison
                    device across the survivors. The realized sector statements (three generations inside the
                    window 3 to 5, one Higgs, no extra light sectors) enter as declared completions without
                    derived physical selection, not as an axiom.
                </p>
            </Explainer>

            <Explainer title="Page Scope">
                <p>
                    The page covers the axiom-forced compact Lie type, the exact hypercharges and common kernel
                    inside the declared fifteen-state fixture, and the generation-count window from the
                    CP-capability and weak-sector clauses. Physical matter selection, the global quotient,
                    family attachment, full flavor closure, and hadron phenomenology are separate.
                    A production OPH hadron backend is absent.
                </p>
                <p>
                    On the declared nonempty one-Higgs chiral class, the hypercharges and Z6 kernel are exact.
                    Promotion of that kernel to the physical global quotient requires a complete character lattice
                    and a same-source loop-to-kernel identification.
                    The product adjoint excludes the ordinary simple-GUT X/Y channel only. The particle pages carry
                    the sharper continuation and compare-only bookkeeping.
                </p>
            </Explainer>
        </div>
    );
}
