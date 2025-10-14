
import { useEffect, useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, Gift, Baby, PartyPopper, Calendar, ArrowRight } from 'lucide-react';


const HeroSection = () => {

  const images = [
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=600&fit=crop",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/birthday-cake-teddy-bear-vintage-suitecase-balloons-isolated-white-background.jpg?updatedAt=1760440645977",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/new-years-eve-party-decoration.jpg?updatedAt=1760440646512",
    "https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/photorealistic-wedding-venue-with-intricate-decor-ornaments.jpg?updatedAt=1760440650784"
  ];


  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);


  return (
    <section id="home" className="relative bg-gradient-to-br from-red-200 to-yellow-200 py-16 md:py-28">
      <div className="mx-auto px-6 sm:px-6 lg:px-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="bg-yellow-400 text-red-700 px-4 py-2 rounded-full text-sm font-bold">
                ✨ Premium Decoration Services
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-red-700 leading-tight">
              Transform Your <span className="text-yellow-500">Special Moments</span> Into Memories
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed">
              Professional decoration services for birthdays, anniversaries, baby showers, and every celebration that matters. We bring your vision to life!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-700 transition duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2">
                <span>Book Your Decor</span>
                <ArrowRight size={20} />
              </button>
              <button className="bg-yellow-400 text-red-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-500 transition duration-300 shadow-lg hover:shadow-xl">
                View Gallery
              </button>
            </div>
            <div className="flex items-center space-x-8 pt-6">
              <div>
                <p className="text-3xl font-bold text-red-700">500+</p>
                <p className="text-gray-600">Happy Events</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-700">50+</p>
                <p className="text-gray-600">Themes Available</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-red-700">4.9★</p>
                <p className="text-gray-600">Customer Rating</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-red-600 rounded-3xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition duration-500">
              <img
                src={images[currentIndex]}
                alt="Event Decoration"
                className="rounded-2xl w-full h-96 object-cover transition-all duration-700 ease-in-out"
              />

            </div>
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-red-700 p-6 rounded-2xl shadow-xl ml-2">
              <p className="text-xl font-bold">🎉 Same Day</p>
              <p className="font-semibold text-sm">Delivery Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default HeroSection;