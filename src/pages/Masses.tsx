import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { CLAIM_TIER_LEGEND, PARTICLE_LANE_STATUS } from '../content/paperSurface';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    PIXEL_REFERENCE,
    PIXEL_UI_MAX,
    PIXEL_UI_MIN,
    deriveD11ForwardSeed,
    deriveTargetFreeElectroweakRepair,
    solveGaugeClosure,
} from '../core/ophMath';
import { useLabSetting, useLabState } from '../state/labState';

const MASS_SURFACE_OPTIONS = {
    betaCoefficients: BETA_COEFFICIENTS_MSSM_LIKE,
    su2MaxJ: 30,
    su3MaxIndex: 14,
    alphaRange: { min: 0.015, max: 0.09, step: 0.0005 },
} as const;

type DynamicMassRow = {
    label: string;
    valueGeV: number;
    deltaGeV: number;
    tier: 'structural' | 'calibration';
    note: string;
};

function formatMass(value: number) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    if (value === 0) {
        return '0 GeV';
    }
    return `${value.toFixed(6)} GeV`;
}

function formatSignedMass(value: number) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    const prefix = value > 0 ? '+' : '';
    return `${prefix}${value.toFixed(6)} GeV`;
}

function formatScalar(value: number, digits = 6) {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toFixed(digits);
}

function tierBorderColor(tier: DynamicMassRow['tier']) {
    return tier === 'structural' ? 'var(--accent-gold)' : 'var(--accent-green)';
}

export function MassesPage() {
    const [pixelConstant, setPixelConstant] = useLabSetting('masses.pixelConstant');
    const { resetKeys } = useLabState();

    const gaugeCore = useMemo(
        () => solveGaugeClosure(pixelConstant, MASS_SURFACE_OPTIONS),
        [pixelConstant]
    );
    const canonicalGaugeCore = useMemo(
        () => solveGaugeClosure(PIXEL_REFERENCE, MASS_SURFACE_OPTIONS),
        []
    );

    const electroweakRepair = useMemo(
        () => deriveTargetFreeElectroweakRepair(gaugeCore),
        [gaugeCore]
    );
    const canonicalElectroweakRepair = useMemo(
        () => deriveTargetFreeElectroweakRepair(canonicalGaugeCore),
        [canonicalGaugeCore]
    );

    const higgsTop = useMemo(
        () => deriveD11ForwardSeed(electroweakRepair),
        [electroweakRepair]
    );
    const canonicalHiggsTop = useMemo(
        () => deriveD11ForwardSeed(canonicalElectroweakRepair),
        [canonicalElectroweakRepair]
    );

    const dynamicRows = useMemo<DynamicMassRow[]>(
        () => [
            {
                label: 'photon',
                valueGeV: 0,
                deltaGeV: 0,
                tier: 'structural',
                note: 'Structural massless carrier on the realized electromagnetic branch. This row is symmetry-protected and does not move with P.',
            },
            {
                label: 'gluons',
                valueGeV: 0,
                deltaGeV: 0,
                tier: 'structural',
                note: 'Structural massless color carriers. Confinement changes free-particle observability, not the structural zero on this lane.',
            },
            {
                label: 'graviton',
                valueGeV: 0,
                deltaGeV: 0,
                tier: 'structural',
                note: 'Structural spin-2 zero on the OPH dynamical-metric branch. The P slider does not alter that exact structural statement.',
            },
            {
                label: 'W',
                valueGeV: electroweakRepair.mWGeV,
                deltaGeV: electroweakRepair.mWGeV - canonicalElectroweakRepair.mWGeV,
                tier: 'calibration',
                note: 'Public electroweak repair readout from the P-driven source basis.',
            },
            {
                label: 'Z',
                valueGeV: electroweakRepair.mZGeV,
                deltaGeV: electroweakRepair.mZGeV - canonicalElectroweakRepair.mZGeV,
                tier: 'calibration',
                note: 'Companion public electroweak repair row on the same source basis.',
            },
            {
                label: 'H',
                valueGeV: higgsTop.mHGeV,
                deltaGeV: higgsTop.mHGeV - canonicalHiggsTop.mHGeV,
                tier: 'calibration',
                note: 'Public Higgs row from the source-only Higgs/top split surface fed by the same electroweak source basis.',
            },
            {
                label: 't',
                valueGeV: higgsTop.mtPoleGeV,
                deltaGeV: higgsTop.mtPoleGeV - canonicalHiggsTop.mtPoleGeV,
                tier: 'calibration',
                note: 'Companion top row from the same source-only Higgs/top split surface.',
            },
        ],
        [canonicalElectroweakRepair.mWGeV, canonicalElectroweakRepair.mZGeV, canonicalHiggsTop.mHGeV, canonicalHiggsTop.mtPoleGeV, electroweakRepair.mWGeV, electroweakRepair.mZGeV, higgsTop.mHGeV, higgsTop.mtPoleGeV]
    );

    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Matter Continuations</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This page summarizes the OPH matter-sector status instead of presenting the withdrawn
                public calculator. It separates structural outputs, closed public rows, diagnostic
                checks, and the gaps that sit outside the public surface.
            </p>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Closed structural and calibration surfaces</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    The structural core includes the Standard Model gauge quotient, exact hypercharges,
                    N<sub>c</sub> = 3, N<sub>g</sub> = 3, and symmetry-protected massless photon/graviton zeros.
                </p>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    In the bosonic calibration sector, W/Z sit on the public electroweak repair
                    surface. Higgs/top sit on the source-only Higgs/top split surface. The exact
                    inverse pair is a check surface.
                    The canonical published bosonic surface uses P = {PIXEL_REFERENCE.toFixed(5)}; the interactive
                    readout below shows how the same bosonic formulas respond if you move that one
                    shared pixel input.
                </p>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Open matter-sector lanes</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, color: 'var(--text-secondary)' }}>
                    <li><strong>Quarks:</strong> OPH closes one exact public sextet on one physical frame fixed by P. A full classification of all quark frames is a separate object.</li>
                    <li><strong>Charged leptons:</strong> the exact same-family readback is explicit. The open step is the source landing that turns the shared geometric data into full physical charged masses.</li>
                    <li><strong>Neutrinos:</strong> one weighted-cycle branch emits an absolute family, the central splittings, and one physical Majorana pair. The exact fitting adapters are checks and stay off the public surface.</li>
                    <li><strong>Hadrons:</strong> hadron masses depend on a production backend and large compute budgets instead of a short symbolic surface.</li>
                </ul>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive Bosonic Surface From P</div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '14px' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ fontSize: '0.72em', padding: '4px 10px' }}
                        onClick={() => resetKeys(['masses.pixelConstant'])}
                    >
                        Reset P
                    </button>
                </div>

                <p style={{ marginTop: 0, marginBottom: '14px' }}>
                    Default P = <strong>{PIXEL_REFERENCE.toFixed(5)}</strong> reproduces the published
                    bosonic candidate surface. Moving the slider below evaluates the same bosonic
                    formulas off that canonical point. It is a branch readout on the same public
                    surface.
                </p>

                <div style={{ marginBottom: '18px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82em' }}>
                        <span style={{ color: 'var(--accent-gold)' }}>Pixel constant P = a_cell / l_P^2</span>
                        <span style={{ color: 'var(--accent-cyan)' }}>
                            {pixelConstant.toFixed(5)} ({pixelConstant >= PIXEL_REFERENCE ? '+' : ''}
                            {(pixelConstant - PIXEL_REFERENCE).toFixed(5)} vs canonical)
                        </span>
                    </div>
                    <input
                        type="range"
                        min={PIXEL_UI_MIN}
                        max={PIXEL_UI_MAX}
                        step="0.005"
                        value={pixelConstant}
                        onChange={event => setPixelConstant(Number(event.target.value))}
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '12px', marginBottom: '18px' }}>
                    <div className="card" style={{ padding: '14px', background: 'rgba(0,0,0,0.18)' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>alpha_U(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatScalar(gaugeCore.alphaU)}</div>
                    </div>
                    <div className="card" style={{ padding: '14px', background: 'rgba(0,0,0,0.18)' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>v(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatScalar(electroweakRepair.vGeV, 3)} GeV</div>
                    </div>
                    <div className="card" style={{ padding: '14px', background: 'rgba(0,0,0,0.18)' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>eta_source(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatScalar(electroweakRepair.etaSource)}</div>
                    </div>
                    <div className="card" style={{ padding: '14px', background: 'rgba(0,0,0,0.18)' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>rho_HT(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatScalar(higgsTop.rhoHT)}</div>
                    </div>
                    <div className="card" style={{ padding: '14px', background: 'rgba(0,0,0,0.18)' }}>
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>pi_y(P), pi_lambda(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {formatScalar(higgsTop.piY, 5)}, {formatScalar(higgsTop.piLambda, 5)}
                        </div>
                    </div>
                </div>

                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    P -&gt; alpha_U(P), eta_source(P), v(P) -&gt; electroweak repair -&gt; (W, Z)
                    <br />
                    rho_HT(P) = log(1 + tau2_tree_exact(P)) -&gt; (pi_y(P), pi_lambda(P)) -&gt; Higgs/top split -&gt; (H, t)
                </div>

                <div style={{ display: 'grid', gap: '10px' }}>
                    {dynamicRows.map((row) => (
                        <div
                            key={row.label}
                            className="card"
                            style={{ padding: '14px', background: 'rgba(0,0,0,0.18)', borderLeft: `3px solid ${tierBorderColor(row.tier)}` }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                                <strong>{row.label}</strong>
                                <span style={{ color: 'var(--accent-cyan)' }}>{formatMass(row.valueGeV)}</span>
                            </div>
                            <div style={{ fontSize: '0.76em', color: 'var(--text-muted)', marginBottom: '6px' }}>
                                {row.tier === 'structural'
                                    ? 'Invariant under P on the structural lane.'
                                    : `Delta from canonical P = ${PIXEL_REFERENCE.toFixed(5)}: ${formatSignedMass(row.deltaGeV)}`}
                            </div>
                            <div style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>{row.note}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Status language used here</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    This lab distinguishes:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, color: 'var(--text-secondary)' }}>
                    <li><strong>Closed:</strong> theorem-grade or calibration-grade public result.</li>
                    <li><strong>Continuation-only:</strong> an internal or same-family sidecar that sharpens the open object without replacing the public theorem frontier.</li>
                    <li><strong>Compare-only:</strong> a fit or diagnostic adapter that is numerically useful but not promoted as the theorem object.</li>
                    <li><strong>Open:</strong> an exact theorem object is open on the declared corpus.</li>
                </ul>
            </div>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Lane audit</h3>
                <div style={{ display: 'grid', gap: '10px' }}>
                    {PARTICLE_LANE_STATUS.map((lane) => (
                        <div key={lane.label} style={{ fontSize: '0.82em' }}>
                            <strong style={{ color: 'var(--accent-cyan)' }}>{lane.label}:</strong>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{lane.summary}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Claim-tier legend</h3>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {CLAIM_TIER_LEGEND.map((item) => (
                        <div key={item.tier} style={{ fontSize: '0.82em' }}>
                            <strong>{item.label}:</strong>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            <Explainer title="Why only some rows move with P">
                <p>
                    The particle paper makes a sharp split. Photon, gluons, and graviton are structural zeros on the
                    realized gauge/gravity branch, so their masses stay exactly zero. W and Z sit
                    on the closed electroweak repair surface, and Higgs/top sit on the downstream
                    source-only Higgs/top split surface fed by the same gauge core.
                </p>
                <p>
                    That is why changing P moves the bosonic rows but not the massless structural
                    rows. It does not say the entire matter sector closes from P on the declared
                    surface. Charged leptons, the full quark story away from the public frame, and
                    hadrons sit on separate surfaces.
                </p>
            </Explainer>
        </div>
    );
}
