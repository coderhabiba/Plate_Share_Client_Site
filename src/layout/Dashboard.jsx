import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import {
  FaHome,
  FaUtensils,
  FaList,
  FaUserAlt,
  FaSignOutAlt,
  FaChartLine,
  FaUsers,
  FaGlobe,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaSun,
  FaMoon,
} from 'react-icons/fa';
import { AuthContext } from '../components/context/AuthContext';

const Dashboard = () => {
  const { user, logOut, role, loading } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // --- Local Storage Based Theme Logic ---
  const [theme, setTheme] = useState(
    localStorage.getItem('dashboard-theme') || 'light'
  );

  useEffect(() => {
    localStorage.setItem('dashboard-theme', theme);
    const html = document.querySelector('html');
    html.setAttribute('data-theme', theme); // For DaisyUI
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleLogout = () => {
    logOut().then(() => navigate('/login'));
  };

  // Sidebar Link Styles
  const activeLink =
    'flex items-center gap-3 p-3 bg-white/20 border-r-4 border-[#F0845C] transition-all font-bold text-white scale-[1.02] shadow-sm';
  const normalLink =
    'flex items-center gap-3 p-3 hover:bg-white/10 transition-all font-bold opacity-70 hover:opacity-100 text-white/90';

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#307A7F]">
        <div className="text-center text-white">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-2 font-bold animate-pulse tracking-widest text-xs">
            VERIFYING PERMISSIONS...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-50 dark:bg-base-300 font-sans transition-colors duration-300">
      {/* --- Mobile Header --- */}
      <div className="lg:hidden bg-[#307A7F] text-white p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <h2 className="text-xl font-black italic tracking-tighter">
          PlateShare
        </h2>
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="text-xl">
            {theme === 'light' ? (
              <FaMoon />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-2xl"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Sidebar (Persistent Desktop, Mobile Drawer) --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-[#307A7F] text-white flex flex-col shadow-2xl transition-transform transform 
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:h-screen
      `}
      >
        <div className="p-8 border-b border-white/10 text-center hidden lg:block">
          <h2 className="text-3xl font-black tracking-tight elms-font uppercase italic leading-none">
            PlateShare
          </h2>
          <div className="mt-2 inline-block px-3 py-1 rounded-full bg-black/20">
            <span className="text-[9px] font-black tracking-[0.2em] opacity-80 uppercase text-white">
              {role === 'admin' ? 'Admin Controller' : 'Community Member'}
            </span>
          </div>
        </div>

        <nav className="grow py-6 overflow-y-auto px-4 space-y-1 custom-scrollbar">
          <p className="px-4 py-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
            General
          </p>

          <NavLink
            to={
              role === 'admin'
                ? '/dashboard/admin-overview'
                : '/dashboard/user-overview'
            }
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <FaChartLine className="text-lg" /> Overview
          </NavLink>

          {/* --- Admin Only Links --- */}
          {role === 'admin' && (
            <div className="mt-6">
              <p className="px-4 py-2 text-[10px] font-black opacity-40 uppercase tracking-widest border-t border-white/5 pt-2">
                Management
              </p>
              <NavLink
                to="/dashboard/manage-users"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaUsers className="text-lg" /> User Directory
              </NavLink>
              <NavLink
                to="/dashboard/all-foods"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaGlobe className="text-lg" /> All Foods
              </NavLink>
              <NavLink
                to="/dashboard/manage-req"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaList className="text-lg" /> All Requests
              </NavLink>
            </div>
          )}

          {/* --- User Only Links --- */}
          {role === 'user' && (
            <div className="mt-6">
              <p className="px-4 py-2 text-[10px] font-black opacity-40 uppercase tracking-widest border-t border-white/5 pt-2">
                Contribution
              </p>
              <NavLink
                to="/dashboard/add-food-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaPlusCircle className="text-lg" /> Add New Food
              </NavLink>
              <NavLink
                to="/dashboard/manage-foods"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaUtensils className="text-lg" /> My Food Posts
              </NavLink>
              <NavLink
                to="/dashboard/my-requests"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                <FaList className="text-lg" /> My Requests
              </NavLink>
            </div>
          )}

          <div className="mt-6 border-t border-white/5 pt-4">
            <p className="px-4 py-2 text-[10px] font-black opacity-40 uppercase tracking-widest">
              Account
            </p>
            <NavLink
              to="/dashboard/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <FaUserAlt className="text-lg" /> Profile Settings
            </NavLink>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-white/10 bg-black/10">
          <Link
            to="/"
            className="flex items-center gap-3 p-3 hover:bg-white/10 rounded-xl transition-all font-bold text-xs"
          >
            <FaHome /> Visit Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 w-full text-left hover:bg-red-500 transition-all font-bold text-red-50 text-xs mt-2 rounded-xl"
          >
            <FaSignOutAlt /> Terminate Session
          </button>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white dark:bg-base-100 transition-colors duration-300">
        {/* Top Navbar */}
        <header className="bg-white/90 dark:bg-base-200/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 lg:p-6 flex justify-between items-center sticky top-0 z-20 transition-colors duration-300">
          <div>
            <h2 className="text-lg lg:text-xl font-bold flex items-center gap-2">
              <span className="hidden sm:inline italic text-[#307A7F] dark:text-[#4fa9af]">
                Greetings,
              </span>
              {user?.displayName?.split(' ')[0]}!
            </h2>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {new Date().toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </p>
          </div>

          <div className="flex items-center gap-3 lg:gap-5">
            {/* Theme Toggle Button Desktop */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-[#307A7F] dark:text-yellow-400 transition-all active:scale-95 border dark:border-slate-700 shadow-sm"
              title="Toggle Theme"
            >
              {theme === 'light' ? <FaMoon size={18} /> : <FaSun size={18} />}
            </button>

            <div className="hidden sm:block text-right">
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">
                Authorization
              </p>
              <p
                className={`text-[11px] font-black px-2 py-0.5 rounded-md inline-block ${
                  role === 'admin'
                    ? 'bg-purple-100 text-purple-600'
                    : 'bg-orange-100 text-[#F0845C]'
                }`}
              >
                {role === 'admin' ? 'SYSTEM ADM' : 'VERIFIED USR'}
              </p>
            </div>

            <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

            <Link
              to="/dashboard/profile"
              className="group flex items-center gap-3"
            >
              <img
                src={
                  user?.photoURL ||
                  'https://i.ibb.co/vL0Zf9m/user-placeholder.png'
                }
                className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl object-cover ring-2 ring-offset-2 dark:ring-offset-base-100 transition-all group-hover:ring-4 ${
                  role === 'admin' ? 'ring-purple-400' : 'ring-[#F0845C]'
                }`}
                alt="profile"
              />
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 dark:bg-base-300 transition-colors duration-300">
          <div className="max-w-6xl mx-auto pb-10">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Overlay for Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
