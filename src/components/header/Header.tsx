import React, { useState } from 'react';
import { NavButton } from './NavButton';
import { Link } from 'react-router-dom';
import ConnectWallet from '../../auth/ConnectWallet';
import { Menu, X } from 'lucide-react'; // For hamburger menu icons

interface WalletData {
  Address?: string;
  Balance?: number;
}

interface HeaderProps {
  walletData: WalletData;
  isWalletConnected: boolean;
}

export const Header: React.FC<HeaderProps> = ({ walletData, isWalletConnected }) => {
  const [disconnectionRequest, setDisconnectionRequest] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu
  
  return (
    <header className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-sm border-b border-zinc-900 z-50 font-mono text-s text-zinc-400">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="w-6 h-6 text-zinc-200 hover:text-emerald-500 transition-colors duration-300">
            SUI_SNAILS
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          {menuOpen ? (
            <X 
              className="w-6 h-6 text-zinc-200 hover:text-emerald-500 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu 
              className="w-6 h-6 text-zinc-200 hover:text-emerald-500 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto bg-zinc-950 md:bg-transparent md:flex md:items-center gap-6 transition-all duration-300 ${
            menuOpen ? 'flex flex-col items-start px-4 py-4 border-t border-zinc-900' : 'hidden md:flex'
          }`}
        >
          <NavButton label="MINT" onClick={() => {}} locked={true} />
          <NavButton label="STAKE" onClick={() => {}} locked={true} />
          <NavButton label="GRIMOIRE" to="/grimoire" locked={false} />
          
          {/* {isWalletConnected ? (
            <div className="flex items-center gap-2 relative">
              <div
                className="flex items-center gap-2 hover:text-zinc-100 cursor-pointer transition"
                onClick={() => setDisconnectionRequest(!disconnectionRequest)}
              >
                <p>{(parseInt(walletData?.Balance?.toString() || '0') / 1000000000).toFixed(2)}</p>
                <p>SUI</p>
              </div>
              <ConnectWallet
                disconnectionRequest={disconnectionRequest}
                setDisconnectionRequest={setDisconnectionRequest}
              />
            </div>
          ) : (
            <ConnectWallet
              disconnectionRequest={disconnectionRequest}
              setDisconnectionRequest={setDisconnectionRequest}
            />
          )} */}
        </nav>
      </div>
    </header>
  );
};
