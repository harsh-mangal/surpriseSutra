// src/pages/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, Plus, Edit, Trash2, Check, X, ArrowLeft, Package, Heart, LogOut } from 'lucide-react';
import axios from 'axios';

const API_BASE = 'https://apisurprise.dodunsoftsolutions.com/api/user';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [userId, setUserId] = useState('');

  // Form states
  const [profileForm, setProfileForm] = useState({ name: '', email: '', password: '' });
  const [addressForm, setAddressForm] = useState({
    street: '', city: '', state: '', zip: '', country: 'India', isDefault: false
  });

  // Get user ID from localStorage
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUserId(parsedUser?._id);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);



  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/${userId}`);
      setUser(res.data.user);
      setProfileForm({ name: res.data.user.name, email: res.data.user.email, password: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (msg, type = 'success') => {
    if (type === 'success') setSuccess(msg);
    else setError(msg);
    setTimeout(() => {
      setSuccess('');
      setError('');
    }, 4000);
  };

  // === UPDATE PROFILE ===
  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      const payload = {};
      if (profileForm.name !== user.name) payload.name = profileForm.name;
      if (profileForm.email !== user.email) payload.email = profileForm.email;
      if (profileForm.password) payload.password = profileForm.password;

      if (Object.keys(payload).length === 0) {
        setEditingProfile(false);
        return;
      }

      const res = await axios.put(`${API_BASE}/${userId}`, payload);
      setUser(res.data.user);
      setEditingProfile(false);
      showMessage('Profile updated successfully');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  // === ADD ADDRESS ===
  const addAddress = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/${userId}/address`, addressForm);
      setUser({ ...user, addresses: res.data.addresses });
      setShowAddAddress(false);
      setAddressForm({ street: '', city: '', state: '', zip: '', country: 'India', isDefault: false });
      showMessage('Address added');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Failed to add address', 'error');
    }
  };

  // === UPDATE ADDRESS ===
  const updateAddress = async (e, index) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${API_BASE}/${userId}/address`, { index, address: addressForm });
      setUser({ ...user, addresses: res.data.addresses });
      setEditingAddressIndex(null);
      showMessage('Address updated');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Update failed', 'error');
    }
  };

  // === DELETE ADDRESS ===
  const deleteAddress = async (index) => {
    if (!window.confirm('Delete this address?')) return;
    try {
      const res = await axios.delete(`${API_BASE}/${userId}/address`, { data: { index } });
      setUser({ ...user, addresses: res.data.addresses });
      showMessage('Address deleted');
    } catch (err) {
      showMessage(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-12 text-center max-w-md">
          <X className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <p className="text-red-700 font-medium">{error}</p>
          <Link to="/login" className="mt-6 inline-block text-amber-600 hover:underline">
            ← Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-8">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center gap-3">
            <User className="w-8 h-8 md:w-10 md:h-10 text-amber-400" />
            My Profile
          </h1>
        </div>

        {/* Success/Error */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2">
            <Check className="w-5 h-5" />
            {success}
          </div>
        )}
        {/* {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl flex items-center gap-2">
            <X className="w-5 h-5" />
            {error}
          </div>
        )} */}

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <User className="w-6 h-6 text-amber-500" />
                  Personal Information
                </h2>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium"
                >
                  <Edit className="w-4 h-4" />
                  {editingProfile ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editingProfile ? (
                <form onSubmit={updateProfile} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <input
                    type="password"
                    placeholder="New Password (leave blank to keep)"
                    value={profileForm.password}
                    onChange={(e) => setProfileForm({ ...profileForm, password: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 rounded-lg hover:scale-105 transition"
                    >
                      Save Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProfile(false)}
                      className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg hover:bg-gray-300 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-700">
                    <User className="w-5 h-5 text-amber-600" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Mail className="w-5 h-5 text-amber-600" />
                    <span>{user.email}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Addresses */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-amber-500" />
                  Delivery Addresses
                </h2>
                <button
                  onClick={() => setShowAddAddress(true)}
                  className="text-amber-600 hover:text-amber-700 flex items-center gap-1 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Address
                </button>
              </div>

              {user.addresses.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No addresses saved yet.</p>
              ) : (
                <div className="space-y-4">
                  {user.addresses.map((addr, i) => (
                    <div
                      key={i}
                      className={`p-4 border rounded-xl ${addr.isDefault ? 'border-amber-500 bg-amber-50' : 'border-gray-200'}`}
                    >
                      {editingAddressIndex === i ? (
                        <form onSubmit={(e) => updateAddress(e, i)} className="space-y-3">
                          <input
                            type="text"
                            placeholder="Street"
                            value={addressForm.street}
                            onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                            className="w-full px-3 py-2 border rounded-lg text-sm"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="City"
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                              className="px-3 py-2 border rounded-lg text-sm"
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                              className="px-3 py-2 border rounded-lg text-sm"
                            />
                            <input
                              type="text"
                              placeholder="ZIP"
                              value={addressForm.zip}
                              onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                              className="px-3 py-2 border rounded-lg text-sm"
                            />
                            <input
                              type="text"
                              placeholder="Country"
                              value={addressForm.country}
                              onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                              className="px-3 py-2 border rounded-lg text-sm"
                            />
                          </div>
                          <label className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={addressForm.isDefault}
                              onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                              className="w-4 h-4 text-amber-500"
                            />
                            Set as default
                          </label>
                          <div className="flex gap-2">
                            <button
                              type="submit"
                              className="flex-1 bg-amber-400 text-gray-900 font-medium py-2 rounded-lg text-sm"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingAddressIndex(null)}
                              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg text-sm"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      ) : (
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-800">
                              {addr.street}, {addr.city}
                            </p>
                            <p className="text-sm text-gray-600">
                              {addr.state} - {addr.zip}, {addr.country}
                            </p>
                            {addr.isDefault && (
                              <span className="inline-block mt-2 px-3 py-1 bg-amber-400 text-gray-900 text-xs font-bold rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setEditingAddressIndex(i);
                                setAddressForm({
                                  street: addr.street,
                                  city: addr.city,
                                  state: addr.state,
                                  zip: addr.zip,
                                  country: addr.country,
                                  isDefault: addr.isDefault
                                });
                              }}
                              className="text-amber-600 hover:text-amber-700"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteAddress(i)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Add Address Form */}
            {showAddAddress && (
              <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-amber-300">
                <h3 className="text-lg font-bold mb-4">Add New Address</h3>
                <form onSubmit={addAddress} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={addressForm.street}
                    onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg"
                    required
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="px-4 py-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="State"
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="px-4 py-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={addressForm.zip}
                      onChange={(e) => setAddressForm({ ...addressForm, zip: e.target.value })}
                      className="px-4 py-3 border rounded-lg"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={addressForm.country}
                      onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })}
                      className="px-4 py-3 border rounded-lg"
                      required
                    />
                  </div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={addressForm.isDefault}
                      onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                      className="w-4 h-4 text-amber-500"
                    />
                    <span className="text-sm font-medium">Set as default address</span>
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 rounded-lg"
                    >
                      Add Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddress(false)}
                      className="flex-1 bg-gray-200 text-gray-700 font-medium py-3 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 space-y-4">
              <h3 className="text-lg font-bold text-gray-800">Quick Actions</h3>
              <Link
                to="/my-orders"
                className="block p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition flex items-center gap-2"
              >
                <Package className="w-5 h-5" />
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="block p-3 bg-amber-50 text-amber-700 rounded-lg hover:bg-amber-100 transition flex items-center gap-2"
              >
                <Heart className="w-5 h-5" />
                Wishlist
              </Link>
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/login');
                }}
                className="w-full p-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;