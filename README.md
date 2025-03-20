# AI金融项目

## 项目简介
AI金融项目是一个基于区块链技术的金融平台，提供用户注册、团队管理、收益计算等功能。通过邀请链接和二维码，用户可以轻松推广并建立团队关系。

## 功能概览

1. **用户注册与管理**：
   - 支持通过钱包地址自动注册。
   - 每个用户生成唯一的邀请链接和二维码。
   - 支持推荐人绑定和团队关系管理。

2. **投资与收益**：
   - 支持用户记录投资信息。
   - 提供静态收益和动态收益计算功能。
   - 支持星级晋升逻辑。

3. **API接口**：
   - 提供用户管理、投资记录、推荐关系等多种接口。
   - 支持通过推荐链接自动注册。

4. **前后端分离**：
   - 前端基于 React 构建，提供用户友好的界面。
   - 后端基于 Express 和 MongoDB，提供高效的数据存储和接口服务。

## 文件结构

```
/AI金融
├── admin-backend/         # 后端服务
│   ├── server.js          # 主后端服务文件
│   └── shared/            # 共享逻辑和工具函数
├── admin-frontend/        # 前端服务
│   ├── src/
│   │   └── App.jsx        # 前端主入口文件
├── README.md              # 项目说明文件
```

## API接口文档

### 获取所有用户
- **GET** `/api/users`
- **响应示例**：
  ```json
  [
    {
      "username": "example",
      "email": "example@example.com",
      "investments": [],
      "inviteLink": "http://localhost:3000/register?ref=abc123",
      "team": []
    }
  ]
  ```

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
- **响应示例**：
  ```json
  {
    "user": {
      "username": "example",
      "email": "example@example.com",
      "inviteLink": "http://localhost:3000/register?ref=abc123"
    },
    "qrCode": "data:image/png;base64,..."
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
- **响应示例**：
  ```json
  {
    "username": "newUser",
    "walletAddress": "0x123...",
    "referrer": "referrer_user_id"
  }
  ```

### 更新投资信息
- **PUT** `/api/users/:id/investments`
- **请求体**：
  ```json
  {
    "investments": [
      { "type": "static", "amount": 1000, "date": "2023-01-01" }
    ]
  }
  ```
- **响应示例**：
  ```json
  {
    "username": "example",
    "investments": [
      { "type": "static", "amount": 1000, "date": "2023-01-01" }
    ]
  }
  ```

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

## 启动项目

### 后端
1. 确保已安装 [Node.js](https://nodejs.org/) 和 [MongoDB](https://www.mongodb.com/)。
2. 进入后端目录：
   ```bash
   cd /c:/Users/Administrator/Desktop/AI金融/admin-backend
   ```
3. 安装依赖：
   ```bash
   npm install
   ```
4. 启动服务：
   ```bash
   node server.js
   ```

### 前端
1. 进入前端目录：
   ```bash
   cd /c:/Users/Administrator/Desktop/AI金融/admin-frontend
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动前端服务：
   ```bash
   npm start
   ```

## 注意事项
- 确保 MongoDB 服务已启动。
- 修改 `server.js` 中的 MongoDB 连接字符串以匹配您的环境。
- 测试所有 API 接口，确保功能正常。

## 贡献
欢迎提交 Issue 或 Pull Request 来改进本项目！
