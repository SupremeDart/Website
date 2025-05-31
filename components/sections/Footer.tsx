import { Phone, Mail, House } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-[#f1f2f7] text-gray-800 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-sm">
        {/* Logo & description */}
        <div>
          <div className="flex">
            <img src="/images/Logo.png" alt="Logo" className="w-[40px] h-[40px] mr-2"/>
            <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
              <span className="text-[#32CD32]">Supreme</span> Dart
            </h1>
          </div>          
          <p>Your one-stop platform for all bills payment.<br />Trusted, Fast, and Secure</p>
        </div>

        {/* About */}
        <div>
          <h4 className="font-semibold text-lg mb-3">About</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
          </ul>
        </div>

        {/* Partnership */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Partnership</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:underline">Portal Owner</a></li>
            <li><a href="#" className="hover:underline">Api Documentation</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <House className="mt-1" /> No: 14, King Palace Road, Uke,<br />  Nasarawa State, Nigeria.
            </li>
            <li className="flex items-center gap-2">
              <Phone /> 08133518086
            </li>
            <li className="flex items-center gap-2">
              <Mail /> dominickama46@gmail.com
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-400 w-[90vw] justify-self-center mt-16 pt-8 text-center text-sm text-gray-600">
        © 2025 Supreme Dart - All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
