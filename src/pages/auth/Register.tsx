import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    // Redirect to dashboard or login after successful registration
    navigate('/login');
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Gradient Blobs */}
      <motion.span
        className="absolute -top-40 -left-40 w-96 h-96 bg-primary-400 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.span
        className="absolute bottom-[-10rem] right-[-10rem] w-[28rem] h-[28rem] bg-secondary-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1.2, 0.8, 1.2], rotate: [0, -45, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', delay: 2 }}
      />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link
            to="/login"
            className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Login
          </Link>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Create an Account</h2>
          <p className="text-gray-600">Start managing your finances with us today.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ rotateY: 8, rotateX: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your full name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                placeholder="Create a password"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creating account...</span>
                </>
              ) : (
                <>
                  <span>Register</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-0">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
