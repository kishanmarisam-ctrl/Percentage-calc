
import React from 'react';
import { CalculationResult, Operation } from '../types';

interface ResultCardProps {
  result: CalculationResult;
  operation: Operation;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, operation }) => {
  if (!result.isValid) {
    return (
      <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
        <p className="text-sm">Enter values to see results</p>
      </div>
    );
  }

  const format = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="mt-8 p-6 rounded-2xl bg-blue-50 border border-blue-100 flex flex-col space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex justify-between items-center text-xs font-medium text-blue-600/80 uppercase tracking-widest">
        <span>Calculation Breakdown</span>
      </div>

      <div className="space-y-2 text-sm text-slate-600">
        <div className="flex justify-between">
          <span>% Amount</span>
          <span className="font-mono">{format(result.percentAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span>{operation === Operation.ADD ? 'Added' : 'Subtracted'} Base</span>
          <span className="font-mono">{format(result.intermediateResult)}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-blue-200/50">
        <div className="flex justify-between items-end">
          <span className="text-sm font-semibold text-blue-800">Final Result</span>
          <span className="text-3xl font-bold text-blue-600 leading-none">
            {format(result.finalResult)}
          </span>
        </div>
      </div>
    </div>
  );
};
