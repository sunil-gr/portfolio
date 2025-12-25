import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Code, ArrowRight, AlertCircle } from 'lucide-react';
import { servicesAPI } from '../utils/api';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [servicesContent, setServicesContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchServicesContent = async () => {
      try {
        const response = await servicesAPI.getServices();
        if (response.data.success && response.data.data) {
          setServicesContent(response.data.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching services content:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchServicesContent();
  }, []);

  // Map icon strings to actual icon components
  const iconMap = {
    Smartphone: Smartphone,
    Monitor: Monitor,
    Code: Code,
  };

  // Show error/empty state if no data
  if (!loading && (error || !servicesContent || !servicesContent.services || servicesContent.services.length === 0)) {
    return (
      <section id="services" className="py-20 sm:py-24 md:py-28 lg:py-36 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">Services Section Not Available</h2>
            <p className="text-gray-500">Content is being loaded from the database. Please check back later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-20 sm:py-24 md:py-28 lg:py-36 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
      </div>
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 w-32 h-32 bg-blue-200/40 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 30, 0], rotate: [360, 180, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-200/40 rounded-full blur-3xl"
      />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          {loading ? (
            <>
              <div className="h-12 bg-gray-200 rounded w-64 mx-auto mb-6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-96 mx-auto mb-16 animate-pulse"></div>
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-6 px-4">
                {servicesContent?.sectionTitle || ''}
              </h2>
              <p className="text-gray-700 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 leading-relaxed font-medium">
                {servicesContent?.sectionDescription || ''}
              </p>
            </>
          )}
        </motion.div>

        {!loading && (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
            {(servicesContent?.services || []).sort((a, b) => (a.order || 0) - (b.order || 0)).map((service, index) => {
            const Icon = iconMap[service.icon] || Smartphone;
            const isActive = activeService === index;

            return (
              <motion.div
                key={`${service.slug}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setActiveService(index)}
                className={`p-5 sm:p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.05] ${
                  isActive
                    ? 'bg-white border-2 border-blue-400 shadow-2xl scale-105'
                    : 'bg-white border border-gray-200 hover:bg-white hover:border-blue-300 shadow-lg hover:shadow-xl'
                }`}
              >
                <div className="flex justify-center mb-4 sm:mb-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-br from-blue-500 to-indigo-500 shadow-md' : 'bg-gradient-to-br from-gray-100 to-gray-200'
                    }`}
                  >
                    <Icon
                      className={`${isActive ? 'text-white' : 'text-gray-600'} sm:w-8 sm:h-8`}
                      size={28}
                    />
                  </motion.div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm md:text-base mb-4 sm:mb-5 line-clamp-3 leading-relaxed">
                  {service.shortDescription}
                </p>
                <Link
                  to={`/service/${service.slug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 hover:text-blue-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 group transition-colors duration-300"
                >
                  Read more
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                </Link>
              </motion.div>
            );
          })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;

