import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import Loader from '../../components/Loader/Loader';
import { 
  MdRestaurant, MdShoppingBag, MdAdd, MdEdit, MdDelete, 
  MdCheckCircle, MdCancel, MdLocalFireDepartment, MdTimer, MdListAlt 
} from 'react-icons/md';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

const AdminDashboard = () => {
  // Fetch All Orders for Stats
  const { data: orders = [], isLoading: ordersLoading } = useQuery({
    queryKey: ['all-orders'],
    queryFn: async () => {
      const response = await api.get('/orders');
      return response.data;
    }
  });

  const { data: foods = [], isLoading: foodsLoading } = useQuery({
    queryKey: ['foods'],
    queryFn: async () => {
      const response = await api.get('/foods');
      return response.data;
    }
  });

  // Process data for Chart (Last 7 Days Revenue)
  const chartData = React.useMemo(() => {
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' });
      const dailyRevenue = orders
        .filter(o => o.created_at.split('T')[0] === date && o.status?.toLowerCase() === 'completed')
        .reduce((sum, o) => sum + parseFloat(o.total_price), 0);
      
      return { name: dayName, revenue: dailyRevenue };
    });
  }, [orders]);

  const stats = [
    { 
      label: 'Total Revenue', 
      value: `$${orders.reduce((acc, curr) => acc + (curr.status?.toLowerCase() === 'completed' ? parseFloat(curr.total_price) : 0), 0).toFixed(2)}`,
      icon: <MdRestaurant size={28} />,
      color: 'bg-primary/10 text-primary'
    },
    { 
      label: 'Active Orders', 
      value: orders.filter(o => o.status?.toLowerCase() === 'pending').length,
      icon: <MdShoppingBag size={28} />,
      color: 'bg-warning/10 text-warning'
    },
    { 
      label: 'Total Customers', 
      value: [...new Set(orders.map(o => o.user_id))].length,
      icon: <MdTimer size={28} />,
      color: 'bg-info/10 text-info'
    },
    { 
      label: 'Menu Items', 
      value: foods.length,
      icon: <MdListAlt size={28} />,
      color: 'bg-success/10 text-success'
    }
  ];

  if (ordersLoading || foodsLoading) return <Loader />;

  return (
    <div className="space-y-8 md:space-y-12 pb-10">
      <div>
        <h1 className="text-2xl md:text-4xl font-black text-base-content tracking-tighter">Dashboard Overview</h1>
        <p className="text-sm md:text-lg text-base-content/60 font-medium font-outfit">Your restaurant's performance at a glance.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-base-100 rounded-[2rem] p-8 border border-base-200 shadow-sm flex flex-col items-center text-center group hover:border-primary transition-all">
            <div className={`size-16 ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500`}>
              {stat.icon}
            </div>
            <span className="text-base-content/40 font-black uppercase text-[10px] tracking-widest mb-2">{stat.label}</span>
            <span className="text-4xl font-black text-base-content tracking-tighter">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-base-100 rounded-[2rem] border border-base-200 p-8 shadow-sm">
          <h3 className="text-2xl font-black text-base-content mb-8">Recent Performance</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ff4d00" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ff4d00" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9ca3af', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  hide={true}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    fontWeight: 900
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#ff4d00" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorRev)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-base-100 rounded-3xl border border-base-200 p-8 shadow-sm">
          <h3 className="text-2xl font-black text-base-content mb-8">Top Dishes</h3>
          <div className="space-y-6">
            {foods.slice(0, 4).map((food) => (
              <div key={food.id} className="flex items-center gap-4">
                 <div className="size-12 rounded-xl bg-base-200 overflow-hidden">
                   <img src={food.main_image} alt="" className="w-full h-full object-cover" />
                 </div>
                 <div className="flex-1">
                    <div className="font-bold text-base-content">{food.name}</div>
                    <div className="text-xs text-base-content/40 font-medium capitalize">{food.category}</div>
                 </div>
                 <div className="font-black text-primary">${food.price}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
