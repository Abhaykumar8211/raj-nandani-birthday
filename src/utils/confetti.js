/**
 * High-performance, lightweight, mobile-optimized Canvas Confetti Engine
 * Zero dependencies, respects prefers-reduced-motion, self-cleaning.
 */

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animating = false;
    this.animationId = null;
    this.themeColors = [
      '#FF6B8B', '#F472B6', '#C084FC', '#FB923C', 
      '#FBBF24', '#38BDF8', '#34D399', '#FFFBEB'
    ];
  }

  ensureCanvas() {
    if (this.canvas && document.body.contains(this.canvas)) {
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'birthday-confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '99999';
    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext('2d');
    this.resize();

    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  resize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    if (this.ctx) {
      this.ctx.scale(dpr, dpr);
    }
  }

  burst(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 45) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.ensureCanvas();
    const effectiveCount = Math.min(count, 80); // Protect mobile GPUs

    for (let i = 0; i < effectiveCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 4 + Math.random() * 8;
      const size = 6 + Math.random() * 6;
      const shapes = ['circle', 'rect', 'star'];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = this.themeColors[Math.floor(Math.random() * this.themeColors.length)];

      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 2.5,
        size,
        color,
        shape,
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        decay: 0.012 + Math.random() * 0.015,
        gravity: 0.18 + Math.random() * 0.08,
        drag: 0.96
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.loop();
    }
  }

  rain(durationMs = 2500, intensity = 5) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.ensureCanvas();

    const startTime = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - startTime > durationMs) {
        clearInterval(interval);
        return;
      }
      for (let i = 0; i < intensity; i++) {
        const x = Math.random() * window.innerWidth;
        const color = this.themeColors[Math.floor(Math.random() * this.themeColors.length)];
        this.particles.push({
          x,
          y: -10,
          vx: (Math.random() - 0.5) * 2,
          vy: 2 + Math.random() * 4,
          size: 5 + Math.random() * 6,
          color,
          shape: Math.random() > 0.4 ? 'rect' : 'circle',
          alpha: 1,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          decay: 0.005 + Math.random() * 0.008,
          gravity: 0.08,
          drag: 0.99
        });
      }
      if (!this.animating) {
        this.animating = true;
        this.loop();
      }
    }, 120);
  }

  loop() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > window.innerHeight + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.shape === 'star') {
        this.drawStar(0, 0, 5, p.size / 2, p.size / 4);
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.7);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(() => this.loop());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  drawStar(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;

    this.ctx.beginPath();
    this.ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      this.ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      this.ctx.lineTo(x, y);
      rot += step;
    }
    this.ctx.lineTo(cx, cy - outerRadius);
    this.ctx.closePath();
    this.ctx.fill();
  }

  grandFinaleExplosion() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Staggered multi-point burst
    this.burst(w * 0.2, h * 0.4, 50);
    this.burst(w * 0.8, h * 0.4, 50);
    setTimeout(() => this.burst(w * 0.5, h * 0.3, 60), 300);
    setTimeout(() => this.burst(w * 0.35, h * 0.6, 40), 600);
    setTimeout(() => this.burst(w * 0.65, h * 0.6, 40), 900);
    this.rain(4000, 6);
  }
}

export const confetti = new ConfettiEngine();
