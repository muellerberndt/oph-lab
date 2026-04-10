import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CORE_PARAMETERS, OPH_PAPERS } from '../content/paperSurface';

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
                    The lab still walks through the gravity and QFT derivation chains, but it now tracks the broader
                    five-paper public stack as well: recovered core, synthesis, particle status, consensus, and
                    observer machinery.
                </p>
                <p style={{ color: 'var(--text-muted)', marginTop: '16px', marginBottom: 0 }}>
                    If you arrived here through <a href="https://floatingpragma.io/oph/theory-of-everything/" target="_blank" rel="noopener noreferrer">theory of everything</a> or{' '}
                    <a href="https://floatingpragma.io/oph/simulation-theory/" target="_blank" rel="noopener noreferrer">simulation theory</a> searches, this lab maps the
                    current OPH research surface, including which claims are theorem-grade, branch-conditional,
                    continuation-only, or still open.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
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
                <div className="card" style={{ padding: '20px', borderLeft: '3px solid var(--accent-purple)' }}>
                    <div style={{ fontSize: '0.7em', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--accent-purple)', marginBottom: '8px' }}>
                        Observer Machinery
                    </div>
                    <h3 style={{ fontSize: '1em', margin: '0 0 8px 0' }}>Consensus and Screen Microphysics</h3>
                    <p style={{ fontSize: '0.85em', margin: 0 }}>
                        Follow the finite patch-net repair story, record algebra, and the explicit screen-register
                        architecture that turns observers and synchronization into concrete physics.
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
                    From this starting point, the current paper surface derives a schedule-independent overlap normal
                    form, a conditional Lorentz branch, a conditional Jacobson-type Einstein branch, the realized
                    Standard Model quotient chain, and a concrete finite-screen observer architecture.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    OPH presents itself publicly both as a <strong>theory-of-everything program</strong> and as a concrete
                    implementation of <strong>simulation theory</strong>: reality is reconstructed as an observer-consistent
                    information process rather than a world with one privileged frame. This lab tracks the current paper
                    surface rather than collapsing all branches into one unconditional claim.
                </p>
                <p style={{ marginBottom: '12px' }}>
                    The simulator-facing implementation is now its own first-class surface in <em>Screen Microphysics
                    and Observer Synchronization</em>, while <em>Reality as a Consensus Protocol</em> gives the fixed-point
                    and repair spine beneath the rest of the derivation stack.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                    {CORE_PARAMETERS.map((item) => (
                        <div key={item.label} style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75em', color: 'var(--accent-gold)', marginBottom: '4px' }}>{item.label}</div>
                            <div style={{ color: 'var(--accent-cyan)', marginBottom: '8px' }}>{item.value}</div>
                            <div style={{ fontSize: '0.8em', color: 'var(--text-secondary)' }}>{item.note}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="card" style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '0.9em', marginBottom: '12px' }}>Current Public Paper Stack</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                    {OPH_PAPERS.map((paper) => (
                        <a
                            key={paper.slug}
                            href={paper.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: 'block',
                                padding: '14px',
                                background: 'rgba(0,0,0,0.18)',
                                border: '1px solid var(--border-color)',
                                textDecoration: 'none',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '6px' }}>
                                <strong style={{ color: 'var(--text-primary)' }}>{paper.title}</strong>
                                <span style={{ color: 'var(--accent-gold)', fontSize: '0.78em' }}>{paper.surface}</span>
                            </div>
                            <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{paper.summary}</div>
                        </a>
                    ))}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                <Link to="/hints/" className="btn btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                    Begin the Journey <ArrowRight size={18} />
                </Link>
            </div>
        </div>
    );
}
