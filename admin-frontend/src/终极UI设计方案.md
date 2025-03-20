# AI Finance（聪明钱）— 终极 UI 设计 & 视觉体验方案 🚀

🔥 打造极致科技感 + 未来金融视觉体验 🔥

## 🎨 1. 整体 UI 设计风格
- **代码示例**：
  ```css
  body {
    background: linear-gradient(135deg, #000000, #4b0082);
    color: #ffffff;
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3 {
    color: #ffffff;
    text-shadow: 0 0 10px #8a2be2;
  }

  .neon-text {
    color: #ffffff;
    background: linear-gradient(90deg, #ff00ff, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: glow 1.5s infinite alternate;
  }

  @keyframes glow {
    from {
      text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff;
    }
    to {
      text-shadow: 0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff; /* 修正颜色一致性 */
    }
  }
  ```

## 📌 2. 主页 UI 设计
- **代码示例**：
  ```javascript
  // 动态滚动国旗
  const scrollFlags = () => {
    const flagContainer = document.querySelector('.flag-container');
    flagContainer.style.animation = 'scroll 10s linear infinite';
  };

  // 公链 LOGO 动画
  const animateLogos = () => {
    const logos = document.querySelectorAll('.blockchain-logo');
    logos.forEach((logo) => {
      logo.classList.add('floating');
    });
  };

  // 添加动态数字增长
  const animateNumbers = (element, targetValue) => {
    let currentValue = 0;
    const increment = targetValue / 100;
    const interval = setInterval(() => {
      currentValue = Math.min(currentValue + increment, targetValue); // 修正精度问题
      element.textContent = currentValue.toFixed(2); // 保留两位小数
      if (currentValue >= targetValue) {
        clearInterval(interval);
      }
    }, 30);
  };
  ```

## 📌 3. 用户投资面板
- **代码示例**：
  ```javascript
  // 实时收益计算器
  const calculateEarnings = (principal, staticRate, dynamicRate) => {
    if (principal < 0) principal = 0; // 修正负值输入
    const staticEarnings = principal * staticRate;
    const dynamicEarnings = principal * dynamicRate;
    return { staticEarnings, dynamicEarnings };
  };

  // 动态更新收益展示
  const updateEarningsDisplay = (principal) => {
    const { staticEarnings, dynamicEarnings } = calculateEarnings(principal, 0.03, 0.05);
    document.querySelector('#static-earnings').textContent = staticEarnings.toFixed(2);
    document.querySelector('#dynamic-earnings').textContent = dynamicEarnings.toFixed(2);
  };

  // 本金输入框事件监听
  document.querySelector('#principal-input').addEventListener('input', (e) => {
    const principal = parseFloat(e.target.value) || 0;
    updateEarningsDisplay(principal);
  });
  ```

## 📌 4. 邀请 & 团队管理
- **代码示例**：
  ```javascript
  // 动态生成二维码
  const generateQRCode = (inviteLink) => {
    if (!inviteLink) {
      console.error('Invite link is empty'); // 修正空值检查
      return;
    }
    const qrCodeElement = document.querySelector('#qr-code');
    qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(inviteLink)}&size=150x150`;
  };

  // 团队业绩柱状条动画
  const animateTeamPerformance = (element, targetValue) => {
    let currentValue = 0;
    const increment = targetValue / 100;
    const interval = setInterval(() => {
      currentValue += increment;
      element.style.width = `${currentValue}%`;
      if (currentValue >= targetValue) {
        clearInterval(interval);
      }
    }, 30);
  };
  ```

## 📌 5. 提现面板
- **代码示例**：
  ```javascript
  // 提现金额计算
  const calculateWithdrawal = (amount, feeRate) => {
    if (amount < 0) amount = 0; // 修正负值输入
    const fee = amount * feeRate;
    const netAmount = amount - fee;
    return { fee, netAmount };
  };

  // 提现输入框事件监听
  document.querySelector('#withdrawal-input').addEventListener('input', (e) => {
    const amount = parseFloat(e.target.value) || 0;
    const { fee, netAmount } = calculateWithdrawal(amount, 0.01);
    document.querySelector('#fee-display').textContent = fee.toFixed(2);
    document.querySelector('#net-amount-display').textContent = netAmount.toFixed(2);
  });
  ```

## 📌 6. AI 娱乐板块（预留入口）
- **代码示例**：
  ```javascript
  // 动态倒计时
  const startCountdown = (endDate) => {
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
  };
  ```

## 🎯 终极视觉体验总结
🔥 让用户一进入，就被震撼！  
🔥 投资面板 & 收益计算，清晰易懂！  
🔥 提现流畅，资金安全，增强信任感！  
🔥 小 Ai 机器人 & 动态视觉，科技感爆棚！  
🔥 复投 & 复利模式，让用户形成粘性循环！  

🚀 AI Finance（聪明钱）— 让科技感、投资体验、视觉冲击合为一体！ 💎
