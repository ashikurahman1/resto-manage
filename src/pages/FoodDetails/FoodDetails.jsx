import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import api from '../../api/axios';
import { MdArrowBack, MdAddShoppingCart, MdTimer, MdLocalFireDepartment, MdInfo, MdCheck } from 'react-icons/md';
import { motion } from 'framer-motion';
import Loader from '../../components/Loader/Loader';
import Skeleton from '../../components/shared/Skeleton';
import { toast } from 'react-toastify';
import { useCart } from '../../context/CartContext';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../context/AuthContext';

const FoodDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const isAlreadyInCart = cart.some(item => item.id === parseInt(id));

  const { data: food, isLoading, isError } = useQuery({
    queryKey: ['food', id],
    queryFn: async () => {
      const response = await api.get(`/foods`);
      const found = response.data.find(f => f.id === parseInt(id));
      if (!found) throw new Error('Food not found');
      return found;
    }
  });

  useEffect(() => {
    if (isError) {
      toast.error('Food not found or failed to fetch');
      navigate('/');
    }
  }, [isError, navigate]);

  if (isLoading) return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-10 w-32 bg-base-300 rounded-xl mb-8"></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="h-[500px] lg:h-[600px] bg-base-300 rounded-[3rem]"></div>
        <div className="space-y-8 py-6">
          <div className="space-y-4">
            <div className="h-4 w-24 bg-base-300 rounded-lg"></div>
            <div className="h-16 w-full bg-base-300 rounded-2xl"></div>
          </div>
          <div className="h-4 w-full bg-base-300 rounded-lg"></div>
          <div className="h-4 w-3/4 bg-base-300 rounded-lg"></div>
          <div className="flex gap-4 pt-4">
            <div className="size-20 bg-base-300 rounded-2xl"></div>
            <div className="size-20 bg-base-300 rounded-2xl"></div>
          </div>
          <div className="pt-8 flex gap-6">
            <div className="h-16 w-32 bg-base-300 rounded-2xl"></div>
            <div className="h-16 flex-1 bg-primary/20 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
  if (!food) return null;

  const handleAddToCart = () => {
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/auth/login');
      return;
    }
    if (isAlreadyInCart) {
      toast.info('Item is already in your cart');
      return;
    }
    addToCart(food, quantity);
    toast.success(`${food.name} added to cart!`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <Link 
        to="/" 
        className="flex items-center gap-2 text-primary hover:underline mb-8 w-fit"
      >
        <MdArrowBack /> Back to Menu
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-base-100 rounded-3xl overflow-hidden shadow-xl border border-base-200">
        {/* Image Section */}
        <div className="relative h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img 
            src={food.main_image} 
            alt={food.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {(food.is_bestseller === 1 || food.is_bestseller === true) && (
            <div className="absolute top-6 left-6 bg-primary text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
              <span className="size-2 bg-white rounded-full animate-ping"></span>
              Bestseller
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-6 md:p-10 lg:p-12 flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
            <div>
              <span className="text-primary font-black tracking-[0.2em] uppercase text-[10px] mb-2 block opacity-60">
                {food.category}
              </span>
              <h1 className="text-3xl lg:text-5xl font-black text-base-content tracking-tighter leading-none">
                {food.name}
              </h1>
            </div>
            <span className="text-3xl font-black text-primary tracking-tighter">
              ${food.price}
            </span>
          </div>

          <p className="text-base-content/60 text-base md:text-lg leading-relaxed mb-8 font-medium">
            {food.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
            <div className="flex items-center gap-3 bg-base-200 p-4 rounded-2xl">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <MdTimer size={24} />
              </div>
              <div>
                <p className="text-xs text-base-content/50 font-medium">Prep Time</p>
                <p className="font-bold">{food.prep_time || '15-20'} min</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-base-200 p-4 rounded-2xl">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
                <MdLocalFireDepartment size={24} />
              </div>
              <div>
                <p className="text-xs text-base-content/50 font-medium">Calories</p>
                <p className="font-bold">{food.calories || '450'} kcal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-base-200 p-4 rounded-2xl col-span-2 sm:col-span-1">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <MdInfo size={24} />
              </div>
              <div>
                <p className="text-xs text-base-content/50 font-medium">Spiciness</p>
                <p className="font-bold">Level {food.spiciness_level || '1'}</p>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all active:scale-95 ${
                isAlreadyInCart ? 'bg-success text-white' : 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
              }`}
            >
              {isAlreadyInCart ? (
                <>
                  <MdCheck size={24} />
                  In Cart
                </>
              ) : (
                <>
                  <MdAddShoppingCart size={24} />
                  Add to Cart
                </>
              )}
            </button>
            {!isAlreadyInCart && (
              <div className="flex items-center gap-4 px-6 py-4 bg-base-200 rounded-2xl">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-xl font-bold p-2"
                >
                  -
                </button>
                <span className="text-xl font-bold min-w-[20px] text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-xl font-bold p-2"
                >
                  +
                </button>
              </div>
            )}
          </div>

          {food.allergens && (
            <div className="mt-8 pt-8 border-t border-base-200">
              <p className="text-sm font-semibold text-base-content/50 mb-2 uppercase tracking-tight">
                Allergen Information
              </p>
              <p className="text-sm text-base-content/70 italic">
                {food.allergens}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FoodDetails;
