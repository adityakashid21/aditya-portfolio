import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SkillsAdvanced.css';

const SkillsAdvanced: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  interface Skill {
    name: string;
    description: string;
    color: string;
    icon: string;
    tags?: string[];
  }

  const skills: Skill[] = [
    { 
      name: 'React Native', 
      description: 'Cross-platform mobile app development with native performance', 
      color: '#61dafb', 
      icon: '📱',
      tags: ['Mobile Apps', 'iOS', 'Android', 'Expo']
    },
    { 
      name: 'React', 
      description: 'Interactive and responsive web applications', 
      color: '#61dafb', 
      icon: '⚛️',
      tags: ['Hooks', 'Context', 'Redux', 'Next.js']
    },
    { 
      name: 'Node.js', 
      description: 'Scalable backend services and APIs', 
      color: '#339933', 
      icon: '🟢',
      tags: ['Express', 'REST', 'GraphQL', 'API Design']
    },
    { 
      name: 'JavaScript/TypeScript', 
      description: 'Full-stack development with modern ES6+ features', 
      color: '#f7df1e', 
      icon: '🟨',
      tags: ['ES6+', 'Type Safety', 'Async/Await']
    },
    { 
      name: 'MySQL', 
      description: 'Database design and optimization', 
      color: '#4479a1', 
      icon: '🗄️',
      tags: ['Schema Design', 'Queries', 'Indexing']
    },
    { 
      name: 'HTML/CSS', 
      description: 'Semantic markup and responsive design', 
      color: '#e34f26', 
      icon: '🎨',
      tags: ['CSS3', 'Flexbox', 'Grid', 'Animations']
    },
    { 
      name: 'ML/AI', 
      description: 'Machine learning models and AI integration', 
      color: '#ff6b6b', 
      icon: '🤖',
      tags: ['TensorFlow', 'NLP', 'Computer Vision']
    },
    { 
      name: 'n8n Automation', 
      description: 'Workflow automation and system integration', 
      color: '#ea4b71', 
      icon: '🔗',
      tags: ['Workflows', 'API Integration', 'Automation']
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Create floating particles for skills background
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      opacity: number;
    }> = [];

    const colors = ['#64ffda', '#00bcd4', '#61dafb', '#3178c6', '#339933'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 3 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.3 + 0.1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
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
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
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
    <section id="skills" className="skills-advanced" ref={ref}>
      <canvas ref={canvasRef} className="skills-canvas" />
      
      <div className="skills-advanced-content">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="skills-advanced-header"
          >
            <motion.h2 variants={itemVariants} className="section-title-advanced">
              Skills & Technologies
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle-advanced">
              Advanced visualization of my technical expertise with interactive elements
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="skills-advanced-grid"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="skill-card-advanced"
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  z: 50,
                  transition: { duration: 0.3 }
                }}
                style={{ perspective: '1000px' }}
              >
                <div className="skill-card-inner-advanced">
                  <div className="skill-icon-advanced" style={{ backgroundColor: skill.color }}>
                    <span className="skill-emoji">{skill.icon}</span>
                  </div>
                  <h3>{skill.name}</h3>
                  <p className="skill-description">{skill.description}</p>
                  <div className="skill-tags">
                    {skill.tags && skill.tags.map((tag, i) => (
                      <motion.span 
                        key={i}
                        className="skill-tag"
                        initial={{ opacity: 0, y: 10 }}
                        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                        transition={{ delay: index * 0.1 + i * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>
                <div className="skill-card-glow-advanced" style={{ backgroundColor: skill.color }}></div>
                <div className="skill-card-border-advanced"></div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="skills-stats-advanced"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="stat-advanced">
              <h3>8+</h3>
              <p>Technologies</p>
            </motion.div>
            <motion.div variants={itemVariants} className="stat-advanced">
              <h3>15+</h3>
              <p>Projects</p>
            </motion.div>
            <motion.div variants={itemVariants} className="stat-advanced">
              <h3>3+</h3>
              <p>Years Experience</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsAdvanced;
