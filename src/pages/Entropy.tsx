import { useState, useCallback } from 'react';
import { Explainer } from '../components/Explainer';

export function EntropyPage() {
    const [probs, setProbs] = useState([0.25, 0.25, 0.25, 0.25]);

    const normalize = useCallback((newProbs: number[], _changedIdx: number) => {
        const total = newProbs.reduce((s, v) => s + v, 0);
        if (total === 0) return [0.25, 0.25, 0.25, 0.25];
        return newProbs.map(v => v / total);
    }, []);

    const setProb = useCallback((idx: number, val: number) => {
        setProbs(prev => {
            const next = [...prev];
            next[idx] = Math.max(0.01, val);
            return normalize(next, idx);
        });
    }, [normalize]);

    const entropy = probs.reduce((h, p) => {
        if (p <= 0) return h;
        return h - p * Math.log2(p);
    }, 0);

    const maxEntropy = Math.log2(probs.length);

    const COLORS = ['var(--accent-rose)', 'var(--accent-blue)', 'var(--accent-gold)', 'var(--accent-green)'];
    const LABELS = ['A', 'B', 'C', 'D'];

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Entropy</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Entropy is the central concept in OPH. It measures <strong>how much an observer doesn't know</strong> about
                a system given what they do know. It is not a property of the system itself, but of an observer's
                relationship to the system. This observer-relative character is exactly what OPH elevates to a foundational
                principle.
            </p>
            <p style={{ marginBottom: '16px' }}>
                Three notions of entropy converge in OPH: Shannon entropy (information theory), von Neumann entropy
                (quantum mechanics), and Bekenstein-Hawking entropy (black holes). Their deep unity is not a coincidence
                &mdash; it is a consequence of reality being fundamentally informational.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Shannon Entropy</h3>
            <p style={{ marginBottom: '8px' }}>
                For a classical probability distribution over <em>n</em> outcomes with probabilities p<sub>1</sub>, ..., p<sub>n</sub>,
                Shannon entropy quantifies the expected surprise:
            </p>
            <div className="math-block">
                H = &minus;&sum;<sub>i</sub> p<sub>i</sub> log<sub>2</sub> p<sub>i</sub>
            </div>
            <p style={{ marginBottom: '16px' }}>
                Maximum entropy (H = log<sub>2</sub> n) occurs when all outcomes are equally likely &mdash; the state of
                maximum ignorance. This is the key insight behind <strong>MaxEnt</strong> (Axiom B): in the absence of
                constraints, nature selects the maximum-entropy state.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Von Neumann Entropy</h3>
            <p style={{ marginBottom: '8px' }}>
                The quantum generalization replaces probabilities with a density matrix &rho;:
            </p>
            <div className="math-block">
                S(&rho;) = &minus;Tr(&rho; ln &rho;)
            </div>
            <p style={{ marginBottom: '16px' }}>
                For a pure state, S = 0 (no ignorance). For a maximally mixed state on a d-dimensional Hilbert space,
                S = ln d. Crucially, for a bipartite pure state |&psi;⟩<sub>AB</sub>, the reduced states &rho;<sub>A</sub> and
                &rho;<sub>B</sub> have equal von Neumann entropy &mdash; this is <strong>entanglement entropy</strong>, and
                it is the bridge between quantum information and geometry.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Bekenstein-Hawking Entropy</h3>
            <p style={{ marginBottom: '8px' }}>
                The most profound formula in theoretical physics: the entropy of a black hole is proportional to its
                <em> area</em>, not its volume:
            </p>
            <div className="math-block">
                S<sub>BH</sub> = A / (4 l<sub>P</sub>&sup2;)
            </div>
            <p style={{ marginBottom: '16px' }}>
                where A is the horizon area and l<sub>P</sub> = &radic;(ℏG/c&sup3;) &asymp; 1.616 &times; 10&sup;&minus;&sup3;&sup5; m
                is the Planck length. This says a black hole of area A can store at most A/(4l<sub>P</sub>&sup2;) nats of information.
            </p>
            <p style={{ marginBottom: '24px' }}>
                In OPH, this is not a quirky fact about black holes. It is <strong>Axiom A3</strong>: the information
                capacity of any region is bounded by its boundary area in Planck units. The universe is a hologram.
                Area, not volume, sets the information budget.
            </p>

            <div className="demo-container">
                <div className="demo-label">Interactive: Shannon Entropy Calculator</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Adjust the probability bars for 4 outcomes. The probabilities auto-normalize.
                    Watch how entropy changes: it is maximized when all outcomes are equally likely.
                </p>

                <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                        {probs.map((p, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', marginBottom: '4px' }}>
                                    <span style={{ color: COLORS[i], fontWeight: 600 }}>Outcome {LABELS[i]}</span>
                                    <span style={{ color: 'var(--text-muted)' }}>p = {p.toFixed(3)}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.01"
                                    max="1"
                                    step="0.01"
                                    value={p}
                                    onChange={e => setProb(i, parseFloat(e.target.value))}
                                    style={{ width: '100%' }}
                                />
                            </div>
                        ))}
                    </div>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Shannon Entropy H
                            </div>
                            <div style={{ fontSize: '2em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                                {entropy.toFixed(4)} bits
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Maximum Possible
                            </div>
                            <div style={{ fontSize: '1.2em', color: 'var(--text-secondary)' }}>
                                {maxEntropy.toFixed(4)} bits (uniform)
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Efficiency
                            </div>
                            <div style={{
                                width: '100%',
                                height: '12px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)',
                            }}>
                                <div style={{
                                    width: `${(entropy / maxEntropy) * 100}%`,
                                    height: '100%',
                                    background: `linear-gradient(90deg, var(--accent-rose), var(--accent-cyan))`,
                                    transition: 'width 0.2s',
                                }} />
                            </div>
                            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: '4px' }}>
                                {((entropy / maxEntropy) * 100).toFixed(1)}% of maximum
                            </div>
                        </div>

                        <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', fontSize: '0.8em' }}>
                            <div style={{ color: 'var(--accent-gold)', fontWeight: 600, marginBottom: '4px' }}>
                                Individual contributions:
                            </div>
                            {probs.map((p, i) => (
                                <div key={i} style={{ color: COLORS[i] }}>
                                    {LABELS[i]}: &minus;{p.toFixed(3)} &times; log<sub>2</sub>({p.toFixed(3)}) = {(p > 0 ? -p * Math.log2(p) : 0).toFixed(4)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Explainer title="Area vs. volume scaling: why it matters">
                <p>
                    In ordinary thermodynamics, entropy scales with volume: double the box, double the entropy.
                    But the Bekenstein-Hawking formula says the <em>maximum</em> entropy in a region scales with
                    its boundary <em>area</em>. This is deeply counterintuitive.
                </p>
                <p>
                    It means that the number of fundamental degrees of freedom in a region of space is not
                    proportional to the volume but to the surface area. The "bulk" &mdash; the interior spacetime
                    &mdash; is an effective description, not fundamental. The fundamental description lives on the
                    boundary.
                </p>
                <p>
                    In OPH, this is not a surprise. The screen S&sup2; <em>is</em> the fundamental arena. Everything
                    "inside" is emergent. Area scaling is the starting point, not a result to be derived.
                </p>
            </Explainer>

            <Explainer title="MaxEnt and the typicality argument">
                <p>
                    The Maximum Entropy principle (Axiom B) says: given only local constraints, the state that
                    maximizes von Neumann entropy is selected. This is not a dynamical statement but an epistemic one:
                    MaxEnt states are overwhelmingly typical. Almost all states compatible with the constraints look
                    like the MaxEnt state.
                </p>
                <p>
                    In OPH, MaxEnt combined with the area bound (A3) is the engine that drives the derivation of
                    Einstein's equations: the geometry of spacetime emerges from the condition that entanglement
                    entropy is maximized subject to the area constraint.
                </p>
            </Explainer>

            <Explainer title="From bits to geometry">
                <p>
                    The Bekenstein-Hawking formula can be inverted: if entropy <em>is</em> area (in Planck units),
                    then area <em>is</em> entropy. Geometry is counting. The area of a surface is proportional to
                    the number of bits that can be stored on it. This is the seed of the Ryu-Takayanagi formula
                    and the entire program of "entanglement builds geometry."
                </p>
            </Explainer>
        </div>
    );
}
