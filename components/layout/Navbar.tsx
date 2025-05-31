'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Button from '../ui/Button';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLLIElement>(null);
  
  // Get authentication session
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  
  useEffect(() => {
    // entrance animation on mount
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Close menu on scroll
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isMenuOpen || isProfileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      // Prevent body scrolling when menu is open
      if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen, isProfileMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false); // Close menu after navigation
    }
  };
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Nav items shown only when not authenticated
  const navItems = !isAuthenticated ? (
    <>
      <li>
        <button 
          onClick={() => scrollToSection('hero')}
          className="font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Home
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('about')}
          className="font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          About
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('services')}
          className="font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Services
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('partnership')}
          className="font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Partnership
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('contact')}
          className="font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Contact
        </button>
      </li>
    </>
  ) : null;

  // Mobile nav items shown only when not authenticated
  const mobileNavItems = !isAuthenticated ? (
    <>
      <li>
        <button 
          onClick={() => scrollToSection('hero')}
          className="w-full text-left font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Home
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('about')}
          className="w-full text-left font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          About
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('services')}
          className="w-full text-left font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Services
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('partnership')}
          className="w-full text-left font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Partnership
        </button>
      </li>
      <li>
        <button 
          onClick={() => scrollToSection('contact')}
          className="w-full text-left font-semibold text-gray-800 hover:text-[#32CD32] transition-colors"
        >
          Contact
        </button>
      </li>
    </>
  ) : null;

  return (
    <>
      {/* Dimmed overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
      
      <header 
        ref={navRef} 
        className={`fixed w-full z-50 transition-all duration-500 transform ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img src="/images/Logo.png" alt="Logo" className="w-[40px] mr-2"/>
              <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                <span className="text-[#32CD32]">Supreme</span> Dart
              </h1>
            </div>
            
            <nav className="hidden md:flex">
              <ul className="flex space-x-8 items-center">
                {navItems}
                
                {isLoading ? (
                  <li>
                    <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  </li>
                ) : isAuthenticated ? (
                  <li className="relative" ref={profileRef}>
                    <button
                      onClick={toggleProfileMenu}
                      className="flex items-center space-x-2"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#32CD32] flex items-center justify-center text-white font-semibold">
                        {session?.user?.name?.charAt(0) || session?.user?.email?.charAt(0) || 'U'}
                      </div>
                      <span className="sr-only md:not-sr-only md:inline-block">
                        {session?.user?.name || session?.user?.email?.split('@')[0]}
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Profile Dropdown */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <a href="/dashboard" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Dashboard</a>
                        <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Profile</a>
                        <button
                          onClick={handleSignOut}
                          className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                        >
                          Sign Out
                        </button>
                      </div>
                    )}
                  </li>
                ) : (
                  <>
                    <li>
                      <a href="/auth/signin">
                        <Button variant="outline" size='md'>Login</Button>
                      </a>
                    </li>
                    <li>
                      <a href="/auth/signup">
                        <Button size='md'>Register</Button>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                className="text-gray-800 focus:outline-none z-50 relative"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div 
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isMenuOpen 
                ? 'max-h-96 opacity-100 mt-4' 
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className={`bg-white rounded-lg shadow-lg p-4 transform transition-transform duration-300 ${
              isMenuOpen ? 'translate-y-0' : '-translate-y-8'
            }`}>
              <ul className="space-y-4">
                {mobileNavItems}
                
                {isLoading ? (
                  <li>
                    <div className="w-full h-10 bg-gray-200 rounded animate-pulse"></div>
                  </li>
                ) : isAuthenticated ? (
                  <>
                    <li className="pt-2">
                      <a href="/dashboard" className="block w-full">
                        <Button className="w-full">Dashboard</Button>
                      </a>
                    </li>
                    <li>
                      <a href="/profile" className="block w-full">
                        <Button variant="outline" className="w-full">Profile</Button>
                      </a>
                    </li>
                    <li>
                      <div onClick={handleSignOut} className="w-full">
                        <Button variant="outline" className="w-full bg-red-50 hover:bg-red-100 text-red-600 border-red-200">
                          Sign Out
                        </Button>
                      </div>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-2">
                      <a href="/auth/signin" className="block w-full">
                        <Button variant="outline" className="w-full">Login</Button>
                      </a>
                    </li>
                    <li>
                      <a href="/auth/signup" className="block w-full">
                        <Button className="w-full">Register</Button>
                      </a>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}