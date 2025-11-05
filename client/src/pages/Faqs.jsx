import { useState, useEffect } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

const faqsData = [
  {
    question: "What is Surprise Sutra?",
    answer:
      "Surprise Sutra is a creative event styling and decoration brand specializing in birthdays, anniversaries, weddings, and corporate events. We craft experiences that make every celebration truly magical.",
  },
  {
    question: "How can I book a decoration service?",
    answer:
      "You can book directly through our website contact form or by calling us at +91 9876543210. Our team will confirm your requirements and share design ideas before finalizing the booking.",
  },
  {
    question: "Do you provide custom themes?",
    answer:
      "Absolutely! We specialize in personalized themes tailored to your preferences, venue size, and budget. From romantic setups to kids’ parties — we’ve got you covered.",
  },
  {
    question: "How far in advance should I book?",
    answer:
      "We recommend booking at least 7–10 days before your event. However, for larger events or weddings, a 3–4 week lead time helps ensure every detail is perfect.",
  },
  {
    question: "What are your payment options?",
    answer:
      "We accept UPI, bank transfers, and major credit/debit cards. A small advance confirms your booking, and the remaining payment is due before event day.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Currently, we provide decoration services in Delhi, Noida, Gurgaon, Ghaziabad, and Faridabad.",
  },
  {
    question: "What if I need to cancel my booking?",
    answer:
      "Cancellations can be made up to 72 hours before your event. Please check our Refund & Cancellation Policy page for detailed terms.",
  },
];

const Faqs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  useEffect(() => setIsVisible(true), []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Hero Section */}
      <div className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1600&q=80"
            alt="FAQ"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="relative z-10 text-center space-y-4 container mx-auto px-4">
          <HelpCircle className="mx-auto text-yellow-400" size={48} />
          <h1
            className={`text-5xl font-extrabold transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            Frequently Asked Questions
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Have questions about our services? We’ve got answers!
          </p>
        </div>
      </div>

      {/* FAQ List */}
      <div className="container mx-auto px-6 py-12 max-w-4xl space-y-4">
        {faqsData.map((faq, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex justify-between items-center p-5 md:p-6 text-left focus:outline-none"
            >
              <span className="font-semibold text-lg md:text-xl text-yellow-300">
                {faq.question}
              </span>
              {openIndex === index ? (
                <ChevronUp className="text-yellow-400" size={24} />
              ) : (
                <ChevronDown className="text-yellow-400" size={24} />
              )}
            </button>

            {openIndex === index && (
              <div className="px-5 md:px-6 pb-5 md:pb-6 text-gray-300 border-t border-white/10 animate-fadeIn">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
