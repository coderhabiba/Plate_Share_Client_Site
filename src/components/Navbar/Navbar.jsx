import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../context/AuthContext';
import {
  FaHome,
  FaUtensils,
  FaTachometerAlt,
  FaPlusCircle,
  FaFolderOpen,
  FaHistory,
  FaSignOutAlt,
  FaUserShield,
} from 'react-icons/fa';

const Navbar = () => {
  const { logOut, user } = useContext(AuthContext);
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [role, setRole] = useState(null);

  // fetch user role
  useEffect(() => {
    if (user?.email) {
      fetch(`https://plate-share-server-site.vercel.app/users/role/${user.email}`)
        .then(res => res.json())
        .then(data => setRole(data.role))
        .catch(err => console.error('Error fetching role:', err));
    }
  }, [user?.email]);

  const isAdmin = role?.toLowerCase() === 'admin';

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.querySelector('html').setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  // Nav Link Styles
  const navStyles = ({ isActive }) =>
    isActive
      ? 'text-[#f0845c] font-black border-b-2 border-[#f0845c] pb-1 flex items-center gap-2'
      : 'font-semibold flex items-center gap-2 hover:text-[#f0845c] transition-all duration-300 text-slate-600 dark:text-slate-300';

  // Common Links
  const commonLinks = (
    <>
      <li>
        <NavLink to="/" className={navStyles}>
          <FaHome className="lg:hidden" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/available-food" className={navStyles}>
          <FaUtensils className="lg:hidden" /> Available Foods
        </NavLink>
      </li>
    </>
  );

  // Dynamic Links based on Admin/User Role
  const loggedInLinks = user && (
    <>
      {isAdmin ? (
        <li>
          <NavLink to="/dashboard/admin-overview" className={navStyles}>
            <FaUserShield className="lg:hidden text-[#307A7F]" /> Admin
            Analytics
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/dashboard" className={navStyles}>
            <FaTachometerAlt className="lg:hidden" /> Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`shadow-sm transition-all duration-300 sticky top-0 z-[100] border-b dark:border-slate-800 ${
        isAuthPage
          ? 'bg-white/70 backdrop-blur-md dark:bg-base-100/70'
          : 'bg-white/90 backdrop-blur-md dark:bg-base-200/90'
      }`}
    >
      <div className="navbar max-w-[95%] lg:max-w-[85%] mx-auto py-3">
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-[#307A7F]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-5 shadow-2xl bg-base-100 rounded-2xl w-64 border gap-4 font-bold"
            >
              {commonLinks}
              {loggedInLinks}
            </ul>
          </div>

          <NavLink
            to="/"
            className="flex items-center gap-2 group transition-transform active:scale-95"
          >
            <div className="w-10">
              <img
                src="https://i.ibb.co.com/3Y5HsyM0/plateshare-logo-BBLm-FDgm.png"
                alt="Plate Share"
                className="group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <span className="hidden sm:block font-black text-2xl tracking-tighter elms-font text-slate-800 dark:text-white">
              Plate<span className="text-[#f0845c]">Share</span>
            </span>
          </NavLink>
        </div>

        {/* Navbar Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-8">
            {commonLinks}
            {loggedInLinks}
          </ul>
        </div>

        {/* Navbar End: Theme & Profile */}
        <div className="navbar-end gap-2 lg:gap-4">
          {/* Theme Toggle Button */}
          <label className="swap swap-rotate btn btn-ghost btn-circle text-[#307A7F]">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === 'dark'}
            />
            <svg
              className="swap-on fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>
            <svg
              className="swap-off fill-current w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.69Z" />
            </svg>
          </label>

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-[#307A7F] shadow-sm"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL || 'https://i.ibb.co.com/8LQPQJ6s/user.png'
                    }
                    alt="Profile"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-4 z-[100] p-4 shadow-2xl bg-base-100 rounded-2xl w-64 border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-200"
              >
                <div className="px-3 py-3 mb-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                  <p className="font-black text-[#307A7F] truncate">
                    {user?.displayName}
                  </p>
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isAdmin
                          ? 'bg-red-100 text-red-600'
                          : 'bg-emerald-100 text-emerald-600'
                      }`}
                    >
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>

                {/* dropdown */}
                <li>
                  <NavLink to="/dashboard" className="py-3 flex gap-3">
                    <FaTachometerAlt className="text-[#f0845c]" /> Dashboard
                  </NavLink>
                </li>

                {!isAdmin && (
                  <>
                    <li>
                      <NavLink to="/add-food" className="py-3 flex gap-3">
                        <FaPlusCircle className="text-[#f0845c]" /> Add Food
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/my-food" className="py-3 flex gap-3">
                        <FaFolderOpen className="text-[#f0845c]" /> Manage My
                        Foods
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/food-req" className="py-3 flex gap-3">
                        <FaHistory className="text-[#f0845c]" /> My Food
                        Requests
                      </NavLink>
                    </li>
                  </>
                )}

                {isAdmin && (
                  <li>
                    <NavLink
                      to="/dashboard/admin-overview"
                      className="py-3 flex gap-3"
                    >
                      <FaUserShield className="text-[#307A7F]" /> Admin
                      Analytics
                    </NavLink>
                  </li>
                )}

                <li className="mt-4 pt-2 border-t dark:border-slate-700">
                  <button
                    onClick={logOut}
                    className="btn btn-sm bg-[#f0845c] text-white hover:bg-[#d9734d] border-none rounded-xl w-full flex items-center justify-center gap-2"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink
              to="/login"
              className="btn bg-[#f0845c] text-white hover:bg-[#307A7F] border-none px-8 rounded-full shadow-lg shadow-orange-100 dark:shadow-none transition-all duration-300"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
