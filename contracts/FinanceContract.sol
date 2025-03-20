// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract FinanceContract {
    address public owner;
    address public usdtTokenAddress = 0x...; // USDT (BEP20) 合约地址
    mapping(address => User) public users;
    mapping(address => address) public referrals; // 记录推荐关系

    struct User {
        uint256 totalInvestment;
        uint256 pendingRelease;
        uint256 releasedAmount;
        uint256 directReferrals;
        uint256 teamInvestment;
        bool hasReinvested;
        uint256 starLevel;
    }

    constructor() {
        owner = msg.sender;
    }

    function invest(uint256 amount) public {
        require(IERC20(usdtTokenAddress).transferFrom(msg.sender, address(this), amount), "USDT transfer failed");
        // 处理投资逻辑
    }

    function deposit(uint256 amount, address referrer) public {
        require(amount > 0, "Deposit amount must be greater than zero");
        require(IERC20(usdtTokenAddress).transferFrom(msg.sender, address(this), amount), "USDT transfer failed");

        User storage user = users[msg.sender];
        user.totalInvestment += amount;
        user.pendingRelease += calculateStaticEarnings(amount);
        user.hasReinvested = false;

        // 处理推荐关系
        if (referrals[msg.sender] == address(0) && referrer != msg.sender) {
            referrals[msg.sender] = referrer;
            users[referrer].directReferrals += 1;
        }

        // 处理动态收益
        distributeDynamicRewards(msg.sender, amount);
    }

    function distributeDynamicRewards(address investor, uint256 amount) internal {
        address referrer = referrals[investor];
        if (referrer != address(0)) {
            // 直推奖励：5%
            uint256 directReward = amount * 5 / 100;
            users[referrer].releasedAmount += directReward;
            if (users[referrer].pendingRelease >= directReward) {
                users[referrer].pendingRelease -= directReward; // 待释放金额减少
            } else {
                users[referrer].pendingRelease = 0; // 防止负值
            }

            address secondLevelReferrer = referrals[referrer];
            if (secondLevelReferrer != address(0)) {
                // 二级奖励：2%
                uint256 secondLevelReward = amount * 2 / 100;
                users[secondLevelReferrer].releasedAmount += secondLevelReward;
                if (users[secondLevelReferrer].pendingRelease >= secondLevelReward) {
                    users[secondLevelReferrer].pendingRelease -= secondLevelReward; // 待释放金额减少
                } else {
                    users[secondLevelReferrer].pendingRelease = 0; // 防止负值
                }

                address thirdLevelReferrer = referrals[secondLevelReferrer];
                if (thirdLevelReferrer != address(0)) {
                    // 三级奖励：1%
                    uint256 thirdLevelReward = amount * 1 / 100;
                    users[thirdLevelReferrer].releasedAmount += thirdLevelReward;
                    if (users[thirdLevelReferrer].pendingRelease >= thirdLevelReward) {
                        users[thirdLevelReferrer].pendingRelease -= thirdLevelReward; // 待释放金额减少
                    } else {
                        users[thirdLevelReferrer].pendingRelease = 0; // 防止负值
                    }
                }
            }
        }
    }

    function calculateStaticEarnings(uint256 investment) internal pure returns (uint256) {
        if (investment >= 10 && investment < 100) {
            return investment * 15 / 10; // 1.5倍
        } else if (investment >= 100 && investment < 300) {
            return investment * 2; // 2倍
        } else if (investment >= 300 && investment < 500) {
            return investment * 25 / 10; // 2.5倍
        } else if (investment >= 500 && investment <= 1000) {
            return investment * 3; // 3倍
        } else {
            return 0;
        }
    }

    function releaseEarnings() public {
        User storage user = users[msg.sender];
        require(user.pendingRelease > 0, "No pending release");

        uint256 releaseAmount = user.pendingRelease * (5 + (block.timestamp % 11)) / 1000; // 0.5% - 1.5%
        if (releaseAmount > user.pendingRelease) {
            releaseAmount = user.pendingRelease;
        }

        user.pendingRelease -= releaseAmount; // 待释放金额减少
        user.releasedAmount += releaseAmount;
        require(IERC20(usdtTokenAddress).transfer(msg.sender, releaseAmount), "USDT transfer failed");

        // 检查是否需要复投
        if (user.pendingRelease == 0 && !user.hasReinvested) {
            revert("Must reinvest to continue receiving earnings");
        }
    }

    function withdraw(uint256 amount) public {
        User storage user = users[msg.sender];
        require(user.releasedAmount >= amount, "Insufficient released amount");
        require(amount >= 10 * 1e18, "Minimum withdrawal is 10 USDT"); // 确保最低提现金额为10 USDT
        require(amount > 0, "Withdraw amount must be greater than zero");

        uint256 fee = amount / 100; // 1% fee
        uint256 amountAfterFee = amount - fee;

        user.releasedAmount -= amount;
        require(IERC20(usdtTokenAddress).transfer(msg.sender, amountAfterFee), "USDT transfer failed");
    }

    function reinvest(uint256 amount) public {
        User storage user = users[msg.sender];
        require(user.releasedAmount >= amount, "Insufficient released amount for reinvestment");
        require(amount > 0, "Reinvestment amount must be greater than zero");

        user.releasedAmount -= amount;
        user.pendingRelease += calculateStaticEarnings(amount);
        user.hasReinvested = true; // 标记用户已复投

        // 根据复投金额调整倍数奖励
        adjustMultiplierBasedOnReinvestment(amount);
    }

    function adjustMultiplierBasedOnReinvestment(uint256 amount) internal {
        // 根据复投金额调整用户的倍数奖励
        // 例如，复投金额越大，倍数奖励越高
    }

    function calculateTeamRewards(address user) internal view returns (uint256) {
        // 计算用户的星级团队奖
        // 需要根据用户的团队总充值和直推人数来计算
        // 返回计算出的团队奖金额
    }

    function distributeTeamRewards() public {
        // 分配星级团队奖和极差奖
        // 确保用户满足条件后才能领取
    }

    function getUserInfo(address userAddress) public view returns (uint256 totalInvestment, uint256 pendingRelease, uint256 availableWithdrawal) {
        User storage user = users[userAddress];
        totalInvestment = user.totalInvestment;
        pendingRelease = user.pendingRelease;
        availableWithdrawal = user.releasedAmount; // Assuming releasedAmount is the available withdrawal
        return (totalInvestment, pendingRelease, availableWithdrawal);
    }

    function calculateDifferentialReward(address user) internal view returns (uint256) {
        // 判断用户与下级用户的星级是否相同
        uint256 differentialReward = 0;

        address[] memory downlines = getDownlines(user); // 获取用户的下级
        for (uint256 i = 0; i < downlines.length; i++) {
            if (users[user].starLevel == users[downlines[i]].starLevel) {
                differentialReward += users[downlines[i]].teamInvestment * 3 / 100; // 极差奖3%
            }
        }

        return differentialReward;
    }

    function calculateMinorAreaPerformance(address user) internal view returns (uint256) {
        // 计算用户的小区业绩，去掉大区业绩
        uint256 totalPerformance = users[user].teamInvestment;
        uint256 maxLinePerformance = 0;

        // 遍历用户的下级，找到最大一条线的业绩
        // 需要实现逻辑来获取下级用户及其业绩
        address[] memory downlines = getDownlines(user); // 获取用户的下级
        for (uint256 i = 0; i < downlines.length; i++) {
            uint256 downlinePerformance = users[downlines[i]].teamInvestment;
            if (downlinePerformance > maxLinePerformance) {
                maxLinePerformance = downlinePerformance;
            }
        }

        return totalPerformance - maxLinePerformance;
    }

    function distributeLevelRewards(address user) public {
        uint256 minorAreaPerformance = calculateMinorAreaPerformance(user);
        uint256 reward = 0;

        if (minorAreaPerformance >= 500000 * 1e18) {
            reward = 10000 * 1e18;
        } else if (minorAreaPerformance >= 100000 * 1e18) {
            reward = 1500 * 1e18;
        } else if (minorAreaPerformance >= 50000 * 1e18) {
            reward = 500 * 1e18;
        } else if (minorAreaPerformance >= 10000 * 1e18) {
            reward = 100 * 1e18;
        }

        if (reward > 0 && users[user].pendingRelease >= reward) {
            users[user].pendingRelease -= reward; // 待释放金额减少
            users[user].releasedAmount += reward; // 加速释放到可提现金额
            resetMinorAreaPerformance(user); // 重置小区业绩
        }
    }

    function resetMinorAreaPerformance(address user) internal {
        // 重置用户的小区业绩计算
        // 需要实现逻辑来清零小区业绩
    }

    function checkReinvestmentRequirement(address user) internal view returns (bool) {
        User storage userInfo = users[user];
        uint256 totalEarnings = userInfo.releasedAmount + userInfo.pendingRelease;
        uint256 requiredEarnings = userInfo.totalInvestment * 3; // 300% of the initial investment

        return totalEarnings >= requiredEarnings;
    }

    function calculateTeamPerformance(address user) internal view returns (uint256) {
        // 计算团队总充值，去掉最大一条线的业绩
        return calculateMinorAreaPerformance(user);
    }

    function calculateStarLevelBonus(address user) internal view returns (uint256) {
        User storage userInfo = users[user];
        uint256 teamPerformance = calculateMinorAreaPerformance(user); // 使用小区业绩
        uint256 bonusPercentage = 0;

        if (userInfo.starLevel == 1 && userInfo.directReferrals >= 5) {
            bonusPercentage = 3;
        } else if (userInfo.starLevel == 2 && userInfo.directReferrals >= 8) {
            bonusPercentage = 5;
        } else if (userInfo.starLevel == 3 && userInfo.directReferrals >= 12) {
            bonusPercentage = 7;
        } else if (userInfo.starLevel == 4 && userInfo.directReferrals >= 15) {
            bonusPercentage = 10;
        } else if (userInfo.starLevel == 5 && userInfo.directReferrals >= 20) {
            bonusPercentage = 15;
        }

        return teamPerformance * bonusPercentage / 100;
    }

    function getDownlines(address user) internal view returns (address[] memory) {
        // 返回用户的下级地址数组
        // 需要实现逻辑来获取用户的下级
    }

    function distributeStarLevelBonus(address user) public {
        User storage userInfo = users[user];
        uint256 minorAreaPerformance = calculateMinorAreaPerformance(user); // 小区业绩
        uint256 bonusPercentage = 0;

        // 确保满足直推人数要求
        if (userInfo.starLevel == 1 && userInfo.directReferrals >= 5) {
            bonusPercentage = 3;
        } else if (userInfo.starLevel == 2 && userInfo.directReferrals >= 8) {
            bonusPercentage = 5;
        } else if (userInfo.starLevel == 3 && userInfo.directReferrals >= 12) {
            bonusPercentage = 7;
        } else if (userInfo.starLevel == 4 && userInfo.directReferrals >= 15) {
            bonusPercentage = 10;
        } else if (userInfo.starLevel == 5 && userInfo.directReferrals >= 20) {
            bonusPercentage = 15;
        }

        // 计算分红金额
        uint256 bonus = minorAreaPerformance * bonusPercentage / 100;

        // 分红逻辑
        if (bonus > 0) {
            userInfo.pendingRelease -= bonus; // 待释放金额减少
            userInfo.releasedAmount += bonus; // 加速释放到可提现金额
        }
    }

    function checkAndUpgradeStarLevel(address user) public {
        User storage userInfo = users[user];
        uint256 minorAreaPerformance = calculateMinorAreaPerformance(user); // 小区业绩

        // 根据小区业绩和直推人数升级星级
        if (minorAreaPerformance >= 1000000 * 1e18 && userInfo.directReferrals >= 20) {
            userInfo.starLevel = 5; // 五星
        } else if (minorAreaPerformance >= 500000 * 1e18 && userInfo.directReferrals >= 15) {
            userInfo.starLevel = 4; // 四星
        } else if (minorAreaPerformance >= 100000 * 1e18 && userInfo.directReferrals >= 12) {
            userInfo.starLevel = 3; // 三星
        } else if (minorAreaPerformance >= 50000 * 1e18 && userInfo.directReferrals >= 8) {
            userInfo.starLevel = 2; // 二星
        } else if (minorAreaPerformance >= 10000 * 1e18 && userInfo.directReferrals >= 5) {
            userInfo.starLevel = 1; // 一星
        }
    }

    function distributeDifferentialReward(address user) public {
        uint256 differentialReward = calculateDifferentialReward(user);
        if (differentialReward > 0) {
            users[user].pendingRelease -= differentialReward; // 待释放金额减少
            users[user].releasedAmount += differentialReward; // 加速释放到可提现金额
        }
    }

    // Add functions for dynamic earnings, team rewards, and reinvestment logic
}