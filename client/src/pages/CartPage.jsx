// src/pages/CartPage.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Minus, X, ShoppingBag, ArrowLeft } from 'lucide-react';

const CART_KEY = "surprise_sutra_cart";

const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
const saveCart = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));
};

const CartPage = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(getCart());

    useEffect(() => {
        const handler = () => setCartItems(getCart());
        window.addEventListener('storage', handler);
        window.addEventListener('cartUpdated', handler);
        return () => {
            window.removeEventListener('storage', handler);
            window.removeEventListener('cartUpdated', handler);
        };
    }, []);

    // Generate unique key for each cart item
    const getItemKey = (item) => `${item.productId || item._id}-${item.color || 'none'}-${item.size || 'none'}`;


    const updateQty = (item, delta) => {
        const key = getItemKey(item);
        const updated = cartItems
            .map((i) => {
                if (getItemKey(i) === key) {
                    const newQty = i.qty + delta;
                    return newQty > 0 ? { ...i, qty: newQty } : null;
                }
                return i;
            })
            .filter(Boolean);
        saveCart(updated);
    };

    const removeItem = (item) => {
        const key = getItemKey(item);
        saveCart(cartItems.filter((i) => getItemKey(i) !== key));
    };

    const subtotal = cartItems.reduce((sum, i) => {
        const variantPrice =
            Array.isArray(i.variants) && i.variants.length > 0
                ? i.variants[0].price
                : 0;
        const price = i.price || variantPrice || 0;
        return sum + price * (i.qty || 1);
    }, 0);

    const totalItems = cartItems.reduce((s, i) => s + i.qty, 0);

    // Empty Cart
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center max-w-md w-full">
                    <ShoppingBag className="w-16 h-16 md:w-20 md:h-20 mx-auto text-gray-400 mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
                    <p className="text-gray-600 mb-8">Looks like you haven't added anything yet.</p>
                    <Link
                        to="/diy-kits"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform text-sm md:text-base"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white py-8 md:py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-3xl p-6 md:p-8 shadow-xl mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center gap-3 flex-wrap">
                        <ShoppingBag className="w-8 h-8 md:w-10 md:h-10 text-amber-400 flex-shrink-0" />
                        <span>
                            Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                        </span>
                    </h1>
                </div>

                {/* Main Content */}
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Cart Items */}
                    <div className="flex-1 space-y-4 md:space-y-6 order-2 lg:order-1">
                        {cartItems.map((item) => {
                            const price =
                                item.price ||
                                (Array.isArray(item.variants) && item.variants.length > 0
                                    ? item.variants[0].price
                                    : 0);

                            const image =
                                item.image ||
                                (Array.isArray(item.images) && item.images.length > 0
                                    ? item.images[0].src.startsWith('http')
                                        ? item.images[0].src
                                        : `http://localhost:5005${item.images[0].src}`
                                    : null);

                            return (
                                <div
                                    key={getItemKey(item)}
                                    className="bg-white rounded-2xl shadow-lg p-4 md:p-6 flex flex-col sm:flex-row gap-4 border border-amber-100 hover:border-amber-300 transition-all"
                                >
                                    {/* Image */}
                                    <div className="w-full sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                                        <img
                                            src={image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-base md:text-lg font-bold text-gray-800 line-clamp-2">
                                                {item.title}
                                            </h3>
                                            {(item.color || item.size) && (
                                                <p className="text-xs md:text-sm text-amber-600 font-medium mt-1">
                                                    {item.color && `Color: ${item.color}`}
                                                    {item.color && item.size && " | "}
                                                    {item.size && `Size: ${item.size}`}
                                                </p>
                                            )}
                                            <p className="text-xs md:text-sm text-gray-500 mt-1">
                                                {item.vendor || 'Premium Brand'}
                                            </p>
                                        </div>

                                        {/* Price on Mobile */}
                                        <div className="sm:hidden mt-3 text-right">
                                            <p className="text-xl font-bold text-red-600">
                                                ₹{(price * item.qty).toFixed(2)}
                                            </p>
                                            <p className="text-xs text-gray-500">₹{price} each</p>
                                        </div>

                                        {/* Qty Controls */}
                                        <div className="flex items-center justify-between mt-4 sm:mt-0">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQty(item, -1)}
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition touch-manipulation"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="w-10 md:w-12 text-center font-semibold text-base md:text-lg">
                                                    {item.qty}
                                                </span>
                                                <button
                                                    onClick={() => updateQty(item, 1)}
                                                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition touch-manipulation"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item)}
                                                className="text-red-500 hover:text-red-600 flex items-center gap-1 text-sm font-medium"
                                            >
                                                <X className="w-4 h-4" />
                                                <span className="hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price on Desktop */}
                                    <div className="hidden sm:block text-right">
                                        <p className="text-xl md:text-2xl font-bold text-red-600">
                                            ₹{(price * item.qty).toFixed(2)}
                                        </p>
                                        <p className="text-sm text-gray-500">₹{price} each</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-80 order-1 lg:order-2">
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
                            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Order Summary</h2>
                            <div className="space-y-3 text-base md:text-lg">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className="text-green-600 font-medium">FREE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span className="font-semibold text-green-600">Price includes all taxes</span>
                                </div>

                                <div className="border-t pt-3 mt-3">
                                    <div className="flex justify-between text-lg md:text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-red-600">₹{subtotal.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full mt-6 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold py-3 md:py-4 rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                            >
                                Proceed to Checkout
                                <ArrowLeft className="w-5 h-5 rotate-180" />
                            </button>

                            <Link
                                to="/diy-kits"
                                className="block text-center mt-4 text-gray-600 hover:text-red-600 font-medium text-sm md:text-base"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;