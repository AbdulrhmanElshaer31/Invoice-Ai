"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, Mail, Lock } from 'lucide-react';
import { resetPswdOtp, validatePswdOtp, resetPassword } from '../actions/auth';

export default function ForgetPasswordForm() {
  const router = useRouter();
  
  // Form States
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Status States
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showPasswordInputs, setShowPasswordInputs] = useState(false);
  const [lastEmailSent, setLastEmailSent] = useState('');
  
  // Loading States
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingReset, setLoadingReset] = useState(false);
  
  // Message States
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Validation
  const isEmailValid = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  const isPasswordValid = newPassword.length >= 8;
  const doPasswordsMatch = newPassword === confirmPassword && newPassword !== '';
  const hasEmailChanged = email !== lastEmailSent;
  const canSendOtp = isEmailValid && (!otpSent || hasEmailChanged);

  // fist: Send OTP
  const handleSendOtp = async () => {
    if (!isEmailValid) {
      setMessage('Please enter a valid email address');
      setMessageType('error');
      return;
    }

    setLoadingOtp(true);
    setMessage('');
    
    try {
      const result = await resetPswdOtp(email);
      
      if (result.success) {
        setOtpSent(true);
        setShowOtpInput(true);
        setLastEmailSent(email);
        setMessage(result.messages[0]);
        setMessageType('success');
      } else {
        setMessage(result.messages[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to send OTP. Please try again.');
      setMessageType(`Error: ${error}`);
    } finally {
      setLoadingOtp(false);
    }
  };

  // second: Verify OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      setMessage('Please enter a valid OTP');
      setMessageType('error');
      return;
    }

    setLoadingVerify(true);
    setMessage('');
    
    try {
      const result = await validatePswdOtp(email, otp);
      
      if (result.success) {
        setOtpVerified(true);
        setShowPasswordInputs(true);
        setMessage(result.messages[0]);
        setMessageType('success');
      } else {
        setMessage(result.messages[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to verify OTP. Please try again.');
      setMessageType(`Error : ${error}`);
    } finally {
      setLoadingVerify(false);
    }
  };

  // finally: Reset Password
  const handleResetPassword = async () => {
    // Validation
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

    setLoadingReset(true);
    setMessage('');

    const payload = {
        "username":email,
        "newPassword":newPassword,
        "confirmpassword":confirmPassword
    };

    try {
      const result = await resetPassword(payload);
      
      if (result.success) {
        setMessage(result.messages[0]);
        setMessageType('success');
        
        // Redirect to login page after 2 seconds
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setMessage(result.messages[0]);
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to reset password. Please try again.');
      setMessageType(`Error : ${error}`);
    } finally {
      setLoadingReset(false);
    }
  };

  return (
    <div className='w-full flex flex-col gap-6'>
      
      {/* HEADER */}
      <header className='flex flex-col items-center gap-5'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2'>
            Forgot Password?
          </h1>
          <p className='text-slate-500 text-sm'>
            {!otpSent && 'Enter your email address and we\'ll send you a verification code'}
            {otpSent && !otpVerified && 'Enter the verification code sent to your email'}
            {otpVerified && 'Create your new password'}
          </p>
        </div>
      </header>

      {/* MESSAGE BANNER */}
      {message && (
        <div className={`p-3 rounded border-2 flex items-center gap-2 transition-all duration-300 ${
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
      <main className='flex flex-col gap-5'>
        
        {/* EMAIL INPUT */}
        <div className='flex flex-col gap-2'>
          <label htmlFor="email" className='font-semibold text-slate-700 text-sm flex items-center gap-2'>
            <Mail size={16} />
            Email Address
            {otpVerified && <span className='text-green-600 text-xs'>✓ Verified</span>}
          </label>
          <div className='relative'>
            <input 
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpVerified || loadingOtp}
              className={`border-2 p-3.5 pr-20 rounded  outline-none bg-white/70 backdrop-blur-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 w-full placeholder:text-slate-400
              ${otpVerified ? 'border-green-300' : 'border-slate-200'}`}
              placeholder='name@company.com'
            />
            {!otpVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!canSendOtp || loadingOtp}
                className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1'
              >
                {loadingOtp ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Sending...
                  </>
                ) : otpSent && !hasEmailChanged ? (
                  'Sent'
                ) : (
                  'Send Code'
                )}
              </button>
            )}
          </div>
        </div>

        {/* OTP INPUT */}
        {showOtpInput && !otpVerified && (
          <div className='flex flex-col gap-2 animate-in fade-in slide-in-from-top-2 duration-300'>
            <label htmlFor="otp" className='font-semibold text-slate-700 text-sm flex items-center gap-2'>
              <Lock size={16} />
              Verification Code
            </label>
            <div className='relative'>
              <input 
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loadingVerify}
                maxLength={6}
                className='border-2 border-slate-200 p-3.5 pr-24 rounded outline-none bg-white/70 backdrop-blur-sm
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
                className='absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-slate-900 text-white text-xs font-bold rounded hover:bg-slate-800 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-1'
              >
                {loadingVerify ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify'
                )}
              </button>
            </div>
          </div>
        )}

        {/* PASSWORD INPUTS */}
        {showPasswordInputs && (
          <div className='flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-300'>
            {/* NEW PASSWORD */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="newPassword" className='font-semibold text-slate-700 text-sm'>New Password</label>
              <div className='relative'>
                <input 
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loadingReset}
                  className='border-2 border-slate-200 p-3.5 rounded outline-none bg-white/70 backdrop-blur-sm
                  hover:border-slate-400 hover:bg-white
                  focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 w-full pr-11 placeholder:text-slate-400'
                  placeholder='••••••••'
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 hover:scale-110'
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {newPassword && !isPasswordValid && (
                <span className='text-xs text-red-500'>Password must be at least 8 characters</span>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="confirmPassword" className='font-semibold text-slate-700 text-sm'>Confirm New Password</label>
              <div className='relative'>
                <input 
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loadingReset}
                  className='border-2 border-slate-200 p-3.5 rounded outline-none bg-white/70 backdrop-blur-sm
                  hover:border-slate-400 hover:bg-white
                  focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-300 w-full pr-11 placeholder:text-slate-400'
                  placeholder='••••••••'
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 hover:scale-110'
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirmPassword && !doPasswordsMatch && (
                <span className='text-xs text-red-500'>Passwords don&apos;t match</span>
              )}
            </div>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className='flex flex-col gap-4 mt-2'>
        
        {/* ACTION BUTTON */}
        {!showPasswordInputs ? (
          <button 
            onClick={handleSendOtp}
            disabled={!canSendOtp || loadingOtp}
            className='group relative w-full font-bold text-white p-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2'
          >
            {loadingOtp ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending Code...
              </>
            ) : (
              <>
                <span className='relative z-10'>Send Code</span>
                <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              </>
            )}
          </button>
        ) : (
          <button 
            onClick={handleResetPassword}
            disabled={!doPasswordsMatch || !isPasswordValid || loadingReset}
            className='group relative w-full font-bold text-white p-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2'
          >
            {loadingReset ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Resetting Password...
              </>
            ) : (
              <>
                <span className='relative z-10'>Reset Password</span>
                <div className='absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
              </>
            )}
          </button>
        )}

        {/* BACK TO LOGIN LINK */}
        <p className='text-center text-slate-600 text-sm'>
          Remember your password?{' '}
          <button 
            onClick={() => router.push('/login')}
            className='text-slate-800 hover:text-slate-900 font-bold hover:underline decoration-2 underline-offset-2 transition-all'
          >
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