import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text, Html, Stars, Sparkles } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './HeroAdvanced.css';

// 3D Phone Component
const MobilePhone = (props: any) => {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group ref={group} {...props} dispose={null}>
        {/* Phone Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 6, 0.3]} />
          <meshStandardMaterial color="#1e293b" roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Screen */}
        <mesh position={[0, 0, 0.16]}>
          <planeGeometry args={[2.8, 5.8]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Dynamic Screen Content - Simulating App Interface */}
        <group position={[0, 0, 0.17]}>
          {/* Header Bar */}
          <mesh position={[0, 2.6, 0]}>
            <planeGeometry args={[2.8, 0.5]} />
            <meshBasicMaterial color="#38bdf8" />
          </mesh>

          {/* App Icons Grid */}
          {[-0.8, 0, 0.8].map((x, i) => (
            <group key={i} position={[x, 1.5, 0]}>
              <mesh>
                <planeGeometry args={[0.6, 0.6]} />
                <meshBasicMaterial color="#334155" />
              </mesh>
            </group>
          ))}
          {[-0.8, 0, 0.8].map((x, i) => (
            <group key={i} position={[x, 0.5, 0]}>
              <mesh>
                <planeGeometry args={[0.6, 0.6]} />
                <meshBasicMaterial color="#334155" />
              </mesh>
            </group>
          ))}

          {/* "Hello" Text acting as App content */}
          <Html transform position={[0, -1, 0]} scale={0.5} style={{ pointerEvents: 'none' }}>
            <div style={{
              color: 'white',
              textAlign: 'center',
              fontFamily: 'Inter',
              width: '200px'
            }}>
              <h3 style={{ margin: 0, fontSize: '24px' }}>Aditya.dev</h3>
              <p style={{ margin: 0, opacity: 0.7 }}>Mobile Architect</p>
              <div style={{ marginTop: '20px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
                <span style={{ fontSize: '20px' }}>⚛️</span>
                <span style={{ fontSize: '20px' }}>📱</span>
                <span style={{ fontSize: '20px' }}>🚀</span>
              </div>
            </div>
          </Html>
        </group>

        {/* Camera Bump */}
        <mesh position={[0, 2.5, -0.2]}>
          <boxGeometry args={[1, 1, 0.1]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>
    </Float>
  );
};

const HeroAdvanced: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  };

  return (
    <section id="home" className="hero-advanced" onMouseMove={handleMouseMove}>
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#818cf8" />

          <Suspense fallback={null}>
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Sparkles count={50} scale={10} size={4} speed={0.4} opacity={0.5} color="#38bdf8" />
            <MobilePhone rotation={[0, -0.5, 0]} position={[2, 0, 0]} />
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
        </Canvas>
      </div>

      <div className="hero-advanced-content layout-3d">
        <div className="container">
          <div className="hero-grid">
            <motion.div
              className="hero-text-content"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="badge-container">
                <span className="hero-badge">IT Engineering Student</span>
              </div>

              <h1 className="hero-title">
                ADITYA KASHID <br />
                <span className="gradient-text-hero">React Native Developer</span>
              </h1>

              <p className="hero-description">
                Specializing in building practical, production-style mobile applications.
                Passionate about solving real-world problems through clean UI, structured logic,
                and reliable system design.
                <br /><br />
                <strong>Current:</strong> Surat, Gujarat | <strong>From:</strong> Nashik, Maharashtra
              </p>

              <div className="hero-cta-group">
                <motion.a
                  href="#projects"
                  className="btn-primary-hero"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Portfolio
                </motion.a>
                <motion.a
                  href="#contact"
                  className="btn-secondary-hero"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
              </div>

              <div className="tech-stack-mini">
                <span>React Native</span>
                <span className="dot">•</span>
                <span>TypeScript</span>
                <span className="dot">•</span>
                <span>Firebase</span>
                <span className="dot">•</span>
                <span>n8n</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-orb"></div>
    </section>
  );
};

export default HeroAdvanced;
