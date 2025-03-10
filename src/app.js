import React from 'react';
import './styles/global.css';
import './styles/components.css';
import Header from './components/Header';
import CoverLetter from './components/CoverLetter';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsChart from './components/SkillsChart';
import Education from './components/Education';
import PortfolioHighlights from './components/PortfolioHighlights';
import ThemeToggle from './components/ThemeToggle';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <CoverLetter />
        <ExperienceTimeline />
        <SkillsChart />
        <Education />
        <PortfolioHighlights />
      </main>
      <ThemeToggle />
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Akash Sriram. All rights reserved.</p>
          <p>
            <a href="mailto:akash.sriram@tr.com">akash.sriram@tr.com</a> | 
            <a href="https://twitter.com/hoodieonveshti" target="_blank" rel="noopener noreferrer">@hoodieonveshti</a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;