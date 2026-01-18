import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { InputField } from './components/InputField';
import { ResultCard } from './components/ResultCard';
import { CalculationResult, Operation } from './types';

const App: React.FC = () => {
  const [baseValue, setBaseValue] = useState<string>('');
  const [percentValue, setPercentValue] = useState<string>('');
  const [operation, setOperation] = useState<Operation>(Operation.ADD);
  const [result, setResult] = useState<CalculationResult>({
    isValid: false,
    percentAmount: 0,
    intermediateResult: 0,
    finalResult: 0,
  });

  // Automatically recalculate the result when inputs or operation type changes
  useEffect(() => {
    const base = parseFloat(baseValue);
    const percent = parseFloat(percentValue);

    if (!isNaN(base) && !isNaN(percent)) {
      const percentAmount = (base * percent) / 100;
      const finalResult = operation === Operation.ADD ? base + percentAmount : base - percentAmount;
      
      setResult({
        isValid: true,
        percentAmount,
        intermediateResult: base,
        finalResult,
      });
    } else {
      setResult({
        isValid: false,
        percentAmount: 0,
        intermediateResult: 0,
        finalResult: 0,
      });
    }
  }, [baseValue, percentValue, operation]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden">
        <Header />
        
        <div className="p-8 pt-4 space-y-6">
          {/* Operation Toggle */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setOperation(Operation.ADD)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                operation === Operation.ADD 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Add %
            </button>
            <button
              onClick={() => setOperation(Operation.SUBTRACT)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                operation === Operation.SUBTRACT 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Subtract %
            </button>
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <InputField
              label="Base Amount"
              value={baseValue}
              onChange={setBaseValue}
              placeholder="e.g. 100"
              autoFocus
            />
            <InputField
              label="Percentage"
              value={percentValue}
              onChange={setPercentValue}
              placeholder="e.g. 15"
            />
          </div>

          {/* Dynamic Result Display */}
          <ResultCard result={result} operation={operation} />
        </div>
      </div>
    </div>
  );
};

export default App;