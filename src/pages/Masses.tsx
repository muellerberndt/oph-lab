export function MassesPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Matter Continuations</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This page summarizes the current OPH matter-sector status instead of presenting the older withdrawn
                public calculator. The paper surface is split into structural outputs, closed calibration sectors,
                continuation lanes, compare-only adapters, and open theorem objects.
            </p>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-gold)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Closed structural and calibration surfaces</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    The structural core still includes the Standard Model gauge quotient, exact hypercharges,
                    N<sub>c</sub> = 3, N<sub>g</sub> = 3, and symmetry-protected massless photon/graviton zeros.
                </p>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    In the bosonic calibration sector, W/Z are closed on the D10 surface. Higgs/top public rows are
                    carried by a closed one-scalar D11 forward seed, while the exact inverse pair remains compare-only.
                </p>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Open matter-sector lanes</h3>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, color: 'var(--text-secondary)' }}>
                    <li><strong>Quarks:</strong> the present premise set carries a strict no-go for full physical quark closure: it emits neither the D12 scalar value law, nor a sector-attached same-label left-handed lift to the physical CKM shell, nor a target-free physical-sheet readout <code>(g_u, g_d)</code>. The exact next objects are the minimal extension triple <code>H_mass : ell_ud = log(c_d / c_u)</code>, <code>H_phys : s_ud^phys : M_ud^&#123;CR,phys&#125; -&gt; Sigma_ud^phys</code>, and <code>H_abs : A_q^phys : Sigma_ud^phys -&gt; R</code>.</li>
                    <li><strong>Charged leptons:</strong> centered readback is exact, but the theorem lane stays open first at the promotion of Ĉ<sub>e</sub><sup>cand</sup> and then at the affine descent to &mu;<sub>phys</sub>(Y<sub>e</sub>).</li>
                    <li><strong>Neutrinos:</strong> the weighted-cycle theorem pair emits C<sub>&nu;</sub> = sum_gap<sup>2</sup> prod_qbar solar_response_over_mstar<sup>-1/2</sup>, B<sub>&nu;</sub> = P<sub>&nu;</sub>C<sub>&nu;</sub>, and the absolute neutrino family on the declared weighted-cycle branch. The older exact adapter, bridge corridor, and correction audit remain diagnostic-only.</li>
                    <li><strong>Hadrons:</strong> backend- and compute-bound rather than theorem-closed.</li>
                </ul>
            </div>

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Status language used here</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    This lab distinguishes:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, color: 'var(--text-secondary)' }}>
                    <li><strong>Closed:</strong> theorem-grade or calibration-grade public result.</li>
                    <li><strong>Continuation-only:</strong> an internal or same-family sidecar that sharpens the open object without replacing the public theorem frontier.</li>
                    <li><strong>Compare-only:</strong> a fit or diagnostic adapter that is numerically useful but not promoted as the theorem object.</li>
                    <li><strong>Open:</strong> a remaining exact theorem object has not yet been emitted on the current corpus.</li>
                </ul>
            </div>

            <div className="card" style={{ marginBottom: '16px' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>Representative public rows</h3>
                <p style={{ margin: '0 0 10px 0' }}>
                    The current public bosonic rows are:
                </p>
                <div className="math-block" style={{ fontSize: '0.95em' }}>
                    m<sub>W</sub> = 80.37700001539531 GeV,&nbsp;
                    m<sub>Z</sub> = 91.18797807794321 GeV
                </div>
                <div className="math-block" style={{ fontSize: '0.95em' }}>
                    m<sub>H</sub> = 125.218922 GeV,&nbsp;
                    m<sub>t</sub> = 172.388646 GeV
                </div>
                <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                    The W/Z pair is closed on D10. The Higgs/top pair is carried by the forward-seed surface, while the
                    exact inverse pair remains a sidecar validation surface.
                </p>
            </div>
        </div>
    );
}
