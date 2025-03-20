import React from 'react';
import './DynamicEarningsLog.css';

function DynamicEarningsLog({ logs }) {
  return (
    <div>
      <h2>动态收益日志</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>{log.type}: {log.amount} USDT on {log.date}</li>
        ))}
      </ul>
    </div>
  );
}

export default DynamicEarningsLog; 