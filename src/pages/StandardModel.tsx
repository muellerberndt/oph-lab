import { Explainer } from '../components/Explainer';

export function StandardModelPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>The Standard Model</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                The Standard Model of particle physics describes all known fundamental particles and three of
                the four forces. It has been confirmed to extraordinary precision. But it has ~25 free parameters
                (masses, couplings, mixing angles) that are simply measured, not explained. In OPH, the Standard
                Model is <strong>derived from edge-sector dynamics</strong>, and many of its "free" parameters
                are fixed by consistency.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Heat-Kernel Edge-Sector Law</h3>
            <p style={{ marginBottom: '8px' }}>
                The probability for an edge sector to carry representation R of the gauge group is given by
                the heat-kernel formula:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                p<sub>R</sub> = d<sub>R</sub> &middot; exp(&minus;t &middot; C<sub>2</sub>(R)) / Z
            </div>
            <p style={{ marginBottom: '16px' }}>
                where d<sub>R</sub> is the dimension of representation R, C<sub>2</sub>(R) is its quadratic
                Casimir, t is the "diffusion time" parameter (related to the collar width in Axiom F), and Z
                is the partition function &sum;<sub>R</sub> d<sub>R</sub> exp(&minus;t &middot; C<sub>2</sub>(R)).
            </p>
            <p style={{ marginBottom: '16px' }}>
                This formula is not arbitrary. It is the unique solution to the heat equation on the group
                manifold, which arises from the Euclidean regularity assumption (Assumption G). The heat
                kernel is the most democratic (MaxEnt) distribution over representations, weighted by their
                dimension and Casimir.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Anomaly Cancellation</h3>
            <p style={{ marginBottom: '16px' }}>
                A gauge theory is consistent only if its gauge anomalies cancel. Anomalies are quantum effects
                that would break gauge invariance at the loop level. The anomaly cancellation conditions are:
            </p>
            <div className="card" style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85em', lineHeight: '2' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, minWidth: '120px' }}>SU(3)&sup3;:</span>
                        <span style={{ color: 'var(--text-secondary)' }}>Automatic for vector-like representations</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, minWidth: '120px' }}>SU(2)&sup2;U(1):</span>
                        <span style={{ color: 'var(--text-secondary)' }}>&sum; Y &middot; T(R) = 0 &mdash; fixes hypercharge ratios</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, minWidth: '120px' }}>U(1)&sup3;:</span>
                        <span style={{ color: 'var(--text-secondary)' }}>&sum; Y&sup3; = 0 &mdash; fixes quark vs lepton hypercharges</span>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'baseline' }}>
                        <span style={{ color: 'var(--accent-cyan)', fontWeight: 600, minWidth: '120px' }}>Gravitational:</span>
                        <span style={{ color: 'var(--text-secondary)' }}>&sum; Y = 0 &mdash; mixed gravity-gauge anomaly</span>
                    </div>
                </div>
            </div>
            <p style={{ marginBottom: '16px' }}>
                These conditions fix the hypercharge assignments of quarks and leptons. The famous "quantization
                of hypercharge" (why Y<sub>Q</sub> = 1/6, Y<sub>u</sub> = 2/3, Y<sub>d</sub> = &minus;1/3,
                Y<sub>L</sub> = &minus;1/2, Y<sub>e</sub> = &minus;1) is not put in by hand but follows from
                anomaly cancellation.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>N<sub>c</sub> = 3: Why Three Colors?</h3>
            <p style={{ marginBottom: '16px' }}>
                In OPH, the number of colors N<sub>c</sub> = 3 is determined by two constraints:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li><strong>Asymptotic freedom:</strong> The QCD beta function b<sub>0</sub> = 11N<sub>c</sub>/3 &minus; 2N<sub>f</sub>/3 must be positive. For N<sub>g</sub> = 3 generations (N<sub>f</sub> = 6), this requires N<sub>c</sub> &ge; 2.</li>
                <li><strong>Anomaly cancellation:</strong> With the SM matter content, anomaly freedom requires integer hypercharges (in units of 1/6), which constrains N<sub>c</sub> to be a multiple of 3. The smallest value is N<sub>c</sub> = 3.</li>
            </ul>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>N<sub>g</sub> = 3: Why Three Generations?</h3>
            <p style={{ marginBottom: '16px' }}>
                The Standard Model has three "generations" or "families" of fermions: (u,d,e,&nu;<sub>e</sub>),
                (c,s,&mu;,&nu;<sub>&mu;</sub>), (t,b,&tau;,&nu;<sub>&tau;</sub>). Why three and not one or five?
            </p>
            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    OPH Derivation of N<sub>g</sub> = 3
                </h4>
                <div style={{ fontSize: '0.85em', lineHeight: '1.8' }}>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Lower bound:</strong> CP violation in the CKM matrix requires N<sub>g</sub> &ge; 3
                        (Jarlskog, 1985). With 2 generations, the CKM matrix is real and cannot violate CP.
                    </p>
                    <p style={{ margin: '0 0 8px 0' }}>
                        <strong>Upper bound:</strong> Asymptotic freedom of QCD requires N<sub>f</sub> &le; 16
                        (for N<sub>c</sub> = 3), i.e., N<sub>g</sub> &le; 5. But additional constraints from
                        electroweak vacuum stability tighten this to N<sub>g</sub> &le; 4.
                    </p>
                    <p style={{ margin: 0 }}>
                        <strong>Selection:</strong> Minimality (smallest N<sub>g</sub> compatible with CP violation)
                        selects N<sub>g</sub> = 3.
                    </p>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Particle Spectrum</h3>
            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8em' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ padding: '8px', textAlign: 'left', color: 'var(--accent-gold)' }}>Particle</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>SU(3)</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>SU(2)</th>
                            <th style={{ padding: '8px', textAlign: 'center', color: 'var(--accent-gold)' }}>U(1)<sub>Y</sub></th>
                            <th style={{ padding: '8px', textAlign: 'left', color: 'var(--accent-gold)' }}>OPH Origin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[
                            ['Q_L', '3', '2', '1/6', 'Triple-overlap edge sector'],
                            ['u_R', '3', '1', '2/3', 'Anomaly-fixed hypercharge'],
                            ['d_R', '3', '1', '-1/3', 'Anomaly-fixed hypercharge'],
                            ['L_L', '1', '2', '-1/2', 'Double-overlap edge sector'],
                            ['e_R', '1', '1', '-1', 'Gravitational anomaly cancellation'],
                            ['H', '1', '2', '1/2', 'Screen-sector scalar (criticality)'],
                            ['g', '8', '1', '0', 'SU(3) connection field'],
                            ['W', '1', '3', '0', 'SU(2) connection field'],
                            ['B', '1', '1', '0', 'U(1) connection field'],
                        ].map(([particle, su3, su2, u1, origin], i) => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '8px', color: 'var(--accent-cyan)' }}>{particle}</td>
                                <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{su3}</td>
                                <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{su2}</td>
                                <td style={{ padding: '8px', textAlign: 'center', color: 'var(--text-secondary)' }}>{u1}</td>
                                <td style={{ padding: '8px', color: 'var(--text-muted)', fontSize: '0.9em' }}>{origin}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Explainer title="Massless photon and graviton">
                <p>
                    The photon (gauge boson of U(1)<sub>EM</sub>) and the graviton are exactly massless. In the
                    Standard Model, this is protected by gauge symmetry: a mass term would violate gauge invariance.
                </p>
                <p>
                    In OPH, gauge symmetry emerges from patch gluing (Assumption D), so masslessness is a
                    consequence of the patch structure. These are "symmetry-protected zeros" &mdash; no fine-tuning
                    needed.
                </p>
            </Explainer>

            <Explainer title="The strong CP problem">
                <p>
                    QCD allows a CP-violating &theta; term: &theta; &middot; g&sup2; &middot; F &middot; F&#771; / (32&pi;&sup2;).
                    Experiments constrain |&theta;| &lt; 10<sup>&minus;10</sup>. Why is &theta; so small?
                </p>
                <p>
                    In OPH, the heat-kernel edge-sector law naturally produces &theta; = 0 at the MaxEnt point.
                    The CP-violating parameter is driven to zero by the Euclidean regularity condition (Assumption G),
                    which selects the symmetric point of the group manifold. No axion needed.
                </p>
            </Explainer>

            <Explainer title="Proton stability">
                <p>
                    Grand Unified Theories predict proton decay with lifetime &tau;<sub>p</sub> &sim; 10<sup>34</sup>
                    years. Current experiments (Super-Kamiokande) have pushed the bound to &tau;<sub>p</sub> &gt;
                    10<sup>34</sup> years with no signal.
                </p>
                <p>
                    In OPH, the gauge group is SU(3) &times; SU(2) &times; U(1) from the start &mdash; not a broken
                    remnant of SU(5) or SO(10). There are no leptoquark gauge bosons, no baryon-number-violating
                    vertices, and therefore <strong>no proton decay</strong> at any rate. This is a distinctive
                    prediction of OPH versus GUTs.
                </p>
            </Explainer>
        </div>
    );
}
