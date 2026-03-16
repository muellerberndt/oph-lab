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
        plain: 'Where two observers\' patches overlap, their descriptions must agree. There is no "view from nowhere" \u2014 reality IS the mutual consistency of perspectives.',
        physics: 'For overlapping patches P\u2081 \u2229 P\u2082 \u2260 \u2205, the restrictions of local states must agree on shared observables: \u03c1\u2081|_{A(\u2229)} = \u03c1\u2082|_{A(\u2229)}.',
        formal: '\u2200 P\u2081, P\u2082 with P\u2081 \u2229 P\u2082 \u2260 \u2205: \u03c1\u2081|_{A(P\u2081 \u2229 P\u2082)} = \u03c1\u2082|_{A(P\u2081 \u2229 P\u2082)}. No global state is assumed.',
    },
    {
        id: 'A3',
        name: 'Generalized Entropy / Area Bound',
        plain: 'The maximum information in a region scales with its boundary area, not its volume. Bigger boundaries = more data, but the limit is set by area.',
        physics: 'A generalized entropy functional exists: S_gen(C) = A(\u2202C)/(4G) + S_bulk(C), satisfying quantum focusing (monotonicity along null generators).',
        formal: 'S_gen(C) = Tr(\u03c1 \u00b7 L_C) + S_bulk(C), where L_C = \u03a3_\u03b1 (ln d_\u03b1) P_\u03b1 is the central area operator. Quantum focusing: \u0398 = d\u03b8/d\u03bb + \u03b8\u00b2/(d-2) \u2264 0.',
    },
    {
        id: 'A4',
        name: 'Local Markov / Recoverability',
        plain: 'If you know the data on a "collar" separating two regions, the data on one side tells you almost everything about the other side. Information is locally recoverable.',
        physics: 'For tripartitions A-B-D across separators, the conditional mutual information is small: I(A:D|B) \u2264 \u03b5. Recovery maps exist with controlled error.',
        formal: 'I(A:D|B) \u2264 \u03b5 for the approximate Markov condition. By Fawzi-Renner: ||\u03c1_{ABC} \u2212 (id_A \u2297 R)(\u03c1_{AB})||\u2081 \u2264 2\u221a(ln2 \u00b7 \u03b5).',
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
                In the current extended formulation, OPH is best read as
                <strong> five axioms: A1-A4 + MAR</strong>, together with explicit technical premises
                <strong> R0, R1, [z]=0</strong> for gauge reconstruction. MAR is a selection axiom (not a local
                dynamics equation), but it is still foundational in the extended theory.
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
                <h3 style={{ margin: '0 0 10px 0', fontSize: '0.95em' }}>MAR in the Extended Theory (Axiom 5)</h3>
                <div style={{ fontSize: '0.84em', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    Extended gauge package: R0 + R1 + [z]=0 + MAR
                </div>
                <div className="math-block" style={{ fontSize: '0.84em', marginTop: 0 }}>
                    C(Sigma) = (chi_faith, N_nonab, N_c, N_g), lexicographic minimum over admissible Sigma
                </div>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8', margin: 0, fontSize: '0.84em' }}>
                    <li><strong>R0:</strong> finite-dimensional regulator premise for local factors.</li>
                    <li><strong>R1:</strong> region observables are fixed points of boundary gauge action.</li>
                    <li><strong>[z]=0:</strong> loop-coherent gluing / DHR transportability condition.</li>
                    <li><strong>MAR:</strong> pick lexicographically minimal sector only after admissibility filters are passed.</li>
                </ul>
                <p style={{ margin: '10px 0 0 0', fontSize: '0.82em', color: 'var(--text-muted)' }}>
                    Directly, MAR fixes gauge structure and N_c/N_g. Indirectly, those selections propagate into
                    beta_EW, Koide phase inputs, texture integers, and much of the downstream spectrum pipeline.
                    In that sense, MAR functions as <strong>Nature's Occam's razor</strong> over admissible sectors.
                </p>
            </div>

            <Explainer title="Extended Inputs Beyond Core A1-A4">
                <p>The paper distinguishes core local axioms (A1-A4) from extended inputs needed for specific derivations:</p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>MAR (Axiom 5)</strong> &mdash; global admissible-branch selector used across Chain 2 derivations</li>
                    <li><strong>R0, R1, [z]=0</strong> &mdash; technical premises for gauge reconstruction</li>
                    <li><strong>B</strong> &mdash; MaxEnt selection with local constraints</li>
                    <li><strong>C</strong> &mdash; refinement-stable local branch carrying quasi-local propagation and endpoint control</li>
                    <li><strong>D</strong> &mdash; Gauge-as-gluing (gauge symmetry from overlap redundancy)</li>
                    <li><strong>E</strong> &mdash; Central defect on triple overlaps</li>
                    <li><strong>F</strong> &mdash; controlled collar refinement / scaling-limit scope</li>
                    <li><strong>G</strong> &mdash; OPH geometric branch for caps; BW<sub>S&sup2;</sub> fixes the 2&pi; normalization on that branch</li>
                </ul>
            </Explainer>

            <Explainer title="What these axioms give you">
                <p>From core A1-A4 (plus the stated scaling-limit and geometric-branch assumptions), you already get:</p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Lorentz kinematics (Conf&sup;(S&sup2;) = SO&sup;(3,1))</li>
                    <li>Semiclassical Einstein equations via entanglement equilibrium</li>
                    <li>Massless photon and graviton (symmetry-protected zeros)</li>
                </ul>
                <p>
                    Adding R0/R1/[z]=0/MAR yields unique gauge-sector selection
                    ([SU(3)&times;SU(2)&times;U(1)]/Z<sub>6</sub>, N<sub>c</sub>=3, N<sub>g</sub>=3).
                    Adding the rest of the assumptions progressively yields the full Standard Model,
                    particle masses, dark matter phenomenology, and testable predictions.
                </p>
            </Explainer>
        </div>
    );
}
