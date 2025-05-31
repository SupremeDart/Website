import React from "react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-white min-h-screen flex py-16 px-4 md:px-20">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-1 items-center">
        {/* Text Side */}
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6">
            ABOUT US
          </h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            <span className="font-semibold text-gray-900">Supreme Dart</span> is your all-in-one platform for convenient and reliable bill payments.
            Easily top up your airtime, internet data, cable TV, and electricity 
            subscriptions, all in one place.
          </p>
          <p className="text-gray-700 mb-4 leading-relaxed">
            We offer all our services at the best and most affordable rates, 
            helping you stay connected while saving money.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our platform is built with you in mind, delivering a fast, secure, 
            and seamless experience that makes every transaction efficient and rewarding.
          </p>
        </div>

        {/* Image Side */}
        <div className="flex justify-center md:justify-start">
          <img
            src='/images/shape2.png'
            alt="About Graphic"
            className="max-w-xs md:max-w-sm object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
