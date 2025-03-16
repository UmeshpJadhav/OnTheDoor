import React from "react";

const AdminLogin: React.FC = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Admin Login</h2>
        <form className="mt-8 space-y-6" action="/admin/login" method="POST">
          <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
