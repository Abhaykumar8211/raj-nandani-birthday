import React, { useState, useRef } from 'react';
import { birthdayData } from '../config/birthdayData';
import { audioManager } from '../utils/audioManager';

export default function Memories({ onNext }) {
  const { memories } = birthdayData;
  const photos = memories.photos;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [imgErrors, setImgErrors] = useState({});

  const handlePrev = () => {
    audioManager.playClick();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    audioManager.playClick();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
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

  const handleImageError = (id) => {
    setImgErrors((prev) => ({ ...prev, [id]: true }));
  };

  const currentPhoto = photos[currentIndex];

  return (
    <section id="memories" className="section-container memories-section" aria-label="Photo memory gallery">
      <div className="section-card glass-panel">
        <div className="section-header">
          <span className="section-tag">Memories 📸</span>
          <h2 className="section-title">{memories.heading}</h2>
          <p className="section-subtitle">{memories.subtitle}</p>
        </div>

        {/* Carousel Container */}
        <div
          className="carousel-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Card */}
          <div className="carousel-slide-viewport">
            <div className="memory-card glass-card">
              <div className="memory-image-container">
                {imgErrors[currentPhoto.id] ? (
                  <div className="memory-fallback-placeholder">
                    <span className="fallback-emoji">{currentPhoto.fallbackIcon || '🌸'}</span>
                    <span className="fallback-badge">Cherished Moment</span>
                  </div>
                ) : (
                  <img
                    src={currentPhoto.image}
                    alt={currentPhoto.caption}
                    className="memory-image"
                    loading="lazy"
                    onError={() => handleImageError(currentPhoto.id)}
                  />
                )}
                <div className="memory-tag-badge">{currentPhoto.tag}</div>
              </div>

              {/* Photo Caption */}
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
        <div className="carousel-indicators" role="tablist" aria-label="Photo carousel pagination">
          {photos.map((photo, idx) => (
            <button
              key={photo.id}
              type="button"
              className={`indicator-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex(idx);
              }}
              role="tab"
              aria-selected={idx === currentIndex}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next Surprise CTA */}
        <div className="memories-next-wrapper">
          <button
            type="button"
            className="next-step-btn"
            onClick={() => {
              audioManager.playClick();
              onNext();
            }}
          >
            <span>{memories.nextButton}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
