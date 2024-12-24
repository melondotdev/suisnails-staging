import { useState, useEffect, useRef } from 'react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import { Grimoire } from './pages/Grimoire';
import { Abyss } from './pages/Abyss';
import { Footer } from './components/footer/Footer';
import fetchWalletData from './auth/FetchWalletData';
import { Clicker } from './pages/trials/Clicker';
import { Wordle } from './pages/trials/Wordle';
import { Novel } from './pages/Novel';
import { Mint } from './pages/Mint';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletData, setWalletData] = useState({});
  
  const { currentWallet, connectionStatus } = useCurrentWallet();
  const hasFetchedRef = useRef(false);

  // Check wallet connection status and fetch wallet data
  useEffect(() => {
    const checkWalletConnectionStatus = async () => {
      if (connectionStatus === 'connected') {
        if (!hasFetchedRef.current) {
          setIsWalletConnected(true);
          try {
            const walletDataSnapshot = await fetchWalletData(currentWallet.accounts[0].address);
            setWalletData(walletDataSnapshot);
            hasFetchedRef.current = true; // Ensure data fetch happens only once
          } catch (error) {
            console.error('Error fetching wallet data:', error);
          }
        }
      } else {
        setIsWalletConnected(false);
        setWalletData({});
        hasFetchedRef.current = false; // Reset fetch flag when disconnected
      }
    };
    
    checkWalletConnectionStatus();

    // Periodically check connection status
    const intervalId = setInterval(checkWalletConnectionStatus, 10000); // Check every 10 seconds
    
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [connectionStatus, currentWallet]);
  
  return (
    <div className="min-h-screen bg-black text-gray-200 font-mono">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grimoire" element={<Grimoire />} />
          <Route path="/novel" element={<Novel walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/game" element={<Abyss walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/game/abyss1" element={<Clicker walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/game/abyss2" element={<Wordle walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/game/abyss3" element={<Wordle walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/game/abyss4" element={<Wordle walletData={walletData} isWalletConnected={isWalletConnected} />} />
          <Route path="/mint" element={<Mint walletData={walletData} isWalletConnected={isWalletConnected} />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;