import React from "react";
import SignUpForm from "../../(components)/SignupForm/SignupForm";
import { UserPlus, Shield, Zap, CheckCircle } from "lucide-react";
import bg from "../../assests/logo-wize-invoice.svg";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="page-shell">
      <div className="page-content w-full h-full flex flex-col lg:flex-row items-stretch gap-10 py-8">
        {/* LEFT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex w-1/2 flex-col items-center justify-center p-4 gap-10">
          {/* LOGO & TITLE */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 shadow-2xl shadow-slate-900/50 mb-2 border border-slate-700/50">
              <Image alt="logo" src={bg} width={45} />
            </div>
            <h1 className="text-5xl font-black text-white drop-shadow-2xl">
              Invoice AI
            </h1>
            <p className="text-slate-300 text-lg font-medium">
              Join thousands of businesses
            </p>
          </div>

          {/* BENEFITS GRID */}
          <div className="grid grid-cols-2 gap-6 max-w-lg w-full">
            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <Zap className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Quick Setup</h3>
              <p className="text-slate-300 text-sm">
                Get started in under 2 minutes
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <Shield className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Secure Data</h3>
              <p className="text-slate-300 text-sm">
                Bank-level encryption & security
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <UserPlus className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Free Trial</h3>
              <p className="text-slate-300 text-sm">
                14 days free, no credit card
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <CheckCircle
                  className="w-6 h-6 text-amber-200"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                24/7 Support
              </h3>
              <p className="text-slate-300 text-sm">
                Always here to help you succeed
              </p>
            </div>
          </div>

          {/* TAGLINE */}
          <div className="text-center max-w-md">
            <p className="text-slate-200 text-xl font-semibold drop-shadow-lg leading-relaxed">
              &quot;Start managing your invoices smarter, not harder&quot;
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - SIGNUP FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center">
          <div className="glass-panel p-10 w-full max-w-md">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
