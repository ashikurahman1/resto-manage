import { MdAdd, MdDelete, MdEditNote, MdRemove } from 'react-icons/md';
import { useCart } from '../../context/CartContext';

const OrderItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  return (
    <div className="bg-base-100 rounded-2xl p-6 border border-base-200 shadow-sm flex flex-col sm:flex-row gap-8 group hover:border-primary/20 transition-all">
      <div className="w-full sm:w-40 h-32 shrink-0 rounded-2xl overflow-hidden shadow-inner bg-base-200">
        <img 
          src={item.main_image || item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-base-content mb-1 leading-tight">{item.name}</h3>
            <p className="text-base-content/50 text-xs md:text-sm font-medium line-clamp-1 max-w-sm">
              {item.desc || item.description}
            </p>
          </div>
          <span className="text-xl md:text-2xl font-black text-base-content tracking-tighter">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => removeFromCart(item.id)}
            className="btn btn-ghost btn-sm text-error/40 hover:text-error hover:bg-error/5 gap-2 font-bold"
          >
            <MdDelete size={20} /> <span className="hidden sm:inline">Remove</span>
          </button>

          <div className="flex items-center bg-base-200 rounded-xl p-1.5 gap-2 border border-base-300/50">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="size-9 flex items-center justify-center rounded-lg hover:bg-base-100 text-base-content/60 transition-all active:scale-90"
            >
              <MdRemove size={20} />
            </button>
            <span className="w-10 text-center font-black text-lg">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="size-9 flex items-center justify-center rounded-lg bg-primary text-white shadow-lg shadow-primary/20 transition-all active:scale-90"
            >
              <MdAdd size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
