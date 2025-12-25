import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Github, Download, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { heroAPI } from '../utils/api';

const Hero = () => {
  const [downloading, setDownloading] = useState(false);
  const [heroContent, setHeroContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const response = await heroAPI.getHero();
        if (response.data.success && response.data.data) {
          const data = response.data.data;
          // Server already normalizes the image URL, but ensure it's accessible
          if (data.image) {
            // If it's a relative path, make it absolute
            if (data.image.startsWith('/images/')) {
              const baseUrl = window.location.origin;
              data.image = `${baseUrl}${data.image}`;
            }
            // If it's already a full URL, use it as is (server already normalized it)
            // No need to replace localhost as server handles this
          }
          setHeroContent(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching hero content:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroContent();
  }, []);

  const handleDownloadCV = async () => {
    try {
      setDownloading(true);

      // Use relative URL or detect from current origin
      const getApiUrl = () => {
        if (process.env.REACT_APP_API_URL) {
          return process.env.REACT_APP_API_URL.endsWith('/api')
            ? process.env.REACT_APP_API_URL
            : `${process.env.REACT_APP_API_URL}/api`;
        }
        // Use relative URL which works on any device
        return '/api';
      };

      const API_URL = getApiUrl();

      // First, fetch CV info to get the original filename
      let filename = 'CV.pdf';
      try {
        const infoResponse = await fetch(`${API_URL}/cv/info`);
        if (infoResponse.ok) {
          const infoData = await infoResponse.json();
          // The filename is directly on the response object (not in data)
          if (infoData.filename) {
            filename = infoData.filename;
          }
        }
      } catch (e) {
        // Could not fetch CV info, will try to extract from headers
      }

      // Now fetch the CV file
      const response = await fetch(`${API_URL}/cv`, {
        method: 'GET',
      });

      if (!response.ok) {
        // Try to get error message from response
        let errorMessage = 'Failed to Download CV';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Try to get filename from Content-Disposition header as backup
      const contentDisposition = response.headers.get('content-disposition');
      if (contentDisposition && filename === 'CV.pdf') {
        // Try filename*=UTF-8'' pattern first (RFC 5987)
        let filenameMatch = contentDisposition.match(/filename\*=UTF-8''([^;\n]+)/i);
        if (filenameMatch) {
          try {
            filename = decodeURIComponent(filenameMatch[1]);
          } catch (e) {
            filename = filenameMatch[1];
          }
        } else {
          // Try regular filename= pattern
          filenameMatch = contentDisposition.match(/filename=["']?([^"';\n]+)["']?/i);
          if (filenameMatch && filenameMatch[1]) {
            filename = filenameMatch[1];
            // Remove quotes if present
            filename = filename.replace(/^["']|["']$/g, '');
            // Try to decode if it's URL encoded
            try {
              filename = decodeURIComponent(filename);
            } catch (e) {
              // If decoding fails, use as is
            }
          }
        }
      }

      // Get blob from response
      const blob = await response.blob();

      // Check if blob is valid
      if (!blob || blob.size === 0) {
        throw new Error('CV file is empty or invalid');
      }

      // For mobile browsers, use a more compatible download method
      try {
        // Try the standard blob URL method first
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        // Add attributes for better mobile support
        link.setAttribute('download', filename);
        link.setAttribute('target', '_blank');

        document.body.appendChild(link);
        link.click();

        // Clean up after a delay
        setTimeout(() => {
          if (document.body.contains(link)) {
            document.body.removeChild(link);
          }
          window.URL.revokeObjectURL(url);
        }, 1000);
      } catch (blobError) {
        // Fallback: Open in new window/tab if blob URL fails (for HTTP connections or mobile)
        console.warn('Blob URL method failed, trying direct download:', blobError);
        // Try direct link approach
        const directUrl = `${API_URL}/cv`;
        const fallbackLink = document.createElement('a');
        fallbackLink.href = directUrl;
        fallbackLink.download = filename;
        fallbackLink.target = '_blank';
        document.body.appendChild(fallbackLink);
        fallbackLink.click();
        setTimeout(() => {
          if (document.body.contains(fallbackLink)) {
            document.body.removeChild(fallbackLink);
          }
        }, 100);
      }
    } catch (error) {
      console.error('Error downloading CV:', error);
      // Note: Toast will be available if needed, but this is in a public component
      // For now, we'll keep a simple error handling
      console.error('CV download failed:', error.message || 'Failed to Download CV');
    } finally {
      setDownloading(false);
    }
  };

  // Show error/empty state if no data
  if (!loading && (error || !heroContent)) {
    return (
      <section id="home" className="hero-section-height relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50"></div>
        <div className="relative z-10 text-center px-4">
          <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Hero Section Not Available</h2>
          <p className="text-gray-500">Content is being loaded from the database. Please check back later.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="hero-section-height relative overflow-hidden">
      {/* Light Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-50/80 to-indigo-50"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Soft Animated Gradient Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          x: [0, 50, 0],
          y: [0, -80, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-35"
      />

      {/* Content Container */}
      <div className="relative z-10">

        <div className="container mx-auto h-full flex items-center">
        <div className="grid md:grid-cols-2 gap-0 items-center w-full">
          <div className="px-4 sm:px-6 lg:px-8">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 order-2 md:order-1"
            >
            {loading ? (
              <div className="space-y-4">
                <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                <div className="h-12 bg-gray-200 rounded w-64 animate-pulse"></div>
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-24 bg-gray-200 rounded w-full animate-pulse"></div>
              </div>
            ) : (
              <>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-blue-600 text-base sm:text-lg md:text-xl mb-3 font-semibold"
                >
                  {heroContent?.greeting || ''}
                </motion.p>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-2 sm:mb-3 leading-tight"
                >
                  {heroContent?.name || ''}
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight"
                >
                  {heroContent?.designation || ''}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-700 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 leading-relaxed text-left sm:text-justify max-w-xl font-medium"
                >
                  {heroContent?.description || ''}
                </motion.p>
              </>
            )}

            {/* Contact Details & Social Links */}
            {(heroContent && (heroContent.phone || heroContent.email || heroContent.address || heroContent.linkedinUrl || heroContent.githubUrl)) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="mb-4 sm:mb-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Contact Details Column */}
                  {(heroContent.phone || heroContent.email || heroContent.address) && (
                    <div className="space-y-2 sm:space-y-3">
                      {heroContent?.phone && (
                        <motion.div 
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Phone className="text-blue-600" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Phone</p>
                            <p className="text-gray-800 font-semibold text-sm sm:text-base">{heroContent.phone}</p>
                          </div>
                        </motion.div>
                      )}
                      {heroContent?.email && (
                        <motion.div 
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Mail className="text-blue-600" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Email</p>
                            <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">{heroContent.email}</p>
                          </div>
                        </motion.div>
                      )}
                      {heroContent?.address && (
                        <motion.div 
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 transition-all duration-300 group"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <MapPin className="text-blue-600" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">Address</p>
                            <p className="text-gray-800 font-semibold text-sm sm:text-base">{heroContent.address}</p>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  )}

                  {/* Social Links Column */}
                  {(heroContent.linkedinUrl || heroContent.githubUrl) && (
                    <div className="space-y-2 sm:space-y-3">
                      <h3 className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2 sm:mb-3">Social Links</h3>
                      {heroContent?.linkedinUrl && (
                        <motion.a
                          href={heroContent.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 transition-all duration-300 group"
                          aria-label="LinkedIn"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Linkedin className="text-blue-600" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">LinkedIn</p>
                            <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">Connect with me</p>
                          </div>
                        </motion.a>
                      )}
                      {heroContent?.githubUrl && (
                        <motion.a
                          href={heroContent.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center gap-4 transition-all duration-300 group"
                          aria-label="GitHub"
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                            <Github className="text-blue-600" size={18} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-0.5">GitHub</p>
                            <p className="text-gray-800 font-semibold text-sm sm:text-base truncate">View my work</p>
                          </div>
                        </motion.a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-4 sm:mb-6"
            >
              <Link
                to="#contact"
                onClick={e => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-bold flex items-center justify-center text-sm sm:text-base shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                Let's Talk
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <button
                onClick={handleDownloadCV}
                disabled={downloading}
                className="bg-white text-gray-700 border-2 border-gray-300 px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:border-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300 font-bold flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                {downloading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download className="mr-2" size={18} />
                    Download CV
                  </>
                )}
              </button>
            </motion.div>
          </motion.div>
          </div>

          {/* Right Content - Portrait */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 order-1 md:order-2 pr-0"
          >
            <div className="relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ml-auto mr-0">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-blue-300 blur-3xl opacity-50"></div>
              <div className="absolute -bottom-6 -left-4 w-20 h-20 rounded-full bg-indigo-300 blur-3xl opacity-50"></div>
              {/* Dynamic Portrait Image - Fetched from Database */}
              {heroContent?.image && heroContent.image.trim() !== '' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img
                    src={heroContent.image}
                    alt={heroContent?.name || 'Portrait'}
                    className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover object-top rounded-xl"
                    loading="lazy"
                    onError={e => {
                      console.error('Error loading hero image:', heroContent.image);
                      // Prevent infinite loop by checking if already set to placeholder
                      if (
                        e.target.src !==
                        'https://via.placeholder.com/400x560?text=Image+Not+Available'
                      ) {
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src =
                          'https://via.placeholder.com/400x560?text=Image+Not+Available';
                      }
                    }}
                  />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white"
                >
                  <div className="h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] bg-gradient-to-br from-blue-100 via-blue-50 to-indigo-100 flex items-center justify-center rounded-xl">
                    <div className="text-center px-6">
                      <div className="w-28 h-28 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                        <span className="text-4xl">👨‍💼</span>
                      </div>
                      <p className="text-gray-700 font-semibold">Portrait Image</p>
                      <p className="text-gray-500 text-sm mt-2">
                        Upload an image in the admin panel
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
