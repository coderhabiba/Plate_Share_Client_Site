import { Outlet } from 'react-router';
import Navbar from './../components/Navbar/Navbar';
import Footer from './../components/Footer/Footer';

const Root = () => {
  return (
    <div>
        <Navbar />
      <div className='container mx-auto'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
