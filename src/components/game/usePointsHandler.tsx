import { useCallback } from 'react';
import { ADD_POINTS_URL } from '../../utils/constants';

interface LeaderboardEntry {
  address: string;
  points: number;
}

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface UsePointsHandlerParams {
  walletData: WalletData;
  setLeaderboard: React.Dispatch<React.SetStateAction<LeaderboardEntry[]>>;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  setRemainingTime: React.Dispatch<React.SetStateAction<number>>;
}

export function usePointsHandler({
  walletData,
  setLeaderboard,
  setUserPoints,
  setRemainingTime
}: UsePointsHandlerParams) {
  
  const handleAddPoints = useCallback(async (points: number) => {
    if (!walletData?.Address) return;

    try {
      const response = await fetch(ADD_POINTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: walletData.Address, points }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setRemainingTime(data.remainingTime);
        return;
      }

      if (!response.ok) throw new Error('Failed to update points');

      const data = await response.json();
      const updatedLeaderboard: LeaderboardEntry[] = data.leaderboard || [];
      setLeaderboard(updatedLeaderboard);

      const userEntry = updatedLeaderboard.find((entry) => entry.address === walletData.Address);
      setUserPoints(userEntry ? userEntry.points : 0);
      setRemainingTime(0);
    } catch (error) {
      console.error('Error updating points:', error);
    }
  }, [walletData, setLeaderboard, setUserPoints, setRemainingTime]);

  return handleAddPoints;
}
