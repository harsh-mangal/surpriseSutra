import { Sparkles } from 'lucide-react';
import { useState } from 'react';

const AboutSection = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white via-red-50 to-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image with hover effect */}
          <div 
            className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <img 
              src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=500&fit=crop" 
              alt="About Surprise Sutra"
              className={`w-full h-96 object-cover rounded-3xl transition-transform duration-700 ease-in-out transform ${
                hovered ? "scale-110" : "scale-100"
              }`}
            />

            {/* Sparkles icon */}
          
          </div>

          {/* Text content with address */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-red-700">
              About <span className="text-yellow-500">Surprise Sutra</span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Welcome to Surprise Sutra, where ordinary spaces become extraordinary celebrations! With years of experience, we specialize in creating magical moments for birthdays, baby showers, anniversaries, and more.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our dedicated team brings creativity, attention to detail, and passion to every project. Every celebration deserves to be unforgettable, and we make that happen.
            </p>

            {/* Address added here */}
        

            <div className="grid grid-cols- gap-6 pt-4">
              <div className="bg-yellow-10 p-6 rounded-xl border-2 border-yellow-400 hover:scale-105 transition-transform duration-300 shadow-md">
                <p className="text-3xl font-bold text-red-700 mb-2">100%</p>
                <p className="text-gray-700 font-semibold">Customer Satisfaction</p>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
