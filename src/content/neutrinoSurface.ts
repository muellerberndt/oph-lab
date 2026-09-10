export type NeutrinoAuditRow = {
  label: string;
  value: string;
  status: 'exact no-go' | 'rejected comparison' | 'not derived';
  note: string;
};

// This is an audit surface, not a neutrino prediction surface. The numerical
// coordinates below are retained only so readers can reproduce the rejection
// of the frozen, target-informed weighted-cycle candidate.

export const NEUTRINO_AUDIT_CHAIN = [
  'hand-written family-transport template',
  'target-ranked weighted-cycle candidate',
  'frozen comparison coordinates',
  'NuFIT 6.1 correlated-profile rejection',
  'Physical source, basis, and ordering certificates are absent',
] as const;

export const NEUTRINO_STATUS_CARDS = [
  {
    label: 'Candidate status',
    value: 'Rejected',
    note: 'The weighted-cycle point has no theorem or prediction status.',
  },
  {
    label: 'NuFIT 6.1, TByes-NO',
    value: 'Delta chi2 = 20.12',
    note: 'Official correlated theta23/delta_CP profile score at the frozen point.',
  },
  {
    label: 'NuFIT 6.1, TBoff-NO',
    value: 'Delta chi2 = 18.44',
    note: 'Independent official atmospheric treatment; the profile projections are not summed.',
  },
  {
    label: 'Two-parameter 3 sigma gate',
    value: '11.83',
    note: 'Both official profile scores lie beyond this rejection threshold.',
  },
] as const;

export const NEUTRINO_REJECTED_COORDINATES: NeutrinoAuditRow[] = [
  {
    label: 'theta12',
    value: '34.2259046318 deg',
    status: 'rejected comparison',
    note: 'Frozen coordinate of the target-informed template candidate.',
  },
  {
    label: 'theta23',
    value: '49.7228284506 deg',
    status: 'rejected comparison',
    note: 'Its correlation with delta_CP rejects the candidate even though marginal intervals looked plausible.',
  },
  {
    label: 'theta13',
    value: '8.6863555277 deg',
    status: 'rejected comparison',
    note: 'Frozen coordinate only; it is not a source-closed PMNS prediction.',
  },
  {
    label: 'delta_CP',
    value: '305.5806123145 deg',
    status: 'rejected comparison',
    note: 'The correlated theta23/delta_CP profile excludes this pair at the declared gate.',
  },
  {
    label: 'J_CP',
    value: '-0.0275311561',
    status: 'rejected comparison',
    note: 'Diagnostic coordinate carried by the same rejected matrix.',
  },
  {
    label: 'Delta m21^2 / Delta m32^2',
    value: '0.0307211101',
    status: 'rejected comparison',
    note: 'Its numerical closeness followed target-ranked selector development and is not blind evidence.',
  },
] as const;

export const NEUTRINO_SURVIVING_RESULTS: NeutrinoAuditRow[] = [
  {
    label: 'Isotropic neutrino-only ansatz',
    value: 'Excluded by exact spectral cap',
    status: 'exact no-go',
    note: 'The isotropic branch cannot reach the physical atmospheric splitting scale.',
  },
  {
    label: 'Weighted-cycle construction',
    value: 'Rejected candidate',
    status: 'rejected comparison',
    note: 'Useful as a reproducible failure record, not as a physical neutrino branch.',
  },
  {
    label: 'Exact splitting adapters',
    value: 'Target fits only',
    status: 'rejected comparison',
    note: 'They fit representative central values and cannot feed back into theorem state.',
  },
] as const;

export const NEUTRINO_BLOCKERS = [
  'The family-transport kernel, cycle topology, and weight law are template inputs; the exponent was selected after ranking candidates against oscillation data.',
  'The historical shared-basis construction defined U_nu,shared = U_e U_wc, so U_e^dagger U_nu,shared = U_wc was an identity rather than an independent PMNS derivation.',
  'The stored charged-lepton left basis is nearly degenerate and does not identify a stable physical U_e.',
  'Older intrinsic builders exported left singular vectors instead of the Majorana Takagi matrix. The corrected conditional readout is also far outside the oscillation surface.',
  'The physical mass-eigenstate labels, ordering rule, basis placement, and holonomy orientation are not selected by source-closed OPH inputs.',
  'A physical candidate requires a pre-reference dependency lock so oscillation targets cannot enter its source graph.',
] as const;

export const NEUTRINO_ABSENT_OUTPUTS: NeutrinoAuditRow[] = [
  {
    label: 'Physical PMNS matrix',
    value: 'Not derived',
    status: 'not derived',
    note: 'Blocked by the source operator and charged-basis placement problems.',
  },
  {
    label: 'Mass ordering',
    value: 'Not derived',
    status: 'not derived',
    note: 'No source-side mass-eigenstate label and ordering rule is emitted.',
  },
  {
    label: 'Absolute masses or mass sum',
    value: 'Not emitted',
    status: 'not derived',
    note: 'Historical absolute-attachment values are compare-only coordinates on the rejected base.',
  },
  {
    label: 'Physical Majorana phases',
    value: 'Not emitted',
    status: 'not derived',
    note: 'Canonical phase coordinates are conditional on the rejected matrix; no physical basis or physical Majorana phases are derived.',
  },
] as const;

export const NEUTRINO_SURFACE_NOTES = [
  'No OPH neutrino value has source-only prediction status.',
  'The frozen weighted-cycle coordinates are displayed only to make the rejection reproducible.',
  'Failure of this continuation candidate does not falsify the recovered structural OPH core.',
] as const;
