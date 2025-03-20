import React from 'react';
import './TeamManagement.css';

function TeamManagement() {
  return (
    <div className="team-management">
      <h2>团队管理</h2>
      <div className="team-summary">
        <div className="team-item">
          <h3>大区业绩</h3>
          <p>$50,000</p>
        </div>
        <div className="team-item">
          <h3>小区业绩</h3>
          <p>$20,000</p>
        </div>
      </div>
      <div className="invite-section">
        <h3>邀请二维码</h3>
        <div className="qr-code">[二维码]</div>
      </div>
    </div>
  );
}

export default TeamManagement; 