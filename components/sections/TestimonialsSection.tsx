'use client'

import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Ayomikun',
    role: 'Founder',
    company: 'Paycepts',
    avatar: '/images/user.png',
    quote: 'The best technical partner',
    content: 'Supreme Dart is the best technical partner you can have. The team members are professionals and always know what to do when there is any technical issue.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'CTO',
    company: 'TechFlow',
    avatar: '/images/user.png',
    quote: 'Exceptional service and expertise',
    content: 'Working with this team has transformed our development process. Their attention to detail and technical knowledge exceeded all our expectations.'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'CEO',
    company: 'InnovateTech',
    avatar: '/images/user.png',
    quote: 'Game-changing collaboration',
    content: 'Their developers integrated seamlessly with our team, delivering complex features on time and within budget. I cannot recommend them enough.'
  }
];

const stats = [
  { value: '10,000+', label: 'Happy Clients' },
  { value: '200+', label: 'Projects Completed' }
];

const TestimonialSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextTestimonial = () => {
    if (isAnimating) return;
    
    setSlideDirection('left');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      setIsAnimating(false);
    }, 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    
    setSlideDirection('right');
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAnimating]);

  // Touch handlers for swipe functionality
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const minSwipeDistance = 50;
    const diff = touchStartX.current - touchEndX.current;
    
    if (Math.abs(diff) < minSwipeDistance) return;
    
    if (diff > 0) {
      // Swiped left, go to next
      nextTestimonial();
    } else {
      // Swiped right, go to previous
      prevTestimonial();
    }
    
    // Reset values
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const current = testimonials[currentIndex];

  return (
    <div className=" relative w-full py-16 overflow-hidden bg-white">
      {/* Blue curved line */}
      <div className="absolute inset-0 pointer-events-none">
        <img src="/images/line-testimonial.png" alt="" />
      </div>

      <div className="container relative z-10 flex flex-col items-center max-w-6xl px-4 mx-auto">
        {/* Side navigation buttons */}
        <div className="absolute inset-y-0 left-0 items-center -ml-4 md:ml-0 hidden md:flex">
          <button
            onClick={prevTestimonial}
            className="p-2 text-gray-600 transition-colors bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 items-center -mr-4 md:mr-0 hidden md:flex">
          <button
            onClick={nextTestimonial}
            className="p-2 text-gray-600 transition-colors bg-white rounded-full shadow-md hover:bg-gray-100"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

        {/* Testimonial */}
        <div 
          ref={sliderRef}
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="flex flex-col items-center h-96">
            <div 
              className={`transition-all duration-500 transform ${
                isAnimating && slideDirection === 'left' ? '-translate-x-full opacity-0' : 
                isAnimating && slideDirection === 'right' ? 'translate-x-full opacity-0' : 
                'translate-x-0 opacity-100'
              } mb-8 text-center`}
            >
              <div className="relative w-16 h-16 mx-auto mb-4 overflow-hidden rounded-full">
                {current.avatar && (
                  <Image 
                    src={current.avatar} 
                    alt={current.name} 
                    width={64} 
                    height={64} 
                    className="object-cover"
                  />
                )}
              </div>
              <p className="text-sm font-medium text-gray-600">
                {current.name}, {current.role} at {current.company}
              </p>
            </div>

            <div 
              className={`transition-all duration-500 transform ${
                isAnimating && slideDirection === 'left' ? '-translate-x-full opacity-0' : 
                isAnimating && slideDirection === 'right' ? 'translate-x-full opacity-0' : 
                'translate-x-0 opacity-100'
              } max-w-3xl mx-auto text-center`}
            >
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                "{current.quote}"
              </h2>
              <p className="text-lg text-gray-600">
                {current.content}
              </p>
            </div>
          </div>
        </div>

        {/* Pagination indicators */}
        {/* <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index > currentIndex) {
                  setSlideDirection('left');
                } else if (index < currentIndex) {
                  setSlideDirection('right');
                }
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentIndex(index);
                  setIsAnimating(false);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              disabled={isAnimating}
            />
          ))}
        </div> */}

        <div className="flex justify-center mt-16 space-x-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl md:text-5xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-2 text-lg text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;