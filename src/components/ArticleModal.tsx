import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Tag } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
}

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, article }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!article) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Generate article content based on title and category
  const generateContent = (article: Article) => {
    const sections = [
      {
        heading: "Introduction",
        content: `${article.excerpt} In this comprehensive guide, we'll explore the key aspects and provide you with actionable insights that can help transform your approach to ${article.category.toLowerCase()}.`
      },
      {
        heading: "Key Considerations",
        content: "When approaching this topic, it's essential to understand the fundamental principles that drive success. Our experience working with hundreds of clients has shown that attention to detail and strategic planning are crucial components."
      },
      {
        heading: "Best Practices",
        content: "Based on industry standards and our professional expertise, we recommend following these proven methodologies. These practices have been refined over years of practical application and continue to deliver exceptional results for our clients."
      },
      {
        heading: "Implementation Strategy",
        content: "The key to successful implementation lies in taking a systematic approach. Start with a thorough assessment of your current situation, identify areas for improvement, and develop a timeline that allows for proper execution and monitoring."
      },
      {
        heading: "Common Challenges",
        content: "While implementing these strategies, you may encounter various challenges. The most common issues include resource allocation, timing constraints, and regulatory compliance. However, with proper planning and professional guidance, these obstacles can be effectively managed."
      },
      {
        heading: "Conclusion",
        content: "Success in this area requires dedication, proper planning, and often professional guidance. At Wendy Muhoho CPA, we're committed to helping our clients navigate these complexities and achieve their financial goals. Contact us today to learn how we can support your journey."
      }
    ];

    return sections;
  };

  const articleSections = generateContent(article);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 overflow-y-auto"
          onClick={handleBackdropClick}
        >
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 transition-opacity bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

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
              className="inline-block align-bottom bg-white/95 backdrop-blur-xl rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-white/30"
            >
              {/* Header */}
              <div className="relative">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-md rounded-full p-2 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 border border-white/30"
                  aria-label="Close modal"
                >
                  <X className="h-6 w-6 text-white" />
                </button>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center space-x-4 mb-2">
                    <span className="bg-primary-500/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 border border-white/20">
                      <Tag className="h-3 w-3" />
                      <span>{article.category}</span>
                    </span>
                    <div className="flex items-center text-white/90 text-sm space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                  <h1 className="text-3xl font-heading font-bold mb-2 text-shadow-lg">
                    {article.title}
                  </h1>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
                {/* Author Info */}
                <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-full p-3">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{article.author}</p>
                    <p className="text-sm text-gray-600">Certified Public Accountant</p>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  {articleSections.map((section, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="mb-8"
                    >
                      <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500/20">
                        {section.heading}
                      </h2>
                      <p className="text-gray-700 leading-relaxed text-lg mb-4 text-justify">
                        {section.content}
                      </p>
                      
                      {/* Add some visual elements for better document-like appearance */}
                      {index === 1 && (
                        <div className="bg-primary-50 border-l-4 border-primary-500 p-4 my-6 rounded-r-lg">
                          <p className="text-primary-800 font-medium italic">
                            "Professional financial management is not just about numbers—it's about creating a foundation for sustainable business growth and success."
                          </p>
                        </div>
                      )}
                      
                      {index === 3 && (
                        <div className="bg-secondary-50 rounded-xl p-6 my-6 border border-secondary-200">
                          <h3 className="text-lg font-semibold text-secondary-800 mb-3">Quick Tip</h3>
                          <p className="text-secondary-700">
                            Always maintain detailed records and regularly review your financial position. This practice will help you make informed decisions and identify opportunities for improvement.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-200"
                >
                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-3">
                    Need Professional Assistance?
                  </h3>
                  <p className="text-gray-700 mb-4">
                    Our team of experienced professionals is ready to help you implement these strategies and achieve your financial goals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg"
                    >
                      Schedule Consultation
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all duration-300"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArticleModal;