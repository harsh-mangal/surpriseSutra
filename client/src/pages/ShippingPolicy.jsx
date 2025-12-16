import { useState, useEffect } from "react";
import { Truck } from "lucide-react";

const ShippingPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* HERO */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80"
            alt="Shipping"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="relative z-10 text-center space-y-4 container mx-auto px-4">
          <Truck className="mx-auto text-yellow-400" size={48} />
          <h1
            className={`text-5xl font-extrabold transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            Shipping & Service Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Clear delivery and service coverage for our products and decoration services
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-6 py-12 space-y-10 max-w-4xl">
        {/* PRODUCTS */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Product Delivery (PAN India)
          </h2>
          <p className="text-gray-300">
            All physical products available on our website are eligible for
            <span className="text-white font-semibold"> PAN India delivery</span>.
            We ship to all major cities and towns across India through trusted
            logistics partners to ensure safe and timely delivery.
          </p>
        </section>

        {/* SERVICES */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Decoration Services (Limited Locations)
          </h2>
          <p className="text-gray-300">
            Our decoration and event setup services are currently available only
            in the following regions:
          </p>
          <p className="text-gray-200 mt-2 font-medium">
            Delhi • Noida • Gurgaon • Ghaziabad • Faridabad
          </p>
        </section>

        {/* DELIVERY TIME */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Delivery Time
          </h2>
          <p className="text-gray-300">
            Orders are typically processed within 24 hours. Product delivery
            timelines may range between <span className="text-white font-semibold">2–5 business days</span>,
            depending on location, product availability, and customization requirements.
          </p>
        </section>

        {/* DELAYS */}
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Delays & Exceptions
          </h2>
          <p className="text-gray-300">
            While we strive for timely fulfillment, unforeseen circumstances such
            as weather conditions, regional restrictions, or logistical challenges
            may cause minor delays. In such cases, our support team will keep you
            informed proactively.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
