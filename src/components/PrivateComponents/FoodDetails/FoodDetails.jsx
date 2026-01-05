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
        const data = await res.json();
        setFood(data);

        // Fetch requests if the user is the donator
        if (user.email === data.donator?.email) {
          const reqRes = await fetch(
            `https://plate-share-server-site.vercel.app/food-request/${id}`
          );
          const reqData = await reqRes.json();
          setRequests(reqData);
        }
      } catch (err) {
        toast.error('Failed to load details');
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
        toast.success(`Request ${action}ed!`);
        setRequests(prev =>
          prev.map(req =>
            req._id === requestId ? { ...req, status: action } : req
          )
        );

        if (action === 'accepted') {
          setFood(prev => ({
            ...prev,
            foodQuantityNumber: prev.foodQuantityNumber - 1,
          }));
        }
      }
    } catch (error) {
      toast.error('Action failed');
    }
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto my-12 px-4 space-y-12">
      <Toaster position="top-center" />

      {/* --- Section 1: Hero / Overview --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-white dark:bg-base-100 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
        <div className="relative group overflow-hidden rounded-2xl">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute top-4 right-4 bg-green-500 backdrop-blur px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
            {food.food_status}
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <h1 className="text-5xl font-black elms-font leading-tight">
            {food.foodName}
          </h1>
          <p className="text-lg italic leading-relaxed">
            "
            {food.notes ||
              'This meal is prepared with love and ready to be shared with someone in need.'}
            "
          </p>

          <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-base-200 rounded-2xl">
            <img
              src={food.donator?.photoURL}
              className="w-14 h-14 rounded-full"
              alt=""
            />
            <div>
              <p className="font-bold">
                {food.donator?.name}
              </p>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                Verified Donor
              </p>
            </div>
          </div>

          {user?.email !== food.donator?.email &&
            food.food_status !== 'donated' && (
              <button
                onClick={() => setShowModal(true)}
                className="btn btn-lg bg-[#F0845C] border-none text-white hover:bg-[#307A7F] transition-all duration-300 rounded-2xl shadow-xl shadow-orange-100 dark:shadow-none"
              >
                Request This Food
              </button>
            )}
        </div>
      </div>

      {/* --- Section 2: Key Information & Description --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white dark:bg-base-100 p-8 rounded-3xl shadow-sm border border-gray-50 dark:border-gray-800">
          <h3 className="text-2xl font-bold mb-6 text-[#307A7F] flex items-center gap-2">
            <span className="w-1.5 h-6 bg-[#F0845C] rounded-full"></span>{' '}
            Description & Instructions
          </h3>
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
            <p>
              This food was prepared on{' '}
              <strong>{new Date().toLocaleDateString()}</strong>. We ensure
              high-quality standards for all shared items. Please follow the
              pickup instructions below for a smooth experience.
            </p>
            <ul className="mt-4 space-y-2">
              <li>• Bring your own container if possible.</li>
              <li>• Collect the food within the mentioned expiry date.</li>
              <li>• Inform the donor at least 30 minutes before arrival.</li>
            </ul>
          </div>
        </div>

        <div className="bg-[#307A7F] p-8 rounded-3xl text-white shadow-lg space-y-6">
          <h3 className="text-xl font-black uppercase tracking-widest border-b border-white/20 pb-4">
            Key Specs
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="opacity-70 font-bold">Quantity</span>
              <span className="font-black text-xl">
                {food.foodQuantityNumber} Servings
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70 font-bold">Pickup At</span>
              <span className="font-bold text-right">
                {food.pickupLocation}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-70 font-bold">Expires On</span>
              <span className="bg-red-500 px-3 py-1 rounded-lg font-bold text-sm">
                {new Date(food.expireDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- Section 3: Donor Requests (Only for Donor) --- */}
      {user?.email === food?.donator?.email && requests.length > 0 && (
        <div className="bg-white dark:bg-base-100 shadow-2xl rounded-3xl p-8 overflow-hidden border-t-8 border-[#307A7F]">
          <h3 className="text-3xl font-black mb-8 tracking-tight">
            Manage Requests
          </h3>
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-[#307A7F] font-black uppercase text-xs tracking-[0.2em]">
                  <th className="bg-transparent">Requester</th>
                  <th className="bg-transparent">Reason</th>
                  <th className="bg-transparent text-center">Status</th>
                  <th className="bg-transparent text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {requests.map(req => (
                  <tr
                    key={req._id}
                    className="bg-slate-50 dark:bg-base-200 shadow-sm rounded-xl"
                  >
                    <td className="rounded-l-2xl">
                      <div className="flex items-center gap-3">
                        <img
                          src={req.photoURL}
                          className="w-10 h-10 rounded-full"
                          alt=""
                        />
                        <span className="font-bold">{req.name}</span>
                      </div>
                    </td>
                    <td>
                      <p className="max-w-xs truncate italic">"{req.reason}"</p>
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          req.status === 'accepted'
                            ? 'bg-green-100 text-green-600'
                            : 'bg-orange-100 text-orange-600'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="rounded-r-2xl text-right">
                      {req.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleAcceptReject(req._id, 'accepted')
                            }
                            className="btn btn-xs btn-success text-white px-4"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() =>
                              handleAcceptReject(req._id, 'rejected')
                            }
                            className="btn btn-xs btn-error text-white px-4"
                          >
                            Reject
                          </button>
                        </div>
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
          foodImage={food.foodImage}
          donator={food.donator}
          pickupLocation={food.pickupLocation}
          expireDate={food.expireDate}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

export default FoodDetails;
