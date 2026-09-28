import React, { useState, useEffect, useRef } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function BalloonSection({ onNext }) {
  const { balloons } = birthdayData;
  const [activeBalloons, setActiveBalloons] = useState([]);
  const [poppedCount, setPoppedCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef(null);

  const startBalloons = (e) => {
    audioManager.playClick();
    setHasStarted(true);

    const rect = e?.currentTarget?.getBoundingClientRect();
    if (rect) {
      confetti.burst(rect.left + rect.width / 2, rect.top, 25);
    }

    // Generate 8 colorful floating balloons
    const newBalloons = Array.from({ length: balloons.balloonCount }).map((_, index) => {
      const leftPercent = 8 + (index * 80) / (balloons.balloonCount - 1) + (Math.random() * 6 - 3);
      const color = balloons.colors[index % balloons.colors.length];
      const speed = 7 + Math.random() * 5; // seconds to float up
      const delay = index * 0.45; // staggered release
      const scale = 0.85 + Math.random() * 0.35;
      const swayOffset = (Math.random() - 0.5) * 40;

      return {
        id: Date.now() + index,
        left: Math.max(5, Math.min(90, leftPercent)),
        color,
        speed,
        delay,
        scale,
        swayOffset,
        popped: false
      };
    });

    setActiveBalloons(newBalloons);

    // Auto-complete after 6.5s in case user doesn't pop all
    setTimeout(() => {
      setIsCompleted(true);
    }, 6000);
  };

  const handlePopBalloon = (id, e) => {
    e.stopPropagation();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    audioManager.playPop();
    confetti.burst(x, y, 20);

    setActiveBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );

    setPoppedCount((prev) => {
      const nextCount = prev + 1;
      if (nextCount >= 3) {
        setIsCompleted(true);
      }
      return nextCount;
    });
  };

  return (
    <section id="balloons" ref={containerRef} className="section-container balloon-section" aria-label="Interactive balloon celebration">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">Celebration 01 🎈</span>
          <h2 className="section-title">{balloons.heading}</h2>
          <p className="section-subtitle">{balloons.subtitle}</p>
        </div>

        {/* Release / Trigger Button */}
        {!hasStarted && (
          <div className="balloon-trigger-wrapper">
            <button
              type="button"
              className="celebration-action-btn"
              onClick={startBalloons}
            >
              <span className="btn-icon">🎈</span>
              <span className="btn-label">{balloons.actionButton}</span>
            </button>
          </div>
        )}

        {/* Interactive Floating Balloon Stage */}
        <div className="balloon-stage" aria-label="Balloon floating sky">
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
                onClick={(e) => handlePopBalloon(b.id, e)}
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

        {/* Completion Milestone Card */}
        {isCompleted && (
          <div className="balloon-completion-box animate-scale-up">
            <div className="completion-icon">🎉</div>
            <h3 className="completion-message">{balloons.completionMessage}</h3>
            <p className="completion-subtext">The vibe is set and the magic has begun!</p>
            <button
              type="button"
              className="next-step-btn"
              onClick={() => {
                audioManager.playClick();
                onNext();
              }}
            >
              <span>{balloons.nextButton}</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
