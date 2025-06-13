import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Search,
  Tag,
  TrendingUp,
  Calculator,
  Shield,
  FileText
} from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tax Planning', 'Business Finance', 'Compliance', 'Industry News'];

  const blogPosts = [
    {
      id: 1,
      title: '2024 Tax Changes Every Business Owner Should Know',
      excerpt: 'Stay ahead of the latest tax regulations and understand how they impact your business operations and planning strategies.',
      category: 'Tax Planning',
      author: 'Wendy Muhoho',
      date: '2024-03-15',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/6863332/pexels-photo-6863332.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      icon: TrendingUp
    },
    {
      id: 2,
      title: 'The Complete Guide to Digital Bookkeeping for Small Businesses',
      excerpt: 'Transform your bookkeeping processes with digital solutions that save time, reduce errors, and provide better insights.',
      category: 'Business Finance',
      author: 'Wendy Muhoho',
      date: '2024-03-10',
      readTime: '12 min read',
      image: 'https://images.pexels.com/photos/7735681/pexels-photo-7735681.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      icon: Calculator
    },
    {
      id: 3,
      title: 'Understanding KRA Compliance Requirements for 2024',
      excerpt: 'Navigate the complex landscape of KRA compliance with our comprehensive guide to avoid penalties and maintain good standing.',
      category: 'Compliance',
      author: 'Wendy Muhoho',
      date: '2024-03-05',
      readTime: '10 min read',
      image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      icon: Shield
    },
    {
      id: 4,
      title: 'Cash Flow Management: The Lifeline of Your Business',
      excerpt: 'Learn essential strategies for maintaining healthy cash flow and avoiding the common pitfalls that can sink businesses.',
      category: 'Business Finance',
      author: 'Wendy Muhoho',
      date: '2024-02-28',
      readTime: '15 min read',
      image: 'https://images.pexels.com/photos/7821926/pexels-photo-7821926.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      icon: TrendingUp
    },
    {
      id: 5,
      title: 'Financial Planning for Startups: A Step-by-Step Guide',
      excerpt: 'Essential financial planning strategies every startup needs to know to build a solid foundation for growth.',
      category: 'Business Finance',
      author: 'Wendy Muhoho',
      date: '2024-02-20',
      readTime: '11 min read',
      image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      icon: Calculator
    },
    {
      id: 6,
      title: 'Year-End Financial Checklist for Businesses',
      excerpt: 'Ensure your business is prepared for year-end with this comprehensive checklist of essential financial tasks.',
      category: 'Tax Planning',
      author: 'Wendy Muhoho',
      date: '2024-02-15',
      readTime: '9 min read',
      image: 'https://images.pexels.com/photos/7821513/pexels-photo-7821513.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: false,
      icon: FileText
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
              Financial <span className="text-primary-600">Insights</span> & Resources
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Stay informed with the latest trends, tips, and strategies in accounting, 
              tax planning, and business finance. Expert insights to help your business thrive.
            </p>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              {/* Accessible label for category filter */}
              <label htmlFor="categoryFilter" className="sr-only">Category</label>
              <select
                id="categoryFilter"
                aria-label="Filter by category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
                Featured Articles
              </h2>
              <p className="text-gray-600">Don't miss these important insights</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white bg-opacity-90 p-2 rounded-full">
                        <post.icon className="h-5 w-5 text-primary-600" />
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Tag className="h-3 w-3" />
                        <span>{post.category}</span>
                      </span>
                      <div className="flex items-center text-gray-500 text-sm space-x-4">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(post.date)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <h3 className="text-2xl font-heading font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <button className="text-primary-600 font-semibold flex items-center space-x-2 hover:text-primary-700 transition-colors">
                        <span>Read More</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Latest Articles
            </h2>
            <p className="text-gray-600">Stay updated with our latest insights</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-white bg-opacity-90 p-2 rounded-full">
                      <post.icon className="h-4 w-4 text-primary-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="bg-primary-100 text-primary-600 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Tag className="h-3 w-3" />
                      <span>{post.category}</span>
                    </span>
                    <div className="text-gray-500 text-xs flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <button className="text-primary-600 text-sm font-semibold flex items-center space-x-1 hover:text-primary-700 transition-colors">
                      <span>Read</span>
                      <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
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
              Stay Updated
            </h2>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss important financial insights, 
              tax updates, and business tips that can help your company succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                <span>Subscribe</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm opacity-75">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;