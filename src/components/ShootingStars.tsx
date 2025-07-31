import React, { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
  angle: number;
  trail: { x: number; y: number; opacity: number }[];
}

export const ShootingStars: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const starsRef = useRef<Star[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    const createStar = (): Star => {
      let x, y, angle;

      // Start from different sides of the canvas
      x = Math.random() * canvas.width;
      y = -50;
      angle = 0.5;

      return {
        x,
        y,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 3 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        angle,
        trail: [],
      };
    };

    const updateStar = (star: Star) => {
      // Add current position to trail
      star.trail.unshift({ x: star.x, y: star.y, opacity: star.opacity });
      
      // Limit trail length
      if (star.trail.length > 15) {
        star.trail.pop();
      }

      // Update position
      star.x += Math.cos(star.angle) * star.speed;
      star.y += Math.sin(star.angle) * star.speed;

      // Fade out as it moves
      star.opacity -= 0.003;

      // Update trail opacities
      star.trail.forEach((point, index) => {
        point.opacity = (star.opacity * (star.trail.length - index)) / star.trail.length;
      });
    };

    const drawStar = (star: Star) => {
      if (star.opacity <= 0) return;

      ctx.save();
      
      // Draw trail
      star.trail.forEach((point, index) => {
        if (point.opacity <= 0) return;
        
        const size = (star.trail.length - index) / star.trail.length;
        ctx.globalAlpha = point.opacity;
        
        // Create gradient for each trail point
        const gradient = ctx.createRadialGradient(
          point.x, point.y, 0,
          point.x, point.y, 2 * size
        );
        gradient.addColorStop(0, '#ef4444');
        gradient.addColorStop(0.5, '#f59e0b');
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5 * size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw main star
      ctx.globalAlpha = star.opacity;
      
      // Create gradient for the main star
      const mainGradient = ctx.createRadialGradient(
        star.x, star.y, 0,
        star.x, star.y, 3
      );
      mainGradient.addColorStop(0, '#ffffff');
      mainGradient.addColorStop(0.3, '#ef4444');
      mainGradient.addColorStop(0.7, '#f59e0b');
      mainGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = mainGradient;
      ctx.beginPath();
      ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
      ctx.fill();

      // Add a bright core
      ctx.globalAlpha = star.opacity * 1.5;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, 0.8, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new stars randomly
      if (Math.random() < 0.03 && starsRef.current.length < 8) {
        starsRef.current.push(createStar());
      }

      // Update and draw stars
      starsRef.current = starsRef.current.filter((star) => {
        updateStar(star);
        drawStar(star);
        
        // Remove stars that are off screen or faded out
        return (
          star.opacity > 0 &&
          star.x > -100 &&
          star.x < canvas.width + 100 &&
          star.y > -100 &&
          star.y < canvas.height + 100
        );
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resizeCanvas();
    animate();

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ 
        width: '100%', 
        height: '100%',
        zIndex: 1
      }}
    />
  );
};
