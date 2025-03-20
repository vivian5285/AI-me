
// 随机释放范围控制
const calculateDailyRelease = (totalAmount, minRate, maxRate) => {
  const randomRate = Math.random() * (maxRate - minRate) + minRate;
  return totalAmount * randomRate;
};

// 示例：计算每日释放金额
const dailyRelease = calculateDailyRelease(1000, 0.005, 0.015); // 总金额1000 USDT，释放范围0.5%-1.5%
console.log(`每日释放金额: ${dailyRelease.toFixed(2)} USDT`);
