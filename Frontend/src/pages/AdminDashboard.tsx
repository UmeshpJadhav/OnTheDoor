import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FiUsers, FiPackage, FiShoppingBag, FiDollarSign, FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
//import { productAPI, categoryAPI } from '../services/api';
import { toast } from 'react-toastify';

interface OrderData {
  id: string;
  customer: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  date: string;
}

interface ProductData {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
}

interface CategoryData {
  id: string;
  name: string;
  description: string;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    products: 50,
    categories: 10,
    users: 120,
    revenue: 15000
  });

  const [recentOrders, setRecentOrders] = useState<OrderData[]>([]);
  const [salesData, setSalesData] = useState([
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 4500 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 7000 },
  ]);

  const [products, setProducts] = useState<ProductData[]>([
    { id: '1', name: 'Product 1', price: 99.99, category: 'Electronics', stock: 50 },
    { id: '2', name: 'Product 2', price: 149.99, category: 'Clothing', stock: 30 },
  ]);

  const [categories, setCategories] = useState<CategoryData[]>([
    { id: '1', name: 'Electronics', description: 'Electronic devices and accessories' },
    { id: '2', name: 'Clothing', description: 'Apparel and fashion items' },
  ]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate data fetching
  useEffect(() => {
    // In real application, replace with actual API calls
    setRecentOrders([
      { id: '1', customer: 'John Doe', amount: 150, status: 'completed', date: '2024-03-20' },
      { id: '2', customer: 'Jane Smith', amount: 299, status: 'pending', date: '2024-03-19' },
      { id: '3', customer: 'Mike Johnson', amount: 499, status: 'completed', date: '2024-03-18' },
    ]);
  }, []);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productAPI.getAllProducts(),
          categoryAPI.getAllCategories()
        ]);
        
        setProducts(productsRes.data);
        setCategories(categoriesRes.data);
      } catch (error) {
        toast.error('Error fetching data');
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle product form submission
  const handleProductSubmit = async (formData: Omit<ProductData, 'id'>) => {
    try {
      setIsLoading(true);
      
      if (selectedProduct) {
        // Update existing product
        const response = await productAPI.updateProduct(selectedProduct.id, formData);
        setProducts(products.map(p => 
          p.id === selectedProduct.id ? response.data : p
        ));
        toast.success('Product updated successfully');
      } else {
        // Create new product
        const response = await productAPI.createProduct(formData);
        setProducts([...products, response.data]);
        toast.success('Product created successfully');
      }
      
      setShowProductModal(false);
    } catch (error) {
      toast.error('Error saving product');
      console.error('Error saving product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await productAPI.deleteProduct(id);
      setProducts(products.filter(p => p.id !== id));
      toast.success('Product deleted successfully');
    } catch (error) {
      toast.error('Error deleting product');
      console.error('Error deleting product:', error);
    }
  };

  // Handle category form submission
  const handleCategorySubmit = async (formData: Omit<CategoryData, 'id'>) => {
    try {
      setIsLoading(true);
      
      if (selectedCategory) {
        // Update existing category
        const response = await categoryAPI.updateCategory(selectedCategory.id, formData);
        setCategories(categories.map(c => 
          c.id === selectedCategory.id ? response.data : c
        ));
        toast.success('Category updated successfully');
      } else {
        // Create new category
        const response = await categoryAPI.createCategory(formData);
        setCategories([...categories, response.data]);
        toast.success('Category created successfully');
      }
      
      setShowCategoryModal(false);
    } catch (error) {
      toast.error('Error saving category');
      console.error('Error saving category:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      await categoryAPI.deleteCategory(id);
      setCategories(categories.filter(c => c.id !== id));
      toast.success('Category deleted successfully');
    } catch (error) {
      toast.error('Error deleting category');
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-white shadow p-6">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-xl font-semibold">{stats.products}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiShoppingBag className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Categories</p>
                <p className="text-xl font-semibold">{stats.categories}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiUsers className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Users</p>
                <p className="text-xl font-semibold">{stats.users}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <FiDollarSign className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-xl font-semibold">${stats.revenue}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Sales Overview</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="border-b pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{order.customer}</p>
                      <p className="text-sm text-gray-500">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${order.amount}</p>
                      <span className={`text-sm px-2 py-1 rounded ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' :
                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Product Management</h2>
              <button
                onClick={() => {
                  setSelectedProduct(null);
                  setShowProductModal(true);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              >
                <FiPlus /> Add Product
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${product.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setShowProductModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Category Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Category Management</h2>
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setShowCategoryModal(true);
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
              >
                <FiPlus /> Add Category
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                    <td className="px-6 py-4">{category.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategoryModal(true);
                          }}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Modal */}
        {showProductModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleProductSubmit(selectedProduct as Omit<ProductData, 'id'>);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={selectedProduct?.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Price</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={selectedProduct?.price}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Category</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={selectedProduct?.category}
                    >
                      {categories.map(category => (
                        <option key={category.id} value={category.name}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Stock</label>
                    <input
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={selectedProduct?.stock}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowProductModal(false)}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    {selectedProduct ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Category Modal */}
        {showCategoryModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">
                {selectedCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                handleCategorySubmit(selectedCategory as Omit<CategoryData, 'id'>);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      defaultValue={selectedCategory?.name}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                      defaultValue={selectedCategory?.description}
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCategoryModal(false)}
                    className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    {selectedCategory ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
