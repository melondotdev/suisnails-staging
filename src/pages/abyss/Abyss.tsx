import React, { useState, useEffect } from 'react';
import { Header } from '../../components/header/Header';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface AbyssProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

// API URLs for Netlify functions
const GET_LEADERBOARD_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/getLeaderboard';
const ADD_POINTS_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/addPoints';

export const Abyss: React.FC<AbyssProps> = ({ walletData, isWalletConnected }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [remainingTime, setRemainingTime] = useState<number>(0); // Remaining time in seconds

  // Fetch the leaderboard from the backend
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(GET_LEADERBOARD_URL);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard);

      if (walletData?.Address) {
        const userEntry = data.leaderboard.find((entry) => entry.address === walletData.Address);
        setUserPoints(userEntry ? userEntry.points : 0);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  // Add points to the user
  const handleAddPoints = async () => {
    if (!walletData?.Address) return;

    try {
      const response = await fetch(ADD_POINTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletData.Address, points: 1 }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setRemainingTime(data.remainingTime); // Set remaining time
        return;
      }

      if (!response.ok) throw new Error('Failed to update points');

      const data = await response.json();
      setLeaderboard(data.leaderboard);

      const userEntry = data.leaderboard.find((entry) => entry.address === walletData.Address);
      setUserPoints(userEntry ? userEntry.points : 0);
      setRemainingTime(0); // Reset timer
    } catch (error) {
      console.error('Error updating points:', error);
    }
  };

  // Fetch the leaderboard when the wallet is connected
  useEffect(() => {
    if (isWalletConnected && walletData?.Address) {
      fetchLeaderboard();
    }
  }, [isWalletConnected, walletData]);

  // Countdown timer for rate limiting
  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />

      {/* Leaderboard Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-center">Abyss Leaderboard</h1>

        {isWalletConnected ? (
          <div className="text-center mb-8">
            <p className="mb-2">Your Wallet: {walletData.Address}</p>
            <p className="mb-4">Your Points: {userPoints}</p>
            {remainingTime > 0 ? (
              <p className="text-red-500 mb-4">
                You can earn points again in {remainingTime} seconds.
              </p>
            ) : (
              <button
                onClick={handleAddPoints}
                className="bg-emerald-600 px-6 py-2 rounded hover:bg-emerald-700 transition-all duration-300"
              >
                Earn 1 Point
              </button>
            )}
          </div>
        ) : (
          <p className="text-center text-red-500">Please connect your wallet to participate.</p>
        )}

        {/* Leaderboard Table */}
        <div className="max-w-3xl mx-auto">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-2">Rank</th>
                <th className="border border-gray-700 px-4 py-2">Wallet Address</th>
                <th className="border border-gray-700 px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, index) => (
                <tr key={entry.address} className="hover:bg-gray-800">
                  <td className="border border-gray-700 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-700 px-4 py-2">
                    {entry.address.substring(0, 6)}...{entry.address.slice(-4)}
                  </td>
                  <td className="border border-gray-700 px-4 py-2">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
