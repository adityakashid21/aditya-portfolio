import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('#home');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active tab based on scroll position
      const sections = ['home', 'projects', 'skills', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= -100 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveTab(`#${current}`);
    };

    window.addEventListener('scroll', handleScroll);

    const timer = setInterval(() => setTime(new Date()), 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(timer);
    };
  }, []);

  const navItems = [
    { href: '#home', label: 'Home', icon: '🏠' },
    { href: '#projects', label: 'Apps', icon: '🚀' },
    { href: '#skills', label: 'Stack', icon: '⚡' },
    { href: '#contact', label: 'Contact', icon: '📱' }
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <>
      {/* Top Status Bar */}
      <motion.div
        className={`status-bar ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="brand-container">
          <span className="brand-icon">⌘</span>
          <div className="brand-info">
            <span className="brand-text">Aditya.dev</span>
          </div>
          <span className="brand-subtitle">v2.0</span>
        </div>

        <div className="system-info">
          <span className="time">{formatTime(time)}</span>
          <div className="battery" title="100% Battery">
            <span className="battery-text">100%</span>
            <div className="battery-icon">
              <div className="battery-level"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Floating Dock Navigation */}
      <div className="dock-container">
        <motion.nav
          className="dock-nav"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`dock-item ${activeTab === item.href ? 'active' : ''}`}
              onClick={() => setActiveTab(item.href)}
            >
              <span className="dock-icon">{item.icon}</span>
              <span className="dock-label">{item.label}</span>
              {activeTab === item.href && (
                <motion.div
                  className="dock-indicator"
                  layoutId="dockIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </motion.nav>
      </div>
    </>
  );
};

export default Header;
