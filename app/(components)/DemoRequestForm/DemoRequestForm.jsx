"use client";
import { useState } from "react";
import demoRequest from "../../actions/demoRequest";

export default function DemoRequestForm() {
  // Form states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+20');
  const [mobileNumber, setMobileNumber] = useState('');
  const [message, setMessage] = useState('');
  const [conMethod, setConMethod] = useState('Email');
  
  // Component states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Country codes
  const countryCodes = [
    { code: '+20', flag: '🇪🇬', name: 'Egypt' },
    { code: '+1', flag: '🇺🇸', name: 'USA' },
    { code: '+44', flag: '🇬🇧', name: 'UK' },
    { code: '+971', flag: '🇦🇪', name: 'UAE' },
    { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
    { code: '+974', flag: '🇶🇦', name: 'Qatar' },
    { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
    { code: '+968', flag: '🇴🇲', name: 'Oman' },
    { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
    { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  ];

  const handleSubmit = async () => {
    // Validation
    if (!firstName || !lastName || !email || !mobileNumber || !message) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    const payload = {
      fullName: `${firstName} ${lastName}`,
      email,
      mobileNumber: `${countryCode}${mobileNumber}`,
      message,
      favoritConnectionMethod: conMethod
    };

    try {
      const result = await demoRequest(payload);
      
      if (result.success) {
        setIsSuccess(true);
      } else {
        setErrorMessage(result.messages[0] || 'Failed to send request');
      }
    } catch (err) {
      setErrorMessage(`Connection error. Please try again. ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success Screen
  if (isSuccess) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-teal-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Demo Request Received!</h2>
          
          <p className="text-gray-600 mb-6">
            Our team will contact you within 24 hours to schedule your demo.
          </p>
          
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-teal-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">We&apos;ll be in touch soon</span>
            </div>
          </div>
          
          <button
            onClick={() => setIsSuccess(false)}
            className="text-teal-600 hover:text-teal-700 font-medium transition"
          >
            Submit another request
          </button>
        </div>
      </div>
    );
  }

  // Form Screen
  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Request a Demo</h2>
        <p className="text-gray-600 text-sm sm:text-base">Fill out the form and we&apos;ll get back to you shortly</p>
      </div>

      <div className="space-y-4">
        {/* Name Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="Doe"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address *
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
            placeholder="name@company.com"
          />
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mobile Number *
          </label>
          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="w-28 px-2 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition cursor-pointer bg-white"
            >
              {countryCodes.map((country) => (
                <option key={country.code} value={country.code}>
                  {country.flag} {country.code}
                </option>
              ))}
            </select>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
              placeholder="1234567890"
            />
          </div>
        </div>

        {/* Contact Method */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Contact Method *
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setConMethod('Email')}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${
                conMethod === 'Email'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📧 Email
            </button>
            <button
              type="button"
              onClick={() => setConMethod('Phone')}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${
                conMethod === 'Phone'
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📱 Phone
            </button>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message *
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition resize-none"
            placeholder="Tell us about your requirements..."
          />
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300 transition transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Request Demo'
          )}
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        © 2025 Invoice AI. All rights reserved.
      </p>
    </div>
  );
}

