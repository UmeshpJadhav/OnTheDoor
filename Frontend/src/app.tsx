import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import UserLogin from "./pages/UserLogin";
import Map from "./pages/Map";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import SignUp from "./pages/SignUp";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected User Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/map" element={
            <ProtectedRoute>
              <Map />
            </ProtectedRoute>
          } />

          {/* Protected Admin Routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute isAdmin={true}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute isAdmin={true}>
              <AdminProducts />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default App;
