import React, { useState } from 'react';
import { NavLink } from 'react-router';
import {
  MdRestaurantMenu,
  MdShoppingCart,
  MdMenu,
  MdClose,
} from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Menu', href: '/menu' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const getLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-all duration-200 hover:text-primary ${
      isActive ? 'text-primary font-bold' : 'text-base-content/80'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `text-base font-medium transition-all duration-200 ${
      isActive
        ? 'text-primary pl-2 border-l-2 border-primary'
        : 'text-base-content/80'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/95 backdrop-blur-sm">
      <div className="flex items-center justify-between px-6 py-3   container mx-auto">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-4 group">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
            <MdRestaurantMenu size={24} />
          </div>
          <h2 className="text-base-content text-lg font-bold tracking-tight">
            Bistro Orange
          </h2>
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">
          <nav className="flex items-center gap-9">
            {navLinks.map(link => (
              <NavLink key={link.name} to={link.href} className={getLinkClass}>
                {link.name}
              </NavLink>
            ))}
          </nav>

          <button className="relative flex cursor-pointer items-center justify-center rounded-full h-10 w-10 bg-primary/10 hover:bg-primary/20 transition-colors">
            <MdShoppingCart size={20} className="text-primary" />
            <span className="absolute top-1.5 right-1.5 flex h-2.5 w-2.5 rounded-full bg-primary ring-2 ring-base-100"></span>
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-4">
          <button className="relative flex p-2 bg-primary/10 rounded-full text-primary">
            <MdShoppingCart size={20} />
            <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-primary ring-1 ring-base-100"></span>
          </button>

          <button onClick={toggleMenu} className="text-base-content p-1">
            {isOpen ? <MdClose size={28} /> : <MdMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar/Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-base-100 ${
          isOpen
            ? 'max-h-64 opacity-100 border-t border-base-200'
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map(link => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className={mobileLinkClass}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
