import React from "react";
import {
  MessageSquare,
  Mail,
  Phone,
  Heart,
  Instagram,
  Facebook,
  Twitter,
  Clock,
  Send,
} from "lucide-react";
import ContactForm from "./Contact";

export default function ContactUs() {
  const contactDetails = [
    {
      id: 1,
      icon: Mail,
      title: "Email Us",
      value: "surprisesutra@gmail.com",
      action: "mailto:surprisesutra@gmail.com",
      description: "We'll respond within 24 hours",
    },
    {
      id: 2,
      icon: Phone,
      title: "Call Us",
      value: "+91 99994-16896",
      action: "tel:919999416896",
      description: "Mon–Sat, 9 AM – 6 PM",
    },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: Instagram,
      url: "https://instagram.com/surprisesutra",
      label: "Instagram",
    },
    {
      id: 2,
      icon: Facebook,
      url: "https://facebook.com/surprisesutra",
      label: "Facebook",
    },
    {
      id: 3,
      icon: Twitter,
      url: "https://twitter.com/surprisesutra",
      label: "Twitter",
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1600&q=80"
            alt="Contact Hero"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 via-white to-red-100 opacity-90" />

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-red-500 text-white px-5 py-2 rounded-full font-semibold mb-5 text-sm sm:text-base shadow-md">
            <MessageSquare size={18} /> Let’s Connect
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500 leading-tight">
            Contact Surprise Sutra
          </h1>
          <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            We’d love to hear from you! Whether it’s a birthday, wedding, or
            corporate event — let’s make it magical together ✨
          </p>
        </div>
      </section>

      {/* ===== Contact Section ===== */}
      <section className="py-12 sm:py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-8 sm:space-y-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {contactDetails.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-md hover:shadow-2xl hover:border-red-200 transition-all duration-300"
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="bg-gradient-to-br from-yellow-400 to-red-500 p-4 rounded-2xl shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                    <a
                      href={item.action}
                      className="text-base sm:text-lg font-semibold text-red-600 hover:text-yellow-500 transition-colors"
                    >
                      {item.value}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <ContactForm />

          {/* Extra Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 text-center">
            {/* Business Hours */}
            <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Clock className="text-yellow-500" size={22} />
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  Business Hours
                </h3>
              </div>
              <p className="text-gray-700 text-sm sm:text-base">
                Mon – Sat <br />
                <span className="text-red-600 font-semibold">
                  9:00 AM – 6:00 PM
                </span>
              </p>
              <p className="text-gray-500 mt-2 text-sm">Sunday Closed</p>
            </div>

            {/* Socials */}
            <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 flex items-center justify-center gap-2">
                <Heart className="text-red-500" /> Follow Us
              </h3>
              <div className="flex justify-center gap-3 sm:gap-4">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white border border-gray-200 hover:bg-gradient-to-br from-red-500 to-yellow-400 w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300"
                    >
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500 group-hover:text-white transition" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-gradient-to-br from-yellow-50 to-white border border-yellow-200 p-6 rounded-3xl shadow-sm hover:shadow-md transition-all">
              <div className="text-3xl sm:text-4xl mb-2">⚡</div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                Quick Response
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Avg reply time:{" "}
                <span className="text-red-600 font-semibold">2 hours</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
