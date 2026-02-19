import { Explainer } from '../components/Explainer';

export function ErrorCorrectionPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Quantum Error Correction</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                One of the most surprising discoveries in theoretical physics: the holographic correspondence
                between boundary and bulk has the structure of a <strong>quantum error-correcting code</strong>.
                Spacetime is not just built from entanglement &mdash; it is <em>protected</em> by error correction.
                The bulk (spacetime) is a logical code space encoded redundantly in the boundary (screen).
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Classical Error Correction</h3>
            <p style={{ marginBottom: '16px' }}>
                The simplest classical error-correcting code is the <strong>3-bit repetition code</strong>:
                encode a logical bit 0 as 000 and 1 as 111. If one bit flips (e.g., 000 &rarr; 010), majority
                voting recovers the original. This corrects any single-bit error.
            </p>
            <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', fontSize: '0.85em', textAlign: 'center' }}>
                    <div style={{ padding: '8px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.3)' }}>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Logical 0</div>
                        <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>0 &rarr; 000</div>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(78,231,255,0.1)', border: '1px solid rgba(78,231,255,0.3)' }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>Error</div>
                        <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>000 &rarr; 010</div>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(0,255,65,0.1)', border: '1px solid rgba(0,255,65,0.3)' }}>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600 }}>Recovery</div>
                        <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>010 &rarr; 000 &checkmark;</div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Quantum Error Correction</h3>
            <p style={{ marginBottom: '16px' }}>
                Quantum error correction is harder: you cannot clone a quantum state (no-cloning theorem), and
                measuring a state disturbs it. Shor's 9-qubit code (1995) was the first quantum error-correcting
                code: it encodes 1 logical qubit into 9 physical qubits and can correct any single-qubit error.
            </p>
            <p style={{ marginBottom: '8px' }}>
                The key idea: encode the logical qubit |&psi;&rangle; = &alpha;|0<sub>L</sub>&rangle; + &beta;|1<sub>L</sub>&rangle;
                into a code subspace C &sub; H<sup>&otimes;n</sup>:
            </p>
            <div className="math-block" style={{ fontSize: '0.9em', lineHeight: '1.8' }}>
                |0<sub>L</sub>&rangle; = (|000&rangle; + |111&rangle;)(|000&rangle; + |111&rangle;)(|000&rangle; + |111&rangle;) / 2&radic;2
                <br />
                |1<sub>L</sub>&rangle; = (|000&rangle; &minus; |111&rangle;)(|000&rangle; &minus; |111&rangle;)(|000&rangle; &minus; |111&rangle;) / 2&radic;2
            </div>
            <p style={{ marginBottom: '16px' }}>
                Errors are detected by measuring syndromes (without disturbing the logical information) and
                corrected by applying the appropriate recovery operation.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Spacetime as a Quantum Error-Correcting Code</h3>
            <p style={{ marginBottom: '16px' }}>
                Almheiri, Dong, and Harlow (2014) showed that the holographic map from bulk to boundary has
                exactly the structure of a quantum error-correcting code:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li><strong>Physical qubits</strong> = boundary (screen) degrees of freedom</li>
                <li><strong>Logical qubits</strong> = bulk (spacetime) degrees of freedom</li>
                <li><strong>Code subspace</strong> = states with semiclassical bulk geometry</li>
                <li><strong>Erasure of boundary region</strong> = losing access to part of the screen</li>
                <li><strong>Error correction</strong> = bulk data is recoverable from the remaining boundary</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
                A bulk operator &phi;(x) in the entanglement wedge of boundary region A can be reconstructed
                from A alone. Even if part of the boundary is erased, the bulk data is protected. This is
                <strong> subregion duality</strong>: each boundary subregion encodes the bulk subregion inside
                its Ryu-Takayanagi surface.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The HaPPY Code</h3>
            <p style={{ marginBottom: '16px' }}>
                Pastawski, Yoshida, Harlow, and Preskill (2015) constructed an explicit holographic error-correcting
                code using perfect tensors arranged in a hyperbolic tiling &mdash; the <strong>HaPPY code</strong>.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    HaPPY Code Properties
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85em' }}>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>Perfect Tensors</div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            Each tensor is a unitary from any half of its indices to the other half.
                            This maximizes entanglement and enables error correction.
                        </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>Hyperbolic Geometry</div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            Tensors are arranged on a tiling of the hyperbolic plane (Poincar&eacute; disk).
                            The boundary is the asymptotic circle. The bulk is the interior.
                        </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>RT Formula</div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            The entanglement entropy of a boundary region obeys S(A) = |&gamma;<sub>A</sub>| &times; log d,
                            where |&gamma;<sub>A</sub>| is the length of the minimal cut, recovering the RT formula.
                        </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>Error Correction</div>
                        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                            Bulk logical operators can be reconstructed on any boundary region whose
                            complement does not reach the bulk point (entanglement wedge reconstruction).
                        </p>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Connection to OPH</h3>
            <p style={{ marginBottom: '16px' }}>
                In OPH, quantum error correction is not an analogy &mdash; it is the mechanism by which the
                bulk spacetime emerges from the screen:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li><strong>Axiom A4 (Local Markov):</strong> The approximate recoverability condition I(A:D|B) &le; &epsilon; IS the error-correction condition. It says that bulk data in the entanglement wedge of A can be recovered from A alone, up to error &epsilon;.</li>
                <li><strong>Axiom A3 (Area Bound):</strong> The area bound limits the code rate &mdash; how much bulk data can be encoded per unit of boundary area.</li>
                <li><strong>Axiom A1 (Screen Net):</strong> The isotony condition A(P) &sub; A(Q) for P &sub; Q ensures that the code is consistent across scales.</li>
            </ul>

            <Explainer title="The code distance and the Planck scale">
                <p>
                    Every quantum error-correcting code has a <strong>code distance</strong> d: the minimum number
                    of physical qubits that must be corrupted to create an undetectable logical error. For the
                    holographic code, the distance is related to the minimal surface area (in Planck units).
                </p>
                <p>
                    The Planck area l<sub>P</sub>&sup2; = &hbar;G/c&sup3; is the "pixel size" of the screen.
                    The code distance is the number of pixels in the minimal RT surface, which is A(&gamma;)/(4l<sub>P</sub>&sup2;).
                    This is why gravity breaks down at the Planck scale: you cannot correct errors smaller than one
                    pixel.
                </p>
            </Explainer>

            <Explainer title="Complexity and the black hole interior">
                <p>
                    The black hole interior poses a puzzle: after the Page time, the interior appears to be behind
                    the horizon but the information must be recoverable from the boundary (to preserve unitarity).
                    The resolution involves <strong>computational complexity</strong>: the recovery map exists but
                    is exponentially complex.
                </p>
                <p>
                    In OPH terms, the Markov recovery map (Axiom A4) exists with &epsilon; small, but its circuit
                    complexity grows exponentially after scrambling time. The interior is encoded in the boundary
                    but is computationally inaccessible. This connects quantum error correction to the complexity
                    equals volume (CV) and complexity equals action (CA) conjectures.
                </p>
            </Explainer>

            <Explainer title="From error correction to gauge symmetry">
                <p>
                    There is a deep connection between error correction and gauge symmetry (see the Gauge Symmetry page).
                    In a quantum error-correcting code, the logical operators commute with the stabilizer group
                    (the "gauge" group of the code). The gauge symmetry of the Standard Model may be a manifestation
                    of the stabilizer structure of the holographic code.
                </p>
                <p>
                    In OPH, gauge symmetry arises from patch-gluing redundancy (Assumption D), which is precisely
                    the redundancy of an error-correcting code: the same logical data is encoded in multiple
                    overlapping boundary regions.
                </p>
            </Explainer>
        </div>
    );
}
