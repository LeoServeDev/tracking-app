import React from 'react';

const TimesheetTable = ({ records }) => {
  // Prioritize most recent week (top 7 entries)
  const recentWeek = records.slice(0, 7);
  const older = records.slice(7);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-900 text-white rounded shadow-lg">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-3 text-left font-bold">Date</th>
            <th className="px-4 py-3 text-left font-bold">Punch In</th>
            <th className="px-4 py-3 text-left font-bold">Punch Out</th>
            <th className="px-4 py-3 text-left font-bold">Total Hours</th>
          </tr>
        </thead>
        <tbody>
          {recentWeek.map((row, idx) => (
            <tr key={row.date + row.punchIn + row.punchOut} className="bg-gray-800 border-b border-gray-700">
              <td className="px-4 py-2 font-semibold">{row.date}</td>
              <td className="px-4 py-2">{row.punchIn}</td>
              <td className="px-4 py-2">{row.punchOut}</td>
              <td className="px-4 py-2">{row.totalHours}</td>
            </tr>
          ))}
          {older.length > 0 && (
            <tr><td colSpan={4} className="px-4 py-2 text-center text-gray-400 bg-gray-900">Older Records</td></tr>
          )}
          {older.map((row) => (
            <tr key={row.date + row.punchIn + row.punchOut} className="bg-gray-900 border-b border-gray-800">
              <td className="px-4 py-2">{row.date}</td>
              <td className="px-4 py-2">{row.punchIn}</td>
              <td className="px-4 py-2">{row.punchOut}</td>
              <td className="px-4 py-2">{row.totalHours}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimesheetTable; 