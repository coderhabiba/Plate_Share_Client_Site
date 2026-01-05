import { useContext } from 'react';

import { FaCamera, FaEnvelope, FaUserEdit } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Profile Header Card */}
      <div className="bg-[#307A7F] h-48 rounded-[2.5rem] relative mb-20 shadow-xl shadow-teal-100">
        <div className="absolute -bottom-16 left-10 flex flex-col md:flex-row items-end gap-6">
          <div className="relative group">
            <img
              src={user?.photoURL}
              className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-8 border-white object-cover shadow-lg"
              alt="User profile"
            />
            <div className="absolute inset-0 bg-black/40 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <FaCamera className="text-white text-2xl" />
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-3xl font-black text-slate-800 elms-font">
              {user?.displayName}
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
              Community Contributor
            </p>
          </div>
        </div>
      </div>

      {/* Profile Info Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white rounded-[2.5rem] p-10 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
              Account Information
            </h3>
            <button className="btn btn-sm bg-[#F0845C] text-white border-none rounded-xl px-4 hover:bg-[#307A7F] transition-all">
              <FaUserEdit /> Edit Profile
            </button>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#F0845C]">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Email Address
                </p>
                <p className="font-bold text-slate-700">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#F0845C]">
                <span className="text-xl">🛡️</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                  Account ID
                </p>
                <p className="font-bold text-slate-700">{user?.uid}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div className="bg-[#F0845C] rounded-[2.5rem] p-10 text-white flex flex-col justify-center items-center text-center">
          <h4 className="text-lg font-bold mb-2">Member Since</h4>
          <p className="text-3xl font-black mb-4">2024</p>
          <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-widest">
            Verified User
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
