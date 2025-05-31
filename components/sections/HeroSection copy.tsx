'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Pay All Your Bills In One Place",
      description: "The most convenient way to manage and pay all your utility bills, subscriptions, and services - in seconds.",
      cta: "Get Started",
      image: "/images/hero-main.jpg"
    },
    {
      title: "Save Time & Never Miss a Payment",
      description: "Streamline your finances and avoid late fees with our all-in-one bill management platform.",
      cta: "Learn More",
      image: "/images/hero-secondary.jpg"
    },
    {
      title: "Over 500+ Service Providers",
      description: "From utilities to subscriptions, we've got you covered with the widest range of payment options.",
      cta: "View Services",
      image: "/images/hero-tertiary.jpg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="hero" className="relative h-screen flex flex-col justify-between overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/70 z-10"></div>

      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image 
              src={slide.image} 
              alt="Hero background" 
              fill 
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Main */}
      <div className="flex-1 flex items-center">
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-3xl text-white">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`transition-all duration-700 ${
                  currentSlide === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-100">
                  {slide.description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl">
                    {slide.cta}
                  </button>
                  <button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full transition-all hover:bg-white/10">
                    Watch Demo
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slider indicators */}
      <div className="relative z-20 mb-24">
        <div className="container mx-auto">
          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index 
                    ? 'bg-white w-10' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative z-20 mb-8 w-full">
        <div className="container mx-auto px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-white text-center">
            <div className="px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold">500+</p>
              <p className="text-sm md:text-base">Service Providers</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold">5M+</p>
              <p className="text-sm md:text-base">Users</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold">99.9%</p>
              <p className="text-sm md:text-base">Uptime</p>
            </div>
            <div className="px-4 py-2">
              <p className="text-3xl md:text-4xl font-bold">4.9/5</p>
              <p className="text-sm md:text-base">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}