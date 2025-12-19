import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';
import './Hero3D.css';

const AnimatedSphere: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.5}>
        <MeshDistortMaterial
          color="#64ffda"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0}
        />
      </Sphere>
    </Float>
  );
};

const Particles3D: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlesPosition = React.useMemo(() => {
    const positions = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.075;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color="#64ffda" transparent opacity={0.8} />
    </points>
  );
};

const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const textVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants: any = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 40px rgba(100, 255, 218, 0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="home" className="hero-3d" ref={containerRef}>
      <div className="hero-3d-canvas">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#64ffda" intensity={0.5} />
          <AnimatedSphere />
          <Particles3D />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} autoRotate autoRotateSpeed={0.5} />
        </Canvas>
      </div>

      <div className="hero-3d-content">
        <div className="container">
          <motion.div
            className="hero-3d-text"
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <motion.h1 className="hero-3d-title">
              Hi, I'm <span className="highlight-3d">Aditya</span>
            </motion.h1>

            <motion.div className="hero-3d-subtitle">
              <span className="typing-text">Full Stack Developer</span>
            </motion.div>

            <motion.p className="hero-3d-description">
              Creating immersive digital experiences with cutting-edge technologies.
              Passionate about 3D web development, AI integration, and innovative user interfaces.
            </motion.p>

            <motion.div
              className="hero-3d-buttons"
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a
                href="#projects"
                className="btn-3d btn-primary-3d"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore My Work</span>
                <div className="btn-3d-glow"></div>
              </motion.a>

              <motion.a
                href="#contact"
                className="btn-3d btn-secondary-3d"
                variants={buttonVariants}
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <span>Get In Touch</span>
                <div className="btn-3d-glow"></div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="scroll-indicator">
        <motion.div
          className="scroll-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
};

export default Hero3D;
