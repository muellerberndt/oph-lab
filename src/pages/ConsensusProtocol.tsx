import { Explainer } from '../components/Explainer';
import { CONSENSUS_HIGHLIGHTS, MATH_FOUNDATIONS_PAPER } from '../content/paperSurface';

export function ConsensusProtocolPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation" style={{ color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }}>Consensus</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Reality As A Consensus Protocol</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                The dedicated consensus paper states OPH's direct account of reality as observer-based fixed-point
                consensus. It asks a narrower question than the gravity and gauge pages: if observer patches repair
                disagreements locally, do different repair orders lead to different worlds, and does that result
                survive controlled coarse-graining?
            </p>

            <div className="math-block" style={{ fontSize: '1em', marginBottom: '16px' }}>
                local repair + local-fit contract + quotient-compatible gluing =&gt; stable macroscopic normal form
            </div>

            <p style={{ marginBottom: '24px' }}>
                On the fixed-cutoff collar branch, OPH turns that statement into a finite patch-net theorem stack.
                The repair step is read from exact Markov splice or a declared recoverability channel and then
                accepted only when it improves overlap fit on the touched interfaces. The refinement bridge then
                tracks normal-form and holonomy data through coarse-graining when the comparison defects are bounded.
            </p>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {CONSENSUS_HIGHLIGHTS.map((item, index) => (
                    <div key={item} className="card" style={{ borderLeft: `3px solid ${index < 3 ? 'var(--accent-purple)' : 'var(--accent-cyan)'}` }}>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{item}</div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Four Independent Proof Obligations</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                The standalone mathematical companion keeps four questions separate. Proving one does not silently
                discharge the others.
            </p>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>
                        Same-source confluence
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Different accepted repair orders starting from one fixed quotient state must reach the same
                        normal form. This is schedule independence; it does not compare different initial states.
                    </p>
                </div>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                        Cross-source identification
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Different sources with the same protected observation have matching endpoints modulo gauge
                        exactly when that observation identifies consistent states modulo the declared silent
                        equivalence, assuming observation preservation and that normal forms are the consistent states.
                    </p>
                </div>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                        Normalization and liveness
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Weak normalization shows that an endpoint exists. Fairness, strong normalization, or another
                        liveness certificate is needed before every allowed execution may be said to settle.
                    </p>
                </div>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                        Local repairability
                    </h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        A unique consistent extension need not be constructible by the declared local write support.
                        In the finite collar model, a total exact collar-preserving repair exists exactly when every
                        protected collar value has a consistent local extension.
                    </p>
                </div>
            </div>

            <p style={{ marginBottom: '24px', fontSize: '0.85em' }}>
                <a href={MATH_FOUNDATIONS_PAPER.href} target="_blank" rel="noopener noreferrer">
                    Read {MATH_FOUNDATIONS_PAPER.title}
                </a>{' '}
                for the application-neutral theorem, counterexample, stability, refinement, and Lean-audit layers.
                Its generic equivalence does not by itself prove that a particular physical boundary map is injective
                on its consistent quotient; that requires an application certificate.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Core Objects</h3>
            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>Inconsistency potential Phi</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Phi measures total mismatch across overlaps. Accepted repairs must lower the touched-overlap
                        contribution, so the dynamics cannot wander indefinitely on a finite patch net.
                    </p>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>Gauge quotient</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Physical uniqueness lives on overlap-invariant quotient data, not on raw microscopic
                        representatives. Different local descriptions may encode the same physical overlap content.
                    </p>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>Holonomy obstruction</h4>
                    <p style={{ margin: 0, fontSize: '0.82em', color: 'var(--text-secondary)' }}>
                        Pairwise agreement can leave a global inconsistency around a cycle, which the paper
                        represents as an abelian or higher-gauge holonomy defect.
                    </p>
                </div>
            </div>

            <Explainer title="Why this matters for OPH">
                <p>
                    The consensus paper is the finite-patch computational spine beneath the rest of the stack. It tells
                    you when local overlap repair can be treated as a well-defined physical process instead of an
                    ambiguous bookkeeping convention.
                </p>
                <p>
                    Stable records enter the formal story here. The paper makes those records explicit on a
                    fixed-cutoff algebra.
                </p>
            </Explainer>

            <Explainer title="Scope">
                <p>
                    Repair completeness is a declared input for the main convergence theorem. The paper does not
                    single out one microscopic repair law on every branch.
                </p>
                <p>
                    Same-source confluence, cross-source boundary identification, liveness, and local repairability
                    have separate hypotheses. Law-space selection is a meta-model construction.
                </p>
            </Explainer>
        </div>
    );
}
