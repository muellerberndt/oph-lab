import { useMemo } from 'react';
import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

export function DarkMatterPage() {
    const [logMass, setLogMass] = useLabSetting('darkMatter.logMass'); // log10(M/M_sun)
    const [a0Multiplier, setA0Multiplier] = useLabSetting('darkMatter.a0Multiplier');
    const { resetKeys } = useLabState();

    // Selected MOND benchmark scale; this is not promoted as an OPH-derived value.
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

            // MOND continuation benchmark: interpolation function mu(x)x = g_N
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
    }, [M, a0]);

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
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Dark-Sector Continuation &amp; MOND Benchmark</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Galaxy rotation curves motivate several dark-sector models. This page compares a point-mass
                Newtonian baseline, an illustrative NFW halo, and a MOND interpolation curve. It is a continuation
                benchmark, not a fitted galaxy analysis or a derivation of any of the three models.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The collar conditional mutual information (CMI) used by OPH is a scalar recoverability diagnostic.
                Small CMI controls reconstruction across a collar. By itself it is not a mass density, a rank-two
                stress tensor, a metric correction, or a force law, so it cannot be identified with extra
                gravitational pull.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>What the Collar Theorem Establishes</h3>
            <p style={{ marginBottom: '8px' }}>
                There are two sufficient recovery routes. On the declared central-interface branch, the edge split
                aligns with the Markov split and the collar CMI is exactly zero. Away from that branch, a faithful
                finite-range Gibbs family gives the quantitative bound
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                I(A<sub>&delta;</sub>:D<sub>&delta;</sub> | B<sub>&delta;</sub>)
                &nbsp;&le;&nbsp; c |&part;C|<sub>UV</sub> exp(&minus;&delta;/&xi;<sub>&ell;</sub>)
            </div>
            <p style={{ marginBottom: '16px' }}>
                only when the local dimensions, interaction range, degree, and interaction strength are uniformly
                bounded and the family satisfies uniform strong conditional matrix mixing. Ordinary two-point
                exponential clustering does not imply that premise for a general noncommuting Gibbs state.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Sharp Scaling Condition</h3>
            <p style={{ marginBottom: '16px' }}>
                The declared double scaling takes &ell;<sub>UV</sub> &rarr; 0, &delta; &rarr; 0, and
                &delta;/&ell;<sub>UV</sub> &rarr; &infin;. Because the UV boundary count also grows, CMI is forced to
                zero only when the full rate margin &delta;/&xi;<sub>&ell;</sub> &minus;
                log |&part;C|<sub>UV</sub> tends to +&infin;. The thick-collar ratio alone is not sufficient.
            </p>
            <p style={{ marginBottom: '16px' }}>
                A finite receipt can check the regulator and tripartition hashes, interaction bounds, separator and
                boundary-cell count, regional CMI, matrix defect, declared mixing constants, held-out cuts, the log
                envelope, and the recovery error. Such a receipt tests the recovery theorem; it does not certify a
                physical dark-sector source.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-rose)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Curves Used in the Benchmark
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85em' }}>
                    <div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>
                            Newtonian (a &gt;&gt; a<sub>0</sub>)
                        </div>
                        <div className="math-block" style={{ fontSize: '0.85em' }}>v &prop; r<sup>&minus;1/2</sup></div>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                            Point-mass Newtonian baseline with 1/r&sup2; gravity.
                        </p>
                    </div>
                    <div>
                        <div style={{ color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '4px' }}>
                            Deep MOND (a &lt;&lt; a<sub>0</sub>)
                        </div>
                        <div className="math-block" style={{ fontSize: '0.85em' }}>v<sup>4</sup> = G M a<sub>0</sub></div>
                        <p style={{ color: 'var(--text-secondary)', margin: '8px 0 0' }}>
                            Selected MOND continuation law; not inferred from collar CMI.
                        </p>
                    </div>
                </div>
            </div>

            <div className="demo-container">
                <div className="demo-label">Interactive: Galaxy Rotation Curves</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Adjust the point-mass parameter and the selected MOND acceleration scale a<sub>0</sub>. Compare
                    Newtonian, illustrative NFW, and MOND benchmark curves. These are not OPH predictions.
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
                            <span style={{ color: 'var(--accent-gold)' }}>benchmark a<sub>0</sub> multiplier</span>
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
                    <text x={svgW - pad.right - 120} y={pad.top + 56} fill="var(--accent-cyan)" fontSize="9" fontFamily="var(--font-mono)">MOND benchmark</text>
                </svg>
            </div>

            <Explainer title="What the benchmark does not claim">
                <p>
                    The comparison does not show that missing information replaces dark matter, predict a null result
                    for particle searches, or derive the baryonic Tully-Fisher relation. It also does not show that a
                    collar defect changes the full metric, lensing, clusters, or the CMB.
                </p>
                <p>
                    The proved output is narrower: exact or quantitatively controlled state recovery across a collar,
                    on the hypotheses stated above. The MOND curve is a benchmark for any physical
                    continuation; no galaxy-response law is derived from it.
                </p>
            </Explainer>

            <Explainer title="Receipts needed for a physical dark-sector continuation">
                <p>
                    Promoting a scalar recovery diagnostic to a physical source requires separate, checkable data:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>A source-tensor map from microscopic observables to a symmetric local &Delta;T<sub>ab</sub></li>
                    <li>Conservation or Ward receipts for &nabla;<sup>a</sup>&Delta;T<sub>ab</sub> = 0</li>
                    <li>Normalization and scale-setting receipts that do not import the target galaxy value</li>
                    <li>A universal coupling and dynamics prescription for matter, light, and cosmological probes</li>
                    <li>Likelihood receipts against rotation curves, lensing, clusters, and CMB data</li>
                </ul>
                <p>
                    Until those receipts are supplied together, the dark-sector interpretation is continuation-only.
                </p>
            </Explainer>

            <Explainer title="Why compare a_0 with cH_0?">
                <p>
                    MOND phenomenology notes that a<sub>0</sub> is of the same order as cH<sub>0</sub>. That
                    numerical comparison motivates a possible cosmological continuation:
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    a<sub>0</sub> &sim; c&sup2;&radic;(&Lambda;/3) &sim; cH<sub>0</sub>
                </div>
                <p>
                    Here, 1.03 &times; 10<sup>&minus;10</sup> m/s&sup2; is a selected benchmark value. The collar
                    theorem neither fixes its coefficient nor proves that it and the cosmological scale have a common
                    origin. Those are normalization and dynamics gates for the continuation.
                </p>
            </Explainer>
        </div>
    );
}
