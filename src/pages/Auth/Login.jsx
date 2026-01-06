import React, { useState } from 'react';
import {
  MdRestaurantMenu,
  MdArrowBack,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import { Link, useNavigate, useLocation } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginToken(email, password);
      toast.success('Login successful!');
      
      // Smart redirect: if admin and going to home, send to admin dashboard
      if (data.user.role === 'admin' && from === '/') {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 flex flex-col items-center justify-center bg-base-200 px-4">
     
      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-sm p-10 border border-base-300">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <MdRestaurantMenu size={36} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content uppercase tracking-wider">RestoManage</h1>
            <p className="text-base-content/60 mt-2">Welcome back! Please sign in to continue.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered w-full bg-base-200 border-none focus:ring-2 focus:ring-primary/50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input input-bordered w-full bg-base-200 border-none focus:ring-2 focus:ring-primary/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <MdVisibility size={20} /> : <MdVisibilityOff size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/20"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-base-content/60">
          Don't have an account?{' '}
          <Link to="/auth/register" className="text-primary font-bold hover:underline">
            Register for free
          </Link>
        </p>

        {/* Demo Credentials */}
        <div className="mt-8 pt-8 border-t border-base-200">
          <div className="bg-base-200/50 rounded-2xl p-6 border border-base-300 shadow-inner">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/40 mb-4 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
              Demo Credentials
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center group">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-primary/60 tracking-wider mb-1">Admin Access</span>
                  <span className="text-sm font-bold text-base-content/70">admin@restaurant.com</span>
                </div>
                <div className="bg-base-200 px-3 py-1.5 rounded-lg text-xs font-black border border-base-300">admin123</div>
              </div>
              <div className="flex justify-between items-center group">
                <div className="flex flex-col">
                  <span className="text-[11px] font-black uppercase text-base-content/30 tracking-wider mb-1">Standard User</span>
                  <span className="text-sm font-bold text-base-content/70">user@restaurant.com</span>
                </div>
                <div className="bg-base-200 px-3 py-1.5 rounded-lg text-xs font-black border border-base-300">user123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
