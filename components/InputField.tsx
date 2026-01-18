import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  autoFocus?: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  onKeyDown,
  placeholder, 
  autoFocus,
  inputRef
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
        {label}
      </label>
      <input
        ref={inputRef}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="h-12 w-full px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all text-sm font-medium"
      />
    </div>
  );
};