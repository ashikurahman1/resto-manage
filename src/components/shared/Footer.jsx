import React from 'react';
import { MdRestaurantMenu } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-base-100 border-t border-base-200 pt-16 pb-12 mt-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-8">
          <div className="flex items-center gap-3">
             <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                <MdRestaurantMenu size={20} />
              </div>
              <span className="text-xl font-black text-base-content tracking-tighter uppercase">RestoManage</span>
          </div>
          
          <p className="text-sm font-medium text-base-content/40 max-w-sm leading-relaxed">
            Revolutionizing the dining experience with modern technology and gourmet passion.
          </p>

          <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors">Terms</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-base-content/40 hover:text-primary transition-colors">Cookie Policy</a>
          </div>

          <div className="pt-8 border-t border-base-200 w-full">
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-base-content/20">
              © {new Date().getFullYear()} RestoManage. Crafted for excellence.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
