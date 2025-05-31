'use client'

import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

export default function ServicesShowcaseSection() {
  // Animation state for main phone
  const [mainPhonePosition, setMainPhonePosition] = useState({ x: 0, y: 0 });
  // Animation state for second phone
  const [secondPhonePosition, setSecondPhonePosition] = useState({ x: 0, y: 0 });
  
  // Refs for animation targets
  const mainPhoneTargetRef = useRef({ x: 0, y: 0 });
  const secondPhoneTargetRef = useRef({ x: 0, y: 0 });
  
  // Ref for container to measure available width
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Animation frame ID for cleanup
  const animationFrameRef = useRef<number | null>(null);

  // Primary bill payment services
  const billServices = [
    'Buy Airtime At A Discount Rate',
    'Purchase Internet Data Subscription',
    'Renew Your Cable TV Subscription',
    'Pay For Your Electricity Subscription'
  ];

  // Value-added services
  const valueAddedServices = [
    'Web Design And Development',
    'Mobile App Development',
    'Graphic Design',
    'Digital Marketing',
    'Technical Consultation'
  ];

  // generate new random target positions with dynamic max based on container width
  const getNewTargetPosition = (baseMax: number) => {
    // Calculate maximum movement based on container width
    const containerWidth = containerRef.current?.offsetWidth || 500;
    const maxMovement = Math.min(containerWidth * 0.15, baseMax);
    
    // For smaller screens, the range to reach edges but balanced
    const scaleFactor = containerWidth < 768 ? 1.5 : 1;
    
    return {
      x: (Math.random() * maxMovement * 2 - maxMovement) * scaleFactor,
      y: Math.random() * maxMovement - maxMovement / 2
    };
  };

  useEffect(() => {
    // window resize to adjust animations
    const handleResize = () => {
      // Update target positions when window is resized
      mainPhoneTargetRef.current = getNewTargetPosition(15);
      secondPhoneTargetRef.current = getNewTargetPosition(20);
    };

    // initial target positions
    mainPhoneTargetRef.current = getNewTargetPosition(15);
    secondPhoneTargetRef.current = getNewTargetPosition(20);
    
    // resize listener
    window.addEventListener('resize', handleResize);
    
    // Timer for changing target positions
    const targetUpdateIntervalMain = setInterval(() => {
      mainPhoneTargetRef.current = getNewTargetPosition(15);
    }, 3000);
    
    const targetUpdateIntervalSecond = setInterval(() => {
      secondPhoneTargetRef.current = getNewTargetPosition(20);
    }, 4000);
    
    // using requestAnimationFrame for smooth motion
    const animate = () => {
      // Smoothly interpolate current position toward target for main phone
      setMainPhonePosition(prev => ({
        x: prev.x + (mainPhoneTargetRef.current.x - prev.x) * 0.02,
        y: prev.y + (mainPhoneTargetRef.current.y - prev.y) * 0.02
      }));
      
      // Smoothly interpolate current position toward target for second phone
      setSecondPhonePosition(prev => ({
        x: prev.x + (secondPhoneTargetRef.current.x - prev.x) * 0.015,
        y: prev.y + (secondPhoneTargetRef.current.y - prev.y) * 0.015
      }));
      
      // Continue animation loop
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation loop
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Cleanup on unmount
    return () => {
      clearInterval(targetUpdateIntervalMain);
      clearInterval(targetUpdateIntervalSecond);
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-50">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">OUR SERVICES</h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left: Mobile App */}
          <div ref={containerRef} className="lg:w-1/2 relative w-full h-120 md:h-[450px] lg:h-[500px]">
            {/* Purple squiggle accent */}
            <div className="absolute -left-10 top-16 -z-10">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10,15 Q20,5 30,15 T50,15 T70,15" stroke="#7B4BFF" strokeWidth="3" fill="none" />
              </svg>
            </div>
            
            {/* Main phone image with continuous animation */}
            <div 
              className="absolute z-10 w-64 md:w-72"
              style={{ 
                left: '40%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${mainPhonePosition.x}px, ${mainPhonePosition.y}px)` 
              }}
            >
              <Image 
                src="/images/app1.png" 
                alt="Bill Payment App Dashboard" 
                width={300} 
                height={550}
                className="rounded-3xl shadow-xl w-full h-auto"
              />
            </div>
            
            {/* Overlapping second phone with continuous animation */}
            <div 
              className="absolute z-20 w-64 md:w-72"
              style={{ 
                left: '70%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${secondPhonePosition.x}px, ${secondPhonePosition.y}px)` 
              }}
            >
              <Image 
                src="/images/app3.png" 
                alt="Data Purchase Screen" 
                width={350} 
                height={550}
                className="rounded-3xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
          
          {/* Right: Services List */}
          <div className="lg:w-1/2 pt-16 lg:pt-0 w-full">
            <div className="text-pink-500 font-medium mb-2">What we do Best</div>
            
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-8">
              Bills Payment With Ease
            </h2>
            
            {/* Bills Payment Services */}
            <div className="mb-10">
              {billServices.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center py-4 border-b border-gray-200"
                >
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
            
            {/* Value Added Services */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Other Value Added Services
              </h3>
              
              {valueAddedServices.map((service, index) => (
                <div 
                  key={index} 
                  className="flex items-center py-4 border-b border-gray-200"
                >
                  <CheckCircle className="text-green-500 mr-3 h-5 w-5" />
                  <span className="text-gray-700">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}