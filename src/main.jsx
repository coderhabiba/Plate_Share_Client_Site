import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import Root from './layout/Root';
import Home from './components/Home/Home';
import Login from './components/authentication/Login';
import AvailableFood from './components/AvailableFood/AvailableFood';

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
        
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
