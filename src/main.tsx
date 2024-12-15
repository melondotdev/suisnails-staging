import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { DEFAULT_NETWORK, NETWORKS } from './utils/constants.ts';
import './index.css';

import '@mysten/dapp-kit/dist/index.css';

import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { susTheme } from './styles/susTheme.tsx'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <SuiClientProvider networks={NETWORKS} defaultNetwork={DEFAULT_NETWORK}>
      <WalletProvider theme={susTheme}>
        <App />
      </WalletProvider>
    </SuiClientProvider>
  </QueryClientProvider>
);