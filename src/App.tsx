import React from 'react';
import './App.css';
import Header from './components/Header';
import HeroAdvanced from './components/HeroAdvanced';
import About from './components/About';
import SkillsAdvanced from './components/SkillsAdvanced';
import ProjectsAdvanced from './components/ProjectsAdvanced';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Removed Backendless analytics tracking

  return (
    <div className="App">
      <Header />
      <HeroAdvanced />
      <About />
      <SkillsAdvanced />
      <ProjectsAdvanced />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
