import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ProjectsAdvanced.css';

const ProjectsAdvanced: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const projects = [
    {
      title: 'ThinkList',
      description: 'A comprehensive student learning companion designed to centralize all academic resources in one place. Features study materials, past examination papers, organized categories, and mobile-first UI for offline usage.',
      technologies: ['React Native', 'Firebase', 'Firestore', 'Tailwind RN', 'AsyncStorage'],
      github: '#',
      demo: 'https://drive.google.com/file/d/173hUUkOLwGRfPpOMyH4t53MGU4Ye5OaM/view?usp=sharing',
      image: '📚',
      color: '#4285f4'
    },
    {
      title: 'Gurukull Tracker',
      description: 'A smart tuition/classroom management app that streamlines academic workflows. Features PDF marksheet generation, automated bill receipts, student analytics dashboard, and integrated study materials.',
      technologies: ['React Native', 'Firebase', 'Firestore', 'PDFKit'],
      github: '#',
      demo: 'https://drive.google.com/file/d/1sSmJ947XnLEt6ejd0stOK30tLON98w_g/view?usp=sharing',
      image: '🎓',
      color: '#34a853'
    },
    {
      title: 'SkillSwap',
      description: 'A community-driven skill exchange platform enabling users to learn new skills through a tokenless barter system. Features messaging, video calling, user profiles, and matchmaking algorithm.',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'WebRTC', 'Socket.io'],
      github: '#',
      demo: 'https://drive.google.com/file/d/16YdsytVdPnjCgjbI4xV4MtxMft-T6WPw/view?usp=sharing',
      image: '🤝',
      color: '#ea4335'
    },
    {
      title: 'n8n Automation Workflows',
      description: 'Custom automation solutions using n8n for business process automation, data integration, and workflow orchestration. Streamlines repetitive tasks and connects various APIs.',
      technologies: ['n8n', 'Node.js', 'REST APIs', 'Webhooks', 'MySQL'],
      github: '#',
      demo: '#',
      image: '🔗',
      color: '#ea4b71'
    },
    {
      title: 'AI/ML Integration Projects',
      description: 'Machine learning solutions integrated into mobile applications for personalized recommendations, automated task management, and intelligent data processing.',
      technologies: ['React Native', 'Python', 'TensorFlow', 'ML/AI', 'Firebase'],
      github: '#',
      demo: '#',
      image: '🤖',
      color: '#ff6b6b'
    },
    {
      title: 'Full-Stack Web Solutions',
      description: 'Responsive web applications with modern UI/UX, real-time data visualization, and seamless backend integration using React and Node.js.',
      technologies: ['React', 'Node.js', 'MySQL', 'HTML/CSS', 'JavaScript'],
      github: '#',
      demo: '#',
      image: '🌐',
      color: '#61dafb'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create animated background elements
    const elements: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7b731', '#5f27cd', '#00d2d3'];

    for (let i = 0; i < 30; i++) {
      elements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.2 + 0.1,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elements.forEach((element) => {
        element.x += element.vx;
        element.y += element.vy;
        element.rotation += element.rotationSpeed;

        if (element.x < 0) element.x = canvas.width;
        if (element.x > canvas.width) element.x = 0;
        if (element.y < 0) element.y = canvas.height;
        if (element.y > canvas.height) element.y = 0;

        ctx.save();
        ctx.translate(element.x, element.y);
        ctx.rotate(element.rotation);
        ctx.beginPath();
        ctx.rect(-element.size / 2, -element.size / 2, element.size, element.size);
        ctx.fillStyle = element.color;
        ctx.globalAlpha = element.opacity;
        ctx.fill();
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 80, rotateX: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="projects" className="projects-advanced" ref={ref}>
      <canvas ref={canvasRef} className="projects-canvas" />
      
      <div className="projects-advanced-content">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="projects-advanced-header"
          >
            <motion.h2 variants={itemVariants} className="section-title-advanced">
              Featured Projects
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle-advanced">
              Cutting-edge applications solving real-world problems with modern technologies and innovative solutions
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="projects-advanced-grid"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                className="project-card-advanced"
                whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: '1000px' }}
              >
                <div className="project-card-inner-advanced">
                  <div className="project-image-advanced" style={{ backgroundColor: project.color }}>
                    <span className="project-emoji">{project.image}</span>
                    <div className="project-overlay-advanced">
                      <div className="project-links-advanced">
                        <motion.a 
                          href={project.github} 
                          className="project-link-advanced"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          GitHub
                        </motion.a>
                        <motion.a 
                          href={project.demo} 
                          className="project-link-advanced"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          Live Demo
                        </motion.a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content-advanced">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="project-tech-advanced">
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span 
                          key={techIndex} 
                          className="tech-tag-advanced"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="project-card-glow-advanced" style={{ backgroundColor: project.color }}></div>
                <div className="project-card-border-advanced" style={{ borderColor: project.color }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsAdvanced;
