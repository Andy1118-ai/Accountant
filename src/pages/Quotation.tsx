import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Download, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ServiceForms from '../components/ServiceForms';

interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
}

const plans: Record<string, Plan[]> = {
  bookkeeping: [
    {
      id: 'basic',
      name: 'Basic',
      price: 10000,
      features: [
        'Monthly bookkeeping',
        'Bank reconciliation',
        'Basic financial reports',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 15000,
      features: [
        'Everything in Basic',
        'Quarterly tax planning',
        'Priority support',
        'Custom reports'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 25000,
      features: [
        'Everything in Standard',
        'Weekly financial updates',
        'Dedicated accountant',
        '24/7 support'
      ]
    }
  ],
  'tax-planning': [
    {
      id: 'basic',
      name: 'Basic',
      price: 15000,
      features: [
        'Annual tax return',
        'Basic tax planning',
        'KRA compliance check',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 25000,
      features: [
        'Everything in Basic',
        'Quarterly tax planning',
        'Tax optimization',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 40000,
      features: [
        'Everything in Standard',
        'Monthly tax planning',
        'International tax support',
        '24/7 support'
      ]
    }
  ],
  'financial-reporting': [
    {
      id: 'basic',
      name: 'Basic',
      price: 8000,
      features: [
        'Monthly financial statements',
        'Basic cash flow analysis',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 15000,
      features: [
        'Everything in Basic',
        'Weekly financial updates',
        'Custom reports',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 25000,
      features: [
        'Everything in Standard',
        'Real-time financial dashboard',
        'Financial forecasting',
        '24/7 support'
      ]
    }
  ],
  payroll: [
    {
      id: 'basic',
      name: 'Basic',
      price: 5000,
      features: [
        'Monthly payroll processing',
        'Basic tax calculations',
        'Email support'
      ]
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 10000,
      features: [
        'Everything in Basic',
        'Employee benefits management',
        'Custom reports',
        'Priority support'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 20000,
      features: [
        'Everything in Standard',
        'HR management',
        'Employee portal',
        '24/7 support'
      ]
    }
  ]
};

const Quotation = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  // Fallback for unknown service keys
  const serviceKey = serviceId?.toLowerCase() || '';
  const servicePlans = plans[serviceKey as keyof typeof plans] || [];

  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    requirements: '',
    // Service-specific fields will be added dynamically
  });
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const [parent, child] = name.split('.');
      if (!child) {
        // Edge case: checkbox without nested path
        setFormData(prev => ({
          ...prev,
          [name]: checkbox.checked,
        }));
        return;
      }

      setFormData(prev => {
        const parentObj = (prev as Record<string, unknown>)[parent] ?? {};
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [child]: checkbox.checked
          }
        };
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      // Here you would typically send the data to your backend
      // For now, we'll just simulate a successful submission
      alert('Quotation generated successfully!');
      if (user) {
        navigate('/dashboard');
      } else {
        navigate('/auth/login');
      }
    }
  };

  const handleDownloadReceipt = () => {
    // Here you would typically generate and download a PDF receipt
    alert('Receipt downloaded successfully!');
  };

  const handleSendEmail = () => {
    // Here you would typically send the receipt via email
    alert('Receipt sent to your email!');
  };

  if (!serviceId || !servicePlans) {
    return <div>Service not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>

          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-8">
            {step === 1 ? 'Request a Quote' : 'Select a Plan'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="fullName"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      id="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                {/* Service-specific form fields */}
                {serviceId && (
                  <div className="mt-8 pt-8 border-t">
                    <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
                      Service Details
                    </h2>
                    <ServiceForms
                      serviceId={serviceId}
                      formData={formData}
                      handleInputChange={handleInputChange}
                    />
                  </div>
                )}

                <div>
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Requirements
                  </label>
                  <textarea
                    name="requirements"
                    id="requirements"
                    value={formData.requirements}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {servicePlans.map((plan) => (
                  <motion.div
                    key={plan.id}
                    whileHover={{ scale: 1.02 }}
                    className={`border rounded-lg p-6 cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <h3 className="text-xl font-heading font-semibold text-gray-900 mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-2xl font-bold text-primary-600 mb-4">
                      KSh {plan.price.toLocaleString()}
                      <span className="text-sm text-gray-500 font-normal">/month</span>
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <span className="h-2 w-2 bg-primary-500 rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center pt-6">
              {step === 2 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={step === 2 && servicePlans.length > 0 && !selectedPlan}
                className={`ml-auto px-6 py-3 rounded-lg font-semibold text-white bg-primary-500 hover:bg-primary-600 transition-colors flex items-center space-x-2 ${
                  step === 2 && servicePlans.length > 0 && !selectedPlan ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <span>{step === 1 ? 'Next' : 'Generate Quote'}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </form>

          {step === 2 && (servicePlans.length === 0 || selectedPlan) && (
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-xl font-heading font-semibold text-gray-900 mb-4">
                Receipt Options
              </h2>
              <div className="flex space-x-4">
                <button
                  onClick={handleDownloadReceipt}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Receipt</span>
                </button>
                <button
                  onClick={handleSendEmail}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span>Send to Email</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Quotation;