import { getFullnodeUrl } from '@mysten/sui.js/client';

export const DEFAULT_NETWORK = "testnet";

export const NETWORKS = {
  localnet: { url: getFullnodeUrl('localnet') },
  devnet: { url: getFullnodeUrl('devnet') },
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl(DEFAULT_NETWORK) },
};

export const SUSNFT = "0x2411d5265d1370f5e54b33dfef8fd3689b75e6db701f488931b2b6f1a6772fb4"
export const SUSNFT_MAINTAINER = "0x6d39dbdc170cf3a66761c6963630c3d135d36c9cf8b7260fcb6f7df5dc8de452"