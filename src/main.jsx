import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './layout/Root';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import AvailableFood from './components/AvailableFood/AvailableFood';
import AddFood from './components/PrivateComponents/AddFood/AddFood';
import MyFood from './components/PrivateComponents/MyFood/MyFood';
import FoodReq from './components/PrivateComponents/FoodReq/FoodReq';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/available-food',
        Component: AvailableFood
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/add-food',
        element: <AddFood/>
      },
      {
        path: '/my-food',
        element: <MyFood/>
      },
      {
        path: '/food-req',
        element: <FoodReq/>
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
