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
  const [isThemedOpen, setIsThemedOpen] = useState(false);


  const location = useLocation();
  const navigate = useNavigate();


  const getCart = () => {
    const raw = localStorage.getItem("surprise_sutra_cart");
    return raw ? JSON.parse(raw) : [];
  };

  const [cartItems, setCartItems] = useState(getCart());

  const totalItems = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const saveCart = (items) => {
    localStorage.setItem("surprise_sutra_cart", JSON.stringify(items));
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
  const desktopProfileRef = useRef(null);
  const mobileProfileRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      // Close profile dropdown if clicked outside both desktop and mobile refs
      if (desktopProfileRef.current && !desktopProfileRef.current.contains(e.target) &&
        mobileProfileRef.current && !mobileProfileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
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
        { name: "DIY Kits", path: "/diy-kits" },
        {
          name: "Themed Party Supplies",
          path: "/party-supplies/themed",
          subLinks: [
            { name: "Anniversary", path: "/party-supplies/themed/anniversary" },
            { name: "Baby Shower", path: "/party-supplies/themed/baby-shower" },
            { name: "Baby Welcome", path: "/party-supplies/themed/baby-welcome" },
            { name: "Bachelor/Bachelorette", path: "/party-supplies/themed/bachelor" },
            { name: "Birthday", path: "/party-supplies/themed/birthday" },
            { name: "Farewell & Retirement", path: "/party-supplies/themed/farewell-retirement" },
          ],
        },
        { name: "Customized Party Supplies", path: "/party-supplies/customized" },
      ],
    },
    { name: 'Gifts', path: '/gifts' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact', isButton: true },
  ];


  const linkClasses = (path, isButton = false) =>
    isButton
      ? `group relative px-6 py-2 lg:px-8 lg:py-3 rounded-full font-semibold text-white transition-all duration-300 overflow-hidden ${location.pathname === path
        ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-lg"
        : "bg-gradient-to-r from-red-500 to-rose-500 hover:shadow-xl hover:scale-105"
      }`
      : `relative font-semibold text-base transition-all duration-300 group ${location.pathname === path
        ? "text-transparent bg-gradient-to-r from-amber-500 to-yellow-400 bg-clip-text"
        : "text-gray-700 hover:text-gray-900"
      }`;

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsPartySuppliesOpen(false);
    setIsThemedOpen(false);
  };

  // -------------------------------------------------
  // Render
  // -------------------------------------------------
  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-gray-100/95 backdrop-blur-md shadow-2xl"
        : "bg-gradient-to-r from-white via-gray-50 to-white shadow-lg"
        }`}
    >
      {/* Gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-70"></div>

      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo */}
          <div
            className="flex-shrink-0 cursor-pointer group relative"
            onClick={() => navigate("/")}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-rose-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://ik.imagekit.io/tdlebsr5e/surprisesutralogopng?updatedAt=1762244410560"
              alt="Surprise Sutra Logo"
              className="relative h-20 lg:h-24 w-auto p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu + Icons */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.path || link.name}
                className="relative"
                onMouseEnter={() => link.subLinks && setIsPartySuppliesOpen(true)}
                onMouseLeave={() => link.subLinks && setIsPartySuppliesOpen(false)}
              >
                {link.subLinks ? (
                  <>
                    <div className={linkClasses("/party-supplies")}>
                      <span className="flex items-center text-black cursor-pointer hover:text-amber-600 transition-colors duration-200">
                        {link.name}
                      </span>
                      <span
                        className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 transform origin-left transition-transform duration-300 ${location.pathname.startsWith("/party-supplies")
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                          }`}
                      ></span>
                    </div>

                    {isPartySuppliesOpen && (
                      <div className="absolute top-full left-0 mt-0 w-52 bg-white rounded-lg shadow-xl border border-amber-500/20 overflow-hidden">
                        {link.subLinks.map((sub) => (
                          <div key={sub.path}>
                            {sub.subLinks ? (
                              <>
                                <button
                                  onClick={() => setIsThemedOpen(!isThemedOpen)}
                                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 ${location.pathname === sub.path
                                    ? "bg-amber-100 text-amber-600"
                                    : ""
                                    }`}
                                >
                                  <span>{sub.name}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${isThemedOpen ? 'rotate-180' : ''}`}
                                  />
                                </button>

                                {isThemedOpen && (
                                  <div className="pl-4 bg-gray-50">
                                    {sub.subLinks.map((themed) => (
                                      <Link
                                        key={themed.path}
                                        to={themed.path}
                                        className={`block px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 ${location.pathname === themed.path
                                          ? "bg-amber-100 text-amber-600"
                                          : ""
                                          }`}
                                        onClick={handleLinkClick}
                                      >
                                        {themed.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                to={sub.path}
                                className={`block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors duration-200 ${location.pathname === sub.path
                                  ? "bg-amber-100 text-amber-600"
                                  : ""
                                  }`}
                                onClick={handleLinkClick}
                              >
                                {sub.name}
                              </Link>
                            )}
                          </div>
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
                          className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-500 to-yellow-400 transform origin-left transition-transform duration-300 ${location.pathname === link.path
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                            }`}
                        ></span>
                        <span
                          className={`text-black hover:text-amber-600 transition-colors duration-200`}
                        >
                          {link.name}
                        </span>
                      </>
                    )}
                    {link.isButton && (
                      <span className="relative inline-flex items-center justify-center text-white font-semibold py-2 px-4  rounded-full hover:opacity-90 transition">
                        <span className="mr-2">{link.name}</span>
                        <Sparkles size={16} className="mr-1" />
                      </span>
                    )}
                  </Link>
                )}
              </div>
            ))}

            {/* CART ICON */}
            <div ref={cartRef} className="relative">
              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 text-black hover:text-amber-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* PROFILE ICON - DESKTOP */}
            <div ref={desktopProfileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-1 p-2 text-black hover:text-amber-600 transition-colors"
              >
                <User size={24} />
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-amber-500/20 overflow-hidden z-[9999]">
                  <Link
                    to="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    Profile
                  </Link>

                  <Link
                    to="/my-orders"
                    onClick={() => setIsProfileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    My Orders
                  </Link>

                  <button
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setIsProfileOpen(false);
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Mobile cart */}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/cart');
              }}
              className="relative p-2 text-black hover:text-amber-600"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile profile */}
            <div ref={mobileProfileRef} className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-2 text-black hover:text-amber-600"
              >
                <User size={24} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-2xl border border-amber-500/20 overflow-hidden z-[9999]">
                  <Link
                    to="/profile"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/my-orders"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen(false);
                      setIsOpen(false);
                    }}
                    className="block px-4 py-3 text-sm font-medium text-gray-800 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                  >
                    My Orders
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      setIsProfileOpen(false);
                      setIsOpen(false);
                      navigate("/login");
                    }}
                    className="w-full text-left px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={toggleMenu}
              className="p-2 text-black hover:text-amber-600"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <div className="pb-6 pt-2 space-y-3 bg-gray-100 rounded-2xl px-4 mt-2 shadow-inner">
            {navLinks.map((link, idx) => (
              <div key={link.path || link.name}>
                {link.subLinks ? (
                  <>
                    <button
                      onClick={() => setIsPartySuppliesOpen(!isPartySuppliesOpen)}
                      className={`w-full text-left block ${linkClasses(
                        "/party-supplies"
                      )} py-3 px-4 rounded-lg text-black hover:text-amber-600 hover:bg-amber-50`}
                      style={{ animationDelay: `${idx * 50}ms` }}
                    >
                      <span className="flex items-center justify-between">
                        {link.name}
                        <span
                          className={`transform transition-transform duration-300 ${isPartySuppliesOpen ? "rotate-180" : ""
                            }`}
                        >
                          ▼
                        </span>
                      </span>
                    </button>
                    {isPartySuppliesOpen && (
                      <div className="pl-4 space-y-2 mt-2">
                        {link.subLinks.map((sub) => (
                          <div key={sub.path}>
                            {sub.subLinks ? (
                              <>
                                <button
                                  onClick={() => setIsThemedOpen(!isThemedOpen)}
                                  className={`w-full text-left flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 rounded-lg ${location.pathname === sub.path
                                    ? "bg-amber-100 text-amber-600"
                                    : ""
                                    }`}
                                  style={{ animationDelay: `${(idx + 1) * 50}ms` }}
                                >
                                  <span>{sub.name}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`transition-transform duration-300 ${isThemedOpen ? 'rotate-180' : ''}`}
                                  />
                                </button>

                                {isThemedOpen && (
                                  <div className="pl-4 space-y-1 mt-1">
                                    {sub.subLinks.map((themed) => (
                                      <Link
                                        key={themed.path}
                                        to={themed.path}
                                        className={`block px-3 py-2 text-xs font-medium text-gray-700 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 rounded-lg ${location.pathname === themed.path
                                          ? "bg-amber-100 text-amber-600"
                                          : ""
                                          }`}
                                        onClick={handleLinkClick}
                                      >
                                        {themed.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                to={sub.path}
                                className={`block px-4 py-2 text-sm font-medium text-gray-800 hover:text-amber-600 hover:bg-amber-50 transition-colors duration-200 rounded-lg ${location.pathname === sub.path
                                  ? "bg-amber-100 text-amber-600"
                                  : ""
                                  }`}
                                onClick={handleLinkClick}
                                style={{ animationDelay: `${(idx + 1) * 50}ms` }}
                              >
                                {sub.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    className={`block ${linkClasses(link.path, link.isButton)} ${!link.isButton &&
                      "py-3 px-4 rounded-lg text-black hover:text-amber-600 hover:bg-amber-50"
                      }`}
                    onClick={handleLinkClick}
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    {link.isButton ? (
                      <span className="relative z-10 flex items-center justify-center space-x-2 text-white py-2 px-4 rounded-full">
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

            {/* Mobile Cart */}
            {isCartOpen && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cart</h3>
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Empty</p>
                ) : (
                  <>
                    <ul className="space-y-1 max-h-40 overflow-y-auto">
                      {cartItems.map((it) => (
                        <li
                          key={it.id}
                          className="flex justify-between text-sm text-gray-800"
                        >
                          <span>{it.name}</span>
                          <span className="flex items-center gap-2">
                            <span className="text-amber-600">₹{it.price}</span>
                            <span className="text-xs">×{it.qty}</span>
                            <button
                              onClick={() => removeFromCart(it.id)}
                              className="text-red-500"
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;