import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import resume from '../data/resume';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SkillsChart = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const skillsRef = useRef(null);
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'journalism', name: 'Journalism' },
    { id: 'technical', name: 'Technical' },
    { id: 'professional', name: 'Professional' },
    { id: 'analytical', name: 'Analytical' }
  ];
  
  const getSkillsData = () => {
    if (activeCategory === 'all') {
      // Combine all skills for the radar chart
      const labels = [];
      const data = [];
      
      Object.keys(resume.skills).forEach(category => {
        resume.skills[category].forEach(skill => {
          labels.push(skill.name);
          data.push(skill.level);
        });
      });
      
      return { labels, data };
    } else {
      // Get skills for specific category
      const skills = resume.skills[activeCategory] || [];
      return {
        labels: skills.map(skill => skill.name),
        data: skills.map(skill => skill.level)
      };
    }
  };
  
  const { labels, data } = getSkillsData();
  
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Skill Level',
        data,
        backgroundColor: 'rgba(52, 152, 219, 0.2)',
        borderColor: 'rgba(52, 152, 219, 1)',
        borderWidth: 2,
      },
    ],
  };
  
  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false,
  };
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach((bar) => {
              const width = bar.getAttribute('data-width');
              bar.style.width = `${width}%`;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (skillsRef.current) {
      observer.observe(skillsRef.current);
    }

    return () => {
      if (skillsRef.current) {
        observer.unobserve(skillsRef.current);
      }
    };
  }, []);

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section-title">Skills & Expertise</h2>
        
        <div className="skills-category-tabs">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="skills-visualization">
          <div className="radar-chart-container">
            <Radar data={chartData} options={chartOptions} height={300} />
          </div>
        </div>
        
        <div className="skills-container" ref={skillsRef}>
          {Object.keys(resume.skills).map(category => (
            <div key={category} className="skills-category">
              <h3 className="skills-category-title">
                {category.charAt(0).toUpperCase() + category.slice(1)} Skills
              </h3>
              
              {resume.skills[category].map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      data-width={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsChart;