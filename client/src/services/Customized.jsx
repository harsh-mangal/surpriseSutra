import React, { useState } from 'react';
import { Palette, Scissors, Wand2, MessageSquare, Image, Gift, Crown, Shirt, Banknote, Camera, Clock, Award } from 'lucide-react';

export default function CustomizedPartySupplies() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const customizableItems = [
    {
      id: 1,
      title: "Custom Banners",
      icon: Banknote,
      gradient: "from-pink-500 to-rose-600",
      description: "Personalized banners with your message, photos, and design.",
      features: ["Any Size", "Photo Printing", "Custom Text", "Premium Material"],
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
    },
    {
      id: 2,
      title: "Photo Booth Props",
      icon: Camera,
      gradient: "from-purple-500 to-indigo-600",
      description: "Custom props with names, dates, and fun messages.",
      features: ["Personalized Signs", "Custom Shapes", "Your Photos", "Sturdy Sticks"],
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
    },
    {
      id: 3,
      title: "Themed T-Shirts",
      icon: Shirt,
      gradient: "from-blue-500 to-cyan-600",
      description: "Custom printed t-shirts for your entire party crew.",
      features: ["All Sizes", "Your Design", "Quality Print", "Bulk Orders"],
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"
    },
    {
      id: 4,
      title: "Custom Cake Toppers",
      icon: Crown,
      gradient: "from-orange-500 to-amber-600",
      description: "Personalized cake toppers with names and special messages.",
      features: ["3D Designs", "Gold/Silver Finish", "Custom Colors", "Name & Age"],
      image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&q=80"
    },
    {
      id: 5,
      title: "Party Invitations",
      icon: MessageSquare,
      gradient: "from-green-500 to-emerald-600",
      description: "Beautifully designed custom invitations for any occasion.",
      features: ["Digital + Print", "Custom Design", "RSVP Tracking", "Quick Delivery"],
      image: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=800&q=80"
    },
    {
      id: 6,
      title: "Personalized Gifts",
      icon: Gift,
      gradient: "from-red-500 to-pink-600",
      description: "Custom gift items and party favors for your guests.",
      features: ["Mugs & Bottles", "Keychains", "Photo Frames", "Gift Hampers"],
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=800&q=80"
    }
  ];

  const features = [
    { icon: Palette, title: "Your Design", desc: "Choose colors, fonts, and layouts that match your vision." },
    { icon: Wand2, title: "Expert Crafting", desc: "Professional quality with attention to every detail." },
    { icon: Clock, title: "Fast Delivery", desc: "Quick turnaround without compromising quality." }
  ];

  const customizationSteps = [
    { step: "1", title: "Choose Item", desc: "Select what you want to customize.", icon: Scissors },
    { step: "2", title: "Design It", desc: "Add your text, photos, and colors.", icon: Palette },
    { step: "3", title: "Review", desc: "We'll send you a preview to approve.", icon: Image },
    { step: "4", title: "Receive", desc: "Get your custom items delivered.", icon: Award }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-rose-600 via-orange-500 to-yellow-500">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC41Ij48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wLTEyaC0xMnYxMmgxMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        
        {/* Floating decoration elements */}
        <div className="absolute inset-0 pointer-events-none">
          <Palette className="absolute top-8 left-8 w-8 h-8 sm:w-12 sm:h-12 text-white opacity-30 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <Wand2 className="absolute top-16 right-16 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <Scissors className="absolute bottom-16 left-1/4 w-6 h-6 sm:w-10 sm:h-10 text-white opacity-20 animate-spin" style={{ animationDuration: '10s' }} />
          <Gift className="absolute bottom-20 right-1/4 w-8 h-8 sm:w-14 sm:h-14 text-rose-200 opacity-25 animate-bounce" style={{ animationDelay: '1.2s' }} />
        </div>
        
        <div className="relative max-w-screen-2xl mx-auto px-4 py-12 sm:py-20 lg:py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 shadow-lg">
                <Palette className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight text-white">
              Customized Party Supplies
            </h1>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 text-white font-medium max-w-3xl mx-auto">
              🎨 Make it uniquely yours! Personalize every detail to create unforgettable memories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Start customizing party supplies"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-transparent hover:border-yellow-300 flex items-center justify-center gap-2 sm:gap-3"
              >
                <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
                Start Customizing
              </button>
              <button
                aria-label="View customization gallery"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                View Gallery
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
            Why Go Custom?
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

      {/* How It Works Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            How It Works
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-rose-600 to-yellow-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto font-medium">
            Creating your custom party supplies is easy as 1-2-3-4! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {customizationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-rose-200 text-center">
                  <div className="bg-gradient-to-br from-rose-600 to-yellow-500 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-md">
                    <span className="text-2xl sm:text-3xl font-bold text-white">{step.step}</span>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-100 to-orange-100 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-md">
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-rose-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{step.desc}</p>
                </div>
                {index < customizationSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-6 h-1 bg-gradient-to-r from-rose-500 to-yellow-500"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Customizable Items Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">
            What We Customize
          </h2>
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-rose-600 to-yellow-500 mx-auto rounded-full mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto font-medium">
            From banners to t-shirts, we personalize it all! 🎨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {customizableItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-rose-200"
                onMouseEnter={() => setSelectedCategory(item.id)}
                onMouseLeave={() => setSelectedCategory(null)}
              >
                {/* Image Section */}
                <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden rounded-t-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Icon Badge */}
                  <div
                    className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-md transform transition-all group-hover:scale-110`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                </div>
                
                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">{item.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">{item.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                    {item.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-gradient-to-br from-rose-500 to-yellow-500 rounded-full flex-shrink-0"></div>
                        <span className="font-medium text-sm sm:text-base">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    aria-label={`Customize ${item.title}`}
                    className={`w-full py-2 sm:py-3 rounded-xl font-semibold text-white text-base sm:text-lg bg-gradient-to-r ${item.gradient} transition-all hover:shadow-md hover:scale-105 flex items-center justify-center gap-2`}
                  >
                    <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    Customize Now
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
          <Palette className="absolute top-8 sm:top-12 left-8 sm:left-12 w-10 h-10 sm:w-16 sm:h-16 text-yellow-200 opacity-30 animate-pulse" />
          <Wand2 className="absolute bottom-8 sm:bottom-12 right-8 sm:right-12 w-10 h-10 sm:w-16 sm:h-16 text-white opacity-30 animate-bounce" />
          
          <div className="relative px-4 sm:px-8 py-12 sm:py-16 text-center text-white">
            <div className="bg-white bg-opacity-30 backdrop-blur-md rounded-full p-4 sm:p-6 w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              Ready to <span className="text-yellow-200">Personalize?</span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl mx-auto font-medium leading-relaxed">
              Let's create something special together! Share your ideas and we'll bring them to life! 🎨✨
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <button
                aria-label="Start designing party supplies"
                className="min-w-[150px] bg-white text-rose-600 px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-yellow-100 transition-all transform hover:scale-105 shadow-lg border-2 border-yellow-200"
              >
                <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 inline-block mr-2" />
                Start Your Design
              </button>
              <button
                aria-label="Get a free consultation"
                className="min-w-[150px] bg-transparent border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full font-semibold text-base sm:text-lg hover:bg-white hover:text-rose-600 transition-all transform hover:scale-105 shadow-lg"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-screen-2xl mx-auto px-4 py-12 sm:py-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
          {[
            { number: "5K+", label: "Custom Orders" },
            { number: "100+", label: "Design Options" },
            { number: "24hr", label: "Quick Delivery" },
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