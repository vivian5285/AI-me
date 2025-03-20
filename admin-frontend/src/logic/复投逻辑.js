// 复投逻辑
const checkReinvestment = (remainingRewards) => {
  if (remainingRewards <= 0) {
    console.log("待释放金额已为0，请复投以继续收益！");
    return false;
  }
  return true;
};

// 示例：检查复投
const remainingRewards = 0; // 假设待释放金额为0
if (!checkReinvestment(remainingRewards)) {
  console.log("收益已停止，请立即复投！");
}
