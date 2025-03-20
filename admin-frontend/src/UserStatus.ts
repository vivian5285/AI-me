export interface UserStatus {
    currentLevel: string; // 当前星级
    benefits: string[]; // 享受的权益
    goalsToNextLevel: number; // 距离下一个星级的目标
}

export function displayUserStatus(userStatus: UserStatus): string {
    return `
当前星级: ${userStatus.currentLevel}
享受权益: ${userStatus.benefits.join(', ')}
距离下一个星级还需完成目标: ${userStatus.goalsToNextLevel}
    `;
}
