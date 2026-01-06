import { MdAddShoppingCart, MdInfo, MdCheck } from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

const FoodCard = ({ dish }) => {
  const { user } = useAuth();
  const { addToCart, cart } = useCart();
  const navigate = useNavigate();

  const isAlreadyInCart = cart.some(item => item.id === dish.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!user) {
      toast.info('Please login to add items to cart');
      navigate('/auth/login');
      return;
    }
    if (isAlreadyInCart) {
      toast.info('Item is already in your cart');
      return;
    }
    addToCart(dish);
    toast.success(`${dish.name} added to cart!`);
  };
  return (
    <div className="bg-base-100 rounded-2xl border border-base-200 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
      <Link to={`/foods/${dish.id}`} className="block relative aspect-[5/4] overflow-hidden">
        <img 
          src={dish.image} 
          alt={dish.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-black text-primary uppercase tracking-tighter shadow-sm border border-primary/10">
            {dish.category}
          </span>
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-xl font-bold text-base-content leading-tight group-hover:text-primary transition-colors line-clamp-1">
            {dish.name}
          </h3>
          <span className="text-2xl font-black text-primary tracking-tighter">${dish.price}</span>
        </div>
        
        <p className="text-sm text-base-content/50 line-clamp-2 mb-6 font-medium">
          {dish.description}
        </p>
        
        <div className="flex gap-3 mt-auto">
          <button 
            onClick={handleAddToCart}
            className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
              isAlreadyInCart 
                ? 'bg-success/10 text-success border border-success/20' 
                : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
            }`}
          >
            {isAlreadyInCart ? (
              <>
                <MdCheck size={18} />
                In Cart
              </>
            ) : (
              <>
                <MdAddShoppingCart size={18} />
                Order Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
