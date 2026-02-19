import { useState, useCallback } from 'react';
import { Explainer } from '../components/Explainer';

interface Patch {
    cx: number;
    cy: number;
    r: number;
    color: string;
    label: string;
}

const COLORS = ['rgba(201, 112, 112, 0.3)', 'rgba(122, 184, 212, 0.3)', 'rgba(201, 169, 110, 0.3)', 'rgba(0, 255, 65, 0.2)'];
const STROKE_COLORS = ['#c97070', '#7ab8d4', '#c9a96e', '#00ff41'];

export function TheScreenPage() {
    const [patches, setPatches] = useState<Patch[]>([
        { cx: 140, cy: 130, r: 60, color: COLORS[0], label: 'Observer A' },
        { cx: 200, cy: 170, r: 55, color: COLORS[1], label: 'Observer B' },
    ]);
    const [dragging, setDragging] = useState<number | null>(null);

    const svgSize = 340;
    const sphereR = 140;
    const sphereCx = svgSize / 2;
    const sphereCy = svgSize / 2;

    const handleMouseDown = useCallback((i: number) => {
        setDragging(i);
    }, []);

    const handleMouseMove = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
        if (dragging === null) return;
        const svg = e.currentTarget;
        const rect = svg.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPatches(prev => prev.map((p, i) => i === dragging ? { ...p, cx: x, cy: y } : p));
    }, [dragging]);

    const handleMouseUp = useCallback(() => {
        setDragging(null);
    }, []);

    const addPatch = () => {
        if (patches.length >= 4) return;
        const idx = patches.length;
        setPatches(prev => [...prev, {
            cx: 160 + idx * 30,
            cy: 140 + idx * 20,
            r: 50,
            color: COLORS[idx % COLORS.length],
            label: `Observer ${String.fromCharCode(65 + idx)}`,
        }]);
    };

    // Check for overlaps
    const overlaps: Array<{ i: number; j: number }> = [];
    for (let i = 0; i < patches.length; i++) {
        for (let j = i + 1; j < patches.length; j++) {
            const dx = patches[i].cx - patches[j].cx;
            const dy = patches[i].cy - patches[j].cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < patches[i].r + patches[j].r) {
                overlaps.push({ i, j });
            }
        }
    }

    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Foundation</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>The Holographic Screen</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                In OPH, the fundamental arena is not 3+1 dimensional spacetime but a <strong>two-dimensional sphere S&sup2;</strong> &mdash;
                the holographic screen. All physical information is encoded on this surface.
            </p>
            <p style={{ marginBottom: '24px' }}>
                Each observer has access to a <strong>patch</strong> of the screen &mdash; a connected region carrying
                a local algebra of observables. Where patches overlap, descriptions must agree.
            </p>

            <div className="demo-container">
                <div className="demo-label">Interactive: Observer Patches on S&sup2;</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Drag patches around the sphere. When they overlap, shared observables must agree (Axiom A2).
                </p>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
                    <svg
                        width={svgSize}
                        height={svgSize}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', flexShrink: 0 }}
                    >
                        {/* Grid lines on sphere */}
                        <circle cx={sphereCx} cy={sphereCy} r={sphereR} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                        <ellipse cx={sphereCx} cy={sphereCy} rx={sphereR} ry={sphereR * 0.3} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                        <ellipse cx={sphereCx} cy={sphereCy} rx={sphereR * 0.3} ry={sphereR} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" />
                        <line x1={sphereCx - sphereR} y1={sphereCy} x2={sphereCx + sphereR} y2={sphereCy} stroke="rgba(255,255,255,0.04)" />
                        <line x1={sphereCx} y1={sphereCy - sphereR} x2={sphereCx} y2={sphereCy + sphereR} stroke="rgba(255,255,255,0.04)" />

                        {/* Patches */}
                        {patches.map((p, i) => (
                            <g key={i}>
                                <circle
                                    cx={p.cx}
                                    cy={p.cy}
                                    r={p.r}
                                    fill={p.color}
                                    stroke={STROKE_COLORS[i % STROKE_COLORS.length]}
                                    strokeWidth="1.5"
                                    strokeDasharray="4 2"
                                    style={{ cursor: 'grab' }}
                                    onMouseDown={() => handleMouseDown(i)}
                                />
                                <text
                                    x={p.cx}
                                    y={p.cy - p.r - 8}
                                    textAnchor="middle"
                                    fill={STROKE_COLORS[i % STROKE_COLORS.length]}
                                    fontSize="10"
                                    fontFamily="var(--font-mono)"
                                >
                                    {p.label}
                                </text>
                            </g>
                        ))}

                        {/* Overlap indicators */}
                        {overlaps.map(({ i, j }, idx) => {
                            const midX = (patches[i].cx + patches[j].cx) / 2;
                            const midY = (patches[i].cy + patches[j].cy) / 2;
                            return (
                                <text
                                    key={idx}
                                    x={midX}
                                    y={midY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="var(--accent-green)"
                                    fontSize="10"
                                    fontFamily="var(--font-mono)"
                                >
                                    overlap
                                </text>
                            );
                        })}
                    </svg>

                    <div style={{ flex: 1 }}>
                        <div style={{ marginBottom: '16px' }}>
                            <button className="btn btn-ghost" onClick={addPatch} disabled={patches.length >= 4} style={{ fontSize: '0.8em' }}>
                                + Add Observer
                            </button>
                        </div>

                        <div style={{ fontSize: '0.85em' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>
                                Patches: {patches.length} | Overlaps: {overlaps.length}
                            </div>
                            {overlaps.length > 0 && (
                                <div style={{ padding: '12px', background: 'rgba(0, 255, 65, 0.05)', border: '1px solid rgba(0, 255, 65, 0.2)' }}>
                                    <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>
                                        Overlap Consistency (A2)
                                    </div>
                                    {overlaps.map(({ i, j }, idx) => (
                                        <div key={idx} style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                                            {patches[i].label} &cap; {patches[j].label}: states must agree on shared observables
                                        </div>
                                    ))}
                                </div>
                            )}
                            {overlaps.length === 0 && (
                                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                                    No overlaps. Move patches closer to see consistency constraints.
                                </div>
                            )}
                        </div>

                        <div style={{ marginTop: '16px', fontSize: '0.8em', color: 'var(--text-muted)' }}>
                            Information capacity of a patch with area A:
                        </div>
                        <div className="math-block" style={{ marginTop: '8px', fontSize: '0.9em' }}>
                            S = A / (4 l<sub>P</sub>&sup2;)
                        </div>
                    </div>
                </div>
            </div>

            <Explainer title="Why a sphere?">
                <p>
                    The S&sup2; screen is motivated by the holographic principle: the maximum information in any region
                    is bounded by its boundary area. A cosmological observer's information boundary is their cosmic
                    horizon &mdash; a sphere. Black hole horizons are also spheres. The sphere is where information lives.
                </p>
                <p>
                    Crucially, the conformal group of S&sup2; turns out to be the Lorentz group:
                    Conf&sup;(S&sup2;) = PSL(2,ℂ) = SO&sup;(3,1). Special relativity is a screen symmetry.
                </p>
            </Explainer>

            <Explainer title="Key equations">
                <p>
                    Bekenstein-Hawking entropy: <strong>S<sub>BH</sub> = A/(4l<sub>P</sub>&sup2;)</strong>
                </p>
                <p>
                    An observer is a tuple: <strong>(P<sub>O</sub>, A(P<sub>O</sub>), &rho;<sub>O</sub>, R<sub>O</sub>)</strong> &mdash;
                    their patch, algebra, local state, and records.
                </p>
                <p>
                    Isotony: if P &sub; Q then A(P) &sub; A(Q). Larger patches contain more observables.
                </p>
            </Explainer>
        </div>
    );
}
