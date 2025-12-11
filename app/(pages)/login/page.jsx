import React from "react";
import LoginForm from "../../(components)/LoginForm/LoginForm";
import { ClipboardList, Archive, BarChart3, FileCheck } from "lucide-react";
import bg from "../../assests/logo-wize-invoice.svg";
import Image from "next/image";
export default function Login() {
  return (
    <div className="page-shell">
      <div className="page-content w-full h-full flex flex-col lg:flex-row items-center gap-10 py-10 max-w-6xl mx-auto">
        {/* LEFT SIDE - ILLUSTRATION */}
        <div className="hidden lg:flex w-6/12 flex-col items-center justify-center gap-10">
          {/* LOGO & TITLE */}
          <div className="my-4 text-center space-y-3">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 shadow-2xl shadow-slate-900/50 mb-3 border border-slate-700/50">
              <Image alt="logo" src={bg} width={45} />
            </div>
            <h1 className="text-5xl font-black text-white drop-shadow-2xl">
              Invoice AI
            </h1>
            <p className="text-slate-300 text-lg font-medium">
              Smart Invoicing, Simplified
            </p>
          </div>

          {/* FEATURES ILLUSTRATION */}
          <div className="grid grid-cols-2 gap-6 max-w-lg w-full">
            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <ClipboardList
                  className="w-6 h-6 text-amber-200"
                  strokeWidth={2}
                />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                AI Extraction
              </h3>
              <p className="text-slate-300 text-sm">
                Extract invoice data automatically
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <Archive className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Smart Storage
              </h3>
              <p className="text-slate-300 text-sm">
                Organize & store all invoices
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <BarChart3 className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Track & Monitor
              </h3>
              <p className="text-slate-300 text-sm">
                Monitor payment status in real-time
              </p>
            </div>

            <div className="card-muted p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-2xl group">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-slate-700 to-slate-800 flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform border border-slate-600/30">
                <FileCheck className="w-6 h-6 text-amber-200" strokeWidth={2} />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">
                Process & Analyze
              </h3>
              <p className="text-slate-300 text-sm">
                Intelligent invoice processing
              </p>
            </div>
          </div>

          {/* TAGLINE */}
          <div className="text-center max-w-md">
            <p className="text-slate-200 text-xl font-semibold drop-shadow-lg leading-relaxed">
              &quot;Extract, organize, and track your invoices with AI-powered
              automation&quot;
            </p>
          </div>
        </div>

        {/* RIGHT SIDE - LOGIN FORM */}
        <div className="w-full lg:w-5/12 flex items-center justify-center">
          <div className="auth-card w-full max-w-md">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
