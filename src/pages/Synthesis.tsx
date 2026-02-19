import { Explainer } from '../components/Explainer';

export function SynthesisPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Synthesis</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>The Unified Picture</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Both chains converge. Chain 1 derives gravity and classical physics. Chain 2 derives quantum
                mechanics and the Standard Model. Both start from the same four axioms about observer patches
                on a holographic screen S&sup2;. The result is a <strong>complete framework for known physics</strong>
                built from two parameters.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Two Parameters, All of Physics</h3>
            <p style={{ marginBottom: '16px' }}>
                The entire OPH framework has exactly <strong>two free parameters</strong>:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                        1. Pixel Area a<sub>cell</sub>
                    </h4>
                    <div className="math-block" style={{ fontSize: '1em', margin: '0 0 12px' }}>
                        a<sub>cell</sub> &asymp; 1.63 l<sub>P</sub>&sup2;
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85em' }}>
                        The area of a single pixel on the holographic screen, in Planck units. This sets
                        Newton's gravitational constant G, the Planck length l<sub>P</sub>, and the fundamental
                        discreteness scale of spacetime. It is the "resolution" of reality.
                    </p>
                </div>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                        2. Screen Capacity log(dim H)
                    </h4>
                    <div className="math-block" style={{ fontSize: '1em', margin: '0 0 12px' }}>
                        log(dim H<sub>tot</sub>) &asymp; 10<sup>122</sup>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85em' }}>
                        The total information capacity of the screen, measured in nats. This sets the
                        cosmological constant &Lambda;, the Hubble parameter H, the de Sitter temperature
                        T<sub>dS</sub>, and the MOND scale a<sub>0</sub>. It is the "size" of reality.
                    </p>
                </div>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Everything else &mdash; the Standard Model gauge group, particle spectrum, masses, coupling
                constants, Newton's laws, Einstein's equations, thermodynamics &mdash; follows from the axioms
                plus these two numbers.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Two Chains Unified</h3>

            <div className="demo-container" style={{ background: 'rgba(0,0,0,0.3)' }}>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: 'rgba(201, 169, 110, 0.15)',
                        border: '1px solid var(--accent-gold)',
                        color: 'var(--accent-gold)',
                        fontWeight: 700,
                        fontSize: '1em',
                    }}>
                        AXIOMS A1-A4
                    </div>
                    <div style={{ color: 'var(--text-muted)', margin: '8px 0', fontSize: '1.2em' }}>&darr;</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                    {/* Chain 1 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <div style={{ padding: '8px 16px', background: 'rgba(201,112,112,0.15)', border: '1px solid var(--accent-rose)', color: 'var(--accent-rose)', fontSize: '0.8em', fontWeight: 600, textAlign: 'center', width: '100%' }}>
                            CHAIN 1: GR
                        </div>
                        {['Entropy + Area Bound', 'Conf\u207a(S\u00b2) = SO\u207a(3,1)', 'Modular Flow = Time', '\u03b4S_gen = 0 (MaxEnt)', 'Einstein Equations', 'Classical Physics'].map((step, i) => (
                            <div key={i} style={{ width: '100%' }}>
                                <div style={{ padding: '6px 12px', background: 'rgba(201,112,112,0.05)', border: '1px solid rgba(201,112,112,0.2)', fontSize: '0.75em', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    {step}
                                </div>
                                {i < 5 && <div style={{ textAlign: 'center', color: 'rgba(201,112,112,0.4)', fontSize: '0.8em' }}>&darr;</div>}
                            </div>
                        ))}
                    </div>

                    {/* Chain 2 */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                        <div style={{ padding: '8px 16px', background: 'rgba(122,184,212,0.15)', border: '1px solid var(--accent-blue)', color: 'var(--accent-blue)', fontSize: '0.8em', fontWeight: 600, textAlign: 'center', width: '100%' }}>
                            CHAIN 2: QFT
                        </div>
                        {['QM from Overlap Consistency', 'Gauge-as-Gluing', 'SU(3)\u00d7SU(2)\u00d7U(1)', 'Edge-Sector Dynamics', 'Standard Model', 'Quantum Field Theory'].map((step, i) => (
                            <div key={i} style={{ width: '100%' }}>
                                <div style={{ padding: '6px 12px', background: 'rgba(122,184,212,0.05)', border: '1px solid rgba(122,184,212,0.2)', fontSize: '0.75em', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    {step}
                                </div>
                                {i < 5 && <div style={{ textAlign: 'center', color: 'rgba(122,184,212,0.4)', fontSize: '0.8em' }}>&darr;</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ textAlign: 'center' }}>
                    <div style={{ color: 'var(--text-muted)', margin: '8px 0', fontSize: '1.2em' }}>&darr;</div>
                    <div style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: 'rgba(0, 255, 65, 0.1)',
                        border: '1px solid var(--accent-green)',
                        color: 'var(--accent-green)',
                        fontWeight: 700,
                        fontSize: '0.9em',
                    }}>
                        UNIFIED PHYSICS (2 parameters)
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>What OPH Unifies</h3>
            <p style={{ marginBottom: '16px' }}>
                The deepest achievement of OPH is the <strong>unification of gravity and quantum mechanics</strong>.
                In the standard picture, these are separate theories with incompatible foundations:
            </p>

            <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.85em' }}>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '4px' }}>Standard Picture</div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>GR = smooth geometry</li>
                            <li>QM = Hilbert space</li>
                            <li>Incompatible at Planck scale</li>
                            <li>25+ free parameters</li>
                        </ul>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>String Theory</div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>10/11 dimensions</li>
                            <li>Compactification landscape</li>
                            <li>10<sup>500</sup> vacua</li>
                            <li>No unique predictions</li>
                        </ul>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>OPH</div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>2D screen &rarr; 3+1D spacetime</li>
                            <li>GR + QFT from 4 axioms</li>
                            <li>Unique vacuum</li>
                            <li>2 free parameters</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Philosophical Shift</h3>
            <p style={{ marginBottom: '16px' }}>
                OPH represents a profound shift in the foundations of physics:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto 1fr', gap: '8px 16px', fontSize: '0.85em', marginBottom: '24px' }}>
                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Old:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Spacetime is fundamental</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>New:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Spacetime is emergent from information</span>

                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Old:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Objective reality exists independently</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>New:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Reality = intersubjective consistency</span>

                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Old:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Laws of physics are inputs</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>New:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Laws of physics are outputs (theorems)</span>

                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Old:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Parameters are tuned</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>New:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Parameters are derived from consistency</span>

                <span style={{ color: 'var(--accent-rose)', fontWeight: 600 }}>Old:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Gravity and QM are separate</span>
                <span style={{ color: 'var(--accent-green)', fontWeight: 600 }}>New:</span>
                <span style={{ color: 'var(--text-secondary)' }}>Both emerge from the same axioms</span>
            </div>

            <Explainer title="Is this too good to be true?">
                <p>
                    A healthy skepticism is warranted. Key questions to ask:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Are the assumptions really as minimal as claimed?</strong> The four axioms are supplemented by assumptions B-G. A full assessment must count all logical inputs.</li>
                    <li><strong>Are the derivations rigorous?</strong> Some steps (e.g., the Z<sub>6</sub> Yukawa hierarchy, the Peter-Weyl unification) are at the level of physical arguments, not mathematical proofs.</li>
                    <li><strong>Can it be falsified?</strong> Yes (see Predictions page). This is the most important test of any theory.</li>
                </ul>
                <p>
                    OPH should be evaluated by the same standards as any physical theory: internal consistency,
                    agreement with existing data, and testable predictions. The framework passes all three
                    at the present level of analysis.
                </p>
            </Explainer>

            <Explainer title="Relationship to other programs">
                <p>
                    OPH draws on and synthesizes ideas from multiple research programs:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>AdS/CFT:</strong> The holographic principle and bulk reconstruction, but extended beyond AdS to cosmological spacetimes</li>
                    <li><strong>Jacobson's thermodynamic gravity:</strong> Einstein equations from &delta;Q = TdS, elevated from analogy to derivation</li>
                    <li><strong>It from bit (Wheeler):</strong> Information as the foundation of physics, made precise through von Neumann algebras</li>
                    <li><strong>QBism:</strong> Observer-relative quantum states, grounded in patch structure</li>
                    <li><strong>Tensor networks:</strong> MERA and HaPPY codes, as models of the screen-to-bulk map</li>
                    <li><strong>MOND:</strong> Milgrom's phenomenology, derived from the Markov defect</li>
                </ul>
                <p>
                    OPH unifies these insights into a single coherent framework with a common axiomatic foundation.
                </p>
            </Explainer>
        </div>
    );
}
