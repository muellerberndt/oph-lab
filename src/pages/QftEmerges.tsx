import { Explainer } from '../components/Explainer';

export function QftEmergesPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>QFT Emerges</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This is the <strong>synthesis page for Chain 2</strong>. We have traced the derivation from the
                four axioms to the full Standard Model of particle physics. Quantum field theory &mdash; the
                framework that unifies quantum mechanics with special relativity &mdash; is not a starting point
                in OPH. It is an <strong>emergent effective description</strong> that arises from the screen
                algebra in the appropriate limits.
            </p>

            <div className="math-block" style={{ fontSize: '0.95em', lineHeight: '2.2' }}>
                A1-A4 &rarr; Complex Hilbert Space + Born Rule &rarr; Gauge-as-Gluing &rarr;
                SU(3)&times;SU(2)&times;U(1) &rarr; Edge-Sector Dynamics &rarr; Standard Model
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Complete Chain 2 Derivation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                {[
                    {
                        step: '1',
                        title: 'Quantum mechanics from overlap consistency',
                        detail: 'Axiom A2 + Gleason\'s theorem \u2192 Born rule. Complex Hilbert spaces from Conf\u207a(S\u00b2). "Collapse" = belief updating.',
                        color: 'var(--accent-blue)',
                    },
                    {
                        step: '2',
                        title: 'Entanglement structure',
                        detail: 'Bell inequality violation, Tsirelson bound 2\u221a2, monogamy of entanglement. All derived from complex Hilbert space structure.',
                        color: 'var(--accent-blue)',
                    },
                    {
                        step: '3',
                        title: 'Quantum error correction',
                        detail: 'Bulk-boundary map = quantum error-correcting code. Axiom A4 (Markov) = error-correction condition. Spacetime is a code.',
                        color: 'var(--accent-blue)',
                    },
                    {
                        step: '4',
                        title: 'Gauge symmetry from patch gluing',
                        detail: 'Assumption D: transition functions on overlaps \u2192 gauge group. Tannaka-Krein: edge-sector fusion rules \u2192 compact G.',
                        color: 'var(--accent-cyan)',
                    },
                    {
                        step: '5',
                        title: 'Standard Model gauge group',
                        detail: 'Anomaly cancellation + asymptotic freedom + minimality \u2192 SU(3) \u00d7 SU(2) \u00d7 U(1) uniquely. N_c=3, N_g=3.',
                        color: 'var(--accent-cyan)',
                    },
                    {
                        step: '6',
                        title: 'Particle spectrum and masses',
                        detail: 'Heat-kernel edge-sector law p_R ~ d_R exp(-t\u00b7C\u2082). Z\u2086 defect \u2192 Yukawa hierarchy y_f ~ 6^{-n_f}. Higgs mass from criticality.',
                        color: 'var(--accent-gold)',
                    },
                    {
                        step: '7',
                        title: 'Coupling unification',
                        detail: 'Peter-Weyl second-index mechanism \u2192 MSSM-like beta shifts \u0394b \u2248 (2.49, 4.38, 3.97) without superpartners.',
                        color: 'var(--accent-gold)',
                    },
                    {
                        step: '8',
                        title: 'Quantum field theory as effective description',
                        detail: 'In the continuum limit (many pixels, low curvature), the screen algebra reduces to a local QFT on the emergent spacetime.',
                        color: 'var(--accent-green)',
                    },
                ].map((item) => (
                    <div key={item.step} className="card" style={{ borderLeft: `3px solid ${item.color}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '28px',
                                height: '28px',
                                background: `${item.color}22`,
                                border: `1px solid ${item.color}`,
                                fontSize: '0.75em',
                                fontWeight: 700,
                                color: item.color,
                                flexShrink: 0,
                            }}>
                                {item.step}
                            </span>
                            <div>
                                <h4 style={{ margin: 0, fontSize: '0.9em' }}>{item.title}</h4>
                                <p style={{ margin: '4px 0 0', fontSize: '0.8em', color: 'var(--text-muted)' }}>
                                    {item.detail}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>What Chain 2 Derives</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(122, 184, 212, 0.1)', border: '1px solid rgba(122, 184, 212, 0.3)', fontSize: '0.85em' }}>
                    <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>Derived from Axioms</div>
                    <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                        <li>Complex Hilbert space structure</li>
                        <li>Born rule (probability = |amplitude|&sup2;)</li>
                        <li>Measurement as belief updating</li>
                        <li>Bell inequality violation</li>
                        <li>Tsirelson bound (2&radic;2)</li>
                        <li>Compact gauge groups</li>
                        <li>SU(3) &times; SU(2) &times; U(1)</li>
                        <li>Three generations (N<sub>g</sub> = 3)</li>
                        <li>Three colors (N<sub>c</sub> = 3)</li>
                        <li>Hypercharge quantization</li>
                        <li>Yukawa hierarchy (y<sub>f</sub> &sim; 6<sup>&minus;n</sup>)</li>
                        <li>Higgs mass (~125 GeV)</li>
                        <li>Coupling unification without SUSY</li>
                        <li>No proton decay</li>
                        <li>Massless photon and graviton</li>
                    </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(201, 169, 110, 0.1)', border: '1px solid rgba(201, 169, 110, 0.3)', fontSize: '0.85em' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>Input (Axioms + Assumptions)</div>
                    <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                        <li>A1: Screen net (patches on S&sup2;)</li>
                        <li>A2: Overlap consistency</li>
                        <li>A3: Area-entropy bound</li>
                        <li>A4: Local Markov condition</li>
                        <li>B: MaxEnt selection</li>
                        <li>C: Rotational invariance</li>
                        <li>D: Gauge-as-gluing</li>
                        <li>E: Central defect (Z<sub>6</sub>)</li>
                        <li>F: Collar refinement</li>
                        <li>G: Euclidean regularity</li>
                    </ul>
                    <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(0,0,0,0.2)', fontSize: '0.9em' }}>
                        <strong>Total free parameters: 2</strong>
                        <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>
                            a<sub>cell</sub> (pixel area) and log(dim H) (screen capacity)
                        </div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>QFT as Continuum Limit</h3>
            <p style={{ marginBottom: '16px' }}>
                Quantum field theory is the <strong>continuum limit</strong> of the screen algebra when:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li>The number of pixels is large (N &sim; 10<sup>122</sup>)</li>
                <li>The curvature scale is much larger than the Planck length (L &gt;&gt; l<sub>P</sub>)</li>
                <li>The observables are "coarse-grained" over many pixels</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
                In this limit, the discrete screen algebra smooths out into a local quantum field theory on
                the emergent 3+1D spacetime. The Wightman axioms (locality, Poincar&eacute; covariance, spectral
                condition) are satisfied in this limit. QFT is recovered, not assumed.
            </p>

            <Explainer title="Why QFT breaks down at the Planck scale">
                <p>
                    QFT is an effective description valid at energies E &lt;&lt; M<sub>P</sub> (distances L &gt;&gt; l<sub>P</sub>).
                    At the Planck scale, the continuum approximation breaks down because:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Individual pixels become resolved (the "lattice spacing" of the screen)</li>
                    <li>The area bound (Axiom A3) limits the number of degrees of freedom</li>
                    <li>The emergent spacetime geometry fluctuates on this scale</li>
                </ul>
                <p>
                    This explains why quantizing gravity as a QFT fails: GR + QFT is non-renormalizable because
                    QFT assumes a smooth background, but at the Planck scale the background IS the dynamical
                    variable (the screen). OPH replaces QFT with the screen algebra at the fundamental level.
                </p>
            </Explainer>

            <Explainer title="Chain 1 and Chain 2: same axioms, different paths">
                <p>
                    Both chains start from the same axioms A1-A4 but emphasize different aspects:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Chain 1 (GR):</strong> Emphasizes A3 (area bound) and MaxEnt. Uses entanglement equilibrium to derive Einstein's equations. Result: gravity and classical physics.</li>
                    <li><strong>Chain 2 (QFT):</strong> Emphasizes A2 (overlap consistency) and gauge-as-gluing. Uses Gleason + Tannaka-Krein to derive quantum mechanics and gauge theory. Result: the Standard Model.</li>
                </ul>
                <p>
                    The two chains are not independent: they share the same axioms and the same screen. The
                    Synthesis page shows how they combine into a unified picture.
                </p>
            </Explainer>

            <Explainer title="Open questions in Chain 2">
                <p>
                    While Chain 2 derives an impressive amount of the Standard Model, some aspects remain
                    under development:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Precise neutrino mass predictions</li>
                    <li>PMNS mixing angles from the Z<sub>6</sub> defect</li>
                    <li>Dark energy equation of state w(z)</li>
                    <li>Baryogenesis mechanism</li>
                    <li>Inflationary dynamics from screen growth</li>
                </ul>
                <p>
                    These are active areas of research within the OPH framework. The foundation (axioms &rarr; SM
                    gauge group &rarr; particle content) is established; the detailed phenomenology is being worked
                    out.
                </p>
            </Explainer>
        </div>
    );
}
