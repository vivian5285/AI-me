const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto'); // 用于生成唯一邀请链接
const QRCode = require('qrcode'); // 用于生成二维码
const app = express();
const port = 3000;

// 中间件
app.use(express.json());

// 连接到MongoDB
mongoose.connect('mongodb://localhost:27017/finance', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// 定义投资Schema
const investmentSchema = new mongoose.Schema({
  type: String, // 投资类型
  amount: Number, // 投资金额
  date: Date // 投资日期
});

// 定义用户Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  investments: [investmentSchema], // 嵌套投资Schema
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 推荐人
  inviteLink: { type: String }, // 邀请链接
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // 团队成员
});

// 在保存用户前生成唯一邀请链接
userSchema.pre('save', function (next) {
  if (!this.inviteLink) {
    this.inviteLink = `http://localhost:3000/register?ref=${crypto.randomBytes(8).toString('hex')}`;
  }
  next();
});

// 定义用户模型
const User = mongoose.model('User', userSchema);

// 获取所有用户信息
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch users' });
  }
});

// 获取单个用户信息
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user' });
  }
});

// 创建新用户并生成二维码
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, walletAddress, referrerId } = req.body;

    // 创建新用户
    const newUser = new User({ username, email, walletAddress, referrer: referrerId });
    await newUser.save();

    // 如果有推荐人，更新推荐人的团队信息
    if (referrerId) {
      await User.findByIdAndUpdate(referrerId, { $push: { team: newUser._id } });
    }

    // 生成二维码
    const qrCode = await QRCode.toDataURL(newUser.inviteLink);

    res.status(201).json({ user: newUser, qrCode });
  } catch (error) {
    res.status(400).send({ error: 'Failed to create user', details: error.message });
  }
});

// 通过推荐链接自动注册
app.post('/api/register', async (req, res) => {
  try {
    const { walletAddress, ref } = req.body;

    // 检查推荐链接是否有效
    const referrer = await User.findOne({ inviteLink: `http://localhost:3000/register?ref=${ref}` });
    if (!referrer) {
      return res.status(400).send({ error: 'Invalid referral link' });
    }

    // 创建新用户并绑定推荐人
    const newUser = new User({ walletAddress, referrer: referrer._id });
    await newUser.save();

    // 更新推荐人的团队信息
    referrer.team.push(newUser._id);
    await referrer.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send({ error: 'Failed to register user', details: error.message });
  }
});

// 获取单个用户信息
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user' });
  }
});

// 创建新用户
app.post('/api/users', async (req, res) => {
  try {
    const { username, email, investments } = req.body;
    const newUser = new User({ username, email, investments });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).send({ error: 'Failed to create user', details: error.message });
  }
});

// 更新用户投资信息
app.put('/api/users/:id/investments', async (req, res) => {
  try {
    const { investments } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { investments } },
      { new: true }
    );
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).send({ error: 'Failed to update investments', details: error.message });
  }
});

// 添加 /api/message 路由
app.get('/api/message', (req, res) => {
  res.json({ message: '欢迎访问AI金融后端服务！' });
});

// 启动服务器
app.listen(3000, '0.0.0.0', () => {
  console.log("Server is running on port 3000");
});

