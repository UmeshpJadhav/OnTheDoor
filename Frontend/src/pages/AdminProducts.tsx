import React, { useState } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

const AdminProducts: React.FC = () => {
  const [products] = useState<Product[]>([
    { _id: "1", name: "Product A", price: 100, stock: 10, image: "image_url" },
    { _id: "2", name: "Product B", price: 200, stock: 5, image: "image_url" },
  ]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow">
              <img className="w-32 h-32 mb-3" src={product.image} alt={product.name} />
              <h3 className="text-lg font-medium">{product.name}</h3>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <button className="text-red-600">Delete</button>
              <button className="text-blue-600">Update</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
