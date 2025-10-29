import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, Gift, Baby, PartyPopper, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OccasionsSection = () => {
  const navigate=useNavigate();
  const occasions = [
    {
      icon: <Gift size={48} />,
      title: "Birthday Party",
      description: "Transform birthdays into unforgettable experiences with bespoke themed decorations",
      color: "red",
      gradient: "from-red-500 to-rose-500"
    },
    {
      icon: <Baby size={48} />,
      title: "Baby Shower",
      description: "Celebrate new beginnings with elegant, thoughtfully curated setups",
      color: "amber",
      gradient: "from-amber-400 to-yellow-400"
    },
    {
      icon: <Heart size={48} />,
      title: "Anniversary",
      description: "Romantic, sophisticated decorations that honor your beautiful journey",
      color: "rose",
      gradient: "from-rose-500 to-pink-500"
    },
    {
      icon: <PartyPopper size={48} />,
      title: "Engagement",
      description: "Picture-perfect proposal and engagement decor for your special moment",
      color: "purple",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: <Calendar size={48} />,
      title: "Corporate Event",
      description: "Professional, polished decoration services for business celebrations",
      color: "blue",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Sparkles size={48} />,
      title: "Custom Events",
      description: "Unique, personalized themes crafted for any special occasion you envision",
      color: "gold",
      gradient: "from-yellow-500 to-amber-500"
    }
  ];

  return (
    <section id="services" className="relative py-24 md:py-32 bg-white overflow-hidden">
    
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-amber-100 to-rose-100 text-red-700 px-6 py-2 rounded-full text-sm font-semibold tracking-wide border border-amber-200">
              Our Expertise
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Celebrate Every
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Special Occasion
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
            From intimate gatherings to grand celebrations, we craft memorable experiences tailored to your vision
          </p>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {occasions.map((occasion, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient border effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${occasion.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>
              <div className="absolute inset-[2px] bg-white rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative p-8 md:p-10">
                {/* Icon with gradient background */}
                <div className="relative mb-6">
                  <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${occasion.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {occasion.icon}
                  </div>
                  {/* Decorative glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${occasion.gradient} opacity-20 blur-xl rounded-full -z-10 group-hover:opacity-40 transition-opacity duration-500`}></div>
                </div>

                {/* Text Content */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-red-600 group-hover:to-amber-600 transition-all duration-300">
                  {occasion.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6 font-light">
                  {occasion.description}
                </p>

                {/* CTA Button */}
                <button className={`group/btn inline-flex items-center space-x-2 font-semibold text-gray-700  hover:bg-gradient-to-r hover:bg-clip-text ${occasion.gradient.replace('from-', 'hover:from-').replace('to-', 'hover:to-')} transition-all duration-300`}
                 onClick={()=>navigate("/contact", { state: { occasion: occasion.title } })}
                >
                  <span>Explore Packages</span>
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>
              </div>

              {/* Decorative corner element */}
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${occasion.gradient} opacity-5 rounded-bl-full`}></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 md:mt-20">
          <p className="text-gray-600 mb-6 text-lg">
            Don't see your occasion? We create custom themes for any celebration!
          </p>
          <button onClick={()=>navigate('/contact')} className="group bg-gradient-to-r from-red-600 to-rose-600 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl transition-all duration-300 shadow-xl inline-flex items-center space-x-2 hover:scale-105"
          >
            <span>Request Custom Quote</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;