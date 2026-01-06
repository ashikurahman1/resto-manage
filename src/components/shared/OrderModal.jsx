import React, { useState } from 'react';
import { MdClose, MdLocationOn, MdPhone, MdCheckCircle } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const OrderModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ address, phone });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-200"
          >
            <div className="p-6 border-b border-base-200 flex justify-between items-center">
              <h3 className="text-2xl font-bold flex items-center gap-2">
                <MdCheckCircle className="text-primary" /> Delivery Details
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-base-200 rounded-full transition-colors">
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-base-content/70 flex items-center gap-2">
                  <MdLocationOn className="text-primary" /> Delivery Address
                </label>
                <textarea
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your full delivery address"
                  className="w-full bg-base-200 border-none rounded-2xl p-4 h-32 focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-base-content/70 flex items-center gap-2">
                  <MdPhone className="text-primary" /> Contact Number
                </label>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+880 1XXX XXXXXX"
                  className="w-full bg-base-200 border-none rounded-2xl p-4 focus:ring-2 focus:ring-primary/50 transition-all"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 rounded-2xl font-bold bg-base-200 hover:bg-base-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 rounded-2xl font-bold bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Confirming...' : 'Confirm Order'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;
