import { useState, useCallback } from 'react';
import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

export function EntanglementGeometryPage() {
    const NUM_BOUNDARY = 8;
    const [bonds, setBonds] = useLabSetting('entanglementGeometry.bonds');
    const [selectedFrom, setSelectedFrom] = useState<number | null>(null);
    const { resetKeys } = useLabState();

    const svgSize = 340;
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const boundaryR = 140;

    const boundaryPoints = Array.from({ length: NUM_BOUNDARY }, (_, i) => {
        const angle = (2 * Math.PI * i) / NUM_BOUNDARY - Math.PI / 2;
        return {
            x: cx + boundaryR * Math.cos(angle),
            y: cy + boundaryR * Math.sin(angle),
        };
    });

    const totalEntanglement = bonds.reduce((s, b) => s + b.strength, 0);
    const maxBonds = (NUM_BOUNDARY * (NUM_BOUNDARY - 1)) / 2;
    const depth = Math.log2(1 + totalEntanglement) / Math.log2(1 + maxBonds);

    const handlePointClick = useCallback((idx: number) => {
        if (selectedFrom === null) {
            setSelectedFrom(idx);
        } else if (selectedFrom === idx) {
            setSelectedFrom(null);
        } else {
            const existing = bonds.findIndex(
                b => (b.from === selectedFrom && b.to === idx) || (b.from === idx && b.to === selectedFrom)
            );
            if (existing >= 0) {
                setBonds(prev => prev.filter((_, i) => i !== existing));
            } else {
                setBonds(prev => [...prev, { from: Math.min(selectedFrom, idx), to: Math.max(selectedFrom, idx), strength: 1.0 }]);
            }
            setSelectedFrom(null);
        }
    }, [selectedFrom, bonds]);

    const updateStrength = useCallback((idx: number, val: number) => {
        setBonds(prev => prev.map((b, i) => i === idx ? { ...b, strength: val } : b));
    }, []);

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Entanglement &amp; Geometry</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                One of the deepest insights of modern theoretical physics: <strong>entanglement creates geometry</strong>.
                The spatial distance between two regions is encoded by how much quantum entanglement they share.
                More entanglement means closer. Less entanglement means farther apart. No entanglement means
                disconnected.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Ryu-Takayanagi Formula</h3>
            <p style={{ marginBottom: '8px' }}>
                In holographic theories (AdS/CFT), the entanglement entropy of a boundary region A is given by
                the area of the minimal surface &gamma;<sub>A</sub> in the bulk that is homologous to A:
            </p>
            <div className="math-block">
                S(A) = Area(&gamma;<sub>A</sub>) / (4 G<sub>N</sub>)
            </div>
            <p style={{ marginBottom: '16px' }}>
                This is the Ryu-Takayanagi (RT) formula. It says that entanglement entropy on the boundary
                IS geometry in the bulk. The boundary is the screen; the bulk is the emergent spacetime.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, the RT formula is a consequence of Axiom A3 (area bound) combined with the identification
                of screen entanglement with bulk geometry. The "bulk" spacetime is not fundamental. It is
                reconstructed from boundary entanglement data.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Tensor Networks and MERA</h3>
            <p style={{ marginBottom: '16px' }}>
                The Multi-scale Entanglement Renormalization Ansatz (MERA) provides a concrete picture.
                A tensor network is a graph of tensors connected by contracted indices. Each internal edge
                carries entanglement. The geometry of the network encodes the entanglement structure of the
                boundary state.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In MERA, the network has a tree-like structure with "disentanglers" and "isometries" at each
                scale. The depth of the network corresponds to the radial direction in AdS, the extra
                "holographic" dimension. More entanglement bonds means the network is deeper, i.e., the bulk
                extends further inward. Cut all bonds and the interior collapses.
            </p>

            <div className="demo-container">
                <div className="demo-label">Interactive: Entanglement Bonds on a Boundary Circle</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Click pairs of boundary points to toggle entanglement bonds between them. Use sliders to adjust bond
                    strength. More and stronger bonds create deeper bulk geometry.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ fontSize: '0.72em', padding: '4px 10px' }}
                        onClick={() => {
                            resetKeys(['entanglementGeometry.bonds']);
                            setSelectedFrom(null);
                        }}
                    >
                        Reset Entanglement Graph
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                    <svg
                        width={svgSize}
                        height={svgSize}
                        style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', flexShrink: 0 }}
                    >
                        {/* Boundary circle */}
                        <circle cx={cx} cy={cy} r={boundaryR} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />

                        {/* Interior depth indicator */}
                        <circle
                            cx={cx}
                            cy={cy}
                            r={Math.max(8, boundaryR * depth * 0.8)}
                            fill="rgba(78, 231, 255, 0.05)"
                            stroke="rgba(78, 231, 255, 0.2)"
                            strokeWidth="1"
                            strokeDasharray="4 3"
                        />
                        <text
                            x={cx}
                            y={cy + 4}
                            textAnchor="middle"
                            fill="rgba(78, 231, 255, 0.6)"
                            fontSize="9"
                            fontFamily="var(--font-mono)"
                        >
                            bulk
                        </text>

                        {/* Entanglement bonds */}
                        {bonds.map((bond, i) => {
                            const p1 = boundaryPoints[bond.from];
                            const p2 = boundaryPoints[bond.to];
                            return (
                                <line
                                    key={i}
                                    x1={p1.x}
                                    y1={p1.y}
                                    x2={p2.x}
                                    y2={p2.y}
                                    stroke={`rgba(78, 231, 255, ${0.3 + bond.strength * 0.5})`}
                                    strokeWidth={1 + bond.strength * 2}
                                />
                            );
                        })}

                        {/* Boundary points */}
                        {boundaryPoints.map((pt, i) => (
                            <g key={i} onClick={() => handlePointClick(i)} style={{ cursor: 'pointer' }}>
                                <circle
                                    cx={pt.x}
                                    cy={pt.y}
                                    r={selectedFrom === i ? 12 : 8}
                                    fill={selectedFrom === i ? 'var(--accent-cyan)' : 'var(--accent-gold)'}
                                    stroke={selectedFrom === i ? 'var(--accent-cyan)' : 'var(--accent-gold)'}
                                    strokeWidth="2"
                                    fillOpacity={0.3}
                                />
                                <text
                                    x={pt.x}
                                    y={pt.y + 4}
                                    textAnchor="middle"
                                    fill="var(--text-primary)"
                                    fontSize="10"
                                    fontFamily="var(--font-mono)"
                                >
                                    {i}
                                </text>
                            </g>
                        ))}
                    </svg>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Total Entanglement
                            </div>
                            <div style={{ fontSize: '1.5em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                                {totalEntanglement.toFixed(1)}
                            </div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '0.75em', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '4px' }}>
                                Bulk Depth (emergent)
                            </div>
                            <div style={{
                                width: '100%',
                                height: '12px',
                                background: 'rgba(0,0,0,0.3)',
                                border: '1px solid var(--border-color)',
                            }}>
                                <div style={{
                                    width: `${depth * 100}%`,
                                    height: '100%',
                                    background: 'var(--accent-cyan)',
                                    transition: 'width 0.3s',
                                }} />
                            </div>
                            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: '4px' }}>
                                More entanglement = deeper interior
                            </div>
                        </div>

                        <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginBottom: '8px' }}>
                            {selectedFrom !== null
                                ? `Click another point to toggle bond with point ${selectedFrom}`
                                : 'Click a boundary point to start'}
                        </div>

                        {bonds.length > 0 && (
                            <div style={{ marginTop: '12px' }}>
                                <div style={{ fontSize: '0.75em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                    Bond Strengths
                                </div>
                                {bonds.map((bond, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', fontSize: '0.8em' }}>
                                        <span style={{ color: 'var(--accent-cyan)', minWidth: '40px' }}>{bond.from}&ndash;{bond.to}</span>
                                        <input
                                            type="range"
                                            min="0.1"
                                            max="2"
                                            step="0.1"
                                            value={bond.strength}
                                            onChange={e => updateStrength(i, parseFloat(e.target.value))}
                                            style={{ flex: 1 }}
                                        />
                                        <span style={{ color: 'var(--text-muted)', minWidth: '30px' }}>{bond.strength.toFixed(1)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Explainer title="ER = EPR and the emergence of connectivity">
                <p>
                    Maldacena and Susskind conjectured that entanglement (EPR pairs) and geometric connectivity
                    (Einstein-Rosen bridges / wormholes) are the same thing: ER = EPR. Two entangled black holes
                    are connected by a wormhole. Remove the entanglement and the wormhole pinches off.
                </p>
                <p>
                    In OPH, the screen patches are connected by entanglement (Axiom A2: overlap consistency). The
                    emergent bulk geometry is stitched together by this entanglement. Spatial connectivity just IS
                    entanglement connectivity.
                </p>
            </Explainer>

            <Explainer title="Subregion duality and quantum error correction">
                <p>
                    The RT formula implies <strong>subregion duality</strong>: a boundary region A can reconstruct
                    the bulk region enclosed by &gamma;<sub>A</sub> (the "entanglement wedge"). This reconstruction
                    has the structure of quantum error correction: bulk operators are encoded redundantly in boundary
                    degrees of freedom, protected against erasure of boundary subregions.
                </p>
                <p>
                    This is the bridge to the Error Correction page: spacetime itself is a quantum error-correcting code,
                    and the RT formula tells you which bulk data is recoverable from which boundary subregion.
                </p>
            </Explainer>

            <Explainer title="Why entanglement entropy, not thermal entropy?">
                <p>
                    Entanglement entropy arises from tracing out degrees of freedom you don't have access to.
                    If you only see patch P, you trace out the complement P&prime;, and the resulting reduced state
                    has von Neumann entropy S(&rho;<sub>P</sub>). This is purely quantum. It exists even at
                    zero temperature.
                </p>
                <p>
                    In OPH, every observer has a finite patch (Axiom A1). They always trace out the complement.
                    Entanglement entropy is therefore unavoidable and universal. It is the entropy that drives
                    the conditional gravity branch discussed on the Gravity page.
                </p>
            </Explainer>
        </div>
    );
}
