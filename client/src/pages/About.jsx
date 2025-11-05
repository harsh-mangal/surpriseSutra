import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Heart,
  Sparkles,
  Award,
  CheckCircle,
  Target,
  Shield,
} from "lucide-react";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <>
      {/* ===== Hero / Top Banner ===== */}
      <div className="relative text-white py-16 md:py-24 overflow-hidden bg-black">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&h=800&fit=crop"
            alt="Celebration Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        {/* Dark + accent overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/20 via-transparent to-yellow-400/10 mix-blend-overlay" />

        {/* Subtle starry pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div
            className={`text-center space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Badge */}
            <div className="inline-block">
              <span className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm md:text-base font-bold shadow-lg inline-flex items-center space-x-2">
                <Sparkles size={20} className="animate-pulse" />
                <span>About Surprise Sutra</span>
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
              <span className="block text-white">Creating Magical</span>
              <span className="block text-yellow-300">Moments Since 2023</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 leading-relaxed">
              Transforming celebrations into cherished memories with creativity,
              passion, and perfection.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 max-w-4xl mx-auto">
              {[
                { number: "500+", label: "Events Done" },
                { number: "50+", label: "Themes" },
                { number: "5+", label: "Cities" },
                { number: "4.9★", label: "Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-white/15 transition-all duration-300 border border-white/10"
                >
                  <p className="text-3xl md:text-4xl font-bold text-yellow-300">
                    {stat.number}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-gray-300">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== Main Content Section ===== */}
      <section className="bg-neutral-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-20 relative z-10">
          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="inline-block">
                <span className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  Our Journey
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                <span className="text-white">Our </span>
                <span className="text-yellow-400">Story</span>
              </h2>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Surprise Sutra was born from a passion for turning life's most
                precious moments into unforgettable experiences. From intimate
                birthdays to grand weddings, our creative team ensures every
                decoration reflects joy, love, and beauty.
              </p>

              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                What began as a small dream has blossomed into one of
                Delhi-NCR's most trusted event styling brands — where every
                detail matters and every celebration becomes a masterpiece.
              </p>

              {/* Key Features */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  "Quality Materials",
                  "On-Time Setup",
                  "Custom Designs",
                  "Expert Team",
                ].map((label, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all border border-white/10"
                  >
                    <CheckCircle
                      className="text-yellow-400 flex-shrink-0"
                      size={24}
                    />
                    <span className="text-sm md:text-base font-semibold text-gray-200">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative order-1 lg:order-2">
              <div className="relative group">
                {/* Glow */}
                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-3xl blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-500" />

                {/* Image */}
                <div className="relative bg-gradient-to-br from-red-700 to-red-800 rounded-3xl p-3 md:p-4 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border border-red-500/30">
                  <img
                    src="https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/photorealistic-wedding-venue-with-intricate-decor-ornaments.jpg?updatedAt=1760440650784"
                    alt="Our Story"
                    className="rounded-2xl w-full h-64 md:h-96 lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 rounded-2xl" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-4 md:p-6 rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-300 border border-yellow-400/40">
                  <div className="flex items-center space-x-2">
                    <Award className="text-yellow-500" size={32} />
                    <div>
                      <p className="text-xs text-gray-600">Trusted by</p>
                      <p className="text-lg md:text-xl font-bold text-red-700">
                        500+ Clients
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission / Promise / Values */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-yellow-500/15 to-transparent text-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-yellow-400/30">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Target className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
                Our Mission
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-200">
                To craft stunning, personalized decorations that make your
                dreams come true — from concept to execution with creativity and
                passion.
              </p>
            </div>

            {/* Promise */}
            <div className="bg-gradient-to-br from-red-600/25 to-transparent text-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-red-500/30">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Shield className="text-yellow-400" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
                Our Promise
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-200">
                We promise creativity, punctuality, and professionalism in every
                event we design. Your happiness is our true success measure.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-yellow-600/20 to-transparent text-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 border border-yellow-500/30">
              <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Heart className="text-red-500" size={32} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300">
                Our Values
              </h3>
              <p className="text-base md:text-lg leading-relaxed text-gray-200">
                Celebrations are the heartbeat of life. We believe in creating
                magical moments that bring joy, love, and lasting memories.
              </p>
            </div>
          </div>

          {/* Contact & Service Area */}
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Heading */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-3">
                <Heart className="text-red-500 w-6 h-6" />
                <h3 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500">
                  Get in Touch
                </h3>
              </div>
              <p className="text-gray-600 text-base sm:text-lg">
                We’re here to help you bring your celebrations to life 🎉
              </p>
            </div>

            {/* 3 Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Phone Card */}
              <div className="bg-white border border-yellow-200 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-4 rounded-2xl shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Call Us</h4>
                  <p className="text-gray-500 text-sm">Available Mon–Sat</p>
                  <p className="text-lg font-semibold text-red-600 hover:text-yellow-500 transition">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white border border-yellow-200 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-4 rounded-2xl shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">Email Us</h4>
                  <p className="text-gray-500 text-sm">
                    We respond within 24 hrs
                  </p>
                  <p className="text-lg font-semibold text-red-600 hover:text-yellow-500 transition">
                    info@surprisesutra.com
                  </p>
                </div>
              </div>

              {/* Service Area Card */}
              <div className="relative bg-gradient-to-r from-yellow-50 via-white to-red-50 border border-yellow-300 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/30 via-transparent to-red-100/20 pointer-events-none rounded-3xl" />
                <div className="relative flex flex-col items-center text-center space-y-3">
                  <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-4 rounded-2xl shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Service Areas
                  </h4>
                  <p className="text-gray-600 text-sm">We proudly serve:</p>
                  <p className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-yellow-500">
                    Delhi • Noida • Gurgaon <br />
                    Ghaziabad • Faridabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
