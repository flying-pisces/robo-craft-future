import { useEffect, useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

const TIMELINE = [
  {
    period: '2025 – 2026',
    company: '1x Humanoid Robotics',
    title: 'Director of Automation',
    bullets: [
      'Led automation and test engineering for humanoid robot manufacturing',
      'Built and scaled hardware validation systems for full-body actuator modules',
      'Defined NPI processes for novel electromechanical assemblies',
    ],
    tags: ['Robotics', 'NPI', 'Automation'],
    accent: 'from-[hsl(188,94%,42%)] to-[hsl(213,94%,68%)]',
  },
  {
    period: '2021 – 2025',
    company: 'Meta',
    title: 'TechOps Manufacturing Lead · IC7/M2',
    bullets: [
      'Manufacturing lead for Meta Reality Labs hardware: Quest, Ray-Ban smartglasses, prototype AR/VR',
      'Managed ODM/OEM/JDM relationships with Foxconn, Pegatron, and Luxshare at scale',
      'Built ICT and functional test infrastructure for high-volume consumer electronics',
    ],
    tags: ['ODM/OEM', 'ICT', 'AR/VR', 'FATP'],
    accent: 'from-blue-500 to-blue-400',
  },
  {
    period: '2016 – 2021',
    company: 'Oculus / Facebook',
    title: 'Product Integration Architect',
    bullets: [
      'Product integration for Oculus Quest, Go, and Rift S headsets from EVT through MP',
      'Defined bring-up, test, and calibration protocols for optical and mechanical subassemblies',
      'Drove DFT/DFM improvements reducing test cycle time by 40%',
    ],
    tags: ['VR/XR', 'DFT', 'Optics', 'Bring-up'],
    accent: 'from-violet-500 to-violet-400',
  },
  {
    period: '2014 – 2016',
    company: 'Square / Block',
    title: 'Founding Hardware Engineer',
    bullets: [
      'Early hardware team for Square Terminal and Square Stand',
      'Designed and implemented manufacturing test fixtures and production line flows',
      'Managed CM relationships for 0→1 hardware products',
    ],
    tags: ['Founding Engineer', 'Mfg Test', 'Payments Hardware'],
    accent: 'from-emerald-500 to-emerald-400',
  },
  {
    period: '2010 – 2014',
    company: 'Apple',
    title: 'Display Test Engineering Lead',
    bullets: [
      'Lead display test engineer for iPhone and Mac display programs (Retina era)',
      'Developed Lumitop optical calibration system deployed across APAC supply chain',
      'Built automated optical test station reducing takt time by 30% on iPhone line',
    ],
    tags: ['Display Test', 'Optics', 'APAC', 'Automation'],
    accent: 'from-gray-400 to-gray-300',
  },
  {
    period: '2006 – 2010',
    company: 'Qualcomm · MicroDisplay Corp',
    title: 'Research Scientist → LCoS Engineer',
    bullets: [
      'LCoS display and optics engineering: pixel design, optical stack, electro-optic modeling',
      'Research on micro-optics, waveguides, and display metrology at Qualcomm',
    ],
    tags: ['LCoS', 'Optics', 'Research', 'Photonics'],
    accent: 'from-red-500 to-red-400',
  },
  {
    period: '2001 – 2006',
    company: 'Kent State University',
    title: 'PhD, Chemical Physics',
    bullets: [
      'Dissertation in liquid crystal physics and electro-optic device modeling',
      'Published 8 peer-reviewed papers in optics, liquid crystal science, and materials',
    ],
    tags: ['PhD', 'Liquid Crystals', 'Publications'],
    accent: 'from-amber-500 to-amber-400',
  },
];

const Career = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(0);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="career" ref={ref} className="py-24 bg-card/30 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs text-primary tracking-widest mb-4">// CAREER</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="text-gradient">Timeline</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From liquid crystal physics to humanoid robotics — two decades of shipping real hardware.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-4">
            {TIMELINE.map((item, i) => (
              <div
                key={i}
                className={`relative pl-16 md:pl-20 transition-all duration-500 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Dot */}
                <div className={`absolute left-4 md:left-6 top-5 w-4 h-4 rounded-full bg-gradient-to-r ${item.accent} ring-2 ring-background ring-offset-1 ring-offset-background`} />

                {/* Card */}
                <div
                  className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                  onClick={() => { playClick(); setExpanded(expanded === i ? null : i); }}
                  onMouseEnter={() => playHover()}
                >
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <div className="font-mono text-xs text-primary mb-1">{item.period}</div>
                        <div className="font-bold text-white text-lg leading-tight">{item.company}</div>
                        <div className="text-sm text-muted-foreground">{item.title}</div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded bullets */}
                    {expanded === i && (
                      <ul className="mt-4 space-y-2">
                        {item.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="text-primary mt-0.5 shrink-0">▸</span>
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Career;
