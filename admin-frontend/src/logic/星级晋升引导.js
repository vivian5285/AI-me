
// 更新星级晋升进度条
const updateRankProgress = (currentAmount, targetAmount) => {
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  const progressBar = document.querySelector('#rank-progress-bar');
  progressBar.style.width = `${progress}%`;
  progressBar.textContent = `${progress.toFixed(2)}%`;
};

// 示例：更新星级晋升进度
updateRankProgress(8000, 10000); // 当前业绩8000 USDT，目标业绩10000 USDT
