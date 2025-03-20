import React from 'react';
import MarketOverview from '../components/MarketOverview';
import InvestmentEntry from '../components/InvestmentEntry';

const Home = () => {
  return (
    <div>
      {/* 平台总数据概览 */}
      <section>
        <h1>平台总数据概览</h1>
        <div>
          <p>总投资金额: {/* 数据绑定 */}</p>
          <p>总收益金额: {/* 数据绑定 */}</p>
          <p>今日收益总额: {/* 数据绑定 */}</p>
        </div>
      </section>

      {/* 市场行情 & K 线走势 */}
      <MarketOverview />

      {/* 用户投资入口 */}
      <InvestmentEntry />
    </div>
  );
};

export default Home;
