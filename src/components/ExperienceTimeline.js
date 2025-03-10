import React, { useEffect, useRef } from 'react';
import { FaBriefcase } from 'react-icons/fa';
import resume from '../data/resume';

const ExperienceTimeline = () => {
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => {
      observer.observe(item);
    });

    return () => {
      timelineItems.forEach((item) => {
        observer.unobserve(item);
      });
    };
  }, []);

  return (
    <section id="experience" className="section">
      <div className="container">
        <h2 className="section-title">Professional Experience</h2>
        
        <div className="timeline" ref={timelineRef}>
          {resume.experience.map((job, index) => (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
            >
              <div className="timeline-content card">
                <div className="timeline-date">{job.period}</div>
                <h3 className="timeline-title">{job.title}</h3>
                <div className="timeline-company">{job.company}</div>
                <ul className="timeline-responsibilities">
                  {job.responsibilities.map((responsibility, idx) => (
                    <li key={idx}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceTimeline;