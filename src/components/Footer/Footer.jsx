import { RiFacebookCircleLine } from 'react-icons/ri';
import {
  TiSocialLinkedinCircular,
  TiSocialGithubCircular,
} from 'react-icons/ti';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='relative bg-[url("https://i.ibb.co.com/C5cFCB5D/footer.jpg")] bg-no-repeat bg-cover pt-20 pb-10 overflow-hidden'>
      <div className="absolute inset-0 bg-gray-50/95 dark:bg-slate-950/90 transition-colors duration-300 z-0"></div>

      <div className="relative z-10 max-w-[82%] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* 1. Branding Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-1">
              <img
                className="w-10 h-10"
                src="https://i.ibb.co.com/3Y5HsyM0/plateshare-logo-BBLm-FDgm.png"
                alt="logo"
              />
              <p className="font-black text-2xl elms-font tracking-tight text-slate-900 dark:text-white">
                Plate Share
              </p>
            </Link>
            <p className="text-[15px] text-slate-700 dark:text-slate-400 leading-relaxed font-medium">
              Connecting neighborhoods through the love of home-cooked meals.
              Share more, waste less.
            </p>
            <div className="flex gap-4 items-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#f0845c] hover:scale-110 transition-transform cursor-pointer"
              >
                <RiFacebookCircleLine size={32} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#f0845c] hover:scale-110 transition-transform cursor-pointer"
              >
                <TiSocialLinkedinCircular size={35} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="text-[#f0845c] hover:scale-110 transition-transform cursor-pointer"
              >
                <TiSocialGithubCircular size={35} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-lg mb-7 uppercase tracking-wider underline decoration-[#f0845c] decoration-4 underline-offset-8">
              Explore
            </h4>
            <ul className="space-y-4">
              {[
                { name: 'Available Foods', path: '/available-food' },
                { name: 'Add Food', path: '/add-food' },
                { name: 'Manage My Food', path: '/my-food' },
                { name: 'My Food Request', path: '/food-req' },
              ].map(link => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-700 dark:text-slate-400 hover:text-[#307A7F] dark:hover:text-[#f0845c] transition-colors font-bold text-sm block cursor-pointer"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Support Links */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-lg mb-7 uppercase tracking-wider underline decoration-[#f0845c] decoration-4 underline-offset-8">
              Support
            </h4>
            <ul className="space-y-4">
              {[
                'About Us',
                'Privacy Policy',
                'Terms of Service',
                'Contact Us',
              ].map(link => (
                <li key={link}>
                  <Link
                    to="/"
                    className="text-slate-700 dark:text-slate-400 hover:text-[#307A7F] dark:hover:text-[#f0845c] transition-colors font-bold text-sm block cursor-pointer"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-slate-900 dark:text-white font-black text-lg mb-7 uppercase tracking-wider underline decoration-[#f0845c] decoration-4 underline-offset-8">
              Get in Touch
            </h4>
            <div className="space-y-5 text-slate-700 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <p className="text-sm font-bold leading-relaxed">
                  Mymensingh, <br /> Bangladesh
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <p className="text-sm font-bold leading-relaxed">
                  +88 01777 22 77 99
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-300 dark:border-slate-800 text-center">
          <p className="text-slate-600 dark:text-slate-500 text-sm font-bold">
            © {new Date().getFullYear()}{' '}
            <span className="text-[#f0845c]">Plate Share</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
