import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { BookOpen, Cpu, GraduationCap, Menu, Network, Orbit, X } from 'lucide-react';
import './Layout.css';
import { WALKTHROUGH_STEPS, PART_LABELS, PART_COLORS, type PartId } from '../routes/walkthrough';
import { WalkthroughNav } from './WalkthroughNav';
import { installLinkTracking, trackPageView } from '../lib/analytics';
import { SeoManager } from './SeoManager';
import { getSeoMeta } from '../seo';
import { BOOK_URL, CHALLENGE_URL, COHERENCE_URL, OMEGA_URL, OVERVIEW_URL, RESEARCH_REPO_URL, SIMULATION_URL, TEXTBOOKS_URL, THEORY_URL, THREE_BODY_DEMO_URL } from '../content/paperSurface';

export function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();
    const normalizedPath = location.pathname.replace(/\/$/, '') || '/';
    const isLandingSurface = normalizedPath === '/';

    useEffect(() => {
        const title = getSeoMeta(normalizedPath).title;
        trackPageView(normalizedPath, title);
    }, [location.pathname]);

    useEffect(() => installLinkTracking('oph_lab'), []);

    // Group steps by part
    const parts = new Map<PartId, typeof WALKTHROUGH_STEPS>();
    for (const step of WALKTHROUGH_STEPS) {
        const list = parts.get(step.part) ?? [];
        list.push(step);
        parts.set(step.part, list);
    }

    return (
        <div className="layout">
            <SeoManager />
            <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <a href="https://floatingpragma.io/" className="back-link">&larr;</a>
                    <span className="logo">OPH Lab</span>
                    <button
                        className="close-btn mobile-only"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="nav">
                    {Array.from(parts.entries()).map(([partId, steps]) => (
                        <div key={partId} className="nav-group">
                            <div
                                className="nav-group-label"
                                style={{ color: PART_COLORS[partId] }}
                            >
                                {PART_LABELS[partId]}
                            </div>
                            {steps.map((item) => (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.to === '/'}
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    <item.icon size={16} />
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </div>
                    ))}
                </nav>
            </aside>

            <div className="main-content">
                <header className="mobile-header">
                    <button
                        className="menu-btn"
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        <Menu size={24} />
                    </button>
                    <span className="logo" style={{ marginLeft: '16px' }}>OPH Lab</span>
                </header>

                <main className="content-scroll">
                    <div className="global-resource-bar" aria-label="Best OPH starting points">
                        <span className="global-resource-label">Best starting points</span>
                        <a className="global-resource-link" href={TEXTBOOKS_URL}>
                            <GraduationCap size={18} />
                            <span>
                                <strong>OPH Textbooks</strong>
                                <small>Guided study path through the derivations.</small>
                            </span>
                        </a>
                        <a className="global-resource-link" href={BOOK_URL}>
                            <BookOpen size={18} />
                            <span>
                                <strong>Reverse Engineering Reality</strong>
                                <small>The book-length route into the framework.</small>
                            </span>
                        </a>
                        <a className="global-resource-link" href={COHERENCE_URL}>
                            <Network size={18} />
                            <span>
                                <strong>Coherence Map</strong>
                                <small>Concept graph for OPH overlaps and public routes.</small>
                            </span>
                        </a>
                        <a className="global-resource-link" href={OMEGA_URL}>
                            <Cpu size={18} />
                            <span>
                                <strong>OMEGA</strong>
                                <small>Hardware-facing optical chamber guide.</small>
                            </span>
                        </a>
                        <a className="global-resource-link" href={THREE_BODY_DEMO_URL}>
                            <Orbit size={18} />
                            <span>
                                <strong>Three-Body Demo</strong>
                                <small>Finite patch-net simulator and proof walk-through.</small>
                            </span>
                        </a>
                    </div>

                    <div className={`content-container ${isLandingSurface ? 'content-container-wide' : ''}`}>
                        <Outlet />
                        <WalkthroughNav />

                        <footer style={{
                            marginTop: '64px',
                            paddingTop: '32px',
                            borderTop: '1px solid var(--border-color)',
                            textAlign: 'center',
                            color: 'var(--text-muted)',
                            fontSize: '0.85em'
                        }}>
                            <p>
                                <a href="https://floatingpragma.io/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Floating Pragma</a>
                                {' \u2022 '}
                                <a href={OVERVIEW_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>OPH Overview</a>
                                {' \u2022 '}
                                <a href={THEORY_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Theory of Everything</a>
                                {' \u2022 '}
                                <a href={SIMULATION_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Simulation Theory</a>
                                {' \u2022 '}
                                <a href={BOOK_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Book</a>
                                {' \u2022 '}
                                <a href={TEXTBOOKS_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Textbooks</a>
                                {' \u2022 '}
                                <a href={CHALLENGE_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Challenge</a>
                                {' \u2022 '}
                                <a href={COHERENCE_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Coherence</a>
                                {' \u2022 '}
                                <a href={OMEGA_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>OMEGA</a>
                                {' \u2022 '}
                                <a href={THREE_BODY_DEMO_URL} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>3-Body Demo</a>
                                {' \u2022 '}
                                <a href="https://floatingpragma.io/starklab/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>STARK Lab</a>
                                {' \u2022 '}
                                <a href="https://floatingpragma.io/selected-works/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Selected Works</a>
                                {' \u2022 '}
                                <a href="https://floatingpragma.io/awesome-zk-proofs/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>ZK Proofs</a>
                                {' \u2022 '}
                                <a href="https://floatingpragma.io/awesome-ai-security/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>AI Security</a>
                            </p>
                            <p style={{ marginTop: '8px' }}>
                                Bernhard Mueller
                                {' \u2022 '}
                                <a href={RESEARCH_REPO_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Research Repo</a>
                                {' \u2022 '}
                                <a href="https://zenodo.org/records/18288114" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Paper (Zenodo)</a>
                            </p>
                        </footer>
                    </div>
                </main>
            </div>
        </div>
    );
}
