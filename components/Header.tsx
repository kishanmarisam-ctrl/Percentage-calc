
import React from 'react';

export const Header: React.FC = () => {
  return (
    <div className="pt-8 px-8 pb-4 text-center">
      <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">
        PercentCalc
      </h1>
      <p className="text-sm text-slate-400 mt-1">
        Precision math for everyday use
      </p>
    </div>
  );
};
