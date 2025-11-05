import { useState, useEffect } from "react";
import { RotateCcw } from "lucide-react";

const RefundPolicy = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1600&q=80"
            alt="Refund"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="relative z-10 text-center space-y-4 container mx-auto px-4">
          <RotateCcw className="mx-auto text-yellow-400" size={48} />
          <h1
            className={`text-5xl font-extrabold transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            Refund & Cancellation Policy
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Transparency is our top priority when it comes to refunds or
            cancellations.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-8 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Cancellation Policy
          </h2>
          <p className="text-gray-300">
            Cancellations must be requested at least 72 hours before the
            scheduled event to qualify for partial refunds.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Refund Eligibility
          </h2>
          <p className="text-gray-300">
            Refunds are issued only if the cancellation request meets our
            timeline and if services have not yet been executed.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Non-Refundable Items
          </h2>
          <p className="text-gray-300">
            Booking fees, advance deposits, and materials already purchased are
            non-refundable.
          </p>
        </section>
      </div>
    </div>
  );
};

export default RefundPolicy;
