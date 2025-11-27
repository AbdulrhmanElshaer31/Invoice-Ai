"use client"
import React, { useState } from 'react';
export default function ForgetPasswordForm() {
  const [email, setEmail] = useState('');

  return (
    <div className='w-full flex flex-col gap-6'>
      
      {/* HEADER */}
      <header className='flex flex-col items-center gap-5'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold bg-linear-to-rrom-slate-800 to-slate-600 bg-clip-text text-transparent mb-2'>
            Forgot Password?
          </h1>
          <p className='text-slate-500 text-sm'>Enter your email address and we&apos;ll send you a reset link</p>
        </div>
        
      
      </header>


      {/* FORM */}
      <main className='flex flex-col gap-5'>
        
        {/* EMAIL INPUT */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-semibold text-slate-700 text-sm'>Email Address</label>
          <input 
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-slate-200 p-3.5 rounded-xl outline-none bg-white/70 backdrop-blur-sm
            hover:border-slate-400 hover:bg-white
            focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
            transition-all duration-300 placeholder:text-slate-400'
            placeholder='name@company.com'
          />
        </div>
      </main>

      {/* FOOTER */}
      <footer className='flex flex-col gap-4 mt-2'>
        
        {/* SEND RESET LINK BUTTON */}
        <button className='group relative w-full font-bold text-white p-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-size-200 hover:bg-right rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 overflow-hidden'>
          <span className='relative z-10'>Send Code</span>
          <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
        </button>

        {/* BACK TO LOGIN LINK */}
        <p className='text-center text-slate-600 text-sm'>
          Remember your password?{' '}
          <button className='text-slate-800 hover:text-slate-900 font-bold hover:underline decoration-2 underline-offset-2 transition-all'>
            Back to login
          </button>
        </p>
        
        {/* COPYRIGHT */}
        <p className='text-center text-slate-400 text-xs mt-2'>
          &copy; 2025 Invoice AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}