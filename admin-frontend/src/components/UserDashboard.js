import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import FinanceContract from './FinanceContract.json'; // 合约ABI

function UserDashboard({ contractAddress }) {
  const [userInfo, setUserInfo] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, FinanceContract.abi, signer);

        const address = await signer.getAddress();
        const user = await contract.users(address);
        setUserInfo({
          totalInvestment: ethers.utils.formatUnits(user.totalInvestment, 18),
          pendingRelease: ethers.utils.formatUnits(user.pendingRelease, 18),
          releasedAmount: ethers.utils.formatUnits(user.releasedAmount, 18),
          starLevel: user.starLevel.toNumber(),
        });
      } catch (error) {
        setMessage(`获取用户信息失败: ${error.message}`);
      }
    };

    fetchUserInfo();
  }, [contractAddress]);

  return (
    <div>
      <h2>用户信息</h2>
      <p>总投资: {userInfo.totalInvestment} USDT</p>
      <p>待释放金额: {userInfo.pendingRelease} USDT</p>
      <p>已释放金额: {userInfo.releasedAmount} USDT</p>
      <p>星级: {userInfo.starLevel}</p>
      {message && <p>{message}</p>}
    </div>
  );
}

export default UserDashboard; 