import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { FaReact, FaNodeJs, FaJava, FaGitAlt } from 'react-icons/fa'; // Fallback if not installed, but standard usually available
import { SiTypescript, SiJavascript, SiFirebase, SiNodedotjs, SiExpo, SiRedux, SiExpress, SiMysql, SiSupabase, SiN8N } from 'react-icons/si';
import { TbApi, TbBrandReactNative } from 'react-icons/tb';
import './SkillsAdvanced.css';

// Icon wrapper components to satisfy TypeScript
const ReactNativeIcon = (props: any) => <TbBrandReactNative {...props} />;
const JavaScriptIcon = (props: any) => <SiJavascript {...props} />;
const TypeScriptIcon = (props: any) => <SiTypescript {...props} />;
const ReactIcon = (props: any) => <FaReact {...props} />;
const ReduxIcon = (props: any) => <SiRedux {...props} />;
const ExpoIcon = (props: any) => <SiExpo {...props} />;
const NodeJsIcon = (props: any) => <FaNodeJs {...props} />;
const ExpressIcon = (props: any) => <SiExpress {...props} />;
const ApiIcon = (props: any) => <TbApi {...props} />;
const FirebaseIcon = (props: any) => <SiFirebase {...props} />;
const SupabaseIcon = (props: any) => <SiSupabase {...props} />;
const N8NIcon = (props: any) => <SiN8N {...props} />;

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
    icon: React.ReactNode;
    tags?: string[];
    category: string;
  }

  const skills = [
    {
      name: 'React Native',
      category: 'Mobile',
      description: 'Production-ready mobile apps',
      color: '#61dafb',
      icon: <ReactNativeIcon size={40} />,
      tags: ['Cross-Platform', 'iOS/Android']
    },
    {
      name: 'JavaScript',
      category: 'Language',
      description: 'Core logic & interactivity',
      color: '#f7df1e',
      icon: <JavaScriptIcon size={40} />,
      tags: ['ES6+', 'Async/Await']
    },
    {
      name: 'TypeScript',
      category: 'Language',
      description: 'Type-safe development',
      color: '#3178c6',
      icon: <TypeScriptIcon size={40} />,
      tags: ['Static Typing', 'Interfaces']
    },
    {
      name: 'React',
      category: 'Frontend',
      description: 'Component-based Web UI',
      color: '#61dafb',
      icon: <ReactIcon size={40} />,
      tags: ['Hooks', 'Context API']
    },
    {
      name: 'Redux',
      category: 'State Management',
      description: 'State Management',
      color: '#764abc',
      icon: <ReduxIcon size={40} />,
      tags: ['Toolkit', 'Global State']
    },
    {
      name: 'Expo',
      category: 'Mobile Tooling',
      description: 'Rapid Mobile Dev',
      color: '#000020',
      icon: <ExpoIcon size={40} />,
      tags: ['EAS Build', 'Push Notifications']
    },
    {
      name: 'Node.js',
      category: 'Backend',
      description: 'Server-side Runtime',
      color: '#339933',
      icon: <NodeJsIcon size={40} />,
      tags: ['Event Loop', 'Modules']
    },
    {
      name: 'Express.js',
      category: 'Backend',
      description: 'Web Framework',
      color: '#000000',
      icon: <ExpressIcon size={40} />,
      tags: ['Middleware', 'Routing']
    },
    {
      name: 'API Design',
      category: 'Backend',
      description: 'API Design Standards',
      color: '#009688',
      icon: <ApiIcon size={40} />,
      tags: ['Integration', 'JSON']
    },
    {
      name: 'Firebase',
      category: 'Cloud',
      description: 'Backend-as-a-Service',
      color: '#ffca28',
      icon: <FirebaseIcon size={40} />,
      tags: ['Auth', 'Firestore', 'FCM']
    },
    {
      name: 'Supabase',
      category: 'Cloud',
      description: 'Open Source Firebase Alt',
      color: '#3ecf8e',
      icon: <SupabaseIcon size={40} />,
      tags: ['Boxgres', 'Auth']
    },
    {
      name: 'n8n',
      category: 'Automation',
      description: 'Workflow Automation',
      color: '#ea4b71',
      icon: <N8NIcon size={40} />,
      tags: ['Webhooks', 'Integrations']
    },
  ];

  // ... Rest of the canvas code stays same, just ensuring icons render ... 

  // Group skills by category for better display if needed, but grid usually works fine.
  // We'll keep the grid for now but sort/group them visually in the user's mind by order.

  useEffect(() => {
    // Canvas animation logic (same as before)
    const canvas = canvasRef.current;
    if (!canvas || !inView) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles: Array<any> = [];
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
    visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.1 } },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 20, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="skills" className="skills-advanced" ref={ref}>
      <div className="skills-advanced-bg">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        </Canvas>
      </div>

      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="skills-advanced-header"
        >
          <motion.h2 variants={itemVariants} className="section-title-advanced">
            Technical Arsenal
          </motion.h2>
          <motion.p variants={itemVariants} className="section-subtitle-advanced">
            A comprehensive toolkit for building scalable, high-performance solutions.
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
                boxShadow: `0 20px 40px -10px ${skill.color}40`,
                borderColor: skill.color
              }}
              style={{
                borderColor: `${skill.color}20`
              }}
            >
              <div
                className="skill-icon-wrapper"
                style={{ background: `${skill.color}10`, color: skill.color }}
              >
                {skill.icon}
              </div>

              <div className="skill-content">
                <div className="skill-header">
                  <h3 className="skill-name">{skill.name}</h3>
                  <span className="skill-category-tag">{skill.category}</span>
                </div>

                <p className="skill-description">{skill.description}</p>

                <div className="skill-tags">
                  {skill.tags && skill.tags.map((tag, i) => (
                    <motion.span
                      key={i}
                      className="skill-tag"
                      initial={{ opacity: 0, y: 10 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                      style={{
                        background: `${skill.color}15`,
                        color: skill.color,
                        borderColor: `${skill.color}30`
                      }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsAdvanced;
