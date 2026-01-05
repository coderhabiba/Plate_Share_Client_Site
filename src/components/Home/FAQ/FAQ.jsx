const FAQ = () => {
  return (
    <section className="py-24 bg-[#fcfcfc] dark:bg-base-100">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-4xl font-black text-center mb-16 elms-font dark:text-white">
          Curious? <span className="text-[#307A7F]">Answers here.</span>
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'Is the food really free?',
              a: 'Absolutely! Plate Share is strictly a non-monetary community platform built on kindness.',
            },
            {
              q: 'Who can be a donor?',
              a: 'Anyone who has surplus, fresh food and wants to help can register and post a food item.',
            },
            {
              q: 'How to ensure safety?',
              a: 'We encourage photos and detailed descriptions. However, receivers should check the food upon pickup.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="collapse collapse-arrow bg-white dark:bg-base-200 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800"
            >
              <input type="radio" name="my-faq" defaultChecked={i === 0} />
              <div className="collapse-title text-lg font-bold py-5">
                {item.q}
              </div>
              <div className="collapse-content text-gray-500 pb-5">
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default FAQ;
