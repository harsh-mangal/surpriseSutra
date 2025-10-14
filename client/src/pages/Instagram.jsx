
import { useState } from 'react';
import { Menu, X, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube, Star, Quote, ChevronLeft, ChevronRight, Sparkles, Heart, Gift, Baby, PartyPopper, Calendar, ArrowRight } from 'lucide-react';


const InstagramSection = () => {
    const instagramPosts = [
        "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1481653125770-b78c206c59d4?w=400&h=400&fit=crop",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=400&fit=crop"
    ];

    return (
        <section id="gallery" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-red-700 mb-4">
                        Follow Us On <span className="text-yellow-500">Instagram</span>
                    </h2>
                    <p className="text-xl text-gray-700 mb-6">
                        Get daily decoration inspiration and latest updates
                    </p>
                    <a
                        href="https://www.instagram.com/surprisesutra?igsh=ZTljOGh1M2ZiYXdh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold hover:from-purple-600 hover:to-pink-600 transition duration-300 inline-block"
                    >
                        @surprisesutra
                    </a>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {instagramPosts.map((post, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer"
                        >
                            <img
                                src={post}
                                alt={`Instagram post ${index + 1}`}
                                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-red-600 to-transparent opacity-0 group-hover:opacity-90 transition duration-300 flex items-end justify-center pb-4">
                                <Heart className="text-white" size={32} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


export default InstagramSection;