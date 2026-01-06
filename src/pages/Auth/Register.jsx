import React, { useState } from 'react';
import {
  MdRestaurantMenu,
  MdArrowBack,
  MdVisibility,
  MdVisibilityOff,
  MdPerson,
  MdEmail,
  MdLock,
} from 'react-icons/md';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   setLoading(true);
    try {
      await registerUser(name, email, password);
      toast.success('Registration successful! Please login.');
      navigate('/auth/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-5 lg:py-10 flex flex-col items-center justify-center bg-base-200  px-4 ">
        

      <div className="w-full max-w-md bg-base-100 rounded-2xl shadow-sm p-10 border border-base-300">
        <div className="flex flex-col items-center gap-6 mb-8">
          <div className="size-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
            <MdRestaurantMenu size={36} />
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-base-content uppercase tracking-wider">Join Us</h1>
            <p className="text-base-content/60 mt-2 text-pretty">Create your account and start your journey.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="John Doe"
              className="input input-bordered w-full bg-base-200 border-none focus:ring-2 focus:ring-primary/50 text-base-content font-medium h-12 rounded-xl"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">Email Address</span>
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              className="input input-bordered w-full bg-base-200 border-none focus:ring-2 focus:ring-primary/50 text-base-content font-medium h-12 rounded-xl"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-bold text-base-content/70">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input input-bordered w-full bg-base-200 border-none focus:ring-2 focus:ring-primary/50 text-base-content font-medium h-12 rounded-xl"
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

          <div className="flex items-start gap-3 mt-2">
            <input type="checkbox" className="checkbox checkbox-primary checkbox-sm mt-1 rounded-md" required id="terms" />
            <label htmlFor="terms" className="text-xs text-base-content/50 font-medium leading-relaxed">
              I agree to the <span className="text-primary font-bold cursor-pointer hover:underline">Terms of Service</span> and <span className="text-primary font-bold cursor-pointer hover:underline">Privacy Policy</span>.
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-bold h-14 rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-95"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
          </button>
        </form>

        <p className="text-center mt-10 text-sm font-medium text-base-content/60">
          Already have an account?{' '}
          <Link to="/auth/login" className="text-primary font-bold hover:underline">
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
