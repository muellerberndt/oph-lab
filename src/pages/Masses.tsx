import { useMemo, useState } from 'react';
import { Explainer } from '../components/Explainer';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    BETA_COEFFICIENTS_SM_1LOOP,
    PIXEL_REFERENCE,
    SCREEN_CAPACITY_REFERENCE_LOG10,
    estimateHadronMassesFromQcdScale,
    estimateQcdScaleGeV,
    lambdaFromScreen,
    neutrinoMassesFromScreen,
    solveGaugeClosure,
    textureMassesFromVev,
} from '../core/ophMath';

type RunningModel = 'edge-mssm-like' | 'sm-1loop';

function formatNumber(value: number, digits = 3) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toExponential(digits);
}

function formatMassGeV(value: number) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    if (value >= 1) {
        return `${value.toFixed(3)} GeV`;
    }
    if (value >= 1e-3) {
        return `${(value * 1e3).toFixed(3)} MeV`;
    }
    return `${(value * 1e6).toFixed(3)} keV`;
}

export function MassesPage() {
    const [pixelConstant, setPixelConstant] = useState(PIXEL_REFERENCE);
    const [logCapacity, setLogCapacity] = useState(SCREEN_CAPACITY_REFERENCE_LOG10);
    const [runningModel, setRunningModel] = useState<RunningModel>('edge-mssm-like');
    const [su2MaxJ, setSu2MaxJ] = useState(30);
    const [su3MaxIndex, setSu3MaxIndex] = useState(14);
    const [alphaStep, setAlphaStep] = useState(0.0005);
    const [qcdFlavors, setQcdFlavors] = useState(5);

    const [coefficientScale, setCoefficientScale] = useState(1);
    const [upExponentShift, setUpExponentShift] = useState(0);
    const [downExponentShift, setDownExponentShift] = useState(0);
    const [leptonExponentShift, setLeptonExponentShift] = useState(0);

    const betaCoefficients = runningModel === 'edge-mssm-like' ? BETA_COEFFICIENTS_MSSM_LIKE : BETA_COEFFICIENTS_SM_1LOOP;

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

    const textureMasses = useMemo(
        () =>
            textureMassesFromVev(closure.vGeV, {
                coefficientScale,
                upExponentShift,
                downExponentShift,
                leptonExponentShift,
            }).sort((a, b) => b.massGeV - a.massGeV),
        [closure.vGeV, coefficientScale, downExponentShift, leptonExponentShift, upExponentShift]
    );

    const neutrinos = useMemo(
        () => neutrinoMassesFromScreen(logCapacity, pixelConstant),
        [logCapacity, pixelConstant]
    );

    const lambda = lambdaFromScreen(pixelConstant, logCapacity);
    const higgsMassGeV = 0.512 * closure.vGeV;
    const topCriticalMassGeV = 0.694 * closure.vGeV;
    const lambdaQcdGeV = estimateQcdScaleGeV(closure.alpha3, closure.muStarGeV, qcdFlavors);
    const hadronMasses = estimateHadronMassesFromQcdScale(lambdaQcdGeV);

    const maxLog = Math.log10(Math.max(...textureMasses.map(entry => Math.max(entry.massGeV, 1e-20))));
    const minLog = Math.log10(Math.min(...textureMasses.map(entry => Math.max(entry.massGeV, 1e-20))));
    const logRange = Math.max(1e-9, maxLog - minLog);

    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Particle Masses</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This expanded lab follows the latest spectrum derivation chain from the manuscript. You can now tune
                running model, entropy truncation, and texture parameters to see which pieces are structural and which
                are modeling choices.
            </p>

            <div className="demo-container">
                <div className="demo-label">Spectrum Pipeline Controls (Expanded)</div>

                <div style={{ display: 'grid', gap: '14px', marginBottom: '16px' }}>
                    <div>
                        <div style={{ fontSize: '0.8em', color: 'var(--accent-gold)', marginBottom: '6px' }}>Running model</div>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                                className={`btn ${runningModel === 'edge-mssm-like' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setRunningModel('edge-mssm-like')}
                                style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            >
                                Edge MSSM-like
                            </button>
                            <button
                                className={`btn ${runningModel === 'sm-1loop' ? 'btn-primary' : 'btn-ghost'}`}
                                onClick={() => setRunningModel('sm-1loop')}
                                style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            >
                                SM 1-loop
                            </button>
                        </div>
                    </div>

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
                            <span style={{ color: 'var(--accent-gold)' }}>SU(2) heat-kernel cutoff (j_max)</span>
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
                            <span style={{ color: 'var(--accent-gold)' }}>SU(3) heat-kernel cutoff (p,q max)</span>
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
                            <span style={{ color: 'var(--accent-gold)' }}>Gauge-closure alpha scan step</span>
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

                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>QCD flavor count n_f (Stage 6)</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{qcdFlavors}</span>
                        </div>
                        <input
                            type="range"
                            min="3"
                            max="6"
                            step="1"
                            value={qcdFlavors}
                            onChange={event => setQcdFlavors(Number(event.target.value))}
                        />
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '10px' }}>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>alpha_U^-1</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{closure.alphaInvU.toFixed(3)}</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>M_U</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatNumber(closure.unificationScaleGeV, 2)} GeV</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>v (Higgs VEV)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{closure.vGeV.toFixed(3)} GeV</div>
                    </div>
                    <div className="card" style={{ padding: '12px' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)' }}>alpha_s(mu*)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{closure.alpha3.toFixed(5)}</div>
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

            <h3 style={{ fontSize: '1em', marginTop: '28px' }}>Stage-by-Stage Derivation</h3>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 1: Fundamental scales</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    M_U = (E_P / e^(2pi)) * P^(1/6), E_cell = E_P / sqrt(P)
                </div>
                <div style={{ fontSize: '0.84em', color: 'var(--text-secondary)' }}>
                    M_U = {formatNumber(closure.unificationScaleGeV, 3)} GeV, E_cell = {formatNumber(closure.eCellGeV, 3)} GeV
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 2: Gauge closure from pixel constraint</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    P/4 ?= lbar_SU2(4pi^2 alpha2) + lbar_SU3(4pi^2 alpha3)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px', fontSize: '0.82em' }}>
                    <div>alpha_U = {closure.alphaU.toFixed(5)}</div>
                    <div>lbar_SU2 = {closure.entropySU2.toFixed(6)}</div>
                    <div>lbar_SU3 = {closure.entropySU3.toFixed(6)}</div>
                    <div>target P/4 = {closure.entropyTarget.toFixed(6)}</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 3: Electroweak observables</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    v = E_cell * exp(-2pi / (4 alpha_U)), m_Z = 0.5 v sqrt(g2^2 + gY^2)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px', fontSize: '0.82em' }}>
                    <div>mu* = {closure.muStarGeV.toFixed(3)} GeV</div>
                    <div>m_Z = {closure.mZGeV.toFixed(3)} GeV</div>
                    <div>m_W = {closure.mWGeV.toFixed(3)} GeV</div>
                    <div>sin^2(theta_W) = {closure.sin2ThetaW.toFixed(5)}</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 4: Critical-surface estimates</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    m_H ~ 0.512 v, m_t ~ 0.694 v
                </div>
                <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                    m_H ~ {higgsMassGeV.toFixed(3)} GeV, m_t ~ {topCriticalMassGeV.toFixed(3)} GeV
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-green)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 5: Z6 texture masses</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    y_f = c_f * epsilon^n_f, epsilon = 1/6, m_f = y_f * v / sqrt(2)
                </div>

                <div style={{ display: 'grid', gap: '10px', marginBottom: '12px' }}>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Global coefficient scale</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{coefficientScale.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="1.5"
                            step="0.01"
                            value={coefficientScale}
                            onChange={event => setCoefficientScale(Number(event.target.value))}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Up-sector exponent shift</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{upExponentShift}</span>
                        </div>
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step="1"
                            value={upExponentShift}
                            onChange={event => setUpExponentShift(Number(event.target.value))}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Down-sector exponent shift</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{downExponentShift}</span>
                        </div>
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step="1"
                            value={downExponentShift}
                            onChange={event => setDownExponentShift(Number(event.target.value))}
                        />
                    </div>
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78em' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Lepton-sector exponent shift</span>
                            <span style={{ color: 'var(--accent-cyan)' }}>{leptonExponentShift}</span>
                        </div>
                        <input
                            type="range"
                            min="-2"
                            max="2"
                            step="1"
                            value={leptonExponentShift}
                            onChange={event => setLeptonExponentShift(Number(event.target.value))}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {textureMasses.map(entry => {
                        const logValue = Math.log10(Math.max(entry.massGeV, 1e-20));
                        const width = ((logValue - minLog) / logRange) * 100;
                        const colorBySector: Record<typeof entry.sector, string> = {
                            up: 'var(--accent-rose)',
                            down: 'var(--accent-blue)',
                            lepton: 'var(--accent-gold)',
                        };
                        return (
                            <div key={entry.id} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 88px 42px 54px', gap: '8px', alignItems: 'center', fontSize: '0.76em' }}>
                                <span style={{ color: colorBySector[entry.sector], fontWeight: 600 }}>{entry.label}</span>
                                <div style={{ height: '14px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', position: 'relative' }}>
                                    <div
                                        style={{
                                            width: `${Math.max(width, 2)}%`,
                                            height: '100%',
                                            background: colorBySector[entry.sector],
                                            opacity: 0.7,
                                        }}
                                    />
                                </div>
                                <span style={{ color: 'var(--text-secondary)' }}>{formatMassGeV(entry.massGeV)}</span>
                                <span style={{ color: 'var(--accent-cyan)' }}>n={entry.exponent}</span>
                                <span style={{ color: 'var(--text-muted)' }}>c={entry.coefficient.toFixed(2)}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '10px', borderLeft: '3px solid var(--accent-amber)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 6: QCD scale to hadron estimates</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    b0 = 11 - 2n_f/3, Lambda_QCD ~ mu* exp(-2pi / (b0 alpha_s(mu*))), m_hadron ~ C_hadron Lambda_QCD
                </div>
                <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    n_f = {qcdFlavors}, Lambda_QCD estimate = {formatMassGeV(lambdaQcdGeV)}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '0.8em' }}>
                    {hadronMasses.map(hadron => (
                        <div key={hadron.label} className="card" style={{ padding: '10px' }}>
                            <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>{hadron.label}</div>
                            <div style={{ color: 'var(--text-secondary)' }}>C = {hadron.coefficient.toFixed(2)}</div>
                            <div style={{ color: 'var(--accent-cyan)' }}>{formatMassGeV(hadron.massGeV)}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.86em' }}>Stage 7: Neutrino + cosmology link</h4>
                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    Lambda = 3pi / (G log(dim H_tot)), m_nu2 = epsilon m_nu3, m_nu1 = epsilon^2 m_nu3
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '8px', fontSize: '0.82em' }}>
                    <div>Lambda = {formatNumber(lambda, 2)} m^-2</div>
                    <div>m_nu3 ~ {(neutrinos.mNu3Ev * 1e3).toFixed(3)} meV</div>
                    <div>m_nu2 ~ {(neutrinos.mNu2Ev * 1e3).toFixed(3)} meV</div>
                    <div>m_nu1 ~ {(neutrinos.mNu1Ev * 1e3).toFixed(3)} meV</div>
                </div>
            </div>

            <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)', marginTop: '18px', marginBottom: '18px' }}>
                <h4 style={{ marginTop: 0, fontSize: '0.86em' }}>Symbol Dictionary</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '8px', fontSize: '0.78em' }}>
                    <div><strong>P</strong>: pixel constant, main particle-sector input.</div>
                    <div><strong>alpha_U</strong>: unified coupling solved by pixel constraint.</div>
                    <div><strong>lbar_SU2/lbar_SU3</strong>: heat-kernel edge entropy means.</div>
                    <div><strong>epsilon</strong>: Z6 suppression factor = 1/6.</div>
                    <div><strong>n_f</strong>: integer texture exponent per fermion family.</div>
                    <div><strong>c_f</strong>: order-one texture coefficients not topologically fixed.</div>
                    <div><strong>Lambda_QCD</strong>: strong IR scale inferred from alpha_s running.</div>
                    <div><strong>n_flavors</strong>: active quark flavors in one-loop QCD scale estimate.</div>
                    <div><strong>alpha scan step</strong>: numerical solver granularity for alpha_U closure search.</div>
                    <div><strong>log(dim H_tot)</strong>: global capacity controlling Lambda and neutrino scale.</div>
                </div>
            </div>

            <Explainer title="Which controls are structural vs phenomenological">
                <p>
                    Structural controls: P, screen capacity, and model choice for beta-running logic. Phenomenological
                    controls: texture coefficient scale and exponent shifts, which represent unresolved order-one overlap
                    matrix elements and higher-order corrections.
                </p>
                <p>
                    Numerical controls: alpha scan step and n_f. They do not change OPH structure, but they do change
                    how tightly closure is solved and how Stage-6 QCD estimates are approximated.
                </p>
            </Explainer>

            <Explainer title="Paper alignment notes">
                <p>
                    This page mirrors the manuscript stage chain and keeps the canonical values visible:
                    M_U scaling with P^(1/6), alpha_U near 0.041 at canonical settings, epsilon=1/6 texture basis,
                    and Lambda closure from global capacity.
                </p>
            </Explainer>
        </div>
    );
}
