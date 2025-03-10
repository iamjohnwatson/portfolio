import React from 'react';
import { FaGraduationCap, FaUniversity, FaCertificate } from 'react-icons/fa';
import resume from '../data/resume';

const Education = () => {
  const getEducationIcon = (index) => {
    switch (index) {
      case 0:
        return <FaGraduationCap />;
      case 1:
        return <FaUniversity />;
      case 2:
        return <FaCertificate />;
      default:
        return <FaGraduationCap />;
    }
  };

  return (
    <section id="education" className="section">
      <div className="container">
        <h2 className="section-title">Education & Certifications</h2>
        
        <div className="education-container">
          {resume.education.map((edu, index) => (
            <div key={index} className="education-item card">
              <div className="education-icon">
                {getEducationIcon(index)}
              </div>
              <div className="education-content">
                <h3 className="education-degree">{edu.degree}</h3>
                <div className="education-institution">{edu.institution}</div>
                <div className="education-period">{edu.period}</div>
                <p className="education-details">{edu.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;