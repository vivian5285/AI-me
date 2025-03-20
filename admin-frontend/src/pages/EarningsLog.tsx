import React from 'react';

const EarningsLog: React.FC = () => {
  return (
    <div>
      <h1>收益日志</h1>
      {/* 静态收益日志 */}
      <section>
        <h2>静态收益</h2>
        <ul>
          <li>日期: {/* 数据绑定 */}</li>
          <li>释放金额: {/* 数据绑定 */}</li>
          <li>总待释放进度: {/* 数据绑定 */}</li>
        </ul>
      </section>

      {/* 动态收益日志 */}
      <section>
        <h2>动态收益</h2>
        <ul>
          <li>直推奖励: {/* 数据绑定 */}</li>
          <li>二级奖励: {/* 数据绑定 */}</li>
          <li>三级奖励: {/* 数据绑定 */}</li>
        </ul>
      </section>

      {/* 提现日志 */}
      <section>
        <h2>提现日志</h2>
        <ul>
          <li>提现时间: {/* 数据绑定 */}</li>
          <li>提现金额: {/* 数据绑定 */}</li>
          <li>状态: {/* 数据绑定 */}</li>
        </ul>
      </section>
    </div>
  );
};

export default EarningsLog;
