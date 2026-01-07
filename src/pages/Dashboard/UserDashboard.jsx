import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/axios';
import Loader from '../../components/Loader/Loader';
import { MdShoppingBag, MdAccessTime, MdCheckCircle, MdCancel, MdLocalShipping } from 'react-icons/md';
import { motion } from 'framer-motion';
import { OrderRowSkeleton, StatsCardSkeleton } from '../../components/shared/Skeleton';

const UserDashboard = () => {
  const { data: orders = [], isLoading, isError } = useQuery({
    queryKey: ['user-orders'],
    queryFn: async () => {
      try {
        const response = await api.get('/orders/my-orders');
        return response.data || [];
      } catch (err) {
        return [];
      }
    },
    initialData: []
  });

  if (isLoading) return (
    <div className="min-h-screen bg-transparent py-8 md:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatsCardSkeleton />
          <StatsCardSkeleton />
          <StatsCardSkeleton />
        </div>
        <div className="bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden">
          <div className="p-10 border-b border-base-200">
            <div className="h-8 w-48 bg-base-200 animate-pulse rounded-lg"></div>
          </div>
          <div className="p-10">
            <table className="table w-full">
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <OrderRowSkeleton key={i} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  if (isError) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <MdCancel size={64} className="mx-auto text-error opacity-20" />
        <h2 className="text-2xl font-black text-base-content">Connection Error</h2>
        <p className="text-base-content/60">We couldn't load your orders. Please try refreshing.</p>
        <button onClick={() => window.location.reload()} className="btn btn-primary rounded-xl px-8">Retry</button>
      </div>
    </div>
  );

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status?.toLowerCase() === 'pending').length,
    completed: orders.filter(o => o.status?.toLowerCase() === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-transparent py-8 md:py-16 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl space-y-10 md:space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-base-200">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-base-content tracking-tighter">Orders History</h1>
            <p className="text-sm md:text-lg text-base-content/60 mt-2 font-medium text-pretty">Track your culinary journeys and manage your active orders.</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard 
            title="Total Orders" 
            value={stats.total} 
            icon={<MdShoppingBag size={28} />} 
            color="bg-primary/10 text-primary" 
          />
          <StatCard 
            title="Pending Now" 
            value={stats.pending} 
            icon={<MdAccessTime size={28} />} 
            color="bg-warning/10 text-warning" 
          />
          <StatCard 
            title="Completed" 
            value={stats.completed} 
            icon={<MdCheckCircle size={28} />} 
            color="bg-success/10 text-success" 
          />
        </div>

        {/* Orders List */}
        <div className="bg-base-100 rounded-[2.5rem] shadow-sm border border-base-200 overflow-hidden">
          <div className="p-10 border-b border-base-200">
            <h2 className="text-2xl font-black text-base-content">Recent Activity</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr className="bg-base-200/50 text-base-content/40 uppercase text-[11px] font-black tracking-[0.2em]">
                  <th className="py-6 px-10">Order ID</th>
                  <th>Placed On</th>
                  <th>Items</th>
                  <th>Total Amount</th>
                  <th className="px-10">Tracking Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-200">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-32">
                      <div className="flex flex-col items-center gap-4">
                        <div className="size-20 bg-base-200 rounded-full flex items-center justify-center text-base-content/20">
                          <MdShoppingBag size={40} />
                        </div>
                        <p className="text-2xl font-black text-base-content/30 uppercase tracking-widest">No orders found yet</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-base-200/30 transition-colors group">
                      <td className="px-10 py-6">
                        <span className="font-black text-primary text-xl tracking-tighter shadow-sm bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">#{order.id}</span>
                      </td>
                      <td>
                        <div className="font-bold text-base-content">
                          {new Date(order.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="text-xs text-base-content/40 font-black uppercase tracking-widest mt-0.5">
                          {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td>
                        <div className="flex -space-x-4 overflow-hidden py-1">
                          {order.items?.filter(item => item && item.food_name).map((item, idx) => (
                            <div key={idx} className="tooltip tooltip-bottom" data-tip={item.food_name}>
                              <img
                                className="inline-block size-12 rounded-2xl ring-[6px] ring-base-100 object-cover shadow-sm grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                                src={item.food_image || 'https://via.placeholder.com/100'}
                                alt={item.food_name}
                              />
                            </div>
                          ))}
                          {!order.items?.length && <span className="text-xs text-base-content/20 italic">No details</span>}
                        </div>
                      </td>
                      <td>
                        <span className="text-2xl font-black text-base-content tracking-tighter">${order.total_price}</span>
                      </td>
                      <td className="px-10">
                        <StatusBadge status={order.status} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-base-100 p-8 rounded-[2.5rem] shadow-sm border border-base-200 flex items-center gap-8 group hover:border-primary transition-all">
    <div className={`${color} size-20 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
      {icon}
    </div>
    <div>
      <p className="text-base-content/40 font-black uppercase text-[10px] tracking-[0.2em] mb-1">{title}</p>
      <h3 className="text-4xl font-black text-base-content tracking-tighter">{value}</h3>
    </div>
  </div>
);

const StatusBadge = ({ status }) => {
  const s = status?.toLowerCase() || 'pending';
  const configs = {
    pending: { icon: <MdAccessTime size={16} />, class: 'bg-warning/10 text-warning border-warning/20', label: 'Pending' },
    cooking: { icon: <MdLocalShipping size={16} />, class: 'bg-info/10 text-info border-info/20', label: 'Cooking' },
    completed: { icon: <MdCheckCircle size={16} />, class: 'bg-success/10 text-success border-success/20', label: 'Served' },
    cancelled: { icon: <MdCancel size={16} />, class: 'bg-error/10 text-error border-error/20', label: 'Cancelled' },
  };

  const config = configs[s] || configs.pending;

  return (
    <div className={`badge badge-lg border-2 ${config.class} gap-3 px-5 py-5 font-black uppercase text-[10px] tracking-[0.2em]`}>
      {s === 'pending' && <span className="size-1.5 rounded-full bg-warning animate-pulse"></span>}
      {config.label}
    </div>
  );
};

export default UserDashboard;
