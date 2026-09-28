import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function BalloonPage({ onContinue }) {
  const { balloons } = birthdayData;
  const [hasReleased, setHasReleased] = useState(false);
  const [activeBalloons, setActiveBalloons] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const releaseBalloons = (e) => {
    if (hasReleased) return;

    audioManager.playClick();
    setHasReleased(true);

    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top, 30);

    const generated = Array.from({ length: balloons.count }).map((_, index) => {
      const leftPercent = 8 + (index * 80) / (balloons.count - 1) + (Math.random() * 6 - 3);
      const color = balloons.colors[index % balloons.colors.length];
      const speed = 6 + Math.random() * 4;
      const delay = index * 0.35;
      const scale = 0.85 + Math.random() * 0.3;

      return {
        id: Date.now() + index,
        left: Math.max(6, Math.min(88, leftPercent)),
        color,
        speed,
        delay,
        scale,
        popped: false
      };
    });

    setActiveBalloons(generated);

    // Auto complete after 5.5s
    setTimeout(() => {
      setIsCompleted(true);
    }, 5500);
  };

  const handlePop = (id, e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    audioManager.playPop();
    confetti.burst(x, y, 20);

    setActiveBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setIsCompleted(true);
  };

  return (
    <div className="page-screen balloon-page" aria-label="Balloon celebration">
      <div className="page-inner-container">
        
        {/* Header */}
        <div className="page-header-block">
          <span className="page-tag-badge">Page 03 🎈</span>
          <h1 className="page-main-title">{balloons.title}</h1>
          <p className="page-subtitle-text">{balloons.subtitle}</p>
        </div>

        {/* Central Trigger */}
        {!hasReleased && (
          <div className="balloon-central-action">
            <button
              type="button"
              className="balloon-release-btn animate-pulse-soft"
              onClick={releaseBalloons}
            >
              <span className="btn-icon">🎈</span>
              <span className="btn-label">{balloons.releaseButton}</span>
            </button>
          </div>
        )}

        {/* Floating Balloon Sky Canvas Area */}
        <div className="balloon-floating-stage" aria-label="Floating balloon stage">
          {activeBalloons.map((b) => {
            if (b.popped) return null;
            return (
              <div
                key={b.id}
                className="floating-balloon"
                style={{
                  left: `${b.left}%`,
                  animationDuration: `${b.speed}s`,
                  animationDelay: `${b.delay}s`,
                  transform: `scale(${b.scale})`
                }}
                onClick={(e) => handlePop(b.id, e)}
                role="button"
                tabIndex={0}
                aria-label="Tap to pop balloon"
              >
                <div
                  className="balloon-body"
                  style={{
                    backgroundColor: b.color,
                    boxShadow: `0 8px 24px ${b.color}66`
                  }}
                >
                  <span className="balloon-shine" />
                  <span className="balloon-knot" style={{ borderTopColor: b.color }} />
                  <span className="balloon-string" />
                </div>
                <span className="balloon-pop-tip">Pop me!</span>
              </div>
            );
          })}
        </div>

        {/* Unlocked Milestone Card (Hidden until interaction completes) */}
        {isCompleted && (
          <div className="balloon-success-box animate-scale-up">
            <div className="success-icon">🎉</div>
            <h2 className="success-title">{balloons.perfectMessage}</h2>
            <p className="success-subtext">{balloons.perfectSubtext}</p>
            <button
              type="button"
              className="step-continue-btn"
              onClick={() => {
                audioManager.playClick();
                onContinue();
              }}
            >
              <span>{balloons.continueButton}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
