import React, { useState, useEffect } from 'react';
import { Header } from '../components/header/Header';
import { FeatureCard } from '../components/ui/FeatureCard';
import { GET_LEADERBOARD_URL } from '../utils/constants';
import { ABYSS_GAMES } from '../utils/abyss_content'; 
import { BarChart } from 'lucide-react';
import { LeaderboardModal } from '../components/game/LeaderboardModal'; // Assume we have this from previous step
import { getLeagueInfo } from '../components/game/getLeagueInfo';

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

export const Abyss: React.FC<AbyssProps> = ({ walletData, isWalletConnected }) => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'personal' | 'top10'>('personal');
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [userPoints, setUserPoints] = useState<number>(0);
  const [userRank, setUserRank] = useState<number>(0);
  
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(GET_LEADERBOARD_URL);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      const updatedLeaderboard: LeaderboardEntry[] = data.leaderboard || [];
      setLeaderboard(updatedLeaderboard);

      if (walletData?.Address) {
        const userIndex = updatedLeaderboard.findIndex(e => e.address === walletData.Address);
        if (userIndex !== -1) {
          setUserRank(userIndex + 1); // rank is index+1
          setUserPoints(updatedLeaderboard[userIndex].points);
        } else {
          // User not on leaderboard, assume 0 points
          setUserPoints(0);
          setUserRank(updatedLeaderboard.length + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  };

  useEffect(() => {
    if (isWalletConnected && walletData?.Address) {
      fetchLeaderboard();
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

  const leagueInfo = getLeagueInfo(userPoints);
  const currentPoints = userPoints;
  const currentMin = leagueInfo.currentMinPoints;
  const nextMin = leagueInfo.nextMinPoints || (leagueInfo.currentLeagueName === 'Diamond' ? currentPoints : currentPoints + 1);
  const progressFraction = nextMin ? (currentPoints - currentMin) / (nextMin - currentMin) : 1;
  
  const shortenedWallet = walletData?.Address
    ? `${walletData.Address.substring(0, 6)}...${walletData.Address.slice(-4)}`
    : 'No Wallet';
    
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif items-center">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Top Section: Profile & Leaderboard Button */}
        <div className="flex items-center justify-between mb-8">
          {/* Profile Section */}
          {isWalletConnected ? (
            <div className="flex flex-col items-center py-3 px-4 rounded-lg border border-zinc-800">
              <div className='flex items-center gap-4'>
                <img src={leagueInfo.badgeSrc} alt={leagueInfo.currentLeagueName} className="w-10 h-10" />
                <span className="text-sm text-gray-400">{shortenedWallet}</span>
                <span className="text-sm text-gray-400">rank_{userRank}</span>
                <span className="text-sm text-gray-400">points_{userPoints}</span>
                {/* Leaderboard Button */}
                <button
                  onClick={() => setShowLeaderboardModal(true)}
                  className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 rounded px-4 py-2 transition-colors"
                >
                  <BarChart className="w-4 h-4 text-emerald-500" />
                </button>
              </div>
              {/* Progress Bar */}
              {nextMin && (
                <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                  <div
                    className="bg-emerald-700 h-full rounded-full transition-all"
                    style={{ width: `${(progressFraction * 100).toFixed(2)}%` }}
                  ></div>
                </div>
              )}
            </div>
          ) : (
            <p className="text-red-500">Connect your wallet to see your profile</p>
          )}

        </div>
      </div>

      {/* Game Gallery */}
      <div className="md:col-span-2 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {ABYSS_GAMES.map((game, idx) => (
            <div key={idx}>
              <FeatureCard
                imageSrc={game.imageSrc}
                title={game.title}
                description={game.description}
                link={game.link}
              />
            </div>
          ))}
        </div>
      </div>

      {showLeaderboardModal && (
        <LeaderboardModal
          leaderboard={leaderboard}
          walletAddress={walletData?.Address}
          isWalletConnected={isWalletConnected}
          remainingTime={remainingTime}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onClose={() => setShowLeaderboardModal(false)}
        />
      )}
    </div>
  );
};
