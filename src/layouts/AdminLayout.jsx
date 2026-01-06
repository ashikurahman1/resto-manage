import React from 'react';
import { NavLink, useNavigate } from 'react-router';
import { 
  MdDashboard, 
  MdRestaurantMenu, 
  MdListAlt, 
  MdLogout,
  MdRestaurant,
  MdHome,
  MdSettings
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  const menuItems = [
    { name: 'Home', href: '/', icon: <MdHome size={24} />, exact: true },
    { name: 'Dashboard', href: '/admin', icon: <MdDashboard size={24} />, exact: true },
    { name: 'Manage Foods', href: '/admin/foods', icon: <MdRestaurantMenu size={24} /> },
    { name: 'Orders', href: '/admin/orders', icon: <MdListAlt size={24} /> },
    { name: 'Profile', href: '/dashboard/profile', icon: <MdSettings size={22} /> },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-base-200">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-72 bg-base-100 border-r border-base-300 flex-col sticky top-0 h-screen shadow-sm">
        <div className="p-8 flex items-center gap-3 border-b border-base-200">
          <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <MdRestaurant size={24} />
          </div>
          <span className="text-xl font-black text-base-content tracking-tighter uppercase">Admin</span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'text-base-content/50 hover:bg-base-200 hover:text-base-content'
                }`
              }
            >
              <span className="scale-90">{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-base-200">
          <div className="mb-4 px-4">
            <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">System Status</p>
            <p className="text-xs font-bold text-success flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-success animate-pulse"></span>
              Operational
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-4 py-3.5 w-full rounded-xl font-bold text-error/60 hover:bg-error/5 hover:text-error transition-all"
          >
            <MdLogout size={22} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-300 p-2 z-50 flex justify-around items-center">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            end={item.exact}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isActive ? 'text-primary' : 'text-base-content/40'
              }`
            }
          >
            <span className="scale-75">{item.icon}</span>
            <span className="text-[9px] font-black uppercase tracking-widest italic">{item.name}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 p-2 text-base-content/40"
        >
          <MdLogout size={24} />
          <span className="text-[9px] font-black uppercase tracking-widest">Exit</span>
        </button>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto pb-24 lg:pb-10">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
