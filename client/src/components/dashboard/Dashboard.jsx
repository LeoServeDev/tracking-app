import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { punchInOut, getTodayPunches, getStats } from '../../api/punch';
import Profile from '../profile/Profile';
import PunchButton from './PunchButton';
import TimesheetTable from './TimesheetTable';

const getToday = () => new Date().toISOString().slice(0, 10);

function formatElapsed(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentPunchIn, setCurrentPunchIn] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const timerRef = useRef(null);

  // Load data from API on mount
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [todayPunchesData, statsData] = await Promise.all([
        getTodayPunches(),
        getStats('week')
      ]);
      
      setRecords(todayPunchesData.punches || []);
      setStats(statsData.stats || {});
      
      // Check if user is currently punched in
      const activePunch = todayPunchesData.punches?.find(p => !p.punchOut);
      if (activePunch) {
        setIsPunchedIn(true);
        setCurrentPunchIn(new Date(activePunch.punchIn));
        setPunchTime(new Date(activePunch.punchIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Punch in/out logic
  const handlePunch = async () => {
    try {
      setLoading(true);
      const punchType = isPunchedIn ? 'out' : 'in';
      const response = await punchInOut(punchType);
      
      if (punchType === 'in') {
        // Punch in
        const now = new Date();
        setCurrentPunchIn(now);
        setPunchTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        setIsPunchedIn(true);
        setElapsed(0);
      } else {
        // Punch out
        setCurrentPunchIn(null);
        setPunchTime(null);
        setIsPunchedIn(false);
        setElapsed(0);
      }
      
      // Reload data to get updated records
      await loadDashboardData();
    } catch (error) {
      console.error('Punch error:', error);
      alert(error.response?.data?.message || 'Punch operation failed');
    } finally {
      setLoading(false);
    }
  };

  // Live timer effect
  useEffect(() => {
    if (isPunchedIn && currentPunchIn) {
      timerRef.current = setInterval(() => {
        setElapsed(Date.now() - currentPunchIn.getTime());
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPunchedIn, currentPunchIn]);

  // Calculate stats from API data
  const todayHours = stats.totalHours || 0;
  const weekHours = stats.totalHours || 0;
  const overtime = Math.max(0, todayHours - 8);

  const statsCards = [
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
          <PunchButton onPunch={handlePunch} isPunchedIn={isPunchedIn} loading={loading} />
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statsCards.map((stat) => (
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