import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const AvailableFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          'https://plate-share-server-site.vercel.app/foods'
        );
        const data = await res.json();
        const availableFoods = data.filter(
          food => food.food_status?.toLowerCase() === 'available'
        );
        setFoods(availableFoods);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch foods!');
      }
      setLoading(false);
    };
    fetchFoods();
  }, []);

  const handleViewDetails = foodId => {
    if (!user) {
      toast.error('Please login to view details!');
      navigate('/login');
    } else {
      navigate(`/food/${foodId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-[80%] mx-auto py-20">
      <Toaster position="top-center" />
      <h2 className="text-4xl font-bold text-[#307A7F] mb-12 text-center">
        Available Foods
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {foods.length === 0 && (
          <p className="col-span-full text-center">No available foods.</p>
        )}
        {foods.map(food => {
          return (
            <div
              key={food._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl relative"
            >
              <div className="relative group overflow-hidden">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:-scale-x-100"
                />
                <span className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                  Available
                </span>
                {food.notes && (
                  <div className="absolute bottom-0 left-0 w-full bg-black/70 text-white text-center p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {food.notes}
                  </div>
                )}
              </div>
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {food.foodName}
                </h3>
                <div className="flex items-center gap-2">
                  <img
                    src={food.donator.photoURL}
                    alt={food.donator.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-600">
                    {food.donator.name}
                  </span>
                </div>
                <p className="text-sm">
                  <strong>Quantity:</strong> {food.foodQuantityNumber}
                </p>
                <p className="text-sm">
                  <strong>Pickup:</strong> {food.pickupLocation}
                </p>
                <p className="text-sm">
                  <strong>Expires on:</strong>{' '}
                  {new Date(food.expireDate).toLocaleDateString()}
                </p>
                <button
                  onClick={() => handleViewDetails(food._id)}
                  className="mt-2 w-full bg-[#F0845C] text-white py-2 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:bg-[#e5734c] shadow-md"
                >
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AvailableFood;
