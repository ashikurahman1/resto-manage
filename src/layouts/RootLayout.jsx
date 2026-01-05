import React from 'react';

import { Outlet } from 'react-router';
import Navbar from '../components/shared/Navbar';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
