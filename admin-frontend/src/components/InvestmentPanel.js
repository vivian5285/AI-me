import React, { useState } from 'react';
import './InvestmentPanel.css';
// import { ethers } from 'ethers';
// import FinanceContract from './FinanceContract.json'; // 合约ABI

function InvestmentPanel() {
  const [investment, setInvestment] = useState(0);
  const [estimatedReturn, setEstimatedReturn] = useState(0);
  const [reinvestAmount, setReinvestAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleInvestmentChange = (e) => {
    const value = e.target.value;
    setInvestment(value);
    setEstimatedReturn(value * 2); // 简单的收益计算示例
  };

  const handleReinvest = () => {
    if (!reinvestAmount) {
      setMessage('请输入复投金额');
      return;
    }

    // 模拟复投成功
    setMessage('复投成功');
  };

  return (
    <div className="investment-panel">
      <h2>投资计算器</h2>
      <input
        type="number"
        value={investment}
        onChange={handleInvestmentChange}
        placeholder="输入投资金额"
      />
      <p>预期收益: ${estimatedReturn}</p>
      <h2>复投</h2>
      <input
        type="number"
        value={reinvestAmount}
        onChange={(e) => setReinvestAmount(e.target.value)}
        placeholder="输入复投金额"
      />
      <button onClick={handleReinvest}>复投</button>
      {message && <p>{message}</p>}
    </div>
  );
}

export default InvestmentPanel; 