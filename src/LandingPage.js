import React, { useState } from 'react';
import './LandingPage.css';
import CustomForm from './CustomForm.js';
import RebelAme from './assets/RA Website/Asset 12@2x.png'
import Insta from './assets/RA Website/Asset 15@2x.png'
import Subscribe from './assets/RA Website/Asset 11@2x.png'

export default function LandingPage() {
  const [isHovered, setIsHovered] = useState(false);
  const [formVisible, setFormVisible] = useState(false)
  
  return (
    <div>
    { formVisible ? (
      <CustomForm setFormVisible={setFormVisible}/>
    ) : (
      <div className='mainContainer'>
        <div 
          className='centerBox'
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <div>
              <img 
                src={Subscribe} 
                alt='Subscribe Text'
                onClick={() => setFormVisible(true)}  
              />
            </div>
          ) : (
            <div>
              <img src={RebelAme} alt='Rebel Ame Text'/>
            </div>
          )}
          </div>
        </div>
      )}
      <div className='ig-div'>
        <a href="https://www.instagram.com/xajjira/" target="_blank" rel="noopener noreferrer">
          <img src={Insta} alt="instagram link" />
        </a>
      </div>
    </div>
  );
}
