import React from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function Wishes({ onNext }) {
  const { wishes } = birthdayData;

  const handleCardClick = () => {
    audioManager.playClick();
  };

  return (
    <section id="wishes" className="section-container wishes-section" aria-label="Inspirational birthday wishes">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">Wishes 🌸</span>
          <h2 className="section-title">{wishes.heading}</h2>
          <p className="section-subtitle">{wishes.subtitle}</p>
        </div>

        {/* 4 Beautiful Animated Wish Cards */}
        <div className="wishes-grid">
          {wishes.cards.map((card, idx) => (
            <div
              key={card.id}
              className={`wish-affirmation-card wish-card-${idx + 1}`}
              onClick={handleCardClick}
              role="article"
            >
              <div className="card-ambient-glow" />
              <div className="wish-card-inner">
                <div className="wish-card-header">
                  <span className="wish-icon-badge">{card.icon}</span>
                  <h3 className="wish-card-title">{card.title}</h3>
                </div>
                <p className="wish-card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Surprise Milestone Button */}
        <div className="wishes-next-wrapper">
          <button
            type="button"
            className="next-step-btn finale-lead-btn"
            onClick={() => {
              audioManager.playClick();
              onNext();
            }}
          >
            <span>{wishes.nextButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
