import { RiFacebookCircleLine } from 'react-icons/ri';
import { TiSocialLinkedinCircular } from 'react-icons/ti';
import { TiSocialGithubCircular } from 'react-icons/ti';

const Footer = () => {
  return (
    <div className='relative bg-[url("https://i.ibb.co.com/C5cFCB5D/footer.jpg")] bg-no-repeat bg-cover pt-10 pb-8'>
      <div className="absolute inset-0 bg-white/85"></div>
      <div className="relative z-10 max-w-[80%] mx-auto flex lg:flex-row flex-col justify-between items-start lg:gap-0 gap-10">
        {/* logo and links */}
        <div className="logo-links">
          <div>
            <img
              className="w-20"
              src="https://i.ibb.co.com/3Y5HsyM0/plateshare-logo-BBLm-FDgm.png"
              alt="logo"
            />
            <p className="font-extrabold text-2xl elms-font">Plate Share</p>
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

        {/* info */}
        <div className="flex flex-col gap-4">
          <h4 className="uppercase font-extrabold">Informations</h4>
          <ul className="flex flex-col gap-3 text-neutral-800">
            <li>About us</li>
            <li>Privacy Policy</li>
            <li>Term and Conditions</li>
            <li>Contact us</li>
          </ul>
        </div>

        {/* links */}
        <div className="flex flex-col gap-4">
          <h4 className="uppercase font-extrabold">Quick Links</h4>
          <ul className="flex flex-col gap-3 text-neutral-800">
            <li>Available Foods</li>
            <li>Add Food</li>
            <li>Manage My Food</li>
            <li>My Food Request</li>
          </ul>
        </div>

        {/* contact */}
        <div className="flex flex-col gap-4">
          <h4 className="uppercase font-extrabold">Contact Info</h4>
          <ul className="flex flex-col gap-3 text-neutral-800">
            <li>
              <span className="font-black text-neutral-950 elms-font">
                Address:{' '}
              </span>
              Mymensingh,Bangladesh
            </li>
            <li>
              <span className="font-black text-neutral-950 elms-font">
                Phone:{' '}
              </span>
              +88 01777 22 77 99
            </li>
            <li>
              <span className="font-black text-neutral-950 elms-font">
                Email:{' '}
              </span>
              info@plateshare.com
            </li>
          </ul>
        </div>
      </div>

      {/* copyright */}
      <div className="text-center text-xs border-t border-t-gray-300 relative z-10 pt-8 mt-10">
        <p>© 2025 Plate Share. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
