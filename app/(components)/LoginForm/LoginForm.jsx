"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Login } from "../../actions/auth.js";
import { setSession } from "../../actions/session.js";
export default function LoginForm() {
  const router = useRouter();

  // Form states
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Message states
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Handle login submission
  const handleLogin = async () => {
    // Reset messages
    setMessage("");
    setIsError(false);

    // Client-side validation
    if (!email || !email.includes("@")) {
      setMessage("Enter a valid email!");
      setIsError(true);
      return;
    }

    if (!password) {
      setMessage("Enter a password");
      setIsError(true);
      return;
    }

    // Start loading
    setLoading(true);

    try {
      // Call login API
      const userData = await Login(email, password);

      // Check if login was successful
      if (userData.success) {
        // Save session
        await setSession(userData.data);

        // Show success message
        setMessage("Login successful! Redirecting...");
        setIsError(false);

        // Redirect to home after short delay
        setTimeout(() => {
          router.push("/home");
        }, 1000);
      } else {
        // Show error message from API
        setMessage(userData.messages[0] || "Login failed. Please try again.");
        setIsError(true);
      }
    } catch (error) {
      // Handle unexpected errors
      setMessage("Something went wrong. Please try again.");
      setIsError(true);
      console.error("Login error:", error);
    } finally {
      // Stop loading
      setLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {/* HEADER */}
      <header className="flex flex-col items-center gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
            Welcome back
          </h1>
          <p className="text-slate-500 text-sm">
            Enter your credentials to access your account
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <button
          type="button"
          className="group flex justify-center items-center w-full font-medium text-slate-700 p-3 bg-white hover:bg-slate-50 gap-3 transition-all duration-300 border-2 border-slate-200 hover:border-slate-400 rounded shadow-sm hover:shadow-lg hover:scale-[1.02]"
        >
          <FcGoogle size={25} />
          <span className="group-hover:text-slate-900 transition-colors">
            Continue with Google
          </span>
        </button>
      </header>

      {/* DIVIDER */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent"></div>
        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
          Or continue with email
        </span>
        <div className="flex-1 h-px bg-linear-to-r from-transparent via-slate-300 to-transparent"></div>
      </div>

      {/* FORM */}
      <main className="flex flex-col gap-5">
        {/* EMAIL INPUT */}
        <div className="flex flex-col gap-2">
          <label
            htmlFor="email"
            className="font-semibold text-slate-700 text-sm"
          >
            Email Address
          </label>
          <input
            name="email"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={loading}
            className="border-2 border-slate-200 p-3.5 rounded-xl outline-none bg-white/70 backdrop-blur-sm
            hover:border-slate-400 hover:bg-white
            focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300 placeholder:text-slate-400"
            placeholder="name@company.com"
          />
        </div>

        {/* PASSWORD INPUT */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="font-semibold text-slate-700 text-sm"
            >
              Password
            </label>
            <button
              type="button"
              onClick={() => router.push("/forget-password")}
              className="text-slate-600 hover:text-slate-900 text-sm font-semibold hover:underline decoration-2 underline-offset-2 transition-all"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={loading}
              className="border-2 border-slate-200 p-3.5 rounded-xl outline-none bg-white/70 backdrop-blur-sm
              hover:border-slate-400 hover:bg-white
              focus:border-slate-600 focus:ring-4 focus:ring-slate-600/10 focus:bg-white
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 w-full pr-12 placeholder:text-slate-400"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={loading}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-all duration-300 hover:scale-110 disabled:opacity-50"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* MESSAGE DISPLAY */}
        {message && (
          <div
            className={`text-center p-3 rounded-lg transition-all duration-300 ${
              isError
                ? "text-red-700 bg-red-50 border border-red-200"
                : "text-green-700 bg-green-50 border border-green-200"
            }`}
          >
            <p className="text-sm font-medium">{message}</p>
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="flex flex-col gap-4 mt-2">
        {/* LOGIN BUTTON */}
        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="group relative w-full font-bold text-white p-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 bg-size-[200%] hover:bg-right rounded transition-all duration-500 shadow-lg shadow-slate-900/30 hover:shadow-xl hover:shadow-slate-900/40 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden"
        >
          <span className="relative z-10">
            {loading ? "Loading..." : "Login"}
          </span>
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </button>

        {/* SIGN UP LINK */}
        <p className="text-center text-slate-600 text-sm">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => router.push("/sign-up")}
            className="text-slate-800 hover:text-slate-900 font-bold hover:underline decoration-2 underline-offset-2 transition-all"
          >
            Sign up for free
          </button>
        </p>

        {/* COPYRIGHT */}
        <p className="text-center text-slate-400 text-xs mt-2">
          &copy; 2025 Invoice AI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
