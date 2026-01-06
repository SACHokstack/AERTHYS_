import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import './FAQ.css';

const faqs = [
    { q: 'Who are your microgreens best suited for?', a: 'Our microgreens are ideal for restaurants, cafés, hotels, cloud kitchens, and health-conscious individuals looking for clean, fresh nutrition. If you’re unsure what fits your needs, we’re happy to guide you.' },
    { q: 'Do you supply in bulk for businesses?', a: 'Yes, we specialise in consistent bulk supply for professional kitchens and brands. Reach out to discuss volumes, pricing, and delivery schedules.' },
    { q: 'How fresh are your microgreens at delivery?', a: 'All our microgreens are harvested at peak freshness and delivered within a short window. For exact harvest and delivery timelines, get in touch with us.' },
    { q: 'What varieties of microgreens do you grow?', a: 'We grow a curated range based on quality and demand. Since availability can change, contacting us helps us recommend the right options for your use.' },
    { q: 'Can you customize supply based on our menu or product needs?', a: 'Yes. We work closely with partners to align supply with their menu or product requirements. Share your use case with us and we’ll plan accordingly.' },
    { q: 'Where do you currently deliver?', a: 'We operate with a local-first approach. Contact us to confirm serviceability in your area and delivery frequency.' },
    { q: 'Are your microgreens grown sustainably?', a: 'Yes. Our growing practices focus on minimal resource use, clean environments, and responsible sourcing. We’re happy to explain our process in detail.' },
    { q: 'How do you ensure consistency in quality?', a: 'Controlled growing environments and small-batch harvesting allow us to maintain consistent quality. For regular supply arrangements, let’s discuss your expectations.' },
    { q: 'Do you supply to individuals or only businesses?', a: 'We currently focus on supply partnerships, but availability may vary. Reach out to check what works best for you.' },
    { q: 'How do we get started with Aerthys Farms?', a: 'You can pick up the phone and call us anytime. We’re always happy to answer your questions and understand your requirements. You can also use the contact form below, and our team will get back to you shortly.' }
];

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="faq-section">
            <div className="container">
                <div className="text-center mb-12">
                    <span className="section-subtitle">Common Questions</span>
                    <h2 className="section-title">FAQs</h2>
                </div>

                <div className="faq-grid">
                    {faqs.map((item, index) => (
                        <div key={index} className="faq-item">
                            <button
                                className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                onClick={() => toggle(index)}
                            >
                                <span>{item.q}</span>
                                <span className="faq-icon">
                                    {activeIndex === index ? <FaMinus /> : <FaPlus />}
                                </span>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="faq-answer-wrapper"
                                    >
                                        <div className="faq-answer">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <button className="btn btn-outline">Enquire for Supply</button>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
