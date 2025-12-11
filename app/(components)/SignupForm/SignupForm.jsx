/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { requestOtp, validateOtop, SignUp } from '../../actions/auth';

export default function SignUpForm() {
  const router = useRouter();
  
  // Form States
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // Status States
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [lastEmailSent, setLastEmailSent] = useState('');
  
  // Loading States
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingSignup, setLoadingSignup] = useState(false);
  
  // Message States
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Validation
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isPasswordValid = password.length >= 8;
  const doPasswordsMatch = password === confirmPassword && password !== '';
  const hasEmailChanged = email !== lastEmailSent;
  const canSendOtp = isEmailValid && (!otpSent || hasEmailChanged) && !emailConfirmed;

  //First Send OTP
  const handleSendOtp = async () => {
    if (!isEmailValid) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setLoadingOtp(true);
    setMessage('');
    
    try {
      const result = await requestOtp(email);
      
      if (result.success) {
        setOtpSent(true);
        setShowOtpInput(true);
        setLastEmailSent(email);
        setMessage(result.message[0]);
        setMessageType('success');
      } else {
        setMessage(result.message[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to send OTP. Please try again.');
      setMessageType('error');
    } finally {
      setLoadingOtp(false);
    }
  };

  // Second Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setMessage('Please enter a valid OTP');
      setMessageType('error');
      return;
    }

    setLoadingVerify(true);
    setMessage('');
    
    try {
      const result = await validateOtop(email, otp);
      
      if (result.success && result.emailConfirmed) {
        setEmailConfirmed(true);
        setMessage(result.message[0]);
        setMessageType('success');
      } else {
        setMessage(result.message[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to verify OTP. Please try again.');
      setMessageType('error');
    } finally {
      setLoadingVerify(false);
    }
  };

  // Finally SignUp
  const handleSignUp = async () => {
    // Validation
    if (!firstName || !lastName) {
      setMessage('Please enter your full name');
      setMessageType('error');
      return;
    }
    if (!emailConfirmed) {
      setMessage('Please verify your email first');
      setMessageType('error');
      return;
    }
    if (!isPasswordValid) {
      setMessage('Password must be at least 8 characters');
      setMessageType('error');
      return;
    }
    if (!doPasswordsMatch) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return;
    }

    setLoadingSignup(true);
    setMessage('');

    const payload = {
      name: `${firstName} ${lastName}`,
      timezoneOffset: new Date().getTimezoneOffset() / -60,
      isActive: true,
      user: {
        email,
        password,
        confirmPassword,
        firstName,
        lastName,
        emailConfirmed
      }
    };

    try {
      const result = await SignUp(payload);
      
      if (result.success) {
        setMessage(result.message[0]);
        setMessageType('success');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(result.message[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to create account. Please try again.');
      setMessageType('error');
    } finally {
      setLoadingSignup(false);
    }
  };

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

      {/* MESSAGE BANNER */}
      {message && (
        <div className={`p-3 rounded-lg border-2 flex items-center gap-2 transition-all duration-300 ${
          messageType === 'success' 
            ? 'bg-green-50 border-green-200 text-green-800' 
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          {messageType === 'success' ? (
            <CheckCircle2 size={16} className="shrink-0" />
          ) : (
            <XCircle size={16} className="shrink-0" />
          )}
          <span className='text-xs font-medium'>{message}</span>
        </div>
      )}

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
              disabled={loadingSignup}
              className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
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
              disabled={loadingSignup}
              className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 placeholder:text-slate-400'
              placeholder='Doe'
            />
          </div>
        </div>

        {/* EMAIL INPUT */}
        <div className='flex flex-col gap-1.5'>
          <label htmlFor="email" className='font-semibold text-slate-700 text-xs'>
            Email {emailConfirmed && <span className='text-green-600'>✓ Verified</span>}
          </label>
          <div className='relative'>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={emailConfirmed || loadingOtp}
              className={`border-2 p-2.5 pr-20 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 w-full placeholder:text-slate-400
              ${emailConfirmed ? 'border-green-300' : 'border-slate-200'}`}
              placeholder='name@company.com'
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!canSendOtp || loadingOtp}
              className='absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded hover:bg-slate-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1'
            >
              {loadingOtp ? (
                <>
                  <Loader2 size={10} className="animate-spin" />
                  Sending...
                </>
              ) : emailConfirmed ? (
                'Verified'
              ) : otpSent && !hasEmailChanged ? (
                'Sent'
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </div>

        {/* OTP INPUT */}
        {showOtpInput && !emailConfirmed && (
          <div className='flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-300'>
            <label htmlFor="otp" className='font-semibold text-slate-700 text-xs'>Enter OTP</label>
            <div className='relative'>
              <input 
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loadingVerify}
                maxLength={6}
                className='border-2 border-slate-200 p-2.5 pr-24 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
                hover:border-slate-400 hover:bg-white
                focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 w-full placeholder:text-slate-400'
                placeholder='Enter 6-digit code'
              />
              <button
                type="button"
                onClick={handleVerifyOtp}
                disabled={!otp || loadingVerify}
                className='absolute right-2 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-[10px] font-bold rounded hover:bg-slate-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1'
              >
                {loadingVerify ? (
                  <>
                    <Loader2 size={10} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </div>
          </div>
        )}

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
                disabled={loadingSignup}
                className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
                hover:border-slate-400 hover:bg-white
                focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                disabled:opacity-50 disabled:cursor-not-allowed
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
            {password && !isPasswordValid && (
              <span className='text-[10px] text-red-500'>Min 8 characters</span>
            )}
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
                disabled={loadingSignup}
                className='border-2 border-slate-200 p-2.5 rounded-lg outline-none bg-white/70 backdrop-blur-sm text-sm
                hover:border-slate-400 hover:bg-white
                focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                disabled:opacity-50 disabled:cursor-not-allowed
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
            {confirmPassword && !doPasswordsMatch && (
              <span className='text-[10px] text-red-500'>Passwords don&apos;t match</span>
            )}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className='flex flex-col gap-3 mt-1'>
        
        {/* CREATE ACCOUNT BUTTON */}
        <button 
          onClick={handleSignUp}
          disabled={!emailConfirmed || !doPasswordsMatch || !isPasswordValid || loadingSignup}
          className='group relative w-full font-bold text-white p-2.5 text-sm bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2'
        >
          {loadingSignup ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              <span className='relative z-10'>Create account</span>
              <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
            </>
          )}
        </button>

        {/* LOGIN LINK */}
        <p className='text-center text-slate-600 text-xs'>
          Already have an account?{' '}
          <button
          onClick={()=>router.push('/login')}
          className='text-slate-800 hover:text-slate-900 font-bold hover:underline decoration-2 underline-offset-2 transition-all'>
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

