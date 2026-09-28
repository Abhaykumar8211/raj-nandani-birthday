import React, { useState, useEffect } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function FinalCelebration({ onRestart }) {
  const { finale } = birthdayData;
  const [stage, setStage] = useState(1); // 1: Dark sky & stars, 2: "One Last Surprise...", 3: "RAJ NANDANI", 4: Full Celebration

  useEffect(() => {
    // Step 2: "One Last Surprise..." after 600ms
    const t1 = setTimeout(() => {
      setStage(2);
    }, 600);

    // Step 3: Glowing "RAJ NANDANI" after 1800ms + Fanfare
    const t2 = setTimeout(() => {
      audioManager.playFanfare();
      setStage(3);
    }, 1800);

    // Step 4: Full explosion celebration after 2800ms
    const t3 = setTimeout(() => {
      setStage(4);
      confetti.grandFinaleExplosion();
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleRestart = () => {
    audioManager.playClick();
    onRestart();
  };

  return (
    <div className="page-screen finale-page" aria-label="Grand final celebration">
      <div className="page-inner-centered finale-inner-content">
        
        {/* Deep Midnight Celestial Backdrop with Stars */}
        <div className="finale-stars-layer" aria-hidden="true">
          {Array.from({ length: 28 }).map((_, i) => (
            <span
              key={i}
              className="finale-twinkle-star"
              style={{
                top: `${(i * 17) % 95}%`,
                left: `${(i * 23) % 95}%`,
                animationDelay: `${(i % 5) * 0.4}s`
              }}
            >
              ✦
            </span>
          ))}
        </div>

        {/* Central Luminous Aura */}
        <div className="finale-aura-glow" />

        {/* Stage Content */}
        <div className="finale-presentation-box">
          
          {/* Step 2: "One Last Surprise..." */}
          {stage >= 2 && (
            <div className="finale-intro-lead animate-fade-in-down">
              <span className="lead-crown">👑</span>
              <h2 className="lead-text">{finale.revealIntro}</h2>
            </div>
          )}

          {/* Step 3: Glowing "RAJ NANDANI" */}
          {stage >= 3 && (
            <div className="finale-name-showcase animate-scale-glow">
              <h1 className="cinematic-royal-name">
                {finale.recipientName}
              </h1>
            </div>
          )}

          {/* Step 4: Full Celebration Reveal */}
          {stage >= 4 && (
            <div className="finale-celebration-details animate-fade-in-up">
              <div className="birthday-banner-pill animate-bounce-soft">
                <span className="banner-greeting">{finale.greeting}</span>
              </div>

              <p className="finale-emotional-text">
                {finale.message}
              </p>

              <blockquote className="finale-quote-text">
                {finale.quote}
              </blockquote>

              {/* Floating Balloons */}
              <div className="finale-floating-decorations" aria-hidden="true">
                <span className="f-balloon b-1">🎈</span>
                <span className="f-balloon b-2">🎈</span>
                <span className="f-balloon b-3">🎈</span>
                <span className="f-balloon b-4">🎈</span>
              </div>

              {/* Restart Experience Button */}
              <div className="finale-restart-action">
                <button
                  type="button"
                  className="restart-journey-btn"
                  onClick={handleRestart}
                >
                  <span className="btn-icon">↺</span>
                  <span className="btn-label">{finale.restartButton}</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
