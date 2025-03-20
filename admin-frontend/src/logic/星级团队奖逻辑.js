// 星级团队奖计算
const calculateTeamBonus = (teamStaticRelease, teamRecharge, directReferrals) => {
  const starLevels = [
    { level: "⭐ 一星", recharge: 10000, referrals: 5, bonusRate: 0.03 },
    { level: "⭐⭐ 二星", recharge: 50000, referrals: 8, bonusRate: 0.05 },
    { level: "⭐⭐⭐ 三星", recharge: 100000, referrals: 12, bonusRate: 0.07 },
    { level: "⭐⭐⭐⭐ 四星", recharge: 500000, referrals: 15, bonusRate: 0.10 },
    { level: "⭐⭐⭐⭐⭐ 五星", recharge: 1000000, referrals: 20, bonusRate: 0.15 },
  ];

  for (const star of starLevels) {
    if (teamRecharge >= star.recharge && directReferrals >= star.referrals) {
      const bonus = teamStaticRelease * star.bonusRate;
      return { level: star.level, bonus: bonus.toFixed(2) };
    }
  }

  return { level: "未达标", bonus: "0.00" };
};

// 示例：计算星级团队奖
const teamBonus = calculateTeamBonus(5000, 60000, 10); // 团队每日静态释放5000 USDT，总充值60000 USDT，直推10人
console.log(`星级: ${teamBonus.level}`);
console.log(`团队分红: ${teamBonus.bonus} USDT`);
