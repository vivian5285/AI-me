
// 动态收益计算
const calculateDynamicRewards = (investment, level) => {
  const rewardRates = { 1: 0.05, 2: 0.02, 3: 0.01 }; // 直推5%，二级2%，三级1%
  return investment * (rewardRates[level] || 0);
};

// 示例：计算直推奖励
const directReward = calculateDynamicRewards(1000, 1); // 1000 USDT 投资，直推奖励
console.log(`直推奖励: ${directReward.toFixed(2)} USDT`);

// 示例：计算间推奖励
const indirectReward = calculateDynamicRewards(500, 2); // 500 USDT 投资，二级奖励
console.log(`间推奖励: ${indirectReward.toFixed(2)} USDT`);
