import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      name: "Priya Sharma",
      occasion: "Birthday Party",
      rating: 5,
      text: "Absolutely stunning decoration for my daughter's 5th birthday! The team was professional, creative, and brought our princess theme to life perfectly. Highly recommend!",
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Rahul Verma",
      occasion: "Anniversary",
      rating: 5,
      text: "Surprised my wife with a beautiful anniversary setup at home. The attention to detail was incredible and it made our evening truly special. Worth every penny!",
      image: "https://i.pravatar.cc/150?img=33"
    },
    {
      name: "Anjali Patel",
      occasion: "Baby Shower",
      rating: 5,
      text: "The baby shower decoration exceeded all expectations! Everything was perfect from the balloon arrangements to the cute centerpieces. Thank you Surprise Sutra!",
      image: "https://i.pravatar.cc/150?img=5"
    },
    {
      name: "Vikram Singh",
      occasion: "Engagement",
      rating: 5,
      text: "Proposed to my girlfriend with their romantic setup. She said YES! The team helped create the perfect ambiance. Couldn't have asked for better service!",
      image: "https://i.pravatar.cc/150?img=12"
    }
  ];

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="py-20 bg-yellow-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-700">Real stories from real celebrations</p>
        </div>
        
        <div className="relative bg-yellow-50 rounded-3xl p-8 md:p-12 shadow-xl">
          <Quote className="absolute top-6 left-6 text-red-200 opacity-20" size={60} />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <img 
                src={reviews[currentReview].image}
                alt={reviews[currentReview].name}
                className="w-24 h-24 rounded-full border-4 border-red-600 shadow-md"
              />
              <div className="flex-1 text-center md:text-left">
                <div className="flex justify-center md:justify-start mb-3">
                  {[...Array(reviews[currentReview].rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={24} />
                  ))}
                </div>
                <p className="text-gray-800 mb-4 italic">"{reviews[currentReview].text}"</p>
                <p className="font-bold text-xl text-red-600">{reviews[currentReview].name}</p>
                <p className="text-gray-600">{reviews[currentReview].occasion}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-4 mt-8">
            <button 
              onClick={prevReview}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-300 shadow-md"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    currentReview === index ? 'w-8 bg-red-600' : 'w-3 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextReview}
              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition duration-300 shadow-md"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
