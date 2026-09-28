import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';
import { confetti } from '../utils/confetti';

export default function GiftShop({ onContinue }) {
  const { giftShop } = birthdayData;
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
  const allOpened = openedCount === 3;

  return (
    <div className="page-screen giftshop-page" aria-label="Raj's Little Gift Shop">
      <div className="page-inner-container">
        
        {/* Header */}
        <div className="page-header-block">
          <span className="page-tag-badge">Page 07 🎁</span>
          <h1 className="page-main-title">{giftShop.heading}</h1>
          <p className="page-subtitle-text">{giftShop.subtitle}</p>
          <div className="gift-shop-tracker-badge">
            {allOpened ? '✨ All 3 Gifts Unwrapped! ✨' : `Opened: ${openedCount} of 3`}
          </div>
        </div>

        {/* 3 Boutique Gift Boxes */}
        <div className="gifts-grid">
          {giftShop.gifts.map((gift) => {
            const isOpened = !!openedGifts[gift.id];
            return (
              <div
                key={gift.id}
                className={`gift-box-card ${isOpened ? 'gift-opened' : 'gift-closed'}`}
                onClick={(e) => handleOpenGift(gift, e)}
                role="button"
                tabIndex={0}
                aria-label={isOpened ? `Gift ${gift.number}: ${gift.message}` : `Open Gift ${gift.number}`}
              >
                {/* 3D Visual Box */}
                <div className="gift-visual-container">
                  <div className="gift-box-wrapper">
                    <div className="gift-lid">
                      <span className="gift-ribbon-bow">{gift.icon}</span>
                      <span className="gift-ribbon-horizontal" />
                    </div>
                    <div className="gift-base">
                      <span className="gift-ribbon-vertical" />
                      {!isOpened && (
                        <div className="gift-open-tag">
                          <span>{gift.openPrompt}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Gift Content Reveal */}
                <div className="gift-content-reveal">
                  <span className="gift-badge-pill">Gift {gift.number}</span>
                  <p className="gift-surprise-text">{gift.message}</p>
                  <span className="gift-unwrapped-tag">✨ Unwrapped ✨</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unlocked Milestone (Appears only after all 3 gifts are opened) */}
        {allOpened && (
          <div className="giftshop-completed-box animate-scale-up">
            <div className="completed-tag">
              <span>{giftShop.completedBadge}</span>
            </div>
            <button
              type="button"
              className="step-continue-btn finale-lead-btn"
              onClick={() => {
                audioManager.playClick();
                onContinue();
              }}
            >
              <span>{giftShop.continueButton}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
