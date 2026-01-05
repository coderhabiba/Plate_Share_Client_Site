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
      duration: 1000,
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
          .sort(
            (a, b) =>
              (parseInt(b.foodQuantityNumber) || 0) -
              (parseInt(a.foodQuantityNumber) || 0)
          )
          .slice(0, 6);
        setFoods(sortedFoods);

        setTimeout(() => AOS.refresh(), 100);
      } catch (err) {
        console.error('Failed to fetch foods:', err);
      }
      setLoading(false);
    };
    fetchFoods();
  }, []);

  const donatedCount = allFoodsCount.filter(
    f => f.food_status === 'donated'
  ).length;
  const availableCount = allFoodsCount.filter(
    f => f.food_status === 'available'
  ).length;
  const activeDonors = [
    ...new Set(allFoodsCount.map(f => f.donator?.email)),
  ].filter(Boolean).length;

  if (loading)
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-spinner text-[#F0845C] loading-lg"></span>
      </div>
    );

  return (
    <div
      id="featured-foods"
      className="bg-base-200 py-24 transition-colors duration-300 overflow-hidden"
    >
      <div className="max-w-[81%] mx-auto">
        <div className="text-center mb-20" data-aos="fade-up">
          <span className="text-[#f0845c] font-bold tracking-widest uppercase text-xs">
            Top Rated
          </span>
          <h2 className="text-5xl font-black mt-2 elms-font leading-tight">
            Featured <span className="text-[#307A7F]">Meals</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#f0845c] mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Columns Layout for Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {foods.map((food, index) => (
            <div
              key={food._id}
              data-aos="flip-left"
              data-aos-delay={index * 100}
              className="bg-base-100 rounded-3xl shadow-xl overflow-hidden flex flex-col group transition-all duration-700 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={food.foodImage}
                  alt={food.foodName}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-125"
                />
                <span className="bg-green-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black absolute top-4 left-4 shadow-lg tracking-widest">
                  available
                </span>

                {/* Hover notes overlay */}
                {food.notes && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center p-6 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 text-xs italic">
                    "{food.notes.slice(0, 80)}..."
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-black mb-4 line-clamp-1 group-hover:text-[#F0845C] transition-colors">
                    {food.foodName}
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 font-bold">
                    <p className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span>Quantity:</span>
                      <span className="text-[#307A7F]">
                        {food.foodQuantityNumber} Pcs
                      </span>
                    </p>
                    <p className="flex justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
                      <span>Pickup:</span>
                      <span className="truncate ml-4">
                        {food.pickupLocation}
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => navigate(`/food/${food._id}`)}
                  className="mt-6 w-full bg-[#F0845C] text-white py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 hover:bg-[#307A7F] shadow-lg shadow-orange-100 dark:shadow-none"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Statistics Section - Ultra Smooth Animation Fixed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 px-4">
          {[
            {
              label: 'Total Shared',
              count: donatedCount,
              color: 'text-[#F0845C]',
              border: 'border-[#F0845C]',
              desc: 'Meals successfully delivered',
              delay: '0',
            },
            {
              label: 'Currently Available',
              count: availableCount,
              color: 'text-[#307A7F]',
              border: 'border-[#307A7F]',
              desc: 'Waiting for collection',
              delay: '200',
            },
            {
              label: 'Active Donors',
              count: activeDonors,
              color: 'text-yellow-500',
              border: 'border-yellow-500',
              desc: 'Community members',
              delay: '400',
            },
          ].map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={stat.delay}
              className={`group bg-white dark:bg-base-100 p-10 rounded-[2rem] shadow-[0_10px_30px_-15px_rgba(0,0,0,0.1)] border-t-[10px] ${stat.border} text-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] cursor-default relative overflow-hidden`}
            >
              {/* Background Subtle Shine Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-gray-100/50 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative z-10">
                <h4 className="text-gray-400 dark:text-gray-500 font-black uppercase text-[11px] tracking-[0.2em] mb-4 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300">
                  {stat.label}
                </h4>
                <p
                  className={`text-6xl font-black ${stat.color} mb-3 transition-transform duration-500 group-hover:scale-110`}
                >
                  {stat.count}
                  {index !== 1 ? '+' : ''}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 font-bold italic opacity-80 group-hover:opacity-100">
                  {stat.desc}
                </p>
              </div>

              {/* Bottom Decorative Bar that expands on hover */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 ${stat.color.replace(
                  'text',
                  'bg'
                )} transition-all duration-500 group-hover:w-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={() => navigate('/available-food')}
            className="bg-[#307A7F] hover:bg-[#F0845C] text-white px-12 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-500 hover:scale-110 shadow-2xl"
          >
            Show All Foods
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedFood;
