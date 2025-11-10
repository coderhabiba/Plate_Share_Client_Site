import { FaArrowRightLong } from 'react-icons/fa6';
import { LuUsers } from 'react-icons/lu';
import { LuChefHat } from 'react-icons/lu';
const Banner = () => {
  return (
    <div className="py-28 grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10">
      <div className="banner-left">
        <h1 className="lg:text-6xl text-5xl elms-font font-bold mb-6">
          Share Meals,
          <span className="bg-linear-to-r from-[#f0845c] to-[#86A4AD] bg-clip-text text-transparent elms-font">
            Build <br /> Community
          </span>
        </h1>
        <p className="mb-6 text-[#00000075]">
          Connect with talented home cooks in your neighborhood. Discover <br />
          authentic, homemade meals made with love.
        </p>
        <div className="flex gap-5">
          <button className="btn bg-[#f0845c] text-white hover:scale-105 transition-all ease-in-out hover:shadow-2xl shadow-2xl shadow-[#817e7e] elms-font">
            View All Foods <FaArrowRightLong />
          </button>
          <button className="btn bg-[#f5f5f5] shadow-2xl hover:scale-105 transition-all ease-in-out hover:shadow-2xl shadow-[#817e7e] hover:border-[#F0845C] hover:text-gray-500 elms-font">
            Add Food
          </button>
        </div>
        <p className="text-[10px] text-[#00000075] mt-8 mb-20">
          ✓ Active Donator: 1,200+ • ✓ Happy Clients: 10,000+
        </p>

        <div className="btns grid lg:grid-cols-4 grid-cols-2 gap-5">
          <button className="group flex flex-col justify-center items-center rounded-2xl p-5 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuUsers className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              1,200+
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Active Donator
            </p>
          </button>

          <button className="group flex flex-col justify-center items-center rounded-2xl p-5 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuChefHat className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              50,000+
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Meals Shared
            </p>
          </button>

          
          <button className="group flex flex-col justify-center items-center rounded-2xl p-5 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuUsers className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              25
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Cities
            </p>
          </button>
          <button className="group flex flex-col justify-center items-center rounded-2xl p-5 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuUsers className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              4.9
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Average Rating
            </p>
          </button>
        </div>
      </div>
      <div className="banner-right">
        <img
          className="rounded-2xl"
          src="https://i.ibb.co.com/9HK2dHC2/banner.jpg"
          alt="banner"
        />
      </div>
    </div>
  );
};

export default Banner;
