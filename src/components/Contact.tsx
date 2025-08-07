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

  const [formData, setFormData]         = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus]             = useState<'idle' | 'success' | 'error'>('idle');

  // Entrance animations on scroll
  useEffect(() => {
    if (!contactRef.current) return;
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Animate form and info containers + fields
            anime({
              targets: '.contact-form',
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 1000,
              easing: 'easeOutQuart',
            });
            anime({
              targets: '.contact-info',
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: 300,
              easing: 'easeOutQuart',
            });
            anime({
              targets: '.form-field',
              scale: [0.9, 1],
              opacity: [0, 1],
              duration: 800,
              delay: anime.stagger(150, { start: 600 }),
              easing: 'easeOutElastic(1, .8)',
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(contactRef.current);
    return () => obs.disconnect();
  }, []);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Focus/blur animations
  const handleInputFocus = (e: React.FocusEvent<HTMLElement>) => {
    anime({ targets: e.target, scale: 1.02, duration: 300, easing: 'easeOutQuart' });
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLElement>) => {
    anime({ targets: e.target, scale: 1, duration: 300, easing: 'easeOutQuart' });
  };

  // Submit handler
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
    <section
      id="contact"
      ref={contactRef}
      className="py-20 text-gray-100 bg-transparent-900"
    >
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Let's Connect
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-400 sm:text-lg md:text-xl">
            Ready to bring your next project to life? Let’s discuss how we can create something extraordinary together.
          </p>
        </div>

        {/* Two-column layout: Info + Form */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-8 opacity-0 contact-info">
            <h3 className="text-2xl font-semibold sm:text-3xl">Get In Touch</h3>

            {/* Email */}
         <a
  href="mailto:sankhasubhradas1@gmail.com"
  className="flex items-start w-full p-4 transition border border-gray-700 rounded-lg hover:border-cyan-400 group"
>
  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
    <Mail size={20} className="text-white" />
  </div>
  <div className="flex flex-col w-full ml-4 overflow-hidden">
    <h4 className="font-semibold text-white">Email</h4>
    <p className="w-full text-sm text-gray-400 break-words whitespace-normal group-hover:text-cyan-400">
      sankhasubhradas1@gmail.com
    </p>
  </div>
</a>


            {/* Phone */}
            <a
              href="tel:+918597786209"
              className="flex items-center p-4 transition border border-gray-700 rounded-lg hover:border-cyan-400 group"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
                <Phone size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Phone</h4>
                <p className="text-gray-400 group-hover:text-cyan-400">
                  +91 85977 86209
                </p>
              </div>
            </a>

            {/* Location */}
            <a
              href="#"
              className="flex items-center p-4 transition border border-gray-700 rounded-lg hover:border-cyan-400 group"
            >
              <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 transition rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 group-hover:scale-110">
                <MapPin size={20} className="text-white" />
              </div>
              <div className="ml-4">
                <h4 className="font-semibold">Location</h4>
                <p className="text-gray-400 group-hover:text-cyan-400">
                  Burdwan, West Bengal 713103
                </p>
              </div>
            </a>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="mb-2 font-semibold">Follow Me</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sankha1545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition border-2 border-gray-600 rounded-lg hover:border-cyan-400 group"
                >
                  <Github size={20} className="text-gray-400 transition group-hover:text-cyan-400" />
                </a>
                <a
                  href="https://www.linkedin.com/in/sankha-subhra-das-625ab6201/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 transition border-2 border-gray-600 rounded-lg hover:border-cyan-400 group"
                >
                  <Linkedin size={20} className="text-gray-400 transition group-hover:text-cyan-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="opacity-0 contact-form">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email Fields */}
              {['name', 'email'].map(field => (
                <div key={field} className="opacity-0 form-field">
                  <label
                    htmlFor={field}
                    className="block mb-2 text-sm font-medium text-gray-400 uppercase"
                  >
                    {field === 'name' ? 'Your Name' : 'Email Address'}
                  </label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    id={field}
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                    className="w-full px-4 py-3 text-white placeholder-gray-500 transition bg-gray-800 bg-opacity-50 border-2 border-gray-700 rounded-lg focus:border-cyan-400 focus:outline-none neon-input"
                    placeholder={field === 'name' ? 'Enter your name' : 'Enter your email'}
                  />
                </div>
              ))}

              {/* Message Field */}
              <div className="opacity-0 form-field">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-400 uppercase"
                >
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
                  className="w-full px-4 py-3 text-white placeholder-gray-500 transition bg-gray-800 bg-opacity-50 border-2 border-gray-700 rounded-lg resize-none focus:border-cyan-400 focus:outline-none neon-input"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`send-button w-full flex items-center justify-center py-3 px-5 rounded-lg bg-gradient-to-r from-cyan-500 to-green-500 text-white font-medium transition ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
              >
                <Send size={20} className="mr-2" />
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>

              {/* Success & Error Messages */}
              <div className={`success-message text-green-400 text-center mt-4 transform transition-all ${
                status === 'success'
                  ? 'scale-100 opacity-100'
                  : 'scale-0 opacity-0'
              }`}>
                ✨ Message sent successfully! I'll get back to you soon.
              </div>
              <div className={`error-message text-red-400 text-center mt-4 transform transition-all ${
                status === 'error'
                  ? 'scale-100 opacity-100'
                  : 'scale-0 opacity-0'
              }`}>
                ⚠️ Oops! Something went wrong. Please try again later.
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 mt-16 text-center border-t border-gray-800">
          <p className="text-sm text-gray-500">© 2025 Sankha Subhra Das.</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
