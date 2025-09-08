import { ENV } from '@/config/env';
import { Criteria } from '@/types/criteria';

export interface CalculationResult {
  id: number;
  name: string;
  pref_score: number;
}

export interface Template {
  id: string | number;
  name: string;
  description: string;
}

export class CalculationService {
  static async calculateResults(
    criteria: Criteria
  ): Promise<CalculationResult[]> {
    try {
      const response = await fetch(`${ENV.API_BASE_URL}/api/calculate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(criteria),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CalculationResult[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error in calculation service:', error);
      throw error;
    }
  }

  static async calculateTemplateResults(
    criteria: Criteria,
    template: Template
  ): Promise<CalculationResult[]> {
    try {
      const response = await fetch(
        `${ENV.API_BASE_URL}/api/calculate-template`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            template_id: template.id,
            ascending: criteria.ascending,
            limit: criteria.limit,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CalculationResult[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error in calculation template service:', error);
      throw error;
    }
  }

  static async getTemplates(): Promise<Template[]> {
    const response = await fetch(`${ENV.API_BASE_URL}/api/templates`);
    const data: Template[] = await response.json();
    return data;
  }
}
