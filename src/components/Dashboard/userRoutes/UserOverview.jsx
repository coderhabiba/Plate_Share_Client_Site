import { useContext, useEffect, useState } from 'react';
import {
  FaUtensils,
  FaHandsHelping,
  FaHeart,
  FaArrowRight,
} from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const UserOverview = () => {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ totalAdded: 0, totalRequested: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://plate-share-server-site.vercel.app/user-stats/${user?.email}`
      )
        .then(res => res.json())
        .then(data => {
          setStats(data);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner loading-lg text-[#307A7F]"></span>
      </div>
    );

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#307A7F] to-[#4a9ea3] rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Welcome Back, <br />
            <span className="text-teal-100">{user?.displayName}!</span>
          </h2>
          <p className="max-w-md opacity-90 font-medium">
            Thank you for being a part of PlateShare. Your contributions are
            making the world a better place, one meal at a time.
          </p>
        </div>
        <FaHeart className="absolute -right-10 -bottom-10 text-white/10 text-[15rem] rotate-12" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Shared */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#307A7F] transition-all">
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
              Total Food Shared
            </p>
            <h3 className="text-4xl font-black text-slate-800">
              {stats.totalAdded}
            </h3>
            <Link
              to="/dashboard/manage-foods"
              className="text-[#307A7F] text-xs font-bold flex items-center gap-1 mt-4 hover:underline"
            >
              View My Donations <FaArrowRight />
            </Link>
          </div>
          <div className="w-16 h-16 bg-teal-50 text-[#307A7F] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            <FaUtensils />
          </div>
        </div>

        {/* Total Requested */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#F0845C] transition-all">
          <div>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-1">
              Food Requested
            </p>
            <h3 className="text-4xl font-black text-slate-800">
              {stats.totalRequested}
            </h3>
            <Link
              to="/dashboard/my-requests"
              className="text-[#F0845C] text-xs font-bold flex items-center gap-1 mt-4 hover:underline"
            >
              Track Requests <FaArrowRight />
            </Link>
          </div>
          <div className="w-16 h-16 bg-orange-50 text-[#F0845C] rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
            <FaHandsHelping />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-black text-slate-800 mb-6 uppercase tracking-tight">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/dashboard/add-food-dashboard"
            className="p-6 bg-slate-50 hover:bg-[#307A7F] hover:text-white rounded-2xl transition-all font-bold text-slate-600 flex flex-col items-center gap-3 border border-slate-100"
          >
            <FaUtensils className="text-xl" />
            <span>Add New Food</span>
          </Link>

          <Link
            to="/available-food"
            className="p-6 bg-slate-50 hover:bg-[#F0845C] hover:text-white rounded-2xl transition-all font-bold text-slate-600 flex flex-col items-center gap-3 border border-slate-100"
          >
            <FaHandsHelping className="text-xl" />
            <span>Browse Foods</span>
          </Link>

          <Link
            to="/dashboard/manage-foods"
            className="p-6 bg-slate-50 hover:bg-info hover:text-white rounded-2xl transition-all font-bold text-slate-600 flex flex-col items-center gap-3 border border-slate-100"
          >
            <IoFastFood className="text-xl" />
            <span>Manage My Food Post</span>
          </Link>

          <Link
            to="/dashboard/profile"
            className="p-6 bg-slate-50 hover:bg-slate-800 hover:text-white rounded-2xl transition-all font-bold text-slate-600 flex flex-col items-center gap-3 border border-slate-100"
          >
            <img src={user?.photoURL} className="w-6 h-6 rounded-full" alt="" />
            <span>Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
