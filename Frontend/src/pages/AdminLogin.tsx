import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Log the request details for debugging
      console.log('Attempting to login with:', { email });

      const response = await axios.post('http://localhost:3000/admin/login', {
        email,
        password
      }, {
        withCredentials: true,
        timeout: 5000 // 5 seconds timeout
      });

      console.log('Login response:', response.data);

      if (response.data) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', 'admin');
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error('Full error:', error);
      
      if (error.code === 'ERR_NETWORK') {
        setError('Unable to connect to the server. Please check if the server is running.');
      } else if (error.response) {
        switch (error.response.status) {
          case 400:
            setError('Invalid email or password');
            break;
          case 401:
            setError('Unauthorized access');
            break;
          case 404:
            setError('Admin not found');
            break;
          default:
            setError('An error occurred during login');
        }
      } else {
        setError('Network error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        
        {/* Show error message if exists */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition duration-300 flex items-center justify-center ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
