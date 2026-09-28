import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function LetterPage({ onContinue }) {
  const { letter } = birthdayData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = (e) => {
    if (isOpen) return;

    audioManager.playGiftOpen();
    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top, 35);
    setIsOpen(true);
  };

  return (
    <div className={`page-screen letter-page ${isOpen ? 'letter-screen-dimmed' : ''}`} aria-label="Birthday letter">
      <div className="page-inner-container">
        
        {/* Header */}
        <div className="page-header-block">
          <span className="page-tag-badge">Page 06 💌</span>
          <h1 className="page-main-title">{letter.title}</h1>
          <p className="page-subtitle-text">A private message straight from the heart.</p>
        </div>

        {/* Envelope 3D Experience */}
        <div className={`envelope-wrapper ${isOpen ? 'envelope-open' : 'envelope-closed'}`}>
          <div className="envelope-base">
            {/* Top Flap */}
            <div className="envelope-flap" />

            {/* Wax Seal */}
            {!isOpen && (
              <button
                type="button"
                className="wax-seal-btn"
                onClick={handleOpenLetter}
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
                {letter.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`letter-paragraph p-${index + 1} ${
                      index === letter.paragraphs.length - 1 ? 'letter-highlight-wish' : ''
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="letter-signature-block">
                <span className="signature-heart">✨</span>
                <p className="signature-text">{letter.signature}</p>
              </div>
            </div>

            {/* Pocket */}
            <div className="envelope-pocket" />
          </div>
        </div>

        {/* Action Button: Open Letter OR Continue */}
        <div className="letter-action-block">
          {!isOpen ? (
            <button
              type="button"
              className="open-letter-btn animate-pulse-soft"
              onClick={handleOpenLetter}
              aria-label="Open letter"
            >
              <span className="btn-icon">💌</span>
              <span className="btn-label">{letter.openButton}</span>
            </button>
          ) : (
            <div className="letter-delivered-box animate-fade-in-up">
              <div className="delivered-badge">
                <span>{letter.deliveredBadge}</span>
              </div>
              <button
                type="button"
                className="step-continue-btn"
                onClick={() => {
                  audioManager.playClick();
                  onContinue();
                }}
              >
                <span>{letter.continueButton}</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
