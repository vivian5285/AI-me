
/**
 * 计算星级晋升
 * @param {number} currentStars 当前星级
 * @param {number} points 当前积分
 * @returns {number} 新的星级
 */
function calculateStarUpgrade(currentStars, points) {
    // ...existing logic for star upgrade...
    if (points >= 100) {
        return currentStars + 1;
    }
    return currentStars;
}

/**
 * 计算静态收益
 * @param {number} baseIncome 基础收益
 * @param {number} multiplier 收益倍数
 * @returns {number} 静态收益
 */
function calculateStaticIncome(baseIncome, multiplier) {
    // ...existing logic for static income...
    return baseIncome * multiplier;
}

module.exports = {
    calculateStarUpgrade,
    calculateStaticIncome,
};
