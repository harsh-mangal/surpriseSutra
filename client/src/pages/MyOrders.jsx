// src/pages/MyOrdersPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const ORDER_API = 'https://apisurprise.dodunsoftsolutions.com/api/order';

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser._id);
      } catch (err) {
        console.error('Failed to parse user:', err);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get(`${ORDER_API}/user/${userId}`);
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md">
          <AlertCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p className="text-red-700 font-medium">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 text-amber-600 hover:underline"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <Package className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            My Orders
          </h1>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <Package className="w-20 h-20 mx-auto text-gray-400 mb-6" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping and track your orders here!</p>
            <Link
              to="/diy-kits"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
            >
              <ArrowLeft className="w-5 h-5" />
              Shop Now
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono font-bold text-gray-800">#{order._id.slice(-8).toUpperCase()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Placed on</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.orderStatus || 'processing')}`}>
                      {getStatusIcon(order.orderStatus || 'processing')}
                      {order.orderStatus ? order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1) : 'Processing'}
                    </span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Items */}
                    <div className="md:col-span-2">
                      <h3 className="font-semibold text-gray-800 mb-3">Items</h3>
                      <div className="space-y-3">
                        {order.orderItems.map((item, i) => (
                          <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            {item.image ? (
                              <img
                                src={
    item.image?.startsWith("http")
      ? item.image
      : `https://apisurprise.dodunsoftsolutions.com${item.image}`
  }
                                alt={item.title}
                                className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                                onError={(e) => {
                                  e.target.src = '/placeholder.jpg';
                                  e.target.classList.add('bg-gray-200', 'border-dashed');
                                }}
                              />
                            ) : (
                              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 flex-shrink-0" />
                            )}
                            <div className="flex-1">
                              <p className="font-medium text-gray-800">{item.title}</p>
                              <p className="text-sm text-gray-600">
                                Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="font-bold text-gray-900">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Summary */}
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Summary</h3>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Shipping</span>
                          <span className="text-green-600">Free</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span className="text-red-600">₹{order.totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm text-gray-500 mb-1">Deliver to</p>
                        <p className="font-medium text-gray-800">
                          {order.shippingAddress.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {order.shippingAddress.street}, {order.shippingAddress.city}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-amber-400 text-gray-900 font-bold py-2 rounded-lg hover:bg-amber-500 transition">
                    Track Order
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 rounded-lg hover:bg-gray-300 transition">
                    View Invoice
                  </button>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;