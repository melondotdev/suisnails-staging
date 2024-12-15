import { DEFAULT_NETWORK } from "../utils/constants";

export interface WalletData {
  Address: string;
  Balance: number;
}

const fetchWalletData = async (currentWallet: string | null): Promise<WalletData | []> => {
  if (!currentWallet) return []; // Return an empty array if the wallet is not available
  
  const queryBalance = `
    query {
      owner (address: "${currentWallet}") {
        balance {
          totalBalance
        }
      }
    }`;

  try {
    const response1 = await fetch(`https://sui-${DEFAULT_NETWORK}.mystenlabs.com/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: queryBalance }),
    });

    const jsonData1 = await response1.json();

    const suiBalance = jsonData1?.data?.owner?.balance?.totalBalance ?? 0;

    const walletDataArray: WalletData = {
      Address: currentWallet,
      Balance: suiBalance,
    };

    return walletDataArray;
  } catch (error) {
    console.error("Error fetching wallet data:", error);
    return []; // Return an empty array in case of an error
  }
};

export default fetchWalletData;
