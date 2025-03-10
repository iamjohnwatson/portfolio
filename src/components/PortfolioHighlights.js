import React, { useState } from 'react';
import portfolioItems from '../data/portfolioItems';

const PortfolioHighlights = () => {
  const [filter, setFilter] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'Data Visualization', name: 'Data Visualization' },
    { id: 'Data Analysis', name: 'Data Analysis' },
    { id: 'Podcast', name: 'Podcast' },
    { id: 'Investigative Reporting', name: 'Investigative Reporting' }
  ];
  
  const filteredItems = filter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        <h2 className="section-title">Portfolio Highlights</h2>
        
        <div className="portfolio-filters">
          {categories.map(category => (
            <button 
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-item">
              <img 
                src={item.image} 
                alt={item.title} 
                className="portfolio-image"
              />
              <div className="portfolio-content">
                <span className="portfolio-category">{item.category}</span>
                <h3 className="portfolio-title">{item.title}</h3>
                <p className="portfolio-description">{item.description}</p>
                <div className="portfolio-technologies">
                  {item.technologies.map((tech, index) => (
                    <span key={index} className="portfolio-technology">{tech}</span>
                  ))}
                </div>
                {item.embedUrl && item.category === 'Podcast' && (
                  <div className="portfolio-embed">
                    <iframe
                      src={item.embedUrl}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allowTransparency="true"
                      allow="encrypted-media"
                      title={item.title}
                    ></iframe>
                  </div>
                )}
                <a href={item.link} className="portfolio-link">View Project</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHighlights;