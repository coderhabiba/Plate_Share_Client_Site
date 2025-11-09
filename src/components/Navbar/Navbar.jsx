import { NavLink } from 'react-router';

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to={'/'}>Home</NavLink>
      </li>
      <li>
        <NavLink to={'/available-food'}>Available Foods</NavLink>
      </li>
    </>
  );
  return (
    <div className="shadow-sm">
      <div className="navbar container mx-auto">
        <div className="navbar-start items-center justify-between lg:justify-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {' '}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{' '}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <div className="w-28">
            <a href="#" className="">
              <img
                src="https://i.ibb.co.com/60GCfD8H/plateshare-logo-BBLm-FDgm.png"
                alt=""
              />
            </a>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end gap-5">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to={'/add-food'}>Add Food</NavLink>
              </li>
              <li>
                <NavLink to={'/my-food'}>Manage My Foods</NavLink>
              </li>
              <li>
                <NavLink to={'/food-req'}>My Food Requests</NavLink>
              </li>
              <NavLink to={'/login'} className="btn">
                Logout
              </NavLink>
            </ul>
          </div>
          <NavLink to={'/login'} className="btn">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
