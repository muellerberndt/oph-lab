import { Explainer } from '../components/Explainer';

export function ResourcesPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Reference</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Resources</h1>
            </div>

            <p style={{ marginBottom: '24px' }}>
                Primary sources, supplementary materials, and links for Observer Patch Holography.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                    Search Entry Pages
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    For readers arriving via high-intent public queries, OPH has dedicated landing pages for
                    <strong> theory of everything</strong> and <strong> simulation theory</strong>.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <a
                        href="https://floatingpragma.io/oph/theory-of-everything/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        theory of everything &rarr;
                    </a>
                    <a
                        href="https://floatingpragma.io/oph/simulation-theory/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        simulation theory &rarr;
                    </a>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Primary Sources</h3>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    The OPH Paper Set
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    <strong>Compact SM/GR paper, main paper, and particle-continuation paper</strong>
                    <br />
                    Bernhard Mueller
                </p>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                    The current source of truth is the paper set in the research repo, led by the compact paper on
                    relativity and Standard Model structure, the main synthesis paper, and the particle-continuation
                    paper. These sources separate theorem-grade structural results from branch-conditional and
                    continuation-level claims.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <a
                        href="https://github.com/FloatingPragma/observer-patch-holography/tree/main/paper"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        GitHub paper directory &rarr;
                    </a>
                    <a
                        href="https://doi.org/10.5281/zenodo.18288114"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        Zenodo record &rarr;
                    </a>
                </div>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    The OPH Book
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    An accessible, book-length exposition of OPH aimed at readers with some physics background.
                    Covers the motivation, axioms, derivation chains, and predictions in a more pedagogical style
                    than the technical paper.
                </p>
                <a
                    href="https://oph-book.floatingpragma.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85em' }}
                >
                    oph-book.floatingpragma.io &rarr;
                </a>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                    OPH Textbooks
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    A student-facing study app with guided OPH explanations for readers who want a more structured path
                    through the material than the landing pages alone.
                </p>
                <a
                    href="https://learn.floatingpragma.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85em' }}
                >
                    learn.floatingpragma.io &rarr;
                </a>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>
                    Third-Party Video Course
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    Sriharsha Karamchati&apos;s chapter-by-chapter OPH playlist on YouTube. Useful as a
                    video companion to the book for readers who want one explainer per chapter.
                </p>
                <a
                    href="https://www.youtube.com/playlist?list=PLff0tYtg64Egc2sTtKgThcPRNRdR6i83O"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85em' }}
                >
                    YouTube playlist &rarr;
                </a>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-green)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-green)' }}>
                    OPH Lab (This Site)
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    Interactive web application for exploring OPH concepts. Built with React and TypeScript.
                    Open source.
                </p>
                <a
                    href="https://github.com/muellerberndt/oph-lab"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85em' }}
                >
                    github.com/muellerberndt/oph-lab &rarr;
                </a>
            </div>

            <div className="card" style={{ marginBottom: '12px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>
                    Overview Site
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    A high-level overview of OPH for general audiences, with dedicated entry pages for theory of everything and simulation theory readers.
                </p>
                <a
                    href="https://floatingpragma.io/oph/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: '0.85em' }}
                >
                    floatingpragma.io/oph/ &rarr;
                </a>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Community &amp; Ecosystem</h3>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-purple)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-purple)' }}>
                    TEO Token
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    TEO is the official OPH memecoin on Base. It is purely speculative, has no promised
                    return, and has no announced utility at this time. Treat it as a memecoin only and
                    do your own research.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <a
                        href="https://dexscreener.com/base/0xba55cdae026b9dd63fcb50e82094d61472948e44527ca4791033497469228049"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        DexScreener &rarr;
                    </a>
                    <a
                        href="https://basescan.org/token/0xd2a7055317D0c7b316319cDadaE592D0644A0b07"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        BaseScan &rarr;
                    </a>
                    <a
                        href="https://app.uniswap.org/swap?outputCurrency=0xd2a7055317D0c7b316319cDadaE592D0644A0b07&chain=base"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontSize: '0.85em' }}
                    >
                        Buy on Uniswap &rarr;
                    </a>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Background Reading</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.85em', color: 'var(--text-muted)' }}>
                Key papers and references from the broader physics literature that OPH builds upon.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                {[
                    {
                        category: 'Holographic Principle',
                        items: [
                            { author: "G. 't Hooft", title: 'Dimensional Reduction in Quantum Gravity', year: '1993', ref: 'gr-qc/9310026' },
                            { author: 'L. Susskind', title: 'The World as a Hologram', year: '1995', ref: 'hep-th/9409089' },
                            { author: 'J. Maldacena', title: 'The Large N Limit of Superconformal Field Theories and Supergravity', year: '1997', ref: 'hep-th/9711200' },
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
                        category: 'Entanglement & Geometry',
                        items: [
                            { author: 'S. Ryu, T. Takayanagi', title: 'Holographic Derivation of Entanglement Entropy from AdS/CFT', year: '2006', ref: 'hep-th/0603001' },
                            { author: 'M. Van Raamsdonk', title: 'Building up Spacetime with Quantum Entanglement', year: '2010', ref: '1005.3035' },
                            { author: 'J. Maldacena, L. Susskind', title: 'Cool Horizons for Entangled Black Holes (ER=EPR)', year: '2013', ref: '1306.0533' },
                            { author: 'B. Swingle', title: 'Entanglement Renormalization and Holography', year: '2012', ref: '0905.1317' },
                        ],
                    },
                    {
                        category: 'Quantum Error Correction & Holography',
                        items: [
                            { author: 'A. Almheiri, X. Dong, D. Harlow', title: 'Bulk Locality and Quantum Error Correction in AdS/CFT', year: '2014', ref: '1411.7041' },
                            { author: 'F. Pastawski et al.', title: 'Holographic Quantum Error-Correcting Codes (HaPPY)', year: '2015', ref: '1503.06237' },
                        ],
                    },
                    {
                        category: 'MOND & Dark Matter',
                        items: [
                            { author: 'M. Milgrom', title: 'A Modification of the Newtonian Dynamics', year: '1983', ref: 'ApJ 270:365' },
                            { author: 'S. McGaugh et al.', title: 'The Radial Acceleration Relation in Rotationally Supported Galaxies', year: '2016', ref: '1609.05917' },
                        ],
                    },
                    {
                        category: 'Modular Theory',
                        items: [
                            { author: 'J. Bisognano, E. Wichmann', title: 'On the Duality Condition for Quantum Fields', year: '1976', ref: 'JMP 17:303' },
                            { author: 'A. Connes, C. Rovelli', title: 'Von Neumann Algebra Automorphisms and Time-Thermodynamics Relation', year: '1994', ref: 'gr-qc/9406019' },
                        ],
                    },
                ].map((section, si) => (
                    <div key={si}>
                        <h4 style={{ margin: '0 0 8px 0', fontSize: '0.85em', color: 'var(--accent-gold)' }}>
                            {section.category}
                        </h4>
                        {section.items.map((item, ii) => (
                            <div key={ii} style={{
                                padding: '8px 12px',
                                background: 'rgba(0,0,0,0.15)',
                                border: '1px solid var(--border-color)',
                                marginBottom: '4px',
                                fontSize: '0.8em',
                            }}>
                                <span style={{ color: 'var(--text-primary)' }}>{item.author}</span>
                                <span style={{ color: 'var(--text-muted)' }}> ({item.year}). </span>
                                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>{item.title}. </span>
                                <span style={{ color: 'var(--accent-cyan)' }}>{item.ref}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <Explainer title="How to cite OPH">
                <p>If referencing the OPH framework, please cite the Zenodo paper:</p>
                <div style={{
                    padding: '12px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid var(--border-color)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8em',
                    lineHeight: '1.6',
                    marginTop: '8px',
                }}>
                    Mueller, B. (2025). Observer-Patch Holography: A Two-Parameter Framework for Physics.
                    Zenodo. https://doi.org/10.5281/zenodo.18288114
                </div>
            </Explainer>

            <Explainer title="Contact & Discussion">
                <p>
                    For questions, discussions, and contributions, visit the GitHub repository:
                </p>
                <p>
                    <a href="https://github.com/muellerberndt/oph-lab" target="_blank" rel="noopener noreferrer">
                        github.com/muellerberndt/oph-lab
                    </a>
                </p>
                <p>
                    Issues and pull requests are welcome. The OPH framework is under active development,
                    and community input &mdash; especially regarding mathematical rigor, phenomenological
                    predictions, and experimental tests &mdash; is valued.
                </p>
            </Explainer>
        </div>
    );
}
