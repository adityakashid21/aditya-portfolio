import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaUniversity, FaAward, FaLaptopCode } from 'react-icons/fa';
import './EducationCertifications.css';

// Icon wrapper components to satisfy TypeScript
const GraduationCapIcon = () => <FaGraduationCap />;
const UniversityIcon = () => <FaUniversity />;
const AwardIcon = () => <FaAward />;
const LaptopCodeIcon = () => <FaLaptopCode />;

const EducationCertifications: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const variants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    return (
        <section className="education-certifications" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header-advanced"
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={variants}
                >
                    <h2 className="section-title-advanced">Journey & Validations</h2>
                    <p className="section-subtitle-advanced">My academic foundation and professional recognitions</p>
                </motion.div>

                <div className="edu-cert-grid">
                    {/* Education Column */}
                    <motion.div
                        className="edu-column"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={variants}
                        transition={{ delay: 0.2 }}
                    >
                        <h3 className="column-title">
                            <GraduationCapIcon /> Education
                        </h3>

                        <div className="edu-card">
                            <div className="edu-icon-bg">
                                <UniversityIcon />
                            </div>
                            <div className="edu-content">
                                <h4>B.Tech in Information Technology</h4>
                                <p className="institution">Pune University</p>
                                <p className="year">2021 - 2025</p>
                                <p className="grade">CGPA: 8.5/10.0</p>
                                <p className="description">
                                    Specialized in Mobile Application Development and Cloud Computing.
                                    Lead Developer for college technical fest app.
                                </p>
                            </div>
                        </div>

                        <div className="edu-card">
                            <div className="edu-icon-bg">
                                <UniversityIcon />
                            </div>
                            <div className="edu-content">
                                <h4>Higher Secondary Certificate</h4>
                                <p className="institution">K.T.H.M College, Nashik</p>
                                <p className="year">2019 - 2021</p>
                                <p className="grade">Percentage: 86.67%</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Certifications Column */}
                    <motion.div
                        className="edu-column"
                        initial="hidden"
                        animate={inView ? "visible" : "hidden"}
                        variants={variants}
                        transition={{ delay: 0.4 }}
                    >
                        <h3 className="column-title">
                            <AwardIcon /> Certifications & Achievements
                        </h3>

                        <div className="cert-card">
                            <div className="cert-header">
                                <LaptopCodeIcon />
                                <div>
                                    <h4>Technology Job Simulation</h4>
                                    <p className="issuer">Deloitte (Forage) • June 2025</p>
                                </div>
                            </div>
                            <p className="cert-desc">
                                Completed practical tasks in coding, debugging, and system architecture design.
                            </p>
                        </div>

                        <div className="cert-card">
                            <div className="cert-header">
                                <AwardIcon />
                                <div>
                                    <h4>Hack With Gujarat</h4>
                                    <p className="issuer">State-Level Hackathon • 2025</p>
                                </div>
                            </div>
                            <p className="cert-desc">
                                Secured top rank by building an innovative solution for rural education connectivity.
                            </p>
                        </div>

                        <div className="cert-card">
                            <div className="cert-header">
                                <AwardIcon />
                                <div>
                                    <h4>React Native Specialist</h4>
                                    <p className="issuer">Udemy / Coursera • 2024</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EducationCertifications;
