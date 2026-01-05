import {
  FaUtensils,
  FaAppleWhole,
  FaCakeCandles,
  FaBowlRice,
} from 'react-icons/fa6';

const FoodCategories = () => {
  const categories = [
    {
      name: 'Home Cooked',
      icon: <FaBowlRice />,
      desc: 'Fresh from home kitchens',
      color: 'from-orange-400 to-[#f0845c]',
    },
    {
      name: 'Bakery',
      icon: <FaCakeCandles />,
      desc: 'Delicious baked goods',
      color: 'from-teal-400 to-[#307A7F]',
    },
    {
      name: 'Organic',
      icon: <FaAppleWhole />,
      desc: 'Fresh farm produce',
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'Quick Meal',
      icon: <FaUtensils />,
      desc: 'Ready to eat snacks',
      color: 'from-blue-400 to-blue-600',
    },
  ];

  return (
    <section className="py-24 bg-[#fcfcfc] dark:bg-base-100 overflow-hidden">
      <div className="max-w-[82%] mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#f0845c] font-bold tracking-widest uppercase text-xl elms-font">
            Categories
          </span>
          <h2 className="text-5xl font-black mt-2 elms-font">
            What's on the Menu?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, i) => (
            <div
              key={i}
              className="group relative p-10 bg-white dark:bg-base-200 rounded-[2rem] shadow-xl shadow-gray-100 dark:shadow-none hover:-translate-y-3 transition-all duration-500 border border-gray-50 dark:border-gray-800"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white text-3xl mb-6 shadow-lg rotate-3 group-hover:rotate-0 transition-transform duration-500`}
              >
                {cat.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">
                {cat.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {cat.desc}
              </p>
              <div className="absolute top-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <div className="text-8xl">{cat.icon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FoodCategories;
