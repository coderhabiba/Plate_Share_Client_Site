import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import FoodReqModal from '../FoodReqModal/FoodReqModal';

const FoodDetails = () => {
  const { user, loading } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
      return;
    }
    if (!user) return;

    const fetchFoodDetails = async () => {
      try {
        const res = await fetch(
          `https://plate-share-server-site.vercel.app/foods/${id}`
        );
        if (!res.ok) throw new Error('Failed to fetch food details');
        const data = await res.json();
        setFood(data);

        if (user.email === data.donator?.email) {
          const reqRes = await fetch(
            `https://plate-share-server-site.vercel.app/food-request/${id}`
          );
          if (!reqRes.ok) throw new Error('Failed to fetch requests');
          const reqData = await reqRes.json();
          setRequests(reqData);
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message || 'Failed to load food details');
      } finally {
        setIsLoading(false);
      }
    };
    fetchFoodDetails();
  }, [user, loading, id, navigate]);

  const handleAcceptReject = async (requestId, action) => {
    try {
      const res = await fetch(
        `https://plate-share-server-site.vercel.app/food-request/${requestId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action }),
        }
      );

      if (res.ok) {
        toast.success(`Request ${action}ed successfully!`);
        setRequests(prev =>
          prev.map(req =>
            req._id === requestId ? { ...req, status: action } : req
          )
        );

        if (action === 'accepted') {
          const newQuantity = food.foodQuantityNumber - 1;
          const newStatus = newQuantity <= 0 ? 'donated' : 'available';

          const updateRes = await fetch(
            `https://plate-share-server-site.vercel.app/foods/${food._id}`,
            {
              method: 'PATCH',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                foodQuantityNumber: newQuantity,
                food_status: newStatus,
              }),
            }
          );

          if (updateRes.ok) {
            setFood(prev => ({
              ...prev,
              foodQuantityNumber: newQuantity,
              food_status: newStatus,
            }));
          }
        } setRequests(prev =>
          prev.map(req =>
            req._id === requestId ? { ...req, status: action } : req
          )
        );
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  }; 

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  if (!food)
    return (
      <p className="text-center mt-10 text-error font-bold">Food not found</p>
    );

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 transition-colors duration-300">
      <Toaster position="top-center" />

      {/* Main Details Card */}
      <div className="card lg:card-side bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden">
        <figure className="lg:w-1/2 overflow-hidden">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-full min-h-[300px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </figure>

        <div className="card-body lg:w-1/2 p-8">
          <div className="flex justify-between items-start">
            <h2 className="text-4xl font-bold text-[#F0845C] elms-font">
              {food.foodName}
            </h2>
            <span
              className={`badge badge-lg border-none text-white ${
                food.food_status === 'donated' ? 'bg-error' : 'bg-success'
              }`}
            >
              {food.food_status}
            </span>
          </div>

          <div className="space-y-3 mt-4 text-base-content/80">
            <p className="flex items-center gap-2">
              <strong className="text-base-content">Quantity:</strong>{' '}
              {food.foodQuantityNumber} portions
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-base-content">Pickup:</strong>{' '}
              {food.pickupLocation}
            </p>
            <p className="flex items-center gap-2">
              <strong className="text-base-content">Expires:</strong>{' '}
              {new Date(food.expireDate).toLocaleDateString()}
            </p>
            <div className="bg-base-200 p-4 rounded-xl mt-4">
              <strong className="text-base-content block mb-1">Notes:</strong>
              <p className="italic text-sm">
                {food.notes || 'No extra instructions provided.'}
              </p>
            </div>
          </div>

          {/* Donator Section */}
          <div className="mt-8 pt-6 border-t border-base-content/10 flex items-center gap-4">
            <img
              src={
                food.donator?.photoURL || 'https://i.ibb.co/8LQPQJ6s/user.png'
              }
              alt={food.donator?.name}
              className="w-14 h-14 rounded-full"
            />
            <div>
              <p className="font-bold text-base-content">
                {food.donator?.name}
              </p>
              <p className="text-sm text-base-content/60">
                {food.donator?.email}
              </p>
            </div>
          </div>

          {user?.email !== food.donator?.email &&
            food.food_status !== 'donated' && (
              <button
                onClick={() => setShowModal(true)}
                className="btn bg-[#F0845C] hover:bg-[#e5734c] text-white border-none rounded-xl mt-8 w-full lg:w-max px-10 shadow-lg shadow-[#f0845c33]"
              >
                Request This Food
              </button>
            )}
        </div>
      </div>

      {/* Request Table Section */}
      {user?.email === food?.donator?.email && requests.length > 0 && (
        <div className="mt-12 bg-base-100 shadow-xl rounded-2xl p-6 border border-base-content/5">
          <h3 className="text-2xl font-bold mb-6 text-base-content elms-font flex items-center gap-2">
            <span className="w-2 h-8 bg-[#F0845C] rounded-full"></span> Incoming
            Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-base-200 text-base-content/70">
                <tr>
                  <th>Requester</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-base-content/80">
                {requests.map(req => (
                  <tr
                    key={req._id}
                    className="hover:bg-base-200/50 transition-colors"
                  >
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle w-10 h-10">
                            <img src={req.photoURL} alt={req.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold text-base-content">
                            {req.name}
                          </div>
                          <div className="text-xs opacity-50">
                            {req.contact}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="text-sm max-w-xs truncate">
                        <span className="font-semibold">Reason:</span>{' '}
                        {req.reason}
                      </p>
                      <p className="text-xs opacity-60">Loc: {req.location}</p>
                    </td>
                    <td>
                      <span
                        className={`badge badge-sm font-bold ${
                          req.status === 'accepted'
                            ? 'badge-success'
                            : req.status === 'rejected'
                            ? 'badge-error'
                            : 'badge-ghost'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="flex gap-2">
                      {req.status === 'pending' ? (
                        <>
                          <button
                            className="btn btn-xs btn-success text-white"
                            onClick={() =>
                              handleAcceptReject(req._id, 'accepted')
                            }
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-xs btn-error text-white"
                            onClick={() =>
                              handleAcceptReject(req._id, 'rejected')
                            }
                          >
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs italic opacity-40">
                          Processed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <FoodReqModal
          foodId={food._id}
          foodName={food.foodName}
          donator={food.donator}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}; 

export default FoodDetails;
