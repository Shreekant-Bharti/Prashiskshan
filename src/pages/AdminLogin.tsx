import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Shield, Eye, EyeOff, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const AdminLogin = () => {
  console.log('🔍 AdminLogin: Component mounted and loaded');
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Debug credentials
  const ADMIN_CREDENTIALS = {
    email: 'admin@campus.com',
    password: 'Admin@123'
  };

  useEffect(() => {
    console.log('🔍 AdminLogin: Checking if already logged in...');
    
    // Check if already logged in
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (isLoggedIn === 'true') {
      console.log('✅ Admin already logged in, redirecting to dashboard');
      navigate('/admin/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('🔐 AdminLogin: Login attempt', {
      inputEmail: email,
      inputPassword: password ? '[PROVIDED]' : '[MISSING]',
      expectedEmail: ADMIN_CREDENTIALS.email,
      timestamp: new Date().toISOString()
    });

    // Simulate API call delay
    setTimeout(() => {
      if (email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        console.log('✅ AdminLogin: Credentials valid, setting session');
        
        // Set admin session
        localStorage.setItem('isAdminLoggedIn', 'true');
        localStorage.setItem('adminEmail', email);
        localStorage.setItem('adminLoginTime', new Date().toISOString());
        
        console.log('✅ AdminLogin: Session stored, redirecting to dashboard');
        toast.success('🎉 Welcome back, Admin!');
        
        // Navigate to dashboard
        navigate('/admin/dashboard');
      } else {
        console.log('❌ AdminLogin: Invalid credentials');
        toast.error('❌ Invalid credentials. Please check your email and password.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Debug indicator */}
      <h1 className="absolute top-4 left-4 text-sm font-mono text-violet-600 bg-white px-3 py-1 rounded-full shadow">
        🛡️ AdminLogin Loaded
      </h1>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-violet-100">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Shield className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800">Admin Portal</h2>
            <p className="text-gray-600 mt-2">Campus2Career - Prashiskshan</p>
          </div>

          {/* Demo Credentials Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-violet-50 border border-violet-200 rounded-lg p-4 mb-6"
          >
            <h3 className="text-sm font-semibold text-violet-800 mb-2">Demo Credentials</h3>
            <div className="text-sm text-violet-700">
              <div>📧 Email: <code className="bg-white px-1 rounded">admin@campus.com</code></div>
              <div>🔑 Password: <code className="bg-white px-1 rounded">Admin@123</code></div>
            </div>
          </motion.div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200"
                placeholder="Enter your email"
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent transition duration-200"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold 
                       hover:from-violet-600 hover:to-purple-700 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 
                       disabled:opacity-50 disabled:cursor-not-allowed transform transition duration-200 
                       hover:scale-105 active:scale-95 shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Logging in...
                </div>
              ) : (
                'Login to Dashboard'
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-500">
              Campus2Career - Internship Management System
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;