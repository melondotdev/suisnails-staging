import React from 'react';
import { Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AnimatedButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  locked?: boolean;
  onClick?: () => void;
  to?: string; // New prop for navigation
}

export function AnimatedButton({
  children,
  primary = false,
  locked = false,
  onClick,
  to, // New navigation prop
}: AnimatedButtonProps) {
  const classNames = `
    group px-8 py-3 rounded-ltg flex items-center transition-all duration-500
    tracking-wider disabled:cursor-not-allowed
    ${primary
      ? 'bg-gray-800 hover:bg-emerald-900 text-gray-300 hover:text-emerald-100'
      : 'border border-gray-800 hover:border-emerald-800 text-gray-400 hover:text-emerald-300'}
  `;

  // If `to` is provided, use `Link`; otherwise, render a button
  if (to && !locked) {
    return (
      <Link to={to} className={classNames}>
        {children}
        <div className="ml-2 transition-transform duration-500">
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    );
  }

  // Default button behavior
  return (
    <button
      onClick={onClick}
      className={classNames}
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
