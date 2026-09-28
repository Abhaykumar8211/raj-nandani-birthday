import React, { useState, useEffect } from 'react';
import { audioManager } from '../utils/audioManager';

export default function NavigationHUD({ activeSection, onNavigate }) {
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = audioManager.subscribe((state) => {
      setMusicPlaying(state.musicPlaying);
      setSoundEnabled(state.soundEnabled);
    });
    return unsubscribe;
  }, []);

  const handleToggleMusic = () => {
    audioManager.playClick();
    audioManager.toggleMusic();
  };

  const handleToggleSound = () => {
    audioManager.toggleSound();
    audioManager.playClick();
  };

  const navItems = [
    { id: 'hero', label: 'Home', icon: '✨' },
    { id: 'balloons', label: 'Balloons', icon: '🎈' },
    { id: 'cake', label: 'Cake', icon: '🎂' },
    { id: 'memories', label: 'Memories', icon: '📸' },
    { id: 'message', label: 'Message', icon: '💌' },
    { id: 'gifts', label: 'Surprises', icon: '🎁' },
    { id: 'wishes', label: 'Wishes', icon: '🌸' },
    { id: 'final', label: 'Finale', icon: '👑' }
  ];

  const handleNavClick = (id) => {
    audioManager.playClick();
    setMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header className="floating-hud-container" role="banner">
        {/* Left: Quick Jump Menu */}
        <div className="hud-group-left">
          <button
            type="button"
            className={`hud-pill ${menuOpen ? 'active' : ''}`}
            onClick={() => {
              audioManager.playClick();
              setMenuOpen(!menuOpen);
            }}
            aria-label="Toggle section navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="hud-icon">🧭</span>
            <span className="hud-text">Explore</span>
          </button>
        </div>

        {/* Right: Sound & Music Controls */}
        <div className="hud-group-right">
          {/* Sound FX Toggle */}
          <button
            type="button"
            className={`hud-pill ${soundEnabled ? 'active' : 'muted'}`}
            onClick={handleToggleSound}
            aria-label={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            title={soundEnabled ? 'Sound Effects: ON' : 'Sound Effects: OFF'}
          >
            <span className="hud-icon">{soundEnabled ? '🔔' : '🔕'}</span>
            <span className="hud-text">{soundEnabled ? 'SFX' : 'Muted'}</span>
          </button>

          {/* Music Button */}
          <button
            type="button"
            className={`hud-pill hud-pill-music ${musicPlaying ? 'playing' : ''}`}
            onClick={handleToggleMusic}
            aria-label={musicPlaying ? 'Pause background music' : 'Play background music'}
            title={musicPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
          >
            <span className="hud-icon">{musicPlaying ? '🔊' : '🎵'}</span>
            <span className="hud-text">{musicPlaying ? 'Music' : 'Music Off'}</span>
            {musicPlaying && (
              <span className="audio-wave-bars" aria-hidden="true">
                <span className="bar bar-1" />
                <span className="bar bar-2" />
                <span className="bar bar-3" />
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Slide-out or Dropdown Quick Jump Drawer */}
      {menuOpen && (
        <div className="hud-menu-overlay" onClick={() => setMenuOpen(false)}>
          <nav 
            className="hud-menu-sheet" 
            onClick={(e) => e.stopPropagation()}
            aria-label="Surprise milestones"
          >
            <div className="hud-menu-header">
              <span className="hud-menu-title">Birthday Journey ✨</span>
              <button 
                type="button" 
                className="hud-menu-close" 
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="hud-menu-items">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`hud-menu-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  <span className="item-icon">{item.icon}</span>
                  <span className="item-label">{item.label}</span>
                  {activeSection === item.id && <span className="active-dot" />}
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
