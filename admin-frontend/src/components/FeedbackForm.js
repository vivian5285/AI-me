import React, { useState } from 'react';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以将反馈发送到服务器或存储在数据库中
    setMessage('感谢您的反馈！');
    setFeedback('');
  };

  return (
    <div>
      <h2>用户反馈</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="请输入您的反馈"
          rows="4"
          cols="50"
        />
        <button type="submit">提交反馈</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FeedbackForm; 