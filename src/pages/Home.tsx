import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Home() {
    return (
        <div>
            <div className="card" style={{ marginBottom: '32px', borderColor: 'rgba(201, 169, 110, 0.3)' }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '8px', textTransform: 'none' }}>
                    <span style={{
                        background: 'linear-gradient(to right, var(--accent-gold), var(--accent-blue))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'inline-block'
                    }}>Observer Patch Holography</span>
                </h1>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '16px' }}>
                    An interactive guide to deriving all of physics from four axioms on a holographic screen.
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                    This app walks you through two derivation chains &mdash; one leading to
                    general relativity and classical physics, the other to quantum field theory and the Standard Model &mdash;
                    with interactive demos at every step.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div className="card chain-gr" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-rose)', marginBottom: '8px' }}>
                        Chain 1
                    </div>
                    <h3 style={{ fontSize: '1em', margin: '0 0 8px 0' }}>Axioms &rarr; General Relativity</h3>
                    <p style={{ fontSize: '0.85em', margin: 0 }}>
                        From entropy bounds and entanglement, derive spacetime geometry, Einstein's equations,
                        the cosmological constant, and dark matter phenomenology.
                    </p>
                </div>
                <div className="card chain-qft" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                        Chain 2
                    </div>
                    <h3 style={{ fontSize: '1em', margin: '0 0 8px 0' }}>Axioms &rarr; Quantum Field Theory</h3>
                    <p style={{ fontSize: '0.85em', margin: 0 }}>
                        From overlap consistency and gluing, derive quantum mechanics, gauge symmetry,
                        the Standard Model gauge group, and particle masses.
                    </p>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '0.9em', marginBottom: '12px' }}>The Starting Point</h3>
                <p style={{ marginBottom: '12px' }}>
                    There is no objective reality. There are only observer patches on a holographic screen,
                    and the requirement that overlapping patches agree on shared data.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    From this single principle &mdash; plus a handful of mathematical
                    axioms &mdash; everything follows: special and general relativity, quantum mechanics,
                    the Standard Model of particle physics, dark matter, and the cosmological constant.
                </p>
                <p style={{ margin: 0 }}>
                    Two free parameters: pixel area (<span style={{ color: 'var(--accent-cyan)' }}>a<sub>cell</sub> &asymp; 1.63 l<sub>P</sub>&sup2;</span>) and
                    screen capacity (<span style={{ color: 'var(--accent-cyan)' }}>log dim H &sim; 10<sup>122</sup></span>). Everything else is derived.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Link to="/hints" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                    Begin the Journey <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
