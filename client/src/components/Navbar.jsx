import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle scroll effect for premium navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Define all navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about-us' },
    { name: 'Services', path: '/services' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact', isButton: true },
  ];

  const linkClasses = (path, isButton = false) =>
    isButton
      ? `group relative px-8 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden ${
          location.pathname === path
            ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-gray-900 shadow-lg shadow-amber-500/50'
            : 'bg-gradient-to-r from-red-600 to-rose-600 text-white hover:shadow-xl hover:shadow-red-500/50 hover:scale-105'
        }`
      : `relative font-semibold text-base transition-all duration-300 group ${
          location.pathname === path
            ? 'text-transparent bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text'
            : 'text-gray-300 hover:text-white'
        }`;

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl' 
          : 'bg-gradient-to-r from-gray-900 via-black to-gray-900 shadow-lg'
      }`}
    >
      {/* Premium gradient border */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24 lg:h-28">
          {/* Logo with premium hover effect */}
          <div 
            className="flex-shrink-0 cursor-pointer group relative"
            onClick={() => navigate('/')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/ChatGPT_Image_Oct_14__2025__05_14_06_PM-removebg-preview.png?updatedAt=1760442286996"
              alt="Surprise Sutra Logo"
              className="relative h-20 lg:h-24 w-auto p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={linkClasses(link.path, link.isButton)}
              >
                {!link.isButton && (
                  <>
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-amber-400 to-yellow-400 transform origin-left transition-transform duration-300 ${
                      location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}></span>
                    {link.name}
                  </>
                )}
                {link.isButton && (
                  <>
                    <span className="relative z-10 flex items-center space-x-2">
                      <span>{link.name}</span>
                      <Sparkles size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
                  </>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="relative p-2 text-gray-300 hover:text-amber-400 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {isOpen ? (
                  <X size={28} className="transform rotate-90 transition-transform duration-300" />
                ) : (
                  <Menu size={28} className="transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with premium slide animation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-6 pt-2 space-y-3 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm rounded-2xl px-4 mt-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block ${linkClasses(link.path, link.isButton)} ${
                  !link.isButton && 'py-3 px-4 rounded-lg hover:bg-gray-800/50'
                }`}
                onClick={handleLinkClick}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
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
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;