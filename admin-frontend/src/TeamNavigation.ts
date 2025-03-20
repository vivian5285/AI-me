export interface TeamPerformance {
    regionName: string; // 区域名称
    performance: number; // 业绩
    members: number; // 人数
    subRegions?: TeamPerformance[]; // 子区域
}

export function displayTeamNavigation(teamData: TeamPerformance[]): string {
    const renderRegion = (region: TeamPerformance, level: number = 0): string => {
        const indent = ' '.repeat(level * 2);
        let result = `${indent}区域: ${region.regionName}, 业绩: ${region.performance}, 人数: ${region.members}\n`;
        if (region.subRegions) {
            for (const subRegion of region.subRegions) {
                result += renderRegion(subRegion, level + 1);
            }
        }
        return result;
    };

    return teamData.map(region => renderRegion(region)).join('\n');
}
