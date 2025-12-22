import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, ArrowRight } from 'lucide-react';
import { servicesAPI } from '../utils/api';
import { DEFAULT_SERVICES } from '../utils/defaults';

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [servicesContent, setServicesContent] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServicesContent = async () => {
      try {
        const response = await servicesAPI.getServices();
        if (response.data.success && response.data.data) {
          setServicesContent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching services content:', error);
        // Use default values if API fails
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
  };

  return (
    <section id="services" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-white via-blue-50/50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-clip-text text-transparent mb-3 sm:mb-4 px-4">
            {loading ? DEFAULT_SERVICES.sectionTitle : servicesContent.sectionTitle || DEFAULT_SERVICES.sectionTitle}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            {loading 
              ? DEFAULT_SERVICES.sectionDescription
              : servicesContent.sectionDescription || DEFAULT_SERVICES.sectionDescription}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-5xl mx-auto px-4">
          {(loading ? servicesContent.services : (servicesContent.services || [])).sort((a, b) => (a.order || 0) - (b.order || 0)).map((service, index) => {
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
                className={`p-5 sm:p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                  isActive
                    ? 'bg-gradient-to-br from-white to-blue-50 border-2 border-blue-600 shadow-xl'
                    : 'bg-white border border-gray-200 hover:border-blue-300 shadow-md hover:shadow-lg'
                }`}
              >
                <div className="flex justify-center mb-4 sm:mb-5">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className={`p-3 sm:p-4 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-gradient-to-br from-blue-100 to-blue-200 shadow-md' : 'bg-gray-100'
                    }`}
                  >
                    <Icon
                      className={`${isActive ? 'text-blue-600' : 'text-gray-600'} sm:w-8 sm:h-8`}
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
      </div>
    </section>
  );
};

export default Services;

