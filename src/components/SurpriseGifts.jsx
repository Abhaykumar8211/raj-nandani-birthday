import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function SurpriseGifts({ onNext }) {
  const { gifts } = birthdayData;
  const [openedGifts, setOpenedGifts] = useState({});

  const handleOpenGift = (gift, e) => {
    if (openedGifts[gift.id]) return;

    audioManager.playGiftOpen();
    const rect = e.currentTarget.getBoundingClientRect();
    confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 30);

    setOpenedGifts((prev) => ({
      ...prev,
      [gift.id]: true
    }));
  };

  const openedCount = Object.keys(openedGifts).length;

  return (
    <section id="gifts" className="section-container gifts-section" aria-label="Surprise gifts section">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">Surprises 🎁</span>
          <h2 className="section-title">{gifts.heading}</h2>
          <p className="section-subtitle">{gifts.subtitle}</p>
          <div className="gifts-progress-badge">
            {openedCount === 3 ? '🎉 All 3 Unwrapped!' : `Opened: ${openedCount} of 3`}
          </div>
        </div>

        {/* 3 Gift Cards Grid */}
        <div className="gifts-grid">
          {gifts.items.map((gift) => {
            const isOpened = !!openedGifts[gift.id];
            return (
              <div
                key={gift.id}
                className={`gift-box-card ${isOpened ? 'gift-opened' : 'gift-closed'}`}
                onClick={(e) => handleOpenGift(gift, e)}
                role="button"
                tabIndex={0}
                aria-label={isOpened ? `${gift.title}: ${gift.message}` : `Open ${gift.badge}`}
              >
                {/* Gift Box 3D Artwork */}
                <div className="gift-visual-container">
                  <div className="gift-box-wrapper">
                    {/* Lid */}
                    <div className="gift-lid">
                      <span className="gift-ribbon-bow">🎀</span>
                      <span className="gift-ribbon-horizontal" />
                    </div>
                    {/* Box Base */}
                    <div className="gift-base">
                      <span className="gift-ribbon-vertical" />
                      {!isOpened && (
                        <div className="gift-open-tag">
                          <span>{gift.label}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Surprise Reveal Content */}
                <div className="gift-content-reveal">
                  <div className="gift-header-row">
                    <span className="gift-icon-sparkle">{gift.icon}</span>
                    <h3 className="gift-surprise-title">{gift.title}</h3>
                  </div>
                  <p className="gift-surprise-text">{gift.message}</p>
                  <span className="gift-unwrapped-tag">✨ Unwrapped ✨</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Next Step CTA */}
        <div className="gifts-next-wrapper">
          <button
            type="button"
            className="next-step-btn"
            onClick={() => {
              audioManager.playClick();
              onNext();
            }}
          >
            <span>{gifts.nextButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
