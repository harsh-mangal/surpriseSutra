import { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { useLocation } from "react-router-dom";

const QuickQuoteSection = () => {
  const location = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    occasion: "",
    date: "",
    message: "",
  });

  // ✅ Prefill the occasion from navigation state
  useEffect(() => {
    if (location.state?.occasion) {
      setFormData((prev) => ({
        ...prev,
        occasion: location.state.occasion,
      }));
    }
  }, [location.state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you! We will contact you soon.");
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 ">
      <div className="max-w-7xl mx-auto ">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="md:w-1/2 p-8 md:p-12 bg-gradient-to-br from-yellow-100 to-red-100 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
              Get Your <span className="text-yellow-500">Free Quote</span>
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Tell us about your event and we'll create magic! From birthdays to
              anniversaries, we make your special moments unforgettable.
            </p>

            <div className="space-y-6 mt-6">
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 p-4 rounded-full">
                  <Phone className="text-red-700" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Call Us Now</p>
                  <p className="font-bold text-red-700 text-lg">
                    +91 9999416896
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 p-4 rounded-full">
                  <Mail className="text-red-700" size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email Us</p>
                  <p className="font-bold text-red-700 text-lg">
                    surprisesutra@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="md:w-1/2 p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg"
                required
              />

              {/* Occasion Dropdown (auto-selects if state passed) */}
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg text-gray-700"
                required
              >
                <option value="">Select Occasion</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Baby Shower">Baby Shower</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Engagement">Engagement</option>
                <option value="Corporate Event">Corporate Event</option>
                <option value="Custom Events">Custom Events</option>
              </select>

              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows="4"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-300 focus:border-red-600 focus:outline-none text-lg resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-xl hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Get Free Quote Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickQuoteSection;
