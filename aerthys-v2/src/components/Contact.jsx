import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <section className="contact-section">

            {/* Half Height Banner */}
            <div className="contact-banner">
                <div className="contact-overlay">
                    <h2 className="contact-quote">
                        "Let’s understand your requirements and take it from there."
                    </h2>
                </div>
            </div>

            <div className="container contact-container">
                <div className="contact-form-wrapper">
                    <div className="text-center mb-8">
                        <h3 className="section-title" style={{ fontSize: '2rem' }}>Reach Out To Us</h3>
                        <p className="text-muted">We usually respond within 24 Hours</p>
                    </div>

                    <form className="contact-form">
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input type="tel" placeholder="Your Phone Number" />
                        </div>
                        <div className="form-group">
                            <label>Requirements</label>
                            <textarea rows="4" placeholder="Tell us about your needs"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
