
export enum Operation {
  ADD = 'add',
  SUBTRACT = 'subtract'
}

export interface CalculationState {
  baseValue: string;
  percentage: string;
  operation: Operation;
  extraValue: string;
}

export interface CalculationResult {
  percentAmount: number;
  intermediateResult: number;
  finalResult: number;
  isValid: boolean;
}
