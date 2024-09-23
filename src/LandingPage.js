import React, { useState } from 'react';
import './LandingPage.css';
import CustomForm from './CustomForm.js';
// import Insta from './assets/RA Website/Asset 15@2x.png'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [formVisible, setFormVisible] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);

  const instaLink = "https://www.instagram.com/xajjira/"
  const kickstarterLink = "https://www.kickstarter.com/projects/xajji/a-film-about-a-tattoo-a-bike-a-dry-cleaners-and-a-time?ref=9cld3j"
  
  const handleFormSubmit = () => {
    setFormSubmitted(true);
  };

  return (
    <div>
      <div className='mainContainer'>
        <div className='empty-div1'></div>
        { formVisible ? (
            formSubmitted ? (
              <div className='centerBox'><p className='subscribed-text'>Subscribed</p></div>
            ) : (
              <div className='centerBox'><p>Subscribe</p></div>
            )
          ) : (
            <div 
              className='centerBox'
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div 
                className={`fadeText1-container ${isHovered ? 'active' : ''}`} 
                onClick={() => {setFormVisible(true); console.log("clicked")}}
              >
                <p className={`fadeText1 ${isHovered ? 'active' : ''}`}>Subscribe</p>
              </div>
              <p className={`fadeText2 ${!isHovered ? 'active' : ''}`}>Rebel Ame</p>
            </div>
          )}
        <div className='form-div'>
          {formVisible && ( <CustomForm setFormVisible={setFormVisible} onFormSubmit={handleFormSubmit}/>)}
        </div>
      </div>
      <div className='ig-div'>
        <a href={instaLink} target="_blank" rel="noopener noreferrer">
          <p className='link-div-text'>IG</p>
        </a>
        <p className='link-div-text'> | </p>
        <a href={kickstarterLink} target="_blank" rel="noopener noreferrer">
          <p className="link-div-text">KICKSTARTER</p>
        </a>
      </div>
    </div>
  );
}  