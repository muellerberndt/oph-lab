import { useMemo } from 'react';
import { GLOSSARY_ENTRIES, type GlossaryCategory } from '../content/glossaryEntries';
import { useLabSetting } from '../state/labState';

const CATEGORY_LABELS: Record<GlossaryCategory, { label: string; color: string }> = {
    foundation: { label: 'Foundation', color: 'var(--accent-gold)' },
    axioms: { label: 'Axioms & Assumptions', color: 'var(--accent-amber)' },
    gravity: { label: 'Gravity Chain', color: 'var(--accent-rose)' },
    gauge: { label: 'Gauge & MAR', color: 'var(--accent-blue)' },
    spectrum: { label: 'Spectrum Math', color: 'var(--accent-cyan)' },
    methods: { label: 'Methods', color: 'var(--accent-purple)' },
    predictions: { label: 'Predictions', color: 'var(--accent-green)' },
    meta: { label: 'Meta', color: 'var(--text-muted)' },
};

function normalized(text: string) {
    return text.toLowerCase().trim();
}

export function GlossaryPage() {
    const [search, setSearch] = useLabSetting('glossary.search');
    const [filterCategoryRaw, setFilterCategoryRaw] = useLabSetting('glossary.filterCategory');
    const filterCategory = filterCategoryRaw as GlossaryCategory | null;

    const filtered = useMemo(() => {
        const query = normalized(search);
        return GLOSSARY_ENTRIES
            .filter(entry => {
                const matchesCategory = filterCategory === null || entry.category === filterCategory;
                if (!matchesCategory) {
                    return false;
                }
                if (query.length === 0) {
                    return true;
                }
                return (
                    normalized(entry.term).includes(query) ||
                    normalized(entry.symbol ?? '').includes(query) ||
                    normalized(entry.definition).includes(query) ||
                    entry.usedIn.some(item => normalized(item).includes(query))
                );
            })
            .sort((a, b) => a.term.localeCompare(b.term));
    }, [filterCategory, search]);

    const conceptCountByCategory = useMemo(() => {
        return Object.keys(CATEGORY_LABELS).reduce<Record<string, number>>((acc, key) => {
            acc[key] = GLOSSARY_ENTRIES.filter(entry => entry.category === key).length;
            return acc;
        }, {});
    }, []);

    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Reference</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Glossary</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Expanded concept index aligned with the OPH manuscript structure. The glossary now covers the gravity
                and QFT chains together with the newer consensus and screen-microphysics surfaces.
            </p>

            <div className="card" style={{ marginBottom: '14px', borderLeft: '3px solid var(--accent-gold)' }}>
                <div style={{ fontSize: '0.78em', color: 'var(--text-secondary)' }}>
                    <strong>{GLOSSARY_ENTRIES.length}</strong> concepts indexed across axioms, gravity, gauge
                    reconstruction, particle status, consensus, and observer machinery.
                </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
                <input
                    type="text"
                    placeholder="Search term, symbol, definition, or page..."
                    value={search}
                    onChange={event => setSearch(event.target.value)}
                    style={{
                        flex: 1,
                        minWidth: '220px',
                        padding: '8px 12px',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.82em',
                    }}
                />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <button
                    className={`btn ${filterCategory === null ? 'btn-primary' : 'btn-ghost'}`}
                    onClick={() => setFilterCategoryRaw(null)}
                    style={{ fontSize: '0.72em', padding: '4px 10px' }}
                >
                    All ({GLOSSARY_ENTRIES.length})
                </button>
                {(Object.keys(CATEGORY_LABELS) as GlossaryCategory[]).map(category => (
                    <button
                        key={category}
                        className={`btn ${filterCategory === category ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setFilterCategoryRaw(filterCategory === category ? null : category)}
                        style={{ fontSize: '0.72em', padding: '4px 10px' }}
                    >
                        {CATEGORY_LABELS[category].label} ({conceptCountByCategory[category]})
                    </button>
                ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {filtered.map(entry => {
                    const categoryStyle = CATEGORY_LABELS[entry.category];
                    const links = entry.links ?? [{ label: 'OPH Lab Resources', url: '/resources' }];
                    return (
                        <div key={entry.term} className="card" style={{ borderLeft: `3px solid ${categoryStyle.color}`, padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px', flexWrap: 'wrap' }}>
                                <h4 style={{ margin: 0, fontSize: '0.88em' }}>{entry.term}</h4>
                                {entry.symbol && (
                                    <span style={{ fontSize: '0.72em', color: 'var(--accent-cyan)' }}>{entry.symbol}</span>
                                )}
                                <span
                                    style={{
                                        fontSize: '0.62em',
                                        padding: '2px 8px',
                                        border: `1px solid ${categoryStyle.color}`,
                                        color: categoryStyle.color,
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.08em',
                                    }}
                                >
                                    {categoryStyle.label}
                                </span>
                            </div>

                            <p style={{ margin: '0 0 10px 0', fontSize: '0.82em', lineHeight: '1.6' }}>{entry.definition}</p>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                                <span style={{ fontSize: '0.68em', color: 'var(--text-muted)' }}>Used in:</span>
                                {entry.usedIn.map(page => (
                                    <span
                                        key={`${entry.term}-${page}`}
                                        style={{
                                            fontSize: '0.66em',
                                            color: 'var(--text-secondary)',
                                            border: '1px solid var(--border-color)',
                                            padding: '2px 6px',
                                        }}
                                    >
                                        {page}
                                    </span>
                                ))}
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginTop: '10px' }}>
                                <span style={{ fontSize: '0.68em', color: 'var(--text-muted)' }}>Learn more:</span>
                                {links.map(link => (
                                    <a
                                        key={`${entry.term}-${link.url}`}
                                        href={link.url}
                                        target={link.url.startsWith('http') ? '_blank' : undefined}
                                        rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        style={{
                                            fontSize: '0.66em',
                                            color: 'var(--accent-cyan)',
                                            border: '1px solid var(--border-color)',
                                            padding: '2px 6px',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filtered.length === 0 && (
                <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-muted)' }}>
                    No matching terms found. Try a different search query.
                </div>
            )}
        </div>
    );
}
