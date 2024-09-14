import React, { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import './CustomForm.css';
import Subscribe from './assets/RA Website/Asset 11@2x.png';
import Subscribed from './assets/RA Website/Asset 10@2x.png';
import Name from './assets/RA Website/Asset 14@2x.png';
import Email from './assets/RA Website/Asset 13@2x.png';

const CustomForm = ({ setFormVisible }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const MailChimpURL = process.env.REACT_APP_MAILCHIMP_URL;

  const handleSubmit = (e, subscribe) => {
    e.preventDefault();
    // basic email validation
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

  return (
    <MailchimpSubscribe
      url={MailChimpURL}
      render={({ subscribe, status, message }) => (
        <div className="form-container">
          {formSubmitted || status === "success" ? (
            <div className="successMessage">
              <img src={Subscribed} alt="Subscribed" />
              {status === "success" && !formSubmitted && setFormSubmitted(true)}
            </div>
          ) : (
            <form className="subscribeForm" onSubmit={(e) => handleSubmit(e, subscribe)}>
              <div>
                <button type="submit">
                  <img src={Subscribe} alt="Subscribe Text" />
                </button>
                <label htmlFor="name">
                  <img src={Name} alt="Name" />
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email">
                  <img src={Email} alt="email text" />
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </form>
          )}
        </div>
      )}
    />
  );
};

export default CustomForm;
