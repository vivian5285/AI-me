#!/bin/bash

# 更新系统并安装必要的软件
sudo apt update && sudo apt upgrade -y
sudo apt install -y nodejs npm git mongodb

# 启动并启用 MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# 克隆或更新代码仓库
if [ ! -d "/var/www/ai-finance" ]; then
  sudo git clone https://your-repo-url.git /var/www/ai-finance
else
  cd /var/www/ai-finance
  sudo git pull
fi

# 安装前端依赖
cd /var/www/ai-finance/admin-frontend
npm install

# 安装后端依赖
cd /var/www/ai-finance/admin-backend
npm install

# 启动后端服务
pm2 start server.js --name admin-backend
pm2 save
pm2 startup

# 配置防火墙
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
