'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const { data: session } = useSession();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="bg-[#32CD32] text-white py-3 px-4 relative">
      {/* Wave pattern background */}
      {/* <div className="absolute inset-0 opacity-20 pattern-waves z-0"></div> */}
      
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center">
          {/* User Avatar */}
          <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center overflow-hidden border-2 border-white">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt="User" 
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-green-300 flex items-center justify-center text-green-600 font-bold">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </div>
          
          {/* Greeting Text */}
          <div className="ml-3">
            <h1 className="text-sm font-medium">Hi, {session?.user?.name || 'Subscriber'}</h1>
          </div>
        </div>
        
        {/* Right side icons */}
        <div className="flex items-center space-x-3">
          {/* Notification Bell */}
          <button 
            onClick={toggleNotifications}
            className="p-1 relative"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          
          {/* Logout Button */}
          <button className="p-1">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Notification dropdown */}
      {showNotifications && (
        <div className="absolute right-4 top-14 w-64 bg-white rounded-md shadow-lg z-50 text-gray-800 divide-y divide-gray-100">
          <div className="px-4 py-3 text-sm text-gray-900 border-b">
            <div className="font-medium">Notifications</div>
          </div>
          <div className="py-2 px-4 text-sm text-gray-700">
            <p className="text-center py-4">No new notifications</p>
          </div>
        </div>
      )}
    </header>
  );
}