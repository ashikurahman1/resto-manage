import { MdAddCircle, MdShoppingCart } from 'react-icons/md';
import OrderItem from '../../components/OrderItem/OrderItem';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router';

const OrderPage = () => {
  const { cart } = useCart();
  return (
    <div className="min-h-screen bg-transparent py-8 md:py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 gap-6 text-center md:text-left border-b border-base-200 pb-8">
          <div>
            <h1 className="text-2xl md:text-4xl font-black text-base-content tracking-tighter">Your Selection</h1>
            <p className="text-sm md:text-base text-base-content/60 mt-2 font-medium">Review your items and proceed to checkout.</p>
          </div>
          <Link 
            to="/" 
            className="btn btn-ghost text-primary font-black hover:bg-primary/5 px-6 rounded-xl flex items-center gap-2 uppercase text-[11px] tracking-widest"
          >
            <MdAddCircle size={20} /> Add More
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Cart Items */}
          <div className="flex-1 w-full space-y-6">
            {cart.length === 0 ? (
              <div className="bg-base-100 rounded-3xl p-20 text-center border border-base-200 shadow-sm">
                <div className="size-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-8 text-base-content/20">
                  <MdShoppingCart size={48} />
                </div>
                <h3 className="text-3xl font-black text-base-content">Your cart is empty</h3>
                <p className="text-base-content/60 mt-3 mb-10 font-medium text-lg">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="btn btn-primary btn-lg px-12 rounded-xl text-white font-bold tracking-wide shadow-lg shadow-primary/20">
                  Browse Our Menu
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <OrderItem key={item.id} item={item} />
              ))
            )}
          </div>

          {/* Checkout Summary */}
          <div className="w-full lg:w-[420px] sticky top-28">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
