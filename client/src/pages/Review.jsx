import { Quote, Star, Sparkles } from "lucide-react";

const ReviewsSection = () => {
  const reviews = [
    {
      name: "Priya Sharma",
      occasion: "Birthday Party",
      rating: 5,
      text: "Absolutely stunning decoration for my daughter's 5th birthday! The team was professional, creative, and brought our princess theme to life perfectly.",
      image: "https://i.pravatar.cc/150?img=1",
      gradient: "from-pink-500 to-rose-500",
    },
    {
      name: "Rahul Verma",
      occasion: "Anniversary",
      rating: 5,
      text: "Surprised my wife with a beautiful anniversary setup at home. The attention to detail was incredible and it made our evening truly special.",
      image: "https://i.pravatar.cc/150?img=33",
      gradient: "from-red-500 to-rose-500",
    },
    {
      name: "Anjali Patel",
      occasion: "Baby Shower",
      rating: 5,
      text: "The baby shower decoration exceeded all expectations! Everything was perfect from the balloon arrangements to the cute centerpieces.",
      image: "https://i.pravatar.cc/150?img=5",
      gradient: "from-amber-500 to-yellow-500",
    },
    {
      name: "Vikram Singh",
      occasion: "Engagement",
      rating: 5,
      text: "Proposed with their romantic setup. Elegant lighting, beautiful florals, and perfect ambiance. She said YES!",
      image: "https://i.pravatar.cc/150?img=12",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  // ✅ Only latest 3 reviews
  const latestReviews = reviews.slice(-3);

  return (
    <section className="relative pb-24 bg-white overflow-hidden">
      {/* Floating sparkles */}
      <div className="absolute top-20 left-10 animate-pulse">
        <Sparkles className="text-amber-400 opacity-30" size={32} />
      </div>
      <div className="absolute bottom-32 right-16 animate-pulse delay-1000">
        <Sparkles className="text-rose-400 opacity-30" size={28} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-gradient-to-r from-amber-100 to-rose-100 text-red-700 px-6 py-2 rounded-full text-sm font-semibold border border-amber-200 mb-4">
            Client Testimonials
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
              Loved by Our Happy Clients
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from celebrations that became unforgettable memories
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestReviews.map((review, index) => (
            <div key={index} className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${review.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition`}
              />

              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50 h-full flex flex-col">
                <Quote className="absolute top-6 left-6 opacity-10" size={48} />

                {/* Profile */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative mb-4">
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${review.gradient} rounded-full blur-md opacity-50`}
                    />
                    <div
                      className={`relative bg-gradient-to-br ${review.gradient} p-1 rounded-full`}
                    >
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-24 h-24 rounded-full bg-white p-1 shadow-md"
                      />
                    </div>
                    <div
                      className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${review.gradient} p-2 rounded-full`}
                    >
                      <Star className="text-white fill-white" size={14} />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-amber-400 fill-amber-400"
                        size={20}
                      />
                    ))}
                  </div>
                </div>

                {/* Review */}
                <p className="text-gray-700 italic text-center mb-6 flex-grow">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="text-center mt-auto">
                  <p
                    className={`font-bold text-xl bg-gradient-to-r ${review.gradient} bg-clip-text text-transparent`}
                  >
                    {review.name}
                  </p>
                  <p className="text-gray-500 text-sm">{review.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
