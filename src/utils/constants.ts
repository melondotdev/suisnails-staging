import { getFullnodeUrl } from '@mysten/sui.js/client';

export const DEFAULT_NETWORK = "mainnet";

export const NETWORKS = {
  localnet: { url: getFullnodeUrl('localnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
};

export const SUSNFT = "0x2411d5265d1370f5e54b33dfef8fd3689b75e6db701f488931b2b6f1a6772fb4"
export const SUSNFT_MAINTAINER = "0x6d39dbdc170cf3a66761c6963630c3d135d36c9cf8b7260fcb6f7df5dc8de452"

export const GET_LEADERBOARD_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/getLeaderboard';
export const ADD_POINTS_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/addPoints';
export const FETCH_CLAIMED_CHAPTERS_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/fetchChapters';
export const ADD_CHAPTERS_POINTS_URL = 'https://suisnails-server-d1v.netlify.app/.netlify/functions/addChapterPoints';

// Testing
// export const GET_LEADERBOARD_URL = 'http://localhost:8888/.netlify/functions/getLeaderboard';
// export const ADD_POINTS_URL = 'http://localhost:8888/.netlify/functions/addPoints';
// export const FETCH_CLAIMED_CHAPTERS_URL = 'http://localhost:8888/.netlify/functions/fetchChapters';
// export const ADD_CHAPTERS_POINTS_URL = 'http://localhost:8888/.netlify/functions/addChapterPoints';