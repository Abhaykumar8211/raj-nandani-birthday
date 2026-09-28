import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function WelcomePage({ onEnter }) {
  const { welcome } = birthdayData;
  const [imgError, setImgError] = useState(false);

  const handleEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    audioManager.playFanfare();
    confetti.burst(x, y, 40);

    setTimeout(() => {
      onEnter();
    }, 450);
  };

  return (
    <div className="page-screen welcome-page" aria-label="Welcome screen">
      <div className="page-inner-centered">
        {/* Floating Celebration Pill Badge */}
        <div className="hero-badge animate-fade-in-down">
          <span className="badge-sparkle">✨</span>
          <span className="badge-text">{welcome.badge}</span>
          <span className="badge-sparkle">✨</span>
        </div>

        {/* Deep / Diya Glowing Circular Photo Frame */}
        <div className="welcome-avatar-wrapper animate-scale-glow">
          {/* Outer Pulsing Diya Light Rays / Halo */}
          <div className="diya-light-halo" aria-hidden="true" />
          <div className="diya-glow-ring" aria-hidden="true" />

          {/* Little Royal Crown on top of frame */}
          <div className="avatar-crown-badge">
            <span>👑</span>
          </div>

          {/* Glowing Circular Photo Container */}
          <div className="avatar-circle-frame">
            {!imgError ? (
              <img
                src="/assets/images/raj-1.jpg"
                alt="Raj Nandani Birthday Portrait"
                className="welcome-hero-photo"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="avatar-fallback-art">
                <span className="fallback-icon">🎂</span>
              </div>
            )}
            <div className="avatar-inner-ring" aria-hidden="true" />
            <div className="avatar-shine-sweep" aria-hidden="true" />
          </div>

          {/* Floating Sparkles around circle */}
          <span className="avatar-sparkle sparkle-tl" aria-hidden="true">✦</span>
          <span className="avatar-sparkle sparkle-tr" aria-hidden="true">✨</span>
          <span className="avatar-sparkle sparkle-bl" aria-hidden="true">🌸</span>
          <span className="avatar-sparkle sparkle-br" aria-hidden="true">✦</span>
        </div>

        {/* Intro text */}
        <h2 className="welcome-intro-heading animate-fade-in">
          {welcome.intro}
        </h2>

        {/* Glowing Recipient Name */}
        <div className="welcome-name-block animate-scale-glow">
          <h1 className="welcome-name-title">
            <span className="name-letter-glow">{welcome.recipientName}</span>
          </h1>
          <div className="name-underline-glow" aria-hidden="true" />
        </div>

        {/* Subtext */}
        <p className="welcome-subtext animate-fade-in-up">
          {welcome.subtext}
        </p>

        {/* Large Premium CTA Button */}
        <div className="welcome-cta-wrapper animate-bounce-soft">
          <button
            type="button"
            className="premium-enter-btn"
            onClick={handleEnter}
            aria-label="Enter the celebration"
          >
            <span className="btn-shine" />
            <span className="btn-content">{welcome.enterButton}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
