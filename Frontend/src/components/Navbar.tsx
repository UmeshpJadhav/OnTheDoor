import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <span className="text-xl md:text-2xl font-bold text-green-600">OnTheDoor</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-green-600 transition-colors">Home</a>
            <a href="/products" className="text-gray-700 hover:text-green-600 transition-colors">Products</a>
            <a href="/categories" className="text-gray-700 hover:text-green-600 transition-colors">Categories</a>
            <a href="/offers" className="text-gray-700 hover:text-green-600 transition-colors">Offers</a>
            <a href="/contact" className="text-gray-700 hover:text-green-600 transition-colors">Contact</a>
          </div>

          {/* Search, Cart, and User Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar - Hidden on mobile */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative hidden md:block"
            >
              <input
                type="text"
                placeholder="Search products..."
                className="w-64 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch />
              </div>
            </motion.div>

            {/* Mobile Search Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
            >
              <div className="text-xl text-gray-700">
                <FaSearch />
              </div>
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative cursor-pointer"
            >
              <div className="text-xl md:text-2xl text-gray-700">
                <FaShoppingCart />
              </div>
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.1 }}
              className="cursor-pointer hidden md:block"
            >
              <div className="text-xl md:text-2xl text-gray-700">
                <FaUser />
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="md:hidden p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="text-xl text-gray-700">
                {isOpen ? <FaTimes /> : <FaBars />}
              </div>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-lg shadow-lg">
                <a
                  href="/"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </a>
                <a
                  href="/products"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Products
                </a>
                <a
                  href="/categories"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Categories
                </a>
                <a
                  href="/offers"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Offers
                </a>
                <a
                  href="/contact"
                  className="block px-3 py-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar; 