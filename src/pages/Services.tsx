 import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ServiceOptionsModal from '../components/ServiceOptionsModal';

interface Service {
  id: number;
  slug: string; // used in routes
  name: string;
  description: string;
  image: string;
}

const services: Service[] = [
  { id: 1, slug: 'bookkeeping', name: 'Bookkeeping & Accounting', description: 'Comprehensive bookkeeping services to keep your financial records accurate and up-to-date.', image: 'https://images.pexels.com/photos/669454/pexels-photo-669454.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 2, slug: 'tax-planning', name: 'Tax Planning & Preparation', description: 'Strategic tax planning to minimize your tax liability and ensure compliance.', image: 'https://images.pexels.com/photos/4386326/pexels-photo-4386326.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 3, slug: 'financial-reporting', name: 'Financial Reporting', description: 'Detailed financial reports to help you make informed business decisions.', image: 'https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 4, slug: 'payroll', name: 'Payroll Management', description: 'Complete payroll processing to ensure your employees are paid accurately and on time.', image: 'https://images.pexels.com/photos/6266305/pexels-photo-6266305.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 5, slug: 'business-advisory', name: 'Business Advisory', description: 'Strategic business guidance to help your company grow and succeed.', image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 6, slug: 'audit-assurance', name: 'Audit & Assurance', description: 'Independent audit services to ensure the accuracy of your financial statements.', image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const Services: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const handleGetStarted = (serviceSlug: string) => {
    setSelectedService(serviceSlug);
    setModalOpen(true);
  };

  return (
    <section className="container mx-auto px-4 py-12 space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold mb-2">Our Services</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We offer a wide range of accounting services tailored to meet the unique needs of your business.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <motion.div
            key={service.id}
            className="relative group rounded-xl overflow-hidden shadow-lg"
            whileHover={{ y: -4 }}
          >
            <img
              src={service.image}
              alt={service.name}
              className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
            <div className="absolute inset-x-0 bottom-0 p-6 text-white">
              <h2 className="text-xl font-semibold mb-2">{service.name}</h2>
              <p className="text-sm text-gray-200 mb-4">{service.description}</p>
              <button
                onClick={() => handleGetStarted(service.slug)}
                className="mt-auto w-full text-center bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-300 text-white py-2 px-4 rounded transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <ServiceOptionsModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        serviceId={selectedService}
      />
    </section>
  );
};

export default Services;