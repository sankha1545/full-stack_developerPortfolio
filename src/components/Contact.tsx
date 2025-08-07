// src/components/Contact.tsx

import React, { useEffect, useRef, useState } from 'react';
import anime from 'animejs/lib/anime.es.js';
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  MapPin,
  Phone,
  Github,
  Linkedin
} from 'lucide-react';

const SERVICE_ID  = 'service_gzsqglr';
const TEMPLATE_ID = 'template_xgwdpz5';
const USER_ID     = '9jLaTnvQ203rE4a2q';

const Contact: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);

  // Form state
  const [formData, setFormData]       = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus]           = useState<'idle' | 'success' | 'error'>('idle');

  // Entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate form container
            anime({
              targets: '.contact-form',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutQuart',
            });
            // Animate info container
            anime({
              targets: '.contact-info',
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: 300,
              easing: 'easeOutQuart',
            });
            // Animate each field
            anime({
              targets: '.form-field',
              scale: [0.9, 1],
              opacity: [0, 1],
              duration: 800,
              delay: anime.stagger(150, { start: 600 }),
              easing: 'easeOutElastic(1, .8)',
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    if (contactRef.current) observer.observe(contactRef.current);
    return () => observer.disconnect();
  }, []);

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Focus / blur animations
  const handleInputFocus = (e: React.FocusEvent<HTMLElement>) => {
    anime({ targets: e.target, scale: 1.02, duration: 300, easing: 'easeOutQuart' });
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
    anime({ targets: e.target, scale: 1, duration: 300, easing: 'easeOutQuart' });
  };

  // Submit via EmailJS
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setStatus('idle');

    // Button press animation
    anime({
      targets: '.send-button',
      scale: [1, 0.95, 1.05, 1],
      duration: 600,
      easing: 'easeInOutQuart',
    });

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, USER_ID);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      anime({
        targets: '.success-message',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .8)',
      });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      anime({
        targets: '.error-message',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutElastic(1, .8)',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen py-20" ref={contactRef}>
      <div className="px-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold md:text-7xl">
            <span className="text-transparent bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text glow-text">
              Let's Connect
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-gray-300">
            Ready to bring your next project to life? Let's discuss how we can create something extraordinary together.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="opacity-0 contact-info">
            <div className="space-y-8">
              <h3 className="mb-8 text-3xl font-bold text-white glow-white">
                Get In Touch
              </h3>

              {/* Email */}
              <a
                href="mailto:sankhasubhradas1@gmail.com"
                className="flex items-center p-4 space-x-4 transition-all duration-300 border border-gray-700 rounded-lg hover:border-cyan-400 group neon-border-hover"
              >
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email</h4>
                  <p className="text-gray-400 transition-colors duration-300 group-hover:text-cyan-400">
                    sankhasubhradas1@gmail.com
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href="tel:+918597786209"
                className="flex items-center p-4 space-x-4 transition-all duration-300 border border-gray-700 rounded-lg hover:border-cyan-400 group neon-border-hover"
              >
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Phone</h4>
                  <p className="text-gray-400 transition-colors duration-300 group-hover:text-cyan-400">
                    +91 85977 86209
                  </p>
                </div>
              </a>

              {/* Location */}
              <a
                href="#"
                className="flex items-center p-4 space-x-4 transition-all duration-300 border border-gray-700 rounded-lg hover:border-cyan-400 group neon-border-hover"
              >
                <div className="flex items-center justify-center w-12 h-12 transition-transform duration-300 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-gray-400 transition-colors duration-300 group-hover:text-cyan-400">
                    Burdwan, West Bengal 713103
                  </p>
                </div>
              </a>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="mb-4 font-semibold text-white">Follow Me</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/sankha1545"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 border-gray-600 rounded-lg hover:border-cyan-400 group neon-border-hover"
                  >
                    <Github size={24} className="text-gray-400 transition-colors group-hover:text-cyan-400" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/sankha-subhra-das-625ab6201/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 border-gray-600 rounded-lg hover:border-cyan-400 group neon-border-hover"
                  >
                    <Linkedin size={24} className="text-gray-400 transition-colors group-hover:text-cyan-400" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="opacity-0 contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="opacity-0 form-field">
                <label htmlFor="name" className="block mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 border-2 border-gray-700 rounded-lg bg-gray-900/50 focus:border-cyan-400 focus:outline-none backdrop-blur-sm neon-input"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email Field */}
              <div className="opacity-0 form-field">
                <label htmlFor="email" className="block mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 border-2 border-gray-700 rounded-lg bg-gray-900/50 focus:border-cyan-400 focus:outline-none backdrop-blur-sm neon-input"
                  placeholder="Enter your email"
                />
              </div>

              {/* Message Field */}
              <div className="opacity-0 form-field">
                <label htmlFor="message" className="block mb-2 text-sm font-semibold tracking-wider text-gray-400 uppercase">
                  Project Details
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 text-white placeholder-gray-500 transition-all duration-300 border-2 border-gray-700 rounded-lg resize-none bg-gray-900/50 focus:border-cyan-400 focus:outline-none backdrop-blur-sm neon-input"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`relative w-full overflow-hidden py-3 px-6 text-white bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg transition-opacity ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                } send-button neon-button neon-button-primary group`}
              >
                <span className="relative z-10 flex items-center justify-center space-x-3">
                  <Send size={20} />
                  <span>{isSubmitting ? 'Sending…' : 'Send Message'}</span>
                </span>
                <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-cyan-500 via-green-500 to-pink-500 group-hover:opacity-20" />
              </button>

              {/* Success Message */}
              <div className={`hidden py-4 text-center scale-0 opacity-0 success-message ${status === 'success' ? 'block' : ''}`}>
                <div className="font-semibold text-green-400">
                  ✨ Message sent successfully! I'll get back to you soon.
                </div>
              </div>

              {/* Error Message */}
              <div className={`hidden py-4 text-center scale-0 opacity-0 error-message ${status === 'error' ? 'block' : ''}`}>
                <div className="font-semibold text-red-400">
                  ⚠️ Oops! Something went wrong. Please try again later.
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pt-8 mt-20 text-center border-t border-gray-800">
        <p className="text-gray-500">
          © 2025 Sankha Subhra Das.
        </p>
      </footer>
    </section>
  );
};

export default Contact;
