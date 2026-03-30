import React, { useEffect, useRef } from 'react';

const LineWaves = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawWave = (y, amplitude, frequency, speed, color) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      for (let x = 0; x < canvas.width; x++) {
        const yOffset = Math.sin(x * frequency + time * speed) * amplitude;
        if (x === 0) {
          ctx.moveTo(x, y + yOffset);
        } else {
          ctx.lineTo(x, y + yOffset);
        }
      }
      ctx.stroke();
    };

    const animate = () => {
      ctx.fillStyle = '#0A0812';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw multiple waves
      drawWave(canvas.height * 0.3, 50, 0.005, 0.02, 'rgba(107, 33, 255, 0.3)');
      drawWave(canvas.height * 0.4, 40, 0.008, 0.015, 'rgba(139, 92, 246, 0.25)');
      drawWave(canvas.height * 0.5, 60, 0.006, 0.025, 'rgba(107, 33, 255, 0.2)');
      drawWave(canvas.height * 0.6, 45, 0.007, 0.018, 'rgba(139, 92, 246, 0.15)');
      drawWave(canvas.height * 0.7, 55, 0.004, 0.022, 'rgba(107, 33, 255, 0.1)');

      time += 1;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#0A0812' }}
    />
  );
};

export default LineWaves;
