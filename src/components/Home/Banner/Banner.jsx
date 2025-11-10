import { FaArrowRightLong } from 'react-icons/fa6';
import { LuUsers } from 'react-icons/lu';
import { LuChefHat } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';
import { FaRegStar } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa6';


const Banner = () => {
  return (
    <div className="py-28 grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10">
      <div className="banner-left lg:max-w-[90%] max-w-full">
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
        <p className="text-[10px] text-[#00000075] mt-8 mb-16">
          ✓ Active Donator: 1,200+ • ✓ Happy Clients: 10,000+
        </p>

        <div className="btns grid lg:grid-cols-4 grid-cols-2 gap-5">
          <button className="group flex flex-col justify-center items-center rounded-2xl py-6 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuUsers className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              1,200+
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Active Donator
            </p>
          </button>

          <button className="group flex flex-col justify-center items-center rounded-2xl py-6 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <LuChefHat className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              50,000+
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Meals Shared
            </p>
          </button>

          <button className="group flex flex-col justify-center items-center rounded-2xl py-6 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <GrLocation className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />

            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c]">
              25
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Cities
            </p>
          </button>

          <button className="group flex flex-col justify-center items-center rounded-2xl py-6 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md">
            <FaRegStar className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:text-[#f0845c]" />
            <h4 className="elms-font font-black text-2xl my-2 transition-all duration-500 ease-in-out group-hover:text-[#f0845c] flex items-center gap-2">
              4.9 <FaStar className="text-[#f0845c] text-lg" />
            </h4>
            <p className="text-[#00000075] text-[9px] transition-all duration-500 ease-in-out group-hover:text-[#000000a0]">
              Average Rating
            </p>
          </button>
        </div>
      </div>

      <div className="relative h-[503px] banner-right rounded-2xl bg-[url('https://i.ibb.co.com/9HK2dHC2/banner.jpg')] bg-cover">
        <button className="absolute bg-[#fd7d056c] top-5 left-5 btn flex items-center gap-2 text-left py-8 px-4 rounded-xl border border-[#e0e0e0] hover:scale-[1.03] transition-all duration-500 ease-in-out">
          {/* Avatar Circle */}
          <div className="flex items-center justify-center rounded-full bg-[#f0845c] text-white font-bold border border-[#f0845c] w-10 h-10 shadow-sm">
            AK
          </div>
          <div>
            <p className="font-semibold text-[#0e0d0d]">AK Ai Kong</p>
            <p className="text-sm text-gray-50">Shared a new recipe</p>
          </div>
        </button>

        {/* Rating Button */}
        <button className="absolute top-5 right-5 flex flex-col items-center justify-center bg-transparent border border-[#e0e0e0] rounded-xl px-6 py-4 hover:scale-[1.03] hover:shadow-md transition-all duration-500 ease-in-out">
          <div className="flex gap-1 mb-2">
            <FaStar className="text-[#f0845c] text-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <FaStar className="text-[#f0845c] text-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <FaStar className="text-[#f0845c] text-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <FaStar className="text-[#f0845c] text-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
            <FaStar className="text-[#f0845c] text-lg transition-transform duration-500 ease-in-out group-hover:scale-110" />
          </div>
          <span className="font-semibold text-[#f3f3f3fa]">Perfect!</span>
        </button>

        {/* Likes Button */}
        <button className="absolute bottom-5 right-5 flex flex-col items-center justify-center bg-[#1414132d] border border-[#e0e0e0] rounded-xl px-6 py-4 hover:scale-[1.03] hover:shadow-md transition-all duration-500 ease-in-out">
          <span className="text-white font-semibold text-sm">
            ❤️ 30+ Likes This
          </span>
          <p className="text-[#0c0500f8] text-xs mt-1">Recipe rocks!</p>
        </button>
      </div>
    </div>
  );
};

export default Banner;
