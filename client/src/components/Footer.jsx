import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-black py-16 border-t border-gray-200">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 md:gap-12 justify-between">
        {/* Left Column - Logo & Description */}
        <div className="flex-1 flex flex-col space-y-6 pl-2">
          <div className="flex items-center space-x-3">
            <img
              src="https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/ChatGPT_Image_Oct_14__2025__05_14_06_PM-removebg-preview.png?updatedAt=1760442286996"
              alt="Surprise Sutra Logo"
              className="w-42 h-28 object-contain ml-2"
            />
          </div>
          <p className="text-gray-700 leading-relaxed">
            Indulge in the ultimate relaxation experience with{" "}
            <span className="font-semibold text-amber-600">Surprise Sutra</span>.
            Our premium services are designed to rejuvenate your mind and body.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-2">
            {[
              { href: "https://www.facebook.com", icon: <Facebook size={24} /> },
              {
                href: "https://www.instagram.com/surprisesutra?igsh=ZTljOGh1M2ZiYXdh",
                icon: <Instagram size={24} />,
              },
              { href: "https://www.twitter.com", icon: <Twitter size={24} /> },
              { href: "https://www.youtube.com", icon: <Youtube size={24} /> },
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 text-white p-3 rounded-full hover:scale-110 hover:bg-amber-600 transition-transform shadow-md"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Center Column - Quick Links */}
        <div className="flex-1 flex flex-col space-y-3">
          <h3 className="text-xl font-bold text-amber-600 mb-2">Quick Links</h3>
          {[
            { name: "Home", path: "/" },
            { name: "About", path: "/about-us" },
            { name: "Services", path: "/services" },
            { name: "Gallery", path: "/gallery" },
            { name: "Contact", path: "/contact" },
          ].map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="relative group w-max text-gray-700 hover:text-amber-600 transition duration-300"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-amber-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Right Column - Address & Map */}
        <div className="flex-1 flex flex-col space-y-4 pr-2">
          <h3 className="text-xl font-bold text-amber-600 mb-2">Our Location</h3>
          <p className="text-gray-700">First Floor/D-32/New Multan Nagar</p>
          <p className="text-gray-700">Delhi, India</p>
          <div className="mt-2 h-48 rounded-2xl overflow-hidden shadow-lg border border-gray-300">
            <iframe
              title="Surprise Sutra Location"
              src="https://www.google.com/maps?q=First+Floor/D-32/New+Multan+Nagar,Delhi&output=embed"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-12 border-t border-gray-200 pt-6 text-center text-gray-600">
        &copy; {new Date().getFullYear()}{" "}
        <span className="text-amber-600 font-semibold">Dodun Soft Solutions</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
