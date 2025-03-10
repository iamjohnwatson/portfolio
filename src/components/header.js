import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import resume from '../data/resume';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-content">
        <div className="logo">
          {resume.personalInfo.name}
        </div>
        
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a>
            </li>
            <li className="nav-item">
              <a href="#experience" className="nav-link" onClick={() => setIsMenuOpen(false)}>Experience</a>
            </li>
            <li className="nav-item">
              <a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a>
            </li>
            <li className="nav-item">
              <a href="#education" className="nav-link" onClick={() => setIsMenuOpen(false)}>Education</a>
            </li>
            <li className="nav-item">
              <a href="#portfolio" className="nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;