import { Explainer } from '../components/Explainer';

export function PredictionsPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation" style={{ color: 'var(--accent-green)', borderColor: 'var(--accent-green)' }}>Predictions</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Testable Predictions</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                A theory without testable predictions is philosophy, not physics. OPH makes <strong>specific,
                quantitative predictions</strong> that distinguish it from the Standard Model, GUTs, string theory,
                and other approaches. Some are already consistent with observation; others await future experiments.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>1. Gravitational Wave Horizon Spectroscopy Comb</h3>
            <p style={{ marginBottom: '16px' }}>
                OPH's most distinctive prediction: gravitational waves emitted near a black hole horizon should
                carry a discrete spectral signature &mdash; a "frequency comb" with spacing determined by the
                horizon's quantized area spectrum.
            </p>
            <p style={{ marginBottom: '8px' }}>
                The comb frequencies are at positions:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                x<sub>k</sub> = ln(k) / (8&pi;), &nbsp;&nbsp; k = 1, 2, 3, ...
            </div>
            <p style={{ marginBottom: '16px' }}>
                where x<sub>k</sub> = (&omega; &minus; &omega;<sub>QNM</sub>) / &omega;<sub>gap</sub> are dimensionless
                frequency offsets from quasi-normal mode frequencies, measured in units of the fundamental area gap.
            </p>
            <p style={{ marginBottom: '16px' }}>
                This prediction arises because the screen has a finite number of pixels (area is quantized in units
                of a<sub>cell</sub> &asymp; 1.63 l<sub>P</sub>&sup2;). The logarithmic spacing ln(k) comes from the
                density of states of the area spectrum. This is a smoking-gun signature: no other theory predicts
                this specific comb pattern.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-green)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-green)' }}>
                    First Six Comb Lines
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px', fontSize: '0.8em', textAlign: 'center' }}>
                    {[1, 2, 3, 4, 5, 6].map(k => (
                        <div key={k} style={{ padding: '8px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                            <div style={{ color: 'var(--accent-green)', fontWeight: 600 }}>k = {k}</div>
                            <div style={{ color: 'var(--accent-cyan)' }}>
                                x = {(Math.log(k) / (8 * Math.PI)).toFixed(4)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>2. Discrete Hawking Spectrum</h3>
            <p style={{ marginBottom: '16px' }}>
                Standard Hawking radiation has a continuous thermal spectrum. In OPH, the finite pixel count
                of the screen means the spectrum is <strong>discrete</strong>: Hawking radiation comes in
                quantized energy packets corresponding to transitions between area eigenstates.
            </p>
            <p style={{ marginBottom: '16px' }}>
                For a solar-mass black hole, the discreteness is unobservably small (spacing &sim; 10<sup>&minus;77</sup> eV).
                But for primordial black holes near their final evaporation stage, the discrete spectrum could
                produce observable gamma-ray line emission instead of a continuous burst. This is potentially
                detectable by future gamma-ray observatories.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>3. Precision Numerics</h3>
            <p style={{ marginBottom: '16px' }}>
                OPH makes quantitative predictions for several parameters. Here is the comparison table:
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8em' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left', color: 'var(--accent-gold)' }}>Quantity</th>
                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--accent-gold)' }}>OPH Prediction</th>
                            <th style={{ padding: '8px', textAlign: 'right', color: 'var(--accent-gold)' }}>Observed</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['MOND scale a\u2080', '1.03 \u00d7 10\u207b\u00b9\u2070 m/s\u00b2', '1.2 \u00b1 0.3 \u00d7 10\u207b\u00b9\u2070 m/s\u00b2', 'consistent'],
                            ['Higgs mass m_H', '\u2248 125.08 GeV', '125.09 \u00b1 0.24 GeV', 'consistent'],
                            ['Screen capacity log(dim H)', '\u2248 10\u00b9\u00b2\u00b2', '~10\u00b9\u00b2\u00b2 (from \u039b)', 'consistent'],
                            ['Pixel area a_cell', '\u2248 1.63 l_P\u00b2', 'untested', 'pending'],
                            ['GW comb spacing', 'x_k = ln(k)/(8\u03c0)', 'untested', 'pending'],
                            ['Discrete Hawking lines', 'quantized spectrum', 'untested', 'pending'],
                            ['Proton decay', 'no decay', '\u03c4_p > 10\u00b3\u2074 yr', 'consistent'],
                            ['Superpartners', 'none at any scale', 'none at LHC', 'consistent'],
                            ['Cosmological constant', '\u039b from screen capacity', 'observed value', 'consistent'],
                            ['\u03b8_QCD', '0', '|\u03b8| < 10\u207b\u00b9\u2070', 'consistent'],
                        ].map(([qty, pred, obs, status], i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px', color: 'var(--text-primary)' }}>{qty}</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: 'var(--accent-cyan)' }}>{pred}</td>
                                <td style={{ padding: '8px', textAlign: 'right', color: 'var(--text-secondary)' }}>{obs}</td>
                                <td style={{ padding: '8px', textAlign: 'center' }}>
                                    <span style={{
                                        padding: '2px 8px',
                                        fontSize: '0.85em',
                                        color: status === 'consistent' ? 'var(--accent-green)' : 'var(--accent-amber)',
                                        border: `1px solid ${status === 'consistent' ? 'rgba(0,255,65,0.3)' : 'rgba(255,179,0,0.3)'}`,
                                        background: status === 'consistent' ? 'rgba(0,255,65,0.1)' : 'rgba(255,179,0,0.1)',
                                    }}>
                                        {status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>4. Null Predictions (What OPH Says Will NOT Be Found)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                    { item: 'Dark matter particles', reason: 'Rotation curves from Markov defect, not particles' },
                    { item: 'Superpartners (SUSY)', reason: 'Beta shifts from edge modes, not superpartners' },
                    { item: 'Proton decay', reason: 'Product gauge group, no leptoquarks' },
                    { item: 'Extra dimensions', reason: 'Spacetime is 3+1D from Conf\u207a(S\u00b2)' },
                    { item: 'Magnetic monopoles', reason: 'No GUT symmetry breaking' },
                    { item: 'Gravitino / axino', reason: 'No supersymmetry' },
                ].map((pred, i) => (
                    <div key={i} style={{ padding: '12px', background: 'rgba(201, 112, 112, 0.1)', border: '1px solid rgba(201, 112, 112, 0.3)', fontSize: '0.85em' }}>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '4px' }}>
                            No {pred.item}
                        </div>
                        <div style={{ color: 'var(--text-muted)' }}>{pred.reason}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>5. How to Test the GW Comb</h3>
            <p style={{ marginBottom: '16px' }}>
                The gravitational wave frequency comb is the most distinctive prediction. Testing it requires:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li><strong>High-SNR ringdown signals:</strong> Current detectors (LIGO/Virgo/KAGRA) detect
                    the dominant quasi-normal mode. Resolving the comb requires SNR &gt; 100 in the ringdown phase.</li>
                <li><strong>Next-generation detectors:</strong> Einstein Telescope, Cosmic Explorer, and LISA
                    will achieve the required sensitivity for stellar-mass and supermassive BH mergers.</li>
                <li><strong>Stacking analysis:</strong> Even with current data, stacking many ringdown events
                    could reveal the comb pattern statistically.</li>
            </ul>

            <Explainer title="Falsifiability">
                <p>
                    OPH is falsifiable. Clear paths to falsification include:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Detection of dark matter particles in direct detection experiments</li>
                    <li>Discovery of superpartners at any energy</li>
                    <li>Observation of proton decay</li>
                    <li>Detection of extra spatial dimensions</li>
                    <li>GW comb pattern not matching x<sub>k</sub> = ln(k)/(8&pi;)</li>
                    <li>Higgs mass inconsistent with criticality prediction</li>
                </ul>
                <p>
                    Any of these would falsify OPH. The theory makes sharp predictions and stands or falls on
                    experimental evidence.
                </p>
            </Explainer>

            <Explainer title="Timeline for experimental tests">
                <p>
                    <strong>Now &ndash; 2030:</strong> LHC Run 3 and HL-LHC. Continued null results for SUSY
                    and dark matter strengthen OPH. Improved Higgs mass measurement tests criticality prediction.
                </p>
                <p>
                    <strong>2030s:</strong> Einstein Telescope and Cosmic Explorer begin operation. First possibility
                    of resolving GW comb in high-SNR events. LISA launch probes supermassive BH mergers.
                </p>
                <p>
                    <strong>2030s+:</strong> Hyper-Kamiokande improves proton decay bounds by order of magnitude.
                    Next-generation dark matter experiments reach neutrino floor.
                </p>
            </Explainer>
        </div>
    );
}
