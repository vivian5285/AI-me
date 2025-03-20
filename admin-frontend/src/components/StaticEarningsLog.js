import React from 'react';
import './StaticEarningsLog.css';

function StaticEarningsLog({ logs }) {
  return (
    <div>
      <h2>静态收益日志</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log.date}: {log.amount} USDT</li>
        ))}
      </ul>
    </div>
  );
}

export default StaticEarningsLog; 