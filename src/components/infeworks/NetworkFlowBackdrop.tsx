import { useEffect, useRef } from "react";

export default function NetworkFlowBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    // Track mouse interaction state for visual flair
    let mouseActive = false;

    // Brand Colors
    // Navy Background: #070e1a (var(--iw-dark-deep))
    // Cyan Accent: #00c8d5 (var(--iw-dark-accent))
    // Copper Accent: #b05e2a (var(--iw-accent))

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      colorType: "cyan" | "copper" | "neutral";
      alpha: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        const speed = 0.15 + Math.random() * 0.2;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.1;

        const rand = Math.random();
        if (rand < 0.25) this.colorType = "cyan";
        else if (rand < 0.45) this.colorType = "copper";
        else this.colorType = "neutral";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Magnetic Attraction to Mouse
        if (mouseActive) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 250) {
            // Gentle attraction
            const force = (250 - distance) / 250;
            this.x += (dx / distance) * force * 1.5;
            this.y += (dy / distance) * force * 1.5;
            
            // Add a slight speed boost towards mouse to make it feel alive
            this.vx += (dx / distance) * force * 0.05;
            this.vy += (dy / distance) * force * 0.05;
            
            // Speed limit to prevent chaos
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > 2.5) {
              this.vx = (this.vx / currentSpeed) * 2.5;
              this.vy = (this.vy / currentSpeed) * 2.5;
            }
          }
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.colorType === "cyan") {
          ctx.fillStyle = `rgba(0, 200, 213, ${this.alpha + 0.3})`;
        } else if (this.colorType === "copper") {
          ctx.fillStyle = `rgba(176, 94, 42, ${this.alpha + 0.3})`;
        } else {
          ctx.fillStyle = `rgba(143, 163, 192, ${this.alpha + 0.1})`;
        }
        
        ctx.fill();
        
        // Glow effect for primary nodes
        if (this.colorType !== "neutral") {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = this.colorType === "cyan" 
            ? `rgba(0, 200, 213, ${this.alpha * 0.25})`
            : `rgba(176, 94, 42, ${this.alpha * 0.25})`;
          ctx.fill();
        }
      }
    }

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const dpr = window.devicePixelRatio || 1;
      width = parent.clientWidth;
      height = parent.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      // Density based on screen size (denser for a rich network feel)
      const area = width * height;
      const particleCount = Math.min(Math.floor(area / 12000), 150);

      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(Math.random() * width, Math.random() * height));
      }
    };

    const drawBackground = () => {
      // Deep oceanic dark gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, "#070e1a");
      grad.addColorStop(1, "#0a1324");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
      
      // Radial glow following mouse
      if (mouseActive) {
        const radialGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 400);
        radialGrad.addColorStop(0, "rgba(0, 200, 213, 0.08)");
        radialGrad.addColorStop(1, "rgba(0, 200, 213, 0)");
        ctx.fillStyle = radialGrad;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const animate = () => {
      drawBackground();

      // Connect particles to each other
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const maxDist = 160;
          
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * 0.35;
            
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Gradient line for active nodes
            if (p1.colorType !== "neutral" || p2.colorType !== "neutral") {
              const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
              
              const getColor = (type: string, op: number) => {
                if (type === "cyan") return `rgba(0, 200, 213, ${op * 1.5})`;
                if (type === "copper") return `rgba(176, 94, 42, ${op * 1.5})`;
                return `rgba(143, 163, 192, ${op * 0.5})`;
              };
              
              lineGrad.addColorStop(0, getColor(p1.colorType, opacity));
              lineGrad.addColorStop(1, getColor(p2.colorType, opacity));
              ctx.strokeStyle = lineGrad;
            } else {
              ctx.strokeStyle = `rgba(143, 163, 192, ${opacity * 0.5})`;
            }
            
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
        
        // Connect particle to mouse "Super Node"
        if (mouseActive) {
          const p = particles[i];
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 250) {
            const opacity = (1 - dist / 250) * 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            
            const lineGrad = ctx.createLinearGradient(p.x, p.y, mouse.x, mouse.y);
            const pColor = p.colorType === "cyan" ? `rgba(0, 200, 213, ${opacity})` : 
                           p.colorType === "copper" ? `rgba(176, 94, 42, ${opacity})` : 
                           `rgba(143, 163, 192, ${opacity * 0.5})`;
            
            // Draw a cyan/copper beam to the mouse
            lineGrad.addColorStop(0, pColor);
            lineGrad.addColorStop(1, `rgba(176, 94, 42, ${opacity * 1.5})`);
            
            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }

        particles[i].update();
        particles[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => init();
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouseActive = true;
    };
    const handleMouseLeave = () => {
      mouseActive = false;
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#070e1a]" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ pointerEvents: "auto" }}
      />
      {/* Subtle grid overlay to keep the engineering blueprint feel */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)"
        }}
      />
    </div>
  );
}
