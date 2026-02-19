import { Explainer } from '../components/Explainer';

export function ClassicalPhysicsPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Classical Physics Emerges</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This is the <strong>synthesis page for Chain 1</strong>. We have traced the complete derivation
                from the four axioms to Einstein's equations. But the chain does not stop at general relativity.
                All of classical physics &mdash; Newton's laws, thermodynamics, geodesic motion, Newtonian gravity
                &mdash; falls out as limiting cases.
            </p>
            <p style={{ marginBottom: '24px' }}>
                The derivation chain is:
            </p>

            <div className="math-block" style={{ fontSize: '1em', lineHeight: '2.2' }}>
                A1-A4 (Axioms) &rarr; Entropy &amp; Area Bound &rarr; Conf&#8314;(S&sup2;) = SO&#8314;(3,1) &rarr;
                Modular Flow = Time &rarr; MaxEnt + &delta;S<sub>gen</sub> = 0 &rarr; G<sub>ab</sub> + &Lambda;g<sub>ab</sub> = 8&pi;G&langle;T<sub>ab</sub>&rangle;
                &rarr; Classical Physics
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>From GR to Newton</h3>
            <p style={{ marginBottom: '16px' }}>
                Newton's law of gravitation is the weak-field, slow-motion limit of Einstein's equations.
                Starting from G<sub>ab</sub> = 8&pi;G T<sub>ab</sub>, the Newtonian limit gives:
            </p>
            <div className="math-block">
                &nabla;&sup2;&Phi; = 4&pi;G&rho;
            </div>
            <p style={{ marginBottom: '16px' }}>
                where &Phi; is the Newtonian potential and &rho; is mass density. The gravitational force
                F = &minus;m&nabla;&Phi; = &minus;GMm/r&sup2; follows immediately. Newton's law of universal
                gravitation is a theorem in OPH, not a postulate.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Geodesic Motion</h3>
            <p style={{ marginBottom: '16px' }}>
                In GR, free particles follow geodesics &mdash; the straightest possible paths in curved spacetime.
                The geodesic equation:
            </p>
            <div className="math-block">
                d&sup2;x<sup>&mu;</sup>/d&tau;&sup2; + &Gamma;<sup>&mu;</sup><sub>&alpha;&beta;</sub> (dx<sup>&alpha;</sup>/d&tau;)(dx<sup>&beta;</sup>/d&tau;) = 0
            </div>
            <p style={{ marginBottom: '16px' }}>
                In the Newtonian limit, this reduces to Newton's second law: F = ma, where the "force" is the
                gradient of the gravitational potential. OPH thus derives F = ma &mdash; it is a consequence of
                geometry, which is a consequence of entanglement equilibrium.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Newton's Three Laws</h3>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>First Law (Inertia)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    A body continues in uniform motion unless acted upon by a force. In OPH: a geodesic in flat
                    spacetime is a straight line. The "natural state" is geodesic motion (maximum entropy trajectory).
                    Inertia is the tendency of a system to follow the path of maximum ignorance.
                </p>
            </div>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Second Law (F = ma)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    Force equals mass times acceleration. In OPH: non-geodesic motion requires a stress-energy
                    source that curves spacetime. The geodesic deviation from "straight" is proportional to the
                    curvature, which is proportional to the stress-energy (Einstein's equations). F = ma is the
                    Newtonian limit.
                </p>
            </div>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Third Law (Action-Reaction)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    Every action has an equal and opposite reaction. In OPH: this follows from the conservation
                    of stress-energy &nabla;<sub>a</sub>T<sup>ab</sup> = 0, which is a consequence of the Bianchi
                    identity &nabla;<sub>a</sub>G<sup>ab</sup> = 0 (a geometric identity). Momentum conservation
                    is geometry.
                </p>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Thermodynamics</h3>
            <p style={{ marginBottom: '16px' }}>
                The laws of thermodynamics are not separate postulates but consequences of the OPH framework:
            </p>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Zeroth Law (Thermal Equilibrium)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    If A is in equilibrium with B, and B with C, then A with C. In OPH: this is overlap consistency
                    (Axiom A2). If patches A-B and B-C agree on B, then A and C have a consistent description on
                    any shared data.
                </p>
            </div>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>First Law (Energy Conservation)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    Energy is conserved: dU = &delta;Q &minus; &delta;W. In OPH: follows from the stress-energy
                    conservation &nabla;<sub>a</sub>T<sup>ab</sup> = 0, which is built into Einstein's equations
                    via the Bianchi identity.
                </p>
            </div>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Second Law (Entropy Increase)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    Entropy never decreases: dS &ge; 0. In OPH: this is the generalized second law (GSL), a
                    consequence of quantum focusing (Axiom A3). The area of horizons can only increase (classically),
                    and the generalized entropy S<sub>gen</sub> = A/(4G) + S<sub>bulk</sub> is monotonic.
                </p>
            </div>
            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em' }}>Third Law (Absolute Zero)</h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    Entropy approaches zero as temperature approaches zero. In OPH: at T = 0, the modular
                    Hamiltonian has a unique ground state, and the entanglement entropy is minimized. Perfect
                    purity is the limit of maximum information.
                </p>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Complete Picture</h3>
            <p style={{ marginBottom: '16px' }}>
                Chain 1 achieves something remarkable: starting from four axioms about observer patches on a
                holographic screen, we derive the entire edifice of classical physics. The ingredients are:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '12px', background: 'rgba(201, 112, 112, 0.1)', border: '1px solid rgba(201, 112, 112, 0.3)', fontSize: '0.85em' }}>
                    <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '4px' }}>Derived</div>
                    <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                        <li>3+1 spacetime dimensions</li>
                        <li>Lorentz invariance</li>
                        <li>Einstein's field equations</li>
                        <li>Cosmological constant &Lambda;</li>
                        <li>Newton's laws of motion</li>
                        <li>Newtonian gravity</li>
                        <li>Laws of thermodynamics</li>
                        <li>MOND-like dark matter phenomenology</li>
                        <li>De Sitter cosmology</li>
                    </ul>
                </div>
                <div style={{ padding: '12px', background: 'rgba(201, 169, 110, 0.1)', border: '1px solid rgba(201, 169, 110, 0.3)', fontSize: '0.85em' }}>
                    <div style={{ color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>Input (Axioms)</div>
                    <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8' }}>
                        <li>A1: Screen net (patches on S&sup2;)</li>
                        <li>A2: Overlap consistency</li>
                        <li>A3: Area-entropy bound</li>
                        <li>A4: Local Markov condition</li>
                        <li>B: MaxEnt selection</li>
                    </ul>
                </div>
            </div>

            <Explainer title="What about electromagnetism?">
                <p>
                    Electromagnetism and the other gauge forces are not part of Chain 1. They arise from
                    <strong> Chain 2</strong> (Axioms &rarr; QFT) via the gauge-as-gluing mechanism. Chain 1 gives
                    gravity; Chain 2 gives the gauge forces. Both chains start from the same axioms A1-A4 but use
                    different additional assumptions.
                </p>
            </Explainer>

            <Explainer title="The arrow of time">
                <p>
                    The second law of thermodynamics implies an arrow of time: entropy increases toward the future.
                    But the microscopic laws are time-reversal invariant. Where does the arrow come from?
                </p>
                <p>
                    In OPH, the answer is straightforward: the universe started with a small screen area
                    (low entropy = few active pixels) and is evolving toward the MaxEnt state (de Sitter, maximum
                    area). The arrow of time is the direction of increasing screen area. There is no mystery:
                    the initial state was atypical (low area), and typical evolution increases area.
                </p>
            </Explainer>

            <Explainer title="Is this really a derivation?">
                <p>
                    A fair question: are we really deriving classical physics, or just dressing up known physics
                    in new language? The key test: do the axioms predict anything <em>new</em>?
                </p>
                <p>
                    Yes. Chain 1 makes novel predictions:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>The precise value of a<sub>0</sub> from &Lambda; (not a free parameter)</li>
                    <li>&Lambda; from screen capacity (not vacuum energy)</li>
                    <li>No dark matter particles (only Markov defect)</li>
                    <li>Discrete Hawking spectrum (from finite pixel count)</li>
                    <li>Gravitational wave horizon spectroscopy comb</li>
                </ul>
                <p>
                    These are testable predictions that distinguish OPH from standard physics. See the Predictions page.
                </p>
            </Explainer>
        </div>
    );
}
