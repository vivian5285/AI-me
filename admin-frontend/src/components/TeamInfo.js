import React from 'react';
import './TeamInfo.css';

function TeamInfo({ teamData }) {
  return (
    <div>
      <h2>团队信息</h2>
      <p>大区业绩: {teamData.majorAreaPerformance} USDT</p>
      <p>大区人数: {teamData.majorAreaMembers}</p>
      <p>小区业绩: {teamData.minorAreaPerformance} USDT</p>
      <p>小区人数: {teamData.minorAreaMembers}</p>
    </div>
  );
}

export default TeamInfo; 