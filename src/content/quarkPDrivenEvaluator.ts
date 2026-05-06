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
  | 'off_canonical_pure_B_payload_family_not_closed';

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
  runtime_status: 'shared_candidate_evaluator';
  scope: string;
  theorem_grade_closure: false;
  promotion_blockers: QuarkPDrivenPromotionBlocker[];
};

export const QUARK_P_DRIVEN_EVALUATOR_CONTRACT =
  JSON.parse(evaluatorContractRaw) as QuarkPDrivenEvaluatorContract;
