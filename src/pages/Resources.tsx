import { Explainer } from '../components/Explainer';
import {
    BOOK_URL,
    CHALLENGE_URL,
    CLAIM_TIER_LEGEND,
    LAB_REPO_URL,
    OPH_PAPERS,
    OVERVIEW_URL,
    RESEARCH_PAPER_DIR_URL,
    RESEARCH_REPO_URL,
    SIMULATION_URL,
    TEXTBOOKS_URL,
    THEORY_URL,
} from '../content/paperSurface';

const BACKGROUND_READING = [
    {
        category: 'Holographic Principle',
        items: [
            { author: "G. 't Hooft", title: 'Dimensional Reduction in Quantum Gravity', year: '1993', ref: 'gr-qc/9310026' },
            { author: 'L. Susskind', title: 'The World as a Hologram', year: '1995', ref: 'hep-th/9409089' },
            { author: 'R. Bousso', title: 'The Holographic Principle', year: '2002', ref: 'hep-th/0203101' },
        ],
    },
    {
        category: 'Thermodynamic Gravity',
        items: [
            { author: 'T. Jacobson', title: 'Thermodynamics of Spacetime: The Einstein Equation of State', year: '1995', ref: 'gr-qc/9504004' },
            { author: 'T. Jacobson', title: 'Entanglement Equilibrium and the Einstein Equation', year: '2015', ref: '1505.04753' },
            { author: 'E. Verlinde', title: 'On the Origin of Gravity and the Laws of Newton', year: '2010', ref: '1001.0785' },
        ],
    },
    {
        category: 'Quantum Information and Modular Theory',
        items: [
            { author: 'A. Almheiri, X. Dong, D. Harlow', title: 'Bulk Locality and Quantum Error Correction in AdS/CFT', year: '2014', ref: '1411.7041' },
            { author: 'J. Bisognano, E. Wichmann', title: 'On the Duality Condition for Quantum Fields', year: '1976', ref: 'JMP 17:303' },
            { author: 'A. Connes, C. Rovelli', title: 'Von Neumann Algebra Automorphisms and Time-Thermodynamics Relation', year: '1994', ref: 'gr-qc/9406019' },
        ],
    },
];

export function ResourcesPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Reference</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Resources</h1>
            </div>

            <p style={{ marginBottom: '24px' }}>
                Primary sources, mirrors, and entry points for the current OPH public stack.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                    Search Entry Pages
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    For readers arriving via high-intent public queries, OPH maintains dedicated entry pages for
                    <strong> theory of everything</strong> and <strong> simulation theory</strong>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <a href={THEORY_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        theory of everything &rarr;
                    </a>
                    <a href={SIMULATION_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        simulation theory &rarr;
                    </a>
                    <a href={OVERVIEW_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        OPH overview &rarr;
                    </a>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Five-Paper Public Stack</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                The lab now treats these five papers as the public source of truth. Use the individual paper that
                matches the surface you are discussing.
            </p>

            <div style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {OPH_PAPERS.map((paper) => (
                    <div key={paper.slug} className="card" style={{ borderLeft: '3px solid var(--accent-gold)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
                            <h4 style={{ margin: 0, fontSize: '0.9em', color: 'var(--accent-gold)' }}>{paper.title}</h4>
                            <span style={{ fontSize: '0.75em', color: 'var(--accent-cyan)' }}>{paper.surface}</span>
                        </div>
                        <p style={{ margin: '0 0 10px 0', fontSize: '0.85em', color: 'var(--text-secondary)' }}>
                            {paper.summary}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <a href={paper.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                                Open paper &rarr;
                            </a>
                            <a href={RESEARCH_PAPER_DIR_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                                Paper directory &rarr;
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    How To Read The Status Language
                </h4>
                <div style={{ display: 'grid', gap: '8px' }}>
                    {CLAIM_TIER_LEGEND.map((item) => (
                        <div key={item.tier} style={{ fontSize: '0.82em' }}>
                            <strong>{item.label}:</strong>{' '}
                            <span style={{ color: 'var(--text-secondary)' }}>{item.description}</span>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Other OPH Surfaces</h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', marginBottom: '24px' }}>
                <div className="card" style={{ borderLeft: '3px solid var(--accent-blue)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                        OPH Book
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                        Book-length exposition of the OPH story, aimed at readers who want a slower derivation path.
                    </p>
                    <a href={BOOK_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        oph-book.floatingpragma.io &rarr;
                    </a>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-cyan)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                        OPH Textbooks
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                        Guided study surface for readers who want a more structured walk through the material.
                    </p>
                    <a href={TEXTBOOKS_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        learn.floatingpragma.io &rarr;
                    </a>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-green)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-green)' }}>
                        OPH Challenge
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                        Public objection and review surface for testing the current corpus.
                    </p>
                    <a href={CHALLENGE_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        challenge.floatingpragma.io &rarr;
                    </a>
                </div>

                <div className="card" style={{ borderLeft: '3px solid var(--accent-purple)' }}>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>
                        OPH Lab Repo
                    </h4>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                        The codebase for this interactive lab app.
                    </p>
                    <a href={LAB_REPO_URL} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85em' }}>
                        github.com/muellerberndt/oph-lab &rarr;
                    </a>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Background Reading</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                A small starter set from the broader literature behind holography, thermodynamic gravity, and modular
                structure.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {BACKGROUND_READING.map((section) => (
                    <div key={section.category}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85em', color: 'var(--accent-gold)' }}>
                            {section.category}
                        </h4>
                        {section.items.map((item) => (
                            <div
                                key={`${section.category}-${item.ref}`}
                                style={{
                                    padding: '8px 12px',
                                    background: 'rgba(0,0,0,0.15)',
                                    border: '1px solid var(--border-color)',
                                    marginBottom: '4px',
                                    fontSize: '0.8em',
                                }}
                            >
                                <span style={{ color: 'var(--text-primary)' }}>{item.author}</span>
                                <span style={{ color: 'var(--text-muted)' }}> ({item.year}). </span>
                                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.title}. </span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{item.ref}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Explainer title="How to cite current OPH material">
                <p>
                    Cite the specific paper that matches the claim you are discussing. The current public surface is no
                    longer a one-paper story.
                </p>
                <p>
                    For technical statements, it is better to cite the exact paper and visible release line than to
                    cite the lab or an older bundled summary.
                </p>
            </Explainer>

            <Explainer title="Research and code links">
                <p>
                    The main research repo is:
                </p>
                <p>
                    <a href={RESEARCH_REPO_URL} target="_blank" rel="noopener noreferrer">
                        {RESEARCH_REPO_URL}
                    </a>
                </p>
                <p>
                    The paper sources live under the paper directory:
                </p>
                <p>
                    <a href={RESEARCH_PAPER_DIR_URL} target="_blank" rel="noopener noreferrer">
                        {RESEARCH_PAPER_DIR_URL}
                    </a>
                </p>
            </Explainer>
        </div>
    );
}
