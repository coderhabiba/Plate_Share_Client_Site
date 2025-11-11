import { IoSearch } from 'react-icons/io5';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FiCodesandbox } from 'react-icons/fi';

const steps = [
  {
    title: 'Browse Local Meals',
    text: 'Discover homemade dishes from talented cooks in your neighborhood',
    icon: <IoSearch className="text-3xl" />,
  },
  {
    title: 'Place Your Order',
    text: 'Select your favorite meal and schedule a convenient pickup time',
    icon: <RiShoppingCartLine className="text-3xl" />,
  },
  {
    title: 'Pick Up & Enjoy',
    text: 'Collect your fresh, homemade meal and savor the authentic flavors',
    icon: <FiCodesandbox className="text-3xl" />,
  },
];

const HowItWork = () => {
  return (
    <div className="bg-[#fafafa]">
      <div className="relative px-4 py-20 max-w-6xl mx-auto">
        <div
          className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-64 bg-[radial-gradient(closest-side,rgba(16,185,129,0.08),transparent_70%)]"
          aria-hidden
        />

        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-extrabold bg-linear-to-r from-[#677374] to-[#307A7F] bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="mt-3 text-base text-zinc-600 dark:text-zinc-400">
            Getting started with Plate Share is simple and straight forward
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative flex-1">
              {index < steps.length - 1 && (
                <div
                  aria-hidden
                  className="absolute md:block hidden right-[-8%] top-1/2 h-0.5 w-[16%] bg-linear-to-r from-lime-600 to-teal-400"
                />
              )}

              <div className="group relative rounded-2xl border border-zinc-200/60 bg-[#F7F7F7] p-8 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-all duration-300 ease-out transform hover:-translate-y-2 hover:shadow-lg hover:border-[#F0845C]">
                <div className="relative mx-auto mb-6 grid place-items-center">
                  <div
                    className="absolute left-24 top-0 inset-0 size-28 rounded-full bg-linear-to-br from-emerald-100 blur-xl"
                    aria-hidden
                  />
                  <div className="relative grid size-20 place-items-center rounded-full bg-linear-to-br from-[#EBE8DC] text-amber-600 to-[#E4EAD9] shadow-sm ring-1 ring-zinc-200 transition-colors group-hover:text-[#4CC841]">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-center text-sm font-semibold tracking-tight bg-linear-to-r from-[#677374] to-[#307A7F] bg-clip-text text-transparent">
                  {step.title}
                </h3>
                <p className="mt-2 text-center text-xs text-zinc-600 dark:text-zinc-400">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
