import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 md:py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-base-content tracking-tighter mb-8 leading-[1.1]">Crafting Culinary <br/><span className="text-primary italic">Masterpieces</span></h1>
        <div className="space-y-6 text-base md:text-lg text-base-content/70 leading-relaxed font-medium">
          <p>Founded in 2024, RestoManage was born out of a passion for bringing gourmet dining experiences to the comfort of your home. We believe that great food should be accessible, beautiful, and most importantly, delicious.</p>
          <p>Our team of world-class chefs selects only the finest seasonal ingredients to ensure every dish we serve meets our uncompromising standards of quality.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
          <div className="bg-base-200 p-10 rounded-[2.5rem]">
            <h3 className="text-2xl font-black text-base-content mb-4">Our Mission</h3>
            <p className="font-medium opacity-60">To innovate the way people discover and enjoy food, one plate at a time.</p>
          </div>
          <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10">
            <h3 className="text-2xl font-black text-primary mb-4">Our Vision</h3>
            <p className="font-medium text-primary/60">To become the world's most loved digital restaurant brand.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
