import React, { useEffect, useRef } from 'react';

export default function AmbientBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const colors = [
      'rgba(244, 114, 182, ', // Pink
      'rgba(192, 132, 252, ', // Lavender
      'rgba(251, 146, 60, ',  // Peach
      'rgba(251, 191, 36, '   // Gold
    ];

    const initParticles = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 35);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 2.5 + 1,
          colorBase: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.1,
          speedY: -(Math.random() * 0.35 + 0.15),
          speedX: (Math.random() - 0.5) * 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseVal: Math.random() * Math.PI
        });
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulseVal += p.pulseSpeed;

        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;

        const currentAlpha = p.alpha + Math.sin(p.pulseVal) * 0.15;
        const radius = p.radius + Math.sin(p.pulseVal) * 0.5;

        // Soft glowing particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, radius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${Math.max(0.05, currentAlpha)})`;
        ctx.shadowColor = `${p.colorBase}0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      render();
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="ambient-background-layer" aria-hidden="true">
      <div className="ambient-gradient-mesh" />
      <canvas ref={canvasRef} className="ambient-canvas" />
      <div className="ambient-light-beam light-beam-left" />
      <div className="ambient-light-beam light-beam-right" />
    </div>
  );
}
