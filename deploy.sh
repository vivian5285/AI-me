#!/bin/bash

# 更新系统并安装必要的软件
sudo apt update && sudo apt upgrade -y
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

# 克隆或更新代码仓库
if [ ! -d "/var/www/ai-finance" ]; then
  sudo git clone https://your-repo-url.git /var/www/ai-finance
else
  cd /var/www/ai-finance
  sudo git pull
fi

# 切换到项目目录
cd /var/www/ai-finance

# 使用 Docker Compose 构建和启动服务
sudo docker-compose down
sudo docker-compose up -d --build

# 配置防火墙
sudo ufw allow 3000
sudo ufw allow 4000
sudo ufw allow 27017
sudo ufw enable
