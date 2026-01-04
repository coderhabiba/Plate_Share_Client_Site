import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FeaturedFood = () => {
  const [foods, setFoods] = useState([]);
  const [allFoodsCount, setAllFoodsCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const res = await fetch(
          'https://plate-share-server-site.vercel.app/foods'
        );
        const data = await res.json();

        setAllFoodsCount(data);

        const sortedFoods = data
          .filter(
            food =>
              food.food_status?.toLowerCase() === 'available' &&
              food.foodQuantityNumber > 0
          )
          .sort((a, b) => {
            const qtyA = parseInt(a.foodQuantityNumber) || 0;
            const qtyB = parseInt(b.foodQuantityNumber) || 0;
            return qtyB - qtyA;
          })
          .slice(0, 6);
        setFoods(sortedFoods);

        setTimeout(() => {
          AOS.refresh();
        }, 100);
      } catch (err) {
        console.error('Failed to fetch foods:', err);
      }
      setLoading(false);
    };
    fetchFoods();
  }, []);

  //
  const donatedCount = allFoodsCount.filter(
    f => f.food_status === 'donated'
  ).length;
  const availableCount = allFoodsCount.filter(
    f => f.food_status === 'available'
  ).length;

  // 
  const activeDonors = [
    ...new Set(allFoodsCount.map(f => f.donator?.email)),
  ].filter(Boolean).length;

  if (loading)
    return (
      <div className="flex justify-center items-center mt-10">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div className="bg-base-200 py-20 transition-colors duration-300">
      <div className="max-w-[80%] mx-auto">
        <h2 className="text-4xl font-bold text-[#307A7F] mb-12 text-center">
          Featured Foods
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {foods.map((food, index) => {
            const statusColor =
              food.food_status === 'donated' ? 'bg-red-500' : 'bg-green-500';

            return (
              <div
                key={food._id}
                data-aos="flip-left"
                data-aos-delay={index * 150}
                className="bg-base-100 rounded-2xl shadow-lg overflow-hidden flex flex-col"
              >
                <div className="transform transition duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
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
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                        {food.foodName}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-500 mt-2">
                        <strong>Qty :</strong> {food.foodQuantityNumber}
                      </p>
                      <p className="text-gray-600 dark:text-gray-500 mt-1">
                        <strong>Pickup :</strong> {food.pickupLocation}
                      </p>
                      {food.notes && (
                        <p className="text-gray-500 dark:text-gray-400 mt-1 italic">
                          {food.notes}
                        </p>
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

      {/* Impact Statistics Section */}
      <div className="max-w-[80%] mx-auto mb-16 grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="bg-transparent p-6 rounded-2xl shadow-2xl border-t-4 border-[#F0845C] text-center">
          <h4 className="text-gray-500 font-medium">Total Shared</h4>
          <p className="text-4xl font-bold text-[#F0845C]">{donatedCount}+</p>
          <p className="text-sm text-gray-400">Meals successfully delivered</p>
        </div>

        <div className="bg-transparent p-6 rounded-2xl shadow-2xl border-t-4 border-[#307A7F] text-center">
          <h4 className="text-gray-500 font-medium">Currently Available</h4>
          <p className="text-4xl font-bold text-[#307A7F]">{availableCount}</p>
          <p className="text-sm text-gray-400">Waiting for collection</p>
        </div>

        <div className="bg-transparent p-6 rounded-2xl shadow-2xl border-t-4 border-yellow-500 text-center">
          <h4 className="text-gray-500 font-medium">Active Donors</h4>
          <p className="text-4xl font-bold text-yellow-500">{activeDonors}+</p>
          <p className="text-sm text-gray-400">Community members</p>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFood;
