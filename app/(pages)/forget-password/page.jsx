import React from "react";
// import LoginForm from "../../(components)/LoginForm";
import {} from "lucide-react";
import bg from "../../assests/logo-wize-invoice.svg";
import Image from "next/image";
import ForgetPasswordForm from "../../(components)/ForgetPasswordForm/ForgetPasswordForm";
export default function Page() {
  return (
    <div className="w-full h-screen flex relative overflow-hidden">
      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 h-full flex items-center justify-center px-6 relative z-10">
        {/* GLASSMORPHISM CARD */}
        <div className="bg-white/98 backdrop-blur-2xl border-2 border-slate-200/50 rounded-3xl shadow-2xl p-10 w-full max-w-md hover:shadow-slate-900/20 transition-all duration-500">
          <ForgetPasswordForm />
        </div>
      </div>

      {/* BACKGROUND WITH GRADIENT - Black & Elegant */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800"></div>

      {/* ANIMATED BLUR CIRCLES - Subtle & Elegant */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-slate-700/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-96 h-96 bg-slate-600/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-800/10 rounded-full blur-3xl"></div>

      {/* SHINE EFFECT - Elegant Gold Touch */}
      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-amber-200/5 to-transparent pointer-events-none"></div>

      {/* DIVIDER */}
      <div className="hidden lg:flex h-full items-center justify-center px-8 relative z-10">
        <div className="h-2/3 w-px bg-linear-to-b from-transparent via-white/25 to-transparent"></div>
      </div>
      {/* LEFT SIDE - ILLUSTRATION */}
      <div className="hidden lg:flex w-1/2 h-full relative z-10 flex-col items-center justify-center p-16">
        {/* LOGO & TITLE */}
        <div className="my-8  text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-linear-to-br from-slate-800 to-slate-700 shadow-2xl shadow-slate-900/50 mb-6 border border-slate-700/50 animate-bounce">
            <Image alt="logo" src={bg} width={45} />
          </div>
          <h1 className="text-5xl font-black text-white mb-3 drop-shadow-2xl">
            Invoice AI
          </h1>
          <p className="text-slate-300 text-lg font-medium">
            Smart Invoicing AI
          </p>
        </div>
      </div>
    </div>
  );
}
