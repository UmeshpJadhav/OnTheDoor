import React, { useState } from "react";

const AdminDashboard: React.FC = () => {
  const [prodCount, setProdCount] = useState(50);
  const [categCount, setCategCount] = useState(10);

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </header>

      <main className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold">Dashboard Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-600">Total Products</h3>
              <p className="text-2xl font-bold">{prodCount}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-600">Total Categories</h3>
              <p className="text-2xl font-bold">{categCount}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
