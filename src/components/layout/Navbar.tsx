import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calculator, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
    ...(user ? [{ name: 'Reviews', href: '/dashboard/reviews' }] : []),
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsUserMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl shadow-lg"
              >
                <Calculator className="h-6 w-6 text-white" />
              </motion.div>
              <div>
                <span className="text-xl font-heading font-bold text-gray-900">
                  Wendy Muhoho
                </span>
                <span className="text-sm text-primary-600 block leading-none">CPA</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Tab Bar Style */}
          <div className="hidden md:flex items-center">
            <div className="flex bg-white/60 backdrop-blur-lg rounded-full p-1 shadow-lg border border-white/30">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
                    isActive(item.href)
                      ? 'text-white shadow-lg'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-white/50'
                  }`}
                >
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full shadow-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu / Login Button (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 bg-white/60 backdrop-blur-lg rounded-full px-4 py-2 border border-white/30 shadow-lg hover:bg-white/80 transition-all duration-300"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </motion.button>

                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl py-2 z-50 border border-white/30"
                    >
                      <Link
                        to={user.role === 'admin' ? '/admin' : '/dashboard'}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-white/60 hover:text-primary-600 transition-colors rounded-lg mx-2"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-white/60 hover:text-red-600 transition-colors flex items-center space-x-2 rounded-lg mx-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
                >
                  Client Login
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile controls: menu button */}
          <div className="md:hidden flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="bg-white/60 backdrop-blur-lg rounded-full p-2 border border-white/30 shadow-lg"
            >
              {isOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/90 backdrop-blur-xl border-t border-white/20"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to={item.href}
                    className={`block px-3 py-2 text-base font-medium rounded-xl transition-all duration-300 ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-white/60'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <div className="border-t border-white/20 pt-3 mt-3">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-white/60 rounded-xl transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-white/60 rounded-xl transition-all duration-300"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-base font-medium bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl text-center hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    Client Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;