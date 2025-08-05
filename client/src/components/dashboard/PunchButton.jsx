import React from 'react';

const PunchButton = ({ onPunch, isPunchedIn, loading = false }) => {
  return (
    <button 
      onClick={onPunch}
      disabled={loading}
      className={`px-8 py-3 rounded-lg font-bold text-white transition-all duration-200 ${
        isPunchedIn 
          ? 'bg-red-500 hover:bg-red-600 disabled:bg-red-400' 
          : 'bg-green-500 hover:bg-green-600 disabled:bg-green-400'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Processing...' : (isPunchedIn ? 'Punch Out' : 'Punch In')}
    </button>
  );
};

export default PunchButton; 