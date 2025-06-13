import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setLoading(true);
    setError('');
    // Simulate API call
    await new Promise(res => setTimeout(res, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">

      {/* Animated blobs */}
      <motion.span
        className="absolute -top-40 -left-40 w-96 h-96 bg-secondary-400 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.5, 1], rotate: [0, 45, 0] }}
        transition={{ duration: 11, repeat: Infinity, repeatType: 'mirror' }}
      />
      <motion.span
        className="absolute bottom-[-9rem] right-[-9rem] w-[26rem] h-[26rem] bg-primary-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1.1, 0.9, 1.1], rotate: [0, -60, 0] }}
        transition={{ duration: 13, repeat: Infinity, repeatType: 'mirror', delay: 1 }}
      />

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/login" className="inline-flex items-center text-primary-600 hover:text-primary-500 mb-8 font-medium" >
            <ArrowLeft className="h-5 w-5 mr-2" /> Back to Login
          </Link>
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">Forgot Password</h2>
          <p className="text-gray-600">Enter your email and we'll send you a reset link.</p>
          <p className="text-sm text-gray-500 mt-2">Need an account? <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">Register here</Link> or email <a href="mailto:support@example.com" className="underline">support@example.com</a> for help.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          whileHover={{ rotateY: 8, rotateX: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
          {sent ? (
            <div className="text-center space-y-4">
              <Send className="mx-auto h-10 w-10 text-primary-600" />
              <h3 className="text-xl font-semibold text-gray-800">Check your email</h3>
              <p className="text-gray-600 text-sm">We've sent a password reset link to <span className="font-medium">{email}</span>.</p>
              <Link to="/login" className="text-primary-600 hover:text-primary-500 font-medium">Return to Login</Link>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">Create an account</Link>
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Reset Link</span>
                    <Send className="h-5 w-5" />
                  </>
                )}
              </button>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-0">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">Create an account</Link>
                </p>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
