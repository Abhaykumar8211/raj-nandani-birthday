import React, { useState, useEffect } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function FinalSurprise({ onBackToTop }) {
  const { finalSurprise } = birthdayData;
  const [cinematicStep, setCinematicStep] = useState(0); // 0: Idle, 1: Darken, 2: Stars, 3: Glow, 4: Name reveal, 5: Full Celebration
  const [showCelebrationBalloons, setShowCelebrationBalloons] = useState(false);

  const startCinematicFinale = (e) => {
    audioManager.playClick();
    setCinematicStep(1);

    // Step 2: Show animated stars & glowing particles
    setTimeout(() => {
      setCinematicStep(2);
    }, 400);

    // Step 3: Pulsing golden aura
    setTimeout(() => {
      setCinematicStep(3);
    }, 900);

    // Step 4: Cinematic reveal of RAJ NANDANI + Fanfare
    setTimeout(() => {
      audioManager.playFanfare();
      setCinematicStep(4);
    }, 1500);

    // Step 5: Full celebration explosion with confetti and balloons
    setTimeout(() => {
      setCinematicStep(5);
      setShowCelebrationBalloons(true);
      confetti.grandFinaleExplosion();
    }, 2200);
  };

  const handleReplay = () => {
    setCinematicStep(0);
    setShowCelebrationBalloons(false);
    setTimeout(() => {
      startCinematicFinale();
    }, 300);
  };

  return (
    <section id="final" className="section-container final-section" aria-label="Grand birthday finale">
      <div className={`section-card glass-panel ${cinematicStep >= 1 ? 'cinematic-active' : ''}`}>
        
        {/* Pre-reveal screen */}
        {cinematicStep === 0 && (
          <div className="final-prompt-content">
            <div className="section-header">
              <span className="section-tag">Grand Finale ✨</span>
              <h2 className="section-title">{finalSurprise.heading}</h2>
              <p className="section-subtitle">{finalSurprise.subtitle}</p>
            </div>

            <div className="final-trigger-wrapper">
              <button
                type="button"
                className="final-cta-btn animate-pulse-soft"
                onClick={startCinematicFinale}
                aria-label="Open the final grand birthday surprise"
              >
                <span className="btn-shine" />
                <span className="btn-icon">👑</span>
                <span className="btn-text">{finalSurprise.buttonText}</span>
              </button>
            </div>
          </div>
        )}

        {/* Cinematic Curtain Stage (Steps 1 through 5) */}
        {cinematicStep >= 1 && (
          <div className={`cinematic-stage step-${cinematicStep}`}>
            {/* Step 1 & 2: Darkened Sky with Twinkling Stars */}
            <div className="cinematic-backdrop">
              <div className="stars-cluster">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="cinema-star"
                    style={{
                      top: `${(i * 19) % 95}%`,
                      left: `${(i * 27) % 95}%`,
                      animationDelay: `${(i % 5) * 0.4}s`
                    }}
                  >
                    ✦
                  </span>
                ))}
              </div>
            </div>

            {/* Step 3: Radial Luminous Aura */}
            <div className="cinematic-aura-glow" />

            {/* Step 4 & 5: Grand Glowing Typography & Message */}
            <div className="cinematic-content-box animate-fade-in-up">
              <div className="finale-crown-wrapper animate-bounce-soft">
                <span className="crown-icon">👑</span>
              </div>

              {/* Glowing Name */}
              <h1 className="cinematic-name-glow">
                {finalSurprise.recipientName}
              </h1>

              {/* Happy Birthday Banner */}
              {cinematicStep >= 5 && (
                <div className="cinematic-banner animate-scale-glow">
                  <h2 className="cinematic-greeting-text">
                    {finalSurprise.mainGreeting}
                  </h2>
                </div>
              )}

              {/* Heartfelt Paragraph */}
              {cinematicStep >= 5 && (
                <div className="cinematic-emotional-block animate-fade-in">
                  <p className="cinematic-paragraph">
                    {finalSurprise.emotionalParagraph}
                  </p>
                  <blockquote className="cinematic-quote">
                    {finalSurprise.quote}
                  </blockquote>
                </div>
              )}

              {/* Floating Celebratory Balloons in Finale */}
              {showCelebrationBalloons && (
                <div className="finale-floating-balloons" aria-hidden="true">
                  <span className="f-balloon b-1">🎈</span>
                  <span className="f-balloon b-2">🎈</span>
                  <span className="f-balloon b-3">🎈</span>
                  <span className="f-balloon b-4">🎈</span>
                  <span className="f-balloon b-5">🎈</span>
                </div>
              )}

              {/* Replay & Navigation Controls */}
              {cinematicStep >= 5 && (
                <div className="finale-controls-row animate-fade-in-up">
                  <button
                    type="button"
                    className="finale-replay-btn"
                    onClick={handleReplay}
                  >
                    <span>{finalSurprise.restartButton}</span>
                  </button>
                  <button
                    type="button"
                    className="finale-top-btn"
                    onClick={() => {
                      audioManager.playClick();
                      if (onBackToTop) onBackToTop();
                    }}
                  >
                    <span>{finalSurprise.backToTopButton}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
