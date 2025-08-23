import { create } from "zustand";

export interface Criteria {
    // ========== Level 3 Assessments ==========

    // L3 CG1 - Group A (likely Academic/Performance metrics)
    l3_cg1_a_value: number;
    l3_cg1_a_max: boolean;

    // Substansi (Content/Substance)
    l3_cg1_b_value: number;
    l3_cg1_b_max: boolean; 

    // Kualitas (Quality)
    l3_cg1_c_value: number;
    l3_cg1_c_max: boolean;

    // Presentasi (Presentation)
    l3_cg2_a_value: number;
    l3_cg2_a_max: boolean;

    // Tanya Jawab (Q&A Session)
    l3_cg2_b_value: number;
    l3_cg2_b_max: boolean;

    // ========== Level 2 Assessments ==========

    // L2 CG1 - Achievement Categories

    // Kompetisi (Competition)
    l2_cg1_a_value: number;
    l2_cg1_a_max: boolean;

    // Pengakuan (Recognition)
    l2_cg1_b_value: number;
    l2_cg1_b_max: boolean;

    // Penghargaan (Awards)
    l2_cg1_c_value: number;
    l2_cg1_c_max: boolean;

    // Karier Organisasi (Organizational Career)
    l2_cg1_d_value: number;
    l2_cg1_d_max: boolean;

    // Hasil Karya (Work Results/Output)
    l2_cg1_e_value: number;
    l2_cg1_e_max: boolean;

    // Pemberdayaan / Aksi Kemanusiaan (Empowerment/Humanitarian Action)
    l2_cg1_f_value: number;
    l2_cg1_f_max: boolean;

    // Kewirausahaan (Entrepreneurship)
    l2_cg1_g_value: number;
    l2_cg1_g_max: boolean;

    // L2 CG2 - Creative Work Assessment

    // Naskah GK (Creative Work Script/Document)
    l2_cg2_a_value: number;
    l2_cg2_a_max: boolean;

    // Presentasi GK (Creative Work Presentation)
    l2_cg2_b_value: number;
    l2_cg2_b_max: boolean;

    // L2 CG3 - Language/Communication Assessment

    // Content
    l2_cg3_a_value: number;
    l2_cg3_a_max: boolean;

    // Accuracy
    l2_cg3_b_value: number;
    l2_cg3_b_max: boolean;

    // Fluency
    l2_cg3_c_value: number;
    l2_cg3_c_max: boolean;

    // Pronunciation
    l2_cg3_d_value: number;
    l2_cg3_d_max: boolean;

    // Overall Performance
    l2_cg3_e_value: number;
    l2_cg3_e_max: boolean;

    // ========== Level 1 Assessments ==========

    // L1 CG1 - Top Level Assessments

    // Capaian Unggulan (Outstanding Achievement)
    l1_cg1_a_value: number;
    l1_cg1_a_max: boolean;

    // Gagasan Kreatif (Creative Ideas)
    l1_cg1_b_value: number;
    l1_cg1_b_max: boolean;

    // Bahasa Inggris (English Language)
    l1_cg1_c_value: number;
    l1_cg1_c_max: boolean;

    // ========== Query/Result Parameters ==========

    limit: number;
    ascending: boolean;
}

const initialValues: Criteria = {
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

interface CriteriaStore {
    criteria: Criteria;
    setCriteria: (criteria: Criteria) => void;
    setMax: (criteriaName: string, isMax: boolean) => void;
    setValue: (criteriaName: string, value: number) => void;
    bulkSetValues: (values: { [key in keyof Criteria]: number }) => void;
    resetCriteria: () => void;
}

const useCriteriaStore = create<CriteriaStore>((set) => ({
    criteria: initialValues,
    setCriteria: (criteria) => set({ criteria }),
    setMax: (criteriaName, isMax) => set(
        (state) => ({
            ...state,
            criteria: {
                ...state.criteria,
                [criteriaName + '_max']: isMax
            }
        })
    ),
    setValue: (criteriaName, value) => set(
        (state) => {
            // lock range 0-100
            value = Math.min(100, Math.max(0, value));

            return {
                criteria: {
                    ...state.criteria,
                    [criteriaName + '_value']: value
                }
            }
        }
    ),
    bulkSetValues: (values) => set((state) => ({
        criteria: Object.assign({}, state.criteria, values) as Criteria
    })),
    resetCriteria: () => set({ criteria: initialValues })
}));

export default useCriteriaStore;