import React from 'react';
import { ConnectButton, useCurrentWallet, useDisconnectWallet } from '@mysten/dapp-kit';

interface ConnectWalletProps {
  disconnectionRequest: boolean;
  setDisconnectionRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConnectWallet: React.FC<ConnectWalletProps> = ({ disconnectionRequest, setDisconnectionRequest }) => {
  const { connectionStatus } = useCurrentWallet();
  const { mutate: disconnect } = useDisconnectWallet();
  
  return (
    <div className="relative inline-block">
      {connectionStatus === 'disconnected' ? (
        <ConnectButton connectText="CONNECT" className="connect-button h-8" />
      ) : (
        <React.Fragment>
          {disconnectionRequest && (
            <div 
              className="absolute right-0 z-10 mt-6 w-40 origin-top-right border
              text-center rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 
              ease-in-out duration-300 cursor-pointer hover:opacity-70"
            >
              <div className="py-0.5 text-zinc-400 font-mono text-sm" role="none">
                <p onClick={() => { 
                  disconnect(); 
                  setDisconnectionRequest(false); 
                }}>
                  Disconnect Wallet
                </p>
              </div>
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ConnectWallet;
