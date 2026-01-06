import React from 'react';
import { MdAddCircle } from 'react-icons/md';
import OrderItem from '../../components/OrderItem/OrderItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
const items = [
  {
    id: 1,
    name: 'Margherita Pizza',
    desc: 'Classic pizza with fresh tomatoes, mozzarella cheese, and basil.',
    price: 12.99,
    qty: 2,
    img: 'https://images.unsplash.com/photo-1601924582975-4f7c6f3e1b8e?q=80&w=400',
    note: '',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    desc: 'Crisp romaine lettuce with Caesar dressing, croutons, and Parmesan cheese.',
    price: 8.5,
    qty: 1,
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400',
    note: 'No croutons, please.',
  },
];
const OrderPage = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">
            Current Order
          </h1>
          <div className="flex items-center gap-3 text-text-muted dark:text-gray-400">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold">
              Table #5
            </span>
            <span className="text-sm font-medium">Waiter: John D.</span>
          </div>
        </div>
        <button className="flex items-center gap-2 text-primary font-bold hover:bg-primary/10 px-4 py-2 rounded-lg">
          <MdAddCircle size={20} /> Add Items
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 flex flex-col gap-4">
          {items.map(item => (
            <OrderItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-4">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
};

export default OrderPage;
