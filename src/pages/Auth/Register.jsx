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
import { Link } from 'react-router';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center container mx-auto">
      <div className="relative w-full max-w-[480px] flex flex-col gap-6 bg-white dark:bg-[#1a140e] rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-[#e7dbcf] dark:border-[#3e2d22] p-8 sm:p-10 transition-all">
        {/* Back to Homepage Button */}
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#9a734c] hover:text-primary transition-colors mb-2 group"
        >
          <MdArrowBack className="text-[18px] group-hover:-translate-x-1 transition-transform" />
          Back to homepage
        </a>

        {/* Branding / Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
            <MdRestaurantMenu size={28} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[#1b140d] dark:text-white text-3xl font-bold tracking-tight">
              Create Account
            </h1>
            <p className="text-[#9a734c] dark:text-[#b09376] text-sm font-normal">
              Join RestoManager to start managing your business.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form
          className="flex flex-col gap-4 mt-2"
          onSubmit={e => e.preventDefault()}
        >
          {/* Full Name Input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium"
              htmlFor="name"
            >
              Full Name
            </label>
            <div className="relative">
              <input
                className="form-input flex w-full rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c]/50 border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-base transition-colors"
                id="name"
                placeholder="John Doe"
                type="text"
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="form-input flex w-full rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c]/50 border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary h-11 px-4 text-base transition-colors"
              id="email"
              placeholder="name@company.com"
              type="email"
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex items-center">
              <input
                className="form-input w-full rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c]/50 border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-4 pr-12 text-base transition-colors"
                id="password"
                placeholder="Create a password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 w-12 text-[#9a734c] hover:text-primary transition-colors"
                type="button"
              >
                {showPassword ? (
                  <MdVisibility size={20} />
                ) : (
                  <MdVisibilityOff size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium"
              htmlFor="confirm-password"
            >
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <input
                className="form-input w-full rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c]/50 border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary h-11 pl-4 pr-12 text-base transition-colors"
                id="confirm-password"
                placeholder="Repeat your password"
                type={showConfirmPassword ? 'text' : 'password'}
              />
              <button
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-0 w-12 text-[#9a734c] hover:text-primary transition-colors"
                type="button"
              >
                {showConfirmPassword ? (
                  <MdVisibility size={20} />
                ) : (
                  <MdVisibilityOff size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start gap-2 mt-1">
            <input
              className="mt-1 h-4 w-4 rounded border-[#e7dbcf] text-primary focus:ring-primary/20 bg-[#fcfaf8] dark:bg-[#251c16]"
              type="checkbox"
              id="terms"
              required
            />
            <label
              htmlFor="terms"
              className="text-xs text-[#9a734c] dark:text-[#b09376] leading-tight"
            >
              I agree to the{' '}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <button className="flex w-full items-center justify-center rounded-lg h-12 bg-primary hover:bg-[#d4761a] active:bg-[#b86515] text-[#1b140d] text-base font-bold transition-all shadow-sm mt-2">
            Create Account
          </button>
        </form>

        {/* Footer Meta */}
        <div className="text-center pt-2">
          <p className="text-[#9a734c] dark:text-[#b09376] text-sm font-normal">
            Already have an account?{' '}
            <Link
              className="font-semibold text-[#1b140d] dark:text-white hover:text-primary transition-colors"
              to="/auth/login"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
