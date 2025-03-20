import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>欢迎来到 AI Finance</h1>
      <div className="investment-summary">
        <div className="summary-item">
          <h2>总投资</h2>
          <p>$10,000</p>
        </div>
        <div className="summary-item">
          <h2>待释放金额</h2>
          <p>$5,000</p>
        </div>
        <div className="summary-item">
          <h2>每日收益</h2>
          <p>$50</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 