import { Explainer } from '../components/Explainer';
import { BOSON_PUBLIC_ROWS, CLAIM_TIER_LEGEND, PREDICTION_SURFACE } from '../content/paperSurface';

function tierColor(tier: string) {
    switch (tier) {
        case 'calibration':
            return 'var(--accent-green)';
        case 'continuation-only':
            return 'var(--accent-gold)';
        case 'open':
            return 'var(--accent-rose)';
        default:
            return 'var(--accent-cyan)';
    }
}

export function PredictionsPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation" style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}>Predictions</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Predictions And Pressure Tests</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                The OPH papers do not put every empirical statement on one tier. Some outputs are public quantitative
                rows. Some are continuation-level signal templates. Others are open phenomenology. This page follows
                that ledger directly.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    How to read this page
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {CLAIM_TIER_LEGEND.filter((item) => ['calibration', 'continuation-only', 'open'].includes(item.tier)).map((item) => (
                        <div key={item.tier} style={{ fontSize: '0.82em' }}>
                            <strong>{item.label}:</strong>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>1. Closed Public Quantitative Rows</h3>
            <p style={{ marginBottom: '16px' }}>
                These are the public numeric rows the lab treats as live surfaces.
            </p>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {BOSON_PUBLIC_ROWS.map((row) => (
                    <div key={row.label} className="card" style={{ borderLeft: `3px solid ${tierColor(row.tier)}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                            <strong>{row.label}</strong>
                            <span style={{ color: 'var(--accent-cyan)' }}>{row.value}</span>
                        </div>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{row.note}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>2. Distinctive Signal Templates</h3>
            <p style={{ marginBottom: '16px' }}>
                These are the more distinctive phenomenology surfaces. They are interesting, but the papers do not put
                all of them on the same footing.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Horizon spectroscopy comb
                </h4>
                <p style={{ marginBottom: '8px' }}>
                    The ringdown template uses the dimensionless line positions:
                </p>
                <div className="math-block" style={{ fontSize: '1.05em' }}>
                    x<sub>k</sub> = ln(k) / (8&pi;), &nbsp;&nbsp; k = 1, 2, 3, ...
                </div>
                <p style={{ marginBottom: '12px', color: 'var(--text-secondary)' }}>
                    In the declared stack this is a continuation-level horizon signature tied to the quantized
                    area template. It sits outside the recovered-core theorem chain.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', fontSize: '0.8em', textAlign: 'center' }}>
                    {[1, 2, 3, 4, 5, 6].map((k) => (
                        <div key={k} style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--accent-gold)', fontWeight: 600 }}>k = {k}</div>
                            <div style={{ color: 'var(--accent-cyan)' }}>
                                x = {(Math.log(k) / (8 * Math.PI)).toFixed(4)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {PREDICTION_SURFACE.distinctiveTemplates.map((item) => (
                    <div key={item.title} className="card" style={{ borderLeft: `3px solid ${tierColor(item.tier)}` }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                            <strong>{item.title}</strong>
                            <span style={{ color: tierColor(item.tier), fontSize: '0.78em' }}>{item.tier}</span>
                        </div>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{item.summary}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>3. Sharp Null Expectations</h3>
            <p style={{ marginBottom: '16px' }}>
                The public surface makes some clean exclusions. These are sharper than the older blanket
                wording the lab used before.
            </p>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {PREDICTION_SURFACE.nullExpectations.map((item) => (
                    <div key={item.title} className="card" style={{ borderLeft: '3px solid var(--accent-rose)' }}>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '6px' }}>
                            {item.title}
                        </div>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{item.summary}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>4. What Would Put Real Pressure On OPH?</h3>
            <div className="card" style={{ marginBottom: '24px' }}>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
                    {PREDICTION_SURFACE.falsificationPressure.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <Explainer title="Why the page is structured this way">
                <p>
                    The older lab treated every eye-catching statement as if it sat on the same status tier. That
                    wording does not match the papers.
                </p>
                <p>
                    The public rows for W, Z, Higgs, and top are outputs on declared calibration surfaces. The
                    horizon-comb and discrete-Hawking stories sit on continuation lanes. The deep-IR galaxy-response
                    story is an open lane. Mixing those together obscures the claim tiers.
                </p>
            </Explainer>

            <Explainer title="How to test the horizon-comb template">
                <p>
                    The cleanest route is high-SNR ringdown spectroscopy, especially with next-generation
                    detectors such as Einstein Telescope, Cosmic Explorer, and LISA.
                </p>
                <p>
                    Stacking analyses may be useful. But even a clean success or failure here would speak first
                    to a continuation-level signal surface, not by itself to every part of the OPH program.
                </p>
            </Explainer>
        </div>
    );
}
