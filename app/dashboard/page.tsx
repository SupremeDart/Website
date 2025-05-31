'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated') {
      setIsLoading(false);
    }
  }, [status, router]);
  
  // Maintenance alert handler
  const handleMaintenanceAlert = (feature: string) => {
    alert(`${feature} is currently under maintenance. Please check back later.`);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#32CD32]"></div>
      </div>
    );
  }
  
  return (
    <main className="bg-[#f0f2f5] min-h-screen">
      <Header />
      
      <div className="pb-24">
        <div className="bg-[#32CD32] p-4 text-white relative">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-medium">Wallet Balance</h2>
              <p className="font-bold">₦ **********</p>
            </div>
            <div className="flex items-center">
              <button 
                className="p-2 bg-green-400 rounded-full"
                onClick={() => handleMaintenanceAlert('Wallet settings')}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
              <div className="ml-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick Action Buttons */}
        <div className="mx-4 -mt-2 rounded-xl bg-white p-4">
          <div className="grid grid-cols-2 gap-2">
            <button 
              className="flex items-center justify-center bg-green-500 text-white py-3 px-4 rounded-lg"
              onClick={() => handleMaintenanceAlert('Add Money feature')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Money
            </button>
            
            <button 
              className="flex items-center justify-center bg-green-500 text-white py-3 px-4 rounded-lg"
              onClick={() => handleMaintenanceAlert('Transaction history')}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
          </div>
        </div>
        
        {/* Service Grid */}
        <div className="grid grid-cols-3 gap-4 p-4">
          {/* Row 1 */}
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Airtime purchase')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Airtime</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Data purchase')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Data</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('TV subscription')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">TV</span>
          </div>
          
          {/* Row 2 */}
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Bill payments')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Bills</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Exam Pin purchase')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Exam Pin</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Recharge Pin')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Recharge Pin</span>
          </div>
          
          {/* Row 3 */}
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Agent services')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Agent</span>
          </div>
          
          <div className="flex flex-col items-center">
            <button 
              className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white"
              onClick={() => handleMaintenanceAlert('Vendor services')}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <span className="mt-2 text-sm text-gray-600">Vendor</span>
          </div>
        </div>
        
        
        {/* Statistics Table */}
        <div className="mx-4 mt-4 bg-white rounded-lg overflow-hidden">
          <div className="bg-[#32CD32] text-white p-3">
            <h2 className="font-medium">Statistics</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="flex justify-between p-3">
              <span className="text-gray-700">Total Transactions</span>
              <span className="font-medium">0</span>
            </div>
            
            <div className="flex justify-between p-3">
              <span className="text-gray-700">Amount Spent This Week</span>
              <span className="font-medium">₦0</span>
            </div>
            
            <div className="flex justify-between p-3">
              <span className="text-gray-700">Amount Spent This Month</span>
              <span className="font-medium">₦0</span>
            </div>
            
            <div className="flex justify-between p-3">
              <span className="text-gray-700">Total Spent</span>
              <span className="font-medium">₦0</span>
            </div>
            
            <div className="flex justify-between p-3">
              <span className="text-gray-700">Total Funding</span>
              <span className="font-medium">₦0</span>
            </div>
            
            <div className="flex justify-between p-3">
              <span className="text-gray-700">CashBack Bonus</span>
              <span className="font-medium">₦0</span>
            </div>
          </div>
        </div>
      </div>
        
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        <button className="flex flex-col items-center text-green-500">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-gray-500"
          onClick={() => router.push('/profile')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="text-xs mt-1">Profile</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-gray-500"
          onClick={() => handleMaintenanceAlert('Support page')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="text-xs mt-1">Support</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-gray-500"
          onClick={() => handleMaintenanceAlert('History page')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs mt-1">History</span>
        </button>
        
        <button 
          className="flex flex-col items-center text-gray-500"
          onClick={() => handleMaintenanceAlert('More options')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span className="text-xs mt-1">More</span>
        </button>
      </div>
    </main>
  );
}