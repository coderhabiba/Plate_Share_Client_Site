import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './layout/Root';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import AvailableFood from './components/AvailableFood/AvailableFood';
import AddFood from './components/PrivateComponents/AddFood/AddFood';
import MyFood from './components/PrivateComponents/MyFood/MyFood';
import FoodReq from './components/PrivateComponents/FoodReq/FoodReq';
import Register from './components/authentication/Register';
import AuthProvider from './components/context/AuthProvider';
import FoodDetails from './components/PrivateComponents/FoodDetails/FoodDetails';
import UpdateFood from './components/PrivateComponents/UpdateFood/UpdateFood';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ErrorPage from './components/ErrorPage/ErrorPage';
import 'aos/dist/aos.css';


const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/available-food',
        Component: AvailableFood,
      },
      {
        path: '/register',
        Component: Register,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/add-food',
        element: (
          <PrivateRoute>
            <AddFood />
          </PrivateRoute>
        ),
      },
      {
        path: '/food/:id',
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-food',
        element: (
          <PrivateRoute>
            <MyFood />
          </PrivateRoute>
        ),
      },
      {
        path: '/update-food/:id',
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: '/food-req',
        element: (
          <PrivateRoute>
            <FoodReq />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
