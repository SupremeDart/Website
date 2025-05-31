'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PartnershipSection from '@/components/sections/PartnershipSection';
import Navbar from '@/components/layout/Navbar';
import WhyChooseUsSection from '@/components/sections/WhyChooseUsSection';
import ServicesShowcaseSection from '@/components/sections/ServicesSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import FAQSection from '@/components/sections/FAQSection';
import GetStartedSection from '@/components/sections/GetStartedSection';
import Footer from '@/components/sections/Footer';

export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  // Show loading state or nothing while checking auth status
  if (status === 'loading' || status === 'authenticated') {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-t-[#32CD32] border-r-[#32CD32] border-b-gray-200 border-l-gray-200 animate-spin"></div>
    </div>;
  }

  // Only render the landing page for unauthenticated users
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <WhyChooseUsSection />
        <ServicesShowcaseSection />
        <PartnershipSection />
        <TestimonialsSection />
        <FAQSection />
        <GetStartedSection />
      </main>
      <Footer />
    </>
  );
}