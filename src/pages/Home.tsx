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
                    An interactive guide to OPH&apos;s current theorem surface, conditional branches, and open scaffolds.
                </p>
                <p style={{ color: 'var(--text-muted)' }}>
                    This app walks you through two derivation chains &mdash; one toward Lorentz/gravity on the stated BW and
                    entanglement-equilibrium branches, the other toward quantum mechanics, gauge structure, and matter-sector
                    continuation lanes &mdash; with interactive demos at every step.
                </p>
                <p style={{ color: 'var(--text-muted)', marginTop: '16px', marginBottom: 0 }}>
                    If you arrived here through <a href="https://floatingpragma.io/oph/theory-of-everything/" target="_blank" rel="noopener noreferrer">theory of everything</a> or{' '}
                    <a href="https://floatingpragma.io/oph/simulation-theory/" target="_blank" rel="noopener noreferrer">simulation theory</a> searches, this lab maps the
                    current OPH research surface, including which claims are theorem-grade, branch-conditional,
                    continuation-only, or still open.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
                <div className="card chain-gr" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-rose)', marginBottom: '8px' }}>
                        Chain 1
                    </div>
                    <h3 style={{ fontSize: '1em', margin: '0 0 8px 0' }}>Axioms &rarr; Lorentz and Gravity Branches</h3>
                    <p style={{ fontSize: '0.85em', margin: 0 }}>
                        From recoverability, generalized entropy, and modular flow, recover a conditional Lorentz branch,
                        a conditional Jacobson-type Einstein branch, and the separate cosmological-capacity branch.
                    </p>
                </div>
                <div className="card chain-qft" style={{ padding: '20px' }}>
                    <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-blue)', marginBottom: '8px' }}>
                        Chain 2
                    </div>
                    <h3 style={{ fontSize: '1em', margin: '0 0 8px 0' }}>Axioms &rarr; Quantum Field Theory</h3>
                    <p style={{ fontSize: '0.85em', margin: 0 }}>
                        From overlap consistency and gluing plus R0/R1/[z]=0/MAR, derive quantum mechanics,
                        unique Standard Model gauge structure, and downstream matter-sector constraints.
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
                    From this single principle &mdash; together with the current five-axiom ledger and explicit technical
                    premises &mdash; OPH derives a schedule-independent overlap normal form, a conditional Lorentz branch,
                    a conditional Jacobson-type Einstein branch, a conditional compact-gauge route, and several
                    downstream matter-sector continuation lanes.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    OPH presents itself publicly both as a <strong>theory-of-everything program</strong> and as a concrete
                    implementation of <strong>simulation theory</strong>: reality is reconstructed as an observer-consistent
                    information process rather than a world with one privileged frame. This lab tracks the current paper
                    surface rather than collapsing all branches into one unconditional claim.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    The simulator-hardware side of that claim is developed in <a href="https://github.com/FloatingPragma/observer-patch-holography/blob/main/paper/screen_microphysics_and_observer_synchronization.pdf" target="_blank" rel="noopener noreferrer">Screen Microphysics and Observer Synchronization</a>,
                    while the public theory-of-everything closure is the strange-loop hypothesis.
                </p>
                <p style={{ margin: 0 }}>
                    Two external quantitative inputs recur across the public surface: pixel area
                    (<span style={{ color: 'var(--accent-cyan)' }}>a<sub>cell</sub> &asymp; 1.63 l<sub>P</sub>&sup2;</span>) and
                    screen capacity (<span style={{ color: 'var(--accent-cyan)' }}>log dim H &sim; 10<sup>122</sup></span>).
                    Other outputs depend on the specific branch and premise stack used on each page.
                </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Link to="/hints/" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                    Begin the Journey <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
