import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const FoodReq = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchMyRequests = async () => {
      try {
        const res = await fetch(
          `https://plate-share-server-site.vercel.app/my-request/${user.email}`
        );
        if (!res.ok) throw new Error('Failed to fetch requests');
        const data = await res.json();

        const formattedData = data.map(req => ({
          ...req,
          foodName: req.foodName || 'Unknown Food',
          donatorName:
            req.donatorName || req.donator?.name || 'Unknown Donator',
        }));

        setRequests(formattedData);
      } catch (err) {
        console.error('Error fetching requests:', err);
        Swal.fire({
          title: 'Error!',
          text: 'Could not fetch your requests.',
          icon: 'error',
          background: 'var(--fallback-b1, #fff)',
          color: 'var(--fallback-bc, #000)',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [user]);

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to cancel this food request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F0845C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
      background: 'var(--fallback-b1, #fff)',
      color: 'var(--fallback-bc, #000)',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://plate-share-server-site.vercel.app/food-request/${id}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error('Failed to delete request');

      setRequests(prev => prev.filter(req => req._id !== id));
      Swal.fire('Cancelled!', 'Your request has been removed.', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong.', 'error');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  if (!requests.length)
    return (
      <div className="text-center py-40 bg-base-100 rounded-2xl border-2 border-dashed border-base-content/10 max-w-5xl mx-auto my-20">
        <h2 className="text-2xl font-semibold text-base-content/50">
          You have not requested any food yet.
        </h2>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto min-h-screen my-12 px-4 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-8 text-[#F0845C] elms-font flex items-center gap-2">
        <span className="w-1.5 h-8 bg-[#F0845C] rounded-full"></span> My Food
        Requests
      </h2>

      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-2xl border border-base-content/5">
        <table className="table w-full">
          {/* Table Header */}
          <thead className="bg-base-200 text-base-content/70">
            <tr>
              <th className="py-4">Food Info</th>
              <th>Donator</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Contact</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="text-base-content/80">
            {requests.map(req => (
              <tr
                key={req._id}
                className="hover:bg-base-200/50 transition-colors border-b border-base-content/5"
              >
                <td className="font-bold text-base-content">{req.foodName}</td>
                <td className="text-sm font-medium">{req.donatorName}</td>
                <td>
                  <span
                    className={`badge badge-sm font-bold py-3 px-4 ${
                      req.status === 'accepted'
                        ? 'badge-success text-white'
                        : req.status === 'rejected'
                        ? 'badge-error text-white'
                        : 'badge-warning text-white'
                    }`}
                  >
                    {req.status || 'Pending'}
                  </span>
                </td>
                <td className="max-w-[150px] truncate italic text-xs">
                  {req.reason || '-'}
                </td>
                <td className="text-xs">{req.contact || '-'}</td>
                <td className="text-center">
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm bg-red-50 hover:bg-red-100 text-red-600 border-none rounded-lg transition-all dark:bg-red-950/30 dark:hover:bg-red-900/50"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FoodReq;
