import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import OrderPage from '../pages/OrderPage/OrderPage';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/orders', element: <OrderPage /> },
    ],
  },
  {
    path: '/auth/login',
    element: <Login />,
  },
  {
    path: '/auth/register',
    element: <Register />,
  },
]);
