import { useContext } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, role, loading } = useContext(AuthContext);
  const location = useLocation();

  //
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-[#307A7F]"></span>
      </div>
    );
  }

  // 
  if (user && role === 'admin') {
    return children;
  }

  // 
  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
