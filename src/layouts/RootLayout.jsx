import React from 'react';
import Navbar from '../components/shared/Navbar';
import { Outlet } from 'react-router';

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
