import React, { useState } from 'react';
import resume from '../data/resume';

const CoverLetter = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="about" className="section">
      <div className="container">
        <div className="card cover-letter">
          <h2 className="section-title">About Me</h2>
          
          <div className="cover-letter-content">
            <p>
              I am a seasoned reporter with a passion for in-depth storytelling, data analytics, and graphics. With expertise in covering technology companies, particularly in the electric vehicle space, I bring a unique blend of journalistic skills and technical capabilities to the table.
            </p>
            
            {!isExpanded ? (
              <>
                <p>
                  My experience at Reuters has equipped me with the skills to <span className="cover-letter-highlight">create clear and compelling visual stories related to business, finance, and economics</span>. I've developed a deep understanding of the EV industry, regularly breaking news on companies like Tesla, Rivian, and Lucid.
                </p>
                <button 
                  className="btn" 
                  onClick={() => setIsExpanded(true)}
                >
                  Read More
                </button>
              </>
            ) : (
              <>
                <p>
                  My experience at Reuters has equipped me with the skills to <span className="cover-letter-highlight">create clear and compelling visual stories related to business, finance, and economics</span>. I've developed a deep understanding of the EV industry, regularly breaking news on companies like Tesla, Rivian, and Lucid.
                </p>
                <p>
                  With my Google Data Analytics professional certification, I've honed my ability to <span className="cover-letter-highlight">work with datasets and create visualizations</span> that make complex financial information accessible and engaging. I regularly use Excel and Google Sheets for data analysis and have developed proficiency in creating graphics using Adobe Illustrator and web technologies.
                </p>
                <p>
                  My journalism background enables me to <span className="cover-letter-highlight">exercise sound judgment when displaying datasets</span> and understanding their limitations. I pride myself on my ability to collaborate effectively with writers, editors, and graphics journalists globally, contributing positively to team culture.
                </p>
                <p>
                  I'm particularly excited about the opportunity to join a team that values innovation, creativity, and collaboration. My experience leading coverage in Reuters' largest bureau demonstrates my ability to work on data-rich and visually compelling stories while meeting deadlines in a fast-paced environment.
                </p>
                <button 
                  className="btn" 
                  onClick={() => setIsExpanded(false)}
                >
                  Show Less
                </button>
              </>
            )}
          </div>
          
          <div className="metrics-dashboard">
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-value">{resume.metrics.yearsExperience}+</div>
                <div className="metric-label">Years Experience</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">{resume.metrics.companiesCovered}+</div>
                <div className="metric-label">Companies Covered</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">{resume.metrics.articlesPublished}+</div>
                <div className="metric-label">Articles Published</div>
              </div>
              <div className="metric-item">
                <div className="metric-value">{resume.metrics.dataVisualizationsCreated}+</div>
                <div className="metric-label">Data Visualizations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverLetter;