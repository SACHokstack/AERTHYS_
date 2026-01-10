import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import './WhyMicrogreens.css';

const features = [
    {
        id: 1,
        title: 'Nutrient Dense',
        desc: 'Up to 40× more nutrients per gram than mature greens.',
        image: '/images/wm_nutrient_dense.png'
    },
    {
        id: 2,
        title: 'Naturally Powerful',
        desc: 'Rich in antioxidants, vitamins, and minerals.',
        image: '/images/wm_naturally_powerful.png'
    },
    {
        id: 3,
        title: 'Fresh by Design',
        desc: 'Harvested young for better colour, texture, and taste.',
        image: '/images/wm_fresh_by_design.png'
    },
    {
        id: 4,
        title: 'Easy to Digest',
        desc: 'High in fibre. Gentle on the gut.',
        image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000' // Fresh, light salad for Digestibility
    },
    {
        id: 5,
        title: 'Sustainable Choice',
        desc: 'Locally grown. Less space. Fewer resources.',
        image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?q=80&w=1000' // Modern vertical farm for Sustainability
    }
];

const WhyMicrogreens = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const sectionRef = useRef(null);

    // For simplicity and robustness in this demo, let's make it interactive on hover/click or a carousel if complex scroll is too risky to one-shot.
    // Actually, I'll implement a simple hover/click mechanism for desktop and stacked for mobile.
    // Wait, user asked for "Scroll feature". Let's try to simulate it with CSS scroll snap or just simple IntersectionObserver.

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px', // Active when element is near center of screen
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.getAttribute('data-index'));
                    setActiveFeature(index);
                }
            });
        }, observerOptions);

        const textBlocks = document.querySelectorAll('.feature-text-block');
        textBlocks.forEach((block) => observer.observe(block));

        return () => {
            textBlocks.forEach((block) => observer.unobserve(block));
            observer.disconnect();
        };
    }, []);

    return (
        <section className="wm-section" ref={sectionRef}>
            <div className="container wm-container">

                <div className="wm-header">
                    <span className="section-subtitle">Why Microgreens?</span>
                    <h2 className="section-title">Small in size,<br />Massive in impact.</h2>
                </div>

                <div className="wm-content">
                    {/* Sticky Image Side */}
                    <div className="wm-image-col">
                        <div className="wm-sticky-frame">
                            <AnimatePresence>
                                <motion.img
                                    key={features[activeFeature].image}
                                    src={features[activeFeature].image}
                                    alt={features[activeFeature].title}
                                    className="wm-image"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                />
                            </AnimatePresence>
                            <div className="wm-image-overlay">
                                <span className="wm-counter">0{activeFeature + 1}</span>
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Text Side */}
                    <div className="wm-text-col">
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                data-index={index}
                                className={`feature-text-block ${index === activeFeature ? 'active' : ''}`}
                            >
                                <h3 className="wm-feature-title">{feature.title}</h3>
                                <p className="wm-feature-desc">{feature.desc}</p>
                            </div>
                        ))}
                        <div className="wm-cta-block">
                            <button className="btn btn-primary">Enquire for supply</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* Preload images for smooth transitions */}
            <div style={{ display: 'none' }} aria-hidden="true">
                {features.map((f) => (
                    <img key={f.id} src={f.image} alt="" />
                ))}
            </div>
        </section>
    );
};

export default WhyMicrogreens;
