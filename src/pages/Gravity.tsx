import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import {
    PIXEL_REFERENCE,
    deSitterRadiusFromLambda,
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
    const [pixelConstant, setPixelConstant] = useLabSetting('gravity.pixelConstant');
    const [logCapacity, setLogCapacity] = useLabSetting('gravity.logCapacity');
    const [nullEnergy, setNullEnergy] = useLabSetting('gravity.nullEnergy');
    const [curvatureResponse, setCurvatureResponse] = useLabSetting('gravity.curvatureResponse');
    const [stripWeight, setStripWeight] = useLabSetting('gravity.stripWeight');
    const [nullGenerators, setNullGenerators] = useLabSetting('gravity.nullGenerators');
    const { resetKeys } = useLabState();

    const derivation = useMemo(() => {
        const gRatio = pixelConstant / PIXEL_REFERENCE;
        const lambda = lambdaFromScreen(pixelConstant, logCapacity);
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
    }, [curvatureResponse, logCapacity, nullEnergy, nullGenerators, pixelConstant, stripWeight]);

    const stepCards = [
        {
            title: 'Step 1: Null-sheet area response',
            equation: 'delta(A/4G_eff) = -(W / 4G_eff) * R_kk',
            value: `delta(A/4G_eff) = ${derivation.deltaSArea.toFixed(6)}`,
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
            equation: 'delta(S_gen) = delta(A/4G_eff) + delta(S_bulk)',
            value: `delta(S_gen) = ${derivation.deltaSGen.toFixed(6)}`,
            concept: 'Fixed-cap stationarity target is zero on the admissible variation class',
        },
        {
            title: 'Step 4: Rest-frame Einstein relation',
            equation: 'R_kk ?= 8pi G_eff T_kk',
            value: `R_kk = ${derivation.trialRkk.toFixed(6)}, target = ${derivation.einsteinTarget.toFixed(6)}`,
            concept: 'Null-stress bridge plus stationarity fixes the local scalar relation on the stated branch',
        },
        {
            title: 'Step 5: Tensor reconstruction (up to Lambda g_ab)',
            equation: 'G_ab + Lambda g_ab - 8pi G_eff<T_ab> = 0',
            value: `Null residual = ${derivation.einsteinResidual.toExponential(3)}`,
            concept: 'Null data fix the tensor only up to the null-invisible metric term',
        },
        {
            title: 'Step 6: Global completion',
            equation: 'Lambda = 3pi / (G_eff * log(dim H_tot))',
            value: `Lambda = ${formatNumber(derivation.lambda, 2)} m^-2`,
            concept: 'Screen capacity closes the Lambda ambiguity',
        },
    ];

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gravity from Entanglement</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This simulator visualizes the current conditional gravity branch: local null-modular data and
                generalized-entropy stationarity yield the rest-frame Einstein relation on the stated BW/null-stress
                assumptions, and global screen capacity fixes the separate Lambda branch.
            </p>

            <div className="demo-container">
                <div className="demo-label">Interactive Einstein Derivation (Expanded)</div>

                <div style={{ display: 'grid', gap: '14px', marginBottom: '18px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Pixel constant P = a_cell / l_P^2</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{pixelConstant.toFixed(4)}</span>
                        </div>
                        <input
                            type="range"
                            min="1.1"
                            max="2.2"
                            step="0.01"
                            value={pixelConstant}
                            onChange={event => setPixelConstant(Number(event.target.value))}
                        />
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>log10(dim H_tot)</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{logCapacity.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="118"
                            max="126"
                            step="0.1"
                            value={logCapacity}
                            onChange={event => setLogCapacity(Number(event.target.value))}
                        />
                    </div>

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
                                'gravity.pixelConstant',
                                'gravity.logCapacity',
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
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>G_eff / G_ref</div>
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
                    <div><strong>G_eff</strong>: effective gravitational scale ratio from P.</div>
                    <div><strong>T_kk</strong>: null-projected stress tensor flux through the local horizon strip.</div>
                    <div><strong>R_kk</strong>: null-projected Ricci response of local geometry.</div>
                    <div><strong>W</strong>: sampled strip weight across null generators.</div>
                    <div><strong>delta S_bulk</strong>: modular first-law matter contribution.</div>
                    <div><strong>delta S_gen</strong>: generalized entropy variation, target 0 at equilibrium.</div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Premise Stack Used Here</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div>A4: recoverable generalized entropy</div>
                    <div>A3: local MaxEnt and refinement-stable branch</div>
                    <div>D4: null modular bridge, with half-line generator/charge identification internalized</div>
                    <div>D3 + T2: explicit BW branch and scaling-limit scope</div>
                    <div>T3: fixed-cap generalized-entropy stationarity</div>
                    <div>Null ambiguity lemma: tensor reconstruction up to Lambda g_ab</div>
                    <div>Global capacity closure for Lambda</div>
                </div>
            </div>

            <Explainer title="What this simulator is proving">
                <p>
                    The local part visualizes the Jacobson-type rest-frame relation on the stated gravity branch.
                    The global part is separate because null data leave a metric ambiguity and cannot determine
                    Lambda by themselves.
                </p>
            </Explainer>

            <Explainer title="How P and log(dim H) enter">
                <p>
                    P changes the effective gravitational and entropy scales in this toy readout. The screen capacity
                    log(dim H_tot) changes only the global Lambda completion. This split matches the current OPH paper
                    surface, where the local gravity branch and the cosmological-capacity branch are distinct.
                </p>
            </Explainer>

            <Explainer title="What remains open">
                <p>
                    The half-line generator/null-stress charge identification is internal to the current null bridge.
                    What remains open downstream is the bounded-interval transport/projective branch and the tensor
                    reconstruction ambiguity beyond the null-invisible metric term.
                </p>
                <p>
                    Upstream of the BW branch, the broader UV/BW internalization scaffold also remains open at the
                    realized scaling-limit cap-pair extraction and ordered cut-pair rigidity steps.
                </p>
            </Explainer>
        </div>
    );
}
