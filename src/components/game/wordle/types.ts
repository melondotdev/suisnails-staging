export type LetterStatus = 'correct' | 'present' | 'absent' | '';

export interface EncryptionItem {
  id: number;
  timestamp: string;
  word: string;
  logs: string[];
}

export interface GuessResult {
  letter: string;
  status: LetterStatus;
}