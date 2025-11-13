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

        if (
          user.email &&
          data.donator?.email &&
          user.email === data.donator.email
        ) {
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
          await fetch(
            `https://plate-share-server-site.vercel.app/foods/${food._id}`,
            {
              method: 'PATCH',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ food_status: 'donated' }),
            }
          );
          setFood(prev => ({ ...prev, food_status: 'donated' }));
        }
      } else {
        toast.error('Failed to update request');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  if (!food) return <p className="text-center mt-10">Food not found</p>;

  return (
    <div className="max-w-5xl mx-auto my-20 px-4">
      <Toaster position="top-center" />

      <div className="card lg:card-side bg-white shadow-xl p-5 mb-8">
        <figure className="lg:w-1/2">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-full object-cover rounded-lg"
          />
        </figure>

        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-3xl text-[#F0845C]">
            {food.foodName}
          </h2>
          <p>
            <strong>Quantity:</strong> {food.foodQuantityNumber}
          </p>
          <p>
            <strong>Pickup Location:</strong> {food.pickupLocation}
          </p>
          <p>
            <strong>Expire Date:</strong>{' '}
            {new Date(food.expireDate).toLocaleDateString()}
          </p>
          <p>
            <strong>Notes:</strong> {food.notes || 'N/A'}
          </p>
          <div className='mt-3 flex md:flex-row flex-col items-center gap-3'>
            <div className="flex items-center gap-2">
              <img
                src={food.donator?.photoURL}
                alt={food.donator?.name}
                className="w-12 h-12 rounded-full"
              />
              <p>
                <strong>Donator Name:</strong> {food?.donator?.name}
              </p>
            </div>
            <p>
              <strong>Donator Email:</strong> {food?.donator?.email}
            </p>
          </div>

          {user && food && food.donator && user.email !== food.donator.email ? (
            <button
              onClick={() => setShowModal(true)}
              className="mt-5 bg-[#F0845C] text-white px-4 py-2 rounded-full hover:bg-[#e5734c]"
            >
              Request Food
            </button>
          ) : null}
        </div>
      </div>

      {user?.email === food?.donator?.email && requests.length > 0 && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-5">
          <h3 className="text-xl font-semibold mb-4">Food Requests</h3>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Photo</th>
                <th>Location</th>
                <th>Reason</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req._id}>
                  <td>{req.name}</td>
                  <td>
                    <img
                      src={req.photoURL}
                      alt={req.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td>{req.location}</td>
                  <td>{req.reason}</td>
                  <td>{req.contact}</td>
                  <td>{req.status}</td>
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm btn-success"
                      disabled={req.status !== 'pending'}
                      onClick={() => handleAcceptReject(req._id, 'accepted')}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      disabled={req.status !== 'pending'}
                      onClick={() => handleAcceptReject(req._id, 'rejected')}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
