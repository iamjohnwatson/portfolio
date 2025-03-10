import React, { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    // Check for saved theme preference or use user's system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.body.classList.add('dark-theme');
    } else {
      setIsDarkMode(false);
      document.body.classList.add('light-theme');
    }
  }, []);
  
  const toggleTheme = () => {
    if (isDarkMode) {
      document.body.classList.replace('dark-theme', 'light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.replace('light-theme', 'dark-theme');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <div className="theme-toggle" onClick={toggleTheme}>
      {isDarkMode ? <FaSun /> : <FaMoon />}
    </div>
  );
};

export default ThemeToggle;