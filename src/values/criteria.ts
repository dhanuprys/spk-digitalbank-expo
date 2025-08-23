import { Criteria } from "@/types/criteria"
import { calculateMagiq } from "@/utils/calculate-magiq"

export const initialValuesManual: Criteria = {
    l3_cg1_a_value: 10,
    l3_cg1_a_max: true,

    // Substansi (Content/Substance)
    l3_cg1_b_value: 10,
    l3_cg1_b_max: true, // Note: PHP had float, assuming this should be 10

    // Kualitas (Quality)
    l3_cg1_c_value: 10,
    l3_cg1_c_max: true,

    // Presentasi (Presentation)
    l3_cg2_a_value: 10,
    l3_cg2_a_max: true,

    // Tanya Jawab (Q&A Session)
    l3_cg2_b_value: 10,
    l3_cg2_b_max: true,

    // ========== Level 2 Assessments ==========

    // L2 CG1 - Achievement Categories

    // Kompetisi (Competition)
    l2_cg1_a_value: 10,
    l2_cg1_a_max: true,

    // Pengakuan (Recognition)
    l2_cg1_b_value: 10,
    l2_cg1_b_max: true,

    // Penghargaan (Awards)
    l2_cg1_c_value: 10,
    l2_cg1_c_max: true,

    // Karier Organisasi (Organizational Career)
    l2_cg1_d_value: 10,
    l2_cg1_d_max: true,

    // Hasil Karya (Work Results/Output)
    l2_cg1_e_value: 10,
    l2_cg1_e_max: true,

    // Pemberdayaan / Aksi Kemanusiaan (Empowerment/Humanitarian Action)
    l2_cg1_f_value: 10,
    l2_cg1_f_max: true,

    // Kewirausahaan (Entrepreneurship)
    l2_cg1_g_value: 10,
    l2_cg1_g_max: true,

    // L2 CG2 - Creative Work Assessment

    // Naskah GK (Creative Work Script/Document)
    l2_cg2_a_value: 10,
    l2_cg2_a_max: true,

    // Presentasi GK (Creative Work Presentation)
    l2_cg2_b_value: 10,
    l2_cg2_b_max: true,

    // L2 CG3 - Language/Communication Assessment

    // Content
    l2_cg3_a_value: 10,
    l2_cg3_a_max: true,

    // Accuracy
    l2_cg3_b_value: 10,
    l2_cg3_b_max: true,

    // Fluency
    l2_cg3_c_value: 10,
    l2_cg3_c_max: true,

    // Pronunciation
    l2_cg3_d_value: 10,
    l2_cg3_d_max: true,

    // Overall Performance
    l2_cg3_e_value: 10,
    l2_cg3_e_max: true,

    // ========== Level 1 Assessments ==========

    // L1 CG1 - Top Level Assessments

    // Capaian Unggulan (Outstanding Achievement)
    l1_cg1_a_value: 10,
    l1_cg1_a_max: true,

    // Gagasan Kreatif (Creative Ideas)
    l1_cg1_b_value: 10,
    l1_cg1_b_max: true,

    // Bahasa Inggris (English Language)
    l1_cg1_c_value: 10,
    l1_cg1_c_max: true,

    // ========== Query/Result Parameters ==========

    limit: 10,
    ascending: true,
}

export const initialValuesMagiq: Criteria = {
    l3_cg1_a_value: calculateMagiq(3, 0),
    l3_cg1_a_max: true,

    // Substansi (Content/Substance)
    l3_cg1_b_value: calculateMagiq(3, 1),
    l3_cg1_b_max: true, // Note: PHP had float, assuming this should be 10

    // Kualitas (Quality)
    l3_cg1_c_value: calculateMagiq(3, 2),
    l3_cg1_c_max: true,

    // Presentasi (Presentation)
    l3_cg2_a_value: calculateMagiq(2, 0),
    l3_cg2_a_max: true,

    // Tanya Jawab (Q&A Session)
    l3_cg2_b_value: calculateMagiq(2, 1),
    l3_cg2_b_max: true,

    // ========== Level 2 Assessments ==========

    // L2 CG1 - Achievement Categories

    // Kompetisi (Competition)
    l2_cg1_a_value: calculateMagiq(7, 0),
    l2_cg1_a_max: true,

    // Pengakuan (Recognition)
    l2_cg1_b_value: calculateMagiq(7, 1),
    l2_cg1_b_max: true,

    // Penghargaan (Awards)
    l2_cg1_c_value: calculateMagiq(7, 2),
    l2_cg1_c_max: true,

    // Karier Organisasi (Organizational Career)
    l2_cg1_d_value: calculateMagiq(7, 3),
    l2_cg1_d_max: true,

    // Hasil Karya (Work Results/Output)
    l2_cg1_e_value: calculateMagiq(7, 4),
    l2_cg1_e_max: true,

    // Pemberdayaan / Aksi Kemanusiaan (Empowerment/Humanitarian Action)
    l2_cg1_f_value: calculateMagiq(7, 5),
    l2_cg1_f_max: true,

    // Kewirausahaan (Entrepreneurship)
    l2_cg1_g_value: calculateMagiq(7, 6),
    l2_cg1_g_max: true,

    // L2 CG2 - Creative Work Assessment

    // Naskah GK (Creative Work Script/Document)
    l2_cg2_a_value: calculateMagiq(2, 0),
    l2_cg2_a_max: true,

    // Presentasi GK (Creative Work Presentation)
    l2_cg2_b_value: calculateMagiq(2, 1),
    l2_cg2_b_max: true,

    // L2 CG3 - Language/Communication Assessment

    // Content
    l2_cg3_a_value: calculateMagiq(5, 0),
    l2_cg3_a_max: true,

    // Accuracy
    l2_cg3_b_value: calculateMagiq(5, 1),
    l2_cg3_b_max: true,

    // Fluency
    l2_cg3_c_value: calculateMagiq(5, 2),
    l2_cg3_c_max: true,

    // Pronunciation
    l2_cg3_d_value: calculateMagiq(5, 3),
    l2_cg3_d_max: true,

    // Overall Performance
    l2_cg3_e_value: calculateMagiq(5, 4),
    l2_cg3_e_max: true,

    // ========== Level 1 Assessments ==========

    // L1 CG1 - Top Level Assessments

    // Capaian Unggulan (Outstanding Achievement)
    l1_cg1_a_value: calculateMagiq(3, 0),
    l1_cg1_a_max: true,

    // Gagasan Kreatif (Creative Ideas)
    l1_cg1_b_value: calculateMagiq(3, 1),
    l1_cg1_b_max: true,

    // Bahasa Inggris (English Language)
    l1_cg1_c_value: calculateMagiq(3, 2),
    l1_cg1_c_max: true,

    // ========== Query/Result Parameters ==========

    limit: 10,
    ascending: true,
}