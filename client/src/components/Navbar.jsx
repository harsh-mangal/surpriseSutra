// src/components/Navbar.jsx
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, ShoppingCart, User, ChevronDown } from 'lucide-react';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isPartySuppliesOpen, setIsPartySuppliesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // -------------------------------------------------
  // LOCAL CART (inside Navbar – uses localStorage)
  // -------------------------------------------------
  const CART_KEY = 'surprise_sutra_cart';

  const getCart = () => {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  const [cartItems, setCartItems] = useState(getCart());

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const saveCart = (items) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
    setCartItems(items);
    // notify other tabs
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const addToCart = (product) => {
    const current = getCart();
    const existing = current.find((i) => i.id === product.id);
    if (existing) {
      saveCart(
        current.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      saveCart([...current, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    saveCart(getCart().filter((i) => i.id !== id));
  };

  // Keep cart in sync across tabs
  useEffect(() => {
    const handler = () => setCartItems(getCart());
    window.addEventListener('storage', handler);
    window.addEventListener('cartUpdated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('cartUpdated', handler);
    };
  }, []);

  // -------------------------------------------------
  // Scroll effect
  // -------------------------------------------------
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // -------------------------------------------------
  // Click-outside for dropdowns
  // -------------------------------------------------
  const profileRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setIsProfileOpen(false);
      if (cartRef.current && !cartRef.current.contains(e.target))
        setIsCartOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // -------------------------------------------------
  // Nav links
  // -------------------------------------------------
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    {
      name: "Party Supplies",
      subLinks: [
        { name: "DIY Kits", path: "/party-supplies/diy-kits" },
        { name: "Themed Party Supplies", path: "/party-supplies/themed" },
        { name: "Customized Party Supplies", path: "/party-supplies/customized" },
      ],
    },
    { name: 'Products', path: '/products' },
    { name: 'Gifts', path: '/gifts' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact', isButton: true },
  ];

  const linkClasses = (path, isButton = false) =>
    isButton
      ? `group relative px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden ${
          location.pathname === path
            ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-lg"
            : "bg-gradient-to-r from-red-500 to-rose-500 hover:shadow-xl hover:scale-105"
        }`
      : `relative font-semibold text-base transition-all duration-300 group ${
          location.pathname === path
            ? "text-transparent bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text"
            : "text-gray-700 hover:text-gray-900"
        }`;

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsPartySuppliesOpen(false);
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl'
          : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg'
        }`}
    >
      {/* Gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>

      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer group relative"
            onClick={() => navigate("/")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-rose-400/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/ChatGPT_Image_Oct_14__2025__05_14_06_PM-removebg-preview.png?updatedAt=1760442286996"
              alt="Surprise Sutra Logo"
              className="relative h-20 lg:h-24 w-auto p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu + Icons */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {/* ---- Nav Links ---- */}
            {navLinks.map((link) => (
              <div
                key={link.path || link.name}
                className="relative"
                onMouseEnter={() =>
                  link.subLinks && setIsPartySuppliesOpen(true)
                }
                onMouseLeave={() =>
                  link.subLinks && setIsPartySuppliesOpen(false)
                }
              >
                {link.subLinks ? (
                  <>
                    <div className={linkClasses("/party-supplies")}>
                      <span className="flex items-center cursor-pointer">
                        {link.name}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 transform origin-left transition-transform duration-300 ${location.pathname.startsWith('/party-supplies')
                            ? 'scale-x-100'
                            : 'scale-x-0 group-hover:scale-x-100'
                          }`}
                      ></span>
                    </div>

                    {isPartySuppliesOpen && (
                      <div className="absolute top-full left-0 mt-0 w-52 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl border border-amber-500/20 overflow-hidden">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200 ${location.pathname === sub.path
                                ? 'bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-white'
                                : ''
                              }`}
                            onClick={handleLinkClick}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={linkClasses(link.path, link.isButton)}
                    onClick={handleLinkClick}
                  >
                    {!link.isButton && (
                      <>
                        <span
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 transform origin-left transition-transform duration-300 ${location.pathname === link.path
                              ? 'scale-x-100'
                              : 'scale-x-0 group-hover:scale-x-100'
                            }`}
                        ></span>
                        {link.name}
                      </>
                    )}
                    {link.isButton && (
                      <span className="relative inline-flex items-center justify-center text-white font-semibold py-2 px-0 rounded-l-full rounded-r-none">
                        <span className="mr-2">{link.name}</span>
                        <Sparkles size={16} className="mr-1" />
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* ==== CART ICON ==== */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-2 text-gray-300 hover:text-amber-400 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* ==== PROFILE ICON ==== */}
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 p-2 text-gray-300 hover:text-amber-400 transition-colors"
              >
                <User size={24} />
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md rounded-lg shadow-2xl border border-amber-500/20 overflow-hidden">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('token');
                      localStorage.removeItem('user')
                      setIsProfileOpen(false);
                      navigate('/login');
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-400 hover:bg-gray-800/50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile cart badge */}
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative p-2 text-gray-300 hover:text-amber-400"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile profile */}
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2 text-gray-300 hover:text-amber-400"
            >
              <User size={24} />
            </button>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-300 hover:text-amber-400"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pb-6 pt-2 space-y-3 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl px-4 mt-2">
            {navLinks.map((link, idx) => (
              <div key={link.path || link.name}>
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => setIsPartySuppliesOpen(!isPartySuppliesOpen)}
                      className={`w-full text-left block ${linkClasses(
                        '/party-supplies'
                      )} py-3 px-4 rounded-lg hover:bg-gray-800/50`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}
                        <span
                          className={`transform transition-transform duration-300 ${isPartySuppliesOpen ? 'rotate-180' : ''
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                    {isPartySuppliesOpen && (
                      <div className="pl-4 space-y-2">
                        {link.subLinks.map((sub) => (
                          <Link
                            key={sub.path}
                            to={sub.path}
                            className={`block px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800/50 hover:text-white transition-colors duration-200 ${location.pathname === sub.path
                                ? 'bg-gradient-to-r from-amber-400/20 to-yellow-400/20 text-white'
                                : ''
                              }`}
                            onClick={handleLinkClick}
                            style={{ animationDelay: `${(idx + 1) * 50}ms` }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`block ${linkClasses(
                      link.path,
                      link.isButton
                    )} ${
                      !link.isButton &&
                      "py-3 px-4 rounded-lg hover:bg-amber-50"
                    }`}
                    onClick={handleLinkClick}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {link.isButton ? (
                      <span className="relative z-10 flex items-center justify-center space-x-2">
                        <span>{link.name}</span>
                        <Sparkles size={16} />
                      </span>
                    ) : (
                      <span className="flex items-center justify-between">
                        {link.name}
                        {location.pathname === link.path && (
                          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 animate-pulse"></span>
                        )}
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile cart drawer (same as desktop but inside mobile menu) */}
            {isCartOpen && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-white mb-2">Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-400">Empty</p>
                ) : (
                  <>
                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                      {cartItems.map((it) => (
                        <li
                          key={it.id}
                          className="flex justify-between text-sm text-gray-300"
                        >
                          <span>{it.name}</span>
                          <span className="flex items-center gap-2">
                            <span className="text-amber-400">₹{it.price}</span>
                            <span className="text-xs">×{it.qty}</span>
                            <button
                              onClick={() => removeFromCart(it.id)}
                              className="text-red-400"
                            >
                              ×
                            </button>
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/cart"
                      onClick={() => setIsCartOpen(false)}
                      className="mt-3 block w-full text-center bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 font-semibold py-2 rounded-full"
                    >
                      View Cart
                    </Link>
                  </>
                )}
              </div>
            )}

            {/* Mobile profile dropdown */}
            {isProfileOpen && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg space-y-2">
                <Link
                  to="/profile"
                  onClick={() => setIsProfileOpen(false)}
                  className="block text-sm text-gray-300 hover:text-white"
                >
                  Profile
                </Link>
                <Link
                  to="/my-orders"
                  onClick={() => setIsProfileOpen(false)}
                  className="block text-sm text-gray-300 hover:text-white"
                >
                  My Orders
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user')
                    setIsProfileOpen(false);
                    navigate('/login');
                  }}
                  className="w-full text-left text-sm text-red-400"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
