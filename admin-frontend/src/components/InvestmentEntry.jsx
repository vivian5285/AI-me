import React, { useState } from 'react';

const InvestmentEntry = () => {
  const [amount, setAmount] = useState(0);
  const [expectedProfit, setExpectedProfit] = useState(0);

  const calculateProfit = (value) => {
    // 预计收益计算逻辑
    const profit = value * 2; // 示例逻辑
    setExpectedProfit(profit);
  };

  return (
    <section>
      <h2>用户投资入口</h2>
      <div>
        <input
          type="number"
          placeholder="输入投资金额"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            calculateProfit(e.target.value);
          }}
        />
        <p>预计收益: {expectedProfit} USDT</p>
        <button onClick={() => {/* 投资确认逻辑 */}}>确认投资</button>
      </div>
    </section>
  );
};

export default InvestmentEntry;
