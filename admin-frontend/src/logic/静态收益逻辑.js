// 静态收益计算
const calculateStaticRewards = (investment) => {
  let multiplier;
  if (investment >= 10 && investment < 100) {
    multiplier = 1.5;
  } else if (investment >= 100 && investment < 300) {
    multiplier = 2;
  } else if (investment >= 300 && investment < 500) {
    multiplier = 2.5;
  } else if (investment >= 500 && investment <= 1000) {
    multiplier = 3;
  } else {
    throw new Error("投资金额不在支持范围内");
  }

  const totalRewards = investment * multiplier;
  const dailyReleaseRate = Math.random() * (1.5 - 0.5) + 0.5; // 随机释放 0.5%-1.5%
  const dailyRelease = totalRewards * (dailyReleaseRate / 100);

  return {
    totalRewards,
    dailyRelease: dailyRelease.toFixed(2),
  };
};

// 示例：计算静态收益
const staticRewards = calculateStaticRewards(200); // 200 USDT 投资
console.log(`总收益: ${staticRewards.totalRewards.toFixed(2)} USDT`);
console.log(`每日释放: ${staticRewards.dailyRelease} USDT`);
