import React from 'react';
import { MdRestaurantMenu } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-base-200 bg-base-100 py-8">
      <div className="mx-auto max-w-[960px] px-6 text-center">
        <div className="flex items-center justify-center gap-2 text-base-content mb-4">
          <div className="flex size-6 items-center justify-center text-primary">
            <MdRestaurantMenu size={20} />
          </div>
          <span className="text-lg font-bold">Bistro Orange</span>
        </div>
        <p className="text-sm text-base-content/60 mb-4">
          Delicious food, warm atmosphere, and unforgettable moments.
        </p>
        <div className="flex justify-center gap-6 mb-6">
          <a
            className="text-base-content/60 hover:text-primary transition-colors text-sm"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-base-content/60 hover:text-primary transition-colors text-sm"
            href="#"
          >
            Terms of Service
          </a>
        </div>
        <p className="text-xs text-base-content/40">
          © {new Date().getFullYear()} Bistro Orange. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
