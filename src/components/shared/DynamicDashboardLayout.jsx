import React from 'react';
import { useAuth } from '../../context/AuthContext';
import UserLayout from '../../layouts/UserLayout';
import AdminLayout from '../../layouts/AdminLayout';

const DynamicDashboardLayout = ({ children }) => {
  const { user } = useAuth();

  // If the user is an admin, show the AdminLayout (with Admin sidebar)
  // Otherwise, show the standard UserLayout (with Member sidebar)
  if (user?.role === 'admin') {
    return <AdminLayout>{children}</AdminLayout>;
  }

  return <UserLayout>{children}</UserLayout>;
};

export default DynamicDashboardLayout;
