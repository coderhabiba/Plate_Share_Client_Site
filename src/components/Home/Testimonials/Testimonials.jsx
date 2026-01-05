const Testimonials = () => {
  const reviews = [
    {
      name: 'Rahat Kabir',
      role: 'Receiver',
      text: 'Plate Share changed how I think about community. The food was warm and delicious!',
      img: 'https://i.pravatar.cc/100?img=12',
    },
    {
      name: 'Anika Habiba',
      role: 'Donor',
      text: 'A seamless way to share love through food. Highly recommended platform.',
      img: 'https://i.pravatar.cc/100?img=26',
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-base-200">
      <div className="max-w-[82%] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-5xl font-black mb-6 elms-font leading-tight dark:text-white">
            Loved by our <br />{' '}
            <span className="text-[#f0845c]">Kind Community</span>
          </h2>
          <p className="text-gray-500 mb-8 max-w-md">
            Hear from the people who have already experienced the joy of sharing
            and receiving.
          </p>
          <button className="btn btn-ghost text-[#307A7F] font-bold p-0 hover:bg-transparent">
            Read All Stories →
          </button>
        </div>
        <div className="relative">
          {reviews.map((r, i) => (
            <div
              key={i}
              className={`p-8 bg-white dark:bg-base-100 rounded-3xl shadow-2xl shadow-gray-200 dark:shadow-none mb-6 border border-gray-100 dark:border-gray-800 flex items-center gap-6 ${
                i === 1 ? 'lg:ml-12' : ''
              }`}
            >
              <img
                src={r.img}
                className="w-20 h-20 rounded-2xl object-cover"
                alt=""
              />
              <div>
                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-2">
                  "{r.text}"
                </p>
                <h4 className="font-black dark:text-white">
                  {r.name}{' '}
                  <span className="text-xs font-normal text-gray-400 ml-2">
                    | {r.role}
                  </span>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Testimonials;
