import { Explainer } from '../components/Explainer';

export function GaugeSymmetryPage() {
    return (
        <div>
            <div className="section-header">
                <span className="section-tag qft">Chain 2: QFT</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gauge Symmetry from Patch Gluing</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                In OPH, gauge symmetry arises from the redundancy of describing the same physical data on
                overlapping patches. Gauge transformations are the "coordinate changes" that relate different patch
                descriptions of the same overlap region.
            </p>
            <p style={{ marginBottom: '24px' }}>
                One common strict transport representative is fixed at each stage, and the visible edge blocks
                with trivial loop action under that same choice are tensor-generating seeds, not a finite list
                closed under tensor product. Their replete rigid tensor category may have infinitely many simple objects. On a
                cofinal tail carrying the compact-gauge refinement receipt, the construction reconstructs a compact
                group; the realized sector then enters through declared completions without derived physical selection.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The derivation adds the extended premise package used by the compact-gauge proof:
                admissibility defines the candidate class, the transport premise removes the relevant obstruction
                on the branch where global transportability is invoked, and the compact-gauge refinement receipt
                supplies finite-state extendability, center-compatible block-multiplicity embeddings, coherent
                surjective group pullbacks that intertwine the common stagewise representatives, finite tensor
                realizations, and compatible forgetful fibers. The three-generation, one-Higgs, and
                no-extra-light-sector statements enter as declared completions without derived physical selection.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Gauge-as-Gluing Route</h3>
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
                transformation</strong>. On the receipt-certified transport and tensor branch, the compatible
                transformations reconstruct the compact gauge group.
            </p>
            <p style={{ marginBottom: '16px' }}>
                This is exactly analogous to how coordinate transformations arise in differential geometry: each
                chart (patch) has its own coordinates, and the transition functions on overlaps form the structure
                group. In OPH, the "coordinates" are algebraic (operator orderings, basis choices), and the
                transition functions motivate the gauge reconstruction problem; they do not select the physical
                global group without the transport, refinement, and matter attachments.
            </p>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Edge Sectors and Compact Groups</h3>
            <p style={{ marginBottom: '16px' }}>
                At the boundary &part;P of a patch, the algebra has <strong>edge modes</strong>, degrees of
                freedom that live on the boundary and carry information about how the patch connects to its
                complement. These edge modes transform under representations of the gauge group.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The visible edge carriers retained under one common stagewise strict representative generate a
                rigid tensor category. On the receipt-certified refinement
                tail, its tensor rules and faithful forgetful fiber determine the reconstructed gauge group.
                A theorem from abstract algebra (Tannaka-Krein reconstruction) says:
            </p>
            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-blue)' }}>
                    Tannaka-Krein Reconstruction
                </h4>
                <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>
                    Given a rigid symmetric C*-tensor category with simple unit and a faithful finite-dimensional
                    symmetric fiber functor F, the unitary symmetric monoidal natural automorphisms
                    Aut<sub>&otimes;</sub>(F) form a compact group G. The category may have infinitely many simple
                    objects; it is not assumed to be a finite fusion category.
                </p>
                <div className="math-block" style={{ fontSize: '0.85em', margin: '8px 0 0' }}>
                    Receipt-certified tensor category + forgetful fiber &rArr; Compact gauge group G
                </div>
            </div>
            <p style={{ marginBottom: '16px' }}>
                Compactness follows from reconstruction on the receipt-certified tensor/fiber package, not from a
                finite fusion table or from a finite-state coarse-graining map alone.
            </p>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-cyan)' }}>
                <h4 style={{ margin: '0 0 8px', fontSize: '0.9em', color: 'var(--accent-cyan)' }}>Invariant-form completion</h4>
                <p style={{ margin: 0, fontSize: '0.84em' }}>
                    The committed gauge kinetic functional extends exactly beyond its diagonal axis slice to a
                    weighted invariant-form carrier. Exact infinitesimal invariance pins the declared one-ray mirror
                    family and a control weight breaks it. This is finite structural algebra: no gauge-group action on
                    the carrier, source-produced spacetime action, or laboratory current is claimed.
                </p>
            </div>

            <div className="card" style={{ marginBottom: '24px', borderLeft: '3px solid var(--accent-green)' }}>
                <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9em', color: 'var(--accent-green)' }}>
                    U(1) cutoff acceptance test
                </h4>
                <p style={{ margin: 0, fontSize: '0.85em' }}>
                    If charge one is visible and retained under the common stagewise representative, rigid tensor
                    closure contains every integer charge. Charge two
                    lives in End(W<sub>1</sub>&otimes;W<sub>1</sub>), represented by a finite two-collar realization;
                    its projector need not belong to the original one-collar center. At the next refinement,
                    surjective group pullback preserves its one-dimensional carrier and the compatible forgetful
                    fiber is C, with the identity comparison map.
                </p>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Why Product Groups?</h3>
            <p style={{ marginBottom: '16px' }}>
                The twelve-port module splits as 1&oplus;3&oplus;3&prime;&oplus;5.
                The first axiom supplies a faithful compact commutator-closed response on this module,
                and the second makes every proper carrier symmetry endogenous to that response.
                Compact Lie classification forces the abstract type
                u(1)&oplus;su(2)&oplus;su(3). The charged-double-triplet matrices give one exact
                declared witness. Reconstructing the complete response map and bracket from source
                histories is not derived.
            </p>

            <div className="card" style={{ marginBottom: '24px' }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9em', color: 'var(--accent-gold)' }}>
                    Finite Standard Model Lie-Type Theorem
                </h4>
                <div className="math-block" style={{ margin: '0 0 10px', fontSize: '0.95em' }}>
                    P<sub>12</sub> &cong; 1&oplus;3&oplus;3&prime;&oplus;5,
                    complete compact response + endogenous A<sub>5</sub> transport
                    &rArr; u(1)&oplus;su(2)&oplus;su(3)
                </div>
                <p style={{ margin: 0, fontSize: '0.85em', color: 'var(--text-secondary)' }}>
                    Target-blind readback derives R = -J. It does not reconstruct the complete current map. On the
                    declared fifteen-state matter fixture, anomaly balance gives the hypercharges and a
                    common six-element kernel. The global quotient additionally requires a complete
                    matter character lattice and a same-source loop-to-kernel identification.
                </p>
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>Gauge Bosons as Connection Fields</h3>
            <p style={{ marginBottom: '16px' }}>
                On the physical current-and-connection branch, A<sub>&mu;</sub> enables
                parallel transport between patches. Its components carry the photon, W&plusmn;, Z, and gluon labels.
                A quantum-particle realization requires a separate pole and state-space construction.
            </p>
            <p style={{ marginBottom: '16px' }}>
                On the declared Maxwell/Yang-Mills action branch, photon and gluon carrier masses are
                <strong>symmetry-protected</strong>. The W/Z chart uses the ordinary Higgs mechanism but does not
                supply physical pole masses or derive that mechanism from the finite screen alone.
            </p>

            <Explainer title="Analogy with fiber bundles">
                <p>
                    In differential geometry, a gauge theory is described by a principal G-bundle over spacetime.
                    The base manifold is spacetime, the fibers are copies of G, and the connection tells you how
                    to parallel transport along the fibers.
                </p>
                <p>
                    In OPH, the "base manifold" is the screen S&sup2; with its patch cover. The "fibers" are the
                    edge-mode Hilbert spaces at patch boundaries. The gauge connection is modeled by the transition
                    map between overlapping patches. The declared route supplies the corresponding reconstruction
                    structure under explicit transport and refinement premises; a physical spacetime bundle and
                    current attachment are separate inputs.
                </p>
            </Explainer>

            <Explainer title="Why This Gauge Group">
                <p>
                    The finite screen result and the realized matter result have distinct premises:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Finite coefficient layer:</strong> unit splitting, icosahedral selector, explicit A<sub>5</sub>-equivariant bracket, and trace balance.</li>
                    <li><strong>Physical layer:</strong> full-rank compact skew-adjoint inner-current realization, spin lift, determinant balance, and refinement-natural loop descent.</li>
                    <li><strong>Matter layer:</strong> anomaly-free one-Higgs admissibility plus the tensor kernel and the declared sector completions.</li>
                </ul>
                <p>
                    Inside the declared matter fixture the result has N<sub>c</sub>=3 and a common Z<sub>6</sub>
                    kernel. Promoting that kernel to the physical global quotient requires the complete character
                    lattice and same-source loop attachment; N<sub>g</sub>=3 is a declared completion inside the
                    proved 3-to-5 window. Screen topology alone supplies neither the physical current lift nor those
                    matter completions.
                </p>
            </Explainer>

            <Explainer title="Global vs. local symmetry">
                <p>
                    OPH constructs gauge symmetry from patch-dependent overlap maps. This local construction does
                    not by itself prove that every effective global symmetry is approximate; that statement requires
                    its own sector and refinement theorem.
                </p>
            </Explainer>
        </div>
    );
}
