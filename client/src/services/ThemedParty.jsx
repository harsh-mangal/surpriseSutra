import React, { useState } from 'react';
import { Gift, Calendar, Baby, Heart, Cake, Users, Sparkles, Star, ArrowRight, Package, CheckCircle, PartyPopper, Zap } from 'lucide-react';

export default function ThemedPartySupplies() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const partyTypes = [
    {
      id: 1,
      title: "Anniversary",
      icon: Heart,
      gradient: "from-rose-500 to-pink-600",
      description: "Celebrate your love story with elegant decorations and romantic themes.",
      features: ["Romantic Backdrops", "Table Settings", "Photo Props"],
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80"
    },
    {
      id: 2,
      title: "Baby Shower",
      icon: Baby,
      gradient: "from-blue-400 to-cyan-500",
      description: "Welcome the little one with adorable and heartwarming decorations.",
      features: ["Gender Reveal Sets", "Games & Activities", "Party Favors"],
      image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&q=80"
    },
    {
      id: 3,
      title: "Baby Welcome",
      icon: Gift,
      gradient: "from-amber-400 to-orange-500",
      description: "Create magical moments for your newborn's first celebration.",
      features: ["Welcome Signs", "Balloon Arrangements", "Photo Booth Props"],
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=800&q=80"
    },
    {
      id: 4,
      title: "Bachelor/Bachelorette",
      icon: Sparkles,
      gradient: "from-purple-500 to-pink-600",
      description: "Make the last fling before the ring unforgettable and fun.",
      features: ["Party Props", "Sashes & Accessories", "Games"],
      image: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&q=80"
    },
    {
      id: 5,
      title: "Birthday",
      icon: Cake,
      gradient: "from-green-400 to-emerald-600",
      description: "From 1 to 100, we make every birthday celebration special.",
      features: ["Balloon Bouquets", "Cake Toppers", "Party Hats & Crowns"],
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
    },
    {
      id: 6,
      title: "Farewell/Retirement",
      icon: Users,
      gradient: "from-indigo-500 to-blue-600",
      description: "Honor achievements and new beginnings with style.",
      features: ["Memory Books", "Achievement Awards", "Elegant Decorations"],
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80"
    }
  ];

  const features = [
    { icon: Package, title: "Premium Quality", desc: "Top-grade materials for lasting memories." },
    { icon: Sparkles, title: "Unique Designs", desc: "Exclusive themes you won't find elsewhere." },
    { icon: CheckCircle, title: "Complete Packages", desc: "Everything you need in one place." }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wLTEyaC0xMnYxMmgxMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Floating decoration elements */}
        <div className="absolute inset-0 pointer-events-none">
          <PartyPopper className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 text-white opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Sparkles className="absolute top-16 right-16 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <Star className="absolute bottom-16 left-1/4 w-6 h-6 sm:w-10 sm:h-10 text-white opacity-20 animate-spin" style={{ animationDuration: '10s' }} />
          <Gift className="absolute bottom-20 right-1/4 w-8 h-8 sm:w-14 sm:h-14 text-rose-200 opacity-25 animate-bounce" style={{ animationDelay: '1.2s' }} />
        </div>
        
        <div className="relative max-w-screen-2xl mx-auto px-4 py-12 sm:py-20 lg:py-28">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 shadow-lg">
                <Calendar className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white">
              Themed Party Supplies
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white font-medium max-w-3xl mx-auto">
              🎉 Transform your celebrations into unforgettable moments with our premium party supplies.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Explore party supplies"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-yellow-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                Explore Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                aria-label="Get a free quote"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Free Quote
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto'>

      {/* Features Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
            Why Choose Us?
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-rose-600 to-yellow-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-rose-200"
              >
                <div className="bg-gradient-to-br from-rose-500 to-yellow-500 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-md">
                  <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base text-center">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Party Types Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            Every Occasion, Perfectly Styled
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-rose-600 to-yellow-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto font-medium">
            Discover our curated collections for life's most memorable moments. ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {partyTypes.map((party) => {
            const Icon = party.icon;
            return (
              <div
                key={party.id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-rose-200"
                onMouseEnter={() => setHoveredCard(party.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={party.image}
                    alt={party.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Icon Badge */}
                  <div
                    className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${party.gradient} flex items-center justify-center shadow-md transform transition-all group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">{party.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{party.description}</p>
                  <div className="space-y-2 mb-4 sm:mb-6">
                    {party.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    aria-label={`View ${party.title} collection`}
                    className={`w-full py-2 sm:py-3 rounded-xl font-semibold text-white text-base sm:text-lg bg-gradient-to-r ${party.gradient} transition-all hover:shadow-md hover:scale-105 flex items-center justify-center gap-2`}
                  >
                    View Collection
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="relative bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500 rounded-2xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
          
          {/* Floating Elements */}
          <Sparkles className="absolute top-8 sm:top-12 left-8 sm:left-12 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <PartyPopper className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-10 h-10 sm:w-16 sm:h-16 text-white opacity-30 animate-bounce" />
          
          <div className="relative px-4 sm:px-8 py-12 sm:py-16 text-center text-white">
            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-lg">
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to Create <span className="text-yellow-200">Magic?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto font-medium leading-relaxed">
              Design the perfect celebration with our premium themed party supplies! 🎈✨
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Get started with party supplies"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-yellow-200"
              >
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />
                Get Started Now
              </button>
              <button
                aria-label="Contact us for party supplies"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us Today
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: "10K+", label: "Happy Customers" },
            { number: "500+", label: "Party Themes" },
            { number: "50+", label: "Cities Served" },
            { number: "100%", label: "Satisfaction" }
          ].map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-rose-600 to-yellow-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 font-semibold text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}