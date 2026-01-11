import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AdminOverview from './adminRoutes/AdminOverview';
import UserOverview from './userRoutes/UserOverview';

const DashboardHome = () => {
 const { role, loading } = useContext(AuthContext);

  if (loading) return <span className="loading loading-spinner loading-lg"></span>;
  return role === 'admin' ? <AdminOverview /> : <UserOverview />;
};

export default DashboardHome;