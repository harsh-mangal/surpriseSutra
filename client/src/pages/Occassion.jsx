
import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, Gift, Baby, PartyPopper, Calendar, ArrowRight } from 'lucide-react';


const OccasionsSection = () => {
  const occasions = [
    {
      icon: <Gift size={40} />,
      title: "Birthday Party",
      description: "Make birthdays magical with themed decorations",
      color: "red"
    },
    {
      icon: <Baby size={40} />,
      title: "Baby Shower",
      description: "Celebrate new beginnings with elegant setups",
      color: "yellow"
    },
    {
      icon: <Heart size={40} />,
      title: "Anniversary",
      description: "Romantic decorations for your special day",
      color: "red"
    },
    {
      icon: <PartyPopper size={40} />,
      title: "Engagement",
      description: "Picture-perfect proposal and engagement decor",
      color: "yellow"
    },
    {
      icon: <Calendar size={40} />,
      title: "Corporate Events",
      description: "Professional decoration for business celebrations",
      color: "red"
    },
    {
      icon: <Sparkles size={40} />,
      title: "Custom Events",
      description: "Unique themes for any special occasion",
      color: "yellow"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-yellow-50 to-red-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
            Popular <span className="text-yellow-500">Occasions</span>
          </h2>
          <p className="text-xl text-gray-700">We decorate for every celebration you can imagine</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 border-4 ${
                occasion.color === 'red' ? 'border-red-400 hover:border-red-600' : 'border-yellow-400 hover:border-yellow-600'
              }`}
            >
              <div className={`inline-block p-4 rounded-2xl mb-4 ${
                occasion.color === 'red' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
              }`}>
                {occasion.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{occasion.title}</h3>
              <p className="text-gray-600 mb-4">{occasion.description}</p>
              <button className={`font-semibold flex items-center space-x-2 ${
                occasion.color === 'red' ? 'text-red-600 hover:text-red-700' : 'text-yellow-600 hover:text-yellow-700'
              }`}>
                <span>View Packages</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OccasionsSection;