import { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Download, Briefcase, Github, Linkedin, Lock } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const ROLES = [
  'Hardware Engineer',
  'Manufacturing Expert',
  'Robotics Builder',
  'NPI Specialist',
  'Engineering Consultant',
];

const COMPANIES = ['Apple', 'Square', 'Oculus', 'Meta', '1x Robotics'];

const Hero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [booted, setBooted] = useState(false);
  const { playClick, playType, playHover } = useSound();

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!booted) return;
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    } else {
      timeout = setTimeout(() => {
        if (isDeleting) {
          setDisplayText(s => s.slice(0, -1));
        } else {
          setDisplayText(s => currentRole.slice(0, s.length + 1));
          playType();
        }
      }, isDeleting ? 45 : 85);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, booted, playType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const c = canvas.getContext('2d');
    if (!c) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const n = Math.min(70, Math.floor((canvas.width * canvas.height) / 12000));
    const pts: P[] = Array.from({ length: n }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));

    let id: number;
    const frame = () => {
      c.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        c.beginPath();
        c.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        c.fillStyle = 'rgba(6,182,212,0.55)';
        c.fill();
      }
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            c.beginPath();
            c.moveTo(pts[i].x, pts[i].y);
            c.lineTo(pts[j].x, pts[j].y);
            c.strokeStyle = `rgba(6,182,212,${0.12 * (1 - d / 120)})`;
            c.lineWidth = 0.5;
            c.stroke();
          }
        }
      }
      id = requestAnimationFrame(frame);
    };
    frame();
    return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = useCallback((id: string) => {
    playClick();
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }, [playClick]);

  const visible = `transition-all duration-700`;
  const enter = (delay: number) => `${visible} ${booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/70" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20 ${enter(0)}`}
          style={{ transitionDelay: '0ms' }}>
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          AVAILABLE FOR CONSULTING · $125/HR
        </div>

        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black leading-none tracking-tight mb-3 ${enter(100)}`}
          style={{ transitionDelay: '100ms' }}>
          <span className="block text-white animate-glitch">CHUCK</span>
          <span className="block text-gradient">YIN</span>
        </h1>

        <p className={`font-mono text-xs text-muted-foreground tracking-widest mb-6 ${enter(200)}`}
          style={{ transitionDelay: '200ms' }}>
          PhD Chemical Physics &nbsp;·&nbsp; 20+ Years Hardware Engineering
        </p>

        <div className={`h-10 flex items-center justify-center mb-6 ${enter(300)}`}
          style={{ transitionDelay: '300ms' }}>
          <span className="font-mono text-xl md:text-2xl text-primary font-medium">
            &gt;&nbsp;{displayText}
            <span className="animate-blink">▊</span>
          </span>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 mb-10 ${enter(400)}`}
          style={{ transitionDelay: '400ms' }}>
          {COMPANIES.map(co => (
            <span key={co} onMouseEnter={() => playHover()}
              className="px-3 py-1 text-xs font-mono text-muted-foreground border border-border rounded-full hover:border-primary hover:text-primary transition-colors cursor-default">
              {co}
            </span>
          ))}
        </div>

        <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-10 ${enter(500)}`}
          style={{ transitionDelay: '500ms' }}>
          <button onClick={() => scrollTo('#contact')} onMouseEnter={() => playHover()}
            className="flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-primary/90 transition-all glow-cyan">
            <Briefcase size={16} />
            Hire Me — $125/hr
          </button>
          <a href="/Chuck_Yin_Resume_2026.pdf" download onClick={() => playClick()} onMouseEnter={() => playHover()}
            className="flex items-center justify-center gap-2 px-8 py-3.5 border border-border text-foreground rounded font-semibold text-sm hover:border-primary hover:text-primary transition-all">
            <Download size={16} />
            Download Resume
          </a>
        </div>

        <div className={`flex justify-center gap-6 mb-16 ${enter(600)}`}
          style={{ transitionDelay: '600ms' }}>
          <a href="https://github.com/flying-pisces" target="_blank" rel="noopener noreferrer"
            onClick={() => playClick()} onMouseEnter={() => playHover()}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
            <Github size={14} /> flying-pisces
          </a>
          <span className="text-border self-center">|</span>
          <a href="https://linkedin.com/in/yeyin" target="_blank" rel="noopener noreferrer"
            onClick={() => playClick()} onMouseEnter={() => playHover()}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
            <Linkedin size={14} /> yeyin
          </a>
          <span className="text-border self-center">|</span>
          <a href="/dash/" onClick={() => playClick()} onMouseEnter={() => playHover()}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
            title="Admin portal — login required">
            <Lock size={14} /> admin
          </a>
        </div>

        <button onClick={() => scrollTo('#about')} className="animate-bounce text-muted-foreground hover:text-primary transition-colors">
          <ArrowDown size={20} />
        </button>
      </div>

      <div className="absolute top-1/4 right-16 w-24 h-24 border border-primary/10 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-1/3 left-16 w-16 h-16 border border-primary/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: '2s' }} />
    </section>
  );
};

export default Hero;
