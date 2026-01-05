import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    image: 'https://i.pravatar.cc/150?u=sarah',
    comment:
      'The Atlantic Salmon was cooked to perfection. The atmosphere at Bistro Orange is just unmatched! A must-visit for every seafood lover.',
    stars: 5,
  },
  {
    id: 2,
    name: 'Mark Tuan',
    role: 'Local Guide',
    image: 'https://i.pravatar.cc/150?u=mark',
    comment:
      'Excellent service and the Truffle Risotto is to die for. The orange-themed decor gives such a warm and cozy vibe.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'Regular Customer',
    image: 'https://i.pravatar.cc/150?u=elena',
    comment:
      'I love their commitment to fresh ingredients. The salads are always crisp and the house dressing is secret-recipe good!',
    stars: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-base-200/30 rounded-[2rem] my-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-base-content">
            Guest Experiences
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-14 testimonial-swiper"
        >
          {testimonials.map(item => (
            <SwiperSlide key={item.id}>
              <div className="bg-base-100 p-8 rounded-2xl border border-base-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                {/* Stars */}
                <div className="flex gap-1 text-primary mb-6">
                  {[...Array(item.stars)].map((_, i) => (
                    <span key={i} className="text-xl">
                      ★
                    </span>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-base-content/80 italic mb-8 flex-1">
                  "{item.comment}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-4 border-t border-base-200 pt-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded-full border-2 border-primary/20"
                  />
                  <div>
                    <h4 className="font-bold text-base-content">{item.name}</h4>
                    <p className="text-xs text-base-content/50">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles for Swiper Dots */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .testimonial-swiper .swiper-pagination-bullet-active {
          background: #ee8c2b !important;
          width: 24px;
          border-radius: 4px;
        }
      `,
        }}
      />
    </section>
  );
};

export default Testimonials;
