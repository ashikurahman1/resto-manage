import React from 'react';
import { MdArrowForward } from 'react-icons/md';
const subtotal = 100.0; // Example subtotal amount
const tax = subtotal * 0.08;
const service = subtotal * 0.05;
const total = subtotal + tax + service;
const OrderSummary = () => {
  return (
    <div className="sticky top-28 bg-card-light dark:bg-card-dark rounded-xl shadow-lg border border-gray-100 dark:border-white/5 overflow-hidden">
      <div className="p-6 border-b border-gray-100 dark:border-white/10">
        <h3 className="text-xl font-bold">Order Summary</h3>
      </div>
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between text-text-muted dark:text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium text-text-main dark:text-white">
            ${subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-text-muted dark:text-gray-400">
          <span>Tax (8%)</span>
          <span className="font-medium text-text-main dark:text-white">
            ${tax.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between text-text-muted dark:text-gray-400">
          <span>Service Charge (5%)</span>
          <span className="font-medium text-text-main dark:text-white">
            ${service.toFixed(2)}
          </span>
        </div>
        <div className="h-px bg-gray-100 dark:bg-white/10 my-2"></div>
        <div className="flex justify-between items-end">
          <span className="text-lg font-medium text-text-muted">Total</span>
          <span className="text-3xl font-black text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>
      <div className="p-6 pt-0">
        <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold text-lg py-4 rounded-lg shadow-md shadow-primary/30 transition-all flex items-center justify-center gap-3">
          Place Order <MdArrowForward size={24} />
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
