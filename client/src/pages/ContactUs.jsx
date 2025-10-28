import React from 'react';
import { MessageSquare, Mail, Phone, MapPin, Twitter, Instagram, Facebook, Send, Clock, Heart } from 'lucide-react';
import ContactForm from './Contact';

export default function ContactUs() {
    const contactDetails = [
        {
            id: 1,
            icon: Mail,
            title: "Email Us",
            value: "surprisesutra@gmail.com",
            action: "mailto:surprisesutra@gmail.com",
            label: "Email support",
            description: "We'll respond within 24 hours"
        },
        {
            id: 2,
            icon: Phone,
            title: "Call Us",
            value: "+91 99994-16896",
            action: "tel:919999416896",
            label: "Call support",
            description: "Mon-Fri, 9AM-6PM EST"
        },
        {
            id: 3,
            icon: MapPin,
            title: "Visit Us",
            value: "123 Party Street, New York, NY 10001",
            action: "#map",
            label: "View location",
            description: "Come see our showroom"
        },
    ];

    const socialLinks = [
        { id: 1, icon: Twitter, name: "Twitter", url: "https://twitter.com/partysupplies", label: "Follow on Twitter" },
        { id: 2, icon: Instagram, name: "Instagram", url: "https://instagram.com/partysupplies", label: "Follow on Instagram" },
        { id: 3, icon: Facebook, name: "Facebook", url: "https://facebook.com/partysupplies", label: "Follow on Facebook" },
    ];

    return (
        <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 font-sans">
            {/* Hero Section - Full Width */}
            <div className="relative overflow-hidden bg-gradient-to-r from-red-600 via-red-500 to-yellow-500">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzBoLTEydjEyaDEyVjMwem0wLTEyaC0xMnYxMmgxMlYxOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

                {/* Animated floating elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-20 left-10 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-20 h-20 bg-yellow-300 opacity-10 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
                    <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-red-300 opacity-10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute bottom-40 right-1/3 w-24 h-24 bg-orange-300 opacity-10 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
                    <MessageSquare className="absolute top-10 left-1/4 w-8 h-8 text-white opacity-20 animate-bounce" style={{ animationDelay: '0.3s' }} />
                    <Heart className="absolute top-32 right-1/4 w-10 h-10 text-yellow-200 opacity-20 animate-pulse" style={{ animationDelay: '0.8s' }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
                    <div className="text-center">
                        <div className="flex justify-center mb-6 sm:mb-8">
                            <div className="relative">
                                <div className="absolute inset-0 bg-white opacity-20 rounded-full blur-xl animate-pulse"></div>
                                <div className="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-full p-5 sm:p-6 shadow-2xl border border-white border-opacity-30">
                                    <MessageSquare className="w-14 h-14 sm:w-16 sm:h-16 text-white" strokeWidth={2} />
                                </div>
                            </div>
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-100 via-yellow-100 to-red-100 drop-shadow-lg">
                            Let's Connect
                        </h1>
                        <p className="text-lg sm:text-xl lg:text-2xl mb-8 sm:mb-10 text-white text-opacity-95 font-medium max-w-3xl mx-auto leading-relaxed">
                            Have questions? Need help planning your celebration? We're here to make your event unforgettable! ✨
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <a
                                href="mailto:support@partysupplies.com"
                                aria-label="Email us"
                                className="group w-full sm:w-auto bg-white text-red-600 px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3"
                            >
                                <Mail className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                                <span>Email Us</span>
                            </a>
                            <a
                                href="tel:+11234567890"
                                aria-label="Call us"
                                className="group w-full sm:w-auto bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl flex items-center justify-center gap-3"
                            >
                                <Phone className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                                <span>Call Now</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* Decorative wave */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249, 250, 251)" />
                    </svg>
                </div>
            </div>

            {/* Contact Details Grid - Max Width 7xl */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Get in Touch
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Choose your preferred way to reach us. We're always ready to help! 💬
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
                    {contactDetails.map((detail) => {
                        const Icon = detail.icon;
                        return (
                            <div
                                key={detail.id}
                                className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-orange-200"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{detail.title}</h3>
                                    <p className="text-sm text-gray-500 mb-3">{detail.description}</p>
                                    <a
                                        href={detail.action}
                                        aria-label={detail.label}
                                        className="text-gray-700 font-medium hover:text-red-600 transition-colors duration-300 break-all"
                                    >
                                        {detail.value}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Two Column Layout for Form and Info */}
                {/* <div className="">
                   
                    <div className="lg:col-span-2">
                        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl border border-gray-100">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="bg-gradient-to-br from-red-600 to-orange-500 w-12 h-12 rounded-xl flex items-center justify-center shadow-md">
                                    <Send className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">Send Us a Message</h3>
                                    <p className="text-sm text-gray-500">We'll get back to you shortly</p>
                                </div>
                            </div>
                            <ContactForm />
                        </div>
                    </div>
                </div> */}
                <ContactForm />
            </div>

            {/* Additional Info - Takes 1 column */}
            <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-center mx-auto px-12 py-8 w-full max-w-7xl">

                {/* Business Hours */}
                <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-6 rounded-3xl shadow-md border border-orange-100 w-full max-w-sm sm:max-w-none mx-auto">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-gradient-to-br from-red-600 to-orange-500 w-10 h-10 rounded-xl flex items-center justify-center">
                            <Clock className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900">Business Hours</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">Monday - Friday</span>
                            <span className="text-gray-900 font-semibold">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">Saturday</span>
                            <span className="text-gray-900 font-semibold">10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 font-medium">Sunday</span>
                            <span className="text-gray-900 font-semibold">Closed</span>
                        </div>
                    </div>
                </div>

                {/* Social Media */}
                <div className="bg-white p-6 rounded-3xl shadow-md border border-gray-100 w-full max-w-sm sm:max-w-none mx-auto">
                    <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2 justify-center sm:justify-start">
                        <Heart className="w-5 h-5 text-red-600" />
                        Follow Us
                    </h4>
                    <p className="text-sm text-gray-600 mb-4 text-center sm:text-left">Stay connected on social media</p>
                    <div className="flex justify-center sm:justify-start gap-3">
                        {socialLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={link.id}
                                    href={link.url}
                                    aria-label={link.label}
                                    className="group bg-gradient-to-br from-red-50 to-yellow-50 hover:from-red-600 hover:to-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-md"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Icon className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
                                </a>
                            );
                        })}
                    </div>
                </div>

                {/* Quick Response Badge */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-3xl shadow-md border border-yellow-200 w-full max-w-sm sm:max-w-none mx-auto text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-3 shadow-lg">
                        <span className="text-2xl">⚡</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Quick Response</h4>
                    <p className="text-sm text-gray-600">
                        Average response time:{" "}
                        <span className="font-bold text-orange-600">2 hours</span>
                    </p>
                </div>

            </div>


            {/* Map Section - Max Width 7xl */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Find Our Store
                    </h2>
                    <div className="w-24 h-1.5 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 mx-auto rounded-full mb-6"></div>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Visit us in person and explore our amazing collection of party supplies! 📍
                    </p>
                </div>
                <div className="relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-200">
                    <iframe
                        title="Surprise Sutra Location"
                        src="https://www.google.com/maps?q=First+Floor/D-32/New+Multan+Nagar,Delhi&output=embed"
                        width="100%"
                        height="100%"
                        className="border-0"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>

            {/* Footer CTA - Max Width 7xl */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
                <div className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-3xl p-8 sm:p-12 text-center shadow-2xl">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
                        Ready to Start Planning? 🎉
                    </h3>
                    <p className="text-base sm:text-lg text-white text-opacity-90 mb-6 max-w-2xl mx-auto">
                        Let's create something amazing together. Get in touch today!
                    </p>
                    <a
                        href="mailto:support@partysupplies.com"
                        className="inline-flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-red-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
                    >
                        <Mail className="w-6 h-6" />
                        <span>Get Started Now</span>
                    </a>
                </div>
            </div>
        </div>
    );
}