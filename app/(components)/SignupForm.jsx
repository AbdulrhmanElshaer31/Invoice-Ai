"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className='w-full flex flex-col gap-4'>
      
      {/* HEADER */}
      <header className='flex flex-col items-center gap-3'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-1'>
            Create an account
          </h1>
          <p className='text-slate-500 text-xs'>Enter your details below to create your account</p>
        </div>
        
        {/* GOOGLE BUTTON */}
        <button className='group flex justify-center items-center w-full font-medium text-slate-700 p-2.5 bg-white hover:bg-slate-50 gap-2 transition-all duration-300 border-2 border-slate-200 hover:border-slate-400 rounded shadow-sm hover:shadow-lg hover:scale-[1.02]'>
          <FcGoogle size={20} />
          <span className='text-sm group-hover:text-slate-900 transition-colors'>Continue with Google</span>
        </button>
      </header>

      {/* DIVIDER */}
      <div className='flex items-center gap-3'>
        <div className='flex-1 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent'></div>
        <span className='text-slate-400 text-[10px] font-semibold uppercase tracking-wider'>Or email</span>
        <div className='flex-1 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent'></div>
      </div>

      {/* FORM */}
      <main className='flex flex-col gap-3'>
        
        {/* NAME INPUTS */}
        <div className='grid grid-cols-2 gap-3'>
          {/* FIRST NAME */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="firstName" className='font-semibold text-slate-700 text-xs'>First Name</label>
            <input 
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              transition-all duration-300 placeholder:text-slate-400'
              placeholder='John'
            />
          </div>

          {/* LAST NAME */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="lastName" className='font-semibold text-slate-700 text-xs'>Last Name</label>
            <input 
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              transition-all duration-300 placeholder:text-slate-400'
              placeholder='Doe'
            />
          </div>
        </div>

        {/* EMAIL INPUT */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor="email" className='font-semibold text-slate-700 text-xs'>Email</label>
          <div className='relative'>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='border-2 border-slate-200 p-2.5 pr-20 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              transition-all duration-300 w-full placeholder:text-slate-400'
              placeholder='name@company.com'
            />
            <button
              type="button"
              className='absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded hover:bg-slate-800 transition-all duration-300 hover:scale-105'
            >
              Verify
            </button>
          </div>
        </div>

        {/* PASSWORD INPUTS */}
        <div className='grid grid-cols-2 gap-3'>
          {/* PASSWORD */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="password" className='font-semibold text-slate-700 text-xs'>Password</label>
            <div className='relative'>
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
                hover:border-slate-400 hover:bg-white
                focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                transition-all duration-300 w-full pr-9 placeholder:text-slate-400'
                placeholder='••••••••'
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 hover:scale-110'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className='flex flex-col gap-1.5'>
            <label htmlFor="confirmPassword" className='font-semibold text-slate-700 text-xs'>Confirm Password</label>
            <div className='relative'>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
                hover:border-slate-400 hover:bg-white
                focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                transition-all duration-300 w-full pr-9 placeholder:text-slate-400'
                placeholder='••••••••'
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 hover:scale-110'
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className='flex flex-col gap-3 mt-1'>
        
        {/* CREATE ACCOUNT BUTTON */}
        <button className='group relative w-full font-bold text-white p-2.5 text-sm bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-size-200 hover:bg-right rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 overflow-hidden'>
          <span className='relative z-10'>Create account</span>
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
        </button>

        {/* LOGIN LINK */}
        <p className='text-center text-slate-600 text-xs'>
          Already have an account?{' '}
          <button className='text-slate-800 hover:text-slate-900 font-bold hover:underline decoration-2 underline-offset-2 transition-all'>
            Login
          </button>
        </p>
        
        {/* COPYRIGHT */}
        <p className='text-center text-slate-400 text-[10px]'>
          &copy; 2025 Invoice AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}