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
                five-axiom OPH ledger plus theorem-local technical premises to the structural Standard Model branch and
                several downstream matter-sector continuations. Quantum field theory &mdash; the framework that unifies
                quantum mechanics with special relativity &mdash; is not a starting point in OPH. It is an
                <strong>emergent effective description</strong> that arises from the screen algebra in the appropriate limits.
            </p>

            <div className="math-block" style={{ fontSize: '0.95em', lineHeight: '2.2' }}>
                A1-A4 + R0 + R1 + T1 + MAR + T4-T6 &rarr; QM + Gauge-as-Gluing &rarr;
                [SU(3)&times;SU(2)&times;U(1)]/Z6, N_c=3, N_g=3 &rarr; Structural SM + Continuation Lanes
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
                        detail: 'Bulk-boundary map = quantum error-correcting code. Axiom A4 supplies the recoverability side of that structure. Spacetime is a code.',
                        color: 'var(--accent-blue)',
                    },
                    {
                        step: '4',
                        title: 'Gauge symmetry from patch gluing',
                        detail: 'Gauge-as-gluing route: transition functions on overlaps \u2192 gauge group. Tannaka-Krein: edge-sector fusion rules \u2192 compact G.',
                        color: 'var(--accent-cyan)',
                    },
                    {
                        step: '5',
                        title: 'Standard Model gauge group',
                        detail: 'Admissibility filters + MAR lexicographic minimization over C=(chi_faith,N_nonab,N_c,N_g) \u2192 [SU(3)\u00d7SU(2)\u00d7U(1)]/Z6 with N_c=3, N_g=3.',
                        color: 'var(--accent-cyan)',
                    },
                    {
                        step: '6',
                        title: 'Matter-sector continuations',
                        detail: 'Quotient-constrained flavor structure and Koide-type relations remain downstream continuation branches rather than part of the recovered-core theorem package.',
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
                    <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>Structural outputs</div>
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
                        <li>Gauge-calibration and unification surfaces</li>
                        <li>No proton decay</li>
                        <li>Massless photon and graviton</li>
                    </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(201, 169, 110, 0.1)', border: '1px solid rgba(201, 169, 110, 0.3)', fontSize: '0.85em' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>Input Ledger</div>
                    <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                        <li>A1: Screen net (patches on S&sup2;)</li>
                        <li>A2: Overlap consistency</li>
                        <li>A3: local MaxEnt and refinement stability</li>
                        <li>A4: recoverable generalized entropy</li>
                        <li>R0: finite-dimensional regulator premise</li>
                        <li>R1: boundary gauge fixed-point premise</li>
                        <li>T1: vanishing relevant transport obstruction where global transportability is invoked: [z]=0 on the central branch or q<sub>&Sigma;</sub>=0 on the genuinely noncentral branch</li>
                        <li>MAR: minimal admissible realization selection axiom</li>
                        <li>T4: symmetric braiding in the 3+1D EFT branch</li>
                        <li>T5: bosonic fiber-functor premise, or explicit super-Tannakian fork</li>
                        <li>T6: directed colimit of transportable edge sectors with objectwise finite-dimensional fibers</li>
                    </ul>
                    <div style={{ marginTop: '12px', padding: '8px', background: 'rgba(0,0,0,0.2)', fontSize: '0.9em' }}>
                        <strong>External quantitative inputs on the public surface: 2</strong>
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
                    Both chains share the same core local axioms A1-A4, and the extended theory adds MAR as an
                    axiom-level selector:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Chain 1 (GR):</strong> Emphasizes recoverability, generalized entropy, the BW branch, the null bridge, and fixed-cap stationarity. Result: a conditional Lorentz branch and a conditional Jacobson-type Einstein branch.</li>
                    <li><strong>Chain 2 (QFT):</strong> Emphasizes overlap consistency, gauge-as-gluing, then R0/R1/T1 with MAR and T4-T6 for compact gauge reconstruction. Result: the structural Standard Model branch plus downstream continuation lanes.</li>
                </ul>
                <p>
                    The two chains are not independent: they share the same screen and foundational structure. MAR
                    is the extended-theory selector that resolves admissible branches in Chain 2.
                </p>
                <p>
                    Synthesis page shows how they combine into a unified picture.
                </p>
            </Explainer>

            <Explainer title="Open questions in Chain 2">
                <p>
                    While Chain 2 derives an impressive amount of the Standard Model, some aspects remain
                    under development:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Quarks carry a strict present-premise no-go for full physical closure; the exact next objects are the minimal extension triple <code>H_mass</code>, <code>H_phys</code>, and <code>H_abs</code></li>
                    <li>Charged-lepton centered-operator promotion and the later affine descent to &mu;<sub>phys</sub>(Y<sub>e</sub>)</li>
                    <li>Neutrino theorem pair emitted on the weighted-cycle branch; older exact adapters remain diagnostic-only beneath that branch</li>
                    <li>Higgs/top paper-surface proof packaging beyond the closed forward seed</li>
                    <li>Hadron backend / compute-bound closure</li>
                </ul>
                <p>
                    The foundation (axioms &rarr; gauge branch &rarr; particle-structure ledger) is stronger than the
                    detailed matter continuations. Some bosonic sectors and the weighted-cycle neutrino branch are
                    closed on their declared surfaces, while the charged and physical-quark lanes remain open at
                    sharper theorem objects.
                </p>
            </Explainer>
        </div>
    );
}
