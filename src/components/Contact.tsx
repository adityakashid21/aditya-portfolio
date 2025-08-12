import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import './Contact.css';

const Contact: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (status !== 'idle') {
      setStatus('idle');
      setStatusMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

    setIsSubmitting(true);
    setStatus('idle');
    setStatusMessage('');

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: 'aadityakashid21@gmail.com'
        },
        publicKey
      );

      setStatus('success');
      setStatusMessage("Thank you! Your message has been sent.");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setStatusMessage('Something went wrong while sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Work Together</h3>
            <p>
              I'm always interested in new opportunities and exciting React Native projects. 
              Whether you need a mobile app developer or just want to discuss ideas, feel free to reach out!
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <strong>Email:</strong>
                <span>aadityakashid21@gmail.com</span>
              </div>
              <div className="contact-item">
                <strong>WhatsApp:</strong>
                <span>+91 9881891277</span>
              </div>
              <div className="contact-item">
                <strong>Location:</strong>
                <span>Surat, Gujarat | Nashik, Maharashtra</span>
              </div>
            </div>
          </div>
          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <motion.button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''} ${status === 'success' ? 'success' : ''}`}
              disabled={isSubmitting}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : status === 'success' ? (
                <>
                  <span className="success-icon">✓</span>
                  Message Sent!
                </>
              ) : status === 'error' ? (
                'Try Again'
              ) : (
                'Send Message'
              )}
            </motion.button>
            
            {/* Status Messages */}
            {status === 'success' && (
              <motion.div 
                className="status-message success"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="status-icon">🎉</span>
                {statusMessage || "Thank you for your message! I'll get back to you soon."}
              </motion.div>
            )}
            
            {status === 'error' && (
              <motion.div 
                className="status-message error"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <span className="status-icon">⚠️</span>
                {statusMessage || 'Something went wrong. Please try again.'}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
