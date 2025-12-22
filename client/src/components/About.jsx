import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutAPI } from '../utils/api';
import { DEFAULT_ABOUT } from '../utils/defaults';

const About = () => {
  const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await aboutAPI.getAbout();
        if (response.data.success && response.data.data) {
          setAboutContent(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching about content:', error);
        // Use default values if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Narrative & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-blue-50/60 via-white to-blue-50/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-blue-100/50"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3 sm:mb-4">About Me</h2>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed text-left sm:text-justify">
              {loading 
                ? 'Passionate UI/UX Designer with a Creative Approach to Crafting Intuitive and Engaging User Experiences'
                : aboutContent.description || 'Passionate UI/UX Designer with a Creative Approach to Crafting Intuitive and Engaging User Experiences'}
            </p>

            <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-3 sm:gap-4">
              {(loading ? DEFAULT_ABOUT.highlights : (aboutContent.highlights || [])).map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-blue-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <p className="text-2xl sm:text-3xl font-bold text-blue-700">{item.value || ''}</p>
                  <p className="text-gray-800 font-semibold mt-1 text-sm sm:text-base">{item.label || ''}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-2">{item.detail || ''}</p>
                </motion.div>
              ))}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="sm:col-span-2 rounded-xl sm:rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <p className="uppercase tracking-widest text-xs font-semibold opacity-90 mb-2">Mission</p>
                <p className="text-base sm:text-lg font-semibold leading-relaxed">
                  {loading 
                    ? 'Crafting meaningful products that balance stunning visuals with dependable performance.'
                    : aboutContent.mission || 'Crafting meaningful products that balance stunning visuals with dependable performance.'}
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] border border-gray-100"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">Core Skills</h3>
            <div className="space-y-6">
              {(loading ? aboutContent.skills : (aboutContent.skills || [])).map((skill, index) => (
                <motion.div
                  key={`${skill.name}-${index}`}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-800 font-semibold">{skill.name}</span>
                    <span className="text-gray-500 text-sm">{skill.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className={`${skill.color} h-full rounded-full relative`}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full border-2 border-gray-200"></div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
