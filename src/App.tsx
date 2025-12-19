import React from 'react';
import Header from './components/Header';
import HeroAdvanced from './components/HeroAdvanced';
import About from './components/About';
import SkillsAdvanced from './components/SkillsAdvanced';
import ProjectsAdvanced from './components/ProjectsAdvanced';
import EducationCertifications from './components/EducationCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <HeroAdvanced />
        {/* Featured Apps & Projects - Showcasing mobile applications right after introduction */}
        <ProjectsAdvanced />
        <SkillsAdvanced />
        <EducationCertifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
