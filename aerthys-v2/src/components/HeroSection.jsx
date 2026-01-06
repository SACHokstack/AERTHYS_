import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './HeroSection.css';

const slides = [
    {
        id: 1,
        image: '/images/hero_microgreens_closeup.png', // Microgreens close up
        text: 'Natural nutrition, grown clean.',
        subtext: 'Purest form of nature delivered to you.'
    },
    {
        id: 2,
        image: '/images/hero_fresh_harvest.png', // Fresh greens
        text: 'Fresh greens. Honest health.',
        subtext: 'No chemicals, just life.'
    },
    {
        id: 3,
        image: '/images/hero_plating_microgreens.png', // Healthy food
        text: 'Healing begins with food.',
        subtext: 'Restore your body naturally.'
    }
];

const HeroSection = () => {
    return (
        <section className="hero-section">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination, Navigation]}
                effect="fade"
                speed={1000}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="hero-swiper"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                        <div className="hero-slide">
                            {/* Image Overlay */}
                            <div className="hero-overlay" />
                            <img
                                src={slide.image}
                                alt={slide.text}
                                className="hero-image"
                                width="1920"
                                height="1080"
                                fetchPriority={index === 0 ? "high" : "auto"}
                                loading={index === 0 ? "eager" : "lazy"}
                                decoding={index === 0 ? "sync" : "async"}
                            />

                            <div className="hero-content">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                >
                                    <h1 className="hero-title">
                                        {slide.text}
                                    </h1>
                                    <p className="hero-subtitle">
                                        {slide.subtext}
                                    </p>
                                    <button className="btn hero-btn">
                                        Enquire for Supply
                                    </button>
                                </motion.div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Scroll Down Indicator */}
            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
            >
                <span className="scroll-text">Scroll</span>
                <div className="scroll-line"></div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
