import React from 'react';
import { Instagram, Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-800 py-16 sm:py-20 md:py-24 relative overflow-hidden border-t border-gray-200">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 mb-8 sm:mb-12">
          {/* About Section */}
          <div>
            <div className="flex items-center mb-4">
              <div className="w-24 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">
                Manoj V
              </div>
              <span className="ml-3 text-xl font-bold text-gray-800">Portfolio</span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Turning ideas into fast, beautiful, and user-centered web & mobile experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Quick Links</h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
              <li>
                <a href="#home" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Follow Me</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/itzz__manoj_?igsh=MWplNm9yanQxODR5cQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Instagram"
              >
                <Instagram size={20} className="sm:w-6 sm:h-6 text-gray-700 hover:text-white transition-colors" />
              </a>
              <a
                href="https://github.com/ManojGowda15"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-800 hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="GitHub"
              >
                <Github size={20} className="sm:w-6 sm:h-6 text-gray-700 hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/manojv03/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} className="sm:w-6 sm:h-6 text-gray-700 hover:text-white transition-colors" />
              </a>
              <a
                href="mailto:manojv13579@example.com"
                className="w-11 h-11 sm:w-12 sm:h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-red-500 hover:border-transparent transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                aria-label="Email"
              >
                <Mail size={20} className="sm:w-6 sm:h-6 text-gray-700 hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-600">© {currentYear} Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
