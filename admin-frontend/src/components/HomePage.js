import React from 'react';
import './HomePage.css';
import CryptoPrices from './CryptoPrices';
import MyAccount from './MyAccount';

function HomePage({ contractAddress }) {
  return (
    <div className="homepage">
      <header className="header">
        <h1>AI Finance</h1>
        <nav className="nav">
          <ul>
            <li>主页</li>
            <li>投资</li>
            <li>团队</li>
            <li>提现</li>
            <li>AI 娱乐（待开放）</li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="intro">
          <h2>欢迎来到AI Finance</h2>
          <p>体验未来金融的魅力。</p>
        </section>
        <CryptoPrices />
        <MyAccount contractAddress={contractAddress} />
        <p>每日收益释放范围：0.5% - 3%</p>
        {/* 其他主页内容 */}
      </main>
    </div>
  );
}

export default HomePage; 