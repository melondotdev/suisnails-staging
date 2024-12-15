import React from 'react';

interface StatCardProps {
  value: string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="group">
      <div className="text-3xl font-bold text-gray-400 group-hover:text-emerald-400 transition-colors duration-500">
        {value}
      </div>
      <div className="text-sm text-gray-600 group-hover:text-emerald-600 transition-colors duration-500">
        {label}
      </div>
    </div>
  );
}