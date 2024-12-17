import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  locked?: boolean;
  onClick?: () => void;
}

export function AnimatedButton({ children, primary = false, locked = false, onClick }: AnimatedButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        group px-8 py-3 rounded-ltg flex items-center transition-all duration-500
        tracking-wider disabled:cursor-not-allowed
        ${primary
          ? 'bg-gray-800 hover:bg-emerald-900 text-gray-300 hover:text-emerald-100'
          : 'border border-gray-800 hover:border-emerald-800 text-gray-400 hover:text-emerald-300'}
      `}
      disabled={locked}
    >
      {children}
      <div className="ml-2 transition-transform duration-500">
        {locked ? (
          <Lock className="w-4 h-4 group-hover:scale-110 group-hover:translate-x-1 transition-transform" />
        ) : (
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        )}
      </div>
    </button>
  );
}
