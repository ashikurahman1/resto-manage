import React from 'react';

const Hero = () => {
  return (
    <div className="w-full @container mb-8">
      <div
        className="relative overflow-hidden container mx-auto rounded-xl bg-cover bg-center min-h-[240px] md:min-h-[600px] shadow-sm"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDM-2Fy7R1M1dmV9ydtthKMKUlkm_G1m_IK61p5K5w5acio7N66uS0KfkUqGoiZ1FRHIF173dmEiuZlo1cjN8ELLcwJNTFE88ZZ2feMeS3imtAvvPoeTEoENS9EkZAhGLjfK4-So0Jd5WKJmKRaI1IDuNWOIVmDOjMnOLlDSQKGLppZjvFjEmOieUk28LeCnqja-VcQoHImV2soLkLuW7merhlFIxRlpOpc8-2LvI95DwZeZhqCupA6pEu9zyIdfJGRBu5w0DXG18A")`,
        }}
      >
        <div className="absolute bottom-0 left-0 p-6 md:p-8  max-w-5xl">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide text-white uppercase bg-primary rounded-full">
            Today's Special
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Grilled Atlantic Salmon
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-lg mb-4">
            Served with roasted asparagus, lemon butter sauce, and wild rice
            pilaf.
          </p>
          <button className="bg-white text-primary font-bold py-2.5 px-6 rounded-lg text-sm hover:bg-gray-100 transition-colors shadow-lg">
            Order Now - $24.00
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
