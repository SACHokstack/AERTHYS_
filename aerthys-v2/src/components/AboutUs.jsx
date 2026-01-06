import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './AboutUs.css';

const images = [
    'https://images.unsplash.com/photo-1591465001581-d42f5eb5e574?q=80&w=1600',
    'https://images.unsplash.com/photo-1615484477885-d6e8a4a2a123?q=80&w=1600',
    'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=1600'
];

const AboutUs = () => {
    return (
        <section className="about-section">
            <div className="container">
                <div className="about-grid">
                    {/* Text Side */}
                    <div className="about-content">
                        <span className="section-subtitle">Who Are We</span>
                        <h2 className="section-title text-left">Real health begins<br />with real food.</h2>

                        <div className="about-body">
                            <p>
                                Aerthys Farms is built on a simple belief: real health begins with real food.
                                We grow microgreens as a daily source of natural nutrition for people and kitchens
                                that care about what goes into the body. No chemicals. No shortcuts. No exaggerated health claims.
                            </p>
                            <p>
                                Our approach is rooted in sustainability, freshness, and honesty. Every harvest is
                                timed for peak nutrition, every batch grown with intention, and every delivery handled with care.
                            </p>
                            <p className="highlight-text">
                                Aerthys is not about chasing wellness trends or selling quick fixes.
                                It’s about rebuilding nutrition the natural way, one meal at a time.
                            </p>

                            <button className="btn btn-outline mt-6">Connect With Us</button>
                        </div>
                    </div>

                    {/* Image Banner Side */}
                    <div className="about-image-wrapper">
                        <Swiper
                            modules={[Autoplay, EffectFade]}
                            effect="fade"
                            autoplay={{ delay: 3000 }}
                            className="about-swiper"
                        >
                            {images.map((img, i) => (
                                <SwiperSlide key={i}>
                                    <img
                                        src={img}
                                        alt="Farm"
                                        className="about-img"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
