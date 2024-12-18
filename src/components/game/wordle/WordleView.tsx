import React from 'react';
import { PuzzleItem } from './PuzzleItem';
import { EncryptionItem } from './types';

interface WordleViewProps {
  item: EncryptionItem;
  onComplete: () => void;
}

export const WordleView: React.FC<WordleViewProps> = ({ item, onComplete }) => {
  return (
    <div className="p-4">
      <PuzzleItem item={item} onComplete={onComplete} />
    </div>
  );
};

// Add default export
export default WordleView;