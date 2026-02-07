import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  getAllOrders,
  getImageUrl,
} from '../utils/api';
import { Trash2, Edit2, Plus, LogOut, Package, ShoppingBag, X } from 'lucide-react';
import { CURRENCIES, getEffectivePrice, formatPrice } from '../utils/price';

export default function Admin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('products');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    fullDescription: '',
    price: '',
    currency: 'USD',
    discountPercent: '',
    images: [],
    badge: '',
    rating: '',
    reviews: '',
    features: '',
    includes: '',
    inStock: true,
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      setLoading(true);
      if (activeTab === 'products') {
        const response = await getProducts();
        setProducts(response.data);
      } else if (activeTab === 'orders') {
        const response = await getAllOrders();
        setOrders(response.data);
      }
    } catch (error) {
      console.error('Error loading data:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('image', file);
      const response = await uploadImage(fd);
      const url = response.data.url || `${(import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '')}${response.data.path || ''}`;
      setFormData((prev) => ({ ...prev, images: [...(prev.images || []), url].filter(Boolean) }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading image');
    } finally {
      setUploading(false);
    }
    e.target.value = '';
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: (prev.images || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate required fields
      if (!formData.name || !formData.price || !(formData.images?.length)) {
        alert('Please fill in all required fields (Name, Price, and at least one Image)');
        return;
      }

      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 0) {
        alert('Please enter a valid price');
        return;
      }

      const discountPercent = formData.discountPercent !== '' && formData.discountPercent !== undefined
        ? Math.min(100, Math.max(0, parseFloat(formData.discountPercent) || 0))
        : 0;

      const productData = {
        name: formData.name.trim(),
        description: formData.description || '',
        fullDescription: formData.fullDescription || '',
        price: price,
        currency: formData.currency || 'USD',
        discountPercent,
        images: formData.images?.filter(Boolean).map((u) => u.trim()) || [],
        badge: formData.badge || '',
        rating: formData.rating && formData.rating !== '' ? parseFloat(formData.rating) : 0,
        reviews: formData.reviews && formData.reviews !== '' ? parseInt(formData.reviews) : 0,
        features: formData.features && formData.features.trim()
          ? formData.features.split(',').map((f) => f.trim()).filter(f => f)
          : [],
        includes: formData.includes && formData.includes.trim()
          ? formData.includes.split(',').map((i) => i.trim()).filter(i => i)
          : [],
        inStock: formData.inStock === true || formData.inStock === 'true',
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
      } else {
        await createProduct(productData);
      }

      setShowModal(false);
      setEditingProduct(null);
      resetForm();
      loadData();
    } catch (error) {
      console.error('Error saving product:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Error saving product';
      alert(errorMessage);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    const images = (product.images && product.images.length) ? product.images : (product.image ? [product.image] : []);
    setFormData({
      name: product.name || '',
      description: product.description || '',
      fullDescription: product.fullDescription || '',
      price: product.price?.toString() || '',
      currency: product.currency || 'USD',
      discountPercent: product.discountPercent != null ? product.discountPercent.toString() : '',
      images,
      badge: product.badge || '',
      rating: product.rating?.toString() || '',
      reviews: product.reviews?.toString() || '',
      features: product.features?.join(', ') || '',
      includes: product.includes?.join(', ') || '',
      inStock: product.inStock !== undefined ? product.inStock : true,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
    try {
      await deleteProduct(id);
      loadData();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      fullDescription: '',
      price: '',
      currency: 'USD',
      discountPercent: '',
      images: [],
      badge: '',
      rating: '',
      reviews: '',
      features: '',
      includes: '',
      inStock: true,
    });
    setEditingProduct(null);
  };

  if (loading && products.length === 0 && orders.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-white font-bold text-lg">DIABLO ADMIN</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-gray-800 rounded-lg transition"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition ${
              activeTab === 'products'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-5 h-5" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 px-6 py-3 font-bold rounded-lg transition ${
              activeTab === 'orders'
                ? 'bg-red-600 text-white'
                : 'bg-gray-900 text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Orders
          </button>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-white">Products</h2>
              <button
                onClick={() => {
                  resetForm();
                  setShowModal(true);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-gray-900 rounded-lg p-6 flex flex-col"
                >
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 overflow-hidden">
                    <img
                      src={getImageUrl((product.images && product.images[0]) || product.image) || '/placeholder.svg'}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {product.name}
                  </h3>
                  <div className="text-red-600 font-bold text-xl mb-4">
                    {product.discountPercent > 0 ? (
                      <>
                        <span className="line-through text-gray-400 mr-2">{formatPrice(product.price, product.currency)}</span>
                        {formatPrice(getEffectivePrice(product), product.currency)}
                        <span className="text-sm font-normal text-green-400 ml-1">-{product.discountPercent}%</span>
                      </>
                    ) : (
                      formatPrice(product.price, product.currency)
                    )}
                  </div>
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="text-3xl font-black text-white mb-6">Orders</h2>
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-white font-bold">
                      Order Number
                    </th>
                    <th className="px-6 py-4 text-left text-white font-bold">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-white font-bold">
                      Total
                    </th>
                    <th className="px-6 py-4 text-left text-white font-bold">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-white font-bold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="border-t border-gray-800 hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 text-white">{order.orderNumber}</td>
                      <td className="px-6 py-4 text-gray-300">
                        {order.shippingAddress?.firstName}{' '}
                        {order.shippingAddress?.lastName}
                      </td>
                      <td className="px-6 py-4 text-red-600 font-bold">
                        ${order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'delivered'
                              ? 'bg-green-600 text-white'
                              : order.status === 'shipped'
                                ? 'bg-blue-600 text-white'
                                : 'bg-yellow-600 text-white'
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-6">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-white mb-6">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Description
                </label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Full Description
                </label>
                <textarea
                  value={formData.fullDescription || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value,
                    })
                  }
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency || 'USD'}
                    onChange={(e) =>
                      setFormData({ ...formData, currency: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Remise (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    value={formData.discountPercent ?? ''}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPercent: e.target.value })
                    }
                    placeholder="0"
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">
                    Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, badge: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Images * (at least one)
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(formData.images || []).map((url, index) => (
                    <div key={index} className="relative inline-block">
                      <img
                        src={getImageUrl(url)}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-1 -right-1 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
                <label className="inline-flex items-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 cursor-pointer">
                  {uploading ? 'Uploading...' : 'Add image'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-2">
                  Rating
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, rating: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-2">
                  Reviews
                </label>
                <input
                  type="number"
                  value={formData.reviews || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, reviews: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.features || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                  placeholder="Feature 1, Feature 2, Feature 3"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Includes (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.includes || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, includes: e.target.value })
                  }
                  placeholder="Item 1, Item 2, Item 3"
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  In Stock
                </label>
                <select
                  value={formData.inStock === true || formData.inStock === 'true' ? 'true' : 'false'}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      inStock: e.target.value === 'true',
                    })
                  }
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-red-600 focus:outline-none"
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition"
                >
                  {editingProduct ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

