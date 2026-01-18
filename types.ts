// Define the available operations for the percentage calculator
export enum Operation {
  ADD = 'ADD',
  SUBTRACT = 'SUBTRACT',
}

// Interface representing the outcome of a calculation
export interface CalculationResult {
  isValid: boolean;
  percentAmount: number;
  intermediateResult: number;
  finalResult: number;
}
