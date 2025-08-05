import React from 'react';

const TimesheetTable = ({ records = [] }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const calculateHours = (punchIn, punchOut) => {
    if (!punchIn || !punchOut) return '-';
    const hours = (new Date(punchOut) - new Date(punchIn)) / (1000 * 60 * 60);
    return hours.toFixed(2);
  };

  if (records.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No punch records found for today.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-3 text-left font-bold">Date</th>
            <th className="px-4 py-3 text-left font-bold">Punch In</th>
            <th className="px-4 py-3 text-left font-bold">Punch Out</th>
            <th className="px-4 py-3 text-left font-bold">Total Hours</th>
            <th className="px-4 py-3 text-left font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, idx) => (
            <tr key={record._id || idx} className="bg-gray-800 border-b border-gray-700">
              <td className="px-4 py-2 font-semibold">{formatDate(record.date)}</td>
              <td className="px-4 py-2">{formatTime(record.punchIn)}</td>
              <td className="px-4 py-2">{record.punchOut ? formatTime(record.punchOut) : '-'}</td>
              <td className="px-4 py-2">{calculateHours(record.punchIn, record.punchOut)}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  record.punchOut ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                }`}>
                  {record.punchOut ? 'Completed' : 'Active'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable; 