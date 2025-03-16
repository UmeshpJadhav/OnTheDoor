import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  // Dummy data for products (replace with API fetch in real projects)
  const [products, setProducts] = useState<{ [key: string]: any[] }>({});
  const [cartCount, setCartCount] = useState(0);
  const [somethingInCart, setSomethingInCart] = useState(false);

  useEffect(() => {
    // Simulate API call for products (Replace this with real data fetching)
    const sampleProducts = {
      "Grocery & Kitchen": [
        { _id: "1", name: "Rice", price: 50, image: "image_url" },
        { _id: "2", name: "Wheat", price: 30, image: "image_url" },
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
    <div className="bg-gray-100 font-sans min-h-screen">
      <Header />
      <div className="max-w-screen-lg mx-auto p-4">
        {/* Order Now Section */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Order Now</h2>
            <button className="text-blue-500">See All</button>
          </div>
          <div className="flex space-x-4 mt-4 overflow-x-auto">
            {Object.keys(products).map((category) =>
              products[category].map((elem) => (
                <div key={elem._id} className="flex w-32 flex-shrink-0 flex-col items-center">
                  <div className="relative">
                    <img src={elem.image} alt={elem.name} className="h-24 rounded" />
                  </div>
                  <p className="text-sm text-center mt-2">{elem.name}</p>
                  <p className="text-xs text-gray-500 line-through">₹{elem.price + 20}</p>
                  <p className="font-bold">₹{elem.price}</p>
                  <button className="bg-green-700 text-white px-4 py-1 rounded mt-2">ADD</button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Offers Section (Swiper) */}
        <div className="my-10 w-full overflow-hidden">
          <div className="flex space-x-4 overflow-x-auto">
            <img
              className="w-full h-40 object-cover rounded-xl"
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
              alt="Offer"
            />
            <img
              className="w-full h-40 object-cover rounded-xl"
              src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
              alt="Offer"
            />
          </div>
        </div>

        {/* Grocery & Kitchen Section */}
        {Object.keys(products).map((category) => (
          <div key={category} className="bg-white p-4 rounded-lg shadow mb-10">
            <h2 className="text-lg font-semibold">{category}</h2>
            <div className="grid grid-cols-4 gap-4 mt-4">
              {products[category].map((elem) => (
                <div key={elem._id} className="flex flex-col items-center">
                  <img src={elem.image} alt={elem.name} className="w-24 rounded" />
                  <p className="text-sm text-center mt-2">{elem.name}</p>
                  <a
                    className="px-4 text-white text-xs rounded mt-2 inline-block py-1 bg-green-700"
                    href={`/cart/add/${elem._id}`}
                  >
                    ADD
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Cart Section */}
        {somethingInCart && (
          <div className="bg-white p-4 rounded-lg shadow fixed bottom-0 inset-x-0">
            <div className="flex justify-between items-center mb-10">
              <div>
                <p className="text-sm">Get FREE delivery</p>
                <p className="text-xs text-gray-500">Add products worth ₹236 more</p>
              </div>
              <button className="text-blue-500">See all coupons</button>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div>{cartCount} Item(s)</div>
              <a
                href="/cart"
                className="flex items-center justify-center px-32 py-3 bg-green-700 text-white rounded-lg"
              >
                <span className="text-lg">Next</span>
              </a>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
