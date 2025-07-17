import React from 'react';

const PunchButton = ({ onPunch, isPunchedIn }) => {
  return (
    <button onClick={onPunch}>
      {isPunchedIn ? 'Punch Out' : 'Punch In'}
    </button>
  );
};

export default PunchButton; 