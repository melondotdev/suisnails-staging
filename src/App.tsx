import { useState, useEffect, useRef } from 'react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home';
import fetchWalletData from './auth/FetchWalletData';

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
          <Route path="/" element={<Home walletData={walletData} isWalletConnected={isWalletConnected} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;