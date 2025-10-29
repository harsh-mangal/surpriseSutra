import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Heart, Sparkles, Award, Users, Clock, CheckCircle, Star, Target, Shield } from "lucide-react";

const AboutUs = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <>
            {/* Top Banner with Image */}
            <div className="relative text-white py-16 md:py-24 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=400&fit=crop"
                        alt="Celebration Background"
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Red-Yellow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 via-red-400/70 to-yellow-300/60 mix-blend-multiply"></div>

                {/* Optional subtle pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                            backgroundSize: "30px 30px",
                        }}
                    ></div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                    <div
                        className={`text-center space-y-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                            }`}
                    >
                        {/* Badge */}
                        <div className="inline-block">
                            <span className="bg-yellow-400 text-red-700 px-6 py-2 rounded-full text-sm md:text-base font-bold shadow-lg inline-flex items-center space-x-2">
                                <Sparkles size={20} className="animate-pulse" />
                                <span>About Surprise Sutra</span>
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                            <span className="block text-white">Creating Magical</span>
                            <span className="block text-yellow-300">Moments Since 2023</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-white text-opacity-90 leading-relaxed">
                            Transforming celebrations into cherished memories with creativity,
                            passion, and perfection
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-8 max-w-4xl mx-auto">
                            {[
                                { number: "500+", label: "Events Done" },
                                { number: "50+", label: "Themes" },
                                { number: "5+", label: "Cities" },
                                { number: "4.9★", label: "Rating" },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="bg-white bg-opacity-20 backdrop-blur-md rounded-2xl p-4 md:p-6 hover:bg-opacity-30 transition-all duration-300"
                                >
                                    <p className="text-3xl md:text-4xl font-bold text-yellow-300">
                                        {stat.number}
                                    </p>
                                    <p className="text-sm md:text-base font-semibold">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            {/* Main Content Section */}
            <section className="bg-white py-16 md:py-24 relative overflow-hidden">
                {/* Decorative Background Elements */}
                {/* <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-10 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute bottom-40 left-10 w-80 h-80 bg-yellow-200 rounded-full opacity-20 blur-3xl"></div>
                </div> */}

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 space-y-20 relative z-10">

                    {/* Our Story - Enhanced */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                        <div className="space-y-6 order-2 lg:order-1">
                            <div className="inline-block">
                                <span className="bg-red-700 text-white px-4 py-2 rounded-full text-sm font-bold">
                                    Our Journey
                                </span>
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                                <span className="text-red-700">Our </span>
                                <span className="text-yellow-500">Story</span>
                            </h2>

                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                Surprise Sutra was born from a passion for turning life's most
                                precious moments into unforgettable experiences. From intimate
                                birthdays to grand weddings, our creative team ensures every
                                decoration reflects joy, love, and beauty.
                            </p>

                            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                What began as a small dream has blossomed into one of Delhi-NCR's
                                most trusted event styling brands — where every detail matters and
                                every celebration becomes a masterpiece.
                            </p>

                            {/* Key Features */}
                            <div className="grid grid-cols-2 gap-4 pt-4">
                                <div className="flex items-center space-x-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                                    <span className="text-sm md:text-base font-semibold text-gray-700">Quality Materials</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                                    <span className="text-sm md:text-base font-semibold text-gray-700">On-Time Setup</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                                    <span className="text-sm md:text-base font-semibold text-gray-700">Custom Designs</span>
                                </div>
                                <div className="flex items-center space-x-3 bg-white bg-opacity-60 backdrop-blur-sm p-4 rounded-xl shadow-lg hover:shadow-xl transition-all">
                                    <CheckCircle className="text-green-600 flex-shrink-0" size={24} />
                                    <span className="text-sm md:text-base font-semibold text-gray-700">Expert Team</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative order-1 lg:order-2">
                            <div className="relative group">
                                {/* Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Image Container */}
                                <div className="relative bg-gradient-to-br from-red-600 to-red-700 rounded-3xl p-3 md:p-4 shadow-2xl transform hover:scale-105 transition-all duration-500">
                                    <img
                                        src="https://ik.imagekit.io/sqpcbo0c0/Surprise%20Sutra/photorealistic-wedding-venue-with-intricate-decor-ornaments.jpg?updatedAt=1760440650784"
                                        alt="Our Story"
                                        className="rounded-2xl w-full h-64 md:h-96 lg:h-[500px] object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30 rounded-2xl"></div>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute -bottom-6 -right-6 bg-white p-4 md:p-6 rounded-2xl shadow-2xl hover:scale-110 transition-transform duration-300">
                                    <div className="flex items-center space-x-2">
                                        <Award className="text-yellow-500" size={32} />
                                        <div>
                                            <p className="text-xs text-gray-600">Trusted by</p>
                                            <p className="text-lg md:text-xl font-bold text-red-700">500+ Clients</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Values - Enhanced */}
                    <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                        {/* Mission Card */}
                        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-red-800 p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="bg-white bg-opacity-30 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                <Target className="text-red-700" size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-700">Our Mission</h3>
                            <p className="text-base md:text-lg leading-relaxed text-gray-800">
                                To craft stunning, personalized decorations that make your dreams
                                come true — from concept to execution with creativity and passion.
                            </p>
                        </div>

                        {/* Promise Card */}
                        <div className="bg-gradient-to-br from-red-600 to-red-700 text-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="bg-white bg-opacity-30 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                <Shield className="text-yellow-400" size={32} />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400">Our Promise</h3>
                            <p className="text-base md:text-lg leading-relaxed">
                                We promise creativity, punctuality, and professionalism in every
                                event we design. Your happiness is our true success measure.
                            </p>
                        </div>

                        {/* Values Card */}
                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white p-6 md:p-8 rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="bg-white bg-opacity-30 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                                <Heart className="text-red-700" size={32} fill="currentColor" />
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-red-700">Our Values</h3>
                            <p className="text-base md:text-lg leading-relaxed text-gray-800">
                                Celebrations are the heartbeat of life. We believe in creating
                                magical moments that bring joy, love, and lasting memories.
                            </p>
                        </div>
                    </div>

                    {/* Contact & Service Area - Enhanced */}
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                        {/* Contact Info */}
                        <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="bg-gradient-to-br from-red-600 to-red-700 p-3 rounded-2xl">
                                    <Heart className="text-yellow-400" size={28} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold text-red-700">Get in Touch</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
                                    <Phone className="text-red-700 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Call Us</p>
                                        <p className="text-lg md:text-xl font-bold text-gray-800">+91 9876543210</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-2xl hover:bg-yellow-100 transition-colors">
                                    <Mail className="text-red-700 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Email Us</p>
                                        <p className="text-lg md:text-xl font-bold text-gray-800">info@surprisesutra.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors">
                                    <MapPin className="text-red-700 flex-shrink-0 mt-1" size={24} />
                                    <div>
                                        <p className="text-sm text-gray-600 mb-1">Visit Us</p>
                                        <p className="text-base md:text-lg font-semibold text-gray-800">
                                            First Floor, D-32, New Multan Nagar, Delhi, India
                                        </p>
                                    </div>
                                </div>

                                {/* Service Area Badge */}
                                <div className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6 rounded-2xl">
                                    <p className="text-sm font-semibold mb-2 flex items-center space-x-2">
                                        <MapPin size={20} className="text-yellow-400" />
                                        <span className="text-yellow-400">Service Coverage Area</span>
                                    </p>
                                    <p className="text-lg md:text-xl font-bold">
                                        Delhi • Noida • Gurgaon • Ghaziabad • Faridabad
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-400 hover:border-red-600 transition-colors duration-300 h-full min-h-[400px] lg:min-h-[600px]">
                            <iframe
                                title="Surprise Sutra Map"
                                src="https://www.google.com/maps?q=First+Floor/D-32/New+Multan+Nagar,Delhi&output=embed"
                                width="100%"
                                height="100%"
                                className="absolute inset-0 border-0"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;