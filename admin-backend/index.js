const express = require('express');
const app = express();
const port = 3000;

app.get('/api', (req, res) => {
  res.json({ message: '欢迎来到 AI 金融后端' });
});

app.listen(port, () => {
  console.log(`后端服务运行在 http://localhost:${port}`);
});
