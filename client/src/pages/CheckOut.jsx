// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Package, Truck, Wallet, Plus, MapPin, LogIn } from 'lucide-react';
import axios from 'axios';

const USER_API = 'http://localhost:5005/api/user';
const ORDER_API = 'http://localhost:5005/api/order';

const getCart = () => JSON.parse(localStorage.getItem("surprise_sutra_cart") || '[]');
const saveCart = (items) => {
  localStorage.setItem("surprise_sutra_cart", JSON.stringify(items));
  window.dispatchEvent(new Event('cartUpdated'));
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(getCart());
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  // Manual form fallback
  const [billing, setBilling] = useState({
    name: '', email: '', phone: '', address: '', city: '', state: '', pincode: ''
  });

  // Load user from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserId(parsedUser._id);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  // Fetch user addresses
  useEffect(() => {
    if (userId) {
      fetchUserAddresses();
    }
  }, [userId]);

  // Sync cart
  useEffect(() => {
    const handler = () => setCartItems(getCart());
    window.addEventListener('storage', handler);
    window.addEventListener('cartUpdated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('cartUpdated', handler);
    };
  }, []);

  const fetchUserAddresses = async () => {
    try {
      const res = await axios.get(`${USER_API}/${userId}`);
      const fetchedUser = res.data.user;
      setAddresses(fetchedUser.addresses || []);

      if (fetchedUser.addresses?.length > 0) {
        const defaultAddr = fetchedUser.addresses.find(a => a.isDefault);
        const addrToUse = defaultAddr || fetchedUser.addresses[0];
        const index = defaultAddr ? fetchedUser.addresses.indexOf(defaultAddr) : 0;
        setSelectedAddressIndex(index);
        fillAddress(addrToUse, fetchedUser);
      }
    } catch (err) {
      console.error('Failed to fetch addresses:', err);
    }
  };

  const fillAddress = (addr, fetchedUser) => {
    const fullAddress = `${addr.street}, ${addr.city}, ${addr.state} - ${addr.zip}, ${addr.country}`;

    setBilling({
      name: fetchedUser?.name || '',
      email: fetchedUser?.email || '',
      phone: fetchedUser?.phone || '',
      address: fullAddress,
      city: addr.city,
      state: addr.state,
      pincode: addr.zip
    });
  };

  const handleAddressSelect = (index) => {
    setSelectedAddressIndex(index);
    const addr = addresses[index];
    fillAddress(addr, user);
  };


const buildOrderItems = () => {
  return cartItems.map(item => {
    const variant = item.variants?.[0] || {};

    return {
      product: item.productId || item._id, // REQUIRED
      title: item.title,
      price: item.price || variant.price || 0,
      quantity: item.qty, // REQUIRED
      image: item.image || item.images?.[0]?.src || null,
      variant: {
        option1Value: item.option1Value || item.color || null,
        option2Value: item.option2Value || item.size || null,
        sku: item.sku || variant.sku || null
      }
    };
  });
};

const subtotal = cartItems.reduce(
  (sum, i) => sum + ((i.price || i.variants?.[0]?.price || 0) * (i.qty || 1)),
  0
);

const total = subtotal - (discount || 0);


  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === 'SURPRISE10') {
      setDiscount(subtotal * 0.1);
      alert('Coupon applied! 10% off');
    } else {
      alert('Invalid coupon code');
    }
  };

  // PLACE ORDER
  const placeOrder = async () => {
    let shippingAddress = {};

    if (selectedAddressIndex !== null && addresses[selectedAddressIndex]) {
      const addr = addresses[selectedAddressIndex];
      shippingAddress = {
        name: user?.name || '',
        street: addr.street,
        city: addr.city,
        state: addr.state,
        zip: addr.zip,
        country: addr.country,
        phone: user?.phone || ''
      };
    } else if (addresses.length === 0 && billing.name && billing.email && billing.phone && billing.address) {
      shippingAddress = {
        name: billing.name,
        street: billing.address.split(',')[0]?.trim() || '',
        city: billing.city,
        state: billing.state,
        zip: billing.pincode,
        country: 'India',
        phone: billing.phone
      };
    } else {
      alert('Please select or enter a delivery address');
      return;
    }

    const payload = {
      userId,
      orderItems: buildOrderItems(),
      shippingAddress,
      paymentMethod,
      shippingPrice: 0,
      totalAmount: total,
    };

    try {
      setIsPlacingOrder(true);
      const res = await axios.post(ORDER_API, payload);
      console.log('Order created:', res.data);

      localStorage.removeItem("surprise_sutra_cart");
      window.dispatchEvent(new Event('cartUpdated'));

      alert(`Order placed successfully! Total: ₹${total.toFixed(2)}`);
      navigate('/my-orders');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to place order');
    } finally {
      setIsPlacingOrder(false);
    }
  };

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <Package className="w-20 h-20 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cart is empty</h2>
          <Link
            to="/diy-kits"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // NOT LOGGED IN → SHOW LOGIN PROMPT
  if (!user || !userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-rose-50 to-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-14 text-center max-w-lg w-full">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full flex items-center justify-center">
            <LogIn className="w-12 h-12 text-amber-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Please Login First
          </h2>
          <p className="text-gray-600 mb-8">
            You need to be logged in to proceed with checkout.
          </p>
          <button
            onClick={() => navigate('/login')}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-4 px-10 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
          >
            <LogIn className="w-6 h-6" />
            Login Now
          </button>
          <p className="mt-6 text-sm text-gray-500">
            <Link to="/cart" className="text-amber-600 cursor-pointer font-medium hover:underline">
              Go Back To Cart
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <Wallet className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            Checkout
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Address & Form Section */}
          <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
            {/* Saved Addresses */}
            {addresses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-amber-500" />
                    Select Delivery Address
                  </h2>
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Add New
                  </button>
                </div>
                <div className="space-y-3">
                  {addresses.map((addr, i) => (
                    <label
                      key={i}
                      className={`block p-4 border rounded-xl cursor-pointer transition-all ${selectedAddressIndex === i
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                        }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressIndex === i}
                            onChange={() => handleAddressSelect(i)}
                            className="mt-1 w-5 h-5 text-amber-500"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{user?.name}</p>
                            <p className="text-sm text-gray-600">
                              {addr.street}, {addr.city}, {addr.state} - {addr.zip}, {addr.country}
                            </p>
                            {addr.isDefault && (
                              <span className="inline-block mt-1 px-2 py-0.5 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Add Address Form */}
            {showAddAddress && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-300">
                <h3 className="text-lg font-bold mb-4">Add New Address</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newAddr = {
                      name: formData.get('name') || user?.name,
                      street: formData.get('street'),
                      city: formData.get('city'),
                      state: formData.get('state'),
                      zip: formData.get('zip'),
                      country: formData.get('country') || 'India',
                      isDefault: formData.get('isDefault') === 'on'
                    };
                    try {
                      const res = await axios.post(`${USER_API}/${userId}/address`, newAddr);
                      setAddresses(res.data.addresses);
                      setShowAddAddress(false);
                      const newIndex = res.data.addresses.length - 1;
                      setSelectedAddressIndex(newIndex);
                      fillAddress(res.data.addresses[newIndex], user);
                    } catch (err) {
                      alert('Failed to add address');
                    }
                  }}
                  className="space-y-3"
                >
                  <input name="name" placeholder="Full Name" defaultValue={user?.name} className="w-full px-4 py-3 border rounded-lg" />
                  <input name="street" placeholder="Street Address" required className="w-full px-4 py-3 border rounded-lg" />
                  <div className="grid grid-cols-2 gap-3">
                    <input name="city" placeholder="City" required className="px-4 py-3 border rounded-lg" />
                    <input name="state" placeholder="State" required className="px-4 py-3 border rounded-lg" />
                    <input name="zip" placeholder="Pincode" required className="px-4 py-3 border rounded-lg" />
                    <input name="country" placeholder="Country" defaultValue="India" className="px-4 py-3 border rounded-lg" />
                  </div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" name="isDefault" className="w-4 h-4 text-amber-500" />
                    <span className="text-sm">Set as default</span>
                  </label>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-amber-400 text-gray-900 font-bold py-3 rounded-lg">
                      Save Address
                    </button>
                    <button type="button" onClick={() => setShowAddAddress(false)} className="flex-1 bg-gray-200 py-3 rounded-lg">
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* No Address? Show Add Button */}
            {addresses.length === 0 && !showAddAddress && (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                jamming
                <p className="text-gray-600 mb-4">No saved addresses</p>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-full hover:scale-105 transition"
                >
                  <Plus className="w-5 h-5" />
                  Add Address
                </button>
              </div>
            )}

            {/* Manual Entry (Fallback) */}
            {(addresses.length === 0 || selectedAddressIndex === null) && !showAddAddress && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Truck className="w-6 h-6 text-amber-500" />
                  Billing Address
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={billing.name}
                    onChange={(e) => setBilling({ ...billing, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="email"
                    placeholder="Email *"
                    value={billing.email}
                    onChange={(e) => setBilling({ ...billing, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="tel"
                    placeholder="Phone *"
                    value={billing.phone}
                    onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Address *"
                    value={billing.address}
                    onChange={(e) => setBilling({ ...billing, address: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 sm:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City *"
                    value={billing.city}
                    onChange={(e) => setBilling({ ...billing, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="State *"
                    value={billing.state}
                    onChange={(e) => setBilling({ ...billing, state: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="text"
                    placeholder="Pincode *"
                    value={billing.pincode}
                    onChange={(e) => setBilling({ ...billing, pincode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CreditCard className="w-6 h-6 text-amber-500" />
                Payment Method
              </h2>
              <div className="space-y-3">
                {[
                  { id: 'cod', label: 'Cash on Delivery', icon: Wallet },
                  { id: 'upi', label: 'UPI / QR', icon: CreditCard },
                  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                ].map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === method.id
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-amber-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <method.icon className="w-6 h-6 text-amber-600" />
                      <span className="font-medium">{method.label}</span>
                    </div>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-5 h-5 text-amber-500 focus:ring-amber-400"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="max-h-64 overflow-y-auto mb-4 space-y-2">
                {cartItems.map((item, idx) => {
                  const price = item.price || item.variants?.[0]?.price || 0;

                  return (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-600 truncate max-w-[180px]">
                        {item.title} × {item.qty}
                        {item.color && ` (${item.color}`}
                        {item.size && `, ${item.size})`}
                      </span>
                      <span className="font-medium">₹{(price * item.qty).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-lg">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-red-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  onClick={applyCoupon}
                  className="px-4 py-2 bg-amber-400 text-gray-900 font-bold rounded-lg hover:bg-amber-500 transition"
                >
                  Apply
                </button>
              </div>

              <button
                onClick={placeOrder}
                disabled={isPlacingOrder}
                className="w-full mt-6 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPlacingOrder ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Check className="w-5 h-5" />
                    Place Order
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="block text-center mt-4 text-gray-600 hover:text-red-600 font-medium"
              >
                Back to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;