import React from 'react';
import { FaInstagram, FaLinkedin, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer-section">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2 className="footer-logo">AERTHYS FARMS</h2>
                        <p className="footer-desc">Rebuilding nutrition the natural way, one meal at a time.</p>
                    </div>

                    <div className="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Why Microgreens</a></li>
                            <li><a href="#">Who We Supply</a></li>
                            <li><a href="#">Our Mission</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-contact">
                        <h3>Contact</h3>
                        <p>Theivanth Rajamohan</p>
                        <p>Singapore / India</p>
                        <div className="social-icons">
                            <a href="#"><FaInstagram /></a>
                            <a href="#"><FaLinkedin /></a>
                            <a href="#"><FaFacebook /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Aerthys Farms. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
