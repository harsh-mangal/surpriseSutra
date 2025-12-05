import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from '../assest/surprisesutralogopng.webp';

const Footer = () => {
  const year = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Gallery", path: "/gallery" },
    { name: "Gifts", path: "/gifts" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  const partySupplies = [
    { name: "DIY Kits", path: "/diy-kits" },
    { name: "Customized Party Supplies", path: "/party-supplies/customized" },
  ];

  const themedSupplies = [
    { name: "Anniversary", path: "/party-supplies/themed/anniversary" },
    { name: "Baby Shower", path: "/party-supplies/themed/baby-shower" },
    { name: "Baby Welcome", path: "/party-supplies/themed/baby-welcome" },
    {
      name: "Bachelor / Bachelorette",
      path: "/party-supplies/themed/bachelor",
    },
    { name: "Birthday", path: "/party-supplies/themed/birthday" },
    {
      name: "Farewell & Retirement",
      path: "/party-supplies/themed/farewell-retirement",
    },
  ];

  const policies = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms & Conditions", path: "/terms-and-conditions" },
    { name: "Refund / Cancellation Policy", path: "/refund-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "FAQs", path: "/faqs" },
  ];

  const socials = [
    { href: "https://www.facebook.com", icon: <Facebook size={20} /> },
    {
      href: "https://www.instagram.com/surprisesutra?igsh=ZTljOGh1M2ZiYXdh",
      icon: <Instagram size={20} />,
    },
    { href: "https://www.twitter.com", icon: <Twitter size={20} /> },
    { href: "https://www.youtube.com", icon: <Youtube size={20} /> },
  ];

  return (
    <footer className="w-full bg-gray-50 text-gray-800 py-16 border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-16 grid grid-cols-1 md:grid-cols-5 gap-12">
        {/* Brand + Social */}
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <img
              src={Logo}
              alt="Surprise Sutra Logo"
              className="w-40 h-auto object-contain"
            />
          </div>
          <p className="text-gray-700 leading-relaxed mb-6">
            Discover joy and elegance with{" "}
            <span className="font-semibold text-amber-600">Surprise Sutra</span>
            . Your one-stop destination for personalized gifts, themed parties,
            and unforgettable surprises.
          </p>
          <div className="flex space-x-3">
            {socials.map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-2.5 rounded-full hover:scale-110 transition-transform duration-300 shadow-md"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="relative group text-gray-700 hover:text-amber-600 transition duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Party Supplies */}
        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">
            Party Supplies
          </h3>
          <ul className="space-y-2">
            {partySupplies.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="relative group text-gray-700 hover:text-amber-600 transition duration-300"
                >
                  {link.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          <h4 className="text-lg font-semibold text-gray-800 mt-6 mb-3">
            Themed Parties
          </h4>
          <ul className="space-y-2">
            {themedSupplies.map((theme) => (
              <li key={theme.path}>
                <Link
                  to={theme.path}
                  className="text-gray-700 hover:text-amber-600 transition duration-300 text-sm relative group"
                >
                  {theme.name}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">
            Important Links
          </h3>
          <ul className="space-y-2">
            {policies.map((policy) => (
              <li key={policy.path}>
                <Link
                  to={policy.path}
                  className="relative group text-gray-700 hover:text-amber-600 transition duration-300"
                >
                  {policy.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Info */}
        <div>
          <h3 className="text-xl font-bold text-amber-600 mb-4">
            Get In Touch
          </h3>

          <p className="text-gray-700 mb-3">
            📞{" "}
            <a href="tel:+919876543210" className="hover:text-amber-600">
              +91 98765 43210
            </a>
          </p>
          <p className="text-gray-700">
            📧{" "}
            <a
              href="mailto:info@surprisesutra.com"
              className="hover:text-amber-600"
            >
              info@surprisesutra.com
            </a>
          </p>

          <div className="mt-6">
            <Link
              to="/contact"
              className="inline-block px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-amber-500 to-yellow-400 text-gray-900 shadow-md hover:scale-105 transition-transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-600 text-sm">
        © {year}{" "}
        <span className="text-amber-600 font-semibold">
          Dodun Soft Solutions
        </span>
        . All rights reserved. |{" "}
        <Link
          to="/privacy-policy"
          className="hover:text-amber-600 transition-colors"
        >
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          to="/terms-and-conditions"
          className="hover:text-amber-600 transition-colors"
        >
          Terms
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
