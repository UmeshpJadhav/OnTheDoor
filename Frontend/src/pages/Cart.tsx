import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [finalPrice, setFinalPrice] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<number>(0);

  useEffect(() => {
    // Simulate fetching cart data
    const sampleCart = [
      { _id: "1", name: "Rice", price: 50, quantity: 2, image: "image_url" },
      { _id: "2", name: "Wheat", price: 30, quantity: 1, image: "image_url" },
    ];
    setCart(sampleCart);

    // Calculate final price
    const total = sampleCart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 34;
    setFinalPrice(total);

    // Set a random delivery time
    setDeliveryTime(Math.floor(Math.random() * 10) + 3);
  }, []);

  const handlePayment = async () => {
    try {
      const response = await axios.post("/payment/create/orderId");
      const options = {
        key: "rzp_test_cAa3gCF0eP8i4R",
        amount: response.data.amount,
        currency: response.data.currency,
        name: "BlinkIt",
        description: "Test Transaction",
        order_id: response.data.id,
        handler: async (response: any) => {
          await axios.post("/payment/api/payment/verify", {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
          window.location.href = `/order/userId/${response.razorpay_order_id}/${response.razorpay_payment_id}/${response.razorpay_signature}`;
        },
        prefill: {
          name: "Harsh Sharma",
          email: "harsh.sharma@example.com",
          contact: "9000090000",
        },
        theme: { color: "#3399cc" },
      };
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="bg-gray-100 font-sans min-h-screen">
      <Header />
      <div className="max-w-screen-md mx-auto p-4">
        {/* Checkout Header */}
        <div className="flex justify-between items-center py-4">
          <button className="text-lg">⬅</button>
          <h1 className="text-xl font-semibold">Checkout</h1>
          <button className="text-lg">Share</button>
        </div>

        {/* Delivery Info */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center rounded bg-zinc-100 text-2xl">⏳</span>
            <div>
              <p className="text-sm font-medium">Delivery in {deliveryTime} minutes</p>
              <p className="text-xs text-gray-500">Shipment of {cart.length} item(s)</p>
            </div>
          </div>

          {cart.map((item) => (
            <div key={item._id} className="flex items-center mt-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
              <div className="ml-4">
                <p>{item.name}</p>
                <p className="text-xs text-gray-500">170 g</p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <button className="bg-green-700 text-white px-2 py-1 rounded">➖</button>
                <p>{item.quantity}</p>
                <button className="bg-green-700 text-white px-2 py-1 rounded">➕</button>
              </div>
              <div className="flex gap-2 mt-4">
                <p className="text-gray-500 line-through">₹{item.price * item.quantity + 20}</p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bill Details */}
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="text-lg font-semibold">Bill details</h2>
          <div className="mt-2">
            <div className="flex justify-between">
              <p className="text-sm">Items total</p>
              <p className="text-sm">₹{finalPrice - 34}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Delivery charge</p>
              <p className="text-sm">₹30</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">Handling charge</p>
              <p className="text-sm">₹4</p>
            </div>
            <div className="flex justify-between font-bold mt-2">
              <p className="text-lg">Grand total</p>
              <p className="text-lg">₹{finalPrice}</p>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white p-4 rounded-lg shadow fixed bottom-0 inset-x-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm">Delivering to Home</p>
              <p className="text-xs text-gray-500">1st Floor M2, Sector C, Indrauri</p>
            </div>
            <button className="text-blue-500">Change</button>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div>
              <p className="text-sm">PAY USING</p>
              <p className="text-xs text-gray-500">Paytm UPI</p>
            </div>
            <div>
              <p className="text-lg font-bold">₹{finalPrice}</p>
              <button onClick={handlePayment} className="bg-green-700 text-white px-4 py-2 rounded">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
