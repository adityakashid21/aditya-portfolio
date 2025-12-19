import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Box, Sphere, Float, OrbitControls } from '@react-three/drei';
import { useInView } from 'react-intersection-observer';
import * as THREE from 'three';
import './Skills3D.css';

interface SkillCubeProps {
  position: [number, number, number];
  skill: {
    name: string;
    level: number;
    color: string;
  };
  isVisible: boolean;
}

const SkillCube: React.FC<SkillCubeProps> = ({ position, skill, isVisible }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[1]) * 0.3;

      if (hovered) {
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <group position={position}>
        <Box
          ref={meshRef}
          args={[1, 1, 1]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <meshStandardMaterial
            color={skill.color}
            transparent
            opacity={0.8}
            emissive={skill.color}
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </Box>

        <Text
          position={[0, 1.5, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
        >
          {skill.name}
        </Text>

        <Text
          position={[0, -1.5, 0]}
          fontSize={0.25}
          color="#64ffda"
          anchorX="center"
          anchorY="middle"
        >
          {skill.level}%
        </Text>
      </group>
    </Float>
  );
};

const SkillOrbit: React.FC<{ skills: any[]; isVisible: boolean }> = ({ skills, isVisible }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {skills.map((skill, index) => {
        const angle = (index / skills.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.5;

        return (
          <SkillCube
            key={skill.name}
            position={[x, y, z]}
            skill={skill}
            isVisible={isVisible}
          />
        );
      })}
    </group>
  );
};

const Skills3D: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const skills = [
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'Three.js', level: 85, color: '#000000' },
    { name: 'TypeScript', level: 90, color: '#3178c6' },
    { name: 'Node.js', level: 88, color: '#339933' },
    { name: 'Python', level: 82, color: '#3776ab' },
    { name: 'WebGL', level: 75, color: '#990000' },
    { name: 'GSAP', level: 80, color: '#88ce02' },
    { name: 'Blender', level: 70, color: '#f5792a' },
  ];

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

  const itemVariants: any = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="skills" className="skills-3d" ref={ref}>
      <div className="skills-3d-background">
        <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} color="#64ffda" intensity={0.5} />

          <SkillOrbit skills={skills} isVisible={inView} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate={inView}
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </div>

      <div className="skills-3d-content">
        <div className="container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="skills-3d-header"
          >
            <motion.h2 variants={itemVariants} className="section-title-3d">
              Skills & Technologies
            </motion.h2>
            <motion.p variants={itemVariants} className="section-subtitle-3d">
              Interactive 3D visualization of my technical expertise
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="skills-3d-grid"
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="skill-card-3d"
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="skill-card-inner">
                  <div className="skill-icon" style={{ backgroundColor: skill.color }}>
                    {skill.name.charAt(0)}
                  </div>
                  <h3>{skill.name}</h3>
                  <div className="skill-progress-3d">
                    <div className="skill-progress-bar">
                      <motion.div
                        className="skill-progress-fill"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                      />
                    </div>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                </div>
                <div className="skill-card-glow" style={{ backgroundColor: skill.color }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills3D;
