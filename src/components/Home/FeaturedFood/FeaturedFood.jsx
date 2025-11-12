import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FeaturedFood = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch('http://localhost:3000/foods');
        const data = await res.json();

        const sortedFoods = data
          .sort((a, b) => {
            const aQty = parseInt(a.foodQuantity.match(/\d+/)?.[0] || 0);
            const bQty = parseInt(b.foodQuantity.match(/\d+/)?.[0] || 0);
            return bQty - aQty;
          })
          .slice(0, 6);

        setFoods(sortedFoods);
      } catch (err) {
        console.error('Failed to fetch foods:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-gray-50 py-20">
      <div className="max-w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text-[#307A7F] mb-12 text-center">
          Featured Foods
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map(food => {
            const statusColor =
              food.food_status === 'donated' ? 'bg-red-500' : 'bg-green-500';

            return (
              <div
                key={food._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl flex flex-col"
              >
                <div className="relative">
                  <img
                    src={food.foodImage}
                    alt={food.foodName}
                    className="w-full h-56 object-cover"
                  />
                  <span
                    className={`${statusColor} text-white px-3 py-1 rounded-full text-sm font-semibold absolute top-3 left-3 shadow-md`}
                  >
                    {food.food_status || 'Available'}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {food.foodName}
                    </h3>
                    <p className="text-gray-600 mt-2">{food.foodQuantity}</p>
                    <p className="text-gray-600 mt-1">
                      <span className="font-semibold">Pickup:</span>{' '}
                      {food.pickupLocation}
                    </p>
                    {food.notes && (
                      <p className="text-gray-500 mt-1 italic">{food.notes}</p>
                    )}
                  </div>

                  <button
                    onClick={() => navigate(`/food/${food._id}`)}
                    className="mt-5 w-full bg-[#F0845C] text-white py-2 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:bg-[#e5734c] shadow-md"
                  >
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate('/available-food')}
            className="bg-[#F0845C] text-white px-8 py-3 rounded-full font-medium transition-transform duration-300 hover:scale-105 hover:bg-[#e5734c] shadow-md"
          >
            Show All
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFood;
