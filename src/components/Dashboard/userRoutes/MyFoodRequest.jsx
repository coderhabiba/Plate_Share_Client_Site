import { useContext, useEffect, useState } from 'react';

import {
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';


const MyFoodRequests = () => {
  const { user } = useContext(AuthContext);
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
   
    fetch(
      `https://plate-share-server-site.vercel.app/my-requests?email=${user?.email}`
    )
      .then(res => res.json())
      .then(data => {
        setMyRequests(data);
        setLoading(false);
      });
  }, [user]);

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-white dark:bg-base-100 rounded-[2.5rem] p-8 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white elms-font">
            My Food Requests
          </h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">
            Track your requested meals status
          </p>
        </div>
        <div className="bg-[#307A7F]/10 text-[#307A7F] px-6 py-2 rounded-full font-black text-sm">
          Total Requests: {myRequests.length}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#307A7F] font-black uppercase text-[11px] tracking-[0.2em]">
              <th className="bg-transparent">Food Details</th>
              <th className="bg-transparent">Donor Info</th>
              <th className="bg-transparent">Pickup Date</th>
              <th className="bg-transparent text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.length === 0 ? (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-20 text-slate-300 font-bold text-xl"
                >
                  You haven't requested any food yet.
                </td>
              </tr>
            ) : (
              myRequests.map(req => (
                <tr
                  key={req._id}
                  className="bg-slate-50 dark:bg-base-200/50 shadow-sm rounded-2xl hover:bg-white dark:hover:bg-base-200 transition-all group"
                >
                  <td className="rounded-l-2xl py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative overflow-hidden w-14 h-14 rounded-2xl">
                        <img
                          src={req.foodImage}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 dark:text-white">
                          {req.foodName}
                        </p>
                        <p className="text-[11px] flex items-center gap-1 text-slate-400 font-bold">
                          <FaMapMarkerAlt className="text-[#F0845C]" />{' '}
                          {req.pickupLocation}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {req.donatorName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {req.donatorEmail}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-slate-600 dark:text-slate-400">
                        {new Date(req.requestDate).toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-[#F0845C] font-bold uppercase">
                        Exp: {new Date(req.expireDate).toLocaleDateString()}
                      </span>
                    </div>
                  </td>
                  <td className="rounded-r-2xl text-center">
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${
                        req.status === 'accepted'
                          ? 'bg-green-100 text-green-600'
                          : req.status === 'rejected'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-orange-100 text-orange-600'
                      }`}
                    >
                      {req.status === 'accepted' && <FaCheckCircle />}
                      {req.status === 'rejected' && <FaTimesCircle />}
                      {req.status === 'pending' && (
                        <FaClock className="animate-spin" />
                      )}
                      {req.status}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyFoodRequests;
