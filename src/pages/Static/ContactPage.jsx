import React from 'react';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tighter mb-8 leading-tight">Get in <span className="text-primary italic">Touch</span></h1>
            <p className="text-lg md:text-xl text-base-content/60 font-medium mb-12">Have questions about our menu or want to discuss a catering event? We're here to help.</p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="size-14 bg-base-200 rounded-2xl flex items-center justify-center text-primary">
                  <MdEmail size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Email us</p>
                  <p className="text-xl font-black text-base-content">hello@restomanage.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="size-14 bg-base-200 rounded-2xl flex items-center justify-center text-primary">
                  <MdPhone size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Call us</p>
                  <p className="text-xl font-black text-base-content">+1 (555) 000-111</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="size-14 bg-base-200 rounded-2xl flex items-center justify-center text-primary">
                  <MdLocationOn size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-base-content/30 uppercase tracking-widest mb-1">Visit us</p>
                  <p className="text-xl font-black text-base-content">Palace Road, London SW1A</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-200 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3rem]">
            <form className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-[0.2em] opacity-40">Name</span></label>
                    <input type="text" className="input input-bordered bg-base-100 border-none h-14 rounded-2xl font-bold focus:ring-2 focus:ring-primary/50" placeholder="Your name" />
                  </div>
                  <div className="form-control w-full">
                    <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-[0.2em] opacity-40">Email</span></label>
                    <input type="email" className="input input-bordered bg-base-100 border-none h-14 rounded-2xl font-bold focus:ring-2 focus:ring-primary/50" placeholder="your@email.com" />
                  </div>
               </div>
               <div className="form-control w-full">
                  <label className="label"><span className="label-text font-black uppercase text-[10px] tracking-[0.2em] opacity-40">Message</span></label>
                  <textarea className="textarea textarea-bordered bg-base-100 border-none min-h-[160px] rounded-2xl font-bold focus:ring-2 focus:ring-primary/50 w-full" placeholder="How can we help?"></textarea>
               </div>
               <button className="btn btn-primary w-full h-16 rounded-2xl text-white font-black tracking-widest uppercase shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
