import { Explainer } from '../components/Explainer';
import { BOSON_PUBLIC_ROWS, CLAIM_TIER_LEGEND, PREDICTION_SURFACE, RESEARCH_REPO_URL } from '../content/paperSurface';

function tierColor(tier: string) {
    switch (tier) {
        case 'frozen-prospective':
            return 'var(--accent-green)';
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
                rows. Some are continuation-level signal templates. Others lack a derived physical attachment. The page follows
                that ledger directly.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-green)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: 'var(--accent-green)' }}>
                    Why the cumulative result matters
                </h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    OPH uses no fitted continuous values in its structural theory layer, yet the same observer-patch
                    architecture supports a common dependency map across the source-derived finite 1+3 Lorentz precursor, the conditional Einstein branch,
                    quantum public records, a conditional Standard Model recognition packet, three colors, a rank-three
                    candidate family band, and linked conditional Higgs/cosmological capacity coordinates. The capacity
                    comparisons are target-exposed and carry no prediction status. A supplied free-scalar action joins
                    continuum and Fock detector readouts with a controlled error. Physical interacting matter requires
                    further attachment; these constructions are distinct from a frozen prospective test.
                </p>
            </div>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    How to read this page
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {CLAIM_TIER_LEGEND.filter((item) => ['frozen-prospective', 'calibration', 'continuation-only', 'open'].includes(item.tier)).map((item) => (
                        <div key={item.tier} style={{ fontSize: '0.82em' }}>
                            <strong>{item.label}:</strong>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>1. Frozen Prospective Branch Prediction</h3>
            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-green)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                    <strong>{PREDICTION_SURFACE.primitivePortPrediction.title}</strong>
                    <span style={{ color: 'var(--accent-green)', fontSize: '0.78em' }}>
                        {PREDICTION_SURFACE.primitivePortPrediction.tier}
                    </span>
                </div>
                <p style={{ color: 'var(--text-secondary)' }}>
                    {PREDICTION_SURFACE.primitivePortPrediction.summary}
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>
                    C<sub>4</sub> is the isotropic fourth-order coefficient, B<sub>0</sub> the isotropic
                    sixth-order coefficient, and B<sub>6</sub> the degree-six directional coefficient.
                </p>
                <div className="math-block" style={{ fontSize: '0.95em' }}>
                    C<sub>4</sub> = &minus;a<sup>2</sup>/20,&nbsp;
                    B<sub>0</sub> = a<sup>4</sup>/840,&nbsp;
                    B<sub>6</sub> = 2a<sup>4</sup>/7875
                    <br />
                    B<sub>6</sub>/C<sub>4</sub><sup>2</sup> = 32/315,&nbsp;
                    B<sub>0</sub>/C<sub>4</sub><sup>2</sup> = 10/21,&nbsp;
                    B<sub>6</sub>/B<sub>0</sub> = 16/75
                </div>
                <p style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
                    Minimal locally Lorentz-invariant Standard Model physics with General Relativity gives zero intrinsic
                    vacuum coefficients on this surface. Nonminimal Lorentz-violating physics and environmental anisotropy
                    can imitate a signal, so they belong in the comparison model.
                </p>
                <p style={{ marginBottom: '10px', color: 'var(--text-secondary)' }}>
                    {PREDICTION_SURFACE.primitivePortPrediction.boundary}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.82em' }}>
                    <a href={`${RESEARCH_REPO_URL}/blob/main/docs/FROZEN_PREDICTION_LADDER.md`}>Frozen contract and custody</a>
                    <a href={`${RESEARCH_REPO_URL}/blob/main/code/a5_fingerprint/runtime/spin_six_primitive_port_prediction_receipt.json`}>Exact coefficient receipt</a>
                    <a href={`${RESEARCH_REPO_URL}/blob/main/Lean/Screen/A5PrimitivePortPrediction.lean`}>Lean proof</a>
                    <a href={`${RESEARCH_REPO_URL}/blob/main/Lean/Screen/A5OrbitRaySeparation.lean`}>Orbit-ray separation proof</a>
                    <a href={`${RESEARCH_REPO_URL}/blob/main/claims/claim_registry.yaml`}>Physical-bridge classification</a>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>2. Declared Quantitative Rows</h3>
            <p style={{ marginBottom: '16px' }}>
                These rows include calibration coordinates and compare-only charts. Their tier labels control the claim.
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

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>3. Distinctive Signal Templates</h3>
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
                    area template. It sits outside the recovered-core theorem chain. A uniform-offset calculation
                    associated with an alpha = 4 or one-nat headline failed on its own assumptions and lies outside
                    the canonical forecast shown here.
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

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>4. Sharp Null Expectations</h3>
            <p style={{ marginBottom: '16px' }}>
                The public surface makes some clean exclusions with their branch boundaries attached.
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

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>5. What Would Put Real Pressure On OPH?</h3>
            <div className="card" style={{ marginBottom: '24px' }}>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
                    {PREDICTION_SURFACE.falsificationPressure.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9em', color: 'var(--accent-rose)' }}>
                    Prospective-evidence boundary
                </h4>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    The primitive-port coefficient relation is a frozen prospective prediction of its named physical
                    branch. The certified repair operator acts on internal seams and supplies neither spatial hops nor a
                    physical readout. Vertex, face, and edge orbit rays are mathematically distinct. The comparison is
                    unarmed because no source selection, physical sector bridge, coherent frame transport, or eligible
                    dataset contract is supplied. A failed comparison rejects that branch. It rejects the full framework only
                    if the bridge derivation proves the branch forced and exclusive.
                </p>
            </div>

            <Explainer title="Why the page is structured this way">
                <p>
                    A flat lab summary treats every eye-catching statement as if it sits on the same status tier. That
                    wording does not match the papers.
                </p>
                <p>
                    The exact displayed W/Z pair consumes the comparison target. The strict-one-loop complex-pole
                    map is checked for complete declared renormalized inputs, but the separate source values are
                    running-chart coordinates because OPH has not supplied those physical inputs and receipts. Higgs and top sit
                    on declared calibration surfaces. The horizon-comb and discrete-Hawking stories belong to
                    continuation lanes, and no physical source is supplied for the deep-IR galaxy-response story.
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
