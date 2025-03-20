const Web3 = require('web3');

// 初始化Web3实例
const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');

// 连接钱包
async function connectWallet() {
  try {
    const accounts = await web3.eth.requestAccounts();
    return accounts[0]; // 返回连接的钱包地址
  } catch (error) {
    throw new Error('Failed to connect wallet');
  }
}

module.exports = { connectWallet };
