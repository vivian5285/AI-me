import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import InvestmentPanel from './components/InvestmentPanel';
import TeamManagement from './components/TeamManagement';
import WithdrawalPanel from './components/WithdrawalPanel';
import AIFuture from './components/AIFuture';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <Dashboard />
        <InvestmentPanel />
        <TeamManagement />
        <WithdrawalPanel />
        <AIFuture />
      </main>
    </div>
  );
}

export default App; 