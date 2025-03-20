import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FinanceContract from './FinanceContract.json'; // 合约ABI
import './RewardsInfo.css'; // 添加样式文件

function RewardsInfo({ contractAddress }) {
  const [rewardsInfo, setRewardsInfo] = useState({
    starLevel: 0,
    nextStarLevelTarget: '',
    currentStarLevelBonus: 0,
    currentLevelReward: 0,
    nextLevelTarget: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchRewardsInfo = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, FinanceContract.abi, signer);

        const address = await signer.getAddress();
        const [starLevel, currentStarLevelBonus, currentLevelReward] = await contract.getUserRewardsInfo(address);
        
        const nextStarLevelTarget = calculateNextStarLevelTarget(starLevel);
        const nextLevelTarget = calculateNextLevelTarget(currentLevelReward);

        setRewardsInfo({
          starLevel: starLevel.toNumber(),
          nextStarLevelTarget,
          currentStarLevelBonus: ethers.utils.formatUnits(currentStarLevelBonus, 18),
          currentLevelReward: ethers.utils.formatUnits(currentLevelReward, 18),
          nextLevelTarget,
        });
      } catch (error) {
        setMessage(`获取奖励信息失败: ${error.message}`);
      }
    };

    fetchRewardsInfo();
  }, [contractAddress]);

  const calculateNextStarLevelTarget = (currentLevel) => {
    // 根据当前星级计算下一个星级的目标
    switch (currentLevel) {
      case 1: return '需要直推8人和团队总充值50,000 USDT';
      case 2: return '需要直推12人和团队总充值100,000 USDT';
      case 3: return '需要直推15人和团队总充值500,000 USDT';
      case 4: return '需要直推20人和团队总充值1,000,000 USDT';
      default: return '已达到最高星级';
    }
  };

  const calculateNextLevelTarget = (currentReward) => {
    // 根据当前团队层级奖计算下一个目标
    if (currentReward < 100) return '需要小区业绩10,000 USDT';
    if (currentReward < 500) return '需要小区业绩50,000 USDT';
    if (currentReward < 1500) return '需要小区业绩100,000 USDT';
    if (currentReward < 10000) return '需要小区业绩500,000 USDT';
    return '已达到最高奖励';
  };

  return (
    <div>
      <h2>奖励信息</h2>
      <p>当前星级: {rewardsInfo.starLevel}</p>
      <p>下一个星级目标: {rewardsInfo.nextStarLevelTarget}</p>
      <p>当前星级团队奖: {rewardsInfo.currentStarLevelBonus} USDT</p>
      <p>当前团队层级奖: {rewardsInfo.currentLevelReward} USDT</p>
      <p>下一个团队层级目标: {rewardsInfo.nextLevelTarget}</p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default RewardsInfo; 