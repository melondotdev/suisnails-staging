import React, { useState } from 'react';
import { PuzzleItem } from './PuzzleItem';
import { getRandomEncryptionItem } from './encryptionGameConstants';

interface EncryptionGameProps {
  onSuccess: () => void;
  onFailure: () => void;
}

export const EncryptionGame: React.FC<EncryptionGameProps> = ({ 
  onSuccess,
  onFailure 
}) => {
  const [showMintButton, setShowMintButton] = useState(false);
  const [encryptionItem, setEncryptionItem] = useState(getRandomEncryptionItem());
  
  const handlePuzzleComplete = () => {
    setShowMintButton(true);
  };

  return (
    <div className="p-4 space-y-6 text-center">
      <div className="text-left">
        <PuzzleItem 
          item={encryptionItem}
          onComplete={handlePuzzleComplete}
          onFailed={onFailure}
        />
      </div>
      {showMintButton && (
        <div className="space-y-4">
          <p className="font-mono text-sm text-green-400">
            [STATUS]: DECRYPTION_SUCCESS
          </p>
        </div>
      )}
    </div>
  );
};
