import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FinanceContract from './FinanceContract.json'; // 合约ABI
import './MyAccount.css'; // 添加样式文件

function MyAccount({ contractAddress }) {
  const [accountInfo, setAccountInfo] = useState({
    totalInvestment: 0,
    pendingRelease: 0,
    availableWithdrawal: 0,
    starLevel: 0,
    dynamicRewards: 0,
    differentialReward: 0,
    levelRewards: 0,
    needsReinvestment: false,
    teamPerformance: 0,
    starLevelBonus: 0,
  });
  const [message, setMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const thresholdPercentage = 20; // 定义一个百分比阈值，比如20%

  useEffect(() => {
    const fetchAccountInfo = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, FinanceContract.abi, signer);

        const address = await signer.getAddress();
        const [totalInvestment, pendingRelease, availableWithdrawal, starLevel, dynamicRewards, differentialReward, levelRewards, needsReinvestment, teamPerformance, starLevelBonus] = await contract.getUserInfo(address);
        setAccountInfo({
          totalInvestment: ethers.utils.formatUnits(totalInvestment, 18),
          pendingRelease: ethers.utils.formatUnits(pendingRelease, 18),
          availableWithdrawal: ethers.utils.formatUnits(availableWithdrawal, 18),
          starLevel: starLevel.toNumber(),
          dynamicRewards: ethers.utils.formatUnits(dynamicRewards, 18),
          differentialReward: ethers.utils.formatUnits(differentialReward, 18),
          levelRewards: ethers.utils.formatUnits(levelRewards, 18),
          needsReinvestment,
          teamPerformance: ethers.utils.formatUnits(teamPerformance, 18),
          starLevelBonus: ethers.utils.formatUnits(starLevelBonus, 18),
        });
      } catch (error) {
        setMessage(`获取账户信息失败: ${error.message}`);
      }
    };

    fetchAccountInfo();
  }, [contractAddress]);

  useEffect(() => {
    const totalPending = accountInfo.totalInvestment * 3; // 假设总待释放金额为投资的300%
    const currentPercentage = (accountInfo.pendingRelease / totalPending) * 100;
    if (currentPercentage <= thresholdPercentage && !showAlert) {
      setShowAlert(true);
    }
  }, [accountInfo.pendingRelease, thresholdPercentage, showAlert]);

  const getProgressColor = (value) => {
    if (value < 30) return 'red';
    if (value < 70) return 'yellow';
    return 'green';
  };

  return (
    <div>
      <h2>我的账户</h2>
      <div className="progress-bar" style={{ width: `${accountInfo.pendingRelease}%`, backgroundColor: getProgressColor(accountInfo.pendingRelease) }}>
        {accountInfo.pendingRelease}%
      </div>
      <p>总投资累计金额: {accountInfo.totalInvestment} USDT</p>
      <p>待释放金额: {accountInfo.pendingRelease} USDT</p>
      <p>可提现金额: {accountInfo.availableWithdrawal} USDT</p>
      <p>星级: {accountInfo.starLevel}</p>
      <p>动态收益: {accountInfo.dynamicRewards} USDT</p>
      <p>极差奖: {accountInfo.differentialReward} USDT</p>
      <p>团队层级奖: {accountInfo.levelRewards} USDT</p>
      <p>团队业绩: {accountInfo.teamPerformance} USDT</p>
      <p>星级团队奖: {accountInfo.starLevelBonus} USDT</p>
      <p>需要复投: {accountInfo.needsReinvestment ? '是' : '否'}</p>
      <p>每日收益释放范围：0.5% - 3%</p>
      {message && <p>{message}</p>}
      {showAlert && (
        <div className="alert">
          <p>您的待释放金额接近临界值，请增加投资以继续获得收益。</p>
          <button onClick={() => setShowAlert(false)}>关闭</button>
        </div>
      )}
    </div>
  );
}

export default MyAccount; 