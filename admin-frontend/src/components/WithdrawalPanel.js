import React, { useState } from 'react';
import './WithdrawalPanel.css';

function WithdrawalPanel() {
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [netAmount, setNetAmount] = useState(0);

  const handleWithdrawalChange = (e) => {
    const value = e.target.value;
    setWithdrawalAmount(value);
    setNetAmount(value * 0.99); // 扣除1%手续费
  };

  return (
    <div className="withdrawal-panel">
      <h2>提现</h2>
      <input
        type="number"
        value={withdrawalAmount}
        onChange={handleWithdrawalChange}
        placeholder="输入提现金额"
      />
      <p>到账金额: ${netAmount}</p>
    </div>
  );
}

export default WithdrawalPanel; 