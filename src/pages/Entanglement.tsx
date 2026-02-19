import { useState, useCallback } from 'react';
import { Explainer } from '../components/Explainer';

export function EntanglementPage() {
    // Bell experiment simulator state
    const [numTrials, setNumTrials] = useState(100);
    const [results, setResults] = useState<{ classical: number; quantum: number; trials: number } | null>(null);

    const runExperiment = useCallback(() => {
        let classicalCorr = 0;
        let quantumCorr = 0;

        for (let trial = 0; trial < numTrials; trial++) {
            // Alice and Bob each choose measurement angle: 0, pi/4, pi/2, 3pi/4
            const aliceChoice = Math.floor(Math.random() * 4);
            const bobChoice = Math.floor(Math.random() * 4);

            const angles = [0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4];
            const thetaA = angles[aliceChoice];
            const thetaB = angles[bobChoice];
            const delta = thetaA - thetaB;

            // Classical (local hidden variable): E(a,b) bounded by |S| <= 2
            // Simple LHV model: outcomes determined by shared hidden variable
            const lambda = Math.random() * 2 * Math.PI;
            const outcomeA_classical = Math.cos(thetaA - lambda) > 0 ? 1 : -1;
            const outcomeB_classical = Math.cos(thetaB - lambda) > 0 ? 1 : -1;
            classicalCorr += outcomeA_classical * outcomeB_classical;

            // Quantum: E(a,b) = -cos(a-b) for singlet state
            // Simulate quantum outcome: correlated with cos^2 probability
            const pSame = Math.cos(delta / 2) ** 2;
            const outcomeA_quantum = Math.random() > 0.5 ? 1 : -1;
            const outcomeB_quantum = Math.random() < pSame ? outcomeA_quantum : -outcomeA_quantum;
            quantumCorr += outcomeA_quantum * outcomeB_quantum;
        }

        setResults({
            classical: classicalCorr / numTrials,
            quantum: quantumCorr / numTrials,
            trials: numTrials,
        });
    }, [numTrials]);

    // CHSH calculation
    // S = E(a,b) - E(a,b') + E(a',b) + E(a',b')
    // For optimal angles: a=0, a'=pi/2, b=pi/4, b'=3pi/4
    // Quantum: S = -cos(pi/4) - (-cos(-pi/4)) + (-cos(pi/4)) + (-cos(pi/4))
    // Actually: S = 2*sqrt(2) for quantum

    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Entanglement &amp; Bell's Theorem</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Entanglement is the most distinctively quantum phenomenon: two systems can share correlations
                that have no classical explanation. Bell's theorem proves this rigorously &mdash; no theory of
                local hidden variables can reproduce quantum predictions. In OPH, entanglement is not an
                anomaly to be explained; it is the <strong>fundamental glue that binds observer patches together</strong>.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Bell's Theorem</h3>
            <p style={{ marginBottom: '16px' }}>
                Consider two observers, Alice and Bob, who share an entangled pair (say, a spin singlet).
                Each chooses a measurement direction and records +1 or &minus;1. The correlation function
                E(a,b) = &langle;A(a) &middot; B(b)&rangle; measures how correlated their outcomes are for
                directions a and b.
            </p>
            <p style={{ marginBottom: '8px' }}>
                Bell (1964) showed that any local hidden variable (LHV) theory must satisfy:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                |E(a,b) &minus; E(a,b')| + |E(a',b) + E(a',b')| &le; 2
            </div>
            <p style={{ marginBottom: '16px' }}>
                This is the <strong>CHSH inequality</strong> (Clauser-Horne-Shimony-Holt, 1969), a generalization
                of Bell's original inequality. Any theory where outcomes are determined by pre-existing local
                variables must obey S &le; 2.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Quantum Violation</h3>
            <p style={{ marginBottom: '8px' }}>
                Quantum mechanics violates the CHSH inequality. For the singlet state and optimal measurement
                angles (a = 0, a' = &pi;/2, b = &pi;/4, b' = 3&pi;/4):
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                S<sub>QM</sub> = 2&radic;2 &asymp; 2.828
            </div>
            <p style={{ marginBottom: '16px' }}>
                This has been confirmed in countless experiments, most decisively in the 2022 Nobel Prize-winning
                work of Aspect, Clauser, and Zeilinger. Nature violates the CHSH bound. Local hidden variables
                cannot describe reality.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Tsirelson Bound</h3>
            <p style={{ marginBottom: '8px' }}>
                Could quantum correlations be even stronger? Tsirelson (1980) proved an upper bound:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                S &le; 2&radic;2
            </div>
            <p style={{ marginBottom: '16px' }}>
                No quantum system can exceed S = 2&radic;2. This is less than the algebraic maximum S = 4
                (which would require "super-quantum" correlations). The Tsirelson bound is a deep constraint
                &mdash; why exactly 2&radic;2?
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, the Tsirelson bound follows from the complex Hilbert space structure (which follows
                from the screen being &Copf;P&sup1;). The bound 2&radic;2 is the maximum value of 2&radic;2
                &middot; sin(&theta;) for the optimal angle &theta; = &pi;/4, a consequence of the geometry
                of the complex projective space.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Monogamy of Entanglement</h3>
            <p style={{ marginBottom: '8px' }}>
                If Alice is maximally entangled with Bob, she cannot be entangled with Charlie at all. This is
                <strong> monogamy of entanglement</strong>, quantified by the Coffman-Kundu-Wootters inequality:
            </p>
            <div className="math-block">
                C&sup2;(A:B) + C&sup2;(A:C) &le; C&sup2;(A:BC)
            </div>
            <p style={{ marginBottom: '16px' }}>
                where C is the concurrence (a measure of entanglement). This has deep implications for OPH:
                the entanglement budget is finite. Entangling more with the "outside" of a patch means less
                entanglement available "inside." This trade-off is what makes the area bound (Axiom A3) work.
            </p>

            <div className="demo-container">
                <div className="demo-label">Bell Experiment Simulator</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Run a simulated Bell experiment. Compare correlations from a classical (local hidden variable)
                    model with quantum predictions. Classical models cannot exceed S = 2.
                </p>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Number of trials</span>
                            <span style={{ color: 'var(--text-muted)' }}>{numTrials}</span>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="10000"
                            step="10"
                            value={numTrials}
                            onChange={e => setNumTrials(parseInt(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={runExperiment} style={{ fontSize: '0.8em' }}>
                        Run Experiment
                    </button>
                </div>

                {results && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Classical S
                            </div>
                            <div style={{ fontSize: '1.5em', color: 'var(--accent-gold)', fontWeight: 700 }}>
                                {(results.classical * 4).toFixed(3)}
                            </div>
                            <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', marginTop: '4px' }}>
                                Bound: |S| &le; 2
                            </div>
                        </div>
                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Quantum S
                            </div>
                            <div style={{ fontSize: '1.5em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                                {(results.quantum * 4).toFixed(3)}
                            </div>
                            <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', marginTop: '4px' }}>
                                Expected: 2&radic;2 &asymp; 2.83
                            </div>
                        </div>
                        <div style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                            <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Violation?
                            </div>
                            <div style={{
                                fontSize: '1.5em',
                                fontWeight: 700,
                                color: Math.abs(results.quantum * 4) > 2 ? 'var(--accent-green)' : 'var(--accent-rose)',
                            }}>
                                {Math.abs(results.quantum * 4) > 2 ? 'YES' : 'NO'}
                            </div>
                            <div style={{ fontSize: '0.75em', color: 'var(--text-muted)', marginTop: '4px' }}>
                                {results.trials} trials
                            </div>
                        </div>
                    </div>
                )}

                {!results && (
                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85em' }}>
                        Click "Run Experiment" to simulate a Bell test
                    </div>
                )}
            </div>

            <Explainer title="EPR and the completeness of quantum mechanics">
                <p>
                    Einstein, Podolsky, and Rosen (1935) argued that quantum mechanics must be incomplete:
                    if measuring Alice's particle instantly determines Bob's, then Bob's value must have been
                    pre-determined. QM doesn't include these pre-determined values, so QM is incomplete.
                </p>
                <p>
                    Bell showed that EPR's reasoning assumed local realism (hidden variables + no FTL signaling).
                    Since experiments violate Bell inequalities, at least one of these must go. In OPH, <em>realism</em>
                    goes: there are no pre-existing values independent of observer patches. Properties are
                    patch-relative, not objective.
                </p>
            </Explainer>

            <Explainer title="Entanglement as the fabric of spacetime">
                <p>
                    In Chain 1, we saw that entanglement builds geometry (Ryu-Takayanagi, ER=EPR). Here in Chain 2,
                    we see entanglement as a quantum information resource with specific mathematical properties
                    (monogamy, CHSH violation, Tsirelson bound).
                </p>
                <p>
                    These are two aspects of the same thing. The Tsirelson bound constrains how much entanglement
                    any two patches can share, which constrains the geometry they can build between them. The
                    monogamy constraint ensures that entanglement is a finite resource, which is why the area bound
                    (Axiom A3) holds. Quantum information and geometry are unified.
                </p>
            </Explainer>

            <Explainer title="Loophole-free Bell tests">
                <p>
                    Early Bell experiments had potential loopholes:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Locality loophole:</strong> Alice and Bob's measurements might not be space-like separated</li>
                    <li><strong>Detection loophole:</strong> Not all particles are detected; biased sampling could mimic violation</li>
                    <li><strong>Freedom-of-choice loophole:</strong> Measurement choices might be correlated with hidden variables</li>
                </ul>
                <p>
                    All three loopholes were closed simultaneously in 2015 (Hensen et al., Giustina et al., Shalm et al.).
                    The 2022 Nobel Prize in Physics was awarded for this experimental program. Nature is definitively
                    non-local in its correlations.
                </p>
            </Explainer>
        </div>
    );
}
