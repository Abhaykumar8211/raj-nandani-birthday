import React, { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

export default function MusicButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setIsPlaying(state.musicPlaying);
    });
    return unsubscribe;
  }, []);

  const handleToggle = () => {
    audioManager.playClick();
    audioManager.toggleMusic();
  };

  return (
    <div className="standalone-music-control">
      <button
        type="button"
        className={`floating-music-btn ${isPlaying ? 'is-playing' : ''}`}
        onClick={handleToggle}
        aria-label={isPlaying ? 'Pause music' : 'Play birthday music'}
        title={isPlaying ? 'Pause Music' : 'Play Music'}
      >
        <span className="music-icon">{isPlaying ? '🔊' : '🎵'}</span>
        <span className="music-label">{isPlaying ? 'Playing' : 'Music Off'}</span>
        {isPlaying && (
          <div className="music-sound-bars" aria-hidden="true">
            <span className="bar bar-1" />
            <span className="bar bar-2" />
            <span className="bar bar-3" />
          </div>
        )}
      </button>
    </div>
  );
}
