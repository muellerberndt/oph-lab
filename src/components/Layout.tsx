import { useState, useEffect } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Layout.css';
import { WALKTHROUGH_STEPS, PART_LABELS, PART_COLORS, type PartId } from '../routes/walkthrough';
import { WalkthroughNav } from './WalkthroughNav';
import { useLabState } from '../state/labState';
import { installLinkTracking, trackEvent, trackPageView } from '../lib/analytics';

const SITE_SUFFIX = ' | OPH Lab';

export function Layout() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [toolStatus, setToolStatus] = useState<string | null>(null);
    const location = useLocation();
    const { resetAll, exportState } = useLabState();

    useEffect(() => {
        const path = location.pathname.replace(/\/$/, '') || '/';
        const step = WALKTHROUGH_STEPS.find(s => s.to === path);
        const title = step ? step.seoTitle + SITE_SUFFIX : 'OPH Lab — Theory of Everything Interactive Guide';
        document.title = title;
        trackPageView(path, title);
    }, [location.pathname]);

    useEffect(() => installLinkTracking('oph_lab'), []);

    // Group steps by part
    const parts = new Map<PartId, typeof WALKTHROUGH_STEPS>();
    for (const step of WALKTHROUGH_STEPS) {
        const list = parts.get(step.part) ?? [];
        list.push(step);
        parts.set(step.part, list);
    }

    const handleGlobalReset = () => {
        resetAll();
        trackEvent('lab_control', { action: 'reset_all' });
        setToolStatus('All controls reset to canonical OPH values.');
    };

    const handleExport = async () => {
        const payload = exportState();
        const json = JSON.stringify(payload, null, 2);
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        let copied = false;
        if (navigator.clipboard?.writeText) {
            try {
                await navigator.clipboard.writeText(json);
                copied = true;
            } catch {
                copied = false;
            }
        }

        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = `oph-lab-state-${timestamp}.json`;
        anchor.click();
        URL.revokeObjectURL(url);

        trackEvent('lab_control', { action: 'export_state', copied_to_clipboard: copied });
        setToolStatus(copied ? 'State copied and downloaded as JSON.' : 'State downloaded as JSON.');
    };

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

                <div className="sidebar-tools">
                    <div className="sidebar-tools-title">Lab Controls</div>
                    <button
                        className="sidebar-tool-btn"
                        onClick={handleGlobalReset}
                    >
                        Global Reset (Our Universe)
                    </button>
                    <button
                        className="sidebar-tool-btn secondary"
                        onClick={handleExport}
                    >
                        Export State + Effects
                    </button>
                    {toolStatus && <div className="sidebar-tools-status">{toolStatus}</div>}
                </div>
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
                                <a href="https://floatingpragma.io/oph/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>OPH Overview</a>
                                {' \u2022 '}
                                <a href="https://oph-book.floatingpragma.io/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Book</a>
                                {' \u2022 '}
                                <a href="https://challenge.floatingpragma.io/" style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>Challenge</a>
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
