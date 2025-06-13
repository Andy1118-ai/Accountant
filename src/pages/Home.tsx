import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calculator, 
  TrendingUp, 
  Shield, 
  Users, 
  CheckCircle, 
  ArrowRight,
  Star,
  Award,
  Clock,
  FileText,
  BarChart
} from 'lucide-react';
import ServicesModal from '../components/ServicesModal';

const Home = () => {
  const navigate = useNavigate();
  const [isServicesModalOpen, setIsServicesModalOpen] = useState(false);

  const handleScheduleClick = () => {
    navigate('/book');
  };

  const features = [
    {
      icon: Calculator,
      title: 'Expert Accounting',
      description: 'Professional bookkeeping and financial management tailored to your business needs.'
    },
    {
      icon: TrendingUp,
      title: 'Tax Planning',
      description: 'Strategic tax planning to minimize liabilities and maximize your savings.'
    },
    {
      icon: Shield,
      title: 'Compliance Assurance',
      description: 'Stay compliant with all regulations and avoid costly penalties.'
    },
    {
      icon: Users,
      title: 'Business Advisory',
      description: 'Expert guidance to help your business grow and succeed in the market.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'Tech Startup Kenya',
      content: 'Wendy transformed our financial processes. Her expertise saved us thousands in tax optimization.',
      rating: 5
    },
    {
      name: 'Michael Ochieng',
      company: 'Retail Business Owner',
      content: 'Professional, reliable, and always available when we need guidance. Highly recommended!',
      rating: 5
    },
    {
      name: 'Grace Wanjiku',
      company: 'Consulting Firm',
      content: 'The monthly reports are incredibly detailed and help us make better business decisions.',
      rating: 5
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients' },
    { number: '15+', label: 'Years Experience' },
    { number: '99%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <motion.h1 
                  className="text-4xl lg:text-6xl font-heading font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  Your Trusted
                  <span className="text-primary-600 block">Financial Partner</span>
                </motion.h1>
                <motion.p 
                  className="text-xl text-gray-600 mt-6 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Professional accounting services that help you focus on growing your business 
                  while we handle your finances with precision and care.
                </motion.p>
              </div>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <button
                  type="button"
                  onClick={() => setIsServicesModalOpen(true)}
                  className="bg-primary-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-flex items-center justify-center space-x-2 group cursor-pointer relative z-10"
                >
                  <span>Get Started Today</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <Link
                  to="/services"
                  className="border-2 border-primary-500 text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center"
                >
                  Our Services
                </Link>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-6 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="flex items-center space-x-1">
                  <Award className="h-6 w-6 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">CPA Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-6 w-6 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">15+ Years</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-6 w-6 text-primary-500" />
                  <span className="text-sm font-medium text-gray-700">5.0 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10">
                <img
                  src="https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional accountant working"
                  className="rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-secondary-500 text-white p-6 rounded-2xl shadow-lg z-20">
                <FileText className="h-8 w-8 mb-2" />
                <p className="font-semibold">99% Accuracy</p>
                <p className="text-sm opacity-90">Financial Reports</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary-500 text-white p-6 rounded-2xl shadow-lg z-20">
                <TrendingUp className="h-8 w-8 mb-2" />
                <p className="font-semibold">500+ Clients</p>
                <p className="text-sm opacity-90">Trust Our Services</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 right-0 -mt-4 opacity-10">
          <div className="w-72 h-72 bg-primary-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-0 left-0 -mb-4 opacity-10">
          <div className="w-96 h-96 bg-secondary-500 rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive accounting solutions that help businesses thrive 
              in today's competitive marketplace.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="bg-primary-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-500 transition-colors">
                  <feature.icon className="h-8 w-8 text-primary-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-8 rounded-2xl relative"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Join hundreds of businesses that trust us with their financial success. 
              Get started with a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/book'}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Schedule Free Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                to="/pricing"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors inline-flex items-center justify-center"
              >
                View Pricing Plans
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Modal */}
      <ServicesModal 
        isOpen={isServicesModalOpen}
        onClose={() => setIsServicesModalOpen(false)}
      />
    </div>
  );
};

export default Home;