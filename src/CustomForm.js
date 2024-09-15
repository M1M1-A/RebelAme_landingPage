import React, { useState, useEffect, useRef } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import './CustomForm.css';
import Subscribe from './assets/RA Website/Asset 11@2x.png';
import Subscribed from './assets/RA Website/Asset 10@2x.png';

const CustomForm = ({ setFormVisible }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emailInputVisible, setEmailInputVisible] = useState(false);
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
      const timer = setTimeout(() => {
        setFormVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [formSubmitted, setFormVisible]);

  const handleNameKeyDown1 = (e) => {
    if (e.key === 'Enter') {
      if (name.trim() !== "") {
        setEmailInputVisible(true);
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
        handleSubmit(e, subscribe); 
      }
    }
  };

  return (
    <MailchimpSubscribe
      url={MailChimpURL}
      render={({ subscribe, status, message }) => (
        <div className="form-container">
          {formSubmitted || status === "success" ? (
            <div className="successMessage">
              <p className="subscribed-text">Subscribed</p>
              {/* <img src={Subscribed} alt="Subscribed" /> */}
              {status === "success" && !formSubmitted && setFormSubmitted(true)}
            </div>
          ) : (
            <form className="subscribeForm" onSubmit={(e) => handleSubmit(e, subscribe)}>
              <div className="form-box">
                <p>Subscribe</p>
                {/* <img className="subscribe-text"src={Subscribe} alt="Subscribe Text" /> */}
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
              {emailInputVisible && (
                <div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => handleEmailKeyDown(e, subscribe)}
                    required
                    ref={emailInputRef} 
                    // autoFocus
                  />
                </div>
              )}
            </form>
          )}
        </div>
      )}
    />
  );
};

export default CustomForm;
