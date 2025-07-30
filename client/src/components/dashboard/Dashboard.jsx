import React from 'react';
import Profile from '../profile/Profile';
import PunchButton from './PunchButton';
import TimesheetTable from './TimesheetTable';

const getToday = () => new Date().toISOString().slice(0, 10);

const STORAGE_KEY = 'punchRecords';

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const Dashboard = () => {
  const [isPunchedIn, setIsPunchedIn] = React.useState(false);
  const [punchTime, setPunchTime] = React.useState(null);
  const [records, setRecords] = React.useState([]);
  const [currentPunchIn, setCurrentPunchIn] = React.useState(null);
  const [elapsed, setElapsed] = React.useState(0);
  const timerRef = React.useRef(null);

  // Load records from localStorage on mount
  React.useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setRecords(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // Save records to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  // Punch in/out logic
  const handlePunch = () => {
    if (!isPunchedIn) {
      // Punch in
      const now = new Date();
      setCurrentPunchIn(now);
      setPunchTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      setIsPunchedIn(true);
      setElapsed(0);
    } else {
      // Punch out
      const now = new Date();
      const punchInTime = currentPunchIn;
      const punchOutTime = now;
      const totalHours = ((punchOutTime - punchInTime) / (1000 * 60 * 60)).toFixed(2);
      setRecords([
        { date: getToday(), punchIn: punchInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), punchOut: punchOutTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), totalHours: Number(totalHours) },
        ...records,
      ]);
      setCurrentPunchIn(null);
      setPunchTime(null);
      setIsPunchedIn(false);
      setElapsed(0);
    }
  };

  // Live timer effect
  React.useEffect(() => {
    if (isPunchedIn && currentPunchIn) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - currentPunchIn.getTime());
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPunchedIn, currentPunchIn]);

  // Calculate stats
  const today = getToday();
  const todayRecords = records.filter(r => r.date === today);
  const todayHours = todayRecords.reduce((sum, r) => sum + r.totalHours, 0);
  const weekRecords = records.slice(0, 7);
  const weekHours = weekRecords.reduce((sum, r) => sum + r.totalHours, 0);
  const overtime = Math.max(0, todayHours - 8);

  const stats = [
    { label: "Today's Hours", value: todayHours.toFixed(2), icon: '⏰' },
    { label: 'Overtime', value: overtime.toFixed(2), icon: '🔥' },
    { label: 'Total Hours (Week)', value: weekHours.toFixed(2), icon: '📅' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col md:flex-row gap-8 p-8">
      {/* Left column: Profile */}
      <div className="w-full md:w-1/4 mb-8 md:mb-0">
        <div className="bg-white text-gray-900 rounded-xl shadow-lg p-6 flex flex-col items-center">
          <Profile />
        </div>
      </div>
      {/* Right column: Main dashboard */}
      <div className="w-full md:w-3/4 flex flex-col gap-6">
        {/* Punch In/Out Widget */}
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{isPunchedIn ? '🟢' : '🔴'}</span>
            <div>
              <div className="text-2xl font-bold mb-2">{isPunchedIn ? 'You are Punched In' : 'You are Punched Out'}</div>
              <div className="text-gray-500">
                {isPunchedIn
                  ? `Since ${punchTime} | Elapsed: ${formatElapsed(elapsed)}`
                  : 'Not working currently'}
              </div>
            </div>
          </div>
          <PunchButton onPunch={handlePunch} isPunchedIn={isPunchedIn} />
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-800 text-white rounded-xl shadow p-4 flex flex-col items-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
        {/* Timesheet/history table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-xl font-bold mb-4">Timesheet</div>
          <TimesheetTable records={records} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 