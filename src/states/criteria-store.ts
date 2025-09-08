import { Criteria } from '@/types/criteria';
import { initialValuesMagiq, initialValuesManual } from '@/values/criteria';
import { create } from 'zustand';
import { Template } from '../services/calculation-service';

interface CriteriaStore {
  criteria: Criteria;
  showGraphic: boolean;
  showTable: boolean;
  template: Template | null;
  setTemplate: (template: Template) => void;
  setCriteria: (criteria: Criteria) => void;
  setMax: (criteriaName: string, isMax: boolean) => void;
  setValue: (criteriaName: string, value: number) => void;
  bulkSetValues: (values: { [key in keyof Criteria]: number }) => void;
  resetCriteria: (type: 'magiq' | 'manual' | 'template') => void;
  setShowGraphic: (show: boolean) => void;
  setShowTable: (show: boolean) => void;
  setDisplayFormats: (formats: { grafik: boolean; tabel: boolean }) => void;
}

const useCriteriaStore = create<CriteriaStore>(set => ({
  criteria: initialValuesManual,
  showGraphic: true,
  showTable: false,
  template: null,
  setTemplate: template => set({ template }),
  setCriteria: criteria => set({ criteria }),
  setMax: (criteriaName, isMax) =>
    set(state => ({
      ...state,
      criteria: {
        ...state.criteria,
        [criteriaName + '_max']: isMax,
      },
    })),
  setValue: (criteriaName, value) =>
    set(state => {
      // lock range 0-100
      value = Math.min(100, Math.max(0, value));

      return {
        criteria: {
          ...state.criteria,
          [criteriaName + '_value']: value,
        },
      };
    }),
  bulkSetValues: values =>
    set(state => ({
      criteria: Object.assign({}, state.criteria, values) as Criteria,
    })),
  resetCriteria: (type: 'magiq' | 'manual') =>
    set(state => ({
      ...state,
      criteria: type === 'manual' ? initialValuesManual : initialValuesMagiq,
      template: null,
    })),
  setShowGraphic: show => set({ showGraphic: show }),
  setShowTable: show => set({ showTable: show }),
  setDisplayFormats: formats =>
    set({
      showGraphic: formats.grafik,
      showTable: formats.tabel,
    }),
}));

export default useCriteriaStore;
