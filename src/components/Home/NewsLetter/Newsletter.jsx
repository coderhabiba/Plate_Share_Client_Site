const Newsletter = () => {
  return (
    <section className="py-24 max-w-[82%] mx-auto">
      <div className="relative rounded-[3rem] p-12 lg:p-20 overflow-hidden text-center">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#307A7F] to-[#1a4547]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
          </svg>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-6 elms-font">
            Don’t miss a{' '}
            <span className="text-orange-400 underline italic">
              Single Meal.
            </span>
          </h2>
          <p className="text-teal-50 mb-10 text-lg">
            Join 5,000+ community members. We’ll notify you when fresh food is
            shared in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 bg-white/10 p-2 rounded-3xl backdrop-blur-md border border-white/20">
            <input
              type="email"
              placeholder="yourname@gmail.com"
              className="input bg-transparent border-none text-white placeholder:text-teal-100 focus:outline-none w-full px-6"
            />
            <button className="btn bg-white text-[#307A7F] hover:bg-orange-500 hover:text-white rounded-2xl border-none px-10 transition-all font-bold">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Newsletter;
