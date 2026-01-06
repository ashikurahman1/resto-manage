import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdClose, MdCloudUpload, MdRestaurant, MdInfo } from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';

const AddFoodModal = ({ isOpen, onClose, onConfirm, loading, food }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      category: 'Main Course',
      price: '',
      description: '',
      main_image: '',
      calories: '',
      protein: '',
      prep_time: '',
      spiciness_level: 1,
      is_bestseller: false,
      is_available: true,
      allergens: '',
    }
  });

  useEffect(() => {
    if (food) {
      reset({
        ...food,
        is_available: food.is_available === 1 || food.is_available === true
      });
    } else {
      reset({
        name: '',
        category: 'Main Course',
        price: '',
        description: '',
        main_image: '',
        calories: '',
        protein: '',
        prep_time: '',
        spiciness_level: 1,
        is_bestseller: false,
        is_available: true,
        allergens: '',
      });
    }
  }, [food, reset, isOpen]);

  const onSubmit = (data) => {
    onConfirm(data);
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
            className="relative w-full max-w-2xl bg-base-100 rounded-3xl shadow-2xl overflow-hidden border border-base-200"
          >
            <div className="p-6 border-b border-base-200 flex justify-between items-center bg-base-200/50">
              <h3 className="text-xl font-black flex items-center gap-2 uppercase tracking-tighter">
                <MdRestaurant className="text-primary" /> {food ? 'Edit Dish' : 'Add New Dish'}
              </h3>
              <button 
                onClick={() => {
                  reset();
                  onClose();
                }} 
                className="p-2 hover:bg-base-300 rounded-full transition-colors"
              >
                <MdClose size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Dish Name</span></label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    placeholder="e.g. Grilled Salmon"
                    className={`input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50 ${errors.name ? 'ring-2 ring-error/50' : ''}`}
                  />
                  {errors.name && <span className="text-[10px] font-black text-error uppercase tracking-widest mt-1 ml-2">{errors.name.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Category</span></label>
                  <select
                    {...register('category')}
                    className="select select-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50"
                  >
                    <option>Main Course</option>
                    <option>Appetizers</option>
                    <option>Desserts</option>
                    <option>Beverages</option>
                    <option>Salads</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Price ($)</span></label>
                  <input
                    type="number"
                    step="0.01"
                    {...register('price', { required: 'Price is required', min: 0 })}
                    placeholder="19.99"
                    className={`input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50 ${errors.price ? 'ring-2 ring-error/50' : ''}`}
                  />
                  {errors.price && <span className="text-[10px] font-black text-error uppercase tracking-widest mt-1 ml-2">{errors.price.message}</span>}
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Prep Time (min)</span></label>
                  <input
                    type="number"
                    {...register('prep_time')}
                    placeholder="20"
                    className="input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Calories (kcal)</span></label>
                  <input
                    type="number"
                    {...register('calories')}
                    placeholder="450"
                    className="input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Protein (g)</span></label>
                  <input
                    type="number"
                    {...register('protein')}
                    placeholder="25"
                    className="input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="form-control">
                  <label className="label"><span className="label-text font-bold text-base-content/60">Spiciness Level</span></label>
                  <input
                    type="range"
                    {...register('spiciness_level')}
                    min="1"
                    max="5"
                    step="1"
                    className="range range-primary range-sm"
                  />
                  <div className="flex justify-between px-2 text-[10px] font-black mt-2 opacity-40">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold text-base-content/60">Description</span></label>
                <textarea
                  {...register('description')}
                  placeholder="Describe the dish, its ingredients and taste..."
                  className="textarea textarea-bordered bg-base-200 border-none rounded-2xl font-medium h-24 focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold text-base-content/60">Image URL</span></label>
                <div className="relative">
                  <input
                    type="url"
                    {...register('main_image')}
                    placeholder="https://example.com/image.jpg"
                    className="input input-bordered w-full bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50 pl-12"
                  />
                  <MdCloudUpload className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/20" size={20} />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-bold text-base-content/60">Allergens</span></label>
                <input
                  type="text"
                  {...register('allergens')}
                  placeholder="e.g. Nuts, Dairy, Gluten"
                  className="input input-bordered bg-base-200 border-none rounded-2xl font-medium focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 bg-base-200/50 p-6 rounded-2xl border border-base-200">
                  <input
                    type="checkbox"
                    {...register('is_available')}
                    className="checkbox checkbox-success rounded-lg"
                  />
                  <span className="text-sm font-bold flex items-center gap-2">
                    <MdInfo className="text-success" /> Available For Order
                  </span>
                </div>
                <div className="flex items-center gap-4 bg-base-200/50 p-6 rounded-2xl border border-base-200">
                  <input
                    type="checkbox"
                    {...register('is_bestseller')}
                    className="checkbox checkbox-primary rounded-lg"
                  />
                  <span className="text-sm font-bold flex items-center gap-2">
                    <MdInfo className="text-primary" /> Mark as Bestseller
                  </span>
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button
                  type="button"
                  onClick={() => {
                    reset();
                    onClose();
                  }}
                  className="flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-base-200 hover:bg-base-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-4 rounded-2xl font-black uppercase text-xs tracking-widest bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : (food ? 'Save Changes' : 'Add to Menu')}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddFoodModal;
