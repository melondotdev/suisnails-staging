import { LetterStatus } from './types';

export const getLetterStatus = (guess: string, secretWord: string, index: number): LetterStatus => {
  if (!guess) return '';
  
  const guessChar = guess[index];
  const solutionChar = secretWord[index];
  
  if (guessChar === solutionChar) {
    return 'correct';
  }

  if (secretWord.includes(guessChar)) {
    // Count occurrences of the letter in the solution
    const letterCount = secretWord.split('').filter(c => c === guessChar).length;
    
    // Count correct positions of this letter before this index
    const correctPositions = guess
      .split('')
      .slice(0, index)
      .filter((c, i) => c === guessChar && secretWord[i] === guessChar)
      .length;
    
    // Count present positions of this letter before this index
    const presentPositions = guess
      .split('')
      .slice(0, index)
      .filter((c, i) => c === guessChar && secretWord[i] !== guessChar && secretWord.includes(c))
      .length;

    if (correctPositions + presentPositions < letterCount) {
      return 'present';
    }
  }

  return 'absent';
};