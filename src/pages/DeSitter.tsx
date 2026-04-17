import { Explainer } from '../components/Explainer';
import {
    PIXEL_REFERENCE,
    deSitterRadiusFromLambda,
    gibbonsHawkingTemperatureFromHubble,
    hubbleFromLambda,
    lambdaFromScreen,
} from '../core/ophMath';
import { useLabSetting, useLabState } from '../state/labState';

export function DeSitterPage() {
    const [logDimH, setLogDimH] = useLabSetting('deSitter.logDimH');
    const { resetKeys } = useLabState();

    const lambda = lambdaFromScreen(PIXEL_REFERENCE, logDimH);
    const H = hubbleFromLambda(lambda);
    const TdS = gibbonsHawkingTemperatureFromHubble(H);
    const rH = deSitterRadiusFromLambda(lambda);
    const SBH = Math.pow(10, logDimH);

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>De Sitter Space</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                Our universe is accelerating in its expansion, approaching a de Sitter phase. In de Sitter space,
                every observer is surrounded by a <strong>cosmological horizon</strong>, a sphere beyond which
                events can never reach them. This horizon has thermodynamic properties, just like a black hole horizon.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, the de Sitter horizon IS the holographic screen. The cosmological constant &Lambda; measures
                the screen's <strong>finite information capacity</strong>.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Gibbons-Hawking Temperature</h3>
            <p style={{ marginBottom: '8px' }}>
                Gibbons and Hawking showed that de Sitter space has a thermal character. An observer at rest in
                de Sitter space detects thermal radiation at a temperature set by the Hubble parameter H:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                T<sub>dS</sub> = ℏH / (2&pi;k<sub>B</sub>)
            </div>
            <p style={{ marginBottom: '16px' }}>
                This is the de Sitter analog of the Unruh temperature: the cosmological horizon acts like a Rindler
                horizon with acceleration a = Hc. Every static observer in de Sitter space is bathed in a thermal
                bath at temperature T<sub>dS</sub>.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>&Lambda; from Screen Capacity</h3>
            <p style={{ marginBottom: '8px' }}>
                In OPH, the cosmological constant is fixed by the total screen capacity after the local gravity
                branch leaves the separate metric ambiguity. In the lab we hold the reference pixel
                normalization fixed at P = {PIXEL_REFERENCE.toFixed(5)} and scan the global capacity descendant:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                &Lambda;(N<sub>scr</sub>) &prop; N<sub>scr</sub><sup>&minus;1</sup>
            </div>
            <p style={{ marginBottom: '16px' }}>
                With log dim H<sub>tot</sub> &asymp; 10<sup>122</sup> (in natural units), this gives the observed
                value of &Lambda; &asymp; 10<sup>&minus;52</sup> m<sup>&minus;2</sup>. The screen capacity is a
                single large number that sets the scale of the cosmological constant.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Why This Solves the Cosmological Constant Problem</h3>
            <p style={{ marginBottom: '16px' }}>
                The standard cosmological constant problem: QFT predicts a vacuum energy density &rho;<sub>vac</sub> &sim;
                M<sub>P</sub><sup>4</sup> &sim; 10<sup>76</sup> GeV<sup>4</sup>, but the observed value is
                &rho;<sub>&Lambda;</sub> &sim; 10<sup>&minus;47</sup> GeV<sup>4</sup>. A discrepancy of 10<sup>123</sup>.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, this comparison is meaningless. Vacuum energy is "null-blind": the vacuum stress-energy
                tensor satisfies T<sub>kk</sub> = T<sub>ab</sub>k<sup>a</sup>k<sup>b</sup> = 0 for null vectors k.
                Since gravity is derived from null surface thermodynamics (&delta;Q = TdS on null horizons), vacuum
                energy does not contribute to the gravitational equations at all. &Lambda; comes from screen capacity,
                not from vacuum fluctuations. The 120-order discrepancy was comparing apples and oranges.
            </p>

            <div className="demo-container">
                <div className="demo-label">Calculator: De Sitter Parameters from Screen Capacity</div>
                <p style={{ fontSize: '0.85em', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Adjust the screen capacity log<sub>10</sub>(dim H<sub>tot</sub>) and see how the cosmological
                    parameters change.
                </p>

                <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '8px' }}>
                        <button
                            className="btn btn-ghost"
                            style={{ fontSize: '0.72em', padding: '4px 10px' }}
                            onClick={() => resetKeys(['deSitter.logDimH'])}
                        >
                            Reset to Observed 10^122
                        </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85em', marginBottom: '4px' }}>
                        <span style={{ color: 'var(--accent-gold)' }}>log<sub>10</sub>(dim H<sub>tot</sub>)</span>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 700 }}>10<sup>{logDimH}</sup></span>
                    </div>
                    <input
                        type="range"
                        min="100"
                        max="140"
                        step="1"
                        value={logDimH}
                        onChange={e => setLogDimH(parseInt(e.target.value))}
                        style={{ width: '100%' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7em', color: 'var(--text-muted)' }}>
                        <span>10<sup>100</sup></span>
                        <span>10<sup>122</sup> (observed)</span>
                        <span>10<sup>140</sup></span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Cosmological Constant &Lambda;
                        </div>
                        <div style={{ fontSize: '1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {lambda.toExponential(2)} m<sup>&minus;2</sup>
                        </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Hubble Parameter H
                        </div>
                        <div style={{ fontSize: '1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {H.toExponential(2)} s<sup>&minus;1</sup>
                        </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            de Sitter Temperature
                        </div>
                        <div style={{ fontSize: '1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {TdS.toExponential(2)} K
                        </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Horizon Radius
                        </div>
                        <div style={{ fontSize: '1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {rH.toExponential(2)} m
                        </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Horizon Entropy S<sub>BH</sub>
                        </div>
                        <div style={{ fontSize: '1em', color: 'var(--accent-cyan)', fontWeight: 700 }}>
                            {SBH.toExponential(2)}
                        </div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '0.7em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            Match to Observed?
                        </div>
                        <div style={{ fontSize: '1em', color: Math.abs(logDimH - 122) <= 2 ? 'var(--accent-green)' : 'var(--accent-rose)', fontWeight: 700 }}>
                            {Math.abs(logDimH - 122) <= 2 ? 'YES' : 'NO'}
                        </div>
                    </div>
                </div>
            </div>

            <Explainer title="De Sitter entropy and the total bit count">
                <p>
                    The de Sitter horizon entropy S<sub>dS</sub> = A<sub>H</sub>/(4l<sub>P</sub>&sup2;) &asymp;
                    10<sup>122</sup> is the total number of bits available to a single observer. This is the same
                    number as log(dim H<sub>tot</sub>). The screen capacity IS the horizon entropy.
                </p>
                <p>
                    This gives an entirely different perspective on the "largeness" of the universe. The universe
                    is large because the screen has &sim;10<sup>122</sup> Planck-area pixels. This is one large
                    number that sets the scale.
                </p>
            </Explainer>

            <Explainer title="Static patch and observer complementarity">
                <p>
                    In de Sitter space, each observer has access to only one <strong>static patch</strong>: the
                    causal diamond bounded by their past and future cosmological horizons. Different observers
                    have different static patches that may or may not overlap.
                </p>
                <p>
                    This is exactly the OPH picture: each observer has a patch of the screen (Axiom A1), and
                    overlap consistency (Axiom A2) constrains the shared descriptions. De Sitter observer
                    complementarity is a concrete realization of the OPH axioms.
                </p>
            </Explainer>

            <Explainer title="Late-time de Sitter and the heat death">
                <p>
                    If &Lambda; &gt; 0, the universe approaches de Sitter space at late times. The thermal state
                    at temperature T<sub>dS</sub> &asymp; 10<sup>&minus;30</sup> K is the maximum-entropy state
                    consistent with the horizon area, the "heat death" of the universe.
                </p>
                <p>
                    In OPH, this is the MaxEnt state on the A3 branch of the screen theory. The universe evolves
                    toward the most typical state. The arrow of time is framed as evolution from a low-entropy
                    initial state toward that MaxEnt branch.
                </p>
            </Explainer>
        </div>
    );
}
