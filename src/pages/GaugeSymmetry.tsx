import { Explainer } from '../components/Explainer';

export function GaugeSymmetryPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gauge Symmetry from Patch Gluing</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                In the Standard Model, gauge symmetries (U(1), SU(2), SU(3)) are postulated: you declare
                that the Lagrangian must be invariant under local phase transformations, and force-carrying
                bosons appear as "connection" fields. But <em>why</em> these particular gauge groups? Why gauge
                symmetry at all?
            </p>
            <p style={{ marginBottom: '24px' }}>
                In OPH, gauge symmetry is <strong>not postulated but derived</strong>. It arises from the redundancy
                of describing the same physical data on overlapping patches. Gauge transformations are the
                "coordinate changes" that relate different patch descriptions of the same overlap region.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The latest derivation then adds the extended axiom package
                <strong> R0 + R1 + [z]=0 + MAR</strong>: admissibility defines the candidate class, and MAR chooses
                the lexicographically minimal admissible sector.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Gauge-as-Gluing (Assumption D)</h3>
            <p style={{ marginBottom: '16px' }}>
                Consider two patches P<sub>1</sub> and P<sub>2</sub> with overlap P<sub>1</sub> &cap; P<sub>2</sub>.
                Each patch has its own algebra A(P<sub>i</sub>) and its own state &rho;<sub>i</sub>. Overlap
                consistency (Axiom A2) requires:
            </p>
            <div className="math-block">
                &rho;<sub>1</sub>|<sub>A(P<sub>1</sub> &cap; P<sub>2</sub>)</sub> = &rho;<sub>2</sub>|<sub>A(P<sub>1</sub> &cap; P<sub>2</sub>)</sub>
            </div>
            <p style={{ marginBottom: '16px' }}>
                But the algebras A(P<sub>1</sub>) and A(P<sub>2</sub>) may describe the same observables in
                different "frames." The transformation relating these frames on the overlap is a <strong>gauge
                transformation</strong>. The group of all such transformations is the gauge group.
            </p>
            <p style={{ marginBottom: '16px' }}>
                This is exactly analogous to how coordinate transformations arise in differential geometry: each
                chart (patch) has its own coordinates, and the transition functions on overlaps form the structure
                group. In OPH, the "coordinates" are algebraic (operator orderings, basis choices), and the
                transition functions form gauge groups.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Edge Sectors and Compact Groups</h3>
            <p style={{ marginBottom: '16px' }}>
                At the boundary &part;P of a patch, the algebra has <strong>edge modes</strong> &mdash; degrees of
                freedom that live on the boundary and carry information about how the patch connects to its
                complement. These edge modes transform under representations of the gauge group.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The <strong>fusion rules</strong> of these edge-sector representations determine the gauge group.
                A theorem from abstract algebra (Tannaka-Krein reconstruction) says:
            </p>
            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    Tannaka-Krein Reconstruction
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    Given a collection of representations with tensor product, direct sum, and duality operations
                    (a "fusion category"), there exists a unique compact group G such that these representations
                    are exactly Rep(G).
                </p>
                <div className="math-block" style={{ fontSize: '0.85em', margin: '8px 0 0' }}>
                    Edge-sector fusion rules &rArr; Compact gauge group G
                </div>
            </div>
            <p style={{ marginBottom: '16px' }}>
                This is why gauge groups are compact (not non-compact like the Lorentz group): edge-sector
                fusion rules satisfy the axioms of a compact group representation category. The compactness
                is not assumed; it is derived.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Why Product Groups?</h3>
            <p style={{ marginBottom: '16px' }}>
                Grand Unified Theories (GUTs) assume the Standard Model gauge group SU(3) &times; SU(2) &times; U(1)
                is the remnant of a simple group (like SU(5) or SO(10)) that was broken at high energy. This predicts
                proton decay, which has never been observed.
            </p>
            <p style={{ marginBottom: '16px' }}>
                In OPH, the gauge group is a <strong>product group from the start</strong>. Different types of
                edge modes (corresponding to different boundary structures) give rise to independent gauge factors.
                There is no GUT, no proton decay, and no need for symmetry breaking from a simple group.
            </p>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Standard Model Gauge Group from Edge Sectors
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', fontSize: '0.85em' }}>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-rose)', fontWeight: 600, marginBottom: '8px' }}>Color</div>
                        <div className="math-block" style={{ margin: 0, fontSize: '1.1em' }}>SU(3)</div>
                        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.85em' }}>
                            From triple-overlap edge modes. N<sub>c</sub> = 3 from anomaly cancellation.
                        </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-blue)', fontWeight: 600, marginBottom: '8px' }}>Weak</div>
                        <div className="math-block" style={{ margin: 0, fontSize: '1.1em' }}>SU(2)</div>
                        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.85em' }}>
                            From double-overlap edge modes. The simplest non-abelian factor.
                        </p>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-color)', textAlign: 'center' }}>
                        <div style={{ color: 'var(--accent-green)', fontWeight: 600, marginBottom: '8px' }}>Hypercharge</div>
                        <div className="math-block" style={{ margin: 0, fontSize: '1.1em' }}>U(1)</div>
                        <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.85em' }}>
                            From global phase redundancy on overlaps. Hypercharges fixed by anomaly cancellation.
                        </p>
                    </div>
                </div>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Gauge Bosons as Connection Fields</h3>
            <p style={{ marginBottom: '16px' }}>
                Once the gauge group G is determined, the connection (gauge field) A<sub>&mu;</sub> is the object
                that enables parallel transport between patches. The gauge bosons (photon, W&plusmn;, Z, gluons)
                are the quanta of these connection fields.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The masslessness of the photon and gluons is <strong>symmetry-protected</strong>: a mass term
                would break gauge invariance. The W and Z bosons acquire mass through electroweak symmetry breaking
                (Higgs mechanism), which in OPH arises from the screen-sector dynamics.
            </p>

            <Explainer title="Analogy with fiber bundles">
                <p>
                    In differential geometry, a gauge theory is described by a principal G-bundle over spacetime.
                    The base manifold is spacetime, the fibers are copies of G, and the connection tells you how
                    to parallel transport along the fibers.
                </p>
                <p>
                    In OPH, the "base manifold" is the screen S&sup2; with its patch cover. The "fibers" are the
                    edge-mode Hilbert spaces at patch boundaries. The gauge connection is the transition map
                    between overlapping patches. The entire fiber bundle structure emerges from the patch
                    overlap conditions (Axioms A1-A2 + Assumption D).
                </p>
            </Explainer>

            <Explainer title="Why not other gauge groups?">
                <p>
                    Why SU(3) &times; SU(2) &times; U(1) and not, say, SU(5) or E<sub>8</sub>? In OPH, the
                    answer comes from admissibility plus MAR:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Admissibility:</strong> anomaly-free, chiral-stable, single-Higgs-completable, CP-capable, weak UV-completable, and loop-coherent ([z]=0).</li>
                    <li><strong>Complexity vector:</strong> C(&Sigma;) = (&chi;<sub>faith</sub>, N<sub>nonab</sub>, N<sub>c</sub>, N<sub>g</sub>).</li>
                    <li><strong>MAR:</strong> lexicographically minimize C over admissible sectors only (not over all groups).</li>
                </ul>
                <p>
                    This singles out [SU(3)&times;SU(2)&times;U(1)]/Z<sub>6</sub> with N<sub>c</sub>=3, N<sub>g</sub>=3.
                    The Standard Model gauge structure is not arbitrary; it is the unique MAR-selected admissible solution.
                    Equivalently, MAR acts as <strong>Nature's Occam's razor</strong> after admissibility.
                </p>
            </Explainer>

            <Explainer title="Global vs. local symmetry">
                <p>
                    In OPH, <strong>all</strong> gauge symmetries are local (patch-dependent). There are no
                    fundamental global symmetries. This has a deep consequence: global symmetries in physics
                    (like baryon number or lepton number) are approximate, not exact. They arise from the
                    low-energy limit where the patch structure looks like a smooth manifold.
                </p>
                <p>
                    The absence of exact global symmetries is also a prediction of quantum gravity (the "no global
                    symmetries" conjecture). In OPH, this follows directly from the patch structure: a global
                    symmetry would have to act identically on all patches, but patches have only local overlap
                    relations, not global ones.
                </p>
            </Explainer>
        </div>
    );
}
