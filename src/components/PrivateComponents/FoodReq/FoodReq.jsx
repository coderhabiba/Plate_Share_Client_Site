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
        Swal.fire('Error!', 'Could not fetch your requests.', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchMyRequests();
  }, [user]);

  const handleDelete = async id => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#F0845C',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel it!',
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(
        `https://plate-share-server-site.vercel.app/food-request/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (!res.ok) throw new Error('Failed to delete request');

      setRequests(prev => prev.filter(req => req._id !== id));
      Swal.fire('Deleted!', 'Your request has been cancelled.', 'success');
    } catch (err) {
      console.error(err);
      Swal.fire('Error!', 'Something went wrong while deleting.', 'error');
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  if (!requests.length)
    return (
      <p className="text-center mt-10 py-40 text-gray-600">
        You have not requested any food yet.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto min-h-screen my-20">
      <h2 className="text-2xl font-bold mb-5 text-[#F0845C]">
        My Food Requests
      </h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          <thead className="bg-[#F0845C]/20">
            <tr>
              <th>Food</th>
              <th>Donator</th>
              <th>Status</th>
              <th>Reason</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(req => (
              <tr key={req._id}>
                <td>{req.foodName}</td>
                <td>{req.donatorName}</td>
                <td>{req.status || 'Pending'}</td>
                <td>{req.reason || '-'}</td>
                <td>{req.contact || '-'}</td>
                <td>
                  <button
                    onClick={() => handleDelete(req._id)}
                    className="btn btn-sm btn-error"
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
