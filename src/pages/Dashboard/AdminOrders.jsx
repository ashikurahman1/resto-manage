import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import Loader from '../../components/Loader/Loader';
import { MdCheckCircle, MdCancel, MdMoreHoriz } from 'react-icons/md';
import { toast } from 'react-toastify';
import { OrderRowSkeleton } from '../../components/shared/Skeleton';

const AdminOrders = () => {
  const queryClient = useQueryClient();

  // Fetch All Orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    }
  });

  // Update Order Status Mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return api.put(`/orders/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-orders']);
      toast.success('Order status updated');
    }
  });

  if (isLoading) return (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-8 w-48 bg-base-300 rounded-lg"></div>
        <div className="h-4 w-64 bg-base-300 rounded-lg"></div>
      </div>
      <div className="bg-base-100 rounded-3xl border border-base-200 overflow-hidden">
        <div className="p-8">
          <table className="table w-full">
            <tbody>
              {[...Array(6)].map((_, i) => (
                <OrderRowSkeleton key={i} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-base-content">Customer Orders</h1>
        <p className="text-base-content/50 font-medium">Monitor and manage all incoming restaurant orders.</p>
      </div>

      <div className="bg-base-100 rounded-3xl shadow-sm border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
          <thead>
            <tr className="bg-base-200/50 text-base-content/40 uppercase text-[11px] font-black tracking-[0.1em]">
              <th className="py-6 px-8">Order Details</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Status</th>
              <th className="text-right px-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-base-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-base-200/30 transition-colors">
                <td className="py-6 px-8">
                  <div className="font-black text-base-content text-lg">#{order.id}</div>
                  <div className="text-xs text-base-content/40 font-bold uppercase tracking-wider">
                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black uppercase shadow-inner">
                      {order.user_name?.charAt(0)}
                    </div>
                    <div className="font-bold text-base-content">{order.user_name}</div>
                  </div>
                </td>
                <td>
                  <span className="text-xl font-black text-primary tracking-tighter">${order.total_price}</span>
                </td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
                <td className="text-right px-8">
                  <div className="flex justify-end gap-2">
                    {(order.status === 'Pending' || order.status === 'pending') && (
                      <button 
                        onClick={() => updateStatusMutation.mutate({ id: order.id, status: 'Completed' })}
                        className="btn btn-sm btn-success text-white rounded-xl gap-2 font-black uppercase text-[10px]"
                      >
                        <MdCheckCircle size={16} /> Complete
                      </button>
                    )}
                    {order.status !== 'Cancelled' && order.status !== 'cancelled' && (
                      <button 
                        onClick={() => updateStatusMutation.mutate({ id: order.id, status: 'Cancelled' })}
                        className="btn btn-sm btn-error text-white rounded-xl gap-2 font-black uppercase text-[10px]"
                      >
                        <MdCancel size={16} /> Cancel
                      </button>
                    )}
                    <button className="btn btn-ghost btn-sm text-base-content/40 hover:bg-base-200 rounded-xl">
                      <MdMoreHoriz size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || 'pending';
  const configs = {
    pending: { class: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
    cooking: { class: 'bg-info/10 text-info border-info/20', label: 'Cooking' },
    completed: { class: 'bg-success/10 text-success border-success/20', label: 'Completed' },
    cancelled: { class: 'bg-error/10 text-error border-error/20', label: 'Cancelled' },
  };
  const config = configs[s] || configs.pending;
  return (
    <div className={`badge badge-lg border-2 ${config.class} gap-2 px-4 py-3 font-black uppercase text-[10px] tracking-widest`}>
      {s === 'pending' && <span className="size-1.5 rounded-full bg-warning animate-pulse"></span>}
      {config.label}
    </div>
  );
};

export default AdminOrders;
