import { Explainer } from '../components/Explainer';

export function QuantumMechanicsPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Quantum Mechanics Emerges</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This is the <strong>key page of Chain 2</strong>. Quantum mechanics <em>emerges</em> from the
                requirement that overlapping observer patches give consistent descriptions. The Hilbert space
                structure, Born rule, and "collapse" are derived from that requirement.
            </p>
            <p style={{ marginBottom: '24px' }}>
                The punchline: <strong>quantum mechanics is the unique probability theory compatible with
                observer patch consistency</strong>.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Step 1: Why Complex Hilbert Spaces?</h3>
            <p style={{ marginBottom: '16px' }}>
                Axiom A1 assigns a von Neumann algebra A(P) to each patch P. Von Neumann algebras act on
                Hilbert spaces over ℂ (the complex numbers). But why complex, not real or quaternionic?
            </p>
            <p style={{ marginBottom: '16px' }}>
                The answer comes from the screen S&sup2; and its conformal structure. The sphere S&sup2; = ℂP&sup1;
                is a complex manifold. The group PSL(2,ℂ) acts by M&ouml;bius transformations. The natural
                representation theory of this group requires complex Hilbert spaces. Real Hilbert spaces would
                not support the conformal structure of the screen; quaternionic spaces would over-constrain it.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Step 2: The Born Rule from Uniqueness</h3>
            <p style={{ marginBottom: '8px' }}>
                Given a quantum state &rho; and an observable A, the Born rule says the expectation value is:
            </p>
            <div className="math-block">
                ⟨A⟩ = Tr(&rho; A)
            </div>
            <p style={{ marginBottom: '16px' }}>
                The OPH paper surface derives this rule through Gleason's theorem (1957): if the probability
                assignment p: (projections) &rarr; [0,1] is
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li><strong>Non-contextual</strong>: the probability of an outcome does not depend on which other observables are measured simultaneously</li>
                <li><strong>Additive</strong>: for orthogonal projections, p(P<sub>1</sub> + P<sub>2</sub>) = p(P<sub>1</sub>) + p(P<sub>2</sub>)</li>
                <li><strong>Dimension &ge; 3</strong>: the Hilbert space has dimension at least 3</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
                then the only consistent assignment is p(P) = Tr(&rho;P) for some density matrix &rho;. The Born
                rule is the unique probability rule compatible with the algebraic structure.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, non-contextuality follows from overlap consistency (Axiom A2): the probability of an
                outcome on the overlap P<sub>1</sub> &cap; P<sub>2</sub> must be the same whether computed from
                patch 1 or patch 2. Additivity follows from the algebra structure. And dimension &ge; 3 is
                guaranteed because the screen patches carry infinite-dimensional algebras (type III von Neumann
                algebras in the continuum limit).
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Step 3: "Collapse" = Belief Updating</h3>
            <p style={{ marginBottom: '16px' }}>
                The measurement problem is the deepest puzzle in quantum foundations: what happens when you measure
                a quantum system? In Copenhagen, the wave function "collapses." In many-worlds, the universe
                branches. In Bohmian mechanics, hidden variables guide particles.
            </p>
            <p style={{ marginBottom: '16px' }}>
                OPH treats measurement through observer patches, each with a local state &rho;<sub>P</sub>. The
                lab does not use a God's-eye wave function of the universe.
            </p>
            <p style={{ marginBottom: '16px' }}>
                When an observer makes a measurement, they <strong>update their local state</strong> from &rho;
                to &rho;' via the standard Bayesian/L&uuml;ders rule:
            </p>
            <div className="math-block">
                &rho; &rarr; &rho;' = P<sub>k</sub> &rho; P<sub>k</sub> / Tr(P<sub>k</sub> &rho;)
            </div>
            <p style={{ marginBottom: '16px' }}>
                This update records a change in the observer's information. The lab treats it as
                <strong> belief updating</strong>: the observer has gained information and revises their
                description accordingly. The "collapse" is as mundane as updating a probability when you open an
                envelope.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    The Measurement "Problem" Dissolved
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85em' }}>
                    <div>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '4px' }}>
                            Standard QM asks:
                        </div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>When does collapse happen?</li>
                            <li>What triggers it?</li>
                            <li>Is it physical or epistemic?</li>
                            <li>What about Schr&ouml;dinger's cat?</li>
                        </ul>
                    </div>
                    <div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>
                            OPH answers:
                        </div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>When the observer updates</li>
                            <li>Nothing "triggers" it. It is belief updating</li>
                            <li>Epistemic (no physical collapse)</li>
                            <li>The cat has a local state; you have yours. No paradox.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>No God's-Eye View Needed</h3>
            <p style={{ marginBottom: '16px' }}>
                Every quantum description is a description <em>from a patch</em>. The lab presents quantum
                mechanics through that perspectival structure, with no God's-eye wave function of the universe.
            </p>

            <div className="math-block" style={{ fontSize: '0.9em', lineHeight: '2' }}>
                Observer patches + Overlap consistency + Gleason &rArr; Born rule &rArr; Quantum mechanics
            </div>

            <Explainer title="Connection to QBism">
                <p>
                    OPH shares key features with QBism (Quantum Bayesianism): both treat quantum states as
                    observer-relative beliefs and view "measurement" as an action that updates the agent's state.
                </p>
                <p>
                    The difference: QBism takes the Born rule as a normative constraint on rational agents.
                    OPH <em>derives</em> the Born rule from the patch structure. QBism is a philosophical
                    interpretation; OPH is a physical theory with testable predictions.
                </p>
            </Explainer>

            <Explainer title="Superposition and interference">
                <p>
                    Superposition describes the observer's <em>state of knowledge</em>. When an observer assigns
                    &rho; = |+⟩⟨+| where |+⟩ = (|0⟩ + |1⟩)/&radic;2,
                    they are saying: "I have a definite state of knowledge, but that knowledge is incompatible with
                    knowing whether the outcome is 0 or 1."
                </p>
                <p>
                    Interference arises because the Born rule involves Tr(&rho;P), which for pure states gives
                    |⟨&psi;|&phi;⟩|&sup2;. The cross-terms in this expression are interference terms.
                    They are a consequence of the complex Hilbert space structure, which is itself a consequence
                    of the screen being S&sup2; = ℂP&sup1;.
                </p>
            </Explainer>

            <Explainer title="Decoherence as information leakage">
                <p>
                    In standard QM, decoherence explains the transition from quantum to classical behavior: the
                    environment entangles with the system, suppressing interference. In OPH, decoherence is
                    <strong> information leaking out of the observer's patch</strong>.
                </p>
                <p>
                    When degrees of freedom leave the observer's patch (become entangled with the complement),
                    the observer's reduced state becomes more mixed, and off-diagonal terms in the density matrix
                    decay. Decoherence follows from the observer's finite patch.
                </p>
            </Explainer>

            <Explainer title="The Kochen-Specker theorem and contextuality">
                <p>
                    The Kochen-Specker theorem (1967) proves that quantum observables cannot all have simultaneously
                    pre-existing values (non-contextual hidden variables are impossible in dimension &ge; 3).
                </p>
                <p>
                    In OPH, this theorem is understood naturally: observables are properties of the patch algebra,
                    not of the system "in itself." Different measurement contexts correspond to different sub-algebras
                    of A(P), and there is no requirement that values be consistent across incompatible contexts.
                    The system does not have properties until an observer's measurement context selects a sub-algebra.
                </p>
            </Explainer>
        </div>
    );
}
