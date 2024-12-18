import React from 'react';
import { motion } from 'framer-motion';
import { getLetterStatus } from './utils';

interface GuessGridProps {
  guesses: string[];
  currentGuess: string;
  secretWord: string;
}

export const GuessGrid: React.FC<GuessGridProps> = ({ guesses, currentGuess, secretWord }) => {
  const empties = Array(secretWord.length).fill('');
  const rows = Array(6).fill(empties);

  return (
    <div className="grid gap-1">
      {rows.map((_, rowIndex) => (
        <div key={rowIndex} className="flex gap-1 justify-center">
          {Array.from({ length: secretWord.length }).map((_, colIndex) => {
            const guess = guesses[rowIndex] || '';
            const letter = guess[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
            const status = guess ? getLetterStatus(guess, secretWord, colIndex) : '';

            let bgColor = 'bg-zinc-900';
            if (status === 'correct') bgColor = 'bg-emerald-900/30';
            if (status === 'present') bgColor = 'bg-amber-900/30';
            if (status === 'absent') bgColor = 'bg-zinc-800/30';

            return (
              <motion.div
                key={colIndex}
                initial={letter ? { scale: 0.8 } : false}
                animate={{ scale: 1 }}
                className={`w-10 h-10 ${bgColor} border border-zinc-600 flex items-center justify-center text-sm font-mono transition-colors`}
              >
                {letter}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};