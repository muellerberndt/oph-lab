import { Explainer } from '../components/Explainer';
import { useLabSetting, useLabState } from '../state/labState';

type DetailLevel = 'plain' | 'physics' | 'formal';

interface Axiom {
    id: string;
    name: string;
    plain: string;
    physics: string;
    formal: string;
}

const AXIOMS: Axiom[] = [
    {
        id: 'A1',
        name: 'Screen Net / Finite Access',
        plain: 'Every observer sees only a limited patch of a cosmic screen. Different observers see different patches, but overlapping patches share some data.',
        physics: 'Physical reality is encoded on a horizon screen S\u00b2. Each connected subregion P carries a von Neumann algebra A(P) of observables, with isotony: P \u2286 Q implies A(P) \u2286 A(Q).',
        formal: 'A net of von Neumann algebras P \u2192 A(P) on S\u00b2, for connected P \u2286 S\u00b2. An observer is a tuple (P_O, A(P_O), \u03c1_O, R_O): patch, algebra, local state, records.',
    },
    {
        id: 'A2',
        name: 'Overlap Consistency',
        plain: 'Where two observers\' patches overlap, their descriptions must agree. A global "view from nowhere" is absent. Reality IS the mutual consistency of perspectives.',
        physics: 'For overlapping patches P\u2081 \u2229 P\u2082 \u2260 \u2205, the restrictions of local states must agree on shared observables: \u03c1\u2081|_{A(\u2229)} = \u03c1\u2082|_{A(\u2229)}.',
        formal: '\u2200 P\u2081, P\u2082 with P\u2081 \u2229 P\u2082 \u2260 \u2205: \u03c1\u2081|_{A(P\u2081 \u2229 P\u2082)} = \u03c1\u2082|_{A(P\u2081 \u2229 P\u2082)}. No global state is assumed.',
    },
    {
        id: 'A3',
        name: 'Local MaxEnt and Refinement Stability',
        plain: 'At each regulator scale, the realized branch is selected by a finite family of local constraints, and the same branch persists under refinement.',
        physics: 'The realized low-energy states lie in one common finite-dimensional MaxEnt family built from gauge-invariant local constraints of UV range O(l_UV). Refinement preserves that family, so one follows one refinement-stable branch across cutoffs.',
        formal: 'At regulator scale l_UV, the realized branch maximizes entropy subject to a fixed finite family of local constraints C_lUV = {O_a(x)}. Under refinement, the same finite constraint family is preserved, so the realized low-energy branch is the refinement-stable branch of one common finite-dimensional MaxEnt family.',
    },
    {
        id: 'A4',
        name: 'Recoverable Generalized Entropy',
        plain: 'Generalized entropy combines the area term with bulk entropy, and local collar regions admit recoverability control that supports the gravity branch.',
        physics: 'A generalized entropy functional exists, S_gen(C) = Tr(\u03c1 \u00b7 L_C) + S_bulk(C), together with the recoverability/focusing structure used in the collar and null-modular arguments.',
        formal: 'S_gen(C) = Tr(\u03c1 \u00b7 L_C) + S_bulk(C), with the collar structure controlled by recovery theory and conditional-mutual-information bounds on shrinking separators.',
    },
];

export function AxiomsPage() {
    const [levelRaw, setLevel] = useLabSetting('axioms.level');
    const { resetKeys } = useLabState();
    const level = levelRaw as DetailLevel;

    return (
        <div>
            <div className="section-header">
                <span className="section-tag foundation">Foundation</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Core Axioms and MAR Layer</h1>
            </div>

            <p style={{ marginBottom: '24px' }}>
                The extended formulation presents OPH as <strong>five axioms: A1-A4 + MAR</strong>. The paper
                surface also uses theorem-local technical premises T1-T6 when specific Lorentz, Einstein, or gauge
                statements are invoked. MAR is a selection axiom in the foundational ledger. It is distinct from a
                local dynamics equation.
            </p>

            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button
                    className="btn btn-ghost"
                    onClick={() => resetKeys(['axioms.level'])}
                    style={{ fontSize: '0.8em', padding: '6px 14px' }}
                >
                    Reset
                </button>
                {(['plain', 'physics', 'formal'] as const).map(l => (
                    <button
                        key={l}
                        className={`btn ${level === l ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setLevel(l)}
                        style={{ fontSize: '0.8em', padding: '6px 14px' }}
                    >
                        {l === 'plain' ? 'Plain English' : l === 'physics' ? 'Physics' : 'Formal Math'}
                    </button>
                ))}
            </div>

            {AXIOMS.map((ax) => (
                <div key={ax.id} className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-gold)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '36px',
                            height: '36px',
                            background: 'rgba(201, 169, 110, 0.15)',
                            border: '1px solid var(--accent-gold)',
                            fontSize: '0.8em',
                            fontWeight: 700,
                            color: 'var(--accent-gold)',
                        }}>
                            {ax.id}
                        </span>
                        <h3 style={{ margin: 0, fontSize: '1em' }}>{ax.name}</h3>
                    </div>
                    <p style={{ margin: 0, fontSize: '0.9em' }}>
                        {level === 'plain' ? ax.plain : level === 'physics' ? ax.physics : ax.formal}
                    </p>
                </div>
            ))}

            <div className="card" style={{ marginBottom: '16px', borderLeft: '3px solid var(--accent-blue)' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>MAR in Axiom 5</h3>
                <div style={{ fontSize: '0.84em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Gauge-reconstruction surface: R0/R1 + T1 + MAR + T4-T6
                </div>
                <div className="math-block" style={{ fontSize: '0.84em', marginTop: 0 }}>
                    C(Sigma) = (chi_faith, N_nonab, N_c, N_g), lexicographic minimum over admissible Sigma
                </div>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, fontSize: '0.84em' }}>
                    <li><strong>R0:</strong> finite-dimensional regulator premise for local factors.</li>
                    <li><strong>R1:</strong> region observables are fixed points of boundary gauge action.</li>
                    <li><strong>T1:</strong> vanishing of the relevant transport obstruction when global transportability is invoked: [z]=0 on the central branch, or q<sub>&Sigma;</sub>=0 on the genuinely noncentral branch.</li>
                    <li><strong>MAR:</strong> pick the lexicographically minimal admissible low-energy sector.</li>
                </ul>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.82em', color: 'var(--text-muted)' }}>
                    MAR fixes the realized admissible gauge branch. The downstream structural and continuation
                    surfaces use the later theorem-local premises.
                </p>
            </div>

            <Explainer title="Extended Inputs Beyond Core A1-A4">
                <p>The papers distinguish the five axioms from theorem-local technical premises and branch conditions:</p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>MAR (Axiom 5)</strong>: admissible-branch selector used in the gauge derivation</li>
                    <li><strong>T1</strong>: vanishing relevant transport obstruction when global transportability is invoked: [z]=0 on the central branch or q<sub>&Sigma;</sub>=0 on the genuinely noncentral branch</li>
                    <li><strong>T2</strong>: Lorentz/null-modular/Einstein statements are scaling-limit claims. Literal fixed-cutoff matrix identities appear only in special representations.</li>
                    <li><strong>T3</strong>: fixed-cap generalized-entropy stationarity for the admissible first-variation class used in the Jacobson branch</li>
                    <li><strong>T4</strong>: symmetric braiding in the 3+1D EFT branch</li>
                    <li><strong>T5</strong>: bosonic Tannakian fiber functor, or an explicit super-Tannakian fork</li>
                    <li><strong>T6</strong>: directed colimit of transportable edge sectors with objectwise finite-dimensional fibers wherever compact gauge reconstruction is invoked</li>
                    <li><strong>R0/R1</strong>: regulator and fixed-point premises used in the gauge reconstruction</li>
                </ul>
            </Explainer>

            <Explainer title="What these axioms give you">
                <p>The paper surface separates structural outputs from branch-conditional ones:</p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>From the screen identity and the explicit BW scaling branch, OPH recovers Lorentz kinematics on the extracted prime geometric subnet.</li>
                    <li>From the null bridge, the separate bounded-interval projective branch, and fixed-cap stationarity, OPH states a conditional Jacobson-type Einstein branch with those added ingredients kept explicit.</li>
                    <li>The half-line generator/null-stress charge identification is internal to the null bridge; UV/BW cap-pair extraction and ordered cut-pair rigidity remain explicit scaffold items.</li>
                    <li>Massless photon and graviton remain symmetry-protected structural outputs.</li>
                </ul>
                <p>
                    Adding R0/R1, T1, MAR, and T4-T6 yields the realized Standard Model gauge branch
                    ([SU(3)&times;SU(2)&times;U(1)]/Z<sub>6</sub>, N<sub>c</sub>=3, N<sub>g</sub>=3).
                    Later particle lanes then split into closed calibration sectors, continuation surfaces, compare-only
                    adapters, and open theorem objects depending on the sector.
                </p>
            </Explainer>
        </div>
    );
}
