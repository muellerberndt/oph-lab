import { Explainer } from '../components/Explainer';

export function ModularFlowPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Modular Flow</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Modular flow is the mathematical engine that connects quantum information to spacetime geometry.
                In the OPH gravity chain, geometric modular flow is fixed on an explicit BW branch of the
                scaling-limit cap theory. The "time" experienced by an observer near their horizon is modeled by the
                modular automorphism of their local algebra.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Tomita-Takesaki Modular Theory</h3>
            <p style={{ marginBottom: '16px' }}>
                Given a von Neumann algebra A (the observables of a patch) and a cyclic separating state |&Omega;⟩
                (the vacuum), the Tomita-Takesaki theorem constructs two operators:
            </p>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-rose)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: '0.85em' }}>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>S</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        The Tomita operator: S(A|&Omega;⟩) = A†|&Omega;⟩ for A &isin; A
                    </span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>&Delta; = S†S</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        The modular operator: a positive self-adjoint operator
                    </span>
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>J</span>
                    <span style={{ color: 'var(--text-secondary)' }}>
                        The modular conjugation: S = J&Delta;<sup>1/2</sup> (polar decomposition)
                    </span>
                </div>
            </div>

            <p style={{ marginBottom: '8px' }}>
                The <strong>modular automorphism group</strong> is a one-parameter family of automorphisms:
            </p>
            <div className="math-block">
                &sigma;<sub>t</sub>(A) = &Delta;<sup>it</sup> A &Delta;<sup>&minus;it</sup>, &nbsp;&nbsp; A &isin; A
            </div>
            <p style={{ marginBottom: '16px' }}>
                This is a "time evolution" intrinsic to the algebra and the state. It does not require a pre-existing
                notion of time. Tomita-Takesaki gives &sigma;<sub>t</sub>(A) &isin; A for every A in the algebra.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Bisognano-Wichmann and the OPH BW Branch</h3>
            <p style={{ marginBottom: '16px' }}>
                For a Rindler wedge C in Minkowski spacetime (the region accessible to a uniformly accelerating observer),
                Bisognano and Wichmann proved that the modular automorphism group is geometric. In a type-I
                representation this can be written as:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                K<sub>C</sub> = 2&pi; &middot; B<sub>C</sub>
            </div>
            <p style={{ marginBottom: '16px' }}>
                where K<sub>C</sub> = &minus;ln &Delta; is the modular Hamiltonian and B<sub>C</sub> is the Lorentz
                boost generator that preserves the Rindler wedge. The declared OPH theorem surface uses the
                automorphism-level statement on the explicit BW branch:
            </p>
            <div className="math-block" style={{ fontSize: '1em' }}>
                &sigma;<sub>t</sub><sup>&omega;<sub>&infin;</sub><sup>C</sup></sup> = &alpha;<sub>&lambda;<sub>C</sub>(2&pi;t)</sub>
            </div>
            <p style={{ marginBottom: '16px' }}>
                If the scaling-limit cap algebra is type I, that branch may be written as K<sub>C</sub> = 2&pi;B<sub>C</sub>.
                In the generic continuum case, the theorem statement is the automorphism identity itself and the
                geometric action appears as an outer automorphism.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Thermal Time Hypothesis</h3>
            <p style={{ marginBottom: '16px' }}>
                Connes and Rovelli proposed that the physical time flow experienced by an observer is the modular flow
                of their local state. There is no absolute time; time is relative to the observer's state, just as
                position is relative in special relativity.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, this viewpoint is used on the explicit BW branch: an observer&apos;s local time is modeled by the
                modular flow of the patch algebra/state pair on that branch.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Unruh Effect</h3>
            <p style={{ marginBottom: '8px' }}>
                The BW theorem immediately implies the <strong>Unruh effect</strong>: an accelerating observer
                sees the vacuum as a thermal state. The Unruh temperature is:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                T<sub>U</sub> = ℏa / (2&pi;ck<sub>B</sub>)
            </div>
            <p style={{ marginBottom: '16px' }}>
                where a is the proper acceleration. In continuum BW settings, modular flow is periodic in imaginary
                time with period 2&pi;/a, which by the KMS condition means the state is thermal at temperature
                T<sub>U</sub>. The OPH lab uses that continuum template when discussing the BW branch.
            </p>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Numerical Example
                </h4>
                <p style={{ fontSize: '0.85em', margin: '0 0 8px 0' }}>
                    For an acceleration of a = 10<sup>20</sup> m/s&sup2; (about 10<sup>19</sup> g):
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    T<sub>U</sub> = (1.055 &times; 10<sup>&minus;34</sup> &times; 10<sup>20</sup>) / (2&pi; &times; 3 &times; 10<sup>8</sup> &times; 1.381 &times; 10<sup>&minus;23</sup>) &asymp; 0.4 K
                </div>
                <p style={{ fontSize: '0.8em', color: 'var(--text-muted)', margin: 0 }}>
                    Even at extreme accelerations, the Unruh temperature is tiny. Direct measurement is difficult,
                    though indirect evidence exists.
                </p>
            </div>

            <Explainer title="The KMS condition and thermal equilibrium">
                <p>
                    The Kubo-Martin-Schwinger (KMS) condition says that a state &omega; is in thermal equilibrium at
                    inverse temperature &beta; with respect to a time evolution &alpha;<sub>t</sub> if the two-point
                    correlators satisfy:
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    &omega;(A &middot; &alpha;<sub>t</sub>(B)) = &omega;(&alpha;<sub>t+i&beta;</sub>(B) &middot; A)
                </div>
                <p>
                    The Tomita-Takesaki theorem guarantees that any faithful normal state satisfies the KMS condition
                    with respect to its own modular flow at &beta; = 1 (in natural units). This means: the state is
                    always "thermal" with respect to its own notion of time. Temperature and time are two sides of the
                    same coin.
                </p>
            </Explainer>

            <Explainer title="Modular Hamiltonian beyond Rindler">
                <p>
                    The BW theorem gives a geometric modular Hamiltonian only for very special cases (Rindler wedges,
                    conformal field theories). In general, the modular Hamiltonian K = &minus;ln &rho; is a complicated
                    non-local operator.
                </p>
                <p>
                    However, for small perturbations around the vacuum, the modular Hamiltonian can be expanded:
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    K = 2&pi; &int; d&Sigma;<sup>a</sup> x<sup>b</sup> T<sub>ab</sub> + O(&delta;&rho;&sup2;)
                </div>
                <p>
                    This linearized modular Hamiltonian involves the stress-energy tensor T<sub>ab</sub> integrated
                    over the entangling surface with a weight proportional to distance from the surface. This is
                    one route connecting modular flow to the later gravity branch. In the declared OPH paper surface,
                    the half-line generator/null-stress charge identification is internal, while bounded-interval
                    transport and the broader UV/BW internalization scaffold are separate open items.
                </p>
            </Explainer>

            <Explainer title="Connection to the OPH axioms">
                <p>
                    In OPH, modular theory connects to the axioms as follows:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>A1 (Screen Net):</strong> Each patch P has a von Neumann algebra A(P) and a local state &rho;<sub>P</sub>. Modular theory applies to each (A(P), &rho;<sub>P</sub>) pair.</li>
                    <li><strong>A2 (Overlap Consistency):</strong> Modular flows of overlapping patches must be compatible on the overlap. This constrains the geometry.</li>
                    <li><strong>A3 (Local MaxEnt and Refinement Stability):</strong> The realized branch persists under refinement and supplies the local finite-constraint setting used in later null-modular arguments.</li>
                    <li><strong>A4 (Recoverable Generalized Entropy):</strong> Collar recoverability and generalized entropy provide the entropy side of the gravity branch.</li>
                    <li><strong>T2 + BW branch hypotheses:</strong> Geometric modular flow is stated on a scaling-limit branch. Fixed-cutoff matrix formulas belong to special representations only.</li>
                </ul>
            </Explainer>
        </div>
    );
}
