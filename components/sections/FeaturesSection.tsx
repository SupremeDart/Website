'use client'

import React, { useState, useEffect } from "react";

const features = [
  "Airtime Purchase",
  "Data Purchase",
  "Cable TV Subscription",
  "Electricity Bill",
  "Exam Pin",
  "Recharge Card",
  "Data Card",
  "Smile Topup",
  "Alpha Topup",
  "Referral System",
  "Contact List",
  "Finger Print Login",
  "API Integration",
];

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-gray-50 min-h-screen flex justify-center items-center py-16 px-4 md:px-20">
      <div className="w-full text-center">
        <h2 
          className={`text-2xl md:text-4xl font-extrabold text-gray-900 mb-12 transition-all duration-700 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-[-50px] opacity-0"
          }`}
        >
          FEATURES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`w-full sm:max-w-xs border border-green-500 bg-white text-black font-semibold py-4 px-6 text-center shadow-sm rounded transition-all duration-500 transform hover:scale-105 hover:shadow-md hover:border-green-600 ${
                isVisible ? "translate-y-0 opacity-100" : "translate-y-[50px] opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;