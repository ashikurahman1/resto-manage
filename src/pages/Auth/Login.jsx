import React, { useState } from 'react';
import {
  MdRestaurantMenu,
  MdArrowBack,
  MdVisibility,
  MdVisibilityOff,
} from 'react-icons/md';
import { Link } from 'react-router';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center container mx-auto">
      <div className="relative w-full max-w-[440px] flex flex-col gap-6 bg-white dark:bg-[#1a140e] rounded-xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none border border-[#e7dbcf] dark:border-[#3e2d22] p-8 sm:p-10 transition-all">
        <a
          href="/"
          className="flex items-center gap-2 text-sm font-medium text-[#9a734c] hover:text-primary transition-colors mb-2 group"
        >
          <MdArrowBack className="text-[18px] group-hover:-translate-x-1 transition-transform" />
          Back to homepage
        </a>

        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary">
            <MdRestaurantMenu size={32} />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-[#1b140d] dark:text-white text-3xl font-bold tracking-tight">
              RestoManager
            </h1>
            <p className="text-[#9a734c] dark:text-[#b09376] text-sm font-normal">
              Welcome back! Please enter your details.
            </p>
          </div>
        </div>

        <form
          className="flex flex-col gap-5 mt-2"
          onSubmit={e => e.preventDefault()}
        >
          <div className="flex flex-col gap-2">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium leading-normal"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="form-input flex w-full rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c] dark:placeholder:text-[#6a5646] border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-0 h-12 px-4 text-base font-normal transition-colors"
                id="email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              className="text-[#1b140d] dark:text-[#ede0d4] text-sm font-medium leading-normal"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative flex w-full items-center rounded-lg">
              <input
                className="form-input flex w-full flex-1 rounded-lg text-[#1b140d] dark:text-white placeholder:text-[#9a734c] dark:placeholder:text-[#6a5646] border border-[#e7dbcf] dark:border-[#3e2d22] bg-[#fcfaf8] dark:bg-[#251c16] focus:border-primary focus:ring-1 focus:ring-primary focus:outline-0 h-12 pl-4 pr-12 text-base font-normal transition-colors"
                id="password"
                placeholder="Enter your password"
                type={showPassword ? 'text' : 'password'}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-0 flex h-full w-12 items-center justify-center text-[#9a734c] hover:text-primary transition-colors cursor-pointer rounded-r-lg"
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                className="h-4 w-4 rounded border-[#e7dbcf] text-primary focus:ring-primary/20 bg-[#fcfaf8] dark:bg-[#251c16] dark:border-[#3e2d22]"
                type="checkbox"
              />
              <span className="text-sm text-[#9a734c] group-hover:text-[#1b140d] dark:text-[#b09376] dark:group-hover:text-white transition-colors">
                Remember me
              </span>
            </label>
            <a
              className="text-sm font-medium text-primary hover:text-[#d4761a] transition-colors underline-offset-2 hover:underline"
              href="#"
            >
              Forgot password?
            </a>
          </div>

          <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary hover:bg-[#d4761a] active:bg-[#b86515] text-[#1b140d] text-base font-bold leading-normal tracking-[0.015em] transition-all shadow-sm">
            Sign In
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[#9a734c] dark:text-[#b09376] text-sm font-normal">
            Don't have an account?{' '}
            <Link
              className="font-semibold text-[#1b140d] dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
              to={'/auth/register'}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
