import { Explainer } from '../components/Explainer';
import { CONSENSUS_HIGHLIGHTS } from '../content/paperSurface';

export function ConsensusProtocolPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation" style={{ color: 'var(--accent-purple)', borderColor: 'var(--accent-purple)' }}>Consensus</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Reality As A Consensus Protocol</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This page covers the dedicated consensus paper. It asks a narrower question than the gravity and
                gauge pages: if observer patches repair disagreements locally, do different repair orders lead to
                different worlds?
            </p>

            <div className="math-block" style={{ fontSize: '1em', marginBottom: '16px' }}>
                local repair + local-fit contract + quotient-compatible gluing =&gt; schedule-independent normal form
            </div>

            <p style={{ marginBottom: '24px' }}>
                On the fixed-cutoff collar branch, OPH turns that statement into a finite patch-net theorem stack.
                The repair step is read from exact Markov splice or a declared recoverability channel and then
                accepted only when it improves overlap fit on the touched interfaces.
            </p>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {CONSENSUS_HIGHLIGHTS.map((item, index) => (
                    <div key={item} className="card" style={{ borderLeft: `3px solid ${index < 3 ? 'var(--accent-purple)' : 'var(--accent-cyan)'}` }}>
                        <div style={{ fontSize: '0.82em', color: 'var(--text-secondary)' }}>{item}</div>
                    </div>
                ))}
            </div>

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
                    This is also where stable records enter the formal story. The paper makes those records explicit on
                    a fixed-cutoff algebra.
                </p>
            </Explainer>

            <Explainer title="Scope">
                <p>
                    Repair completeness is a declared input for the main convergence theorem. The paper does not
                    single out one microscopic repair law on every branch.
                </p>
                <p>
                    Law-space selection stays in a meta-model box. The finite patch-net theorem stack carries the
                    main claim.
                </p>
            </Explainer>
        </div>
    );
}
