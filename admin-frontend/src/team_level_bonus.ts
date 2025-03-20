
interface TeamPerformance {
    userId: string;
    totalPerformance: number; // 总业绩
    maxLinePerformance: number; // 用户业绩最多的一条线
    currentBonus: number; // 当前团队层级奖
    nextLevelThreshold: number; // 下个阶段的业绩门槛
}

function calculateTeamLevelBonus(performance: TeamPerformance) {
    const communityPerformance = performance.totalPerformance - performance.maxLinePerformance;
    const nextLevelGap = performance.nextLevelThreshold - communityPerformance;

    return {
        currentBonus: performance.currentBonus,
        communityPerformance,
        nextLevelGap: nextLevelGap > 0 ? nextLevelGap : 0,
    };
}

function displayTeamLevelBonus(performance: TeamPerformance) {
    const result = calculateTeamLevelBonus(performance);

    console.log("团队层级奖信息：");
    console.log(`当前团队层级奖：${result.currentBonus} 元`);
    console.log(`小区业绩：${result.communityPerformance} 元`);
    if (result.nextLevelGap > 0) {
        console.log(`距离下个阶段领取还需业绩：${result.nextLevelGap} 元`);
    } else {
        console.log("已达到最高阶段，无需额外业绩！");
    }
}

// 示例调用
const userPerformance: TeamPerformance = {
    userId: "user123",
    totalPerformance: 500000,
    maxLinePerformance: 300000,
    currentBonus: 20000,
    nextLevelThreshold: 250000,
};

displayTeamLevelBonus(userPerformance);
