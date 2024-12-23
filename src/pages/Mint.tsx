import React, { useState } from 'react';
import { Header } from '../components/header/Header';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface MintProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Mint: React.FC<MintProps> = ({ walletData, isWalletConnected }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  
  return (
    <div className="flex flex-col min-h-screen bg-black text-gray-200 pt-24 font-serif">
      <Header walletData={walletData} isWalletConnected={isWalletConnected} connectOption={true} />

      <div className="flex h-full">
        {/* Left Panel: Fixed TOC */}
        <aside
          className={`
            fixed top-0 left-0 h-[600px] transition-all duration-300 
            ${isMinimized ? 'w-12' : 'w-64'} flex flex-col overflow-y-auto mt-24 scrollbar-dark
          `}
        >
          {/* Sticky Header Section */}
          <div
            className="sticky top-0 z-10 flex items-center justify-end p-2"
          >
            <button
              onClick={() => setIsMinimized((prev) => !prev)}
              className="text-gray-400 hover:text-gray-200"
              title={isMinimized ? 'Expand' : 'Minimize'}
            >
              {isMinimized ? <ChevronRight /> : <ChevronLeft />}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
