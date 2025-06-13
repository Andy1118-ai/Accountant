import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Calculator, ArrowRight, Shield, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ClientLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
        setShake(true);
        setTimeout(() => setShake(false), 600);
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Simple password strength calculation
  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score += 30;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 20;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 30;
    return Math.min(score, 100);
  };

  const strength = getPasswordStrength(formData.password);
  const strengthColor = strength < 40 ? 'bg-red-500' : strength < 70 ? 'bg-yellow-400' : 'bg-green-500';

  const demoCredentials = [
    { role: 'Admin', email: 'admin@wendymuhoho.com', password: 'admin123' },
    { role: 'Client', email: 'client@example.com', password: 'client123' }
  ];

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const blob1X = useTransform(mouseX, [0, window.innerWidth], [-30, 30]);
  const blob1Y = useTransform(mouseY, [0, window.innerHeight], [-30, 30]);
  const blob2X = useTransform(mouseX, [0, window.innerWidth], [40, -40]);
  const blob2Y = useTransform(mouseY, [0, window.innerHeight], [40, -40]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" onMouseMove={handleMouseMove}>
      
      {/* Animated Gradient Blobs */}
      <motion.span
        className="absolute -top-32 -left-32 w-80 h-80 bg-primary-400 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 60, 0] }}
        transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
        style={{ x: blob1X, y: blob1Y }}
      />
      <motion.span
        className="absolute bottom-[-9rem] right-[-9rem] w-[26rem] h-[26rem] bg-secondary-500 opacity-30 rounded-full filter blur-3xl"
        animate={{ scale: [1.2, 0.8, 1.2], rotate: [0, -45, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'mirror', delay: 2 }}
        style={{ x: blob2X, y: blob2Y }}
      />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="inline-flex items-center space-x-2 mb-8">
            <div className="bg-primary-500 p-3 rounded-xl">
              <Calculator className="h-8 w-8 text-white" />
            </div>
            <div className="text-left">
              <span className="text-2xl font-heading font-bold text-gray-900">
                Wendy Muhoho
              </span>
              <span className="text-sm text-primary-600 block leading-none">CPA</span>
            </div>
          </Link>
          
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-600">
            Sign in to access your financial dashboard
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 40, rotateX: 10 }}
          animate={shake ? { opacity:1, y:0, rotateX:0, x:[0,-10,10,-10,10,0]} : { opacity:1, y:0, rotateX:0 }}
          whileHover={{ rotateY: 8, rotateX: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.25)' }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {/* Password strength meter */}
              {formData.password && (
                <div className="mt-2">
                  {/* webhint-disable-next-line no-inline-styles */}
                  {/* webhint-disable-next-line hint-no-inline-styles */}
                  <div className="h-2 w-full bg-gray-200 rounded">
                    {/* Applying dynamic width via inline style for runtime password strength */}
                    <div className={`h-full rounded ${strengthColor}`} style={{ width: `${strength}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password strength: {strength}%</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-500 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative overflow-hidden w-full bg-primary-500 text-white py-3 rounded-lg font-semibold hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 group"
              onClick={(e)=>{
                const btn = e.currentTarget;
                const circle = document.createElement('span');
                const diameter = Math.max(btn.clientWidth, btn.clientHeight);
                const radius = diameter / 2;
                circle.style.width = circle.style.height = `${diameter}px`;
                circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
                circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
                circle.classList.add('ripple');
                const ripple = btn.getElementsByClassName('ripple')[0];
                if (ripple) ripple.remove();
                btn.appendChild(circle);
              }}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                Click to get started
              </Link>
            </p>
          </div>
        </motion.div>

        {/* Demo Credentials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-blue-50/80 backdrop-blur-lg rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">Demo Credentials</h3>
          </div>
          <div className="space-y-3">
            {demoCredentials.map((cred, index) => (
              <div key={index} className="bg-white rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">{cred.role}</span>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p><strong>Email:</strong> {cred.email}</p>
                  <p><strong>Password:</strong> {cred.password}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLogin;