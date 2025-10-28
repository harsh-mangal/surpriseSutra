import React, { useState } from 'react';
import { Gift, Star, Package, Heart, Sparkles, ArrowRight, CheckCircle, Palette, Wand2 } from 'lucide-react';

export default function Gifts() {
  const [hoveredGift, setHoveredGift] = useState(null);

  const giftItems = [
    {
      id: 1,
      title: "Personalized Mugs",
      icon: Gift,
      gradient: "from-red-500 to-pink-600",
      description: "Custom mugs with names, photos, or special messages.",
      features: ["Ceramic Material", "Photo Printing", "Custom Text", "Gift Box Option"],
      image: "https://images.unsplash.com/photo-1544274410-18f40648e714?w=800&q=80"
    },
    {
      id: 2,
      title: "Photo Frames",
      icon: Heart,
      gradient: "from-purple-500 to-indigo-600",
      description: "Elegant frames personalized with your memories.",
      features: ["Custom Engravings", "Multiple Sizes", "Premium Wood", "Photo Inserts"],
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80"
    },
    {
      id: 3,
      title: "Gift Baskets",
      icon: Package,
      gradient: "from-blue-500 to-cyan-600",
      description: "Curated gift baskets tailored to your occasion.",
      features: ["Custom Contents", "Themed Packaging", "Personalized Tags", "Luxury Items"],
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
    },
    {
      id: 4,
      title: "Engraved Keychains",
      icon: Star,
      gradient: "from-orange-500 to-amber-600",
      description: "Stylish keychains with custom engravings.",
      features: ["Metal/Acrylic", "Name Engraving", "Custom Shapes", "Durable Design"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    },
    {
      id: 5,
      title: "Custom Journals",
      icon: Palette,
      gradient: "from-green-500 to-emerald-600",
      description: "Personalized journals for gifting or personal use.",
      features: ["Custom Cover", "Monogram Option", "Quality Paper", "Hard/Soft Cover"],
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&q=80"
    },
    {
      id: 6,
      title: "Personalized Candles",
      icon: Sparkles,
      gradient: "from-pink-500 to-rose-600",
      description: "Scented candles with custom labels and designs.",
      features: ["Custom Scents", "Personalized Labels", "Eco-Friendly", "Gift Packaging"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
    }
  ];

  const features = [
    { icon: Palette, title: "Personalized Touch", desc: "Add names, photos, or messages to make it special." },
    { icon: Wand2, title: "Premium Quality", desc: "Crafted with care for lasting memories." },
    { icon: Package, title: "Gift-Ready", desc: "Beautifully packaged for gifting." }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wLTEyaC0xMnYxMmgxMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Floating decoration elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Gift className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 text-white opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Star className="absolute top-16 right-16 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <Sparkles className="absolute bottom-16 left-1/4 w-6 h-6 sm:w-10 sm:h-10 text-white opacity-20 animate-spin" style={{ animationDuration: '10s' }} />
          <Package className="absolute bottom-20 right-1/4 w-8 h-8 sm:w-14 sm:h-14 text-rose-200 opacity-25 animate-bounce" style={{ animationDelay: '1.2s' }} />
        </div>
        
        <div className="relative max-w-screen-2xl mx-auto px-4 py-12 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 shadow-lg">
                <Gift className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white">
              Thoughtful Gifts
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white font-medium max-w-3xl mx-auto">
              🎁 Create heartfelt moments with our personalized gift collection, perfect for any occasion.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Explore gift collection"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-yellow-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6" />
                Explore Gifts
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <button
                aria-label="Get gift customization quote"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Get a Quote
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
            Why Our Gifts?
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

      {/* Gift Items Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            Our Gift Collection
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-rose-600 to-yellow-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto font-medium">
            Discover personalized gifts to make every moment special. 🎁
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {giftItems.map((gift) => {
            const Icon = gift.icon;
            return (
              <div
                key={gift.id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-rose-200"
                onMouseEnter={() => setHoveredGift(gift.id)}
                onMouseLeave={() => setHoveredGift(null)}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={gift.image}
                    alt={gift.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Icon Badge */}
                  <div
                    className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${gift.gradient} flex items-center justify-center shadow-md transform transition-all group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">{gift.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{gift.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {gift.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    aria-label={`Explore ${gift.title}`}
                    className={`w-full py-2 sm:py-3 rounded-xl font-semibold text-white text-base sm:text-lg bg-gradient-to-r ${gift.gradient} transition-all hover:shadow-md hover:scale-105 flex items-center justify-center gap-2`}
                  >
                    <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Explore Now
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
          <Gift className="absolute top-8 sm:top-12 left-8 sm:left-12 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <Star className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-10 h-10 sm:w-16 sm:h-16 text-white opacity-30 animate-bounce" />
          
          <div className="relative px-4 sm:px-8 py-12 sm:py-16 text-center text-white">
            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to <span className="text-yellow-200">Gift?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto font-medium leading-relaxed">
              Make someone’s day with a personalized gift they’ll cherish! 🎁✨
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Start exploring gifts"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-yellow-200"
              >
                <Star className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />
                Start Exploring
              </button>
              <button
                aria-label="Contact for gift customization"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}