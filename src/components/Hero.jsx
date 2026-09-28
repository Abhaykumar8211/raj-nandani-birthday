import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function Hero({ onStartSurprise }) {
  const { hero } = birthdayData;

  const handleStart = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    audioManager.playFanfare();
    confetti.burst(x, y, 40);

    if (onStartSurprise) {
      onStartSurprise();
    }
  };

  return (
    <section id="hero" className="hero-section" aria-label="Welcome birthday message">
      <div className="hero-inner-container">
        {/* Floating Celebration Pill Badge */}
        <div className="hero-badge animate-fade-in-down">
          <span className="badge-sparkle">✨</span>
          <span className="badge-text">{hero.badge}</span>
          <span className="badge-sparkle">✨</span>
        </div>

        {/* Main Subtitle / Intro Heading */}
        <h2 className="hero-intro-text animate-fade-in">
          {hero.heading}
        </h2>

        {/* Highlighted Glowing Recipient Name */}
        <div className="hero-name-wrapper animate-scale-glow">
          <h1 className="hero-name-title">
            <span className="name-letter-glow">{hero.recipientName}</span>
          </h1>
          <div className="name-underline-glow" aria-hidden="true" />
        </div>

        {/* Emotional Subtext */}
        <p className="hero-subheading animate-fade-in-up">
          {hero.subheading}
        </p>

        {/* Floating Decorative Elements */}
        <div className="hero-decorations" aria-hidden="true">
          <span className="decor-star star-1">✦</span>
          <span className="decor-star star-2">✧</span>
          <span className="decor-star star-3">✦</span>
          <span className="decor-heart heart-1">🌸</span>
          <span className="decor-heart heart-2">✨</span>
        </div>

        {/* Large Premium CTA Button */}
        <div className="hero-cta-wrapper animate-bounce-soft">
          <button
            type="button"
            className="hero-primary-btn"
            onClick={handleStart}
            aria-label="Open your birthday surprise"
          >
            <span className="btn-shine" />
            <span className="btn-content">
              {hero.ctaButton}
            </span>
          </button>
        </div>

        {/* Gentle Scroll Prompt */}
        <div className="hero-scroll-indicator" onClick={onStartSurprise}>
          <span className="scroll-arrow">↓</span>
          <span className="scroll-label">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
