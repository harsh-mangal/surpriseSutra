import { useState, useEffect } from "react";
import { Truck } from "lucide-react";

const ShippingPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
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
            Shipping Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            We ensure safe and timely delivery of all decorative materials.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-8 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Delivery Areas
          </h2>
          <p className="text-gray-300">
            We currently serve across Delhi, Noida, Gurgaon, Ghaziabad, and
            Faridabad regions.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Delivery Time
          </h2>
          <p className="text-gray-300">
            Orders are processed within 24 hours and delivered within 2–5
            business days based on location and customization.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Delays
          </h2>
          <p className="text-gray-300">
            Unexpected weather or logistical issues may cause minor delays. Our
            team will keep you informed in such cases.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ShippingPolicy;
