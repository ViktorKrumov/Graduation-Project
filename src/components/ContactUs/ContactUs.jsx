import React, { useState } from 'react';
import './ContactUs.css';

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "d8bc86cf-cfd6-43f8-8f54-f3cc20e70828");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-info-container">
        <h2>Contact Information</h2>
        <p>If you have any questions or inquiries, please feel free to contact us using the form below. We'll get back to you as soon as possible!</p>
        <br/>
        <div className="contact-details">
          <div className="contact-detail">
            <i className="fas fa-map-marker-alt"></i>
            <p>123 Main Street,<br /> City, Country</p>
          </div>
          <div className="contact-detail">
            <i className="fas fa-phone"></i>
            <p>+123 456 7890</p>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <div className="gif-container">
          <img src="https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/Working%20chart.gif?alt=media&token=e6f74b1f-37b2-41b8-818e-104178d7a377" alt="Contact Gif" />
        </div>
        <div className="contact-form">
          <h3>Drop us a line</h3>
          <form onSubmit={onSubmit}>
            <input type="text" name="name" placeholder="Your Name" required />
            <input type="email" name="email" placeholder="Your Email" required />
            <textarea name="message" placeholder="Your Message" required></textarea>
            <button type="submit">Submit</button>
          </form>
          <span className="result-message">{result}</span>
        </div>
      </div>
    </div>
  );
}
