import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function CakeSection({ onNext }) {
  const { cake } = birthdayData;
  const [isWished, setIsWished] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const handleMakeWish = (e) => {
    if (isWished) return;

    audioManager.playCandleBlow();

    // Trigger celebratory confetti shower
    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top - 50, 45);
    confetti.rain(2800, 4);

    setIsBouncing(true);
    setIsWished(true);

    setTimeout(() => {
      audioManager.playFanfare();
    }, 400);

    setTimeout(() => {
      setIsBouncing(false);
    }, 1200);
  };

  return (
    <section id="cake" className="section-container cake-section" aria-label="Birthday cake and make a wish">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">Celebration 02 🎂</span>
          <h2 className="section-title">{cake.heading}</h2>
          <p className="section-subtitle">{cake.subtitle}</p>
        </div>

        {/* Illustrated Animated Cake Canvas Container */}
        <div className={`cake-display-stage ${isBouncing ? 'cake-bounce-active' : ''}`}>
          {/* Ambient Sparkles */}
          <div className="cake-sparkles-layer" aria-hidden="true">
            <span className="sparkle s-1">✨</span>
            <span className="sparkle s-2">✦</span>
            <span className="sparkle s-3">🌟</span>
            <span className="sparkle s-4">✨</span>
          </div>

          <div className="cake-pedestal">
            {/* Candles Row */}
            <div className="candles-row">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`candle-stick candle-${i + 1}`}>
                  {/* Candle Wick */}
                  <span className="candle-wick" />

                  {/* Flame or Rising Smoke */}
                  {!isWished ? (
                    <div className="flame-wrapper">
                      <span className="flame-core" />
                      <span className="flame-glow" />
                    </div>
                  ) : (
                    <div className="smoke-puff-wrapper">
                      <span className="smoke-wisp wisp-1" />
                      <span className="smoke-wisp wisp-2" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Cake Tiers */}
            <div className="cake-structure">
              {/* Top Tier */}
              <div className="cake-tier tier-top">
                <div className="frosting-drips top-drips">
                  <span className="drip" />
                  <span className="drip" />
                  <span className="drip" />
                  <span className="drip" />
                </div>
                <div className="cake-decorations">
                  <span className="berry">🍓</span>
                  <span className="berry">🌸</span>
                  <span className="berry">🍓</span>
                </div>
              </div>

              {/* Bottom Tier */}
              <div className="cake-tier tier-bottom">
                <div className="frosting-drips bottom-drips">
                  <span className="drip" />
                  <span className="drip" />
                  <span className="drip" />
                  <span className="drip" />
                  <span className="drip" />
                </div>
                <div className="tier-pattern">
                  <span className="pearl" />
                  <span className="pearl" />
                  <span className="pearl" />
                  <span className="pearl" />
                </div>
              </div>

              {/* Ceramic Cake Plate */}
              <div className="cake-plate" />
            </div>
          </div>
        </div>

        {/* Action Button: Make a Wish */}
        {!isWished ? (
          <div className="cake-action-wrapper">
            <button
              type="button"
              className="make-wish-btn animate-pulse-soft"
              onClick={handleMakeWish}
              aria-label="Make a wish and blow out candles"
            >
              <span className="btn-icon">✨</span>
              <span className="btn-label">{cake.makeWishButton}</span>
            </button>
          </div>
        ) : (
          /* Wish Granted Reveal Message */
          <div className="wish-revealed-box animate-fade-in-up">
            <div className="wish-icon">🌟</div>
            <p className="wish-message-quote">{cake.wishedMessage}</p>
            <button
              type="button"
              className="next-step-btn"
              onClick={() => {
                audioManager.playClick();
                onNext();
              }}
            >
              <span>{cake.nextButton}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
