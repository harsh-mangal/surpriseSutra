import { useState, useEffect } from "react";
import { Shield, Lock } from "lucide-react";

const PrivacyPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=1600&q=80"
            alt="Privacy"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="relative z-10 text-center space-y-4 container mx-auto px-4">
          <Lock className="mx-auto text-yellow-400" size={48} />
          <h1
            className={`text-5xl font-extrabold transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We value your privacy and are committed to protecting your personal
            information.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12 space-y-8 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Information We Collect
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We collect personal details such as your name, email address, phone
            number, and event preferences to provide you the best experience.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            How We Use Your Data
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Your data is used strictly for communication, bookings, and
            service-related updates. We do not share your data with third
            parties.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Security Measures
          </h2>
          <p className="text-gray-300 leading-relaxed">
            We use SSL encryption and other advanced security measures to keep
            your information safe at all times.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Contact Us
          </h2>
          <p className="text-gray-300 leading-relaxed">
            For any questions about our Privacy Policy, reach us at{" "}
            <span className="text-yellow-400 font-semibold">
              info@surprisesutra.com
            </span>
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
