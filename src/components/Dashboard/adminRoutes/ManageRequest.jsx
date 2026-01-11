import { useEffect, useState } from 'react';
import {
  FaCheck,
  FaTrashAlt,
  FaUser,
  FaUtensils
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const ManageRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(requests);

  //
  useEffect(() => {
    fetch('https://plate-share-server-site.vercel.app/food-request')
      .then(res => res.json())
      .then(data => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  //
  const handleUpdateStatus = (request, newStatus) => {
    fetch(
      `https://plate-share-server-site.vercel.app/food-request/${request._id}`,
      {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ status: newStatus, foodId: request.foodId }),
      }
    )
      .then(res => res.json())
      .then(data => {
        if (data.modifiedCount > 0) {
          const remaining = requests.map(r =>
            r._id === request._id ? { ...r, status: newStatus } : r
          );
          setRequests(remaining);
          Swal.fire('Updated!', `Request is now ${newStatus}`, 'success');
        }
      });
  };

  // handleDeleteRequest
  const handleDeleteRequest = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this request!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#307A7F',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        fetch(`https://plate-share-server-site.vercel.app/food-request/${id}`, {
          method: 'DELETE',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              const remaining = requests.filter(req => req._id !== id);
              setRequests(remaining);
              Swal.fire('Deleted!', 'The request has been removed.', 'success');
            }
          });
      }
    });
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <span className="loading loading-infinity loading-lg text-[#F0845C]"></span>
      </div>
    );

  return (
    <div className="rounded-[2.5rem] mt-10 p-6 md:p-10 shadow-sm border border-gray-100">
      <div className="mb-10">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
          Food <span className="text-[#F0845C]">Request Logs</span>
        </h2>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">
          Monitor and manage all food distribution requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="text-[#307A7F] font-black uppercase text-[11px] tracking-widest border-none">
              <th className="bg-transparent">Requester</th>
              <th className="bg-transparent">Food Item</th>
              <th className="bg-transparent">Date</th>
              <th className="bg-transparent text-center">Status</th>
              <th className="bg-transparent text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr
                key={req._id}
                className="shadow-sm hover:bg-slate-50 transition-all"
              >
                {/* Requester Info */}
                <td className="rounded-l-2xl py-5 border-y border-l border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-slate-100 rounded-xl text-slate-400">
                      <FaUser />
                    </div>
                    <div>
                      <p className="font-black text-slate-800 text-sm">
                        {req.requesterName}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold">
                        {req.requesterEmail}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Food Details */}
                <td className="border-y border-slate-50">
                  <div className="flex items-center gap-2 text-slate-600">
                    <FaUtensils className="text-[#307A7F] text-xs" />
                    <span className="font-bold text-sm">{req.foodName}</span>
                  </div>
                </td>

                {/* Request Date */}
                <td className="border-y border-slate-50 font-bold text-slate-500 text-xs">
                  {new Date(req.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>

                {/* Status Badge */}
                <td className="border-y border-slate-50 text-center">
                  <span
                    className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest
                    ${
                      req.status === 'pending'
                        ? 'bg-orange-100 text-orange-600'
                        : req.status === 'delivered'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}
                  >
                    {req.status}
                  </span>
                </td>

                {/* Admin Actions */}
                <td className="rounded-r-2xl text-center border-y border-r border-slate-50">
                  <div className="flex justify-center gap-2">
                    {req.status === 'pending' && (
                      <button
                        onClick={() => handleUpdateStatus(req, 'delivered')}
                        className="btn btn-sm bg-green-50 text-green-600 border-none hover:bg-green-600 hover:text-white rounded-xl"
                        title="Mark as Delivered"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteRequest(req._id)}
                      className="btn btn-sm bg-red-50 text-red-500 border-none hover:bg-red-500 hover:text-white rounded-xl"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold italic">
              No requests available to manage.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRequest;
