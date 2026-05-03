import { useMemo } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';
import { OPH_PAPERS } from '../content/paperSurface';
import {
    BETA_COEFFICIENTS_MSSM_LIKE,
    PIXEL_REFERENCE,
    PIXEL_UI_MAX,
    PIXEL_UI_MIN,
    SCREEN_CAPACITY_REFERENCE_LOG10,
    SCREEN_CAPACITY_UI_MAX,
    SCREEN_CAPACITY_UI_MIN,
    deriveD11ForwardSeed,
    deriveTargetFreeElectroweakRepair,
    hubbleFromLambda,
    lambdaFromScreen,
    newtonConstantFromPixel,
    pDrivenQuarkMassesFromClosure,
    solveGaugeClosure,
    thomsonEndpointAlphaInverse,
} from '../core/ophMath';
import { useLabSetting, useLabState } from '../state/labState';

type LiveRow = {
    label: string;
    note: string;
    unit: string;
    value: number;
    baseline: number;
    format: (value: number) => string;
};

type SurfaceBoardRow = {
    label: string;
    family: string;
    familyClass: 'gr' | 'qft' | 'exact';
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
};

const CANONICAL_GAUGE_OPTIONS = {
    betaCoefficients: BETA_COEFFICIENTS_MSSM_LIKE,
    su2MaxJ: 30,
    su3MaxIndex: 14,
    alphaRange: { min: 0.015, max: 0.09, step: 0.0005 },
} as const;

function formatFixed(value: number, digits = 6): string {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toFixed(digits);
}

function formatScientific(value: number, digits = 3): string {
    if (!Number.isFinite(value)) {
        return 'n/a';
    }
    return value.toExponential(digits);
}

function formatRowValue(row: LiveRow, value: number): string {
    const formatted = row.format(value);
    return row.unit ? `${formatted} ${row.unit}` : formatted;
}

function renderCompactSurfaceBoard(rows: SurfaceBoardRow[]) {
    return (
        <section className="card compact-live-board">
            <div className="metric-section-header">
                <div>
                    <h3 style={{ margin: 0, fontSize: '0.95em' }}>OPH outputs</h3>
                    <p className="compact-live-board-copy">
                        Each tile shows the configured OPH readout beside the Our Universe readout on the same declared surface.
                    </p>
                </div>
                <span style={{ fontSize: '0.72em', color: 'var(--accent-gold)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                    {rows.length} total rows
                </span>
            </div>
            <div className="compact-live-grid">
                {rows.map((row) => (
                    <article key={`${row.family}-${row.label}`} className="compact-live-card">
                        <div className="compact-live-card-header">
                            <strong className="compact-live-label">{row.label}</strong>
                            <span className={`compact-live-family compact-live-family-${row.familyClass}`}>{row.family}</span>
                        </div>
                        <div>
                            <span className="metric-card-caption">{row.primaryLabel}</span>
                            <div className="compact-live-value">{row.primaryValue}</div>
                        </div>
                        <div className="compact-live-baseline">
                            <span className="metric-card-caption">{row.secondaryLabel}</span>
                            <div className="compact-live-baseline-value">{row.secondaryValue}</div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

export function Home() {
    const [pixelConstant, setPixelConstant] = useLabSetting('landing.pixelConstant');
    const [logCapacity, setLogCapacity] = useLabSetting('landing.logCapacity');
    const { resetKeys } = useLabState();

    const liveSurface = useMemo(() => {
        // Paper references:
        // - particle paper: electroweak repair, pending Ward-projected Thomson
        //   endpoint, and source-only Higgs split.
        // - compact paper + README local unification surface: G(P) and Lambda = 3 pi / (G N_scr).
        const closure = solveGaugeClosure(pixelConstant, CANONICAL_GAUGE_OPTIONS);
        const electroweakRepair = deriveTargetFreeElectroweakRepair(closure);
        const higgsTop = deriveD11ForwardSeed(electroweakRepair);
        const newtonConstant = newtonConstantFromPixel(pixelConstant);
        const lambda = lambdaFromScreen(pixelConstant, logCapacity);
        const hubble = hubbleFromLambda(lambda);
        const thomsonAlphaInv = Number.isFinite(closure.alphaEm) && closure.alphaEm > 0
            ? thomsonEndpointAlphaInverse(1 / closure.alphaEm)
            : Number.NaN;

        return {
            closure,
            electroweakRepair,
            higgsTop,
            newtonConstant,
            lambda,
            hubble,
            thomsonAlphaInv,
        };
    }, [logCapacity, pixelConstant]);

    const canonicalSurface = useMemo(() => {
        const closure = solveGaugeClosure(PIXEL_REFERENCE, CANONICAL_GAUGE_OPTIONS);
        const electroweakRepair = deriveTargetFreeElectroweakRepair(closure);
        const higgsTop = deriveD11ForwardSeed(electroweakRepair);
        const newtonConstant = newtonConstantFromPixel(PIXEL_REFERENCE);
        const lambda = lambdaFromScreen(PIXEL_REFERENCE, SCREEN_CAPACITY_REFERENCE_LOG10);
        const hubble = hubbleFromLambda(lambda);
        const thomsonAlphaInv = Number.isFinite(closure.alphaEm) && closure.alphaEm > 0
            ? thomsonEndpointAlphaInverse(1 / closure.alphaEm)
            : Number.NaN;

        return {
            closure,
            electroweakRepair,
            higgsTop,
            newtonConstant,
            lambda,
            hubble,
            thomsonAlphaInv,
        };
    }, []);

    const classicalRows = useMemo<LiveRow[]>(() => [
        {
            label: "Newton's gravitational constant",
            value: liveSurface.newtonConstant,
            baseline: canonicalSurface.newtonConstant,
            unit: 'm^3 kg^-1 s^-2',
            note: 'Local gravity-side readout from the inverse pixel law at fixed microscopic a_cell.',
            format: (value) => formatScientific(value, 6),
        },
        {
            label: 'Cosmological constant',
            value: liveSurface.lambda,
            baseline: canonicalSurface.lambda,
            unit: 'm^-2',
            note: 'Global screen-capacity descendant on the de Sitter entropy normalization.',
            format: (value) => formatScientific(value, 3),
        },
        {
            label: 'Hubble rate',
            value: liveSurface.hubble,
            baseline: canonicalSurface.hubble,
            unit: 's^-1',
            note: 'de Sitter Hubble scale from the same Lambda branch.',
            format: (value) => formatScientific(value, 3),
        },
    ], [canonicalSurface.hubble, canonicalSurface.lambda, canonicalSurface.newtonConstant, liveSurface.hubble, liveSurface.lambda, liveSurface.newtonConstant]);

    const quantumRows = useMemo<LiveRow[]>(() => [
        {
            label: 'Inverse fine-structure constant',
            value: liveSurface.thomsonAlphaInv,
            baseline: canonicalSurface.thomsonAlphaInv,
            unit: '',
            note: 'Thomson endpoint pending source transport; external metrology remains compare-only. A pending hardware note reports a corroborating optical-cavity check.',
            format: (value) => formatFixed(value, 9),
        },
        {
            label: 'W boson mass',
            value: liveSurface.electroweakRepair.mWGeV,
            baseline: canonicalSurface.electroweakRepair.mWGeV,
            unit: 'GeV',
            note: 'Public electroweak repair row.',
            format: (value) => formatFixed(value, 9),
        },
        {
            label: 'Z boson mass',
            value: liveSurface.electroweakRepair.mZGeV,
            baseline: canonicalSurface.electroweakRepair.mZGeV,
            unit: 'GeV',
            note: 'Companion electroweak repair row on the same source basis.',
            format: (value) => formatFixed(value, 9),
        },
        {
            label: 'Higgs boson mass',
            value: liveSurface.higgsTop.mHGeV,
            baseline: canonicalSurface.higgsTop.mHGeV,
            unit: 'GeV',
            note: 'Public Higgs row from the source-only split surface.',
            format: (value) => formatFixed(value, 9),
        },
    ], [canonicalSurface.electroweakRepair.mWGeV, canonicalSurface.electroweakRepair.mZGeV, canonicalSurface.higgsTop.mHGeV, canonicalSurface.thomsonAlphaInv, liveSurface.electroweakRepair.mWGeV, liveSurface.electroweakRepair.mZGeV, liveSurface.higgsTop.mHGeV, liveSurface.thomsonAlphaInv]);

    const quarkRows = useMemo<SurfaceBoardRow[]>(() => {
        // Paper references:
        // - particle paper quark mass law on the public quark frame fixed by P
        // - browser runtime port in ophMath.ts, which carries the moving quark
        //   surface through the affine sector means and centered log structure
        // Caveat:
        // - "Our Universe" is the exact public anchor from the particle codebase.
        // - "Configured" away from that anchor is the reduced candidate surface
        //   used by the lab runtime. It is not the full arbitrary-P public closure.
        const predictions = pDrivenQuarkMassesFromClosure(liveSurface.closure);
        const labelMap: Record<string, string> = {
            up: 'Up quark mass',
            down: 'Down quark mass',
            strange: 'Strange quark mass',
            charm: 'Charm quark mass',
            bottom: 'Bottom quark mass',
        };

        return predictions
            .filter((row) => row.id in labelMap)
            .map((row) => ({
                label: labelMap[row.id] ?? row.label,
                family: 'QUARKS',
                familyClass: 'exact' as const,
                primaryLabel: 'Configured',
                primaryValue: `${formatFixed(row.massGeV, 9)} GeV`,
                secondaryLabel: 'Our Universe',
                secondaryValue: `${formatFixed(row.baselineMassGeV, 9)} GeV`,
            }));
    }, [liveSurface.closure]);

    const surfaceBoardRows = useMemo<SurfaceBoardRow[]>(() => [
        ...classicalRows.map((row) => ({
            label: row.label,
            family: 'GRAVITY',
            familyClass: 'gr' as const,
            primaryLabel: 'Configured',
            primaryValue: formatRowValue(row, row.value),
            secondaryLabel: 'Our Universe',
            secondaryValue: formatRowValue(row, row.baseline),
        })),
        ...quantumRows.map((row) => {
            const family = row.label.includes('fine-structure') ? 'COUPLINGS' : 'BOSONS';
            return {
                label: row.label,
                family,
                familyClass: 'qft' as const,
                primaryLabel: 'Configured',
                primaryValue: formatRowValue(row, row.value),
                secondaryLabel: 'Our Universe',
                secondaryValue: formatRowValue(row, row.baseline),
            };
        }),
        ...quarkRows,
    ], [classicalRows, quarkRows, quantumRows]);

    return (
        <div className="landing-surface-page">
            <div className="demo-container landing-controls-shell" style={{ marginTop: 0 }}>
                <div className="landing-controls-header">
                    <h1 className="landing-controls-title">Configure Your Universe</h1>
                    <div className="landing-actions landing-actions-top">
                        <button
                            className="btn btn-ghost"
                            onClick={() => resetKeys(['landing.pixelConstant', 'landing.logCapacity'])}
                        >
                            <RefreshCw size={16} />
                            Reset To Our Universe
                        </button>
                    </div>
                </div>
                <p className="landing-controls-intro">
                    The simulation screen we inhabit is configured with <strong>P = {PIXEL_REFERENCE.toFixed(5)}</strong> and
                    <strong> log10 N_scr = {SCREEN_CAPACITY_REFERENCE_LOG10}</strong>. Adjust either constant to evaluate the
                    OPH formulas on a different screen.
                </p>

                <div className="landing-controls-grid">
                    <div className="input-control-card">
                        <div className="input-control-header">
                            <div>
                                <div className="input-control-label">Pixel constant P</div>
                                <div className="input-control-value">{pixelConstant.toFixed(5)}</div>
                            </div>
                            <div className="input-control-release">our Universe {PIXEL_REFERENCE.toFixed(5)}</div>
                        </div>
                        <div className="input-control-caption">P = a_cell / l_P^2</div>
                        <input
                            type="range"
                            min={PIXEL_UI_MIN}
                            max={PIXEL_UI_MAX}
                            step="0.005"
                            value={pixelConstant}
                            onChange={(event) => setPixelConstant(Number(event.target.value))}
                        />
                        <div className="input-control-footer">
                            <span className="input-control-range-note">range {PIXEL_UI_MIN.toFixed(2)} to {PIXEL_UI_MAX.toFixed(2)}</span>
                            <input
                                type="number"
                                value={pixelConstant}
                                min={PIXEL_UI_MIN}
                                max={PIXEL_UI_MAX}
                                step="0.00001"
                                onChange={(event) => setPixelConstant(Number(event.target.value))}
                                className="input-control-number"
                            />
                        </div>
                    </div>

                    <div className="input-control-card">
                        <div className="input-control-header">
                            <div>
                                <div className="input-control-label">Screen capacity</div>
                                <div className="input-control-value">{logCapacity.toFixed(2)}</div>
                            </div>
                            <div className="input-control-release">our Universe {SCREEN_CAPACITY_REFERENCE_LOG10}</div>
                        </div>
                        <div className="input-control-caption">log10 N_scr</div>
                        <input
                            type="range"
                            min={SCREEN_CAPACITY_UI_MIN}
                            max={SCREEN_CAPACITY_UI_MAX}
                            step="0.05"
                            value={logCapacity}
                            onChange={(event) => setLogCapacity(Number(event.target.value))}
                        />
                        <div className="input-control-footer">
                            <span className="input-control-range-note">range {SCREEN_CAPACITY_UI_MIN} to {SCREEN_CAPACITY_UI_MAX}</span>
                            <input
                                type="number"
                                value={logCapacity}
                                min={SCREEN_CAPACITY_UI_MIN}
                                max={SCREEN_CAPACITY_UI_MAX}
                                step="0.01"
                                onChange={(event) => setLogCapacity(Number(event.target.value))}
                                className="input-control-number"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {renderCompactSurfaceBoard(surfaceBoardRows)}
            <p className="landing-surface-note">
                This board combines the local unification readouts <strong>G(P)</strong> and <strong>Lambda = 3pi / (G N_scr)</strong>,
                the electroweak repair, the pending Ward-projected Thomson endpoint, the Higgs split, and the
                quark mass surface used in the lab runtime.
            </p>
            <section className="card landing-links-card">
                <div className="landing-links-header">
                    <h3 style={{ margin: 0, fontSize: '0.95em' }}>Explore The Particle Derivation</h3>
                    <p className="landing-links-copy">
                        Read the particle paper and inspect the particles code behind these outputs.
                    </p>
                </div>
                <div className="landing-links-grid">
                    <a
                        className="landing-link-tile"
                        href="https://github.com/FloatingPragma/observer-patch-holography/blob/main/paper/deriving_the_particle_zoo_from_observer_consistency.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="landing-link-kicker">Paper</span>
                        <strong className="landing-link-title">Deriving the Particle Zoo</strong>
                        <span className="landing-link-body">Full PDF of the particle derivation.</span>
                        <span className="landing-link-cta">
                            <ExternalLink size={14} />
                            Open paper
                        </span>
                    </a>
                    <a
                        className="landing-link-tile"
                        href="https://github.com/FloatingPragma/observer-patch-holography/tree/main/code/particles"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <span className="landing-link-kicker">Code</span>
                        <strong className="landing-link-title">Particles Code</strong>
                        <span className="landing-link-body">Browse the derivation artifacts and particle-status code in GitHub.</span>
                        <span className="landing-link-cta">
                            <ExternalLink size={14} />
                            Open code
                        </span>
                    </a>
                </div>
            </section>
            <div className="card" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginTop: 0, fontSize: '0.95em' }}>OPH Paper Stack</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                    {OPH_PAPERS.map((paper) => (
                        <a
                            key={paper.slug}
                            href={paper.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                padding: '14px',
                                background: 'rgba(0,0,0,0.18)',
                                border: '1px solid var(--border-color)',
                                textDecoration: 'none',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{paper.title}</strong>
                                <span style={{ color: 'var(--accent-gold)', fontSize: '0.78em' }}>{paper.surface}</span>
                            </div>
                            <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{paper.summary}</div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
