import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GuessGrid } from './GuessGrid';
import { Keyboard } from './Keyboard';
import { EncryptionItem, LetterStatus } from './types';
import { MAX_ATTEMPTS } from './encryptionGameConstants';

interface PuzzleItemProps {
  item: EncryptionItem;
  onComplete: () => void;
  onFailed: () => void;
}

export const PuzzleItem: React.FC<PuzzleItemProps> = ({ item, onComplete, onFailed }) => {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const [keyStatuses, setKeyStatuses] = useState<Record<string, LetterStatus>>({});
  const [showingLogs, setShowingLogs] = useState(false);
  const [currentLogIndex, setCurrentLogIndex] = useState(0);

  const SECRET_WORD = item.word;

  useEffect(() => {
    if (guesses.length === MAX_ATTEMPTS && !isSolved) {
      onFailed();
    }
  }, [guesses, isSolved, onFailed]);

  useEffect(() => {
    if (isSolved && currentLogIndex < item.logs.length) {
      const timer = setTimeout(() => {
        setCurrentLogIndex(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    } else if (isSolved && currentLogIndex === item.logs.length) {
      const timer = setTimeout(() => {
        onComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSolved, currentLogIndex, item.logs.length, onComplete]);

  const addLetter = (letter: string) => {
    if (!isSolved && currentGuess.length < SECRET_WORD.length) {
      setCurrentGuess(prev => prev + letter);
    }
  };

  const removeLetter = () => {
    if (!isSolved && currentGuess.length > 0) {
      setCurrentGuess(prev => prev.slice(0, -1));
    }
  };

  const updateKeyStatuses = (guess: string) => {
    const newKeyStatuses = { ...keyStatuses };

    [...guess].forEach((letter, index) => {
      if (SECRET_WORD[index] === letter) {
        newKeyStatuses[letter] = 'correct';
      } else if (SECRET_WORD.includes(letter)) {
        // If not already correct, mark as present
        if (newKeyStatuses[letter] !== 'correct') {
          newKeyStatuses[letter] = 'present';
        }
      } else {
        newKeyStatuses[letter] = 'absent';
      }
    });

    setKeyStatuses(newKeyStatuses);
  };

  const submitGuess = () => {
    if (isSolved) return;
    if (currentGuess.length === SECRET_WORD.length) {
      const newGuess = currentGuess.toUpperCase();
      const newGuesses = [...guesses, newGuess];
      setGuesses(newGuesses);
      updateKeyStatuses(newGuess);
      setCurrentGuess('');

      if (newGuess === SECRET_WORD) {
        setIsSolved(true);
        setShowingLogs(true);
      } else if (newGuesses.length === MAX_ATTEMPTS) {
        onFailed();
      }
    }
  };

  return (
    <div className="space-y-6">
      <AnimatePresence>
      {showingLogs ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="font-mono text-sm space-y-1 text-green-500/70 text-center" // Added text-center here
        >
          {item.logs.slice(0, currentLogIndex).map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {log}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <>
          <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto mb-4 text-center">
            [ENCRYPTED_MESSAGE]: Solve the void sequence to unlock forbidden knowledge.
          </p>
          <GuessGrid
            guesses={guesses}
            currentGuess={currentGuess}
            secretWord={SECRET_WORD}
          />
          <Keyboard
            onKeyPress={addLetter}
            onDelete={removeLetter}
            onEnter={submitGuess}
            keyStatuses={keyStatuses}
          />
        </>
      )}
      </AnimatePresence>
    </div>
  );
};
