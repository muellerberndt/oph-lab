import { useState } from 'react';
import {
  NEUTRINO_BRIDGE_ROWS,
  NEUTRINO_FAMILY,
  NEUTRINO_MAJORANA_ROWS,
  NEUTRINO_OSCILLATION_ROWS,
  NEUTRINO_PHASE_GEOMETRY,
  NEUTRINO_SURFACE_NOTES,
  NEUTRINO_THEOREM_CHAIN,
} from '../content/neutrinoSurface';
import { OPH_PAPERS, RESEARCH_REPO_URL } from '../content/paperSurface';

// The visual surface on this page follows the weighted-cycle branch described in
// reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
// and the compact-paper summary in
// reverse-engineering-reality/paper/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.tex.
// The numeric rows are copied from the emitted branch artifacts under
// reverse-engineering-reality/code/particles/runs/neutrino/.

type ViewMode = 'family' | 'oscillation' | 'majorana';
type FamilyId = (typeof NEUTRINO_FAMILY)[number]['id'];
type PhaseFocus = keyof typeof NEUTRINO_PHASE_GEOMETRY;

const PARTICLE_PAPER_URL =
  OPH_PAPERS.find((paper) => paper.slug === 'particles')?.href ??
  `${RESEARCH_REPO_URL}/blob/main/paper/deriving_the_particle_zoo_from_observer_consistency.pdf`;
const NEUTRINO_CODE_URL = `${RESEARCH_REPO_URL}/tree/main/code/particles/runs/neutrino`;

function formatEV(value: number) {
  return `${value.toFixed(12)} eV`;
}

function formatShare(value: number) {
  return `${(value * 100).toFixed(2)}%`;
}

function phasePoint(angleDegrees: number, radius: number) {
  const radians = ((angleDegrees - 90) * Math.PI) / 180;
  return {
    x: 160 + radius * Math.cos(radians),
    y: 160 + radius * Math.sin(radians),
  };
}

export function NeutrinosPage() {
  const [view, setView] = useState<ViewMode>('family');
  const [selectedFamily, setSelectedFamily] = useState<FamilyId>('nu_tau');
  const [phaseFocus, setPhaseFocus] = useState<PhaseFocus>('alpha21');

  const heaviestMass = Math.max(...NEUTRINO_FAMILY.map((row) => row.massEV));
  const summedMass = NEUTRINO_FAMILY.reduce((total, row) => total + row.massEV, 0);
  const selectedFamilyRow =
    NEUTRINO_FAMILY.find((row) => row.id === selectedFamily) ?? NEUTRINO_FAMILY[0];

  // The wheel shows the two physical Majorana phases together with the
  // readout-only electron-row gauge. The gauge is part of the published
  // readout rule because the physical pair is evaluated after fixing U_e1
  // to the positive real line.
  const phaseRows: Array<{
    id: PhaseFocus;
    label: string;
    degrees: number;
    value: string;
    note: string;
    color: string;
  }> = [
    {
      id: 'alpha21',
      label: 'alpha21^(Maj)',
      degrees: NEUTRINO_PHASE_GEOMETRY.alpha21,
      value: NEUTRINO_MAJORANA_ROWS[0].value,
      note: NEUTRINO_MAJORANA_ROWS[0].note,
      color: 'var(--accent-gold)',
    },
    {
      id: 'alpha31',
      label: 'alpha31^(Maj)',
      degrees: NEUTRINO_PHASE_GEOMETRY.alpha31,
      value: NEUTRINO_MAJORANA_ROWS[1].value,
      note: NEUTRINO_MAJORANA_ROWS[1].note,
      color: 'var(--accent-cyan)',
    },
    {
      id: 'gauge',
      label: 'electron-row gauge',
      degrees: NEUTRINO_PHASE_GEOMETRY.gauge,
      value: NEUTRINO_MAJORANA_ROWS[2].value,
      note: NEUTRINO_MAJORANA_ROWS[2].note,
      color: 'var(--accent-rose)',
    },
  ];

  const focusedPhase = phaseRows.find((row) => row.id === phaseFocus) ?? phaseRows[0];

  return (
    <div className="neutrino-page">
      <section className="card chain-qft neutrino-hero">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <span className="section-tag qft">Chain 2: QFT</span>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Neutrino Theorem Branch</h1>
        </div>

        <p style={{ margin: 0 }}>
          Neutrinos are where many theories go soft. The Standard Model does not derive one
          neutrino mass. This OPH branch emits an absolute family, the central splittings, and
          a physical Majorana pair from one coherent transport surface.
        </p>

        <div className="neutrino-hero-grid">
          <div className="neutrino-kpi-grid">
            <div className="neutrino-kpi-card">
              <div className="neutrino-kpi-label">Hierarchy</div>
              <div className="neutrino-kpi-value">Normal</div>
              <div className="neutrino-kpi-note">
                The weighted-cycle theorem object fixes the hierarchy ratio on the normal branch.
              </div>
            </div>
            <div className="neutrino-kpi-card">
              <div className="neutrino-kpi-label">Sum m_i</div>
              <div className="neutrino-kpi-value">{formatEV(summedMass)}</div>
              <div className="neutrino-kpi-note">
                Direct sum of the theorem-grade absolute family emitted by the absolute attachment
                theorem.
              </div>
            </div>
            <div className="neutrino-kpi-card">
              <div className="neutrino-kpi-label">Delta m21^2 / Delta m32^2</div>
              <div className="neutrino-kpi-value">0.0307211101</div>
              <div className="neutrino-kpi-note">
                Dimensionless hierarchy ratio from the weighted-cycle theorem object.
              </div>
            </div>
            <div className="neutrino-kpi-card">
              <div className="neutrino-kpi-label">J_CP</div>
              <div className="neutrino-kpi-value">-0.0275311561</div>
              <div className="neutrino-kpi-note">
                CP-sensitive invariant carried by the same PMNS branch as the mixing angles.
              </div>
            </div>
          </div>

          <div className="neutrino-resource-grid">
            <a
              className="neutrino-link-tile"
              href={PARTICLE_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="neutrino-link-kicker">Paper</span>
              <span className="neutrino-link-title">Deriving the Particle Zoo</span>
              <span className="neutrino-link-body">
                Weighted-cycle neutrino branch, bridge-rigidity theorem, absolute attachment, and
                shared-basis Majorana readout.
              </span>
              <span className="neutrino-link-cta">Open PDF</span>
            </a>

            <a
              className="neutrino-link-tile"
              href={NEUTRINO_CODE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="neutrino-link-kicker">Code</span>
              <span className="neutrino-link-title">Neutrino Artifacts</span>
              <span className="neutrino-link-body">
                Inspect the emitted theorem objects and shared-basis transport artifacts behind the
                values on this page.
              </span>
              <span className="neutrino-link-cta">Open GitHub</span>
            </a>
          </div>
        </div>

        <div className="math-block">
          {NEUTRINO_THEOREM_CHAIN.join(' -> ')}
        </div>
      </section>

      <section className="card neutrino-note-card">
        <h2 style={{ margin: 0, fontSize: '0.96rem' }}>Surface Boundaries</h2>
        <ul className="neutrino-note-list">
          {NEUTRINO_SURFACE_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="neutrino-story-grid">
        <article className="card neutrino-story-card">
          <h2 style={{ marginTop: 0, fontSize: '0.96rem' }}>Why This Matters</h2>
          <p style={{ margin: '0 0 12px 0' }}>
            Neutrinos are one of the hardest parts of the particle spectrum to pin down. They are
            tiny, elusive, and deeply tied to flavor structure. Most frameworks retreat to fitting
            at this point. This branch does not. It produces concrete masses, a concrete hierarchy,
            concrete splittings, and concrete phase data.
          </p>
          <p style={{ margin: 0 }}>
            That is a serious achievement. The same framework that reconstructs gauge structure and
            gravity reaches into the neutrino sector and comes back with a sharp quantitative
            surface. A reader can inspect the papers, inspect the emitted artifacts, and inspect
            the page code that turns those artifacts into this display.
          </p>
        </article>

        <article className="card neutrino-story-card">
          <h2 style={{ marginTop: 0, fontSize: '0.96rem' }}>Scope Of This Page</h2>
          <p style={{ margin: '0 0 12px 0' }}>
            This page presents one emitted absolute family, the central splittings, and one physical
            Majorana pair. Flavor-labeled neutrino masses and arbitrary off-canonical browser sliders
            sit outside this page. Diagnostic fitting adapters also sit outside this page.
          </p>
          <p style={{ margin: 0 }}>
            The displayed masses, splittings, and Majorana pair come from the emitted branch itself.
            The omitted objects sit beside that branch and do not feed the numbers on this page.
          </p>
        </article>
      </section>

      <section className="demo-container">
        <div className="demo-label">Interactive Weighted-Cycle Readout</div>

        <div className="neutrino-tab-row" role="tablist" aria-label="Neutrino readout views">
          {[
            { id: 'family' as const, label: 'Absolute Family' },
            { id: 'oscillation' as const, label: 'Oscillation' },
            { id: 'majorana' as const, label: 'Majorana' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`neutrino-tab ${view === tab.id ? 'active' : ''}`}
              aria-pressed={view === tab.id}
              onClick={() => setView(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {view === 'family' && (
          <div>
            <div className="neutrino-family-grid">
              {NEUTRINO_FAMILY.map((row) => {
                const width = `${(row.massEV / heaviestMass) * 100}%`;
                const shareOfSum = row.massEV / summedMass;

                return (
                  <button
                    key={row.id}
                    type="button"
                    className={`neutrino-family-card ${
                      selectedFamily === row.id ? 'active' : ''
                    }`}
                    aria-pressed={selectedFamily === row.id}
                    onClick={() => setSelectedFamily(row.id)}
                  >
                    <div className="neutrino-family-card-top">
                      <span className="neutrino-family-label">{row.label}</span>
                      <span className="neutrino-family-value">{formatEV(row.massEV)}</span>
                    </div>
                    <div className="neutrino-bar-track">
                      <div className="neutrino-bar-fill" style={{ width }} />
                    </div>
                    <div className="neutrino-family-meta">
                      <span>share of heaviest: {formatShare(row.massEV / heaviestMass)}</span>
                      <span>share of sum: {formatShare(shareOfSum)}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="card neutrino-detail-card">
              <div className="neutrino-detail-kicker">Selected State</div>
              <h3 style={{ margin: '0 0 8px 0' }}>{selectedFamilyRow.label}</h3>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>{formatEV(selectedFamilyRow.massEV)}</strong>
                {'  '}
                on the theorem-grade absolute family emitted by the weighted-cycle absolute
                attachment law.
              </p>
              <p style={{ margin: '0 0 8px 0' }}>{selectedFamilyRow.note}</p>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                The ratio to the heaviest state is{' '}
                <strong>{formatShare(selectedFamilyRow.massEV / heaviestMass)}</strong>, and the
                share of the total mass sum is{' '}
                <strong>{formatShare(selectedFamilyRow.massEV / summedMass)}</strong>.
              </p>
            </div>
          </div>
        )}

        {view === 'oscillation' && (
          <div className="neutrino-scalar-grid">
            {NEUTRINO_BRIDGE_ROWS.map((row) => (
              <div key={row.label} className="neutrino-scalar-card">
                <div className="neutrino-scalar-label">{row.label}</div>
                <div className="neutrino-scalar-value">{row.value}</div>
                <div className="neutrino-scalar-note">{row.note}</div>
              </div>
            ))}
            {NEUTRINO_OSCILLATION_ROWS.map((row) => (
              <div key={row.label} className="neutrino-scalar-card">
                <div className="neutrino-scalar-label">{row.label}</div>
                <div className="neutrino-scalar-value">{row.value}</div>
                <div className="neutrino-scalar-note">{row.note}</div>
              </div>
            ))}
          </div>
        )}

        {view === 'majorana' && (
          <div className="neutrino-phase-layout">
            <div className="neutrino-wheel-shell">
              <svg viewBox="0 0 320 320" className="neutrino-phase-wheel" role="img" aria-label="Majorana phase wheel">
                <circle cx="160" cy="160" r="120" fill="rgba(0,0,0,0.2)" stroke="rgba(255,255,255,0.16)" />
                <circle cx="160" cy="160" r="80" fill="none" stroke="rgba(255,255,255,0.08)" />
                <line x1="160" y1="28" x2="160" y2="292" stroke="rgba(255,255,255,0.08)" />
                <line x1="28" y1="160" x2="292" y2="160" stroke="rgba(255,255,255,0.08)" />

                {phaseRows.map((row) => {
                  const outer = phasePoint(row.degrees, 116);
                  const labelPoint = phasePoint(row.degrees, 136);
                  const isFocused = row.id === phaseFocus;

                  return (
                    <g key={row.id}>
                      <line
                        x1="160"
                        y1="160"
                        x2={outer.x}
                        y2={outer.y}
                        stroke={row.color}
                        strokeWidth={isFocused ? 5 : 3}
                        opacity={isFocused ? 1 : 0.7}
                      />
                      <circle
                        cx={outer.x}
                        cy={outer.y}
                        r={isFocused ? 7 : 5}
                        fill={row.color}
                        opacity={isFocused ? 1 : 0.8}
                      />
                      <text
                        x={labelPoint.x}
                        y={labelPoint.y}
                        fill={row.color}
                        fontSize="12"
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        {row.label}
                      </text>
                    </g>
                  );
                })}

                <circle cx="160" cy="160" r="8" fill="var(--text-primary)" />
              </svg>
            </div>

            <div>
              <div className="neutrino-phase-button-row">
                {phaseRows.map((row) => (
                  <button
                    key={row.id}
                    type="button"
                    className={`neutrino-phase-button ${phaseFocus === row.id ? 'active' : ''}`}
                    aria-pressed={phaseFocus === row.id}
                    onClick={() => setPhaseFocus(row.id)}
                    style={{
                      borderColor: phaseFocus === row.id ? row.color : 'rgba(255,255,255,0.12)',
                      color: phaseFocus === row.id ? row.color : 'var(--text-secondary)',
                    }}
                  >
                    {row.label}
                  </button>
                ))}
              </div>

              <div className="neutrino-phase-card-grid">
                {phaseRows.map((row) => (
                  <div
                    key={row.id}
                    className={`neutrino-phase-card ${phaseFocus === row.id ? 'active' : ''}`}
                    style={{
                      borderColor: phaseFocus === row.id ? row.color : 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <div className="neutrino-scalar-label">{row.label}</div>
                    <div className="neutrino-scalar-value">{row.value}</div>
                    <div className="neutrino-scalar-note">{row.note}</div>
                  </div>
                ))}
              </div>

              <div className="card neutrino-detail-card">
                <div className="neutrino-detail-kicker">Focused Readout</div>
                <h3 style={{ margin: '0 0 8px 0', color: focusedPhase.color }}>
                  {focusedPhase.label}
                </h3>
                <p style={{ margin: '0 0 8px 0' }}>
                  <strong>{focusedPhase.value}</strong>
                </p>
                <p style={{ margin: 0 }}>{focusedPhase.note}</p>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
