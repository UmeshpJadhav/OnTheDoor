import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const validatePasswords = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate passwords
    if (!validatePasswords()) return;
    
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/user/register', {
        name,
        email,
        password
      });

      if (response.data) {
        // Store the token if your backend sends one
        localStorage.setItem('token', response.data.token);
        
        // Redirect to login or dashboard
        window.location.href = '/login';
      }
    } catch (error: any) {
      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 400:
            alert('Invalid input data');
            break;
          case 409:
            alert('Email already exists');
            break;
          default:
            alert('An error occurred during signup');
        }
      } else {
        alert('Network error occurred');
      }
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      {/* Background with gradient and pattern */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-800 opacity-80"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542838132-92c53300491e')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>

      {/* Animated shapes */}
      <motion.div 
        className="absolute top-20 left-20 w-64 h-64 rounded-full bg-green-400 opacity-10 z-0"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 20, 0],
          y: [0, -20, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-green-600 opacity-10 z-0"
        animate={{ 
          scale: [1, 1.3, 1],
          x: [0, -20, 0],
          y: [0, 20, 0],
        }}
        transition={{ 
          repeat: Infinity,
          duration: 10,
          ease: "easeInOut"
        }}
      />

      {/* Signup Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-2xl shadow-xl max-w-md w-full mx-4"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-green-600"
          >
            OnTheDoor
          </motion.div>
        </div>

        {/* Welcome Text */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600">Sign up to start shopping</p>
        </motion.div>

        {/* Google Login Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            setIsGoogleLoading(true);
            window.location.href = "http://localhost:3000/auth/google";
          }}
          disabled={isGoogleLoading}
          className={`flex items-center justify-center w-full bg-white border border-gray-300 text-gray-800 font-medium py-3 px-4 rounded-xl hover:bg-gray-50 transition duration-300 shadow-sm mb-6 ${
            isGoogleLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isGoogleLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <div className="text-xl mr-3 text-red-500">
              <FaGoogle />
            </div>
          )}
          {isGoogleLoading ? 'Connecting to Google...' : 'Sign up with Google'}
        </motion.button>

        {/* Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="relative my-6"
        >
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">or continue with email</span>
          </div>
        </motion.div>

        {/* Signup Form */}
        <motion.form 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaUser />
              </div>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>
          </div>
          
          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaLock />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  if (confirmPassword) validatePasswords();
                }}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                required
                minLength={8}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters</p>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-6">
            <label className="flex items-start">
              <input
                type="checkbox"
                className="mt-1 form-checkbox text-green-600 rounded focus:ring-green-500"
                required
              />
              <span className="ml-2 text-sm text-gray-600">
                I agree to the <a href="/terms" className="text-green-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>
              </span>
            </label>
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className={`w-full bg-green-600 text-white font-medium py-3 px-4 rounded-xl hover:bg-green-700 transition duration-300 shadow-md flex items-center justify-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Creating account...' : 'Create Account'}
          </motion.button>
        </motion.form>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-sm text-gray-600"
        >
          <p>Already have an account? <Link to="/login" className="text-green-600 font-medium hover:underline">Sign in</Link></p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp; 