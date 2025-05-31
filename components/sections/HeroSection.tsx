'use client'

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id='hero' className="bg-[#f7f8fc] min-h-screen flex items-center justify-center px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left */}
        <div className={`flex-1 text-center md:text-left mt-36 md:mt-23 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
          <p className={`font-semibold uppercase tracking-wide transition-all delay-300 duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Welcome to Supreme Dart
          </p>
          <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mt-4 leading-tight transition-all delay-500 duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Your One-stop<br />
            <span className="text-black">Platform For All Bills</span><br />
            Payment
          </h1>
          <p className={`text-gray-600 mt-4 text-lg transition-all delay-700 duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            Get all your bills payment and subscription done with ease.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-6 justify-center md:justify-start">
            <div className={`transition-all delay-900 duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <a href="/auth/signin">
                <Button variant="outline" size='lg'>Login</Button>
              </a>
            </div>
            <div className={`transition-all delay-1000 duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a href="/auth/signup">
              <Button size='lg'>Register</Button>
            </a>
            </div>
            <div className={`transition-all delay-1100 duration-700 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <Button size='lg'>Download App</Button>
            </div>
          </div>
        </div>

        {/* Spinning shape thingy */}
        <motion.div 
          className={`absolute top-34 right-24 md:right-32 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 15,
            ease: "linear",
            repeat: Infinity
          }}
        >
          <img
            src="/images/shape4.png"
            alt="Decorative Shape"
          />
        </motion.div>

        {/* Right image */}
        <div className={`flex-1 transition-all duration-1000 transform ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <img
            src="/images/app1.png"
            alt="App Screenshot"
            className="max-w-sm mx-auto rounded-2xl shadow-lg w-90 md:w-72 lg:w-80 mt-16 md:mt-32"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;