import React from 'react';
import './Services.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Services() {

	return (
		<section className="section services-section" id="services">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="section-title">
							<h2>Our Services</h2>
							<p>Explore our range of tech services designed to meet your needs.</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-code"></i>
							</div>
							<div className="feature-content">
								<h5>Custom Software Development</h5>
								<p>Tailored software solutions to automate processes and improve efficiency.</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-laptop"></i>
							</div>
							<div className="feature-content">
								<h5>Web Development</h5>
								<p>Professional websites and web applications built with the latest technologies.</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-mobile"></i>
							</div>
							<div className="feature-content">
								<h5>Mobile App Development</h5>
								<p>High-quality mobile apps for iOS and Android platforms.</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-cloud"></i>
							</div>
							<div className="feature-content">
								<h5>Cloud Services</h5>
								<p>Scalable cloud solutions for storage, hosting, and data management.</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-database"></i>
							</div>
							<div className="feature-content">
								<h5>Database Management</h5>
								<p>Efficient management and optimization of databases for performance.</p>
							</div>
						</div>
					</div>
					<div className="col-sm-6 col-lg-4">
						<div className="feature-box-1">
							<div className="icon">
								<i className="fa fa-network-wired"></i>
							</div>
							<div className="feature-content">
								<h5>Network Infrastructure</h5>
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
