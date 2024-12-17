import React from 'react';
import BgImage from '/assets/background.webp';
import { Header } from '../../components/header/Header';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface AbyssProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Abyss: React.FC<AbyssProps> = ({ walletData, isWalletConnected }) => {
  return (
    <div className="min-h-screen bg-black text-gray-200 pt-24 relative overflow-hidden font-serif">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 grayscale hover:grayscale-0 transition-all duration-700"
        style={{ backgroundImage: `url(${BgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black" />
    </div>
  );
};
