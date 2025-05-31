import Image from 'next/image';

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">WHY CHOOSE US</h2>
          <p className="text-lg text-gray-600">Why Should You Choose Our Bill Payment Platform</p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/icon_1.png" 
                  alt="Customer Support Icon" 
                  width={60} 
                  height={60}
                  className="text-[#32CD32]"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Support</h3>
            <p className="text-gray-600 leading-relaxed">
              We take customer support seriously. Our team of experts is always available, 
              ready to listen to your suggestions and address any concerns or complaints promptly.
            </p>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/icon_2.png" 
                  alt="User Friendly Icon" 
                  width={60} 
                  height={60}
                  className="text-orange-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Friendly</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike other platforms, We keep things simple.
              Our platform is easy to use, flexible, and designed 
              to help you get things done without confusion.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/icon-3.png" 
                  alt="Hybrid System Icon" 
                  width={60} 
                  height={60}
                  className="text-blue-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hybrid System</h3>
            <p className="text-gray-600 leading-relaxed">
              All requests are automatically processed and delivered in real-time.
              Even if you run out of data but still have funds in your account, 
              we’ll handle your request via SMS, no internet needed.
            </p>
          </div>
          {/* Feature 4 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/lock.png" 
                  alt="Customer Support Icon" 
                  width={60} 
                  height={60}
                  className="text-[#32CD32]"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Secure</h3>
            <p className="text-gray-600 leading-relaxed">
              Your e-wallet is the safest, fastest, and most convenient way to make transactions.
              With PIN protection, your funds stay secure and can be stored for as long as you need them.
            </p>
          </div>
          
          {/* Feature 5 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/briefcase.png" 
                  alt="User Friendly Icon" 
                  width={60} 
                  height={60}
                  className="text-orange-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Reliable</h3>
            <p className="text-gray-600 leading-relaxed">
              Our platform is built for maximum reliability and performance.
              By leveraging top-tier servers, we ensure minimal downtime and a 
              seamless experience, delivering consistent value with every transaction.
            </p>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 flex items-center justify-center">
                <Image 
                  src="/images/coding.png" 
                  alt="Hybrid System Icon" 
                  width={60} 
                  height={60}
                  className="text-blue-500"
                />
              </div>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Professional Team</h3>
            <p className="text-gray-600 leading-relaxed">
              Our team of seasoned experts understands the complexities of system architecture.
              With a strong track record of deploying robust, high-performance solutions, 
              we're equipped to tackle any challenge and deliver exceptional results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}