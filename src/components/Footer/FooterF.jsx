import React from 'react';
import './FooterF.css';

import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
          Subscribe to the TechnoShack newsletter for the latest in computer technology.
        </p>
        <p className='footer-subscription-text'>
          Stay updated with the latest trends and innovations. Unsubscribe anytime.
        </p>
      </section>
      <div className='footer-links'>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>About Us</h2>
            <Link to='/'>How it works</Link>
            <Link to='/'>Testimonials</Link>
            <Link to='/'>Careers</Link>
            <Link to='/'>Investors</Link>
            <Link to='/'>Terms of Service</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/contact'>Contact</Link>
            <Link to='/support'>Support</Link>
            <Link to='/store'>Product Catalog</Link>
            <Link to='/sponsorships'>Sponsorships</Link>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div className='footer-link-items'>
            <h2>Product Categories</h2>
            <Link to='/store/computers'>Computers</Link>
            <Link to='/store/mice'>PC Mice</Link>
            <Link to='/store/monitors'>Monitors</Link>
          </div>
          <div className='footer-link-items'>
            <h2>Services</h2>
            <Link to='/services'>Services</Link>
          </div>
        </div>
      </div>
      <section className='social-media'>
        <div className='social-media-wrap'>
          <div className='footer-logo'>
            <Link to='/' className='navbar-logo'>
              <img src='https://firebasestorage.googleapis.com/v0/b/technoshack-cbd13.appspot.com/o/SmallLogoTechnoShack.png?alt=media&token=ccbd69d5-bb5a-405c-a41f-48b76766c76a' alt='Logo' className='logo' />
              TechnoShack
            </Link>
          </div>
          <small className='website-rights'>TechnoShack © 2023</small>
          <div className='social-icons'>
            <a className='social-icon-link' href='https://www.instagram.com/YourPage' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
              <i className='fab fa-instagram' />
            </a>
            <a className='social-icon-link' href='https://www.facebook.com/YourPage' target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </a>
            <a className='social-icon-link' href='https://www.youtube.com/YourPage' target='_blank' rel='noopener noreferrer' aria-label='YouTube'>
              <i className='fab fa-youtube' />
            </a>
            <a className='social-icon-link' href='https://www.twitter.com/YourPage' target='_blank' rel='noopener noreferrer' aria-label='Twitter'>
              <i className='fab fa-twitter' />
            </a>
            <a className='social-icon-link' href='https://www.linkedin.com/YourPage' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
