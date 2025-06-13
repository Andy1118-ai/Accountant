 import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ServiceOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string | null;
}

const options = [
  {
    id: 'quote',
    title: 'Get a Quotation',
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c443afa?auto=format&fit=crop&w=800&q=80',
    route: (serviceId: string) => `/quotation/${serviceId}`,
  },
  {
    id: 'schedule',
    title: 'Schedule Appointment',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    route: (serviceId: string) => `/booking/${serviceId}`,
  },
];

const ServiceOptionsModal: React.FC<ServiceOptionsModalProps> = ({ isOpen, onClose, serviceId }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSelect = (routeBuilder: (id: string) => string) => {
    if (!serviceId) return;
    navigate(routeBuilder(serviceId));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={(e) => e.currentTarget === e.target && onClose()}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.6, bounce: 0.25 }}
            className="relative w-full max-w-xl rounded-3xl bg-white/30 backdrop-blur-lg p-8 shadow-2xl ring-1 ring-white/10"
          >
            <button
              aria-label="Close modal"
              title="Close modal"
              className="absolute right-4 top-4 rounded-full bg-white/40 backdrop-blur p-2 hover:bg-white/60 transition"
              onClick={onClose}
            >
              <X className="h-5 w-5 text-gray-700" />
              <span className="sr-only">Close</span>
            </button>
            <h3 className="mb-8 text-3xl font-bold text-center text-white drop-shadow-lg">Select an Option</h3>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {options.map((opt) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  key={opt.id}
                  title={opt.title}
                  className="group relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-lg ring-1 ring-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-400"
                  aria-label={opt.title}
                  onClick={() => handleSelect(opt.route)}
                >
                  <img
                    src={opt.image}
                    alt={opt.title}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-5 text-xl font-semibold text-white drop-shadow flex items-center justify-center">
                    {opt.title}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceOptionsModal;