/**
 * Comprehensive Audio Manager for Birthday Surprise
 * - Supports HTML5 Audio elements for MP3 files
 * - Includes complete Web Audio API synthesizers for sound FX
 * - Automatic synthesized ambient music fallback if local MP3 is missing
 * - Mobile safe: never autoplays until user initiates
 */

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = true;
    this.musicPlaying = false;
    this.bgAudio = null;
    this.synthLoopInterval = null;
    this.listeners = new Set();
    this.audioSources = [
      '/assets/audio/birthday-music.mp3',
      '/assets/birthday-music.mp3',
      '/assets/music/birthday.mp3'
    ];
  }

  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener({
        musicPlaying: this.musicPlaying,
        soundEnabled: this.soundEnabled
      });
    }
  }

  // --- SOUND EFFECTS ---

  playClick() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(350, ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore audio error
    }
  }

  playCafeBell() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      // Dual-tone restaurant silver service bell (e.g. 1760Hz and 2093Hz)
      [1760, 2093].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.25);
      });
    } catch {
      // Ignore
    }
  }

  playPop() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.06;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(950, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(120, ctx.currentTime + 0.05);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.06);
    } catch {
      // Ignore
    }
  }

  playCandleBlow() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const bufferSize = ctx.sampleRate * 0.4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.38);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
      noise.stop(ctx.currentTime + 0.4);
    } catch {
      // Ignore
    }
  }

  playGiftOpen() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.soundEnabled) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.07, ctx.currentTime + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.85);
        }, idx * 80);
      });
    } catch {
      // Ignore
    }
  }

  playFanfare() {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          if (!this.soundEnabled) return;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          gain.gain.setValueAtTime(0.001, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.09, ctx.currentTime + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.4);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 2.5);
        }, idx * 120);
      });
    } catch {
      // Ignore
    }
  }

  // --- BACKGROUND MUSIC ---

  toggleMusic() {
    this.getAudioContext();
    if (this.musicPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.notify();
  }

  async playMusic() {
    this.getAudioContext();
    this.musicPlaying = true;
    this.notify();

    if (!this.bgAudio) {
      this.bgAudio = new Audio();
      this.bgAudio.loop = true;
      this.bgAudio.volume = 0.55;
    }

    let played = false;
    for (const src of this.audioSources) {
      try {
        this.bgAudio.src = src;
        await this.bgAudio.play();
        played = true;
        break;
      } catch {
        // Fallback
      }
    }

    if (!played) {
      this.startSynthMusic();
    }
  }

  pauseMusic() {
    this.musicPlaying = false;
    this.notify();

    if (this.bgAudio) {
      try {
        this.bgAudio.pause();
      } catch {
        // Ignore
      }
    }
    this.stopSynthMusic();
  }

  startSynthMusic() {
    this.stopSynthMusic();
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 880.00, 659.25];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.musicPlaying) return;
      const freq = melody[noteIdx % melody.length];
      noteIdx++;

      try {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.85);
      } catch {
        // Ignore
      }
    };

    playNextNote();
    this.synthLoopInterval = setInterval(playNextNote, 650);
  }

  stopSynthMusic() {
    if (this.synthLoopInterval) {
      clearInterval(this.synthLoopInterval);
      this.synthLoopInterval = null;
    }
  }
}

export const audioManager = new AudioManager();
