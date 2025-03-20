import React, { useState } from 'react';

function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <button onClick={toggleTheme}>
      切换到{theme === 'light' ? '夜晚' : '白天'}模式
    </button>
  );
}

export default ThemeToggle; 