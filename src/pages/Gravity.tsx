import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { GRAVITY_SURFACE } from '../content/paperSurface';
import {
    PIXEL_REFERENCE,
    SCREEN_CAPACITY_REFERENCE_DISPLAY,
    SCREEN_CAPACITY_REFERENCE_LOG10,
    deSitterRadiusFromLambda,
    formatPixelConstant,
    lambdaFromScreen,
} from '../core/ophMath';
import { useLabSetting, useLabState } from '../state/labState';

function formatNumber(value: number, digits = 3) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toExponential(digits);
}

export function GravityPage() {
    const [nullEnergy, setNullEnergy] = useLabSetting('gravity.nullEnergy');
    const [curvatureResponse, setCurvatureResponse] = useLabSetting('gravity.curvatureResponse');
    const [stripWeight, setStripWeight] = useLabSetting('gravity.stripWeight');
    const [nullGenerators, setNullGenerators] = useLabSetting('gravity.nullGenerators');
    const { resetKeys } = useLabState();

    const derivation = useMemo(() => {
        const gRatio = 1;
        const lambda = lambdaFromScreen(PIXEL_REFERENCE, SCREEN_CAPACITY_REFERENCE_LOG10);
        const deSitterRadius = deSitterRadiusFromLambda(lambda);

        const effectiveWeight = stripWeight * nullGenerators;
        const einsteinTarget = 8 * Math.PI * gRatio * nullEnergy;
        const trialRkk = curvatureResponse * einsteinTarget;

        const deltaSArea = -(effectiveWeight / (4 * gRatio)) * trialRkk;
        const deltaSBulk = 2 * Math.PI * effectiveWeight * nullEnergy;
        const deltaSGen = deltaSArea + deltaSBulk;

        return {
            gRatio,
            lambda,
            deSitterRadius,
            effectiveWeight,
            einsteinTarget,
            trialRkk,
            deltaSArea,
            deltaSBulk,
            deltaSGen,
            einsteinResidual: trialRkk - einsteinTarget,
        };
    }, [curvatureResponse, nullEnergy, nullGenerators, stripWeight]);

    const stepCards = [
        {
            title: 'Step 1: Null-sheet area response',
            equation: 'delta(A/4G_*) = -(W / 4G_*) * R_kk',
            value: `delta(A/4G_*) = ${derivation.deltaSArea.toFixed(6)}`,
            concept: 'Raychaudhuri area variation on local null strips',
        },
        {
            title: 'Step 2: Modular first-law matter term',
            equation: 'delta(S_bulk) = 2pi * W * T_kk',
            value: `delta(S_bulk) = ${derivation.deltaSBulk.toFixed(6)}`,
            concept: 'Modular Hamiltonian variation in null direction',
        },
        {
            title: 'Step 3: Entanglement equilibrium condition',
            equation: 'delta(S_gen) = delta(A/4G_*) + delta(S_bulk)',
            value: `delta(S_gen) = ${derivation.deltaSGen.toFixed(6)}`,
            concept: 'Fixed-cap stationarity target is zero on the admissible variation class',
        },
        {
            title: 'Step 4: Rest-frame Einstein relation',
            equation: 'R_kk ?= 8pi G_* T_kk',
            value: `R_kk = ${derivation.trialRkk.toFixed(6)}, target = ${derivation.einsteinTarget.toFixed(6)}`,
            concept: 'Null-stress bridge plus stationarity fixes the local scalar relation on the stated branch',
        },
        {
            title: 'Step 5: Tensor reconstruction (up to Lambda g_ab)',
            equation: 'G_ab + Lambda g_ab - 8pi G_*<T_ab> = 0',
            value: `Null residual = ${derivation.einsteinResidual.toExponential(3)}`,
            concept: 'Null data fix the tensor only up to the null-invisible metric term',
        },
        {
            title: 'Step 6: Conditional global boundary',
            equation: 'N = log M0(U_N); finite: M0(q) = alpha(Gq); Lambda ell_*^2 = 3pi/N',
            value: `Lambda = ${formatNumber(derivation.lambda, 2)} m^-2`,
            concept: 'The displayed Lambda uses the measured comparison coordinate; no source-selected N or horizon attachment is derived',
        },
    ];

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Conditional Gravity from Entanglement</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This simulator visualizes the declared conditional gravity branch: local null-modular data and
                generalized-entropy stationarity yield the rest-frame Einstein relation on the stated BW/null-stress
                assumptions. An exact bounded generation-register counterfamily is non-identifying, while universal
                A1–A3 membership is unproved. Direct N is not evaluable and emits no cosmic value. A same-invariant
                bridge, source-selected positive capacity carrier, and horizon attachment are required
                to determine the separate Lambda term. The stress slider
                represents the independently reconstructed null charge; it is not scalar collar CMI.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The source metric completes to a continuous three-dimensional carrier. A specified golden record
                population, complete local reading law and model clock approach flat causal order and volume under
                controlled refinement. Counts in fixed interior timelike intervals recover duration ratios. This is a
                mathematical construction with declared inputs. Physical gravity also requires a common event and
                signal interpretation, stress, vacuum, coupling, scale and controlled tensor curvature, or the
                independent small-ball/null-balance identification. Scalar curvature alone cannot supply that tensor.
            </p>

            <div className="card" style={{ marginBottom: '20px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Gravity audit</h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {GRAVITY_SURFACE.map((item) => (
                        <div key={item} style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '20px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Collar recoverability boundary</h3>
                <div style={{ display: 'grid', gap: '8px', fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                    <div><strong>Exact route:</strong> the declared central-interface branch is exactly Markov, so I(A<sub>&delta;</sub>:D<sub>&delta;</sub>|B<sub>&delta;</sub>) = 0 without a decay limit.</div>
                    <div><strong>Conditional route:</strong> a faithful finite-range Gibbs family obeys the quantitative bound only under uniform strong conditional matrix mixing. Ordinary two-point clustering is insufficient.</div>
                    <div className="math-block" style={{ margin: 0, fontSize: '0.95em' }}>
                        I(A_delta:D_delta|B_delta) &le; kappa |partial C|_UV exp(-(m-r0)/zeta)
                        <br />
                        &le; c |partial C|_UV exp(-delta/xi)
                    </div>
                    <div>m = delta/l<sub>UV</sub>, xi = zeta l<sub>UV</sub>, c = kappa exp(r0/zeta). The vanishing criterion is delta/xi - log|partial C|<sub>UV</sub> &rarr; +infinity; delta/l<sub>UV</sub> &rarr; infinity alone is insufficient.</div>
                    <div>Finite boundary-count, CMI, matrix-defect, held-out-cut, recovery-error, and rate-margin receipts are proxies for branch instantiation. They do not prove a scaling limit.</div>
                    <div><strong>Source boundary:</strong> scalar CMI controls recovery quality only. A stress source requires directional modular charges, rank-two tomography, conservation, normalization, and coupling receipts.</div>
                </div>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive Conditional Einstein-Branch Algebra</div>

                <div className="card" style={{ padding: '14px', marginBottom: '18px', background: 'rgba(0,0,0,0.18)', borderLeft: '3px solid var(--accent-gold)' }}>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Declared comparison inputs</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '10px', fontSize: '0.8em', color: 'var(--text-secondary)' }}>
                        <div><strong>P<sub>C</sub></strong>: {formatPixelConstant(PIXEL_REFERENCE)} retrospective comparison coordinate</div>
                        <div><strong>N<sub>&Lambda;</sub></strong>: {SCREEN_CAPACITY_REFERENCE_DISPLAY} inferred from measured Lambda</div>
                        <div><strong>G*</strong>: declared scale selection on this branch</div>
                    </div>
                </div>

                <div style={{ display: 'grid', gap: '14px', marginBottom: '18px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Null stress flux T_kk</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{nullEnergy.toFixed(3)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.2"
                            max="2.5"
                            step="0.01"
                            value={nullEnergy}
                            onChange={event => setNullEnergy(Number(event.target.value))}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Strip weight per generator (W0)</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{stripWeight.toFixed(3)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.02"
                            max="0.2"
                            step="0.002"
                            value={stripWeight}
                            onChange={event => setStripWeight(Number(event.target.value))}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Number of sampled null generators</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{nullGenerators}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="24"
                            step="1"
                            value={nullGenerators}
                            onChange={event => setNullGenerators(Number(event.target.value))}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Geometry response factor kappa_R</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{curvatureResponse.toFixed(3)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.6"
                            max="1.4"
                            step="0.005"
                            value={curvatureResponse}
                            onChange={event => setCurvatureResponse(Number(event.target.value))}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <button className="btn btn-ghost" onClick={() => setCurvatureResponse(1)} style={{ fontSize: '0.72em', padding: '4px 10px' }}>
                        Snap kappa_R to 1
                    </button>
                    <button
                        className="btn btn-ghost"
                        onClick={() =>
                            resetKeys([
                                'gravity.nullEnergy',
                                'gravity.stripWeight',
                                'gravity.nullGenerators',
                                'gravity.curvatureResponse',
                            ])
                        }
                        style={{ fontSize: '0.72em', padding: '4px 10px' }}
                    >
                        Reset canonical point
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>G* / G_ref</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{derivation.gRatio.toFixed(4)}</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>Effective W</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{derivation.effectiveWeight.toFixed(4)}</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>Lambda</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatNumber(derivation.lambda, 2)} m^-2</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>de Sitter radius</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatNumber(derivation.deSitterRadius, 2)} m</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>delta S_gen</div>
                        <div
                            style={{
                                color: Math.abs(derivation.deltaSGen) < 1e-4 ? 'var(--accent-green)' : 'var(--accent-rose)',
                                fontWeight: 700,
                            }}
                        >
                            {derivation.deltaSGen.toExponential(3)}
                        </div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '28px' }}>Six-Step Derivation Trace</h3>
            <p style={{ marginBottom: '12px', fontSize: '0.86em', color: 'var(--text-muted)' }}>
                At kappa_R=1 this toy normalization saturates the displayed rest-frame relation and cancels the
                modeled generalized-entropy variation for the sampled null weight W.
            </p>

            {stepCards.map((step, index) => (
                <div key={step.title} className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-rose)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.88em' }}>{index + 1}. {step.title}</h4>
                    </div>
                    <div className="math-block" style={{ marginBottom: '10px', fontSize: '0.84em' }}>
                        {step.equation}
                    </div>
                    <div style={{ color: 'var(--accent-cyan)', fontSize: '0.86em', marginBottom: '4px' }}>{step.value}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75em' }}>{step.concept}</div>
                </div>
            ))}

            <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Symbol Dictionary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div><strong>G*</strong>: gravitational scale from the selected no-G scale certificate.</div>
                    <div><strong>T_kk</strong>: null-projected stress tensor flux through the local horizon strip.</div>
                    <div><strong>R_kk</strong>: null-projected Ricci response of local geometry.</div>
                    <div><strong>W</strong>: sampled strip weight across null generators.</div>
                    <div><strong>delta S_bulk</strong>: modular first-law matter contribution.</div>
                    <div><strong>delta S_gen</strong>: generalized entropy variation, target 0 at equilibrium.</div>
                    <div><strong>Collar CMI</strong>: scalar recovery diagnostic, not the T_kk input shown here.</div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Premise Stack Used Here</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div>Recovery and generalized-entropy interfaces (declared premises, not axioms)</div>
                    <div>Local MaxEnt and refinement-stable branch</div>
                    <div>Exact central-interface collar branch, or finite-range Gibbs plus uniform strong conditional matrix mixing</div>
                    <div>Boundary-aware collar rate margin; finite receipts are proxies</div>
                    <div>Null modular bridge, with half-line generator/charge identification internalized</div>
                    <div>Explicit BW branch and scaling-limit scope</div>
                    <div>Separate bounded-interval projective branch in the small-ball step</div>
                    <div>Fixed-cap generalized-entropy stationarity</div>
                    <div>Null ambiguity lemma: tensor reconstruction up to Lambda g_ab</div>
                    <div>Global capacity lane: typed same-invariant bridge, source-selected N, and horizon attachment</div>
                </div>
            </div>

            <Explainer title="What this simulator is proving">
                <p>
                    The local part visualizes the Jacobson-type rest-frame relation on the stated gravity branch.
                    The global part is separate because null data leave a metric ambiguity and cannot determine
                    Lambda by themselves.
                </p>
                <p>
                    The collar theorem controls the recovery remainder entering that branch. It does not construct
                    the T_kk slider: the displayed stress variable belongs to the separate modular-charge and
                    tensor-reconstruction packet.
                </p>
            </Explainer>

            <Explainer title="How P And The Capacity Target Enter">
                <p>
                    P is the certified root of a declared incomplete local map. In the Newton row its factor cancels,
                    leaving the scale certificate to supply G. The displayed capacity is located from measured Lambda;
                    it becomes a physical OPH output only if the source map selects the same typed capacity and the
                    horizon relation is established. Self-reference forces equality after that identification.
                </p>
            </Explainer>

            <Explainer title="Branch conditions and required receipts">
                <div style={{ display: 'grid', gap: '10px' }}>
                    {GRAVITY_SURFACE.slice(2).map((item) => (
                        <p key={item} style={{ margin: 0 }}>
                            {item}
                        </p>
                    ))}
                </div>
            </Explainer>
        </div>
    );
}
