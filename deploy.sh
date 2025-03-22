#!/bin/bash

# 更新系统并安装必要的软件
sudo apt update && sudo apt upgrade -y
<<<<<<< HEAD
sudo apt install -y git curl

# 安装 Docker
if ! [ -x "$(command -v docker)" ]; then
  curl -fsSL https://get.docker.com -o get-docker.sh
  sudo sh get-docker.sh
  sudo usermod -aG docker $USER
fi

# 安装 Docker Compose
if ! [ -x "$(command -v docker-compose)" ]; then
  sudo curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -oP '"tag_name": "\K(.*)(?=")')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi
=======
sudo apt install -y nodejs npm git mongodb

# 启动并启用 MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb
>>>>>>> 3d90d8e5ae8369a5644b7e2370462b5b9b794274

# 克隆或更新代码仓库
if [ ! -d "/var/www/ai-finance" ]; then
  sudo git clone https://your-repo-url.git /var/www/ai-finance
else
  cd /var/www/ai-finance
  sudo git pull
fi

<<<<<<< HEAD
# 切换到项目目录
cd /var/www/ai-finance

# 使用 Docker Compose 构建和启动服务
sudo docker-compose down
sudo docker-compose up -d --build

# 配置防火墙
sudo ufw allow 3000
sudo ufw allow 4000
sudo ufw allow 27017
=======
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
>>>>>>> 3d90d8e5ae8369a5644b7e2370462b5b9b794274
sudo ufw enable
