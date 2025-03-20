import React, { useState } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';

function WalletConnector() {
  const [walletAddress, setWalletAddress] = useState('');

  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: "YOUR_INFURA_ID"
      }
    }
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions
    });

    try {
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);

      // 切换到BSC网络
      await provider.send("wallet_addEthereumChain", [{
        chainId: '0x38',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
          name: 'BNB',
          symbol: 'BNB',
          decimals: 18
        },
        rpcUrls: ['https://bsc-dataseed.binance.org/'],
        blockExplorerUrls: ['https://bscscan.com']
      }]);
    } catch (error) {
      console.error("钱包连接失败:", error);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>连接钱包</button>
      {walletAddress && <p>已连接钱包地址: {walletAddress}</p>}
    </div>
  );
}

export default WalletConnector;