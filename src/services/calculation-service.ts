import { Criteria } from "@/types/criteria";
import { ENV } from "@/config/env";

export interface CalculationResult {
    id: number;
    name: string;
    pref_score: number;
}

export class CalculationService {
    static async calculateResults(criteria: Criteria): Promise<CalculationResult[]> {
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
}
