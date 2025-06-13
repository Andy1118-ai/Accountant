import React from 'react';
import { Link } from 'react-router-dom';
import { Calculator, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-heading font-bold">Wendy Muhoho</span>
                <span className="text-sm text-primary-400 block leading-none">CPA</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Professional accounting services with over 15 years of experience. 
              We help businesses and individuals achieve financial success through 
              expert guidance and innovative solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Resources & Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/services#tax-planning" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Tax Preparation & Planning
                </Link>
              </li>
              <li>
                <Link to="/services#bookkeeping" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Bookkeeping & Accounting
                </Link>
              </li>
              <li>
                <Link to="/services#financial-consulting" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Financial Consulting
                </Link>
              </li>
              <li>
                <Link to="/services#payroll" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Payroll Management
                </Link>
              </li>
              <li>
                <Link to="/services#business-advisory" className="text-gray-300 hover:text-primary-400 transition-colors text-sm">
                  Business Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Business Center, Nairobi, Kenya
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@wendymuhoho.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Wendy Muhoho CPA. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="text-gray-400 hover:text-primary-400 text-sm transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;