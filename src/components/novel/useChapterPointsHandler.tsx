import { useCallback } from 'react';
import { ADD_CHAPTERS_POINTS_URL, FETCH_CLAIMED_CHAPTERS_URL } from '../../utils/constants';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface UseChapterPointsHandlerParams {
  walletData: WalletData;
  setUserPoints: React.Dispatch<React.SetStateAction<number>>;
  setClaimedChapters: React.Dispatch<React.SetStateAction<Set<number>>>;
}

export function useChapterPointsHandler({
  walletData,
  setUserPoints,
  setClaimedChapters,
}: UseChapterPointsHandlerParams) {
  // Function to fetch claimed chapters
  const fetchClaimedChapters = useCallback(async () => {
    if (!walletData?.Address) return;

    try {
      const response = await fetch(
        `${FETCH_CLAIMED_CHAPTERS_URL}?address=${encodeURIComponent(walletData.Address)}`
      );

      if (!response.ok) throw new Error('Failed to fetch claimed chapters');

      const data = await response.json();
      setClaimedChapters(new Set(data.claimedChapters || []));
    } catch (error) {
      console.error('Error fetching claimed chapters:', error);
    }
  }, [walletData, setClaimedChapters]);

  // Function to add points for a specific chapter
  const handleAddPoints = useCallback(
    async (points: number, chapterIndex: number) => {
      if (!walletData?.Address) return;
      
      try {
        const response = await fetch(ADD_CHAPTERS_POINTS_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            address: walletData.Address,
            points,
            chapterIndex,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error:', errorData);
          throw new Error('Failed to add points');
        }

        const data = await response.json();
        setUserPoints(data.points || 0); // Update user points
        setClaimedChapters((prev) => new Set([...prev, chapterIndex])); // Add claimed chapter
      } catch (error) {
        console.error('Error adding points:', error);
      }
    },
    [walletData, setUserPoints, setClaimedChapters]
  );

  return { fetchClaimedChapters, handleAddPoints };
}
