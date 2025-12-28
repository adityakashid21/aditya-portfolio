import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { TbBrandReactNative } from 'react-icons/tb';
import { FaGithub } from 'react-icons/fa';
import BootScreen from './BootScreen';
import './PhonePortfolio.css';

interface App {
    id: string;
    name: string;
    icon: React.ReactNode;
    color: string;
    component: React.ReactNode;
}

interface Project {
    id: string;
    name: string;
    desc: string;
    fullDesc: string;
    tech: string;
    features: string[];
    color: string;
    icon: string;
    github?: string;
    demo?: string;
}

const PhonePortfolio: React.FC = () => {
    const [showBootScreen, setShowBootScreen] = useState(true);
    const [openApp, setOpenApp] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showQuickSettings, setShowQuickSettings] = useState(false);
    const [showAppSwitcher, setShowAppSwitcher] = useState(false);
    const [activeTab, setActiveTab] = useState('about');
    const [time] = useState(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
    const [date] = useState(new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));

    // Responsive check with state
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1200);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    // Show boot screen on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowBootScreen(false);
        }, 3500); // Auto-hide after 3.5 seconds
        return () => clearTimeout(timer);
    }, []);

    const handleBootComplete = () => {
        setShowBootScreen(false);
    };



    const apps: App[] = [
        {
            id: 'about',
            name: 'About',
            icon: '👤',
            color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            component: <AboutApp />
        },
        {
            id: 'skills',
            name: 'Skills',
            icon: '⚡',
            color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            component: <SkillsApp />
        },
        {
            id: 'projects',
            name: 'Projects',
            icon: <TbBrandReactNative size={32} />,
            color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            component: <ProjectsApp onProjectClick={setSelectedProject} />
        },
        {
            id: 'education',
            name: 'Education',
            icon: '🎓',
            color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            component: <EducationApp />
        },
        {
            id: 'contact',
            name: 'Contact',
            icon: '💬',
            color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            component: <ContactApp />
        }
    ];

    const handleDragEnd = (event: any, info: PanInfo) => {
        if (info.offset.y > 100) {
            setShowNotifications(true);
            setShowQuickSettings(false);
        } else if (info.offset.y < -100 && openApp) {
            setOpenApp(null);
        }
    };

    const handleNavBack = () => {
        if (selectedProject) {
            setSelectedProject(null);
        } else if (showNotifications || showQuickSettings || showAppSwitcher) {
            setShowNotifications(false);
            setShowQuickSettings(false);
            setShowAppSwitcher(false);
        } else if (openApp) {
            setOpenApp(null);
        }
    };

    // Show boot screen first
    if (showBootScreen) {
        return isDesktop ? (
            <div className="desktop-portfolio">
                <div className="desktop-container">
                    <div className="tablet-camera"></div>
                    <div className="home-button"></div>
                    <div className="tablet-screen">
                        <BootScreen onComplete={handleBootComplete} />
                    </div>
                </div>
            </div>
        ) : (
            <div className="phone-portfolio samsung-ui">
                <div className="phone-frame samsung-frame">
                    <div className="phone-camera"></div>
                    <div className="phone-speaker"></div>
                    <BootScreen onComplete={handleBootComplete} />
                </div>
            </div>
        );
    }

    // Desktop Tablet View - Mobile Style
    if (isDesktop) {
        return (
            <div className="desktop-portfolio">
                <div className="tablet-frame">
                    <div className="tablet-camera"></div>
                    <div className="tablet-home-button" onClick={() => {
                        setActiveTab('about');
                        setSelectedProject(null);
                    }}></div>

                    <div className="tablet-screen">
                        {/* Status Bar */}
                        <div className="desktop-status-bar">
                            <div className="desktop-time">{time}</div>
                            <div className="desktop-icons">
                                <span>📶</span>
                                <span>📡</span>
                                <span>🔋</span>
                            </div>
                        </div>

                        {/* Wallpaper with Time & Profile */}
                        <div className="desktop-wallpaper">
                            <div className="desktop-time-widget">
                                <div className="desktop-big-time">{time}</div>
                                <div className="desktop-date">{date}</div>
                            </div>

                            <div className="desktop-profile-card">
                                <div className="profile-avatar">
                                    <span>👨‍💻</span>
                                </div>
                                <h2 className="profile-name">Aditya Kashid</h2>
                                <p className="profile-role">React Native Developer</p>
                            </div>
                        </div>

                        {/* App Drawer */}
                        <div className="desktop-app-drawer">
                            <div className="desktop-drawer-handle"></div>
                            <div className="desktop-tabs">
                                {['about', 'skills', 'projects', 'education', 'contact'].map((tab) => (
                                    <button
                                        key={tab}
                                        className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => {
                                            setActiveTab(tab);
                                            setSelectedProject(null);
                                        }}
                                    >
                                        <span>{apps.find(a => a.id === tab)?.icon}</span>
                                        <span>{tab.charAt(0).toUpperCase() + tab.slice(1)}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Bar */}
                        <div className="desktop-nav-bar">
                            <div className="desktop-nav-btn" onClick={() => {
                                const tabs = ['about', 'skills', 'projects', 'education', 'contact'];
                                const currentIndex = tabs.indexOf(activeTab);
                                if (currentIndex > 0) {
                                    setActiveTab(tabs[currentIndex - 1]);
                                }
                            }}>◁</div>
                            <div className="desktop-nav-btn" onClick={() => {
                                setActiveTab('about');
                                setSelectedProject(null);
                            }}>○</div>
                            <div className="desktop-nav-btn" onClick={() => {
                                const tabs = ['about', 'skills', 'projects', 'education', 'contact'];
                                const currentIndex = tabs.indexOf(activeTab);
                                if (currentIndex < tabs.length - 1) {
                                    setActiveTab(tabs[currentIndex + 1]);
                                }
                            }}>▭</div>
                        </div>

                        {/* App Content Screen */}
                        <AnimatePresence mode="wait">
                            {activeTab !== 'about' && (
                                <motion.div
                                    className="desktop-content"
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="desktop-app-header">
                                        <button className="desktop-back-btn" onClick={() => setActiveTab('about')}>
                                            ←
                                        </button>
                                        <h2 className="desktop-app-title">
                                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                                        </h2>
                                    </div>
                                    <div className="desktop-app-content">
                                        {selectedProject ? (
                                            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
                                        ) : (
                                            apps.find(a => a.id === activeTab)?.component
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        );
    }

    // Mobile Phone View (existing code)
    return (
        <div className="phone-portfolio samsung-ui">
            <div className="phone-frame samsung-frame">
                <motion.div
                    className="status-bar samsung-status"
                    onTap={() => setShowNotifications(!showNotifications)}
                >
                    <div className="status-left">
                        <span className="time">{time}</span>
                    </div>
                    <div className="status-camera"></div>
                    <div className="status-right">
                        <span className="icon">📶</span>
                        <span className="icon">📡</span>
                        <span className="icon">🔋</span>
                    </div>
                </motion.div>

                <div className="phone-screen samsung-screen">
                    <AnimatePresence mode="wait">
                        {showNotifications && (
                            <motion.div
                                key="notifications"
                                className="notification-panel"
                                initial={{ y: '-100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-100%' }}
                                transition={{ type: 'spring', damping: 30 }}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                onDragEnd={(e, info) => {
                                    if (info.offset.y < -50) setShowNotifications(false);
                                }}
                            >
                                <div className="notification-header">
                                    <h3>Notifications</h3>
                                    <button onClick={() => setShowQuickSettings(!showQuickSettings)}>⚙️</button>
                                </div>

                                {showQuickSettings && (
                                    <div className="quick-settings">
                                        <div className="quick-tile">📡 WiFi</div>
                                        <div className="quick-tile">📱 Data</div>
                                        <div className="quick-tile">🔊 Sound</div>
                                        <div className="quick-tile">🔆 Bright</div>
                                        <div className="quick-tile">✈️ Airplane</div>
                                        <div className="quick-tile">🔵 Bluetooth</div>
                                    </div>
                                )}

                                <div className="notifications-list">
                                    <div className="notification-item">
                                        <div className="notif-icon">👨‍💻</div>
                                        <div className="notif-content">
                                            <h4>Portfolio</h4>
                                            <p>Welcome to Aditya's Portfolio</p>
                                            <span className="notif-time">Just now</span>
                                        </div>
                                    </div>
                                    <div className="notification-item">
                                        <div className="notif-icon">🚀</div>
                                        <div className="notif-content">
                                            <h4>Projects</h4>
                                            <p>7+ Projects Available</p>
                                            <span className="notif-time">5 min ago</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {showAppSwitcher && (
                            <motion.div
                                key="app-switcher"
                                className="app-switcher"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ type: 'spring', damping: 25 }}
                            >
                                <div className="switcher-header">
                                    <h3>Recent Apps</h3>
                                    <button onClick={() => setShowAppSwitcher(false)}>✕</button>
                                </div>
                                <div className="recent-apps">
                                    {apps.slice(0, 3).map((app) => (
                                        <motion.div
                                            key={app.id}
                                            className="recent-app-card"
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => {
                                                setOpenApp(app.id);
                                                setShowAppSwitcher(false);
                                            }}
                                        >
                                            <div className="app-preview" style={{ background: app.color }}>
                                                <div className="preview-icon">{app.icon}</div>
                                            </div>
                                            <span className="app-name">{app.name}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {!showNotifications && !showAppSwitcher && !openApp && !selectedProject ? (
                            <motion.div
                                key="home"
                                className="home-screen samsung-home"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                drag="y"
                                dragConstraints={{ top: 0, bottom: 0 }}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="wallpaper samsung-wallpaper">
                                    <div className="wallpaper-overlay"></div>

                                    <motion.div
                                        className="lock-widget"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <div className="date-time">
                                            <div className="big-time">{time}</div>
                                            <div className="date">{date}</div>
                                        </div>

                                        <div className="profile-card">
                                            <div className="profile-avatar samsung-avatar">
                                                <span>👨‍💻</span>
                                            </div>
                                            <h2 className="profile-name">Aditya Kashid</h2>
                                            <p className="profile-role">React Native Developer</p>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="app-drawer samsung-drawer">
                                    <div className="drawer-handle"></div>
                                    <div className="app-grid samsung-grid">
                                        {apps.map((app, index) => (
                                            <motion.div
                                                key={app.id}
                                                className="app-item samsung-app"
                                                initial={{ scale: 0, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.4 + index * 0.08 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setOpenApp(app.id)}
                                            >
                                                <div className="app-icon-wrapper" style={{ background: app.color }}>
                                                    <div className="app-icon-inner samsung-icon">{app.icon}</div>
                                                </div>
                                                <span className="app-label">{app.name}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="nav-bar samsung-nav">
                                    <div className="nav-btn" onClick={handleNavBack}>◁</div>
                                    <div className="nav-btn" onClick={() => setOpenApp(null)}>○</div>
                                    <div className="nav-btn" onClick={() => setShowAppSwitcher(true)}>▭</div>
                                </div>
                            </motion.div>
                        ) : selectedProject ? (
                            <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
                        ) : !showNotifications && !showAppSwitcher && openApp ? (
                            <motion.div
                                key="app"
                                className="app-screen samsung-app-screen"
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={0.2}
                                onDragEnd={(e, info) => {
                                    if (info.offset.x > 100) setOpenApp(null);
                                }}
                            >
                                <div className="app-header samsung-header">
                                    <button className="back-btn samsung-back" onClick={() => setOpenApp(null)}>
                                        ←
                                    </button>
                                    <h3 className="app-title samsung-title">
                                        {apps.find(a => a.id === openApp)?.name}
                                    </h3>
                                    <div className="header-menu">⋮</div>
                                </div>

                                <div className="app-content samsung-content">
                                    {apps.find(a => a.id === openApp)?.component}
                                </div>

                                <div className="nav-bar samsung-nav">
                                    <div className="nav-btn" onClick={handleNavBack}>◁</div>
                                    <div className="nav-btn" onClick={() => setOpenApp(null)}>○</div>
                                    <div className="nav-btn" onClick={() => setShowAppSwitcher(true)}>▭</div>
                                </div>
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// Project Detail Component
const ProjectDetail: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
    const techStack = project.tech.split(',').map(t => t.trim());

    return (
        <motion.div
            className="project-detail"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
        >
            {/* Premium Header with Gradient */}
            <div className="detail-header">
                <motion.button
                    className="detail-back-btn"
                    onClick={onBack}
                    whileHover={{ scale: 1.05, x: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ← Back
                </motion.button>
                <div className="detail-title-section">
                    <motion.div
                        className="detail-icon-large"
                        style={{ backgroundColor: project.color }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                    >
                        {project.icon}
                    </motion.div>
                    <div className="detail-title-text">
                        <h2>{project.name}</h2>
                        <p className="detail-subtitle">{project.desc}</p>
                    </div>
                </div>
            </div>

            <div className="detail-content">
                {/* Description Card */}
                <motion.div
                    className="detail-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="detail-card-header">
                        <span className="detail-card-icon">📝</span>
                        <h3>About This Project</h3>
                    </div>
                    <p className="detail-description">{project.fullDesc}</p>
                </motion.div>

                {/* Tech Stack Card */}
                <motion.div
                    className="detail-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="detail-card-header">
                        <span className="detail-card-icon">⚡</span>
                        <h3>Tech Stack</h3>
                    </div>
                    <div className="tech-badges">
                        {techStack.map((tech, index) => (
                            <motion.span
                                key={index}
                                className="tech-badge"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3 + index * 0.05 }}
                                whileHover={{ scale: 1.1, y: -2 }}
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>

                {/* Features Card */}
                <motion.div
                    className="detail-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="detail-card-header">
                        <span className="detail-card-icon">✨</span>
                        <h3>Key Features</h3>
                    </div>
                    <div className="features-grid">
                        {project.features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="feature-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + index * 0.05 }}
                                whileHover={{ x: 4 }}
                            >
                                <span className="feature-check">✓</span>
                                <span className="feature-text">{feature}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                    className="detail-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    {project.github ? (
                        <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-btn detail-btn-primary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FaGithub size={20} />
                            <span>View Code</span>
                        </motion.a>
                    ) : (
                        <motion.div
                            className="detail-btn detail-btn-disabled"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span>🔒</span>
                            <span>Code is Private</span>
                        </motion.div>
                    )}
                    {project.demo ? (
                        <motion.a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="detail-btn detail-btn-secondary"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span>🚀</span>
                            <span>Visit Live</span>
                        </motion.a>
                    ) : (
                        <motion.div
                            className="detail-btn detail-btn-disabled"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span>🔒</span>
                            <span>Not Hosted Yet</span>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

// App Components (keeping existing ones, updating ProjectsApp)
const AboutApp = () => (
    <div className="app-about samsung-about">
        <div className="about-header">
            <div className="about-avatar-large">👨‍💻</div>
            <h2>Aditya Kashid</h2>
            <p className="about-subtitle">React Native Developer & IT Engineer</p>
        </div>

        <div className="info-grid">
            <div className="info-card samsung-card">
                <div className="card-icon">📍</div>
                <div className="card-content">
                    <h4>Location</h4>
                    <p>Surat, Gujarat | Nashik, Maharashtra</p>
                </div>
            </div>

            <div className="info-card samsung-card">
                <div className="card-icon">💼</div>
                <div className="card-content">
                    <h4>Expertise</h4>
                    <p>Mobile App Development, Cross-Platform Solutions</p>
                </div>
            </div>

            <div className="info-card samsung-card">
                <div className="card-icon">🎯</div>
                <div className="card-content">
                    <h4>Focus</h4>
                    <p>Creating innovative mobile applications with clean, scalable code</p>
                </div>
            </div>

            <div className="info-card samsung-card">
                <div className="card-icon">🚀</div>
                <div className="card-content">
                    <h4>Passion</h4>
                    <p>Building production-ready apps that users love</p>
                </div>
            </div>
        </div>
    </div>
);

const SkillsApp = () => {
    const skills = [
        { name: 'React Native', icon: '⚛️', color: '#61dafb' },
        { name: 'TypeScript', icon: '📘', color: '#3178c6' },
        { name: 'JavaScript', icon: '📜', color: '#f7df1e' },
        { name: 'React.js', icon: '⚛️', color: '#61dafb' },
        { name: 'Node.js', icon: '🟢', color: '#339933' },
        { name: 'Firebase', icon: '🔥', color: '#ffca28' },
        { name: 'Expo', icon: '📱', color: '#000020' },
        { name: 'Redux', icon: '🔄', color: '#764abc' }
    ];

    return (
        <div className="app-skills samsung-skills">
            <div className="skills-grid">
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill.name}
                        className="skill-card samsung-skill"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                    >
                        <div className="skill-icon" style={{ backgroundColor: skill.color }}>
                            {skill.icon}
                        </div>
                        <span className="skill-name">{skill.name}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const ProjectsApp: React.FC<{ onProjectClick: (project: Project) => void }> = ({ onProjectClick }) => {
    const projects: Project[] = [
        {
            id: '1',
            name: 'Iron Forge Gym',
            desc: 'Complete gym management app',
            fullDesc: 'A comprehensive gym management application built with React Native. Features include workout tracking, diet plans, member management, and progress analytics.',
            tech: 'React Native, Firebase, Redux, TypeScript',
            features: [
                'Workout plan creation and tracking',
                'Diet and nutrition management',
                'Member registration and profiles',
                'Progress tracking with charts',
                'Push notifications for workouts',
                'Offline mode support'
            ],
            color: '#ef4444',
            icon: '💪',
            github: 'https://github.com/adityakashid21/iron-forge-gym'
        },
        {
            id: '2',
            name: 'Samir Food',
            desc: 'Food delivery platform',
            fullDesc: 'A modern food delivery application with real-time order tracking, restaurant management, and seamless payment integration.',
            tech: 'React Native, Node.js, MongoDB, Socket.io',
            features: [
                'Real-time order tracking',
                'Restaurant menu management',
                'Multiple payment options',
                'Rating and review system',
                'Live chat support',
                'Order history and favorites'
            ],
            color: '#f59e0b',
            icon: '🍔',
            github: 'https://github.com/adityakashid21/samir-food'
        },
        {
            id: '3',
            name: 'Portfolio Website',
            desc: 'Personal portfolio',
            fullDesc: 'A modern, responsive portfolio website showcasing projects, skills, and professional experience with interactive UI elements.',
            tech: 'React, TypeScript, Framer Motion, CSS',
            features: [
                'Responsive design',
                'Smooth animations',
                'Project showcase',
                'Contact form',
                'Dark mode support',
                'SEO optimized'
            ],
            color: '#3b82f6',
            icon: '💼',
            demo: 'https://adityakashid21.github.io/aditya-portfolio'
        },
        {
            id: '4',
            name: 'E-commerce App',
            desc: 'Shopping application',
            fullDesc: 'Full-featured e-commerce mobile application with product catalog, cart management, and secure checkout process.',
            tech: 'React Native, Redux, Stripe, Firebase',
            features: [
                'Product browsing and search',
                'Shopping cart management',
                'Secure payment gateway',
                'Order tracking',
                'Wishlist functionality',
                'User authentication'
            ],
            color: '#10b981',
            icon: '🛒'
        },
        {
            id: '5',
            name: 'Social Media App',
            desc: 'Social networking',
            fullDesc: 'A feature-rich social networking platform with posts, stories, messaging, and real-time notifications.',
            tech: 'React Native, Firebase, Cloud Functions',
            features: [
                'Post creation and sharing',
                'Stories feature',
                'Real-time messaging',
                'Follow/Unfollow system',
                'Likes and comments',
                'Push notifications'
            ],
            color: '#8b5cf6',
            icon: '📱'
        },
        {
            id: '6',
            name: 'Task Manager',
            desc: 'Productivity app',
            fullDesc: 'A powerful task management application with project organization, deadlines, and team collaboration features.',
            tech: 'React Native, Expo, AsyncStorage',
            features: [
                'Task creation and organization',
                'Project categorization',
                'Deadline reminders',
                'Priority levels',
                'Progress tracking',
                'Offline support'
            ],
            color: '#06b6d4',
            icon: '✅'
        },
        {
            id: '7',
            name: 'Weather App',
            desc: 'Weather forecasting',
            fullDesc: 'Real-time weather forecasting application with detailed weather information, hourly and weekly forecasts.',
            tech: 'React Native, Weather API, Geolocation',
            features: [
                'Current weather conditions',
                'Hourly forecast',
                '7-day forecast',
                'Location-based weather',
                'Weather alerts',
                'Beautiful UI with animations'
            ],
            color: '#0ea5e9',
            icon: '🌤️'
        }
    ];

    return (
        <div className="app-projects samsung-projects">
            {projects.map((project, index) => (
                <motion.div
                    key={project.id}
                    className="project-card samsung-project"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => onProjectClick(project)}
                >
                    <div className="project-icon" style={{ backgroundColor: project.color }}>
                        {project.icon}
                    </div>
                    <div className="project-details">
                        <h4>{project.name}</h4>
                        <p className="project-desc">{project.desc}</p>
                        <p className="project-tech">{project.tech}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

const EducationApp = () => (
    <div className="app-education samsung-education">
        <div className="edu-card samsung-card">
            <div className="edu-icon">🎓</div>
            <div className="edu-details">
                <h3>Bachelor of Engineering</h3>
                <p className="edu-field">Information Technology</p>
                <p className="edu-year">2020 - 2024</p>
            </div>
        </div>

        <div className="cert-section">
            <h3 className="section-title">Certifications</h3>
            <div className="cert-list">
                <div className="cert-item samsung-cert">
                    <div className="cert-badge">✓</div>
                    <div>
                        <h5>React Native Development</h5>
                        <p>Advanced Mobile App Development</p>
                    </div>
                </div>
                <div className="cert-item samsung-cert">
                    <div className="cert-badge">✓</div>
                    <div>
                        <h5>Full Stack JavaScript</h5>
                        <p>MERN Stack Specialization</p>
                    </div>
                </div>
                <div className="cert-item samsung-cert">
                    <div className="cert-badge">✓</div>
                    <div>
                        <h5>Firebase & Cloud</h5>
                        <p>Backend Services & Deployment</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ContactApp = () => (
    <div className="app-contact samsung-contact">
        <div className="contact-grid">
            <a href="mailto:adityakashid21@gmail.com" className="contact-card samsung-card">
                <div className="contact-icon" style={{ background: 'linear-gradient(135deg, #ea4335, #d32f2f)' }}>📧</div>
                <div className="contact-info">
                    <h4>Email</h4>
                    <p>adityakashid21@gmail.com</p>
                </div>
            </a>

            <a href="https://wa.me/919881891277" target="_blank" rel="noopener noreferrer" className="contact-card samsung-card">
                <div className="contact-icon" style={{ background: 'linear-gradient(135deg, #25d366, #128c7e)' }}>📱</div>
                <div className="contact-info">
                    <h4>WhatsApp</h4>
                    <p>+91 98818 91277</p>
                </div>
            </a>

            <a href="https://www.linkedin.com/in/aditya-kashid-a1b0a5257/" target="_blank" rel="noopener noreferrer" className="contact-card samsung-card">
                <div className="contact-icon" style={{ background: 'linear-gradient(135deg, #0077b5, #005582)' }}>💼</div>
                <div className="contact-info">
                    <h4>LinkedIn</h4>
                    <p>Aditya Kashid</p>
                </div>
            </a>

            <a href="https://github.com/adityakashid21" target="_blank" rel="noopener noreferrer" className="contact-card samsung-card">
                <div className="contact-icon" style={{ background: 'linear-gradient(135deg, #6e5494, #553c9a)' }}>🔗</div>
                <div className="contact-info">
                    <h4>GitHub</h4>
                    <p>adityakashid21</p>
                </div>
            </a>
        </div>

        <a href="/Aditya resume.pdf" download className="download-btn samsung-btn">
            <span>📥</span>
            <span>Download Resume</span>
        </a>
    </div>
);

const GitHubApp = () => (
    <div className="app-github samsung-github">
        <div className="github-card samsung-card">
            <div className="github-avatar">🔗</div>
            <h3>adityakashid21</h3>
            <p className="github-bio">React Native Developer | IT Engineer</p>

            <div className="github-stats">
                <div className="stat-item">
                    <span className="stat-num">7+</span>
                    <span className="stat-label">Repositories</span>
                </div>
                <div className="stat-divider"></div>
                <div className="stat-item">
                    <span className="stat-num">100+</span>
                    <span className="stat-label">Commits</span>
                </div>
            </div>

            <a
                href="https://github.com/adityakashid21"
                target="_blank"
                rel="noopener noreferrer"
                className="github-btn samsung-btn"
            >
                View Profile →
            </a>
        </div>
    </div>
);

export default PhonePortfolio;
