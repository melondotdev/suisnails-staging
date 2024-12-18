import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { usePointsHandler } from '../../components/game/usePointsHandler';
import { GET_LEADERBOARD_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';
import WordleView from '../../components/game/wordle/WordleView';
import { getRandomEncryptionItem } from '../../components/game/wordle/encryptionGameConstants'; 
import { EncryptionItem } from '../../components/game/wordle/types';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface WordleProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Wordle: React.FC<WordleProps> = ({ walletData, isWalletConnected }) => {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [gameCompleted, setGameCompleted] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<EncryptionItem | null>(null);

  const handleAddPoints = usePointsHandler({ walletData, setLeaderboard, setUserPoints, setRemainingTime });
  const navigate = useNavigate();

  const fetchUserPoints = async () => {
    if (!walletData?.Address) return;
    try {
      const response = await fetch(GET_LEADERBOARD_URL);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      const updatedLeaderboard: LeaderboardEntry[] = data.leaderboard || [];
      setLeaderboard(updatedLeaderboard);

      const userEntry = updatedLeaderboard.find((entry) => entry.address === walletData.Address);
      setUserPoints(userEntry ? userEntry.points : 0);
    } catch (error) {
      console.error('Error fetching user points:', error);
    }
  };

  // Fetch user points when connected
  useEffect(() => {
    if (isWalletConnected && walletData?.Address) {
      fetchUserPoints();
    }
  }, [isWalletConnected, walletData]);

  // Fetch a new puzzle on mount and when replayed
  useEffect(() => {
    if (isWalletConnected) {
      setCurrentItem(getRandomEncryptionItem());
      setGameCompleted(false);
    }
  }, [isWalletConnected]);

  const handleGameComplete = () => {
    if (!gameCompleted) {
      handleAddPoints(10); // Award 10 points for success
      setGameCompleted(true);
    }
  };

  const handleReplay = () => {
    setGameCompleted(false);
    // Fetch a new puzzle to cause WordleView to remount
    setCurrentItem(getRandomEncryptionItem());
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate('/abyss')}
          className="flex items-center text-gray-400 hover:text-gray-200 transition-all duration-300 mb-6"
        >
          <span className="mr-2 text-2xl">&larr;</span> {/* Thin Back Arrow */}
          <span className="text-lg tracking-widest">back to abyss</span>
        </button>

        <h1 className="text-4xl font-bold mb-6 text-center">The Whispering Cypher</h1>

        {isWalletConnected ? (
          <div>
            <p className="text-center mb-4">Your Points: {userPoints}</p>
            <div className="max-w-4xl mx-auto">
              {currentItem && (
                <WordleView
                  key={currentItem.id} // Use the item id as key to force remount on new puzzle
                  item={currentItem}
                  onComplete={handleGameComplete}
                />
              )}
              {gameCompleted && (
                <div className="text-center mt-8">
                  <button
                    onClick={handleReplay}
                    className="bg-emerald-600 px-6 py-3 rounded hover:bg-emerald-700 transition-all duration-300 text-xl font-bold"
                  >
                    Replay
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">Please connect your wallet to participate.</p>
        )}
      </div>
    </div>
  );
};
