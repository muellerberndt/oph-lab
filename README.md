# OPH Lab

Interactive explainer app for Observer Patch Holography.

Production URL: `https://oph-lab.floatingpragma.io/`

The lab is a reader-facing guide to the OPH paper stack. Its job is to explain the derivation routes, show where the recovered core stops, and keep public copy aligned with the current paper surface. It is not a substitute for the papers, and it should not silently upgrade conditional or continuation results into unconditional theorem claims.

## Source Of Truth

Research status is controlled from the sibling `reverse-engineering-reality/` repo, especially:

- `paper/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.tex`
- `paper/deriving_the_particle_zoo_from_observer_consistency.tex`
- `paper/reality_as_consensus_protocol.tex`
- `paper/screen_microphysics_and_observer_synchronization.tex`
- `paper/tex_fragments/PAPER.tex`
- `paper/tex_fragments/TECHNICAL_SUPPLEMENT.tex`
- `code/particles/RESULTS_STATUS.md`
- `README.md`

When the paper status changes, update those sources first, then sync the OPH Lab copy.

## Current Research Status

This section is the lab-maintainer summary of the current public paper surface.

### Gravity / Lorentz branch

- Lorentz kinematics is recovered on the explicit BW geometric branch.
- The BW theorem surface is sharpened and stable at the automorphism level.
- The broader UV/BW internalization lane remains open.
- The remaining UV/BW scaffold is:
  - `canonical_scaling_cap_pair_realization_from_transported_cap_marginals`
  - `independent_bw_rigidity_on_realized_limit`
- The smallest lower blocker beneath the first object is:
  - `eventual_fixed_local_collar_common_floor_on_modular_transport_marginals`
- The OPH half-line generator is identified with the effective local null-stress charge on that same half-line family.
- What remains open downstream on the null/stress side is:
  - bounded-interval transport / projective branch
  - tensor reconstruction beyond the null-invisible metric ambiguity

### Gauge / Standard Model structural branch

- The compact gauge route to the realized Standard Model quotient
  `SU(3) x SU(2) x U(1) / Z_6` is part of the recovered structural core.
- The exact hypercharge lattice, realized color triplet `N_c = 3`, and
  generation count `N_g = 3` are on the paper-facing structural surface.
- The sharp exclusion on this surface is `no gauge-mediated proton decay`.

### Particle branch

- Structural exact zeros:
  - photon
  - gluons
  - graviton
- Electroweak:
  - `W/Z` are closed on the D10 theorem surface.
- Higgs/top:
  - public rows are carried by a closed one-scalar D11 forward seed
  - the exact inverse pair is compare-only
- Charged leptons:
  - still open at `C_hat_e^{cand}`
  - then at the post-promotion affine descent to `mu_phys(Y_e)`
  - with `charged_physical_identity_mode_equalizer` beneath that scalar
- Quarks:
  - the maximal theorem-emitted package on the present ledger is the D12 mass ray, the negative selector `sigma_ref`, and the restricted-scope affine mean package
  - the emitted scales are `g_ch = 0.9231656602589082` on `shared_budget_only` and `(g_u, g_d) = (0.7797392875757557, 0.12172551081512113)` on `current_family_only`
  - the stronger physical closure objects are absent on that ledger
  - the exact minimal extension triple above that package is:
    `H_mass : ell_ud = log(c_d / c_u)`,
    `H_phys : s_ud^phys : M_ud^{CR,phys} -> Sigma_ud^phys`,
    `H_abs : A_q^phys : Sigma_ud^phys -> R`
  - a continuation-only D12 internal backread sidecar fixes the mass-side scalar package numerically, but it does not replace the public theorem frontier
- Neutrinos:
  - the weighted-cycle theorem pair emits
    `C_nu = sum_gap^2 * prod_qbar * solar_response_over_mstar^-0.5`
  - `P_nu = 6.699825740519345`
  - `B_nu = P_nu * C_nu = 6.696004159297337`
  - the absolute weighted-cycle neutrino family is emitted on that branch
  - the older exact adapter, bridge corridor, and correction audit are diagnostic-only sidecars
- Hadrons:
  - still backend-bound / compute-bound

### Consensus branch

- Accepted local repairs lower the touched-overlap inconsistency potential `Phi`.
- On the finite patch net, that local-fit contract makes `Phi` a Lyapunov functional for accepted repair moves.
- Under repair completeness and quotient-compatible union-collar gluing, the repair dynamics has a unique schedule-independent normal form.
- Global consistency is still obstructed by cycle / holonomy defects. Pairwise overlap agreement alone is not enough.
- Gauge-invariant uniqueness belongs on the quotient, not on raw microscopic representatives.

### Screen microphysics branch

- The lab should treat the finite screen-register architecture as a first-class public surface, not a side note.
- The current microphysics paper carries:
  - local gauge registers on a finite screen cellulation
  - explicit patch and overlap observables
  - record registers
  - checkpoint / restoration machinery
  - observer synchronization as an operational protocol
- This is a fixed-cutoff reference architecture and simulator target. It is not yet a claim of unique final UV completion.

## Lab Copy Rules

Use these rules whenever editing explainer text.

- Do not present Lorentz kinematics or Einstein recovery as unconditional outputs of the local axioms alone.
- Do not collapse the BW branch condition into generic statements like “modular flow is Lorentz boost” without the branch qualifier.
- Distinguish these public claim tiers explicitly:
  - recovered core
  - conditional branch
  - continuation lane
  - compare-only
  - open scaffold
- Do not describe compare-only exact-hit sidecars as public theorem rows.
- Do not describe continuation-level phenomenology templates as recovered-core predictions.
- Do not use progress-tracking language like “now we have” in public research summaries.
- Prefer “current paper surface”, “explicit BW branch”, “continuation-only sidecar”, and “compare-only” where applicable.

## Highest-Priority Drift Points

These are the common places where public copy tends to overstate the current papers.

- Home / landing summary:
  - avoid “everything follows from the axioms” wording
- Modular-flow / Lorentz pages:
  - keep the BW branch qualifier explicit
  - avoid unconditional `K_C = 2 pi B_C`
- Gravity / Einstein pages:
  - avoid “Einstein closure” wording
  - keep the null/stress remaining boundary explicit
- Axioms / synthesis pages:
  - separate local axioms from bridge assumptions and open scaffold objects
- Particle / masses / predictions pages:
  - keep `W/Z` closed
  - keep Higgs/top as forward-seed public rows plus compare-only inverse sidecar
  - keep charged, quark, neutrino, and hadron lanes labeled as open where appropriate
  - keep GW comb / discrete Hawking / deep-IR galaxy-response language separated by claim tier
- Consensus / microphysics pages:
  - do not demote them to flavor text beneath the gravity and QFT chains
  - keep the fixed-point, holonomy, record, and synchronization language explicit

## Development

Install:

```bash
npm ci
```

Local dev server:

```bash
npm run dev
```

Production build:

```bash
npm run build
```

Deploy:

```bash
npm run deploy
```

The app uses `gh-pages -d dist` for deployment.
