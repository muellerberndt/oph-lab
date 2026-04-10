import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { STANDARD_MODEL_SURFACE } from '../content/paperSurface';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    BETA_COEFFICIENTS_SM_1LOOP,
    solveGaugeClosure,
} from '../core/ophMath';
import { useLabSetting, useLabState } from '../state/labState';

const ALPHA_EM_INV_REFERENCE = 127.952;
const SIN2_THETA_W_REFERENCE = 0.23122;
const ALPHA_S_REFERENCE = 0.1179;

function formatNumber(value: number, digits = 3) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toExponential(digits);
}

function runOneLoopAlpha(alphaU: number, betaCoefficient: number, mu0GeV: number, muGeV: number): number {
    if (alphaU <= 0 || mu0GeV <= 0 || muGeV <= 0) {
        return Number.NaN;
    }
    const inverse = (1 / alphaU) + (betaCoefficient / (2 * Math.PI)) * Math.log(mu0GeV / muGeV);
    if (!Number.isFinite(inverse) || inverse <= 0) {
        return Number.NaN;
    }
    return 1 / inverse;
}

export function UnificationPage() {
    const [preset, setPreset] = useLabSetting('unification.preset');
    const [edgeShiftScale, setEdgeShiftScale] = useLabSetting('unification.edgeShiftScale');
    const [pixelConstant, setPixelConstant] = useLabSetting('unification.pixelConstant');
    const [su2MaxJ, setSu2MaxJ] = useLabSetting('unification.su2MaxJ');
    const [su3MaxIndex, setSu3MaxIndex] = useLabSetting('unification.su3MaxIndex');
    const [alphaStep, setAlphaStep] = useLabSetting('unification.alphaStep');
    const [probeLogMu, setProbeLogMu] = useLabSetting('unification.probeLogMu');
    const { resetKeys } = useLabState();

    const effectiveShiftScale =
        preset === 'sm-only' ? 0 :
        preset === 'edge-canonical' ? 1 :
        edgeShiftScale;

    const betaCoefficients = useMemo<[number, number, number]>(() => {
        return [0, 1, 2].map(index => {
            const sm = BETA_COEFFICIENTS_SM_1LOOP[index];
            const delta = BETA_COEFFICIENTS_MSSM_LIKE[index] - sm;
            return sm + effectiveShiftScale * delta;
        }) as [number, number, number];
    }, [effectiveShiftScale]);

    const closure = useMemo(
        () =>
            solveGaugeClosure(pixelConstant, {
                betaCoefficients,
                su2MaxJ,
                su3MaxIndex,
                alphaRange: { min: 0.015, max: 0.09, step: alphaStep },
            }),
        [alphaStep, betaCoefficients, pixelConstant, su2MaxJ, su3MaxIndex]
    );

    const probeMuGeV = Math.pow(10, probeLogMu);

    const probeCouplings = useMemo(() => {
        const alpha1 = runOneLoopAlpha(closure.alphaU, betaCoefficients[0], closure.unificationScaleGeV, probeMuGeV);
        const alpha2 = runOneLoopAlpha(closure.alphaU, betaCoefficients[1], closure.unificationScaleGeV, probeMuGeV);
        const alpha3 = runOneLoopAlpha(closure.alphaU, betaCoefficients[2], closure.unificationScaleGeV, probeMuGeV);
        const alphaEm =
            Number.isFinite(alpha1) && Number.isFinite(alpha2) && alpha1 > 0 && alpha2 > 0
                ? 1 / ((1 / alpha2) + (1 / ((3 / 5) * alpha1)))
                : Number.NaN;
        const sin2ThetaW =
            Number.isFinite(alphaEm) && Number.isFinite(alpha2) && alpha2 > 0 ? alphaEm / alpha2 : Number.NaN;
        return { alpha1, alpha2, alpha3, alphaEm, sin2ThetaW };
    }, [betaCoefficients, closure.alphaU, closure.unificationScaleGeV, probeMuGeV]);

    const deltaB = betaCoefficients.map((value, index) => value - BETA_COEFFICIENTS_SM_1LOOP[index]) as [number, number, number];

    const alphaEmInv = Number.isFinite(closure.alphaEm) && closure.alphaEm > 0 ? 1 / closure.alphaEm : Number.NaN;
    const alphaEmResidualPercent = Number.isFinite(alphaEmInv)
        ? ((alphaEmInv - ALPHA_EM_INV_REFERENCE) / ALPHA_EM_INV_REFERENCE) * 100
        : Number.NaN;
    const sin2ResidualPercent = Number.isFinite(closure.sin2ThetaW)
        ? ((closure.sin2ThetaW - SIN2_THETA_W_REFERENCE) / SIN2_THETA_W_REFERENCE) * 100
        : Number.NaN;
    const alphaSResidualPercent = Number.isFinite(closure.alpha3)
        ? ((closure.alpha3 - ALPHA_S_REFERENCE) / ALPHA_S_REFERENCE) * 100
        : Number.NaN;

    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Coupling Unification</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This page follows the supplement derivation directly: choose an edge-running model, solve the pixel
                closure for <strong>alpha_U</strong>, then inspect one-loop running at any scale.
            </p>

            <div className="card" style={{ marginBottom: '20px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>How the current surface reads</h3>
                <div style={{ display: 'grid', gap: '8px', marginBottom: '10px' }}>
                    {STANDARD_MODEL_SURFACE.slice(1).map((item) => (
                        <div key={item} style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                            {item}
                        </div>
                    ))}
                </div>
                <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                    This is why the lab now describes the unification lane as geometric and edge-driven. It should not
                    imply that a simple-group GUT or superpartner spectrum has been derived underneath it.
                </p>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive Unification Derivation</div>

                <div style={{ display: 'grid', gap: '14px', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button
                            className="btn btn-ghost"
                            style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            onClick={() =>
                                resetKeys([
                                    'unification.preset',
                                    'unification.edgeShiftScale',
                                    'unification.pixelConstant',
                                    'unification.su2MaxJ',
                                    'unification.su3MaxIndex',
                                    'unification.alphaStep',
                                    'unification.probeLogMu',
                                ])
                            }
                        >
                            Reset Unification Controls
                        </button>
                    </div>
                    <div>
                        <div style={{ fontSize: '0.8em', color: 'var(--accent-gold)', marginBottom: '6px' }}>Running preset</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                                className={`btn ${preset === 'sm-only' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setPreset('sm-only')}
                                style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            >
                                SM only
                            </button>
                            <button
                                className={`btn ${preset === 'edge-canonical' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setPreset('edge-canonical')}
                                style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            >
                                Edge canonical
                            </button>
                            <button
                                className={`btn ${preset === 'edge-custom' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setPreset('edge-custom')}
                                style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            >
                                Edge custom
                            </button>
                        </div>
                    </div>

                    {preset === 'edge-custom' && (
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                                <span style={{ color: 'var(--accent-gold)' }}>Edge beta-shift scale s</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{edgeShiftScale.toFixed(3)}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1.6"
                                step="0.01"
                                value={edgeShiftScale}
                                onChange={event => setEdgeShiftScale(Number(event.target.value))}
                            />
                        </div>
                    )}

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Pixel constant P = a_cell / l_P^2</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{pixelConstant.toFixed(5)}</span>
                        </div>
                        <input
                            type="range"
                            min="1.15"
                            max="2.15"
                            step="0.005"
                            value={pixelConstant}
                            onChange={event => setPixelConstant(Number(event.target.value))}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                                <span style={{ color: 'var(--accent-gold)' }}>SU(2) cutoff j_max</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{su2MaxJ}</span>
                            </div>
                            <input
                                type="range"
                                min="8"
                                max="60"
                                step="1"
                                value={su2MaxJ}
                                onChange={event => setSu2MaxJ(Number(event.target.value))}
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                                <span style={{ color: 'var(--accent-gold)' }}>SU(3) cutoff p,q max</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{su3MaxIndex}</span>
                            </div>
                            <input
                                type="range"
                                min="4"
                                max="20"
                                step="1"
                                value={su3MaxIndex}
                                onChange={event => setSu3MaxIndex(Number(event.target.value))}
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                                <span style={{ color: 'var(--accent-gold)' }}>Alpha scan step</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{alphaStep.toFixed(4)}</span>
                            </div>
                            <input
                                type="range"
                                min="0.0002"
                                max="0.0015"
                                step="0.0001"
                                value={alphaStep}
                                onChange={event => setAlphaStep(Number(event.target.value))}
                            />
                        </div>
                    </div>

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Probe scale log10(mu/GeV)</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{probeLogMu.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="2"
                            max="16"
                            step="0.1"
                            value={probeLogMu}
                            onChange={event => setProbeLogMu(Number(event.target.value))}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>b = (b1,b2,b3)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '0.84em' }}>
                            ({betaCoefficients[0].toFixed(3)}, {betaCoefficients[1].toFixed(3)}, {betaCoefficients[2].toFixed(3)})
                        </div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>alpha_U^-1</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{closure.alphaInvU.toFixed(3)}</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>M_U</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatNumber(closure.unificationScaleGeV, 2)} GeV</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>Pixel residual</div>
                        <div
                            style={{
                                color: Math.abs(closure.pixelResidual) < 5e-4 ? 'var(--accent-green)' : 'var(--accent-rose)',
                                fontWeight: 700,
                            }}
                        >
                            {closure.pixelResidual.toExponential(3)}
                        </div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '28px' }}>Derivation Stages</h3>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 1: Edge-sector beta shift</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    b_i = b_i^SM + s * Delta b_i, Delta b_i = b_i^edge-canonical - b_i^SM
                </div>
                <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                    s = {effectiveShiftScale.toFixed(3)}, Delta b = ({deltaB[0].toFixed(3)}, {deltaB[1].toFixed(3)}, {deltaB[2].toFixed(3)})
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 2: Pixel-derived unification scale</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    M_U = (E_P / e^(2pi)) * P^(1/6)
                </div>
                <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                    M_U = {formatNumber(closure.unificationScaleGeV, 3)} GeV from P = {pixelConstant.toFixed(5)}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 3: Solve alpha_U from pixel closure</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    P/4 ?= lbar_SU2(4pi^2 alpha2) + lbar_SU3(4pi^2 alpha3)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '8px', fontSize: '0.82em' }}>
                    <div>lbar_SU2 = {closure.entropySU2.toFixed(6)}</div>
                    <div>lbar_SU3 = {closure.entropySU3.toFixed(6)}</div>
                    <div>target P/4 = {closure.entropyTarget.toFixed(6)}</div>
                    <div>alpha_U = {closure.alphaU.toFixed(5)}</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 4: Run couplings to probe scale</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    alpha_i^-1(mu) = alpha_U^-1 + (b_i/2pi) ln(M_U/mu)
                </div>
                <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    mu = {formatNumber(probeMuGeV, 2)} GeV
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', fontSize: '0.82em' }}>
                    <div>alpha1(mu) = {probeCouplings.alpha1.toFixed(5)}</div>
                    <div>alpha2(mu) = {probeCouplings.alpha2.toFixed(5)}</div>
                    <div>alpha3(mu) = {probeCouplings.alpha3.toFixed(5)}</div>
                    <div>alpha_em(mu)^-1 = {Number.isFinite(probeCouplings.alphaEm) && probeCouplings.alphaEm > 0 ? (1 / probeCouplings.alphaEm).toFixed(3) : 'n/a'}</div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-green)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Low-Energy Check Around m_Z</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.8em' }}>
                    <div>
                        alpha_em^-1: {Number.isFinite(alphaEmInv) ? alphaEmInv.toFixed(3) : 'n/a'} (ref {ALPHA_EM_INV_REFERENCE})<br />
                        residual: {Number.isFinite(alphaEmResidualPercent) ? `${alphaEmResidualPercent.toFixed(2)}%` : 'n/a'}
                    </div>
                    <div>
                        sin^2(theta_W): {closure.sin2ThetaW.toFixed(5)} (ref {SIN2_THETA_W_REFERENCE})<br />
                        residual: {Number.isFinite(sin2ResidualPercent) ? `${sin2ResidualPercent.toFixed(2)}%` : 'n/a'}
                    </div>
                    <div>
                        alpha_s: {closure.alpha3.toFixed(5)} (ref {ALPHA_S_REFERENCE})<br />
                        residual: {Number.isFinite(alphaSResidualPercent) ? `${alphaSResidualPercent.toFixed(2)}%` : 'n/a'}
                    </div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Concept Dictionary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div><strong>b_i</strong>: one-loop beta coefficients for U(1), SU(2), SU(3).</div>
                    <div><strong>Delta b_i</strong>: edge-sector shift relative to SM one-loop running.</div>
                    <div><strong>P</strong>: pixel constant controlling M_U and closure target P/4.</div>
                    <div><strong>lbar_SU2/lbar_SU3</strong>: edge entropy means from heat-kernel sums.</div>
                    <div><strong>alpha_U</strong>: unified coupling solved by entropy closure, not fit directly.</div>
                    <div><strong>mu</strong>: probe scale where running couplings are evaluated.</div>
                </div>
            </div>

            <Explainer title="How this aligns with the latest derivation notes">
                <p>
                    The supplement decomposes unification into exactly these parts: edge-sector beta shifts,
                    pixel-constraint closure, then one-loop running checks. This simulator keeps each stage visible so
                    you can perturb assumptions one by one.
                </p>
            </Explainer>

            <Explainer title="What changes when you switch presets">
                <p>
                    <strong>SM only</strong> removes the edge shift. <strong>Edge canonical</strong> applies the paper's
                    canonical MSSM-like shift. <strong>Edge custom</strong> lets you dial interpolation and inspect the
                    sensitivity of alpha_s, sin^2(theta_W), and pixel residual.
                </p>
            </Explainer>
        </div>
    );
}
