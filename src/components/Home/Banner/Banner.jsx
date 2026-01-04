import { FaArrowRightLong, FaStar } from 'react-icons/fa6';
import { LuUsers, LuChefHat } from 'react-icons/lu';
import { GrLocation } from 'react-icons/gr';
import { FaRegStar } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { HiOutlineChevronDoubleDown } from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Banner = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      easing: 'ease-in-out',
    });
  }, []);

  const slideData = [
    {
      id: 1,
      title: 'Share Meals, Build Community',
      img: 'https://i.ibb.co.com/9HK2dHC2/banner.jpg',
      desc: 'Connect with talented home cooks in your neighborhood. Discover authentic, homemade meals made with love.',
    },
    {
      id: 2,
      title: 'Save Food, Save the Planet',
      img: 'https://i.ibb.co.com/8g7nDQrF/mission.jpg',
      desc: 'Reduce food waste by sharing surplus with those in need. Small actions lead to big community impacts.',
    },
    {
      id: 3,
      title: 'Authentic Flavors, at Your Door',
      desc: 'Experience the taste of home-cooked goodness from diverse cultures within your community.',
      img: 'https://i.ibb.co.com/Ng6zhMtt/card-5.jpg',
    },
    {
      id: 4,
      title: 'Reduce Waste, Spread Joy',
      desc: 'Join our mission to eliminate food waste by sharing surplus food with those who need it most.',
      img: 'https://i.ibb.co.com/C5cFCB5D/footer.jpg',
    },
  ];

  return (
    <div className="relative overflow-hidden bg-base-100">
      {/* 🟢 Height fix: 70% of screen */}
      <div className="h-auto lg:h-[70vh] min-h-[600px] flex items-center">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-full w-full"
        >
          {slideData.map(slide => (
            <SwiperSlide key={slide.id}>
              <div className="grid lg:grid-cols-2 grid-cols-1 items-center gap-10 max-w-[82%] mx-auto px-10 h-full py-16 lg:py-0">
                {/* Banner Left */}
                <div
                  data-aos="fade-right"
                  className="banner-left lg:max-w-[90%]"
                >
                  <h1 className="lg:text-6xl text-5xl elms-font font-bold mb-6">
                    <span className="leading-tight">
                      {slide.title.split(',')[0]}
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-[#f0845c] to-[#86A4AD] bg-clip-text text-transparent elms-font">
                      {slide.title.split(',')[1]}
                    </span>
                  </h1>
                  <p className="mb-6">{slide.desc}</p>
                  <div className="flex gap-5 mb-10">
                    <NavLink
                      to="/available-food"
                      className="btn bg-[#f0845c] text-white hover:scale-105 transition-all shadow-md"
                    >
                      View All Foods <FaArrowRightLong />
                    </NavLink>
                    <NavLink
                      to="/add-food"
                      className="btn bg-transparent hover:scale-105 transition-all border border-[#f0845c] text-[#f0845c]"
                    >
                      Add Food
                    </NavLink>
                  </div>

                  {/* 🟢 আপনার সেই আগের সুন্দর ছোট কার্ডগুলো (Stats) */}
                  <div className="grid lg:grid-cols-4 grid-cols-2 gap-5">
                    {[
                      {
                        icon: <LuUsers />,
                        count: '1,200+',
                        label: 'Active Donator',
                      },
                      {
                        icon: <LuChefHat />,
                        count: '50,000+',
                        label: 'Meals Shared',
                      },
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
                        className="group flex flex-col justify-center items-center rounded-2xl py-4 border border-[#7971713b] transition-all duration-500 ease-in-out hover:scale-105 hover:border-[#f0845c] hover:shadow-md bg-white dark:bg-base-200"
                      >
                        <div className="text-[#f0845c] text-xl transition-all duration-500 ease-in-out group-hover:scale-110">
                          {item.icon}
                        </div>
                        <h4 className="elms-font font-black text-xl my-1 group-hover:text-[#f0845c] flex items-center gap-1">
                          {item.count}
                          {item.star && (
                            <FaStar className="text-[#f0845c] text-sm" />
                          )}
                        </h4>
                        <p className="text-[#00000075] dark:text-gray-400 text-[8px] uppercase tracking-tighter">
                          {item.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Banner Right */}
                <div
                  data-aos="fade-left"
                  className="relative h-[400px] lg:h-[450px] rounded-3xl bg-cover bg-center shadow-2xl overflow-hidden"
                  style={{ backgroundImage: `url('${slide.img}')` }}
                >
                  {/* Floating Badges - আপনার ডিজাইন অনুযায়ী */}
                  <div className="absolute bg-white/90 dark:bg-base-300/90 top-5 left-5 p-3 rounded-xl border border-white/20 shadow-xl flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#f0845c] flex items-center justify-center text-white font-bold text-xs">
                      AK
                    </div>
                    <div>
                      <p className="font-bold text-xs dark:text-white">
                        AK Ai Kong
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Shared new recipe
                      </p>
                    </div>
                  </div>

                  <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/30">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-[#f0845c] text-xs" />
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-5 right-5 bg-black/50 backdrop-blur-md p-3 rounded-xl border border-white/20">
                    <span className="text-white text-xs font-semibold">
                      ❤️ 30+ Likes This
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 🟢 Visual Hint (Animated Scroll Down) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce text-[#f0845c]">
        <button
          onClick={() => {
            document
              .getElementById('featured-foods')
              .scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex flex-col items-center cursor-pointer"
        >
          <span className="text-[10px] font-bold uppercase mb-1">Explore</span>
          <HiOutlineChevronDoubleDown className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
