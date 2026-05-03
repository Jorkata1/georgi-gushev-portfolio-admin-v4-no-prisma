"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

const COLORS = {
  blue: "79,156,247",
  amber: "232,164,74",
};

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width;
      canvas!.height = height;
      initParticles();
    }

    function isMobile() {
      return window.innerWidth < 768;
    }

    function initParticles() {
      const count = isMobile() ? 35 : 70;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const isAmber = Math.random() > 0.7;
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.5 + 0.1,
          color: isAmber ? COLORS.amber : COLORS.blue,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.02 + 0.005,
        });
      }

      particlesRef.current = particles;
    }

    function drawParticle(p: Particle) {
      if (!ctx) return;
      const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${currentOpacity * 0.15})`;
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${currentOpacity})`;
      ctx.fill();
    }

    function drawConnections() {
      if (!ctx) return;
      const particles = particlesRef.current;
      const maxDist = isMobile() ? 100 : 140;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${COLORS.blue},${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    function drawMouseGlow() {
      if (!ctx) return;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      if (mx < 0) return;

      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      gradient.addColorStop(0, "rgba(79,156,247,0.06)");
      gradient.addColorStop(0.5, "rgba(232,164,74,0.03)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(mx - 200, my - 200, 400, 400);
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Update positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;

        // Wrap around edges
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse repulsion (desktop only)
        if (!isMobile()) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 0.3;
            p.vx += (dx / dist) * force * 0.1;
            p.vy += (dy / dist) * force * 0.1;
          }
        }

        // Dampen velocity
        p.vx *= 0.999;
        p.vy *= 0.999;

        drawParticle(p);
      }

      drawConnections();
      drawMouseGlow();

      animationRef.current = requestAnimationFrame(animate);
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    function handleMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 };
    }

    resize();
    animate();

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.12),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(216,171,98,0.09),transparent_18%)]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      {/* Static base gradient underneath */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(87,166,255,0.08),transparent_24%),radial-gradient(circle_at_80%_15%,rgba(216,171,98,0.06),transparent_18%)]" />

      {/* Canvas particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}