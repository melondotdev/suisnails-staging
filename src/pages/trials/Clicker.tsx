import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';
import { usePointsHandler } from '../../components/game/usePointsHandler';
import { GET_LEADERBOARD_URL } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface ClickerProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Clicker: React.FC<ClickerProps> = ({ walletData, isWalletConnected }) => {
  const [userPoints, setUserPoints] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleAddPoints = usePointsHandler({ walletData, setLeaderboard, setUserPoints, setRemainingTime });
  const navigate = useNavigate(); // For navigating back to Abyss
  
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

  useEffect(() => {
    if (isWalletConnected && walletData?.Address) {
      fetchUserPoints();
    }
  }, [isWalletConnected, walletData]);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const handleClick = () => {
    if (!isWalletConnected || !walletData?.Address) return;
    handleAddPoints(1); // Add 1 point
  };

  return (
    <div
      className="min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif"
      style={{ backgroundImage: "url('/assets/labyrinth_background.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="absolute inset-0 bg-black/70" /> {/* Dark overlay */}

      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Back Button */}
        <button
          onClick={() => navigate('/abyss')}
          className="flex items-center text-gray-400 hover:text-emerald-400 transition-all duration-300 mb-6"
        >
          <span className="mr-2 text-2xl">&larr;</span> {/* Thin Back Arrow */}
          <span className="text-lg tracking-widest">back to abyss</span>
        </button>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6 text-center text-zinc-200 uppercase tracking-wide drop-shadow-lg">
          The Labyrinth of Suffering
        </h1>
        
        {/* Content */}
        {isWalletConnected ? (
          <div className="text-center mb-8">
            <p className="mb-4 text-lg text-gray-300 drop-shadow">
              Your Points: <span className="text-emerald-400 font-bold">{userPoints}</span>
            </p>
            <p className="text-zinc-400 font-mono text-sm max-w-md mx-auto mb-4 text-center">
            [ENCRYPTED_MESSAGE]: Beyond the twisting halls lies only despair. Each step forward bleeds another part of you into the void.
            </p>
            {remainingTime > 0 ? (
              <p className="text-red-500 mb-4 text-lg">
                You can try again in <span className="font-bold">{remainingTime} seconds</span>.
              </p>
            ) : (
              <button
                onClick={handleClick}
                className="px-8 py-3 text-xl font-bold text-gray-200 bg-emerald-700 rounded-lg shadow-lg 
                           hover:bg-emerald-500 hover:shadow-emerald-400 transition-all duration-300"
              >
                Endure the Agony
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500 text-lg">Please connect your wallet to participate.</p>
        )}
      </div>
    </div>
  );
};
