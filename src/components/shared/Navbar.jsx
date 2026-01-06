import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  MdRestaurantMenu,
  MdShoppingCart,
  MdMenu,
  MdClose,
  MdLogout,
  MdPerson,
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getLinkClass = ({ isActive }) =>
    `text-[11px] font-black transition-all duration-300 hover:text-primary uppercase tracking-[0.2em] ${
      isActive ? 'text-primary' : 'text-base-content/40'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/90 backdrop-blur-md">
      <div className="flex items-center justify-between px-4 sm:px-8 py-4 container mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group shrink-0">
          <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
            <MdRestaurantMenu size={20} />
          </div>
          <h2 className="text-base-content text-lg font-black tracking-tighter uppercase sm:text-xl">
            RestoManage
          </h2>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-8">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.href} className={getLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="h-4 w-px bg-base-300 mx-2"></div>

          <NavLink to="/orders" className="relative group">
            <div className="flex size-10 items-center justify-center rounded-xl bg-base-200 text-base-content hover:bg-primary hover:text-white transition-all duration-500 shadow-sm border border-base-300/50">
              <MdShoppingCart size={20} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-lg bg-primary text-[10px] font-black text-white ring-4 ring-base-100 shadow-md">
                {cartCount}
              </span>
            )}
          </NavLink>

          {user ? (
            <div className="flex items-center gap-3">
              <NavLink 
                to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                className="btn btn-primary h-11 min-h-0 px-6 rounded-xl text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Dashboard
              </NavLink>
              <button
                onClick={logout}
                className="size-10 flex items-center justify-center rounded-xl bg-base-200 text-base-content/40 hover:text-error hover:bg-error/5 transition-all border border-base-300/50"
              >
                <MdLogout size={18} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <NavLink
                to="/auth/login"
                className="text-[11px] font-black text-base-content/40 hover:text-primary transition-all uppercase tracking-widest px-4"
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/register"
                className="btn btn-primary h-11 min-h-0 px-6 rounded-xl text-white font-black text-[11px] uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                Join Now
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Buttons */}
        <div className="flex  md:hidden items-center gap-3">
          <NavLink to="/orders" className="relative">
            <div className="size-10 flex items-center justify-center rounded-xl bg-base-200 text-base-content border border-base-300/50">
              <MdShoppingCart size={18} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-md bg-primary text-[8px] font-black text-white ring-2 ring-base-100">
                {cartCount}
              </span>
            )}
          </NavLink>

          <button onClick={toggleMenu} className="size-10 flex items-center justify-center rounded-xl bg-base-200 text-base-content border border-base-300/50">
            {isOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <AnimatePresence>
        {isOpen && (
          <div className="md:hidden fixed inset-0 z-[100] min-h-screen">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-white/95 backdrop-blur-md"
            />
            
            {/* Menu Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full bg-black h-full !bg-opacity-100 shadow-2xl p-8 flex flex-col z-[110] border-l border-base-200"
              style={{ backgroundColor: 'oklch(var(--b1) / 1)' }} 
            >
              <div className=" flex justify-between items-center mb-10">
                <span className="text-xl font-black text-base-content tracking-tighter uppercase">Menu</span>
                <button onClick={() => setIsOpen(false)} className="size-10 flex items-center justify-center rounded-xl bg-base-200 text-base-content">
                  <MdClose size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {navLinks.map(link => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `text-lg font-black uppercase tracking-[0.2em] transition-all ${
                        isActive ? 'text-primary' : 'text-base-content/40'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-auto pt-8 border-t border-base-200 flex flex-col gap-4">
                {user ? (
                   <NavLink
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="btn btn-primary w-full h-14 rounded-2xl text-white font-black tracking-widest uppercase"
                  >
                    Dashboard
                  </NavLink>
                ) : (
                  <>
                    <NavLink
                      to="/auth/login"
                      onClick={() => setIsOpen(false)}
                      className="btn btn-ghost w-full h-14 rounded-2xl text-base-content/60 font-black tracking-widest uppercase"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/auth/register"
                      onClick={() => setIsOpen(false)}
                      className="btn btn-primary w-full h-14 rounded-2xl text-white font-black tracking-widest uppercase"
                    >
                      Join Now
                    </NavLink>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
