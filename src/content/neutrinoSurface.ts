export type NeutrinoFamilyRow = {
  id: 'nu_e' | 'nu_mu' | 'nu_tau';
  label: string;
  massEV: number;
  note: string;
};

export type NeutrinoScalarRow = {
  label: string;
  value: string;
  note: string;
};

// Weighted-cycle neutrino surface.
// This page carries a concrete result:
// one absolute mass family, one pair of central splittings, and one physical
// Majorana pair on one explicit transport branch.
//
// Open boundary for the displayed surface:
// - flavor-labeled neutrino masses sit outside this branch
// - the exact fitting adapters and bridge corridor are diagnostic checks and
//   do not feed the rows shown here
// - a general browser slider for the full neutrino branch is a separate runtime
//   surface and is not claimed by this page
//
// Paper sources:
// - reverse-engineering-reality/paper/deriving_the_particle_zoo_from_observer_consistency.tex
//   weighted-cycle branch discussion, reduced bridge law, absolute family table,
//   and shared-basis Majorana pair summary.
// - reverse-engineering-reality/paper/recovering_relativity_and_standard_model_structure_from_observer_overlap_consistency_compact.tex
//   compact-paper summary of the weighted-cycle branch and its emitted absolute
//   family.
//
// Artifact sources:
// - reverse-engineering-reality/code/particles/runs/neutrino/neutrino_weighted_cycle_theorem_object.json
// - reverse-engineering-reality/code/particles/runs/neutrino/neutrino_bridge_rigidity_theorem.json
// - reverse-engineering-reality/code/particles/runs/neutrino/neutrino_absolute_attachment_theorem.json
// - reverse-engineering-reality/code/particles/runs/neutrino/neutrino_physical_majorana_phase_theorem.json

export const NEUTRINO_THEOREM_CHAIN = [
  'same-label overlap certificate',
  'balanced weighted-cycle selector',
  'reduced bridge law for C_nu above the proxy P_nu',
  'absolute scale lambda_nu and one mass family',
  'shared-basis Majorana readout',
] as const;

export const NEUTRINO_FAMILY: NeutrinoFamilyRow[] = [
  {
    id: 'nu_e',
    label: 'Electron neutrino',
    massEV: 0.017454720257976796,
    note: 'Absolute attachment theorem output on the weighted-cycle branch.',
  },
  {
    id: 'nu_mu',
    label: 'Muon neutrino',
    massEV: 0.019481987935919015,
    note: 'Absolute attachment theorem output on the weighted-cycle branch.',
  },
  {
    id: 'nu_tau',
    label: 'Tau neutrino',
    massEV: 0.05307522145074924,
    note: 'Absolute attachment theorem output on the weighted-cycle branch.',
  },
] as const;

export const NEUTRINO_BRIDGE_ROWS: NeutrinoScalarRow[] = [
  {
    label: 'C_nu',
    value: '0.9994295999075177',
    note: 'Bridge-rigidity theorem object: sum_gap^2 * prod_qbar * solar_response_over_mstar^-0.5.',
  },
  {
    label: 'P_nu',
    value: '6.699825740519345',
    note: 'Emitted proxy beneath the reduced bridge invariant.',
  },
  {
    label: 'B_nu',
    value: '6.696004159297337',
    note: 'Paper-facing amplitude parameterization with B_nu = P_nu * C_nu.',
  },
  {
    label: 'lambda_nu',
    value: '1.7237014208357415',
    note: 'Absolute attachment scalar that lifts the scale-free branch to one absolute family.',
  },
] as const;

export const NEUTRINO_OSCILLATION_ROWS: NeutrinoScalarRow[] = [
  {
    label: 'theta12',
    value: '34.225904631810025 deg',
    note: 'PMNS angle from the weighted-cycle theorem object.',
  },
  {
    label: 'theta23',
    value: '49.72282845058266 deg',
    note: 'PMNS angle from the weighted-cycle theorem object.',
  },
  {
    label: 'theta13',
    value: '8.686355527700156 deg',
    note: 'PMNS angle from the weighted-cycle theorem object.',
  },
  {
    label: 'delta_CP',
    value: '305.58061231449796 deg',
    note: 'Dirac CP phase on the weighted-cycle branch.',
  },
  {
    label: 'J_CP',
    value: '-0.02753115613565372',
    note: 'Jarlskog invariant emitted on the same branch.',
  },
  {
    label: 'Delta m21^2 / Delta m32^2',
    value: '0.030721110097966534',
    note: 'Dimensionless hierarchy ratio fixed by the weighted-cycle theorem object.',
  },
  {
    label: 'Delta m21^2',
    value: '7.488059465106851e-05 eV^2',
    note: 'Absolute solar splitting from the absolute attachment theorem.',
  },
  {
    label: 'Delta m31^2',
    value: '0.0025123118727618473 eV^2',
    note: 'Absolute atmospheric splitting from the absolute attachment theorem.',
  },
  {
    label: 'Delta m32^2',
    value: '0.0024374312781107786 eV^2',
    note: 'Absolute atmospheric splitting from the absolute attachment theorem.',
  },
] as const;

export const NEUTRINO_MAJORANA_ROWS: NeutrinoScalarRow[] = [
  {
    label: 'alpha21^(Maj)',
    value: '153.61851777943562 deg',
    note: 'Physical Majorana phase from canonical Takagi congruence with the readout-only U_e1 in R_{>0} gauge.',
  },
  {
    label: 'alpha31^(Maj)',
    value: '257.00324082207993 deg',
    note: 'Physical Majorana phase from the same shared-basis weighted-cycle transport branch.',
  },
  {
    label: 'electron-row gauge',
    value: '79.72751605060557 deg',
    note: 'Readout-only gauge phase used to fix U_e1 in R_{>0} before evaluating the Majorana pair.',
  },
] as const;

export const NEUTRINO_PHASE_GEOMETRY = {
  alpha21: 153.61851777943562,
  alpha31: 257.00324082207993,
  gauge: 79.72751605060557,
} as const;

export const NEUTRINO_SURFACE_NOTES = [
  'The displayed masses, splittings, and phases come from one emitted weighted-cycle branch.',
  'The exact fitting adapters and bridge corridor are checks. They do not generate the rows shown here.',
  'Flavor-labeled neutrino masses and a general browser slider for this branch sit outside the surface shown here.',
] as const;
