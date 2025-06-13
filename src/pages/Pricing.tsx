import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Star, ArrowRight, Calculator, TrendingUp } from 'lucide-react';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: 'Basic',
      icon: Calculator,
      popular: false,
      monthlyPrice: 15000,
      annualPrice: 150000,
      description: 'Perfect for small businesses just getting started',
      features: [
        'Basic Bookkeeping',
        'Monthly Financial Statements',
        'Annual Tax Returns',
        'Email Support',
        'Bank Reconciliation',
        'Expense Tracking'
      ],
      notIncluded: [
        'Payroll Services',
        'Tax Planning',
        'Phone Support',
        'Custom Reports'
      ]
    },
    {
      name: 'Standard',
      icon: TrendingUp,
      popular: true,
      monthlyPrice: 25000,
      annualPrice: 250000,
      description: 'Ideal for growing businesses with moderate complexity',
      features: [
        'Full Bookkeeping',
        'Quarterly Tax Planning',
        'Monthly Advisory Calls',
        'Priority Email Support',
        'Payroll (up to 10 employees)',
        'Financial Reporting',
        'Budget Planning',
        'Phone Support'
      ],
      notIncluded: [
        'Custom Reports',
        '24/7 Support'
      ]
    },
    {
      name: 'Premium',
      icon: TrendingUp,
      popular: false,
      monthlyPrice: 45000,
      annualPrice: 450000,
      description: 'Comprehensive solution for established businesses',
      features: [
        'Complete Financial Management',
        'Strategic Planning Sessions',
        'Unlimited Advisory Calls',
        '24/7 Priority Support',
        'Custom Financial Reports',
        'Full Payroll Service',
        'Tax Optimization',
        'Dedicated Account Manager',
        'Monthly Business Reviews',
        'Cash Flow Forecasting'
      ],
      notIncluded: []
    }
  ];

  const addOns = [
    {
      name: 'Additional Payroll Users',
      price: 500,
      description: 'Per employee beyond included limit'
    },
    {
      name: 'Custom Report Creation',
      price: 5000,
      description: 'One-time setup fee for custom reports'
    },
    {
      name: 'Audit Support',
      price: 15000,
      description: 'Additional support during audits'
    },
    {
      name: 'Training Sessions',
      price: 8000,
      description: 'Per hour for staff training on financial systems'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-6">
              Simple, <span className="text-primary-600">Transparent</span> Pricing
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Choose the perfect plan for your business. All plans include our core 
              accounting services with no hidden fees.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-primary-600' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                aria-label="Toggle billing period"
                title="Toggle billing period between monthly and annual"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-secondary-800' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${isAnnual ? 'text-secondary-800' : 'text-gray-500'}`}>
                Annual
              </span>
              {isAnnual && (
                <span className="bg-secondary-100 text-secondary-600 px-2 py-1 rounded-full text-xs font-medium">
                  Save 17%
                </span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative bg-white rounded-2xl shadow-lg p-8 ${
                  plan.popular 
                    ? (isAnnual ? 'border-2 border-secondary-800 transform scale-105 z-10' : 'border-2 border-primary-500 transform scale-105 z-10') 
                    : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${isAnnual ? 'bg-secondary-800' : 'bg-primary-500'} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1`}>
                      <Star className="h-4 w-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    plan.popular ? (isAnnual ? 'bg-secondary-800' : 'bg-primary-500') : (isAnnual ? 'bg-secondary-100' : 'bg-primary-100')
                  }`}>
                    <plan.icon className={`h-8 w-8 ${
                      plan.popular ? 'text-white' : (isAnnual ? 'text-secondary-600' : 'text-primary-600')
                    }`} />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-4xl font-bold text-gray-900">
                      {formatPrice(isAnnual ? plan.annualPrice / 12 : plan.monthlyPrice)}
                      <span className="text-lg font-normal text-gray-500">/month</span>
                    </div>
                    {isAnnual && (
                      <div className="text-sm text-gray-500">
                        {formatPrice(plan.annualPrice)} billed annually
                      </div>
                    )}
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <CheckCircle className={`h-5 w-5 ${isAnnual ? 'text-secondary-800' : 'text-primary-500'} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3 opacity-50">
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2 ${
                    plan.popular 
                      ? (isAnnual ? 'bg-secondary-800 text-white hover:bg-secondary-900' : 'bg-primary-500 text-white hover:bg-primary-600') 
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
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
              Optional Add-ons
            </h2>
            <p className="text-xl text-gray-600">
              Enhance your plan with additional services as your business grows
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {addOns.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
                  {addon.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{addon.description}</p>
                <div className="text-2xl font-bold text-primary-600">
                  {formatPrice(addon.price)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: 'Can I change my plan at any time?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.'
              },
              {
                question: 'What payment methods do you accept?',
                answer: 'We accept bank transfers, M-Pesa, and major credit cards. Annual plans can be paid via bank transfer with special discounts.'
              },
              {
                question: 'Is there a setup fee?',
                answer: 'No, there are no setup fees. We include onboarding and initial setup as part of your first month.'
              },
              {
                question: 'What if I need services not included in my plan?',
                answer: 'We offer flexible add-on services that can be added to any plan. Contact us to discuss your specific needs.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer bg-white hover:bg-gray-50 transition-colors">
                    <h3 className="text-lg font-heading font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <span className="ml-6 flex-shrink-0">
                      <svg
                        className="h-6 w-6 transform group-open:rotate-180 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <h2 className="text-3xl lg:text-4xl font-heading font-bold">
              Still Have Questions?
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Schedule a free consultation to discuss your specific needs and 
              find the perfect plan for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/book'}
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Schedule Free Consultation</span>
                <ArrowRight className="h-5 w-5" />
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
                Contact Sales Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;