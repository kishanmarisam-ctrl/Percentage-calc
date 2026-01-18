import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Operation, CalculationState, CalculationResult } from './types.ts';
import { Header } from './components/Header.tsx';
import { InputField } from './components/InputField.tsx';
import { ResultCard } from './components/ResultCard.tsx';

const App: React.FC = () => {
  const [state, setState] = useState<CalculationState>({
    baseValue: '',
    percentage: '',
    operation: Operation.ADD,
    extraValue: ''
  });

  const baseInputRef = useRef<HTMLInputElement>(null);
  const percInputRef = useRef<HTMLInputElement>(null);

  const calculation = useMemo((): CalculationResult => {
    const base = parseFloat(state.baseValue);
    const perc = parseFloat(state.percentage);
    const extra = parseFloat(state.extraValue) || 0;

    if (isNaN(base) || isNaN(perc)) {
      return { percentAmount: 0, intermediateResult: 0, finalResult: 0, isValid: false };
    }

    const percentAmount = base * (perc / 100);
    const intermediateResult = state.operation === Operation.ADD 
      ? base + percentAmount 
      : base - percentAmount;
    const finalResult = intermediateResult + extra;

    return {
      percentAmount,
      intermediateResult,
      finalResult,
      isValid: true
    };
  }, [state]);

  const copyToClipboard = (value: number) => {
    const formatted = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
    
    // Using navigator.clipboard which is modern standard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(formatted).catch(() => {
        // Silent failure as per UX constraints
      });
    }
  };

  // Auto-copy whenever calculation becomes valid and changes
  useEffect(() => {
    if (calculation.isValid) {
      copyToClipboard(calculation.finalResult);
    }
  }, [calculation.finalResult, calculation.isValid]);

  const handleInputChange = (field: keyof CalculationState, value: string) => {
    setState(prev => ({ ...prev, [field]: value }));
  };

  const handleBaseKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      percInputRef.current?.focus();
    }
  };

  const handlePercKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (calculation.isValid) {
        copyToClipboard(calculation.finalResult);
      }
      // Trigger a visual confirmation or blur if desired, 
      // but requirements just say calculate, format, display, copy.
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden transition-all">
        <Header />
        
        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-4">
            <InputField
              label="Base Number"
              value={state.baseValue}
              onChange={(v) => handleInputChange('baseValue', v)}
              onKeyDown={handleBaseKeyDown}
              placeholder="e.g. 100"
              autoFocus
              inputRef={baseInputRef}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="Percentage (%)"
                value={state.percentage}
                onChange={(v) => handleInputChange('percentage', v)}
                onKeyDown={handlePercKeyDown}
                placeholder="%"
                inputRef={percInputRef}
              />
              <div className="flex flex-col space-y-2">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
                  Operation
                </label>
                <select
                  value={state.operation}
                  onChange={(e) => handleInputChange('operation', e.target.value as Operation)}
                  className="h-12 w-full px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value={Operation.ADD}>Add %</option>
                  <option value={Operation.SUBTRACT}>Subtract %</option>
                </select>
              </div>
            </div>

            <InputField
              label="Extra Number (Optional)"
              value={state.extraValue}
              onChange={(v) => handleInputChange('extraValue', v)}
              placeholder="e.g. 25"
            />
          </div>

          <ResultCard result={calculation} operation={state.operation} />
        </div>
      </div>
    </div>
  );
};

export default App;