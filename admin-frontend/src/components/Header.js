import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import WalletConnector from './WalletConnector';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="logo">AI Finance</div>
      <nav className="nav">
        <ul>
          <li>主页</li>
          <li>投资</li>
          <li>团队</li>
          <li>提现</li>
          <li>AI 娱乐（待开放）</li>
        </ul>
      </nav>
      <div className="actions">
        <WalletConnector />
        <ThemeToggle />
      </div>
      <LanguageSwitcher />
    </header>
  );
}

export default Header; 