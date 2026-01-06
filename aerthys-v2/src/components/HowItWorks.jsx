import React from 'react';
import { motion } from 'framer-motion';
import { FaSeedling, FaCut, FaBoxOpen, FaTruck } from 'react-icons/fa';
import './HowItWorks.css';

const steps = [
    { icon: <FaSeedling />, title: 'Grow Clean', desc: 'No chemicals, pure environment.' },
    { icon: <FaCut />, title: 'Harvest Fresh', desc: 'Picked at peak nutrition.' },
    { icon: <FaBoxOpen />, title: 'Pack Hygienically', desc: 'Sealed with care.' },
    { icon: <FaTruck />, title: 'Deliver Locally', desc: 'Farm to kitchen in hours.' }
];

const HowItWorks = () => {
    return (
        <section className="hiw-section">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="section-subtitle">Our Process</span>
                    <h2 className="section-title">How Supply Works</h2>
                </div>

                <div className="process-wrapper">
                    {steps.map((step, index) => (
                        <div key={index} className="process-step-container">

                            <motion.div
                                className="process-circle"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: index * 0.2, type: "spring" }}
                            >
                                {step.icon}
                            </motion.div>

                            <div className="process-content text-center">
                                <h3 className="process-title">{step.title}</h3>
                                <p className="process-desc">{step.desc}</p>
                            </div>

                            {index < steps.length - 1 && <div className="process-connector"></div>}
                        </div>
                    ))}
                </div>

                <div className="hiw-footer text-center mt-16">
                    <p className="hiw-statement">
                        Fresh food doesn’t need complexity.<br />Just care and consistency.
                    </p>
                    <button className="btn btn-primary mt-8">Enquire for Supply</button>
                </div>

            </div>
        </section>
    );
};

export default HowItWorks;
