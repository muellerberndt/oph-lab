import evaluatorContractRaw from './quarkPDrivenEvaluatorContract.json?raw';

export type QuarkPDrivenAnchor = {
  id: string;
  label: string;
  mass_gev: number;
};

export type QuarkPDrivenPromotionBlocker =
  | 'default_universe_anchor_not_removed'
  | 'edge_statistics_bridge_not_closed'
  | 'off_canonical_odd_response_not_closed'
  | 'pure_B_source_payload_not_closed'
  | 'off_canonical_pure_B_payload_family_not_closed'
  | 'source_spread_two_modulus_nonidentifiability'
  | 'mixed_scheme_mass_coordinates_not_single_running_sextet'
  | 'physical_dimensionless_yukawa_normalization_missing';

export type QuarkPDrivenMassRow = {
  id: string;
  label: string;
  baseline_mass_gev: number;
  mass_gev: number;
  log_shift: number;
};

export type QuarkPDrivenEvaluatorContract = {
  artifact: 'oph_quark_p_driven_shared_evaluator_contract';
  default_anchor_check: {
    alpha_u: number;
    down_sector: QuarkPDrivenMassRow[];
    sigma_d_total_log_per_side: number;
    sigma_u_total_log_per_side: number;
    up_sector: QuarkPDrivenMassRow[];
  };
  evaluator_constants: {
    alpha_exponent_down: number;
    alpha_exponent_up: number;
    alpha_u_reference: number;
    down_anchors: QuarkPDrivenAnchor[];
    rho_ord: number;
    sigma_d_reference: number;
    sigma_u_reference: number;
    up_anchors: QuarkPDrivenAnchor[];
    x2: number;
  };
  formulas: Record<string, string>;
  generated_utc: string;
  input_artifacts: {
    edge_statistics: string | null;
    odd_response: string | null;
    pure_b_source_values: string | null;
  };
  input_statuses: {
    edge_statistics_bridge_status: string | null;
    odd_response_proof_status: string | null;
    pure_b_source_status: string | null;
  };
  notes: string[];
  proof_status: 'candidate_only';
  public_promotion_allowed: false;
  runtime_status: 'target_anchored_diagnostic_only';
  scope: string;
  theorem_grade_closure: false;
  promotion_blockers: QuarkPDrivenPromotionBlocker[];
  audit_classification: {
    target_anchored: true;
    public_numeric_rows_allowed: false;
    source_spread_fiber: '(R_{>0})^2';
    source_spread_status: 'closed_current_corpus_nonidentifiability_obstruction';
    comparison_packet_status: 'mixed_scheme_mass_coordinates_not_one_running_sextet';
    matrix_status: 'GeV_mass_textures_not_physical_dimensionless_Yukawas';
  };
};

type StoredQuarkPDrivenEvaluatorContract = Omit<
  QuarkPDrivenEvaluatorContract,
  'runtime_status' | 'promotion_blockers' | 'audit_classification'
> & {
  runtime_status: string;
  promotion_blockers: string[];
};

const storedContract = JSON.parse(evaluatorContractRaw) as StoredQuarkPDrivenEvaluatorContract;

const mandatoryAuditBlockers: QuarkPDrivenPromotionBlocker[] = [
  'source_spread_two_modulus_nonidentifiability',
  'mixed_scheme_mass_coordinates_not_single_running_sextet',
  'physical_dimensionless_yukawa_normalization_missing',
];

// The checked-in JSON is a historical runtime contract. Normalize it at the
// browser boundary so target anchors and fitted spreads cannot be mistaken for
// source-emitted public quark predictions.
export const QUARK_P_DRIVEN_EVALUATOR_CONTRACT: QuarkPDrivenEvaluatorContract = {
  ...storedContract,
  proof_status: 'candidate_only',
  public_promotion_allowed: false,
  runtime_status: 'target_anchored_diagnostic_only',
  scope: 'Target-anchored off-canonical sensitivity diagnostic only. It emits no public numeric quark row and no physical dimensionless Yukawa matrix.',
  theorem_grade_closure: false,
  promotion_blockers: Array.from(
    new Set([
      ...(storedContract.promotion_blockers as QuarkPDrivenPromotionBlocker[]),
      ...mandatoryAuditBlockers,
    ]),
  ),
  notes: [
    ...storedContract.notes,
    'The declared source corpus leaves an exact free (R_{>0})^2 spread fiber; selected-frame descent is not a spread selector.',
    'The stored target coordinates mix light, heavy, and top conventions, and the GeV-valued matrices are mass textures rather than physical dimensionless Yukawas.',
  ],
  audit_classification: {
    target_anchored: true,
    public_numeric_rows_allowed: false,
    source_spread_fiber: '(R_{>0})^2',
    source_spread_status: 'closed_current_corpus_nonidentifiability_obstruction',
    comparison_packet_status: 'mixed_scheme_mass_coordinates_not_one_running_sextet',
    matrix_status: 'GeV_mass_textures_not_physical_dimensionless_Yukawas',
  },
};
