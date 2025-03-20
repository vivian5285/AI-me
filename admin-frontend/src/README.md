# AI金融系统

## 功能模块

1. **用户星级与权益显示**
   - 显示当前用户的星级。
   - 列出用户享受的权益。
   - 提示距离下一个星级需要完成的目标。

2. **团队菜单导航**
   - 展示团队的业绩和人数。
   - 包括大区和小区的详细信息。

3. **太阳线推广机制**
   - 支持太阳线排网布点。
   - 动态添加节点并展示团队结构。

## 文件结构

- `UserStatus.ts`: 用户星级与权益模块。
- `TeamNavigation.ts`: 团队菜单导航模块。
- `SunlineStructure.ts`: 太阳线推广机制模块。

## 使用方法

1. 在 `UserStatus.ts` 中调用 `displayUserStatus` 显示用户状态。
2. 在 `TeamNavigation.ts` 中调用 `displayTeamNavigation` 显示团队导航。
3. 在 `SunlineStructure.ts` 中使用 `SunlineStructure` 类管理太阳线结构。
