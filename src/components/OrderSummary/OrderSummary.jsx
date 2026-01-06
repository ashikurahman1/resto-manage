import { MdArrowForward, MdShoppingBag } from 'react-icons/md';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import OrderModal from '../shared/OrderModal';

const OrderSummary = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const subtotal = cartTotal;
  const tax = subtotal * 0.08;
  const service = subtotal * 0.05;
  const total = subtotal + tax + service;

  const handlePlaceOrder = async (deliveryDetails) => {
    if (!user) {
      toast.info('Please log in to place an order');
      navigate('/auth/login');
      return;
    }

    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    try {
      setLoading(true);
      const items = cart.map(item => ({
        food_id: item.id,
        quantity: item.quantity
      }));

      const orderData = {
        items,
        ...deliveryDetails,
        total_price: total
      };

      await api.post('/orders', orderData);
      toast.success('Order placed successfully!');
      clearCart();
      setIsModalOpen(false);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-base-100 rounded-3xl p-8 border border-base-200 shadow-sm sticky top-28">
      <h2 className="text-2xl font-black text-base-content mb-8 flex items-center gap-3">
        <MdShoppingBag className="text-primary" /> Summary
      </h2>
      
      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-base-content/60 font-medium">
          <span>Subtotal</span>
          <span className="text-base-content font-bold">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base-content/60 font-medium">
          <span>Service Fee</span>
          <span className="text-base-content font-bold">${service.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-base-content/60 font-medium">
          <span>Delivery</span>
          <span className="text-success font-black uppercase text-xs tracking-widest mt-1">FREE</span>
        </div>
        <div className="border-t border-base-200 pt-6 mt-6 flex justify-between items-center">
          <span className="text-lg font-bold text-base-content">Total</span>
          <span className="text-4xl font-black text-primary tracking-tighter">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        disabled={cart.length === 0 || loading}
        className="btn btn-primary btn-lg w-full rounded-2xl text-white font-black tracking-wide shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 h-16"
      >
        {loading ? <span className="loading loading-spinner"></span> : (
          <>
            Place Order <MdArrowForward size={24} />
          </>
        )}
      </button>

      <p className="text-center text-[10px] text-base-content/30 mt-8 font-black uppercase tracking-[0.2em]">
        Verified Secure Checkout
      </p>

      {isModalOpen && (
        <OrderModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onConfirm={handlePlaceOrder}
          loading={loading}
        />
      )}
    </div>
  );
};

export default OrderSummary;
