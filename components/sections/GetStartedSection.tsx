import React from 'react';
import Button from '../ui/Button';

const GetStarted = () => {
  return (
    <section className="bg-[#32CD32] text-white py-20 relative overflow-hidden">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Get Started</h2>
        <p className="text-lg text-gray-200 mb-8">
          Start Enjoying All Of Our Services At The Best Affordable Price
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Button 
            variant="primary" 
            size="lg" 
            className="bg-gray-800 text-black hover:bg-gray-100 hover:text-black active:bg-gray-200 shadow-lg"
            >
            Register Now
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            className="bg-gray-800 text-black hover:bg-gray-100 hover:text-black active:bg-gray-200 shadow-lg"
            >
            Contact Us
          </Button>
        </div>
        <div className="flex justify-center gap-6 text-sm text-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-blue-300">✔</span> Trusted
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-300">✔</span> Fast
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-300">✔</span> Secure
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
