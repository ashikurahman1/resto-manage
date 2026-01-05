import { createBrowserRouter } from 'react-router';
import RootLayout from '../layouts/RootLayout';
import HomePage from '../pages/HomePage/HomePage';

export const Routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <div>Page Not Found</div>,
    children: [{ index: true, element: <HomePage /> }],
  },
]);
