import { useEffect, useRef } from 'react';

export default function VoiceWaveform({ state, volume, theme = 'purple' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let phase = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight || 100;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Color definitions based on the theme
    const getThemeColors = () => {
      switch (theme) {
        case 'blue':
          return [
            'rgba(6, 182, 212, 0.8)',  // Cyan
            'rgba(59, 130, 246, 0.5)',  // Blue
            'rgba(14, 165, 233, 0.3)',  // Light Blue
          ];
        case 'green':
          return [
            'rgba(16, 185, 129, 0.8)', // Emerald
            'rgba(34, 197, 94, 0.5)',   // Green
            'rgba(20, 184, 166, 0.3)',  // Teal
          ];
        case 'red':
          return [
            'rgba(239, 68, 68, 0.8)',   // Red
            'rgba(244, 63, 94, 0.5)',   // Rose
            'rgba(249, 115, 22, 0.3)',  // Orange
          ];
        case 'gold':
          return [
            'rgba(245, 158, 11, 0.8)',  // Amber
            'rgba(234, 179, 8, 0.5)',   // Yellow
            'rgba(249, 115, 22, 0.3)',  // Orange
          ];
        case 'pink':
          return [
            'rgba(236, 72, 153, 0.8)',  // Pink
            'rgba(219, 39, 119, 0.5)',  // Fuchsia
            'rgba(251, 113, 133, 0.3)', // Rose
          ];
        case 'purple':
        default:
          return [
            'rgba(147, 51, 234, 0.8)', // Purple
            'rgba(79, 70, 229, 0.5)',  // Indigo
            'rgba(236, 72, 153, 0.3)',  // Pink
          ];
      }
    };

    const drawSineWave = (cx, cy, width, height, amplitude, frequency, speed, color, lineWidth) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.shadowBlur = lineWidth > 2 ? 15 : 0;
      ctx.shadowColor = color;

      for (let x = 0; x < width; x++) {
        // Apply a sine wave modulated by a gaussian envelope to taper the ends
        const angle = (x / width) * Math.PI * 2 * frequency + phase * speed;
        const envelope = Math.sin((x / width) * Math.PI); // 0 at ends, 1 at center
        const y = cy + Math.sin(angle) * amplitude * envelope;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);
      ctx.shadowBlur = 0; // Reset shadow

      const colors = getThemeColors();
      phase += 0.05;

      if (state === 'idle') {
        // Almost flat, breathing line in the center
        const amp = 3 + Math.sin(phase * 0.5) * 2;
        drawSineWave(0, cy, width, height, amp, 1, 0.5, colors[0], 2.5);
        drawSineWave(0, cy, width, height, amp * 0.5, 1.5, -0.4, colors[1], 1.5);
      } 
      else if (state === 'listening') {
        // Reacts heavily to microphone volume
        const baseAmp = 5;
        const volumeAmp = volume * (height * 0.45);
        const totalAmp = baseAmp + volumeAmp;

        // Draw 3 layers of waves
        drawSineWave(0, cy, width, height, totalAmp, 1.8, 1.5, colors[0], 3);
        drawSineWave(0, cy, width, height, totalAmp * 0.75, 2.5, -1.2, colors[1], 2);
        drawSineWave(0, cy, width, height, totalAmp * 0.45, 3.2, 0.8, colors[2], 1.5);
      } 
      else if (state === 'thinking') {
        // Slow swirling, low-amplitude processing waves
        const amp = 6 + Math.sin(phase * 1.5) * 3;
        drawSineWave(0, cy, width, height, amp, 3.5, 0.8, colors[0], 2);
        drawSineWave(0, cy, width, height, amp * 0.8, 4.8, -1.0, colors[1], 1.5);
        drawSineWave(0, cy, width, height, amp * 0.5, 6.0, 0.5, colors[2], 1);
      } 
      else if (state === 'speaking') {
        // Dynamic procedural waves simulating AI voice output
        // Generate procedural speech volume using waves
        const speakVolume = 0.15 + Math.abs(Math.sin(phase * 2.5) * 0.5 + Math.cos(phase * 0.8) * 0.3);
        const totalAmp = speakVolume * (height * 0.4);

        drawSineWave(0, cy, width, height, totalAmp, 2.0, 2.0, colors[0], 3);
        drawSineWave(0, cy, width, height, totalAmp * 0.8, 3.0, -1.6, colors[1], 2.2);
        drawSineWave(0, cy, width, height, totalAmp * 0.5, 1.4, 1.1, colors[2], 1.5);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [state, volume, theme]);

  return (
    <div className="w-full h-24 flex items-center justify-center relative bg-transparent overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full pointer-events-none" />
    </div>
  );
}
