import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutAPI } from '../utils/api';
import { AlertCircle } from 'lucide-react';

const About = () => {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await aboutAPI.getAbout();
        if (response.data.success && response.data.data) {
          setAboutContent(response.data.data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  // Show error/empty state if no data
  if (!loading && (error || !aboutContent)) {
    return (
      <section id="about" className="py-20 sm:py-24 md:py-28 lg:py-36 section-bg-gradient relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <AlertCircle className="w-16 h-16 text-body-light mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">About Section Not Available</h2>
            <p className="text-body-light">Content is being loaded from the database. Please check back later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 sm:py-24 md:py-28 lg:py-36 section-bg-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 orb-primary opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 orb-primary opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-section-title mb-6">
            About Me
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
          {/* Narrative & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-bg-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-primary-light"
          >
            {loading ? (
              <div className="space-y-4">
                <div className="h-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-32 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <p className="text-body-light text-sm sm:text-base md:text-lg leading-relaxed text-left sm:text-justify mb-6">
                  {aboutContent?.description || ''}
                </p>

                <div className="mt-8 sm:mt-10 grid sm:grid-cols-2 gap-4 sm:gap-6">
                  {(aboutContent?.highlights || []).map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="highlight-card rounded-xl sm:rounded-2xl p-4 sm:p-5 border shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{item.value || ''}</p>
                  <p className="text-primary font-semibold mt-1 text-sm sm:text-base">{item.label || ''}</p>
                  <p className="text-body-light text-xs sm:text-sm mt-2">{item.detail || ''}</p>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="sm:col-span-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 mission-card shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <p className="uppercase tracking-widest text-xs font-semibold opacity-90 mb-2">Mission</p>
                <p className="text-base sm:text-lg font-semibold leading-relaxed">
                  {aboutContent?.mission || ''}
                </p>
              </motion.div>
            </div>
              </>
            )}
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-bg-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl border border-primary-light"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-section-title mb-6 sm:mb-8">Core Skills</h3>
            {loading ? (
              <div className="space-y-8">
                {[1, 2, 3, 4, 5, 6].map(i => (
                  <div key={i} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {(aboutContent?.skills || []).map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-primary font-semibold">{skill.name}</span>
                    <span className="text-body-light text-sm">{skill.progress}%</span>
                  </div>
                  <div className="w-full progress-bar-bg rounded-full h-3 sm:h-4 overflow-hidden shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1, type: 'spring', stiffness: 100 }}
                      className={`${skill.color} h-full rounded-full relative shadow-lg`}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full border-2 border-white shadow-md"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
