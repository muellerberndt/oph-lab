import {
  NEUTRINO_ABSENT_OUTPUTS,
  NEUTRINO_AUDIT_CHAIN,
  NEUTRINO_BLOCKERS,
  NEUTRINO_REJECTED_COORDINATES,
  NEUTRINO_STATUS_CARDS,
  NEUTRINO_SURFACE_NOTES,
  NEUTRINO_SURVIVING_RESULTS,
} from '../content/neutrinoSurface';
import { OPH_PAPERS, RESEARCH_REPO_URL } from '../content/paperSurface';

const PARTICLE_PAPER_URL =
  OPH_PAPERS.find((paper) => paper.slug === 'particles')?.href ??
  `${RESEARCH_REPO_URL}/blob/main/paper/deriving_the_particle_zoo_from_observer_consistency.pdf`;
const NEUTRINO_CODE_URL = `${RESEARCH_REPO_URL}/tree/main/code/particles/runs/neutrino`;
const NUFIT_61_URL = 'https://www.nu-fit.org/?q=node/309';

export function NeutrinosPage() {
  return (
    <div className="neutrino-page">
      <section className="card chain-qft neutrino-hero">
        <div className="section-header" style={{ marginBottom: 0 }}>
          <span className="section-tag qft">Chain 2: QFT</span>
          <h1 style={{ fontSize: '1.5rem', margin: 0 }}>Neutrino Audit: Rejected Candidate</h1>
        </div>

        <p style={{ margin: 0 }}>
          OPH does not derive a physical PMNS matrix, neutrino mass ordering,
          absolute mass family, or Majorana phases. The former weighted-cycle claim is retained
          here as a frozen failure record: it was target-informed, fails the NuFIT 6.1 correlated
          profile, and does not close its source or basis contracts.
        </p>

        <div className="neutrino-hero-grid">
          <div className="neutrino-kpi-grid">
            {NEUTRINO_STATUS_CARDS.map((card) => (
              <div key={card.label} className="neutrino-kpi-card">
                <div className="neutrino-kpi-label">{card.label}</div>
                <div className="neutrino-kpi-value">{card.value}</div>
                <div className="neutrino-kpi-note">{card.note}</div>
              </div>
            ))}
          </div>

          <div className="neutrino-resource-grid">
            <a
              className="neutrino-link-tile"
              href={PARTICLE_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="neutrino-link-kicker">Paper</span>
              <span className="neutrino-link-title">Particle-Spectrum Audit</span>
              <span className="neutrino-link-body">
                Read the exact isotropic no-go, correlated-profile rejection, basis audit, and
                source-closure boundary.
              </span>
              <span className="neutrino-link-cta">Open paper</span>
            </a>

            <a
              className="neutrino-link-tile"
              href={NEUTRINO_CODE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="neutrino-link-kicker">Code</span>
              <span className="neutrino-link-title">Audit Artifacts</span>
              <span className="neutrino-link-body">
                Inspect the frozen candidate, NuFIT score, Takagi correction, and fail-closed
                promotion contracts.
              </span>
              <span className="neutrino-link-cta">Open GitHub</span>
            </a>

            <a
              className="neutrino-link-tile"
              href={NUFIT_61_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="neutrino-link-kicker">External check</span>
              <span className="neutrino-link-title">NuFIT 6.1 Profiles</span>
              <span className="neutrino-link-body">
                Consult the official correlated oscillation profiles used to reject the frozen
                theta23/delta_CP point.
              </span>
              <span className="neutrino-link-cta">Open NuFIT</span>
            </a>
          </div>
        </div>

        <div className="math-block">{NEUTRINO_AUDIT_CHAIN.join(' -> ')}</div>
      </section>

      <section className="card neutrino-note-card">
        <h2 style={{ margin: 0, fontSize: '0.96rem' }}>Claim Boundary</h2>
        <ul className="neutrino-note-list">
          {NEUTRINO_SURFACE_NOTES.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </section>

      <section className="neutrino-story-grid">
        <article className="card neutrino-story-card">
          <h2 style={{ marginTop: 0, fontSize: '0.96rem' }}>What Survives</h2>
          <p style={{ margin: '0 0 12px 0' }}>
            The neutrino lane contains a useful exact result: the isotropic neutrino-only ansatz
            cannot reach the observed atmospheric splitting scale. That is a no-go theorem, not a
            positive mass or mixing prediction.
          </p>
          <p style={{ margin: 0 }}>
            The weighted-cycle matrix is reproducible as a historical comparison object. Its
            coordinates can be audited, but they cannot be promoted by relabeling a diagnostic as
            a theorem.
          </p>
        </article>

        <article className="card neutrino-story-card">
          <h2 style={{ marginTop: 0, fontSize: '0.96rem' }}>Why The Claim Was Retracted</h2>
          <p style={{ margin: '0 0 12px 0' }}>
            The candidate fails the official two-dimensional theta23/delta_CP profiles. Its
            apparent shared-basis recovery was also guaranteed by its own definition, while the
            charged-lepton basis needed for a physical PMNS matrix is not derived.
          </p>
          <p style={{ margin: 0 }}>
            Correcting the Majorana Takagi convention does not rescue the branch. A physical derivation must
            derive its operator, basis placement, label order, and scale without using oscillation
            targets in the source graph.
          </p>
        </article>
      </section>

      <section className="demo-container">
        <div className="demo-label">Frozen Comparison Record</div>
        <p style={{ marginTop: 0 }}>
          These numbers identify the rejected point. They are not OPH predictions and do not define
          physical neutrino masses, ordering, or phases.
        </p>
        <div className="neutrino-scalar-grid">
          {NEUTRINO_REJECTED_COORDINATES.map((row) => (
            <div key={row.label} className="neutrino-scalar-card">
              <div className="neutrino-scalar-label">{row.label}</div>
              <div className="neutrino-scalar-value">{row.value}</div>
              <div className="neutrino-detail-kicker">{row.status}</div>
              <div className="neutrino-scalar-note">{row.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card neutrino-note-card">
        <h2 style={{ margin: 0, fontSize: '0.96rem' }}>Promotion Blockers</h2>
        <ul className="neutrino-note-list">
          {NEUTRINO_BLOCKERS.map((blocker) => (
            <li key={blocker}>{blocker}</li>
          ))}
        </ul>
      </section>

      <section className="demo-container">
        <div className="demo-label">Neutrino Result</div>
        <div className="neutrino-scalar-grid">
          {[...NEUTRINO_SURVIVING_RESULTS, ...NEUTRINO_ABSENT_OUTPUTS].map((row) => (
            <div key={row.label} className="neutrino-scalar-card">
              <div className="neutrino-scalar-label">{row.label}</div>
              <div className="neutrino-scalar-value">{row.value}</div>
              <div className="neutrino-detail-kicker">{row.status}</div>
              <div className="neutrino-scalar-note">{row.note}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
