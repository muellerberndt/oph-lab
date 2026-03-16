import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

export function DarkMatterPage() {
    const [logMass, setLogMass] = useLabSetting('darkMatter.logMass'); // log10(M/M_sun)
    const [a0Multiplier, setA0Multiplier] = useLabSetting('darkMatter.a0Multiplier');
    const { resetKeys } = useLabState();

    const a0_base = 1.03e-10; // m/s^2
    const a0 = a0_base * a0Multiplier;
    const G = 6.674e-11;
    const M_sun = 1.989e30;

    const M = Math.pow(10, logMass) * M_sun;

    // Generate rotation curve data
    const curveData = useMemo(() => {
        const points: Array<{ r: number; vNewt: number; vMOND: number; vCDM: number }> = [];
        const rMax = 100; // kpc
        const kpc = 3.086e19; // meters per kpc

        for (let i = 1; i <= 50; i++) {
            const r_kpc = (i / 50) * rMax;
            const r = r_kpc * kpc;

            // Newtonian: v = sqrt(GM/r) (point mass approximation, declining)
            const vNewt = Math.sqrt(G * M / r);

            // MOND/OPH: interpolation function mu(x)x = g_N
            // In deep MOND regime (a << a0): v^4 = G*M*a0
            // Full interpolation: g = g_N / mu(g/a0) where mu(x) = x/sqrt(1+x^2)
            const gN = G * M / (r * r);
            const x = gN / a0;
            // Simple interpolation function
            const mu = x / Math.sqrt(1 + x * x);
            const gMOND = gN / mu;
            const vMOND = Math.sqrt(gMOND * r);

            // CDM (NFW profile approximation)
            const rs = 20 * kpc; // scale radius
            const rho0 = 0.01 * M_sun / (kpc * kpc * kpc); // characteristic density
            const MNFW = 4 * Math.PI * rho0 * rs * rs * rs * (Math.log(1 + r / rs) - (r / rs) / (1 + r / rs));
            const vCDM = Math.sqrt(G * (M + MNFW) / r);

            points.push({
                r: r_kpc,
                vNewt: vNewt / 1000, // km/s
                vMOND: vMOND / 1000,
                vCDM: vCDM / 1000,
            });
        }
        return points;
    }, [logMass, a0Multiplier, M, a0, G, M_sun]);

    // SVG dimensions
    const svgW = 500;
    const svgH = 300;
    const pad = { top: 20, right: 20, bottom: 40, left: 60 };
    const plotW = svgW - pad.left - pad.right;
    const plotH = svgH - pad.top - pad.bottom;

    const maxV = Math.max(...curveData.map(d => Math.max(d.vNewt, d.vMOND, d.vCDM)));
    const maxR = Math.max(...curveData.map(d => d.r));

    const toX = (r: number) => pad.left + (r / maxR) * plotW;
    const toY = (v: number) => pad.top + plotH - (v / (maxV * 1.1)) * plotH;

    const makePath = (key: 'vNewt' | 'vMOND' | 'vCDM') =>
        curveData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(d.r)} ${toY(d[key])}`).join(' ');

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Dark Matter &amp; MOND</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Galaxy rotation curves are flat: stars at the edges of galaxies orbit just as fast as stars near
                the center. Newtonian gravity predicts they should slow down (v &prop; r<sup>&minus;1/2</sup>).
                The standard solution: add invisible "dark matter" halos around every galaxy.
            </p>
            <p style={{ marginBottom: '16px' }}>
                OPH offers a different explanation: the Markov defect. At large distances where gravitational
                acceleration drops below a critical scale a<sub>0</sub>, the approximate Markov condition (Axiom A4)
                becomes imperfect. This information deficit mimics extra gravitational pull without any extra matter.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The MOND Scale from &Lambda;</h3>
            <p style={{ marginBottom: '8px' }}>
                Milgrom's Modified Newtonian Dynamics (MOND) empirically identified a critical acceleration
                a<sub>0</sub> &asymp; 1.2 &times; 10<sup>&minus;10</sup> m/s&sup2; below which gravitational dynamics
                deviate from Newton. In OPH, this scale is <strong>derived</strong> from the cosmological constant:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                a<sub>0</sub> = (15 / 8&pi;&sup2;) &middot; c&sup2; &middot; &radic;(&Lambda;/3) &asymp; 1.03 &times; 10<sup>&minus;10</sup> m/s&sup2;
            </div>
            <p style={{ marginBottom: '16px' }}>
                The numerical coefficient 15/(8&pi;&sup2;) comes from the Markov defect calculation. The fact that
                a<sub>0</sub> &sim; cH<sub>0</sub> (the "cosmic coincidence" in MOND) is no coincidence in OPH:
                both a<sub>0</sub> and H<sub>0</sub> are set by the same screen capacity.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Markov Defect Mechanism</h3>
            <p style={{ marginBottom: '16px' }}>
                Axiom A4 says the conditional mutual information I(A:D|B) &le; &epsilon; for tripartitions A-B-D.
                When &epsilon; = 0 (exact Markov), information recovery is perfect and gravity is exactly Newtonian.
                But &epsilon; is not exactly zero &mdash; it is controlled by the ratio a/a<sub>0</sub> where a is
                the gravitational acceleration.
            </p>
            <p style={{ marginBottom: '16px' }}>
                When a &gt;&gt; a<sub>0</sub> (strong field): &epsilon; &asymp; 0, recovery is near-perfect, Newtonian
                gravity works. When a &lt;&lt; a<sub>0</sub> (weak field): &epsilon; grows, recovery fails, and
                the missing information manifests as apparent extra gravitational pull. The interpolation between
                these regimes reproduces the MOND interpolation function.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Two Regimes
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85em' }}>
                    <div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>
                            Newtonian (a &gt;&gt; a<sub>0</sub>)
                        </div>
                        <div className="math-block" style={{ fontSize: '0.85em' }}>v &prop; r<sup>&minus;1/2</sup></div>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                            Markov condition satisfied. Standard 1/r&sup2; gravity.
                        </p>
                    </div>
                    <div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                            Deep MOND (a &lt;&lt; a<sub>0</sub>)
                        </div>
                        <div className="math-block" style={{ fontSize: '0.85em' }}>v<sup>4</sup> = G M a<sub>0</sub></div>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                            Markov defect dominant. Flat rotation curves.
                        </p>
                    </div>
                </div>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive: Galaxy Rotation Curves</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Adjust the galaxy mass and the MOND acceleration scale a<sub>0</sub>. Compare Newtonian, CDM (dark matter halo),
                    and OPH/MOND predictions.
                </p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <button
                        className="btn btn-ghost"
                        style={{ fontSize: '0.72em', padding: '4px 10px' }}
                        onClick={() => resetKeys(['darkMatter.logMass', 'darkMatter.a0Multiplier'])}
                    >
                        Reset Galaxy Defaults
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>Galaxy Mass M</span>
                            <span style={{ color: 'var(--text-muted)' }}>10<sup>{logMass}</sup> M<sub>&#9737;</sub></span>
                        </div>
                        <input
                            type="range"
                            min="9"
                            max="13"
                            step="0.1"
                            value={logMass}
                            onChange={e => setLogMass(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8em', marginBottom: '4px' }}>
                            <span style={{ color: 'var(--accent-gold)' }}>a<sub>0</sub> multiplier</span>
                            <span style={{ color: 'var(--text-muted)' }}>{a0Multiplier.toFixed(2)} &times; 1.03 &times; 10<sup>&minus;10</sup></span>
                        </div>
                        <input
                            type="range"
                            min="0.1"
                            max="3"
                            step="0.05"
                            value={a0Multiplier}
                            onChange={e => setA0Multiplier(parseFloat(e.target.value))}
                            style={{ width: '100%' }}
                        />
                    </div>
                </div>

                <svg
                    width="100%"
                    viewBox={`0 0 ${svgW} ${svgH}`}
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)' }}
                >
                    {/* Grid */}
                    {[0.25, 0.5, 0.75, 1.0].map(frac => (
                        <line
                            key={`h-${frac}`}
                            x1={pad.left}
                            y1={toY(maxV * 1.1 * frac)}
                            x2={svgW - pad.right}
                            y2={toY(maxV * 1.1 * frac)}
                            stroke="rgba(255,255,255,0.05)"
                        />
                    ))}

                    {/* Axes */}
                    <line x1={pad.left} y1={pad.top} x2={pad.left} y2={svgH - pad.bottom} stroke="rgba(255,255,255,0.2)" />
                    <line x1={pad.left} y1={svgH - pad.bottom} x2={svgW - pad.right} y2={svgH - pad.bottom} stroke="rgba(255,255,255,0.2)" />

                    {/* Axis labels */}
                    <text x={svgW / 2} y={svgH - 8} textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)">
                        r (kpc)
                    </text>
                    <text x={14} y={svgH / 2} textAnchor="middle" fill="var(--text-muted)" fontSize="10" fontFamily="var(--font-mono)" transform={`rotate(-90, 14, ${svgH / 2})`}>
                        v (km/s)
                    </text>

                    {/* Y-axis ticks */}
                    {[0, 0.25, 0.5, 0.75, 1.0].map(frac => (
                        <text
                            key={`ytick-${frac}`}
                            x={pad.left - 8}
                            y={toY(maxV * 1.1 * frac) + 4}
                            textAnchor="end"
                            fill="var(--text-muted)"
                            fontSize="9"
                            fontFamily="var(--font-mono)"
                        >
                            {Math.round(maxV * 1.1 * frac)}
                        </text>
                    ))}

                    {/* Curves */}
                    <path d={makePath('vNewt')} fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeDasharray="6 3" />
                    <path d={makePath('vCDM')} fill="none" stroke="var(--accent-purple)" strokeWidth="2" />
                    <path d={makePath('vMOND')} fill="none" stroke="var(--accent-cyan)" strokeWidth="2.5" />

                    {/* Legend */}
                    <rect x={svgW - pad.right - 155} y={pad.top + 5} width="150" height="60" fill="rgba(0,0,0,0.5)" stroke="var(--border-color)" />
                    <line x1={svgW - pad.right - 145} y1={pad.top + 20} x2={svgW - pad.right - 125} y2={pad.top + 20} stroke="var(--accent-gold)" strokeWidth="2" strokeDasharray="6 3" />
                    <text x={svgW - pad.right - 120} y={pad.top + 24} fill="var(--accent-gold)" fontSize="9" fontFamily="var(--font-mono)">Newtonian</text>
                    <line x1={svgW - pad.right - 145} y1={pad.top + 36} x2={svgW - pad.right - 125} y2={pad.top + 36} stroke="var(--accent-purple)" strokeWidth="2" />
                    <text x={svgW - pad.right - 120} y={pad.top + 40} fill="var(--accent-purple)" fontSize="9" fontFamily="var(--font-mono)">CDM (NFW)</text>
                    <line x1={svgW - pad.right - 145} y1={pad.top + 52} x2={svgW - pad.right - 125} y2={pad.top + 52} stroke="var(--accent-cyan)" strokeWidth="2.5" />
                    <text x={svgW - pad.right - 120} y={pad.top + 56} fill="var(--accent-cyan)" fontSize="9" fontFamily="var(--font-mono)">OPH/MOND</text>
                </svg>
            </div>

            <Explainer title="Why no dark matter particles?">
                <p>
                    In OPH, the "missing mass" is not mass at all. It is missing <em>information</em>. At scales
                    where a &lt; a<sub>0</sub>, the Markov recovery map (Axiom A4) fails to fully reconstruct
                    the state. The unrecovered information looks, gravitationally, like additional matter &mdash;
                    but there are no particles producing it.
                </p>
                <p>
                    This predicts that direct detection experiments will find no dark matter particles, and that
                    the "dark matter" signal will always correlate with the baryonic distribution via the
                    MOND relation v<sup>4</sup> = GMa<sub>0</sub> (the baryonic Tully-Fisher relation).
                </p>
            </Explainer>

            <Explainer title="Successes and differences from pure MOND">
                <p>
                    OPH reproduces the empirical successes of MOND:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Flat rotation curves of spiral galaxies</li>
                    <li>Baryonic Tully-Fisher relation: M &prop; v<sup>4</sup></li>
                    <li>The a<sub>0</sub> &sim; cH<sub>0</sub> cosmic coincidence (derived, not assumed)</li>
                    <li>Freeman limit and Fish law for surface brightness</li>
                </ul>
                <p>
                    But OPH also addresses MOND's weaknesses:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Cluster-scale behavior: the Markov defect has a different form for hot gas dominated systems</li>
                    <li>Relativistic lensing: automatically handled because the Markov defect modifies the full metric</li>
                    <li>CMB acoustic peaks: modified by screen-capacity effects at early times</li>
                </ul>
            </Explainer>

            <Explainer title="The cosmic coincidence a_0 ~ cH_0">
                <p>
                    One of the deepest puzzles in MOND phenomenology: why is the acceleration scale a<sub>0</sub>
                    of the same order as the "cosmic acceleration" cH<sub>0</sub>? In the standard model, galaxy
                    dynamics has nothing to do with cosmology.
                </p>
                <p>
                    In OPH, both scales are set by the screen capacity:
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    a<sub>0</sub> &sim; c&sup2;&radic;(&Lambda;/3) &sim; cH<sub>0</sub>
                </div>
                <p>
                    This is because &Lambda; = 3H<sup>2</sup> (in the de Sitter limit) and
                    a<sub>0</sub> &prop; c&sup2;&radic;&Lambda;. The cosmic coincidence is automatic.
                </p>
            </Explainer>
        </div>
    );
}
