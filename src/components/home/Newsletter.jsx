import React from 'react';

const Newsletter = () => {
  return (
    <section className="relative overflow-hidden bg-primary rounded-3xl p-8 md:p-16 my-12 text-center text-white">
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Join the Bistro Club
        </h2>
        <p className="text-white/80 mb-8">
          Subscribe to get 15% off your first order and exclusive weekly
          recipes.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-xl text-base-content w-full sm:w-80 focus:outline-none"
          />
          <button className="bg-base-content text-white px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all">
            Subscribe
          </button>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
    </section>
  );
};

export default Newsletter;
