'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Nigeria',
    profileImage: ''
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  
  // Maintenance alert handler
  const handleMaintenanceAlert = (feature: string) => {
    alert(`${feature} is currently under maintenance. Please check back later.`);
  };
  
  // Redirect if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (status === 'authenticated' && session?.user) {
      // Populate form with user data
      setFormData(prevData => ({
        ...prevData,
        name: session.user?.name || '',
        email: session.user?.email || '',
        profileImage: session.user?.image || ''
      }));
      setIsLoading(false);
    }
  }, [status, router, session]);
  
  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsEditing(false);
      setNotification({
        show: true,
        message: 'Profile updated successfully!',
        type: 'success'
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '', type: '' });
      }, 3000);
    } catch (error) {
      setNotification({
        show: true,
        message: 'Failed to update profile. Please try again.',
        type: 'error'
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f8fc]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  return (
    <main className="bg-[#f0f2f5] min-h-screen">
      <Header />
      
      <div className="pb-24">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            {/* Profile Header */}
            <div className="bg-green-500 p-4 text-white rounded-t-xl relative">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-medium">My Profile</h2>
                </div>
                <div className="flex items-center">
                  {!isEditing ? (
                    <button 
                      className="p-2 bg-green-400 rounded-full text-white"
                      onClick={() => setIsEditing(true)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
            
            {/* Notification */}
            {notification.show && (
              <div className={`p-4 rounded-lg ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {notification.message}
              </div>
            )}
            
            {/* Profile Info */}
            <div className="bg-white rounded-b-xl shadow-md mb-4">
              {/* Profile Header with Image */}
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 border-b border-gray-100">
                <div className="relative">
                  {formData.profileImage ? (
                    <img 
                      src={formData.profileImage} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white text-2xl font-bold">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                  {isEditing && (
                    <button 
                      type="button"
                      className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md border border-gray-200"
                    >
                      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </button>
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-xl font-semibold">{formData.name || 'User'}</h2>
                  <p className="text-gray-600">{formData.email}</p>
                  <p className="text-gray-500 mt-1">
                    {[formData.city, formData.state, formData.country].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
                    <h2 className="font-medium">Personal Information</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={true} // Email cannot be changed
                          className="w-full px-3 py-2 border rounded-lg shadow-sm bg-gray-50"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={!isEditing}
                          placeholder="+234 XXX XXX XXXX"
                          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="bg-green-500 text-white p-3 rounded-lg mb-4">
                    <h2 className="font-medium">Address Information</h2>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        disabled={!isEditing}
                        className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          isEditing ? 'bg-white' : 'bg-gray-50'
                        }`}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          disabled={!isEditing}
                          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            isEditing ? 'bg-white' : 'bg-gray-50'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      className="px-4 py-2 border border-green-500 text-green-500 rounded-lg shadow-sm hover:bg-green-50"
                      onClick={() => setIsEditing(false)}
                      disabled={isSaving}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-sm hover:bg-green-600"
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                )}
              </form>
            </div>
            
            {/* Security Panel */}
            <div className="bg-white rounded-xl shadow-md mb-4">
              <div className="bg-green-500 text-white p-3 rounded-t-lg">
                <h2 className="font-medium">Security</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 border-b border-gray-100">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-medium">Password</h3>
                    <p className="text-sm text-gray-500">Change your password to keep your account secure</p>
                  </div>
                  <button 
                    className="px-3 py-1 border border-green-500 text-green-500 rounded-lg shadow-sm hover:bg-green-50"
                    onClick={() => handleMaintenanceAlert('Password change')}
                  >
                    Change Password
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pb-4 border-b border-gray-100">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-medium">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                  </div>
                  <button 
                    className="px-3 py-1 border border-green-500 text-green-500 rounded-lg shadow-sm hover:bg-green-50"
                    onClick={() => handleMaintenanceAlert('Two-Factor Authentication')}
                  >
                    Enable
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:justify-between md:items-center">
                  <div className="mb-2 md:mb-0">
                    <h3 className="font-medium">Active Sessions</h3>
                    <p className="text-sm text-gray-500">Manage your logged in devices and sessions</p>
                  </div>
                  <button 
                    className="px-3 py-1 border border-green-500 text-green-500 rounded-lg shadow-sm hover:bg-green-50"
                    onClick={() => handleMaintenanceAlert('Active sessions')}
                  >
                    View Sessions
                  </button>
                </div>
              </div>
            </div>
            
            {/* Preferences Panel */}
            <div className="bg-white rounded-xl shadow-md mb-4">
              <div className="bg-green-500 text-white p-3 rounded-t-lg">
                <h2 className="font-medium">Preferences</h2>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates about your transactions and bills</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                  <div>
                    <h3 className="font-medium">SMS Alerts</h3>
                    <p className="text-sm text-gray-500">Get SMS notifications for important updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Bill Reminders</h3>
                    <p className="text-sm text-gray-500">Receive reminders before bills are due</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="mt-6 mb-8 text-center">
              <button 
                className="text-red-600 hover:text-red-800 font-medium"
                onClick={() => handleMaintenanceAlert('Account deletion')}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
        
      {/* Bottom nav*/}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around py-3">
        <button 
          className="flex flex-col items-center text-gray-500"
          onClick={() => router.push('/dashboard')}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="text-xs mt-1">Home</span>
        </button>
        
        <button className="flex flex-col items-center text-green-500">
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