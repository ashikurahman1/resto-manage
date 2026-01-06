import React from 'react';
import { MdAdd, MdDelete, MdEditNote, MdRemove } from 'react-icons/md';

const OrderItem = ({ item }) => {
  return (
    <div className="group bg-card-light dark:bg-card-dark rounded-xl p-4 shadow-sm border border-transparent hover:border-primary/20 transition-all">
      <div className="flex flex-col sm:flex-row gap-5">
        <div className="w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden relative">
          <div
            className="absolute inset-0 bg-center bg-cover transition-transform group-hover:scale-110 duration-500"
            style={{ backgroundImage: `url(${item.img})` }}
          ></div>
        </div>

        <div className="flex flex-1 flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold mb-1">{item.name}</h3>
              <p className="text-text-muted dark:text-gray-400 text-sm mb-2">
                {item.desc}
              </p>
              <div className="flex items-center gap-2 text-primary text-xs font-medium cursor-pointer hover:underline">
                <MdEditNote size={18} /> {item.note ? 'Edit Note' : 'Add Note'}
              </div>
              {item.note && (
                <p className="text-text-muted dark:text-gray-500 text-xs mt-1 italic">
                  Note: {item.note}
                </p>
              )}
            </div>
            <span className="text-lg font-bold">
              ${(item.price * item.qty).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-end mt-4">
            <button
              // onClick={() => onUpdateQty(item.id, -item.qty)}
              className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1 rounded-md"
            >
              <MdDelete size={20} />
            </button>

            <div className="flex items-center bg-background-light dark:bg-white/5 rounded-lg p-1 border border-gray-100 dark:border-white/10">
              <button
                // onClick={() => onUpdateQty(item.id, -1)}
                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white dark:hover:bg-white/10 text-text-main dark:text-white transition-all"
              >
                <MdRemove size={16} />
              </button>
              <span className="w-10 text-center text-sm font-bold">
                {item.qty}
              </span>
              <button
                // onClick={() => onUpdateQty(item.id, 1)}
                className="w-8 h-8 flex items-center justify-center rounded-md bg-primary text-white hover:bg-primary/90 transition-all"
              >
                <MdAdd size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
