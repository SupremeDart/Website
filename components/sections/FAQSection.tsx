'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FaqItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const faqItems: FaqItem[] = [
  {
    id: 1,
    question: "How Do I Buy Airtime?",
    answer: (
      <>
        <p>First create an account and login.</p>
        <p>After login click fund wallet from the dashboard menu.</p>
        <p>Fund your wallet using your preferred option.</p>
        <p>After funding your wallet, click on Airtime on the menu bar.</p>
        <p>Select network, enter phone number, and provide a transaction pin to complete the transaction.</p>
      </>
    )
  },
  {
    id: 2,
    question: "How Do I Buy Data?",
    answer: (
      <>
        <p>First create an account and login.</p>
        <p>After login click fund wallet from the dashboard menu.</p>
        <p>Fund your wallet using your preferred option.</p>
        <p>After funding your wallet, click on Data on the menu bar.</p>
        <p>Select network, choose data plan, enter phone number, and provide a transaction pin to complete the transaction.</p>
      </>
    )
  },
  {
    id: 3,
    question: "How Do I Check My Data Balance?",
    answer: (
      <>
        <p>Log into your account.</p>
        <p>Navigate to the "My Account" section from the dashboard.</p>
        <p>Click on "Data Balance" to view your current data balance for each network.</p>
        <p>Alternatively, you can dial the USSD code specific to your network provider to check your data balance directly from your phone.</p>
      </>
    )
  },
  {
    id: 4,
    question: "Is the data plan compatible for all device/modem/WiFi or MiFi??",
    answer: (
      <>
        <p>Yes, our data plans are compatible with all devices including smartphones, tablets, modems, WiFi routers, and MiFi devices.</p>
        <p>The data plan works across all supported network providers and can be used on any device that accepts a SIM card from these networks.</p>
        <p>For specific device compatibility questions, please contact our customer support team for assistance.</p>
      </>
    )
  }
];

const FaqAccordion: React.FC = () => {
  // keep at least one FAQ item open
  const [openFaqId, setOpenFaqId] = useState<number>(1);

  const toggleFaq = (id: number) => {
    // Only toggle if not trying to close the only open item
    if (id !== openFaqId) {
      setOpenFaqId(id);
    }
  };

  return (
    <div className="w-full py-16 bg-[#f5f6fa]">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-2/5">
            <div className="mb-5">
              <span className="text-pink-500 font-medium">Stay Connected</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
              Frequently<br />
              Asked questions.
            </h2>
            <p className="text-gray-600 mb-6">
              These are some frequently asked questions to give you more information about our platform and help you get started. If you have any other question, please do contact our customer support team.
            </p>
          </div>
          
          <div className="w-full md:w-3/5">
            <div className="bg-gray-50 rounded-lg">
              {faqItems.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-b-0 mb-4 rounded-lg overflow-hidden shadow-md">
                  <div 
                    className={`bg-white cursor-pointer p-6 transition-colors duration-300 ${openFaqId === faq.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                    onClick={() => toggleFaq(faq.id)}
                  >
                    <div className="flex justify-between items-center">
                      <h3 className="text-md font-medium">
                        {faq.id}. {faq.question}
                      </h3>
                      <div className="ml-2">
                        {openFaqId === faq.id ? (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500 transition-transform duration-300 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence>
                    {openFaqId === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="bg-white px-6 pb-6 pt-2 text-gray-600 space-y-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqAccordion;