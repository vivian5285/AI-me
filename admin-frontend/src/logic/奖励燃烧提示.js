
// 检查奖励燃烧
const checkRewardBurn = (pendingAmount, requiredAmount) => {
  if (pendingAmount < requiredAmount) {
    alert('您的待释放金额不足，请充值以避免奖励燃烧！');
  }
};

// 示例：检查奖励燃烧
checkRewardBurn(50, 100); // 待释放金额50 USDT，所需金额100 USDT
