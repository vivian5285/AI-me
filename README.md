# AI金融项目

## 新功能

1. **钱包连接自动注册**：用户通过钱包连接完成注册，无需手动填写信息。
2. **邀请链接和二维码**：每个用户生成唯一的邀请链接和二维码，用于推广和锁定团队关系。
3. **团队关系管理**：通过推荐链接自动绑定推荐人和团队关系。

## API接口

### 创建新用户
- **POST** `/api/users`
- **请求体**：
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "walletAddress": "0x123...",
    "referrerId": "referrer_user_id"
  }
  ```

### 自动注册
- **POST** `/api/register`
- **请求体**：
  ```json
  {
    "walletAddress": "0x123...",
    "ref": "referral_code"
  }
  ```

### 连接钱包
- **工具函数**：`connectWallet()`，返回连接的钱包地址。

## 示例调用

### 星级晋升
```javascript
const { calculateStarUpgrade } = require('./shared/logic');
const newStars = calculateStarUpgrade(3, 120);
console.log(newStars); // 输出: 4
```

### 静态收益计算
```javascript
const { calculateStaticIncome } = require('./shared/logic');
const income = calculateStaticIncome(1000, 1.5);
console.log(income); // 输出: 1500
```

## API 响应格式

### 示例响应
```json
{
  "status": "success",
  "data": {
    "stars": 4,
    "income": 1500
  }
}
```
