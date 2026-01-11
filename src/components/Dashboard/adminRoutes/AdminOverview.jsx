import { useEffect, useState } from 'react';
import {
  FaUsers,
  FaUtensils,
  FaHandsHelping,
  FaCheckDouble,
  FaDownload,
} from 'react-icons/fa';

const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalFoods: 0,
    totalRequests: 0,
    completedDonations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://plate-share-server-site.vercel.app/admin-stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // --- CSV Download Function ---
  const downloadCSV = () => {
    const data = [
      ['Metric', 'Value'],
      ['Total Users', stats.totalUsers],
      ['Total Food Items', stats.totalFoods],
      ['Total Requests', stats.totalRequests],
      ['Completed Donations', stats.completedDonations],
      [
        'Success Rate',
        `${
          stats.totalRequests > 0
            ? ((stats.completedDonations / stats.totalRequests) * 100).toFixed(
                1
              )
            : 0
        }%`,
      ],
    ];

    // CSV convert
    let csvContent =
      'data:text/csv;charset=utf-8,' + data.map(e => e.join(',')).join('\n');
    // 
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'plate_share_analytics.csv');
    document.body.appendChild(link);

    link.click();
    document.body.removeChild(link); 
  };

  const reportCards = [
    {
      id: 1,
      title: 'Total Users',
      value: stats.totalUsers,
      icon: <FaUsers />,
      color: 'bg-blue-500',
      shadow: 'shadow-blue-100',
    },
    {
      id: 2,
      title: 'Total Foods',
      value: stats.totalFoods,
      icon: <FaUtensils />,
      color: 'bg-emerald-500',
      shadow: 'shadow-emerald-100',
    },
    {
      id: 3,
      title: 'Total Requests',
      value: stats.totalRequests,
      icon: <FaHandsHelping />,
      color: 'bg-orange-500',
      shadow: 'shadow-orange-100',
    },
    {
      id: 4,
      title: 'Completed',
      value: stats.completedDonations,
      icon: <FaCheckDouble />,
      color: 'bg-[#307A7F]',
      shadow: 'shadow-teal-100',
    },
  ];

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#307A7F]"></span>
      </div>
    );

  return (
    <div className="p-2">
      {/* Title Section */}
      <div className="mb-10">
        <h2 className="text-3xl font-black uppercase tracking-tight">
          System <span className="text-[#307A7F]">Analytics</span>
        </h2>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
          Real-time platform performance reports
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {reportCards.map(card => (
          <div
            key={card.id}
            className={`bg-white p-8 rounded-[2.5rem] shadow-xl ${card.shadow} border border-slate-50 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300`}
          >
            <div className="relative z-10">
              <div
                className={`${card.color} w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl mb-4 shadow-lg`}
              >
                {card.icon}
              </div>
              <h3 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">
                {card.title}
              </h3>
              <p className="text-4xl font-black text-slate-800 tracking-tighter">
                {card.value}
              </p>
            </div>
            <div className="absolute -right-4 -bottom-4 text-slate-50 text-8xl group-hover:text-slate-100 transition-colors">
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-800 mb-6 uppercase tracking-tight">
            Donation Success Rate
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-bold text-slate-600">
                  Request Completion
                </span>
                <span className="text-sm font-black text-[#307A7F]">
                  {stats.totalRequests > 0
                    ? (
                        (stats.completedDonations / stats.totalRequests) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <progress
                className="progress progress-primary w-full h-3"
                value={stats.completedDonations}
                max={stats.totalRequests}
              ></progress>
            </div>
            <p className="text-sm text-slate-400 italic">
              * This shows how many food requests have been successfully
              delivered to those in need.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#307A7F] to-[#255d61] p-8 rounded-[2.5rem] text-white shadow-xl flex flex-col justify-center">
          <h3 className="text-2xl font-black mb-2">Community Impact</h3>
          <p className="opacity-80 text-sm mb-6 font-medium">
            Your platform has successfully facilitated the sharing of{' '}
            {stats.completedDonations} meals. Keep up the great work!
          </p>
          {/* Download Button Click Handler Added */}
          <button
            onClick={downloadCSV}
            className="btn bg-white/20 hover:bg-white/30 border-none text-white rounded-2xl font-bold backdrop-blur-md flex items-center gap-2"
          >
            <FaDownload /> Download Detailed CSV
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
