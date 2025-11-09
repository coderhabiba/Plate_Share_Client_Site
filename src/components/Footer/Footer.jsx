import { RiFacebookCircleLine } from 'react-icons/ri';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { TiSocialGithubCircular } from 'react-icons/ti';

const Footer = () => {
  return (
    <div className='relative bg-[url("https://i.ibb.co.com/C5cFCB5D/footer.jpg")] bg-no-repeat bg-cover py-10'>
      <div class="absolute inset-0 bg-white/85"></div>
      <div className="relative z-10 container mx-auto">
        <div className="logo-links">
          <div>
            <img
              className="w-40"
              src="https://i.ibb.co.com/3Y5HsyM0/plateshare-logo-BBLm-FDgm.png"
              alt="logo"
            />
            <p className="font-black text-2xl">Plate Share</p>
          </div>
          <p className="text-sm mt-2 mb-5">
            Connect with talented home cooks in your neighborhood.
            <br />
            Discover authentic, homemade meals made with love.
          </p>
          <div className="flex gap-2 items-center text-[#F0845C]">
            <div className="w-10 h-10 hover:bg-[#F0845C] hover:text-white rounded-full transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105">
              <RiFacebookCircleLine className="w-full h-full" />
            </div>
            <div className="w-[46px] h-[46px] hover:bg-[#F0845C] hover:text-white rounded-full transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105">
              <TiSocialLinkedinCircular className="w-full h-full" />
            </div>
            <div className="w-[46px] h-[46px] hover:bg-[#F0845C] hover:text-white rounded-full transition-all duration-500 ease-in-out hover:shadow-lg hover:scale-105">
              <TiSocialGithubCircular className="w-full h-full" />
            </div>
          </div>
        </div>

        {/* copyright */}
        <div>
          <p>© 2025 Plate Share. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
