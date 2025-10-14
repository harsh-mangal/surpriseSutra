import { useState } from 'react';
import { Quote, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const ReviewsSection = () => {
  const [currentReview, setCurrentReview] = useState(0);
  
  const reviews = [
    {
      name: "Priya Sharma",
      occasion: "Birthday Party",
      rating: 5,
      text: "Absolutely stunning decoration for my daughter's 5th birthday! The team was professional, creative, and brought our princess theme to life perfectly. Every detail was thoughtfully executed and the attention to quality was exceptional.",
      image: "https://i.pravatar.cc/150?img=1",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      name: "Rahul Verma",
      occasion: "Anniversary",
      rating: 5,
      text: "Surprised my wife with a beautiful anniversary setup at home. The attention to detail was incredible and it made our evening truly special. The romantic ambiance they created was beyond our expectations. Worth every penny!",
      image: "https://i.pravatar.cc/150?img=33",
      gradient: "from-red-500 to-rose-500"
    },
    {
      name: "Anjali Patel",
      occasion: "Baby Shower",
      rating: 5,
      text: "The baby shower decoration exceeded all expectations! Everything was perfect from the balloon arrangements to the cute centerpieces. The team's creativity and professionalism made our celebration unforgettable. Thank you Surprise Sutra!",
      image: "https://i.pravatar.cc/150?img=5",
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      name: "Vikram Singh",
      occasion: "Engagement",
      rating: 5,
      text: "Proposed to my girlfriend with their romantic setup. She said YES! The team helped create the perfect ambiance with elegant lighting and beautiful floral arrangements. Couldn't have asked for better service for such a special moment!",
      image: "https://i.pravatar.cc/150?img=12",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const nextReview = () => setCurrentReview((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(251,191,36,0.15),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(244,63,94,0.15),transparent_50%)]"></div>
      
      {/* Floating sparkles */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="text-amber-400 opacity-30" size={32} />
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse delay-1000">
        <Sparkles className="text-rose-400 opacity-30" size={28} />
      </div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-amber-100 to-rose-100 text-red-700 px-6 py-2 rounded-full text-sm font-semibold tracking-wide border border-amber-200">
              Client Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 bg-clip-text text-transparent">
              Loved by Our
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Happy Clients
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Real stories from real celebrations that became unforgettable memories
          </p>
        </div>
        
        {/* Review Card */}
        <div className="relative">
          {/* Gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-br ${reviews[currentReview].gradient} rounded-3xl blur-xl opacity-20`}></div>
          
          <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-white/50">
            {/* Large decorative quote */}
            <Quote className="absolute top-8 left-8 text-gradient opacity-10" size={80} />
            <Quote className="absolute bottom-8 right-8 text-gradient opacity-10 rotate-180" size={80} />
            
            <div className="relative z-10">
              <div className="flex flex-col items-center gap-8">
                {/* Profile Image with gradient border */}
                <div className="relative">
                  <div className={`absolute inset-0 bg-gradient-to-br ${reviews[currentReview].gradient} rounded-full blur-md opacity-50`}></div>
                  <div className={`relative bg-gradient-to-br ${reviews[currentReview].gradient} p-1 rounded-full`}>
                    <img 
                      src={reviews[currentReview].image}
                      alt={reviews[currentReview].name}
                      className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-white p-1 shadow-lg"
                    />
                  </div>
                  {/* Verified badge */}
                  <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${reviews[currentReview].gradient} p-2 rounded-full shadow-lg`}>
                    <Star className="text-white fill-white" size={16} />
                  </div>
                </div>
                
                {/* Review Content */}
                <div className="flex-1 text-center max-w-3xl">
                  {/* Star Rating */}
                  <div className="flex justify-center mb-6 gap-1">
                    {[...Array(reviews[currentReview].rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="text-amber-400 fill-amber-400 drop-shadow-sm" 
                        size={28} 
                      />
                    ))}
                  </div>
                  
                  {/* Review Text */}
                  <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic font-light">
                    "{reviews[currentReview].text}"
                  </p>
                  
                  {/* Reviewer Info */}
                  <div>
                    <p className={`font-bold text-2xl md:text-3xl mb-2 bg-gradient-to-r ${reviews[currentReview].gradient} bg-clip-text text-transparent`}>
                      {reviews[currentReview].name}
                    </p>
                    <p className="text-gray-500 font-medium">
                      {reviews[currentReview].occasion}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex justify-center items-center space-x-6 mt-12">
              <button 
                onClick={prevReview}
                className={`group bg-gradient-to-br ${reviews[currentReview].gradient} text-white p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                aria-label="Previous review"
              >
                <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex space-x-3">
                {reviews.map((review, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`rounded-full transition-all duration-500 ${
                      currentReview === index 
                        ? `w-12 h-4 bg-gradient-to-r ${review.gradient} shadow-md` 
                        : 'w-4 h-4 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>

              <button 
                onClick={nextReview}
                className={`group bg-gradient-to-br ${reviews[currentReview].gradient} text-white p-4 rounded-full hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl`}
                aria-label="Next review"
              >
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 md:mt-20">
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-rose-500 bg-clip-text text-transparent mb-2">500+</p>
            <p className="text-gray-600 text-sm font-medium">5-Star Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent mb-2">98%</p>
            <p className="text-gray-600 text-sm font-medium">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent mb-2">1000+</p>
            <p className="text-gray-600 text-sm font-medium">Happy Clients</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">24/7</p>
            <p className="text-gray-600 text-sm font-medium">Support Available</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;