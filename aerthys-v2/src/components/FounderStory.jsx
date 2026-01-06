import React from 'react';
import { motion } from 'framer-motion';
import './FounderStory.css';

const FounderStory = () => {
    return (
        <section className="founder-section">
            <div className="container">
                <div className="founder-grid">

                    <div className="founder-image-col">
                        <div className="founder-frame">
                            <img
                                src="https://images.unsplash.com/photo-1542315750-f8674d852fd0?q=80&w=1000" // Placeholder for Founder
                                alt="Theivanth Rajamohan"
                                className="founder-img"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="founder-badge">
                                <span className="founder-name">Theivanth Rajamohan</span>
                                <span className="founder-role">Founder</span>
                            </div>
                        </div>
                    </div>

                    <div className="founder-content">
                        <span className="section-subtitle">Founder Story</span>
                        <h2 className="section-title text-left">Rebuilding Trust<br />in Food.</h2>

                        <div className="founder-text">
                            <p>
                                Aerthys Farms was founded by Theivanth Rajamohan, whose work and studies in sustainability
                                shaped a deep interest in how food systems affect long-term health.
                            </p>
                            <p>
                                While pursuing his Master’s in Management with a focus on Sustainability at Singapore Management University,
                                he experienced food ecosystems where clean, nutrient-rich food was a daily standard. Returning to India
                                revealed a growing dependence on artificial supplements and chemically treated produce.
                            </p>
                            <div className="quote-box">
                                <p className="quote-text">
                                    "What if food itself could become the foundation of health again?"
                                </p>
                            </div>
                            <p>
                                The answer became microgreens—fresh, nutrient-dense, and naturally integrated into everyday meals.
                                Aerthys Farms was created to rebuild trust in food through clean, honest nutrition.
                            </p>

                            <button className="btn btn-outline mt-6">Connect with me</button>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default FounderStory;
