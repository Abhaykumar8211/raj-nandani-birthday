import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function BirthdayMessage({ onNext }) {
  const { message } = birthdayData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = (e) => {
    if (isOpen) return;

    audioManager.playGiftOpen();
    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top, 35);
    setIsOpen(true);
  };

  return (
    <section id="message" className="section-container message-section" aria-label="Personal birthday letter">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">A Letter For You 💌</span>
          <h2 className="section-title">{message.heading}</h2>
          <p className="section-subtitle">A few words straight from the heart for a wonderful friend.</p>
        </div>

        {/* Envelope Interactive Box */}
        <div className={`envelope-wrapper ${isOpen ? 'envelope-open' : 'envelope-closed'}`}>
          <div className="envelope-base">
            {/* Top Flap */}
            <div className="envelope-flap" />

            {/* Wax Seal */}
            {!isOpen && (
              <button
                type="button"
                className="wax-seal-btn"
                onClick={handleOpenEnvelope}
                aria-label="Break seal to open letter"
              >
                <span className="seal-emblem">💌</span>
              </button>
            )}

            {/* Letter Paper Card */}
            <div className={`letter-paper ${isOpen ? 'letter-unfolded' : ''}`}>
              <div className="letter-header-decor">
                <span className="letter-sparkle">✦</span>
                <span className="letter-title-tag">For Raj Nandani</span>
                <span className="letter-sparkle">✦</span>
              </div>

              <div className="letter-body-content">
                {message.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`letter-paragraph p-${index + 1} ${
                      index === message.paragraphs.length - 1 ? 'letter-highlight-wish' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="letter-signature-block">
                <span className="signature-heart">✨</span>
                <p className="signature-text">{message.signature}</p>
              </div>
            </div>

            {/* Envelope Pocket Front */}
            <div className="envelope-pocket" />
          </div>
        </div>

        {/* Trigger / Navigation Button */}
        <div className="message-action-wrapper">
          {!isOpen ? (
            <button
              type="button"
              className="open-letter-btn animate-pulse-soft"
              onClick={handleOpenEnvelope}
            >
              <span className="btn-icon">💌</span>
              <span className="btn-label">{message.openButton}</span>
            </button>
          ) : (
            <button
              type="button"
              className="next-step-btn animate-fade-in-up"
              onClick={() => {
                audioManager.playClick();
                onNext();
              }}
            >
              <span>{message.nextButton}</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
