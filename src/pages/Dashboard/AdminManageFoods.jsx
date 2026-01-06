import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import Loader from '../../components/Loader/Loader';
import { MdAdd, MdEdit, MdDelete } from 'react-icons/md';
import AddFoodModal from '../../components/shared/AddFoodModal';
import { toast } from 'react-toastify';

const AdminManageFoods = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const queryClient = useQueryClient();

  // Fetch Foods
  const { data: foods = [], isLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await api.get('/foods');
      return response.data;
    }
  });

  // Create Food Mutation
  const createMutation = useMutation({
    mutationFn: async (foodData) => {
      return api.post('/foods', foodData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['foods']);
      toast.success('New dish added to menu!');
      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to add food');
    }
  });

  // Update Food Mutation
  const updateMutation = useMutation({
    mutationFn: async (foodData) => {
      const { id, ...data } = foodData;
      return api.put(`/foods/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['foods']);
      toast.success('Dish updated successfully!');
      closeModal();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to update food');
    }
  });

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFood(null);
  };

  const handleEdit = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const onConfirm = (data) => {
    if (selectedFood) {
      updateMutation.mutate({ ...data, id: selectedFood.id });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleDelete = async (id) => {
     if (window.confirm('Are you sure you want to delete this dish?')) {
        try {
          await api.delete(`/foods/${id}`);
          queryClient.invalidateQueries(['foods']);
          toast.success('Dish removed from menu');
        } catch (error) {
          toast.error('Failed to remove dish');
        }
     }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-base-content tracking-tighter">Manage Foods</h1>
          <p className="text-base-content/50 font-medium">Update, edit or remove items from your menu.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary gap-2 rounded-2xl shadow-lg shadow-primary/20 text-white font-black h-14 px-8 uppercase text-xs tracking-widest"
        >
          <MdAdd size={24} /> Add New Dish
        </button>
      </div>

      <div className="bg-base-100 rounded-[2.5rem] shadow-sm border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
          <thead>
            <tr className="bg-base-200/50 text-base-content/40 uppercase text-[11px] font-black tracking-[0.2em]">
              <th className="py-8 px-10 border-none">Dish</th>
              <th className="border-none">Category</th>
              <th className="border-none">Price</th>
              <th className="border-none">Status</th>
              <th className="text-right px-10 border-none">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {foods.map((food) => (
              <tr key={food.id} className="hover:bg-base-200/30 transition-colors group">
                <td className="py-6 px-10 border-none">
                  <div className="flex items-center gap-6">
                    <div className="size-16 rounded-2xl overflow-hidden shadow-inner bg-base-200 border border-base-300/50">
                      <img src={food.main_image} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div>
                      <div className="font-black text-base-content text-lg leading-tight mb-1">{food.name}</div>
                      <div className="text-[10px] text-base-content/40 font-black uppercase tracking-widest">{food.calories || 0} kcal</div>
                    </div>
                  </div>
                </td>
                <td className="border-none">
                  <span className="badge badge-lg border-none bg-base-200 text-base-content/60 font-black px-4 py-4 text-[10px] uppercase tracking-widest">
                    {food.category}
                  </span>
                </td>
                <td className="border-none">
                  <span className="text-2xl font-black text-primary tracking-tighter">${food.price}</span>
                </td>
                <td className="border-none">
                   <span className="flex items-center gap-2 text-success font-black text-[10px] uppercase tracking-wider">
                     <span className="size-1.5 rounded-full bg-success animate-pulse"></span>
                     Available
                   </span>
                </td>
                <td className="text-right px-10 border-none">
                  <div className="flex justify-end gap-3">
                    <button 
                      onClick={() => handleEdit(food)}
                      className="btn btn-ghost btn-sm text-primary hover:bg-primary/10 rounded-xl font-black uppercase text-[10px] px-4"
                    >
                      <MdEdit size={18} /> Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(food.id)}
                      className="btn btn-ghost btn-sm text-error/40 hover:text-error hover:bg-error/5 rounded-xl font-black uppercase text-[10px] px-4"
                    >
                      <MdDelete size={18} /> Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <AddFoodModal 
      isOpen={isModalOpen} 
      onClose={closeModal}
      onConfirm={onConfirm}
      loading={createMutation.isPending || updateMutation.isPending}
      food={selectedFood}
    />
    </div>
  );
};

export default AdminManageFoods;
