import React from 'react';
import './FlagScroller.css';

function FlagScroller() {
  return (
    <div className="flag-scroller">
      <div className="flags">
        <img src="path/to/flag1.png" alt="Flag 1" />
        <img src="path/to/flag2.png" alt="Flag 2" />
        <img src="path/to/flag3.png" alt="Flag 3" />
        {/* 添加更多国旗 */}
      </div>
    </div>
  );
}

export default FlagScroller; 