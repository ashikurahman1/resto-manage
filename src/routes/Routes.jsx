import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
 
import HomePage from '../pages/HomePage/HomePage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AboutPage from '../pages/Static/AboutPage';
import ContactPage from '../pages/Static/ContactPage';
import OrderPage from '../pages/OrderPage/OrderPage';
import FoodDetails from '../pages/FoodDetails/FoodDetails';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import ProtectedRoute from '../components/shared/ProtectedRoute';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminManageFoods from '../pages/Dashboard/AdminManageFoods';
import AdminOrders from '../pages/Dashboard/AdminOrders';
import ProfilePage from '../pages/Dashboard/ProfilePage';
import DynamicDashboardLayout from '../components/shared/DynamicDashboardLayout';
 

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Page Not Found</div>,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/orders', element: <OrderPage /> },
      { path: '/foods/:id', element: <FoodDetails /> },
      {path: '/auth/login',  element: <Login />},
  {path: '/auth/register',    element: <Register /> },


      { 
        path: '/dashboard', 
        element: <ProtectedRoute><DynamicDashboardLayout><UserDashboard /></DynamicDashboardLayout></ProtectedRoute> 
      },
      { 
        path: '/dashboard/profile', 
        element: <ProtectedRoute><DynamicDashboardLayout><ProfilePage /></DynamicDashboardLayout></ProtectedRoute> 
      },
      { 
        path: '/admin', 
        element: <ProtectedRoute adminOnly={true}><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute> 
      },
      { 
        path: '/admin/foods', 
        element: <ProtectedRoute adminOnly={true}><AdminLayout><AdminManageFoods /></AdminLayout></ProtectedRoute> 
      },
      { 
        path: '/admin/orders', 
        element: <ProtectedRoute adminOnly={true}><AdminLayout><AdminOrders /></AdminLayout></ProtectedRoute> 
      },
    ],
  },

]);
