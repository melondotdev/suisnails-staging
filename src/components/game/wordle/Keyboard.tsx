import React from 'react';
import { KEY_ROWS } from './encryptionGameConstants';
import { LetterStatus } from './types';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  keyStatuses: Record<string, LetterStatus>;
}

export const Keyboard: React.FC<KeyboardProps> = ({
  onKeyPress,
  onDelete,
  onEnter,
  keyStatuses,
}) => {
  const getKeyStyle = (key: string) => {
    const status = keyStatuses[key];
    let bgColor = 'bg-zinc-800 hover:bg-zinc-700';
    if (status === 'correct') bgColor = 'bg-emerald-900/30 hover:bg-emerald-900/40';
    if (status === 'present') bgColor = 'bg-amber-900/30 hover:bg-amber-900/40';
    if (status === 'absent') bgColor = 'bg-zinc-900/30 hover:bg-zinc-900/40';
    return bgColor;
  };

  return (
    <div className="space-y-1.5">
      {KEY_ROWS.map((row, i) => (
        <div key={i} className="flex justify-center gap-1.5">
          {i === 2 && (
            <button
              onClick={onEnter}
              className="px-3 py-4 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono rounded-sm transition-colors"
            >
              ENTER
            </button>
          )}
          {row.map((key) => (
            <button
              key={key}
              onClick={() => onKeyPress(key)}
              className={`w-8 h-12 ${getKeyStyle(key)} text-xs font-mono rounded-sm transition-colors`}
            >
              {key}
            </button>
          ))}
          {i === 2 && (
            <button
              onClick={onDelete}
              className="px-3 py-4 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono rounded-sm transition-colors"
            >
              ←
            </button>
          )}
        </div>
      ))}
    </div>
  );
};