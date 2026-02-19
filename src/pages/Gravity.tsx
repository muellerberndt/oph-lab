import { useState } from 'react';
import { Explainer } from '../components/Explainer';

interface Step {
    title: string;
    axioms: string;
    content: string;
    equation: string;
}

const DERIVATION_STEPS: Step[] = [
    {
        title: 'Start: Local patch with area bound',
        axioms: 'A1 + A3',
        content: 'Each observer has a patch P on S\u00b2 with algebra A(P) and state \u03c1_P. The generalized entropy is bounded by the area of the patch boundary.',
        equation: 'S_gen(C) = A(\u2202C) / (4G) + S_bulk(C)',
    },
    {
        title: 'MaxEnt selection',
        axioms: 'B',
        content: 'Among all states compatible with the local constraints, nature selects the one that maximizes the von Neumann entropy. This is not dynamics; it is typicality.',
        equation: '\u03c1_P = argmax S(\u03c1) subject to local constraints',
    },
    {
        title: 'Entanglement equilibrium',
        axioms: 'A3 + B',
        content: 'At the MaxEnt state, the generalized entropy is stationary under first-order perturbations of the entangling surface. This is the entanglement equilibrium condition.',
        equation: '\u03b4S_gen = 0 \u21d4 \u03b4(A/(4G)) + \u03b4S_bulk = 0',
    },
    {
        title: 'Modular Hamiltonian identification',
        axioms: 'BW theorem',
        content: 'For a causal diamond C near the entangling surface, the Bisognano-Wichmann theorem identifies the modular Hamiltonian with the boost generator. The linearized modular Hamiltonian involves the stress-energy tensor.',
        equation: 'K_C = 2\u03c0 \u222b d\u03a3\u1d43 x\u1d47 T_ab',
    },
    {
        title: 'First law of entanglement',
        axioms: 'A3 + BW',
        content: 'The entanglement first law relates variations of the modular Hamiltonian to variations of the entanglement entropy. Combined with the area identification, this gives a Clausius-like relation.',
        equation: '\u03b4\u27e8K\u27e9 = \u03b4S_EE \u21d4 \u03b4Q = T \u00b7 dS',
    },
    {
        title: 'Jacobson\'s thermodynamic derivation',
        axioms: 'A1-A3 + B + BW',
        content: 'Apply \u03b4Q = TdS to every local Rindler horizon through every point in every direction. The Clausius relation must hold for all null directions at all points. The ONLY geometric equation consistent with this is Einstein\'s equation.',
        equation: 'G_ab + \u039bg_ab = 8\u03c0G \u27e8T_ab\u27e9',
    },
];

export function GravityPage() {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div>
            <div className="section-header">
                <span className="section-tag gr">Chain 1: GR</span>
                <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Gravity from Entanglement</h1>
            </div>

            <p style={{ marginBottom: '16px' }}>
                This is the <strong>key page of Chain 1</strong>. Here we show how Einstein's field equations &mdash;
                the fundamental law of gravity &mdash; are <em>derived</em> from the OPH axioms. Gravity is not a
                fundamental force. It is an <strong>entropic consistency condition</strong>: the requirement that
                entanglement entropy is maximized on every local causal horizon.
            </p>
            <p style={{ marginBottom: '16px' }}>
                The derivation follows Jacobson's 1995 thermodynamic argument, extended by the entanglement equilibrium
                approach of Jacobson (2015) and others. In OPH, this derivation is not an analogy &mdash; it IS the
                origin of gravity. The axioms (A1-A3 + MaxEnt) logically entail Einstein's equations.
            </p>

            <div className="math-block" style={{ fontSize: '1.1em', marginBottom: '32px' }}>
                MaxEnt &rArr; &delta;S<sub>gen</sub> = 0 &rArr; &delta;Q = T dS &rArr; G<sub>ab</sub> + &Lambda;g<sub>ab</sub> = 8&pi;G&langle;T<sub>ab</sub>&rangle;
            </div>

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Derivation, Step by Step</h3>
            <p style={{ marginBottom: '16px', fontSize: '0.9em', color: 'var(--text-muted)' }}>
                Click each step to expand the details. The derivation proceeds from axioms to Einstein's equations
                in six logical steps.
            </p>

            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                {DERIVATION_STEPS.map((_, i) => (
                    <button
                        key={i}
                        className={`btn ${activeStep === i ? 'btn-primary' : 'btn-ghost'}`}
                        onClick={() => setActiveStep(i)}
                        style={{ fontSize: '0.75em', padding: '6px 12px', minWidth: '36px' }}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {DERIVATION_STEPS.map((step, i) => (
                <div
                    key={i}
                    className="card"
                    style={{
                        marginBottom: '12px',
                        borderLeft: `3px solid ${i === activeStep ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                        opacity: i === activeStep ? 1 : 0.5,
                        transition: 'opacity 0.3s, border-color 0.3s',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                        <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '28px',
                            height: '28px',
                            background: i === activeStep ? 'rgba(201, 112, 112, 0.2)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${i === activeStep ? 'var(--accent-rose)' : 'var(--border-color)'}`,
                            fontSize: '0.75em',
                            fontWeight: 700,
                            color: i === activeStep ? 'var(--accent-rose)' : 'var(--text-muted)',
                        }}>
                            {i + 1}
                        </span>
                        <h4 style={{ margin: 0, fontSize: '0.9em' }}>{step.title}</h4>
                        <span style={{ fontSize: '0.7em', color: 'var(--accent-gold)', marginLeft: 'auto' }}>
                            [{step.axioms}]
                        </span>
                    </div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.85em' }}>{step.content}</p>
                    <div className="math-block" style={{ margin: '8px 0 0 0', fontSize: '0.85em' }}>
                        {step.equation}
                    </div>
                </div>
            ))}

            <h3 style={{ fontSize: '1em', marginTop: '32px' }}>The Physical Picture</h3>
            <p style={{ marginBottom: '16px' }}>
                Consider a small patch of any null surface (a local Rindler horizon). An accelerating observer
                just outside this horizon sees:
            </p>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.8', marginBottom: '16px' }}>
                <li>A <strong>thermal state</strong> at the Unruh temperature T = &hbar;a/(2&pi;ck<sub>B</sub>)</li>
                <li>An <strong>entropy</strong> proportional to the horizon area: S = A/(4l<sub>P</sub>&sup2;)</li>
                <li><strong>Heat flux</strong> &delta;Q = T<sub>ab</sub> k<sup>a</sup> d&Sigma;<sup>b</sup> across the horizon</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
                The Clausius relation &delta;Q = T&middot;dS demands that the heat flux equals the temperature times
                the change in entropy (= change in area). This must hold for EVERY null surface at EVERY point.
                The only tensor equation that satisfies this constraint for all null k<sup>a</sup> is:
            </p>
            <div className="math-block" style={{ fontSize: '1.1em' }}>
                G<sub>ab</sub> + &Lambda;g<sub>ab</sub> = 8&pi;G &langle;T<sub>ab</sub>&rangle;
            </div>
            <p style={{ marginBottom: '24px' }}>
                Einstein's equations. Gravity is not a force &mdash; it is what happens when entanglement entropy
                is maximized.
            </p>

            <Explainer title="Why this is not just an analogy">
                <p>
                    When Jacobson first published his derivation in 1995, many physicists viewed it as a beautiful
                    analogy. But in OPH, the screen and its entropy are the <em>fundamental</em> degrees of freedom.
                    The Bekenstein-Hawking area-entropy relation is not an analogy with thermodynamics &mdash; it IS
                    the fundamental statement (Axiom A3). The thermodynamic derivation is therefore the actual origin
                    of gravity, not a metaphor.
                </p>
                <p>
                    This is strengthened by the entanglement equilibrium approach: the condition &delta;S<sub>gen</sub> = 0
                    is a variational principle for entanglement entropy. Einstein's equations are literally the
                    Euler-Lagrange equations for entanglement.
                </p>
            </Explainer>

            <Explainer title="The cosmological constant">
                <p>
                    The integration constant &Lambda; in Einstein's equations gets a specific interpretation in OPH:
                    it is set by the total screen capacity. See the de Sitter page for the derivation:
                </p>
                <div className="math-block" style={{ fontSize: '0.85em' }}>
                    &Lambda; = 3&pi; / (G &middot; log dim H<sub>tot</sub>)
                </div>
                <p>
                    This resolves the cosmological constant problem: &Lambda; is not vacuum energy (which is null-blind)
                    but a screen-capacity parameter. The 120-order-of-magnitude discrepancy between QFT vacuum energy
                    and the observed &Lambda; was never a real problem &mdash; it compared the wrong quantities.
                </p>
            </Explainer>

            <Explainer title="Beyond semiclassical: quantum corrections">
                <p>
                    The derivation above gives the semiclassical Einstein equations with &langle;T<sub>ab</sub>&rangle;
                    on the right-hand side. Quantum corrections arise from:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li>Higher-order terms in the entanglement equilibrium expansion (&delta;&sup2;S<sub>gen</sub>)</li>
                    <li>The bulk entropy term S<sub>bulk</sub> in the generalized entropy</li>
                    <li>The quantum focusing inequality &Theta; &le; 0 (quantum null energy condition)</li>
                </ul>
                <p>
                    These corrections are suppressed by powers of l<sub>P</sub>/L where L is the curvature scale,
                    so the semiclassical equations are an excellent approximation at macroscopic scales.
                </p>
            </Explainer>

            <Explainer title="Comparison with other approaches">
                <p>
                    Several approaches derive Einstein's equations from entanglement:
                </p>
                <ul style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
                    <li><strong>Jacobson (1995):</strong> Clausius relation on local Rindler horizons</li>
                    <li><strong>Verlinde (2010):</strong> Entropic force from holographic screens</li>
                    <li><strong>Jacobson (2015):</strong> Entanglement equilibrium &delta;S<sub>gen</sub> = 0</li>
                    <li><strong>Swingle (2012):</strong> Tensor network / MERA approach</li>
                    <li><strong>OPH:</strong> All of the above unified under Axioms A1-A3 + MaxEnt</li>
                </ul>
                <p>
                    OPH provides the axiomatic foundation that makes these derivations rigorous and unified.
                </p>
            </Explainer>
        </div>
    );
}
