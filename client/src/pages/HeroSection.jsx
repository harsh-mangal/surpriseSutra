import { useEffect, useState } from "react";
import { Star, Sparkles, Heart, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BirthdayCake from "../assest/birthday-cake.webp";
import HeroImage from "../assest/HeroSection.webp";
import OurStory from "../assest/OurStory.webp";

const HeroSection = () => {
  const images = [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
    BirthdayCake,
    HeroImage,
    OurStory,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % images.length);
    }, 3200); // slightly faster, feels snappier
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section id="home" className="relative bg-white py-10 md:py-16 overflow-hidden">
      {/* subtle sparkle */}
      <div className="absolute bottom-24 right-16 animate-pulse">
        <Sparkles className="text-rose-400 opacity-30" size={18} />
      </div>

      <div className="relative mx-auto px-5 sm:px-6 lg:px-14">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
              <span className="bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Transform Your{" "}
              </span>
              <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent italic">
                Special Moments
              </span>{" "}
              <span className="bg-gradient-to-r from-red-700 via-rose-600 to-amber-600 bg-clip-text text-transparent">
                Into Timeless Memories
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed font-light max-w-xl">
              Premium decoration services for birthdays, anniversaries, baby showers, and more.
              We craft bespoke experiences tailored to your vision.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => navigate("/diy-kits")}
                className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-7 py-3 rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-[1.03]"
              >
                <span>Shop Products</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => navigate("/services")}
                className="group bg-white text-red-700 px-7 py-3 rounded-full font-semibold text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-300 border border-amber-200 hover:scale-[1.03] flex items-center justify-center gap-2"
              >
                <span>Explore Services</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-4 pt-5">
              <div className="text-center">
                <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent">
                  2500+
                </p>
                <p className="text-gray-500 text-xs font-medium mt-1">Events</p>
              </div>

              <div className="text-center border-x border-amber-200">
                <p className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
                  50+
                </p>
                <p className="text-gray-500 text-xs font-medium mt-1">Themes</p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-3xl font-bold bg-gradient-to-r from-red-600 to-amber-500 bg-clip-text text-transparent">
                    4.9
                  </p>
                  <Star className="text-amber-400 fill-amber-400" size={18} />
                </div>
                <p className="text-gray-500 text-xs font-medium mt-1">Rating</p>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative">
            {/* image card (smaller + sharper) */}
            <div className="relative bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 rounded-2xl p-[2px] shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="bg-white rounded-2xl p-2">
                <img
                  src={images[currentIndex]}
                  alt="Event Decoration"
                  className="rounded-xl w-full h-80 md:h-88 object-cover shadow-md transition-all duration-700 ease-in-out"
                />
              </div>
            </div>

            {/* badge smaller */}
            <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-amber-400 to-yellow-300 text-red-800 p-4 rounded-xl shadow-xl border-2 border-white hover:scale-105 transition-transform duration-300">
              <div className="flex items-center gap-2">
                <Sparkles className="text-red-700" size={18} />
                <div>
                  <p className="text-sm font-bold leading-tight">Same Day Service</p>
                  <p className="text-[12px] font-medium opacity-90">Available Now</p>
                </div>
              </div>
            </div>

            {/* heart smaller */}
            <div className="absolute -top-3 -right-3 bg-gradient-to-br from-rose-400 to-pink-400 rounded-full p-3 shadow-lg border-2 border-white">
              <Heart className="text-white fill-white" size={18} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
