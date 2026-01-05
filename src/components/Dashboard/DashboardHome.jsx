import { useEffect, useState, useContext } from 'react';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AuthContext } from '../context/AuthContext';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalAdded: 0, totalRequested: 0 });

  useEffect(() => {
    fetch(`https://plate-share-server-site.vercel.app/user-stats/${user?.email}`)
      .then(res => res.json())
      .then(data => setStats(data));
  }, [user?.email]);

  const chartData = [
    { name: 'Donated', value: stats.totalAdded, color: '#F0845C' },
    { name: 'Requested', value: stats.totalRequested, color: '#307A7F' },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-slate-400 font-bold text-xs uppercase mb-2">Total Donated</p>
          <h2 className="text-4xl font-black text-[#F0845C]">{stats.totalAdded}</h2>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <p className="text-slate-400 font-bold text-xs uppercase mb-2">Total Requested</p>
          <h2 className="text-4xl font-black text-[#307A7F]">{stats.totalRequested}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold mb-8">Activity Analytics</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;