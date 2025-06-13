import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
}

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services: Service[] = [
  {
    id: 'bookkeeping',
    title: 'Bookkeeping & Accounting',
    description: 'Comprehensive bookkeeping services to keep your financial records accurate and up-to-date.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 10,000/month'
  },
  {
    id: 'tax-planning',
    title: 'Tax Planning & Preparation',
    description: 'Strategic tax planning to minimize your tax liability and ensure compliance.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 15,000'
  },
  {
    id: 'financial-reporting',
    title: 'Financial Reporting',
    description: 'Detailed financial reports to help you make informed business decisions.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 8,000/month'
  },
  {
    id: 'payroll',
    title: 'Payroll Management',
    description: 'Complete payroll processing to ensure your employees are paid accurately and on time.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 5,000/month'
  },
  {
    id: 'business-advisory',
    title: 'Business Advisory',
    description: 'Strategic business guidance to help your company grow and succeed.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 20,000/month'
  },
  {
    id: 'audit-assurance',
    title: 'Audit & Assurance',
    description: 'Independent audit services to ensure the accuracy of your financial statements.',
    image: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800',
    price: 'Starting at KSh 50,000'
  }
];

const ServicesModal: React.FC<ServicesModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleServiceSelect = (serviceId: string) => {
    navigate(`/quotation/${serviceId}`);
    onClose();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </motion.div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                duration: 0.5,
                bounce: 0.2
              }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-heading font-bold text-gray-900">
                    Our Services
                  </h3>
                  <button
                    onClick={onClose}
                    className="fixed top-4 right-4 z-50 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                    aria-label="Close modal"
                  >
                    <X className="h-6 w-6 text-gray-600 hover:text-gray-900" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.map((service, index) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.03,
                        backgroundColor: '#f8fafc',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        rotateY: 2,
                        rotateX: 1
                      }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 border-2 border-transparent hover:border-primary-500 relative group perspective-1000"
                      onClick={() => handleServiceSelect(service.id)}
                    >
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:rotate-1"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out"></div>
                        <div className="absolute inset-0 bg-primary-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></div>
                      </div>
                      <div className="p-4 relative z-10">
                        <h4 className="text-lg font-heading font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-all duration-300 ease-out transform group-hover:translate-x-1">
                          {service.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 group-hover:text-gray-800 transition-all duration-500 ease-in-out transform group-hover:translate-x-2">
                          {service.description}
                        </p>
                        <p className="text-primary-600 font-semibold text-sm group-hover:text-primary-700 transition-all duration-400 ease-in-out transform group-hover:translate-x-1">
                          {service.price}
                        </p>
                      </div>
                      <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-all duration-600 ease-in-out"></div>
                      <div className="absolute inset-0 border-2 border-primary-500/0 group-hover:border-primary-500/30 transition-all duration-500 ease-out rounded-lg"></div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/10 group-hover:via-primary-500/5 group-hover:to-primary-500/10 transition-all duration-700 ease-in-out rounded-lg"></div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServicesModal; 