import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>个人账户</h1>
      <section>
        <p>总资产: {/* 数据绑定 */}</p>
        <p>可提现金额: {/* 数据绑定 */}</p>
        <button onClick={() => {/* 提现逻辑 */}}>立即提现</button>
      </section>
      <section>
        <h2>收益展示</h2>
        <p>静态收益: {/* 数据绑定 */}</p>
        <p>动态收益: {/* 数据绑定 */}</p>
      </section>
    </div>
  );
};

export default Dashboard;
