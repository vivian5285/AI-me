import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div>
      {/* 总资产 */}
      <section>
        <h1>个人账户</h1>
        <p>总资产: {/* 数据绑定 */}</p>
        <div>{/* 进度条组件 */}</div>
        <p>释放完成后需复投</p>
      </section>

      {/* 可提现金额 */}
      <section>
        <h2>可提现金额</h2>
        <p>今日收益: {/* 数据绑定 */}</p>
        <button>立即提现</button>
      </section>

      {/* 已提现金额 */}
      <section>
        <h2>已提现金额</h2>
        <ul>
          {/* 最近10笔提现记录 */}
          <li>提现记录1</li>
          <li>提现记录2</li>
        </ul>
      </section>

      {/* 收益展示 */}
      <section>
        <h2>收益展示</h2>
        <p>静态收益: {/* 数据绑定 */}</p>
        <p>动态收益: {/* 数据绑定 */}</p>
      </section>
    </div>
  );
};

export default Dashboard;
