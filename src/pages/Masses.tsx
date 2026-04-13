import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { CLAIM_TIER_LEGEND, PARTICLE_LANE_STATUS } from '../content/paperSurface';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    PIXEL_REFERENCE,
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
        () => deriveD11ForwardSeed(gaugeCore),
        [gaugeCore]
    );
    const canonicalHiggsTop = useMemo(
        () => deriveD11ForwardSeed(canonicalGaugeCore),
        [canonicalGaugeCore]
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
                note: 'D10 target-free source-only repair theorem readout from the P-driven electroweak source basis.',
            },
            {
                label: 'Z',
                valueGeV: electroweakRepair.mZGeV,
                deltaGeV: electroweakRepair.mZGeV - canonicalElectroweakRepair.mZGeV,
                tier: 'calibration',
                note: 'Closed on the same D10 target-free repair surface. The canonical published row is recovered at the default P.',
            },
            {
                label: 'H',
                valueGeV: higgsTop.mHGeV,
                deltaGeV: higgsTop.mHGeV - canonicalHiggsTop.mHGeV,
                tier: 'calibration',
                note: 'D11 one-scalar forward-seed branch sourced by the same P-driven D10 gauge core, not by the compare-only inverse adapter.',
            },
            {
                label: 't',
                valueGeV: higgsTop.mtPoleGeV,
                deltaGeV: higgsTop.mtPoleGeV - canonicalHiggsTop.mtPoleGeV,
                tier: 'calibration',
                note: 'Top pole row from the same D11 forward seed as the Higgs branch.',
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
                This page summarizes the current OPH matter-sector status instead of presenting the older withdrawn
                public calculator. The paper surface is split into structural outputs, closed calibration sectors,
                continuation lanes, compare-only adapters, and open theorem objects.
            </p>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Closed structural and calibration surfaces</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    The structural core still includes the Standard Model gauge quotient, exact hypercharges,
                    N<sub>c</sub> = 3, N<sub>g</sub> = 3, and symmetry-protected massless photon/graviton zeros.
                </p>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    In the bosonic calibration sector, W/Z are closed on the D10 surface. Higgs/top public rows are
                    carried by a closed one-scalar D11 forward seed, while the exact inverse pair remains compare-only.
                    The canonical published bosonic surface uses P = {PIXEL_REFERENCE.toFixed(5)}; the interactive
                    readout below shows how the same D10/D11 formulas respond if you move that one shared pixel input.
                </p>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Open matter-sector lanes</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, color: 'var(--text-secondary)' }}>
                    <li><strong>Quarks:</strong> the maximal theorem-emitted package on the present ledger is the D12 mass ray, the negative selector <code>sigma_ref</code>, and the restricted-scope affine mean package with <code>g_ch = 0.9231656602589082</code> on <code>shared_budget_only</code> and <code>(g_u, g_d) = (0.7797392875757557, 0.12172551081512113)</code> on <code>current_family_only</code>. The exact minimal extension triple above that package is <code>H_mass : ell_ud = log(c_d / c_u)</code>, <code>H_phys : s_ud^phys : M_ud^&#123;CR,phys&#125; -&gt; Sigma_ud^phys</code>, and <code>H_abs : A_q^phys : Sigma_ud^phys -&gt; R</code>.</li>
                    <li><strong>Charged leptons:</strong> centered readback is exact, but the theorem lane stays open first at the promotion of Ĉ<sub>e</sub><sup>cand</sup> and then at the affine descent to &mu;<sub>phys</sub>(Y<sub>e</sub>).</li>
                    <li><strong>Neutrinos:</strong> the weighted-cycle theorem pair emits C<sub>&nu;</sub> = sum_gap<sup>2</sup> prod_qbar solar_response_over_mstar<sup>-1/2</sup>, B<sub>&nu;</sub> = P<sub>&nu;</sub>C<sub>&nu;</sub>, and the absolute neutrino family on the declared weighted-cycle branch. The older exact adapter, bridge corridor, and correction audit remain diagnostic-only.</li>
                    <li><strong>Hadrons:</strong> backend- and compute-bound rather than theorem-closed.</li>
                </ul>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive Bosonic Trunk From P</div>

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
                    Default P = <strong>{PIXEL_REFERENCE.toFixed(5)}</strong> reproduces the current published
                    bosonic candidate surface. Moving the slider below evaluates the same D10/D11 branch formulas off
                    that canonical point; it is a branch readout, not a new claim tier.
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
                        min="1.15"
                        max="2.15"
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
                        <div style={{ fontSize: '0.72em', color: 'var(--text-muted)', marginBottom: '6px' }}>sigma_D11_HT(P)</div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>{formatScalar(higgsTop.sigmaD11HT)}</div>
                    </div>
                </div>

                <div className="math-block" style={{ fontSize: '0.84em' }}>
                    P -&gt; alpha_U(P), eta_source(P), v(P) -&gt; D10 target-free repair -&gt; (W, Z)
                    <br />
                    sigma_D11,HT(P) = alpha_U(P) cos(2 theta_W0(P)) / sqrt(pi) -&gt; (H, t)
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
                                    ? 'Invariant under P on the current structural lane.'
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
                    <li><strong>Open:</strong> a remaining exact theorem object has not yet been emitted on the current corpus.</li>
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
                    realized gauge/gravity branch, so their masses stay exactly zero. W and Z sit on the closed D10
                    calibration lane, and Higgs/top sit on the downstream D11 forward seed fed by the same gauge core.
                </p>
                <p>
                    That is why changing P should move the D10/D11 bosonic rows but not the massless structural rows.
                    It does not say the entire matter sector is closed from P today; charged leptons, physical quark
                    closure, and hadrons still have explicit remaining blockers on the current corpus.
                </p>
            </Explainer>
        </div>
    );
}
