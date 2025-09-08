import { Criteria } from '@/types/criteria';
import { calculateMagiq } from '@/utils/calculate-magiq';

export const initialValuesManual: Criteria = {
  // ========== Level 2 Assessments ==========

  // L2 CG1 - Achievement Categories

  // Ukuran File
  l2_cg1_a_value: 10,
  l2_cg1_a_max: true,

  // Total Rating
  l2_cg1_b_value: 10,
  l2_cg1_b_max: true,

  // User Rated
  l2_cg1_c_value: 10,
  l2_cg1_c_max: true,

  // Total Install
  l2_cg1_d_value: 10,
  l2_cg1_d_max: true,

  // Release Date
  l2_cg1_e_value: 10,
  l2_cg1_e_max: true,

  // L2 CG2 - Creative Work Assessment

  // Giro
  l2_cg2_a_value: 10,
  l2_cg2_a_max: true,

  // Tabungan
  l2_cg2_b_value: 10,
  l2_cg2_b_max: true,

  // Deposito
  l2_cg2_c_value: 10,
  l2_cg2_c_max: true,

  // Laba Bersih
  l2_cg2_d_value: 10,
  l2_cg2_d_max: true,

  // L2 CG3 - Language/Communication Assessment

  // Happiness
  l2_cg3_a_value: 10,
  l2_cg3_a_max: true,

  // Engagement
  l2_cg3_b_value: 10,
  l2_cg3_b_max: true,

  // Adoption
  l2_cg3_c_value: 10,
  l2_cg3_c_max: true,

  // Retention
  l2_cg3_d_value: 10,
  l2_cg3_d_max: true,

  // Task Success
  l2_cg3_e_value: 10,
  l2_cg3_e_max: true,

  // ========== Level 1 Assessments ==========

  // L1 CG1 - Top Level Assessments

  // Performa Apps
  l1_cg1_a_value: 10,
  l1_cg1_a_max: true,

  // Laporan Keuangan
  l1_cg1_b_value: 10,
  l1_cg1_b_max: true,

  // User Experience
  l1_cg1_c_value: 10,
  l1_cg1_c_max: false,

  // ========== Query/Result Parameters ==========

  limit: 10,
  ascending: false,
};

export const initialValuesMagiq: Criteria = {
  // ========== Level 2 Assessments ==========

  // L2 CG1 - Achievement Categories

  // Ukuran File
  l2_cg1_a_value: calculateMagiq(5, 0),
  l2_cg1_a_max: true,

  // Total Rating
  l2_cg1_b_value: calculateMagiq(5, 1),
  l2_cg1_b_max: true,

  // User Rated
  l2_cg1_c_value: calculateMagiq(5, 2),
  l2_cg1_c_max: true,

  // Total Install
  l2_cg1_d_value: calculateMagiq(5, 3),
  l2_cg1_d_max: true,

  // Release Date
  l2_cg1_e_value: calculateMagiq(5, 4),
  l2_cg1_e_max: true,

  // L2 CG2 - Creative Work Assessment

  // Giro
  l2_cg2_a_value: calculateMagiq(4, 0),
  l2_cg2_a_max: true,

  // Tabungan
  l2_cg2_b_value: calculateMagiq(4, 1),
  l2_cg2_b_max: true,

  // Deposito
  l2_cg2_c_value: calculateMagiq(4, 2),
  l2_cg2_c_max: true,

  // Laba Bersih
  l2_cg2_d_value: calculateMagiq(4, 3),
  l2_cg2_d_max: true,

  // L2 CG3 - Language/Communication Assessment

  // Happiness
  l2_cg3_a_value: calculateMagiq(5, 0),
  l2_cg3_a_max: true,

  // Engagement
  l2_cg3_b_value: calculateMagiq(5, 1),
  l2_cg3_b_max: true,

  // Adoption
  l2_cg3_c_value: calculateMagiq(5, 2),
  l2_cg3_c_max: true,

  // Retention
  l2_cg3_d_value: calculateMagiq(5, 3),
  l2_cg3_d_max: true,

  // Task Success
  l2_cg3_e_value: calculateMagiq(5, 4),
  l2_cg3_e_max: true,

  // ========== Level 1 Assessments ==========

  // L1 CG1 - Top Level Assessments

  // Performa Apps
  l1_cg1_a_value: calculateMagiq(3, 0),
  l1_cg1_a_max: true,

  // Laporan Keuangan
  l1_cg1_b_value: calculateMagiq(3, 1),
  l1_cg1_b_max: true,

  // User Experience
  l1_cg1_c_value: calculateMagiq(3, 2),
  l1_cg1_c_max: false,

  // ========== Query/Result Parameters ==========

  limit: 10,
  ascending: false,
};
