import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Layout.css';
import { WALKTHROUGH_STEPS, PART_LABELS, PART_COLORS, type PartId } from '../routes/walkthrough';
import { WalkthroughNav } from './WalkthroughNav';

export function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Group steps by part
    const parts = new Map<PartId, typeof WALKTHROUGH_STEPS>();
    for (const step of WALKTHROUGH_STEPS) {
        const list = parts.get(step.part) ?? [];
        list.push(step);
        parts.set(step.part, list);
    }

    return (
        <div className="layout">
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
                    <div className="content-container">
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
                                <a href="https://github.com/muellerberndt/observer-patch-holography" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>GitHub</a>
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
