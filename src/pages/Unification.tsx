import { Explainer } from '../components/Explainer';

export function UnificationPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Coupling Unification</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                In the Standard Model, the three gauge couplings (g<sub>1</sub>, g<sub>2</sub>, g<sub>3</sub>)
                run with energy due to quantum loop corrections. A tantalizing observation: if you extrapolate
                the couplings to high energy, they <em>almost</em> meet at a single point around 10<sup>16</sup> GeV.
                They don't quite meet in the Standard Model alone, but they do in the MSSM (Minimal Supersymmetric
                Standard Model).
            </p>
            <p style={{ marginBottom: '24px' }}>
                OPH achieves the same unification <strong>without superpartner particles</strong>. The edge modes
                at patch boundaries produce the exact same beta-function shifts as MSSM superpartners. Same math,
                no new particles.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Beta Functions and Running Couplings</h3>
            <p style={{ marginBottom: '8px' }}>
                The one-loop renormalization group equation for each gauge coupling &alpha;<sub>i</sub> = g<sub>i</sub>&sup2;/(4&pi;) is:
            </p>
            <div className="math-block">
                &alpha;<sub>i</sub><sup>&minus;1</sup>(&mu;) = &alpha;<sub>i</sub><sup>&minus;1</sup>(M<sub>Z</sub>) &minus; (b<sub>i</sub> / 2&pi;) &middot; ln(&mu; / M<sub>Z</sub>)
            </div>
            <p style={{ marginBottom: '8px' }}>
                where the b<sub>i</sub> coefficients determine how fast each coupling runs:
            </p>
            <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.85em', textAlign: 'center' }}>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '4px' }}>U(1)<sub>Y</sub></div>
                        <div style={{ color: 'var(--text-secondary)' }}>b<sub>1</sub> = 41/10</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>(grows stronger)</div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '4px' }}>SU(2)<sub>L</sub></div>
                        <div style={{ color: 'var(--text-secondary)' }}>b<sub>2</sub> = &minus;19/6</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>(grows weaker)</div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)' }}>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '4px' }}>SU(3)<sub>c</sub></div>
                        <div style={{ color: 'var(--text-secondary)' }}>b<sub>3</sub> = &minus;7</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>(asymptotic freedom)</div>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>MSSM-Like Beta Shifts Without Superpartners</h3>
            <p style={{ marginBottom: '8px' }}>
                In the MSSM, each Standard Model particle has a superpartner that shifts the beta coefficients.
                The MSSM shifts are:
            </p>
            <div className="math-block">
                &Delta;b &asymp; (2.49, 4.38, 3.97)
            </div>
            <p style={{ marginBottom: '16px' }}>
                (for U(1), SU(2), SU(3) respectively). These shifts bring the three couplings to exact unification
                at M<sub>GUT</sub> &asymp; 2 &times; 10<sup>16</sup> GeV.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, these same shifts arise from <strong>edge modes at patch boundaries</strong>. The
                edge-sector Hilbert space at each boundary contributes to the running of the couplings in
                exactly the same way as MSSM superpartners. The mechanism is the Peter-Weyl second-index
                decomposition of the edge-mode partition function.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Peter-Weyl Mechanism</h3>
            <p style={{ marginBottom: '16px' }}>
                The Peter-Weyl theorem decomposes the L&sup2; space on a compact group G into irreducible
                representations:
            </p>
            <div className="math-block" style={{ fontSize: '0.9em' }}>
                L&sup2;(G) = ⨁<sub>R</sub> V<sub>R</sub> &otimes; V<sub>R</sub>*
            </div>
            <p style={{ marginBottom: '16px' }}>
                Each representation R appears with multiplicity d<sub>R</sub> (the dimension of R). The
                <strong> first index</strong> transforms under gauge transformations (and contributes to the
                standard beta function). The <strong>second index</strong> is an internal degree of freedom
                of the edge mode.
            </p>
            <p style={{ marginBottom: '16px' }}>
                When you integrate over the edge modes (as required by the path integral at patch boundaries),
                the second index contributes additional running. This contribution has exactly the same
                mathematical structure as a superpartner's loop contribution. The result: MSSM-like beta
                shifts without MSSM particles.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    Comparison: MSSM vs. OPH
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '0.85em' }}>
                    <div>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '8px' }}>
                            MSSM Approach
                        </div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>Postulate superpartner for each SM particle</li>
                            <li>Superpartner loops shift beta functions</li>
                            <li>Couplings unify at 10<sup>16</sup> GeV</li>
                            <li>Predicts superpartners at TeV scale</li>
                            <li>None found at LHC</li>
                        </ul>
                    </div>
                    <div>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '8px' }}>
                            OPH Approach
                        </div>
                        <ul style={{ paddingLeft: '16px', margin: 0, lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            <li>Edge modes arise from patch boundaries</li>
                            <li>Peter-Weyl second index shifts beta functions</li>
                            <li>Couplings unify at 10<sup>16</sup> GeV</li>
                            <li>Predicts NO superpartners at any scale</li>
                            <li>Consistent with LHC null results</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Unification Without a Simple Group</h3>
            <p style={{ marginBottom: '16px' }}>
                Standard grand unification embeds SU(3) &times; SU(2) &times; U(1) into a simple group
                (SU(5), SO(10), or E<sub>6</sub>) that breaks at M<sub>GUT</sub>. This predicts proton decay
                and magnetic monopoles.
            </p>
            <p style={{ marginBottom: '16px' }}>
                OPH achieves coupling unification in a different way: the couplings converge because the
                edge-mode contributions make all three beta functions flow to a common value, but the gauge
                group remains a <strong>product group</strong> at all scales. There is no simple GUT group,
                no proton decay, and no magnetic monopoles.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The "unification" in OPH is not a unification of gauge groups but a unification of
                <strong> information content</strong>: at the unification scale, each gauge factor saturates
                the same fraction of the screen entropy budget. The couplings converge because the screen
                treats all edge sectors democratically at high enough energy.
            </p>

            <Explainer title="Why the LHC found no superpartners">
                <p>
                    The LHC has searched for superpartners up to several TeV with null results. In the MSSM,
                    naturalness arguments suggested superpartners should appear near the electroweak scale
                    (&sim;1 TeV). Their absence is the "SUSY naturalness crisis."
                </p>
                <p>
                    In OPH, there was never a prediction of superpartners. The beta-function shifts needed for
                    unification come from edge modes, not particles. The LHC null results are a <em>success</em>
                    for OPH, not a puzzle.
                </p>
            </Explainer>

            <Explainer title="The proton decay prediction">
                <p>
                    GUTs predict proton decay via leptoquark gauge bosons (X, Y) with mass &sim;M<sub>GUT</sub>.
                    The predicted lifetime is &tau;<sub>p</sub> &sim; M<sub>GUT</sub><sup>4</sup> / (m<sub>p</sub><sup>5</sup> &alpha;<sub>GUT</sub><sup>2</sup>) &sim; 10<sup>34-36</sup> years.
                </p>
                <p>
                    OPH predicts <strong>no proton decay</strong> at any lifetime. The gauge group is a product
                    group, so there are no leptoquark bosons. This is a clean, falsifiable distinction between
                    OPH and GUTs. If proton decay is ever observed, OPH is falsified.
                </p>
            </Explainer>

            <Explainer title="Two-loop and threshold corrections">
                <p>
                    The one-loop analysis is an approximation. At two loops and beyond, the running becomes more
                    complex. Threshold corrections (from integrating out heavy states at M<sub>GUT</sub>) also
                    modify the picture.
                </p>
                <p>
                    In OPH, the edge-mode contributions are naturally organized by the collar refinement
                    (Assumption F), which provides a systematic expansion in powers of the collar width.
                    The leading term gives the MSSM-like &Delta;b shifts; subleading terms give corrections
                    analogous to two-loop and threshold effects.
                </p>
            </Explainer>
        </div>
    );
}
