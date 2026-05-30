import { useEffect, useRef } from 'react';

export default function ParticlesBackground({ state, theme = 'purple' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 2.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        
        // Color hue matching the theme
        this.hue = this.getThemeHue();
        this.alpha = Math.random() * 0.4 + 0.1;
      }

      getThemeHue() {
        switch (theme) {
          case 'blue': return 195;   // Cyan/Blue
          case 'green': return 150;  // Emerald Green
          case 'red': return 355;    // Crimson Red
          case 'gold': return 42;     // Amber/Gold
          case 'pink': return 328;    // Hot Pink
          case 'purple':
          default: return 270;       // Purple
        }
      }

      update() {
        const centerX = width / 2;
        const centerY = height / 2;
        const dx = centerX - this.x;
        const dy = centerY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Adjust hue in real time if theme changes
        const targetHue = this.getThemeHue();
        this.hue += (targetHue - this.hue) * 0.1;

        if (state === 'listening') {
          // Attracted to center orb slowly
          const force = 0.05;
          this.speedX += (dx / (dist + 50)) * force;
          this.speedY += (dy / (dist + 50)) * force;
          
          // Speed limit
          const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
          if (speed > 1.5) {
            this.speedX = (this.speedX / speed) * 1.5;
            this.speedY = (this.speedY / speed) * 1.5;
          }
          this.alpha = Math.min(0.6, this.alpha + 0.01);
        } else if (state === 'thinking') {
          // Slow swirl rotation around the center
          const angle = Math.atan2(dy, dx) + 0.01;
          const orbitDist = Math.max(100, dist);
          const targetX = centerX - Math.cos(angle) * orbitDist;
          const targetY = centerY - Math.sin(angle) * orbitDist;
          
          this.speedX += (targetX - this.x) * 0.005;
          this.speedY += (targetY - this.y) * 0.005;
          
          // Dampen speed slightly
          this.speedX *= 0.95;
          this.speedY *= 0.95;
          this.alpha = Math.max(0.1, this.alpha - 0.005);
        } else if (state === 'speaking') {
          // Repelled from center
          if (dist < 300) {
            const force = 0.2;
            this.speedX -= (dx / (dist + 10)) * force;
            this.speedY -= (dy / (dist + 10)) * force;
          }
          // Speed limit
          const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
          if (speed > 2.0) {
            this.speedX = (this.speedX / speed) * 2.0;
            this.speedY = (this.speedY / speed) * 2.0;
          }
          this.alpha = Math.min(0.7, this.alpha + 0.02);
        } else {
          // Idle state - slow drift, return to normal speeds
          this.speedX *= 0.95;
          this.speedY *= 0.95;
          
          // Re-add small random movements
          this.speedX += (Math.random() - 0.5) * 0.05;
          this.speedY += (Math.random() - 0.5) * 0.05;

          const speed = Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY);
          if (speed > 0.4) {
            this.speedX = (this.speedX / speed) * 0.4;
            this.speedY = (this.speedY / speed) * 0.4;
          }
          this.alpha = Math.max(0.15, Math.min(0.4, this.alpha - 0.005));
        }

        // Apply velocities
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around boundaries
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 85%, 70%, ${this.alpha})`;
        ctx.fill();
      }
    }

    const particleCount = 80;
    const particles = Array.from({ length: particleCount }, () => new Particle());

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      particles.forEach(p => p.reset());
    };

    window.addEventListener('resize', handleResize);

    const animate = () => {
      // Semi-transparent background clear for minor trailing effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.15)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
