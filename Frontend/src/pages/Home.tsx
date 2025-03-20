import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { FaShoppingCart, FaTag, FaTruck } from "react-icons/fa";

const Home: React.FC = () => {
  // Dummy data for products (replace with API fetch in real projects)
  const [products, setProducts] = useState<{ [key: string]: any[] }>({});
  const [cartCount, setCartCount] = useState(0);
  const [somethingInCart, setSomethingInCart] = useState(false);

  useEffect(() => {
    // Simulate API call for products (Replace this with real data fetching)
    const sampleProducts = {
      "Grocery & Kitchen": [
        { _id: "1", name: "Organic Rice", price: 50, image: "https://images.unsplash.com/photo-1516684732162-798a0062be99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { _id: "2", name: "Whole Wheat", price: 30, image: "https://images.unsplash.com/photo-1577063555368-0fa30b858582?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { _id: "3", name: "Fresh Vegetables", price: 40, image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
        { _id: "4", name: "Organic Fruits", price: 60, image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" },
      ],
    };
    setProducts(sampleProducts);

    // Check cart count (Replace with real cart logic)
    const count = 2;
    setCartCount(count);
    setSomethingInCart(count > 0);

    // Restore Scroll Position
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }

    // Scroll Save Listener
    const handleScroll = () =>
      localStorage.setItem("scrollPosition", window.scrollY.toString());
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-gray-50 font-sans min-h-screen">
      <Navbar />
      <div className="max-w-screen-xl mx-auto p-4 pt-20 md:pt-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-6 md:p-8 mb-6 md:mb-8 text-white"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Fresh Groceries Delivered to Your Door</h1>
          <p className="text-base md:text-lg mb-4 md:mb-6">Shop from our wide range of fresh products with free delivery</p>
          <button className="bg-white text-green-700 px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold hover:bg-green-50 transition-colors text-sm md:text-base">
            Start Shopping
          </button>
        </motion.div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-green-600 text-2xl md:text-3xl mb-3 md:mb-4">
              <FaTruck />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Free Delivery</h3>
            <p className="text-sm md:text-base text-gray-600">On orders above ₹499</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-green-600 text-2xl md:text-3xl mb-3 md:mb-4">
              <FaTag />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Best Prices</h3>
            <p className="text-sm md:text-base text-gray-600">Competitive rates on all products</p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-green-600 text-2xl md:text-3xl mb-3 md:mb-4">
              <FaShoppingCart />
            </div>
            <h3 className="text-base md:text-lg font-semibold mb-2">Easy Returns</h3>
            <p className="text-sm md:text-base text-gray-600">7 days return policy</p>
          </motion.div>
        </div>

        {/* Order Now Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-4 md:p-6 rounded-xl shadow-sm mb-6 md:mb-8"
        >
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold">Trending Products</h2>
            <button className="text-green-600 font-semibold hover:text-green-700 text-sm md:text-base">See All →</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {Object.keys(products).map((category) =>
              products[category].map((elem) => (
                <motion.div 
                  key={elem._id}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center p-3 md:p-4 rounded-lg hover:shadow-md transition-shadow"
                >
                  <img 
                    src={elem.image} 
                    alt={elem.name} 
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg mb-3 md:mb-4" 
                  />
                  <p className="text-sm md:text-lg font-semibold text-center">{elem.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p className="text-xs md:text-sm text-gray-500 line-through">₹{elem.price + 20}</p>
                    <p className="text-sm md:text-base text-green-600 font-bold">₹{elem.price}</p>
                  </div>
                  <button className="bg-green-600 text-white px-4 md:px-6 py-1.5 md:py-2 rounded-full mt-3 md:mt-4 hover:bg-green-700 transition-colors text-xs md:text-sm">
                    Add to Cart
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Offers Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Special Offers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                className="w-full h-40 md:h-48 object-cover"
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
                alt="Pet Care Offer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <h3 className="text-white text-lg md:text-xl font-semibold">Pet Care Essentials</h3>
                <p className="text-white/80 text-sm md:text-base">Up to 40% off</p>
              </div>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative rounded-xl overflow-hidden"
            >
              <img
                className="w-full h-40 md:h-48 object-cover"
                src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
                alt="Pharmacy Offer"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3 md:p-4">
                <h3 className="text-white text-lg md:text-xl font-semibold">Pharmacy</h3>
                <p className="text-white/80 text-sm md:text-base">Free delivery on medicines</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cart Section */}
        {somethingInCart && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-white p-4 md:p-6 rounded-xl shadow-lg fixed bottom-0 inset-x-0 mx-4 mb-4 z-40"
          >
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div>
                <p className="text-base md:text-lg font-semibold">Get FREE delivery</p>
                <p className="text-sm md:text-base text-gray-600">Add products worth ₹236 more</p>
              </div>
              <button className="text-green-600 font-semibold hover:text-green-700 text-sm md:text-base">See all coupons →</button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="text-green-600">
                  <FaShoppingCart />
                </div>
                <span className="font-semibold text-sm md:text-base">{cartCount} Item(s)</span>
              </div>
              <a
                href="/cart"
                className="flex items-center justify-center px-6 md:px-8 py-2 md:py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors text-sm md:text-base"
              >
                <span className="font-semibold">Proceed to Checkout</span>
              </a>
            </div>
          </motion.div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
