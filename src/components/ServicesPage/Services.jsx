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
                                <i className="fa fa-cloud"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Cloud Services</h3>
                                <p>Scalable cloud solutions for storage, hosting, and data management.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-database"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Database Management</h3>
                                <p>Efficient management and optimization of databases for performance.</p>
                            </div>
                        </div>
                        <div className="service-card">
                            <div className="icon">
                                <i className="fa fa-network-wired"></i>
                            </div>
                            <div className="feature-content">
                                <h3>Network Infrastructure</h3>
                                <p>Design, setup, and maintenance of robust network infrastructure.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
