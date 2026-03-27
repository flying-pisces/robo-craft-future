import { useEffect, useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

const STATS = [
  { value: '20+', label: 'Years Experience' },
  { value: '6', label: 'Tier-1 Companies' },
  { value: '100M+', label: 'Units Shipped' },
  { value: 'PhD', label: 'Chemical Physics' },
];

const About = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="font-mono text-xs text-primary tracking-widest mb-4">// ABOUT</div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Building the Physical<br />
              <span className="text-gradient">Layer of Technology</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-5">
              I'm Chuck Yin — a hardware engineer who has spent 20+ years at the intersection of manufacturing
              scale, test automation, and product engineering. From display optics at Apple to humanoid robotics
              at 1x, I've led the teams and built the systems that turn prototypes into products shipped at scale.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-5">
              My PhD in Chemical Physics gave me a rigorous foundation in measurement science and precision
              systems — skills that translate directly into manufacturing test, ICT, optical calibration,
              and hardware bring-up. I've managed contract manufacturing relationships with Foxconn, Pegatron,
              and Flextronics across APAC.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today I'm available as an engineering consultant and open to Director/VP roles where I can
              build and lead hardware organizations.
            </p>
          </div>

          <div className={`grid grid-cols-2 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}
            style={{ transitionDelay: '200ms' }}>
            {STATS.map(stat => (
              <div key={stat.label} onMouseEnter={() => playHover()}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className="text-3xl font-black text-gradient mb-2 font-mono">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
            <div className="col-span-2 p-6 bg-card border border-primary/20 rounded-lg">
              <p className="text-sm text-primary/80 font-mono italic leading-relaxed">
                "The best hardware engineers understand that manufacturing IS the product."
              </p>
              <p className="text-xs text-muted-foreground mt-2">— Chuck Yin</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
