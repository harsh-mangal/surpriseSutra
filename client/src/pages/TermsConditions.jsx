import { useState, useEffect } from "react";
import { FileText, CheckCircle } from "lucide-react";

const TermsConditions = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1600&q=80"
            alt="Terms"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="relative z-10 text-center space-y-4 container mx-auto px-4">
          <FileText className="mx-auto text-yellow-400" size={48} />
          <h1
            className={`text-5xl font-extrabold transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            Terms & Conditions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            By using our services, you agree to abide by these terms.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-8 max-w-4xl">
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Service Usage
          </h2>
          <p className="text-gray-300">
            You agree to provide accurate information and cooperate with our
            team for event planning and execution.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Intellectual Property
          </h2>
          <p className="text-gray-300">
            All content, designs, and materials are owned by Surprise Sutra and
            protected under applicable copyright laws.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Limitation of Liability
          </h2>
          <p className="text-gray-300">
            We are not responsible for delays or failures caused by factors
            beyond our control such as natural disasters or third-party
            disruptions.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-yellow-400 mb-3">
            Acceptance of Terms
          </h2>
          <p className="text-gray-300">
            By booking with us, you acknowledge and accept these terms and
            conditions in full.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;
