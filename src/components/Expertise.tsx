import { useEffect, useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

const SKILLS = [
  { name: 'Manufacturing Test Automation (ICT, JTAG, Functional)', level: 97 },
  { name: 'NPI / New Product Introduction', level: 95 },
  { name: 'Contract Manufacturing (ODM/OEM/JDM)', level: 93 },
  { name: 'Hardware Bring-up & Validation', level: 92 },
  { name: 'Optics, Display & Photonics Systems', level: 90 },
  { name: 'Robotics & Electromechanical Integration', level: 85 },
  { name: 'FATP Process Design', level: 88 },
  { name: 'Engineering Leadership & Team Building', level: 90 },
];

const DOMAINS = [
  {
    icon: '⚡',
    title: 'Manufacturing Test',
    items: ['ICT (In-Circuit Test)', 'JTAG / Boundary Scan', 'Flying Probe', 'Functional Test', 'Automated Test Equipment (ATE)'],
  },
  {
    icon: '🔬',
    title: 'Optics & Display',
    items: ['LCoS Display Systems', 'Optical Calibration', 'Metrology (Lumitop)', 'Display Characterization', 'Waveguides & AR Optics'],
  },
  {
    icon: '🤖',
    title: 'Robotics & Hardware',
    items: ['Humanoid Robot Systems', 'Actuator Module Testing', 'Sensor Integration', 'Mechanical Bring-up', 'BOM & DFM Review'],
  },
  {
    icon: '🏭',
    title: 'Contract Manufacturing',
    items: ['Foxconn, Pegatron, Flextronics', 'APAC CM Management', 'Yield & Takt Optimization', 'JDM / ODM Relationships', 'FATP Line Design'],
  },
];

const SkillBar = ({ name, level, visible, delay }: { name: string; level: number; visible: boolean; delay: number }) => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setAnimated(true), delay);
      return () => clearTimeout(t);
    }
  }, [visible, delay]);

  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="text-sm text-foreground font-medium">{name}</span>
        <span className="text-xs font-mono text-primary">{level}%</span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[hsl(188,94%,42%)] to-[hsl(213,94%,68%)] rounded-full transition-all duration-1000 ease-out"
          style={{ width: animated ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
};

const Expertise = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const { playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="expertise" ref={ref} className="py-24 bg-background relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs text-primary tracking-widest mb-4">// EXPERTISE</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical <span className="text-gradient">Depth</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Skill bars */}
          <div className={`space-y-5 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h3 className="font-mono text-sm text-primary mb-6">PROFICIENCY LEVELS</h3>
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} visible={visible} delay={i * 100} />
            ))}
          </div>

          {/* Domain cards */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}>
            {DOMAINS.map(domain => (
              <div key={domain.title} onMouseEnter={() => playHover()}
                className="p-5 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 cursor-default">
                <div className="text-2xl mb-3">{domain.icon}</div>
                <h4 className="font-semibold text-white mb-3 text-sm">{domain.title}</h4>
                <ul className="space-y-1.5">
                  {domain.items.map(item => (
                    <li key={item} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
