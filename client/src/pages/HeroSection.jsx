import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Gift,
  Baby,
  PartyPopper,
  Calendar,
  ArrowRight,
} from "lucide-react";

const HeroSection = () => {
  const images = [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/birthday-cake-teddy-bear-vintage-suitecase-balloons-isolated-white-background.jpg?updatedAt=1760440645977",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/new-years-eve-party-decoration.jpg?updatedAt=1760440646512",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/photorealistic-wedding-venue-with-intricate-decor-ornaments.jpg?updatedAt=1760440650784",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-rose-50 via-amber-50 to-pink-50 py-12 md:py-24 overflow-hidden"
    >
      {/* Luxury gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,215,0,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(220,38,38,0.08),transparent_50%)]"></div>

      {/* Subtle animated sparkles */}

      <div className="absolute bottom-32 right-20 animate-pulse delay-1000">
        <Sparkles className="text-rose-400 opacity-40" size={20} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 sm:px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 bg-clip-text text-transparent leading-tight tracking-tight">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent italic">
                Special Moments
              </span>{" "}
              Into Timeless Memories
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed font-light max-w-xl">
              Exquisite decoration services for birthdays, anniversaries, baby
              showers, and every celebration that deserves perfection. We craft
              bespoke experiences tailored to your vision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 shadow-xl flex items-center justify-center space-x-2 hover:scale-105">
                <span>Book Your Experience</span>
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
              <button className="bg-white text-red-700 px-10 py-4 rounded-full font-semibold text-lg hover:bg-gradient-to-r hover:from-amber-50 hover:to-yellow-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-amber-200 hover:scale-105">
                View Gallery
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                  500+
                </p>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  Luxury Events
                </p>
              </div>
              <div className="text-center border-x border-amber-200">
                <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  50+
                </p>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  Bespoke Themes
                </p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1">
                  <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                    4.9
                  </p>
                  <Star className="text-amber-400 fill-amber-400" size={20} />
                </div>
                <p className="text-gray-500 text-sm font-medium mt-1">
                  Client Rating
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Main image container with luxury styling */}
            <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 rounded-3xl p-1 shadow-2xl transform hover:scale-105 transition-all duration-700">
              <div className="bg-white rounded-3xl p-3">
                <img
                  src={images[currentIndex]}
                  alt="Luxury Event Decoration"
                  className="rounded-2xl w-full h-96 object-cover transition-all duration-700 ease-in-out shadow-lg"
                />
              </div>
            </div>

            {/* Floating badge with enhanced design */}
            <div className="absolute -bottom-8 -left-8 bg-gradient-to-br from-amber-400 to-yellow-300 text-red-800 p-6 rounded-2xl shadow-2xl border-4 border-white backdrop-blur-sm hover:scale-110 transition-transform duration-300">
              <div className="flex items-center space-x-2">
                <Sparkles className="text-red-700" size={24} />
                <div>
                  <p className="text-xl font-bold">Same Day Service</p>
                  <p className="font-medium text-sm opacity-90">
                    Available Now
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full p-4 shadow-xl border-4 border-white animate-bounce">
              <Heart className="text-white fill-white" size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
