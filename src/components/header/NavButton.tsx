import React from 'react';
import { Lock } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavButtonProps {
  label: string;
  onClick?: () => void;
  locked?: boolean;
  to?: string; // Optional navigation route
}

export const NavButton: React.FC<NavButtonProps> = ({ label, onClick, locked = false, to }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = to ? location.pathname === to : false;

  const handleClick = () => {
    if (to) navigate(to);
    if (onClick) onClick();
  };

  return (
    <button
      onClick={handleClick}
      disabled={locked}
      className={`relative group flex items-center gap-2 px-4 py-2 text-zinc-400 hover:text-zinc-200 transition-colors disabled:cursor-not-allowed ${
        isActive ? 'underline underline-offset-4 decoration-emerald-500' : ''
      }`}
    >
      <span className="font-mono text-sm tracking-wide">{label}</span>
      {locked && <Lock className="w-3 h-3" />}
    </button>
  );
};
