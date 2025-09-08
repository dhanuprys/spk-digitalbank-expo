export interface Criteria {
  // ========== Level 2 Assessments ==========

  // L2 CG1 - Achievement Categories

  // Ukuran File
  l2_cg1_a_value: number;
  l2_cg1_a_max: boolean;

  // Total Rating
  l2_cg1_b_value: number;
  l2_cg1_b_max: boolean;

  // User Rated
  l2_cg1_c_value: number;
  l2_cg1_c_max: boolean;

  // Total Install
  l2_cg1_d_value: number;
  l2_cg1_d_max: boolean;

  // Release Date
  l2_cg1_e_value: number;
  l2_cg1_e_max: boolean;

  // L2 CG2 - Creative Work Assessment

  // Giro
  l2_cg2_a_value: number;
  l2_cg2_a_max: boolean;

  // Tabungan
  l2_cg2_b_value: number;
  l2_cg2_b_max: boolean;

  // Deposito
  l2_cg2_c_value: number;
  l2_cg2_c_max: boolean;

  // Laba Bersih
  l2_cg2_d_value: number;
  l2_cg2_d_max: boolean;

  // L2 CG3 - Language/Communication Assessment

  // Happiness
  l2_cg3_a_value: number;
  l2_cg3_a_max: boolean;

  // Engagement
  l2_cg3_b_value: number;
  l2_cg3_b_max: boolean;

  // Adoption
  l2_cg3_c_value: number;
  l2_cg3_c_max: boolean;

  // Retention
  l2_cg3_d_value: number;
  l2_cg3_d_max: boolean;

  // Task Success
  l2_cg3_e_value: number;
  l2_cg3_e_max: boolean;

  // ========== Level 1 Assessments ==========

  // L1 CG1 - Top Level Assessments

  // Performa Apps
  l1_cg1_a_value: number;
  l1_cg1_a_max: boolean;

  // Laporan Keuangan
  l1_cg1_b_value: number;
  l1_cg1_b_max: boolean;

  // User Experience
  l1_cg1_c_value: number;
  l1_cg1_c_max: boolean;

  // ========== Query/Result Parameters ==========

  limit: number;
  ascending: boolean;
}
