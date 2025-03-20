import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CryptoPrices() {
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'bitcoin,ethereum,ripple,solana,dogecoin,bitcoin-cash,litecoin',
            vs_currencies: 'usd',
          },
        });
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
      }
    };

    fetchPrices();

    // 每分钟更新一次价格
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>实时加密货币价格</h2>
      <ul>
        <li>BTC: ${prices.bitcoin?.usd}</li>
        <li>ETH: ${prices.ethereum?.usd}</li>
        <li>XRP: ${prices.ripple?.usd}</li>
        <li>SOL: ${prices.solana?.usd}</li>
        <li>DOGE: ${prices.dogecoin?.usd}</li>
        <li>BCH: ${prices['bitcoin-cash']?.usd}</li>
        <li>LTC: ${prices.litecoin?.usd}</li>
      </ul>
    </div>
  );
}

export default CryptoPrices; 