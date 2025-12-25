import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { contactAPI } from '../utils/api';
import { useToast } from './Toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await contactAPI.sendMessage(formData);
      toast.success('Message sent successfully! I\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-28 lg:py-36 section-bg-gradient-alt relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 orb-primary opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 orb-primary opacity-30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-section-title mb-6 px-4 drop-shadow-lg">Get In Touch</h2>
          <p className="text-section-subtitle text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4 leading-relaxed font-medium">
            Have a project in mind? Let's work together to bring your ideas to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="card-bg-light p-6 sm:p-8 md:p-10 lg:p-12 rounded-2xl shadow-2xl border border-primary-light">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
              <div>
                <label htmlFor="name" className="block text-primary font-medium mb-2 text-sm sm:text-base">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 input-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-primary font-medium mb-2 text-sm sm:text-base">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 input-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="mb-6 sm:mb-8">
              <label htmlFor="subject" className="block text-primary font-medium mb-2 text-sm sm:text-base">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 input-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm sm:text-base"
                placeholder="Project Inquiry"
              />
            </div>

            <div className="mb-6 sm:mb-8">
              <label htmlFor="message" className="block text-primary font-medium mb-2 text-sm sm:text-base">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 input-primary rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none text-sm sm:text-base"
                placeholder="Tell me about your project..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all duration-300 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

