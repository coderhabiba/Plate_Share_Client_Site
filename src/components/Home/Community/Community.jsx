
const Community = () => {
  return (
    <div className="bg-linear-to-r from-teal-700 via-gray-600 to-orange-500 text-white py-16 px-6 text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Ready to Join Our Community?
      </h2>
      <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-gray-100">
        Start your journey with{' '}
        <span className="font-semibold">PlateShare</span> today. Discover
        amazing meals or share your cooking with neighbors.
      </p>
      <div className="flex justify-center gap-4">
        <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-md shadow-md hover:bg-orange-100 transition">
          Get Started Now
        </button>
        <button className="bg-gray-100 text-gray-500 font-semibold px-6 py-2 rounded-md shadow-md hover:bg-gray-200 transition">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default Community;