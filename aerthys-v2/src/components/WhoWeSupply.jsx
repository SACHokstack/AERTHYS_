import React from 'react';
import { motion } from 'framer-motion';
import { FaUtensils, FaHotel, FaCloud, FaLeaf, FaHeartbeat } from 'react-icons/fa';
import './WhoWeSupply.css';

const industries = [
    { icon: <FaUtensils />, name: 'Restaurants & Cafés' },
    { icon: <FaHotel />, name: 'Hotels & Resorts' },
    { icon: <FaCloud />, name: 'Cloud Kitchens' },
    { icon: <FaLeaf />, name: 'Health-forward Brands' },
    { icon: <FaHeartbeat />, name: 'Nutrition & Wellness Kitchens' }
];

const WhoWeSupply = () => {
    return (
        <section className="supply-section">
            <div className="container">

                <div className="supply-header text-center">
                    <span className="section-subtitle">Our Partners</span>
                    <h2 className="section-title text-white">Who We Supply</h2>
                </div>

                <div className="supply-grid">
                    {industries.map((item, index) => (
                        <motion.div
                            key={index}
                            className="supply-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="supply-icon">{item.icon}</div>
                            <h3 className="supply-name">{item.name}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="supply-intro text-center">
                    <p className="intro-text">
                        We partner with kitchens and brands that care about clean, consistent nutrition.
                    </p>
                    <div className="cta-wrapper">
                        <span className="cta-prompt">Not sure about the right fit?</span>
                        <button className="btn btn-primary">Enquire for Supply</button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default WhoWeSupply;
