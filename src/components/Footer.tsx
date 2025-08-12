import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'GitHub', icon: '🐙', href: '#', color: '#333' },
    { name: 'LinkedIn', icon: '💼', href: '#', color: '#0077b5' },
    { name: 'WhatsApp', icon: '💬', href: 'https://wa.me/919881891277', color: '#25d366' },
    { name: 'Email', icon: '📧', href: 'mailto:aadityakashid21@gmail.com', color: '#ea4335' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Projects', href: '#projects', icon: '🚀' },
    { name: 'Contact', href: '#contact', icon: '📧' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="footer">
      <div className="footer-background"></div>
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div className="footer-info" variants={itemVariants}>
            <div className="footer-brand">
              <span className="footer-icon">👨‍💻</span>
              <h3 className="footer-title">Aditya Kashid</h3>
            </div>
            <p className="footer-description">
              React Native Developer & IT Engineer passionate about creating innovative 
              mobile applications and automation solutions.
            </p>
            <div className="footer-location">
              <span className="location-icon">📍</span>
              <span>Surat, Gujarat | Nashik, Maharashtra</span>
            </div>
          </motion.div>

          <motion.div className="footer-links" variants={itemVariants}>
            <h4 className="footer-section-title">Quick Links</h4>
            <ul className="links-list">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.name}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href={link.href} className="footer-link">
                    <span className="link-icon">{link.icon}</span>
                    <span className="link-text">{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div className="footer-social" variants={itemVariants}>
            <h4 className="footer-section-title">Connect With Me</h4>
            <div className="social-links">
              <motion.a
                href="https://github.com/adityakashid21"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">🔗</span>
                <span className="social-name">GitHub</span>
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/aditya-kashid-736213280"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">💼</span>
                <span className="social-name">LinkedIn</span>
              </motion.a>
              <motion.a
                href="https://wa.me/919881891277"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">📱</span>
                <span className="social-name">WhatsApp</span>
              </motion.a>
              <motion.a
                href="mailto:aadityakashid21@gmail.com"
                className="social-link"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon">✉️</span>
                <span className="social-name">Email</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="footer-divider"></div>
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; {currentYear} <span className="brand-highlight">Aditya Kashid</span>. 
              All rights reserved.
            </p>
            <p className="built-with">
              Built with <span className="heart">❤️</span> using React & TypeScript
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
