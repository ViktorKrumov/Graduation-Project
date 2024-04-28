import React from 'react';
import './Services.css';

function Services() {
    return (
        <section className="section services-section" id="services">
            <div className="container">
                <div className="section-title">
                    <h2>Our Services</h2>
                    <p>Explore our range of tech services designed to meet your needs.</p>
                </div>
                <div className="services-container">
                    <div className="services-row">
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-code"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Custom Software Development</h3>
                                <p>Tailored software solutions to automate processes and improve efficiency.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-laptop"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Web Development</h3>
                                <p>Professional websites and web applications built with the latest technologies.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-mobile"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Mobile App Development</h3>
                                <p>High-quality mobile apps for iOS and Android platforms.</p>
                            </div>
                        </div>
                    </div>
                    <div className="services-row">
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-cogs"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Software Installation</h3>
                                <p>Professional installation of software applications tailored to your needs.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-desktop"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Hardware Consultations</h3>
                                <p>Expert advice and consultations on hardware-related issues and upgrades.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-wrench"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Warranty Service</h3>
                                <p>Professional warranty service and repairs for your tech devices.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
