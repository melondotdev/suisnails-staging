export function getLeagueInfo(points: number) {
  if (points >= 5001) {
    return {
      badgeSrc: '/assets/badges/diamond_transparent_bg.png',
      currentLeagueName: 'Diamond',
      currentMinPoints: 5001,
      nextMinPoints: null
    };
  } else if (points >= 3001) {
    return {
      badgeSrc: '/assets/badges/platinum_transparent_bg.png',
      currentLeagueName: 'Platinum',
      currentMinPoints: 3001,
      nextMinPoints: 5001
    };
  } else if (points >= 2001) {
    return {
      badgeSrc: '/assets/badges/gold_transparent_bg.png',
      currentLeagueName: 'Gold',
      currentMinPoints: 2001,
      nextMinPoints: 3001
    };
  } else if (points >= 1001) {
    return {
      badgeSrc: '/assets/badges/silver_transparent_bg.png',
      currentLeagueName: 'Silver',
      currentMinPoints: 1001,
      nextMinPoints: 2001
    };
  } else if (points >= 301) {
    return {
      badgeSrc: '/assets/badges/bronze_transparent_bg.png',
      currentLeagueName: 'Bronze',
      currentMinPoints: 301,
      nextMinPoints: 1001
    };
  } else if (points >= 101) {
    return {
      badgeSrc: '/assets/badges/iron_transparent_bg.png',
      currentLeagueName: 'Iron',
      currentMinPoints: 101,
      nextMinPoints: 301
    };
  } else if (points >= 31) {
    return {
      badgeSrc: '/assets/badges/copper_transparent_bg.png',
      currentLeagueName: 'Copper',
      currentMinPoints: 31,
      nextMinPoints: 101
    };
  } else if (points >= 1) {
    return {
      badgeSrc: '/assets/badges/wood_transparent_bg.png',
      currentLeagueName: 'Wood',
      currentMinPoints: 1,
      nextMinPoints: 31
    };
  } else {
    return {
      badgeSrc: '/assets/badges/wood_transparent_bg.png',
      currentLeagueName: 'Wood',
      currentMinPoints: 1,
      nextMinPoints: 31
    };
  }
}