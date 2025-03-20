
// 动态滚动国旗
function scrollFlags() {
  const flagContainer = document.querySelector('.flag-container');
  flagContainer.style.animation = 'scroll 10s linear infinite';
}

// 公链 LOGO 动画
function animateLogos() {
  const logos = document.querySelectorAll('.blockchain-logo');
  logos.forEach((logo) => {
    logo.classList.add('floating');
  });
}

// 添加动态数字增长
function animateNumbers(element, targetValue) {
  let currentValue = 0;
  const increment = targetValue / 100;
  const interval = setInterval(() => {
    currentValue += increment;
    element.textContent = Math.floor(currentValue);
    if (currentValue >= targetValue) {
      clearInterval(interval);
    }
  }, 30);
}

// 实时收益计算器
function calculateEarnings(principal, staticRate, dynamicRate) {
  const staticEarnings = principal * staticRate;
  const dynamicEarnings = principal * dynamicRate;
  return { staticEarnings, dynamicEarnings };
}

// 动态更新收益展示
function updateEarningsDisplay(principal) {
  const { staticEarnings, dynamicEarnings } = calculateEarnings(principal, 0.03, 0.05);
  document.querySelector('#static-earnings').textContent = staticEarnings.toFixed(2);
  document.querySelector('#dynamic-earnings').textContent = dynamicEarnings.toFixed(2);
}

// 本金输入框事件监听
document.querySelector('#principal-input').addEventListener('input', (e) => {
  const principal = parseFloat(e.target.value) || 0;
  updateEarningsDisplay(principal);
});

// 动态生成二维码
function generateQRCode(inviteLink) {
  const qrCodeElement = document.querySelector('#qr-code');
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inviteLink)}&size=150x150`;
}

// 团队业绩柱状条动画
function animateTeamPerformance(element, targetValue) {
  let currentValue = 0;
  const increment = targetValue / 100;
  const interval = setInterval(() => {
    currentValue += increment;
    element.style.width = `${currentValue}%`;
    if (currentValue >= targetValue) {
      clearInterval(interval);
    }
  }, 30);
}

// 提现金额计算
function calculateWithdrawal(amount, feeRate) {
  const fee = amount * feeRate;
  const netAmount = amount - fee;
  return { fee, netAmount };
}

// 提现输入框事件监听
document.querySelector('#withdrawal-input').addEventListener('input', (e) => {
  const amount = parseFloat(e.target.value) || 0;
  const { fee, netAmount } = calculateWithdrawal(amount, 0.01);
  document.querySelector('#fee-display').textContent = fee.toFixed(2);
  document.querySelector('#net-amount-display').textContent = netAmount.toFixed(2);
});

// 动态倒计时
function startCountdown(endDate) {
  const interval = setInterval(() => {
    const now = new Date();
    const timeLeft = endDate - now;
    if (timeLeft <= 0) {
      clearInterval(interval);
      document.querySelector('#countdown').textContent = '已上线！';
    } else {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
      document.querySelector('#countdown').textContent = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
    }
  }, 1000);
}
