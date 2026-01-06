import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './Mission.css';

const missionImages = [
    'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=1600',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1600',
    'https://images.unsplash.com/photo-1611567149467-37a5444fad84?q=80&w=1600'
];

const Mission = () => {
    return (
        <section className="mission-section">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                speed={1500}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                className="mission-swiper"
            >
                {missionImages.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="mission-bg" style={{ backgroundImage: `url(${img})` }}></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="mission-overlay">
                <div className="container text-center">
                    <span className="section-subtitle text-white">Our Mission</span>
                    <h2 className="mission-title">
                        To nurture and restore healthier lifestyles with fresh, sustainably grown microgreens.
                    </h2>
                    <p className="mission-text">
                        We deliver clean, nutrient-rich microgreens to health-conscious individuals and businesses who value real food and honest nutrition.
                    </p>
                    <h3 className="mission-slogan">Food first. Always.</h3>
                </div>
            </div>
        </section>
    );
};

export default Mission;
