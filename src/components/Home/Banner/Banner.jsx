import { FaArrowRightLong, FaStar } from 'react-icons/fa6';
import { LuUsers, LuChefHat } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';
import { FaRegStar } from 'react-icons/fa';
import { NavLink } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect, useState } from 'react';

const Banner = () => {
  const [leftAos, setLeftAos] = useState('fade-up');
  const [rightAos, setRightAos] = useState('fade-up');

  useEffect(() => {
    const setAosDirection = () => {
      if (window.innerWidth < 768) {
        setLeftAos('fade-down');
        setRightAos('fade-up');
      } else {
        setLeftAos('fade-right');
        setRightAos('fade-left');
      }
    };

    setAosDirection();
    window.addEventListener('resize', setAosDirection);

    AOS.init({
      duration: 1200,
      offset: 100,
      mirror: true,
      once: false,
      easing: 'ease-in-out',
    });
    
    AOS.refreshHard();
    // AOS.refresh();

    return () => {
      window.removeEventListener('resize', setAosDirection);
    };
  }, []);

  return (
    <div className="overflow-hidden py-28 grid lg:grid-cols-2 grid-cols-1 lg:gap-0 gap-10 max-w-[80%] mx-auto">
      <div data-aos={leftAos} className="banner-left lg:max-w-[90%] max-w-full">
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
          <NavLink
            to="/available-food"
            className="btn bg-[#f0845c] text-white hover:scale-105 transition-all ease-in-out hover:shadow-2xl shadow-[#817e7e]"
          >
            View All Foods <FaArrowRightLong />
          </NavLink>
          <NavLink
            to="/add-food"
            className="btn bg-[#f5f5f5] hover:scale-105 transition-all ease-in-out shadow-[#817e7e] hover:border-[#F0845C] hover:text-gray-500"
          >
            Add Food
          </NavLink>
        </div>
        <p className="text-[10px] text-[#00000075] mt-8 mb-16">
          ✓ Active Donator: 1,200+ • ✓ Happy Clients: 10,000+
        </p>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
          {[
            { icon: <LuUsers />, count: '1,200+', label: 'Active Donator' },
            { icon: <LuChefHat />, count: '50,000+', label: 'Meals Shared' },
            { icon: <GrLocation />, count: '25', label: 'Cities' },
            {
              icon: <FaRegStar />,
              count: '4.9',
              label: 'Average Rating',
              star: true,
            },
          ].map((item, i) => (
            <button
              key={i}
              className="group flex flex-col justify-center items-center rounded-2xl py-6 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md"
            >
              <div className="text-[#f0845c] text-2xl transition-all duration-500 ease-in-out group-hover:scale-110">
                {item.icon}
              </div>
              <h4 className="elms-font font-black text-2xl my-2 group-hover:text-[#f0845c] flex items-center gap-2">
                {item.count}
                {item.star && <FaStar className="text-[#f0845c] text-lg" />}
              </h4>
              <p className="text-[#00000075] text-[9px] group-hover:text-[#000000a0]">
                {item.label}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div
        data-aos={rightAos}
        className="relative h-[503px] banner-right rounded-2xl bg-[url('https://i.ibb.co.com/9HK2dHC2/banner.jpg')] bg-cover"
      >
        <div
          className="absolute bg-[#fd7d056c] top-5 left-5 btn flex items-center gap-2 text-left lg:py-8 py-4 lg:px-4 px-2 rounded-xl border border-[#e0e0e0] hover:scale-[1.03] transition-all"
          data-aos={rightAos}
        >
          <div className="flex items-center justify-center rounded-full bg-[#f0845c] text-white font-bold border border-[#f0845c] lg:w-10 w-7 lg:h-10 h-7">
            AK
          </div>
          <div>
            <p className="font-semibold text-[#0e0d0d] lg:text-sm text-xs">
              AK Ai Kong
            </p>
            <p className="lg:text-sm text-[10px] text-gray-50">
              Shared a new recipe
            </p>
          </div>
        </div>
        <div
          className="absolute top-5 right-5 flex flex-col items-center justify-center border border-[#e0e0e0] rounded-xl lg:px-6 px-3 lg:py-4 py-2 hover:scale-[1.03] transition-all bg-transparent"
          data-aos={rightAos}
        >
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-[#f0845c] lg:text-lg text-xs" />
            ))}
          </div>
          <span className="font-semibold text-[#f3f3f3fa] lg:text-xs text-[8px]">
            Perfect!
          </span>
        </div>
        <div
          className="absolute bottom-5 right-5 flex flex-col items-center justify-center bg-[#14141391] border border-[#e0e0e0] rounded-xl lg:px-6 px-3 lg:py-4 py-2 hover:scale-[1.03] transition-all"
          data-aos={rightAos}
        >
          <span className="text-white font-semibold lg:text-sm text-[10px]">
            ❤️ 30+ Likes This
          </span>
          <p className="text-[#35f705fd] lg:text-xs text-[8px] mt-1">
            Recipe rocks!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
