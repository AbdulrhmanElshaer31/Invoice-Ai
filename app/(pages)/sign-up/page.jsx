import React from "react";
import SignUpForm from "../../(components)/SignupForm.jsx";
import { UserPlus, Shield, Zap, CheckCircle } from 'lucide-react';
import bg from '../../assests/logo-wize-invoice.svg'
import Image from 'next/image'

export default function Page() {
  return (
    <div className="w-full h-screen flex relative overflow-hidden">
      
      {/* BACKGROUND WITH GRADIENT - Black & Elegant */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"></div>

      {/* ANIMATED BLUR CIRCLES - Subtle & Elegant */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-800/10 rounded-full blur-3xl"></div>

      {/* SHINE EFFECT - Elegant Gold Touch */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-amber-200/5 to-transparent pointer-events-none"></div>

      {/* LEFT SIDE - ILLUSTRATION */}
      <div className="hidden lg:flex w-1/2 h-full relative z-10 flex-col items-center justify-center p-16">
        
        {/* LOGO & TITLE */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 shadow-2xl shadow-slate-900/50 mb-6 border border-slate-700/50 animate-bounce">
            <Image
              alt="logo"
              src={bg}
              width={45}
            />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
            Invoice AI
          </h1>
          <p className="text-slate-300 text-lg font-medium">
            Join thousands of businesses
          </p>
        </div>

        {/* BENEFITS GRID */}
        <div className="grid grid-cols-2 gap-6 max-w-lg">
          
          {/* Benefit 1 - Quick Setup */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
              <Zap className="w-6 h-6 text-amber-200" strokeWidth={2} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Quick Setup</h3>
            <p className="text-slate-300 text-sm">Get started in under 2 minutes</p>
          </div>

          {/* Benefit 2 - Secure Data */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
              <Shield className="w-6 h-6 text-amber-200" strokeWidth={2} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Secure Data</h3>
            <p className="text-slate-300 text-sm">Bank-level encryption & security</p>
          </div>

          {/* Benefit 3 - Free Trial */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
              <UserPlus className="w-6 h-6 text-amber-200" strokeWidth={2} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Free Trial</h3>
            <p className="text-slate-300 text-sm">14 days free, no credit card</p>
          </div>

          {/* Benefit 4 - 24/7 Support */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
              <CheckCircle className="w-6 h-6 text-amber-200" strokeWidth={2} />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">24/7 Support</h3>
            <p className="text-slate-300 text-sm">Always here to help you succeed</p>
          </div>
        </div>

        {/* TAGLINE */}
        <div className="mt-12 text-center max-w-md">
          <p className="text-slate-200 text-xl font-semibold drop-shadow-lg leading-relaxed">
            &quot;Start managing your invoices smarter, not harder&quot;
          </p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="hidden lg:flex h-full items-center justify-center px-8 relative z-10">
        <div className="h-2/3 w-px bg-linear-to-b from-transparent via-white/25 to-transparent"></div>
      </div>

      {/* RIGHT SIDE - SIGNUP FORM */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 relative z-10">
        
        {/* GLASSMORPHISM CARD */}
        <div className="bg-white/98 backdrop-blur-2xl border-2 border-slate-200/50 rounded-3xl shadow-2xl p-10 w-full max-w-md hover:shadow-slate-900/20 transition-all duration-500">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}