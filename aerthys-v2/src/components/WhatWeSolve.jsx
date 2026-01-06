import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPills, FaFlask, FaShieldAlt, FaBrain, FaLeaf } from 'react-icons/fa';
import './WhatWeSolve.css';

const problems = [
    {
        id: 1,
        icon: <FaPills />,
        title: 'Overdependence on supplements',
        desc: 'Many people rely on pills and powders instead of getting nutrition from real food.'
    },
    {
        id: 2,
        icon: <FaFlask />,
        title: 'Processed and chemically treated produce',
        desc: 'Everyday vegetables often lose nutritional value due to chemical-heavy farming and long supply chains.'
    },
    {
        id: 3,
        icon: <FaShieldAlt />,
        title: 'Lack of trustworthy daily nutrition',
        desc: 'People want to eat better but struggle to find clean, consistent food they can rely on.'
    },
    {
        id: 4,
        icon: <FaBrain />,
        title: 'Nutrition that feels complicated',
        desc: 'Healthy eating shouldn’t require medical advice or drastic lifestyle changes.'
    },
    {
        id: 5,
        icon: <FaLeaf />,
        title: 'Unsustainable food systems',
        desc: 'Large-scale farming often prioritises shelf life and volume over freshness and care.'
    }
];

const WhatWeSolve = () => {
    const [hoveredId, setHoveredId] = useState(null);

    return (
        <section className="wws-section">
            <div className="container">
                <div className="text-center mb-16">
                    <span className="section-subtitle">The Problem</span>
                    <h2 className="section-title">What Do We Solve?</h2>
                </div>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {problems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                            onMouseEnter={() => setHoveredId(item.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            <div className="timeline-content">
                                <motion.div
                                    className={`problem-card ${hoveredId === item.id ? 'active' : ''}`}
                                    layout
                                >
                                    <div className="problem-header">
                                        <span className="problem-icon">{item.icon}</span>
                                        <h3 className="problem-title">{item.title}</h3>
                                    </div>
                                    <motion.div
                                        className="problem-body"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: hoveredId === item.id ? 'auto' : 0,
                                            opacity: hoveredId === item.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <p className="problem-desc">{item.desc}</p>
                                    </motion.div>
                                </motion.div>
                            </div>

                            <div className="timeline-point"></div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="btn btn-outline">Request Supply Enquiry</button>
                </div>
            </div>
        </section>
    );
};

export default WhatWeSolve;
