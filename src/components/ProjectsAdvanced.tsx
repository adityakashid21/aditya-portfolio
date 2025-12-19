
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaChalkboardTeacher, FaHandshake, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdRestaurant, MdFitnessCenter, MdFastfood } from 'react-icons/md';
import './ProjectsAdvanced.css';

// Icon wrapper components to satisfy TypeScript
const GraduationCapIcon = () => <FaGraduationCap />;
const ChalkboardTeacherIcon = () => <FaChalkboardTeacher />;
const HandshakeIcon = () => <FaHandshake />;
const RestaurantIcon = () => <MdRestaurant />;
const FitnessIcon = () => <MdFitnessCenter />;
const FastfoodIcon = () => <MdFastfood />;

interface Project {
  title: string;
  description: string;
  technologies: string[];
  gradient: string;
  appIcon: React.ReactNode;
  github: string;
  demo?: string;
  screenContent?: React.ReactNode;
}

const ProjectsAdvanced: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const projects: Project[] = [
    {
      title: 'Samir Food',
      description: 'Modern food delivery and restaurant website with online ordering system, menu showcase, and customer reviews. Features responsive design and smooth user experience.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
      gradient: 'linear-gradient(to bottom right, #f97316, #ea580c)',
      appIcon: <FastfoodIcon />,
      github: 'https://github.com/adityakashid21/samirfood',
      demo: 'https://samirfood-jdqqtehpf-adityakashid21s-projects.vercel.app/',
      screenContent: (
        <div className="app-screen-mockup samirfood-mockup">
          <div className="mockup-header">Samir Food</div>
          <div className="mockup-row short"></div>
          <div className="mockup-card"></div>
          <div className="mockup-row long"></div>
        </div>
      )
    },
    {
      title: 'Elite Cafes & Hotels',
      description: 'A premium hospitality website featuring a complete booking system, testimonials, and responsive design. Built with React, TypeScript, and Tailwind CSS for modern user experience.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      gradient: 'linear-gradient(to bottom right, #D4A574, #C17855)',
      appIcon: <RestaurantIcon />,
      github: 'https://github.com/adityakashid21/softdemo',
      demo: 'https://adityakashid21.github.io/softdemo',
      screenContent: (
        <div className="app-screen-mockup elite-mockup">
          <div className="mockup-header">Elite Cafes & Hotels</div>
          <div className="mockup-row short"></div>
          <div className="mockup-card"></div>
          <div className="mockup-row long"></div>
        </div>
      )
    },
    {
      title: 'Iron Forge Gym',
      description: 'Complete fitness center website with Diet Plan Maker, Workout Planner (9 programs), and Class Booking System. Features BMI calculator and personalized nutrition plans.',
      technologies: ['React', 'TypeScript', 'Framer Motion', 'shadcn/ui'],
      gradient: 'linear-gradient(to bottom right, #ff4444, #cc0000)',
      appIcon: <FitnessIcon />,
      github: 'https://github.com/adityakashid21/ironforage',
      demo: 'https://adityakashid21.github.io/ironforage',
      screenContent: (
        <div className="app-screen-mockup ironforge-mockup">
          <div className="mockup-header">Iron Forge</div>
          <div className="mockup-chart"></div>
          <div className="mockup-row-group">
            <div className="mockup-row"></div>
            <div className="mockup-row"></div>
          </div>
        </div>
      )
    },
    {
      title: 'ThinkList',
      description: 'A centralized student learning companion app implementing offline-first access for study materials and academic resources. Designed a distraction-free interface focused on learning productivity.',
      technologies: ['React Native', 'Firebase', 'AsyncStorage', 'Offline-First'],
      gradient: 'linear-gradient(to bottom right, #1e3a8a, #172554)',
      appIcon: <GraduationCapIcon />,
      github: 'https://github.com/adityakashid21',
      demo: '#',
      screenContent: (
        <div className="app-screen-mockup thinklist-mockup">
          <div className="mockup-header">ThinkList</div>
          <div className="mockup-row short"></div>
          <div className="mockup-row long"></div>
          <div className="mockup-card"></div>
          <div className="mockup-card"></div>
        </div>
      )
    },
    {
      title: 'Gurukull Tracker',
      description: 'Comprehensive tuition management app handling attendance, fee tracking, and automated PDF receipt/marksheet generation. Streamlined daily academic operations for coaching centers.',
      technologies: ['React Native', 'Firestore', 'PDFKit', 'Analytics'],
      gradient: 'linear-gradient(to bottom right, #065f46, #064e3b)',
      appIcon: <ChalkboardTeacherIcon />,
      github: 'https://github.com/adityakashid21',
      demo: '#',
      screenContent: (
        <div className="app-screen-mockup gurukull-mockup">
          <div className="mockup-header">Dashboard</div>
          <div className="mockup-chart"></div>
          <div className="mockup-row-group">
            <div className="mockup-row"></div>
            <div className="mockup-row"></div>
          </div>
        </div>
      )
    },
    {
      title: 'SkillSwap',
      description: 'A peer-to-peer platform enabling users to exchange skills without monetary transactions. Features user profiles, real-time messaging, and intelligent matching logic.',
      technologies: ['React Native', 'Node.js', 'Socket.io', 'Community'],
      gradient: 'linear-gradient(to bottom right, #9a3412, #7c2d12)',
      appIcon: <HandshakeIcon />,
      github: 'https://github.com/adityakashid21',
      demo: '#',
      screenContent: (
        <div className="app-screen-mockup skillswap-mockup">
          <div className="mockup-search"></div>
          <div className="mockup-profile-row">
            <div className="mockup-avatar"></div>
            <div className="mockup-line"></div>
          </div>
          <div className="mockup-profile-row">
            <div className="mockup-avatar"></div>
            <div className="mockup-line"></div>
          </div>
        </div>
      )
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="projects-advanced" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header-advanced"
        >
          <h2 className="section-title-advanced">Featured Apps & Projects</h2>
          <p className="section-subtitle-advanced">
            Mobile applications and projects designed for impact, functionality, and exceptional user experience.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="projects-grid-advanced"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="project-card-advanced"
              whileHover={{ y: -10 }}
            >
              {/* Phone Frame Styling */}
              <div className="project-image-container" style={{ background: project.gradient }}>
                <div className="phone-mockup-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    {project.screenContent}
                  </div>
                </div>
              </div>

              <div className="project-card-content-wrapper">
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div className="project-app-icon">
                    {project.appIcon}
                  </div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>{project.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>{project.technologies[0]}</span>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.9rem', margin: '1rem 0', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div className="project-get-btn">GET</div>
                  <a href={project.github} style={{ color: '#38bdf8', fontSize: '0.9rem', textDecoration: 'none' }}>Details</a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsAdvanced;

