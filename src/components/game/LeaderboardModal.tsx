import React from 'react';
import { X } from 'lucide-react';

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface LeaderboardModalProps {
  leaderboard: LeaderboardEntry[];
  walletAddress?: string;
  isWalletConnected: boolean;
  remainingTime: number;
  activeTab: 'personal' | 'top10';
  setActiveTab: (tab: 'personal' | 'top10') => void;
  onClose: () => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  leaderboard,
  walletAddress,
  isWalletConnected,
  remainingTime,
  activeTab,
  setActiveTab,
  onClose,
}) => {
  // Compute the entries to show based on the active tab.
  const displayedEntries = (() => {
    if (leaderboard.length === 0) return [];

    if (activeTab === 'top10') {
      // Show top 10 players
      return leaderboard.slice(0, 10);
    }

    // Personal tab: show user in the middle if possible
    const userIndex = leaderboard.findIndex((entry) => entry.address === walletAddress);
    if (userIndex === -1) {
      // If user is not found, just show top 10 as fallback
      return leaderboard.slice(0, Math.min(10, leaderboard.length));
    }

    // We want user in the middle with 4 above and 4 below if possible
    const start = Math.max(0, userIndex - 4);
    const end = Math.min(leaderboard.length, userIndex + 5); // +5 to include the user plus 4 below

    return leaderboard.slice(start, end);
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-lg p-6 text-gray-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Leaderboard</h2>
        
        {isWalletConnected ? (
          <div className="text-center mb-8">
            {remainingTime > 0 && (
              <p className="text-red-500 mb-4">
                You can earn points again in {remainingTime} seconds.
              </p>
            )}
            
            {/* Tabs for leaderboard view */}
            <div className="flex justify-center space-x-4 mb-4">
              <button
                onClick={() => setActiveTab('personal')}
                className={`px-4 py-2 rounded ${activeTab === 'personal' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                Personal
              </button>
              <button
                onClick={() => setActiveTab('top10')}
                className={`px-4 py-2 rounded ${activeTab === 'top10' ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
              >
                Top 10
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 mb-4">Please connect your wallet to participate.</p>
        )}

        <div className="max-w-md mx-auto overflow-auto max-h-64">
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr>
                <th className="border border-gray-700 px-4 py-2">Rank</th>
                <th className="border border-gray-700 px-4 py-2">Wallet Address</th>
                <th className="border border-gray-700 px-4 py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {displayedEntries.map((entry) => {
                // Find the original index of this entry in the full leaderboard to show the correct rank
                const originalIndex = leaderboard.findIndex((e) => e.address === entry.address);
                const rank = originalIndex + 1; // Ranks are 1-based

                const isUser = entry.address === walletAddress;

                return (
                  <tr
                    key={entry.address}
                    className={`hover:bg-gray-800 ${isUser ? 'bg-gray-800 border-l-4 border-emerald-500' : ''}`}
                  >
                    <td className="border border-gray-700 px-4 py-2">{rank}</td>
                    <td className="border border-gray-700 px-4 py-2">
                      {entry.address.substring(0, 6)}...{entry.address.slice(-4)}
                    </td>
                    <td className="border border-gray-700 px-4 py-2">{entry.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
