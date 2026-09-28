import React, { useState } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function MemoryPage({ onContinue }) {
  const { memories } = birthdayData;
  const photos = memories.photos;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [hasReachedEnd, setHasReachedEnd] = useState(false);
  const [imgErrors, setImgErrors] = useState({});

  const handlePrev = () => {
    audioManager.playClick();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    audioManager.playClick();
    setCurrentIndex((prev) => {
      const nextIdx = prev + 1;
      if (nextIdx >= photos.length - 1) {
        setHasReachedEnd(true);
      }
      return nextIdx >= photos.length ? 0 : nextIdx;
    });
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    setTouchDeltaX(currentX - touchStartX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null) return;
    if (touchDeltaX > 45) {
      handlePrev();
    } else if (touchDeltaX < -45) {
      handleNext();
    }
    setTouchStartX(null);
    setTouchDeltaX(0);
  };

  const currentPhoto = photos[currentIndex];

  return (
    <div className="page-screen memory-page" aria-label="Memory gallery">
      <div className="page-inner-container">
        
        {/* Header */}
        <div className="page-header-block">
          <span className="page-tag-badge">Page 05 📸</span>
          <h1 className="page-main-title">{memories.title}</h1>
          <p className="page-subtitle-text">{memories.subtitle}</p>
        </div>

        {/* Carousel Viewport */}
        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-slide-viewport">
            <div className="memory-card glass-card">
              <div className="memory-image-container">
                {imgErrors[currentPhoto.id] ? (
                  <div className="memory-fallback-placeholder">
                    <span className="fallback-emoji">🌸</span>
                    <span className="fallback-badge">Cherished Moment</span>
                  </div>
                ) : (
                  <img
                    src={currentPhoto.image}
                    alt={currentPhoto.caption}
                    className="memory-image"
                    loading="lazy"
                    onError={() => setImgErrors((prev) => ({ ...prev, [currentPhoto.id]: true }))}
                  />
                )}
                <div className="memory-tag-badge">{currentPhoto.tag}</div>
              </div>

              {/* Caption Box */}
              <div className="memory-caption-box">
                <p className="memory-caption-text">{currentPhoto.caption}</p>
                <div className="memory-counter-pill">
                  {currentIndex + 1} / {photos.length}
                </div>
              </div>
            </div>
          </div>

          {/* Controls: Prev & Next Arrows */}
          <button
            type="button"
            className="carousel-nav-btn prev-btn"
            onClick={handlePrev}
            aria-label="Previous photo memory"
          >
            ‹
          </button>
          <button
            type="button"
            className="carousel-nav-btn next-btn"
            onClick={handleNext}
            aria-label="Next photo memory"
          >
            ›
          </button>
        </div>

        {/* Indicator Dots */}
        <div className="carousel-indicators" role="tablist" aria-label="Photo pagination">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex(idx);
                if (idx === photos.length - 1) setHasReachedEnd(true);
              }}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Unlocked Milestone (Shown once user browses to the end or views photos) */}
        {(hasReachedEnd || currentIndex === photos.length - 1) && (
          <div className="memory-completed-box animate-fade-in-up">
            <div className="saved-badge">
              <span>{memories.completedBadge}</span>
            </div>
            <button
              type="button"
              className="step-continue-btn"
              onClick={() => {
                audioManager.playClick();
                onContinue();
              }}
            >
              <span>{memories.continueButton}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
