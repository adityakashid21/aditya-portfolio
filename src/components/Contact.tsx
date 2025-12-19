import React from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact: React.FC = () => {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="section-title">Get In Touch</h2>
        <div className="contact-content-centered">
          <div className="contact-info-centered">
            <h3>Let's Work Together</h3>
            <p className="contact-description">
              I'm always interested in new opportunities and exciting React Native projects.
              Whether you need a mobile app developer or just want to discuss ideas, feel free to reach out!
            </p>

            <div className="contact-details-grid">
              <motion.div
                className="contact-info-item"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="icon-box">
                  <span className="icon">📍</span>
                </div>
                <div>
                  <h4>Location</h4>
                  <p>Currently: Surat, Gujarat</p>
                  <p className="sub-text">From: Nashik, Maharashtra</p>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-item"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="icon-box">
                  <span className="icon">📧</span>
                </div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:aadityakashid21@gmail.com">aadityakashid21@gmail.com</a>
                </div>
              </motion.div>

              <motion.div
                className="contact-info-item"
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="icon-box">
                  <span className="icon">📱</span>
                </div>
                <div>
                  <h4>Phone</h4>
                  <a href="tel:+919730859883">+91 97308 59883</a>
                </div>
              </motion.div>
            </div>

            <div className="contact-actions-centered">
              <motion.a
                href="https://forms.gle/S5g95ZHxu8zKDdpz7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-collab"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🤝 Collab With Me
              </motion.a>

              <motion.a
                href="https://calendar.app.google/8nk1orfBahnXpJ3C8"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-schedule"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📅 Schedule Meeting
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
