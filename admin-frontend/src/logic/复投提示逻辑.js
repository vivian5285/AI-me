
// 检查复投需求
const checkReinvestment = (remainingAmount, totalAmount) => {
  const threshold = totalAmount * 0.1; // 剩余金额低于总金额的10%时提示
  if (remainingAmount <= threshold) {
    alert('您的收益即将释放完毕，请尽快复投以继续获得收益！');
  }
};

// 示例：检查复投提示
checkReinvestment(30, 300); // 剩余30 USDT，总金额300 USDT
