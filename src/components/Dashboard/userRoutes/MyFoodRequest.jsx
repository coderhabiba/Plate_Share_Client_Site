import { useContext, useEffect, useState } from 'react';
import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
  FaUtensils,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';

const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://plate-share-server-site.vercel.app/my-request/${user?.email}`
      )
        .then(res => res.json())
        .then(data => {
          setMyRequests(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-sm border border-gray-100 min-h-[500px]">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
            My Food <span className="text-[#F0845C]">Requests</span>
          </h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-1">
            Track the status of your meal applications
          </p>
        </div>
        <div className="bg-[#F0845C]/10 text-[#F0845C] px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-wider border border-[#F0845C]/20">
          History: {myRequests.length} Items
        </div>
      </div>

      {/* Requests Table */}
      <div className="overflow-x-auto">
        {myRequests.length === 0 ? (
          <div className="text-center py-24 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
            <FaUtensils className="mx-auto text-4xl text-slate-200 mb-4" />
            <h3 className="text-xl font-black text-slate-400">
              No Requests Found
            </h3>
            <p className="text-slate-400 text-sm">
              You haven't applied for any meals yet.
            </p>
          </div>
        ) : (
          <table className="table w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="text-[#307A7F] font-black uppercase text-[10px] tracking-[0.2em] border-none">
                <th className="bg-transparent pl-4">Food Item</th>
                <th className="bg-transparent">Donor Info</th>
                <th className="bg-transparent">Request Timeline</th>
                <th className="bg-transparent text-center">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {myRequests.map(req => (
                <tr
                  key={req._id}
                  className="bg-white shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] rounded-2xl group hover:translate-x-1 transition-all duration-300"
                >
                  <td className="rounded-l-[1.5rem] py-5 pl-4 border-y border-l border-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0 shadow-inner rounded-2xl overflow-hidden bg-slate-100">
                        <img
                          src={req.foodImage}
                          className="w-full h-full object-cover"
                          alt={req.foodName}
                        />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 group-hover:text-[#307A7F] transition-colors">
                          {req.foodName}
                        </p>
                        <p className="text-[10px] flex items-center gap-1 text-slate-400 font-bold uppercase tracking-tight">
                          <FaMapMarkerAlt className="text-[#F0845C]" />{' '}
                          {req.pickupLocation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="border-y border-slate-50">
                    <div className="flex flex-col">
                      <span className="font-black text-xs text-slate-700 uppercase">
                        {req.donatorName || 'Anonymous Donor'}
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {req.donatorEmail}
                      </span>
                    </div>
                  </td>
                  <td className="border-y border-slate-50">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-xs font-black text-slate-600">
                        <span className="text-[9px] bg-slate-100 px-1 rounded">
                          REQ:
                        </span>
                        {new Date(req.requestDate).toLocaleDateString('en-GB')}
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-[#F0845C] font-black uppercase">
                        <span className="text-[9px] bg-[#F0845C]/10 px-1 rounded">
                          EXP:
                        </span>
                        {new Date(req.expireDate).toLocaleDateString('en-GB')}
                      </div>
                    </div>
                  </td>
                  <td className="rounded-r-[1.5rem] text-center border-y border-r border-slate-50">
                    <div
                      className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${
                        req.status === 'delivered' || req.status === 'accepted'
                          ? 'bg-green-50 text-green-600 border border-green-100'
                          : req.status === 'rejected'
                          ? 'bg-red-50 text-red-600 border border-red-100'
                          : 'bg-orange-50 text-orange-600 border border-orange-100'
                      }`}
                    >
                      {req.status === 'delivered' ||
                      req.status === 'accepted' ? (
                        <FaCheckCircle />
                      ) : null}
                      {req.status === 'rejected' && <FaTimesCircle />}
                      {req.status === 'pending' && (
                        <FaClock className="animate-pulse" />
                      )}
                      {req.status}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequests;
