import React from "react";
import { ArrowRight } from "lucide-react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutUs";
import OccasionsSection from "./Occassion";
import InstagramSection from "./Instagram";
import ReviewsSection from "./Review";
import QuickQuoteSection from "./Contact";

export default function HomePage() {

  return (
   <div>
        <HeroSection />
        <AboutSection />
        <OccasionsSection />
        <ReviewsSection />
        <InstagramSection />
        
        <QuickQuoteSection />
   </div>
  )
}
