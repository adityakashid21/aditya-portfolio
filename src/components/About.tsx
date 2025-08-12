import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              I'm <strong>Aditya Prakash Kashid</strong>, an IT Engineer and B.Tech student with a passion for 
              React Native app development. I specialize in creating cross-platform mobile applications 
              that solve real-world problems, particularly in the education sector.
            </p>
            <p>
              Currently based in <strong>Surat, Gujarat</strong> (temporary) with roots in <strong>Nashik, Maharashtra</strong> 
              (permanent), I combine my engineering background with modern development skills to build 
              innovative solutions using React Native, Firebase, and AI/ML technologies.
            </p>
            <p>
              My projects like ThinkList, Gurukull Tracker, and SkillSwap demonstrate my ability to 
              create impactful applications that streamline processes and enhance user experiences.
            </p>
            <div className="about-stats">
              <div className="stat">
                <h3>B.Tech</h3>
                <p>Student</p>
              </div>
              <div className="stat">
                <h3>3+</h3>
                <p>Major Projects</p>
              </div>
              <div className="stat">
                <h3>8+</h3>
                <p>Technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
