import React, { useState, useEffect, useRef } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import './CustomForm.css';

const CustomForm = ({ setFormVisible, onFormSubmit, handleHoverEnd }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fadeInName, setFadeInName] = useState(false);
  const [fadeInEmail, setFadeInEmail] = useState(false);
  const nameInputRef = useRef(null); 
  const emailInputRef = useRef(null); 

  const MailChimpURL = process.env.REACT_APP_MAILCHIMP_URL;

  const handleSubmit = (e, subscribe) => {
    e.preventDefault();
    // Basic email validation 
    if (email && email.indexOf("@") > -1) {
      subscribe({
        EMAIL: email,
        FNAME: name,
      });
    }
  };

  useEffect(() => {
    if (formSubmitted) {
      onFormSubmit(true); 

      const timer = setTimeout(() => {
        setFormVisible(false);
        onFormSubmit(false)
      }, 5000);

      return () => clearTimeout(timer);

    } else {
      const timer1 = setTimeout(() => {
        setFadeInName(true)
      }, 100)
  
      return () => clearTimeout(timer1)
    }

  }, [formSubmitted, setFormVisible, onFormSubmit]);

  const handleNameKeyDown1 = (e) => {
    if (e.key === 'Enter') {
      if (name.trim() !== "") {
        setFadeInEmail(true)
        if (emailInputRef.current) {
          emailInputRef.current.focus();
        }
      }
    }
  };

  const handleEmailKeyDown = (e, subscribe) => {
    if (e.key === 'Enter') {
      // e.preventDefault(); 
      if (email.trim() !== "") {
        setFormSubmitted(true);
        setFadeInName(false)
        handleSubmit(e, subscribe); 
        handleHoverEnd()
      }
    }
  };

  return (
    <MailchimpSubscribe
      url={MailChimpURL}
      render={({ subscribe, status, message }) => (
        <div className="form-container">
            <form className="subscribeForm" onSubmit={(e) => handleSubmit(e, subscribe)}>
              <div className={`name-div ${formSubmitted ? "fade-out" : ""} ${fadeInName ? 'fade-in' : ''}`}>
                <input
                  type="text"
                  id="name"
                  value={name}
                  placeholder="name"
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={handleNameKeyDown1} 
                  ref={nameInputRef} 
                  // autoFocus
                />
              </div>
                <div className={`email-div ${formSubmitted ? "fade-out" : ""} ${fadeInEmail ? 'fade-in' : ''}`}>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleEmailKeyDown(e, subscribe)}
                    required
                    ref={emailInputRef} 
                    autoFocus
                  />
                </div>
            </form>
        </div>
      )}
    />
  );
};

export default CustomForm;
