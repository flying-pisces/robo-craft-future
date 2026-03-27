import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Clock, Zap } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const SERVICES = [
  {
    icon: '⚡',
    title: 'Manufacturing Test Engineering',
    description: 'ICT fixture design, flying probe programs, functional test development, ATE integration, and production test strategy from EVT through MP.',
    deliverables: ['Test strategy document', 'ICT/functional test fixture specs', 'Pass/fail criteria & limits', 'Yield improvement recommendations'],
  },
  {
    icon: '🔩',
    title: 'NPI / Hardware Bring-up',
    description: 'New product introduction from prototype to mass production. EVT/DVT/PVT milestone planning, BOM review, DFM/DFT analysis, and supplier qualification.',
    deliverables: ['NPI milestone plan', 'DFM/DFT report', 'Supplier qualification checklist', 'Yield & test coverage targets'],
  },
  {
    icon: '🔬',
    title: 'Optics & Display Engineering',
    description: 'LCoS/OLED/LCD optical calibration, display metrology, AR/VR optical design review, waveguide characterization, and production optical test systems.',
    deliverables: ['Optical test protocol', 'Calibration algorithm design', 'Display spec analysis', 'Production line recommendations'],
  },
  {
    icon: '🤖',
    title: 'Robotics Integration & Test',
    description: 'Hardware bring-up for electromechanical systems, actuator validation, sensor integration, HIL test framework design, and robotics manufacturing strategy.',
    deliverables: ['HIL test framework spec', 'Actuator test protocol', 'Manufacturing flow design', 'Integration risk assessment'],
  },
  {
    icon: '🏭',
    title: 'Contract Manufacturing Advisory',
    description: 'ODM/OEM/JDM relationship management, CM selection and qualification, APAC factory audits, line balancing, and takt time optimization.',
    deliverables: ['CM scorecard & selection criteria', 'Factory audit report', 'Takt time analysis', 'Quality control framework'],
  },
  {
    icon: '👥',
    title: 'Engineering Leadership Consulting',
    description: 'Org design, hiring strategy, and process framework for building hardware engineering teams. Interim Director/VP coverage during team transitions.',
    deliverables: ['Org design document', 'Hiring criteria & rubric', 'Process documentation', 'Team ramp plan'],
  },
];

const Services = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    playClick();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" ref={ref} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className={`text-center mb-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs text-primary tracking-widest mb-4">// SERVICES</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Engineering <span className="text-gradient">Consulting</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            20+ years of hardware engineering expertise, available to your team.
          </p>
        </div>

        {/* Pricing banner */}
        <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 mb-16 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '100ms' }}>
          <div className="flex items-center gap-3 px-6 py-4 bg-card border border-primary/30 rounded-xl glow-cyan">
            <div>
              <div className="text-3xl font-black text-gradient font-mono">$125</div>
              <div className="text-xs text-muted-foreground font-mono">per hour</div>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Engineering Rate</div>
              <div className="text-xs text-muted-foreground">Hourly or project-based</div>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-primary shrink-0" />
              Remote or on-site (Bay Area preferred)
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-primary shrink-0" />
              Min. 10 hrs/week engagements
            </div>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-primary shrink-0" />
              NDA available, references on request
            </div>
          </div>
        </div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              className={`group bg-card border rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 ${
                active === i ? 'border-primary glow-cyan' : 'border-border hover:border-primary/40'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 60}ms` }}
              onClick={() => { playClick(); setActive(active === i ? null : i); }}
              onMouseEnter={() => playHover()}
            >
              {active === i && (
                <div className="h-0.5 bg-gradient-to-r from-[hsl(188,94%,42%)] to-[hsl(213,94%,68%)]" />
              )}
              <div className="p-5">
                <div className="text-2xl mb-3">{svc.icon}</div>
                <h3 className="font-bold text-white mb-2 text-sm leading-tight group-hover:text-primary transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  {svc.description}
                </p>
                {active === i && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="text-xs font-mono text-primary mb-2">DELIVERABLES</div>
                    <ul className="space-y-1.5">
                      {svc.deliverables.map(d => (
                        <li key={d} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <CheckCircle size={11} className="text-primary mt-0.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className={`text-xs font-mono text-primary/60 mt-3 ${active === i ? 'hidden' : ''}`}>
                  Click for deliverables ↓
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '500ms' }}>
          <p className="text-muted-foreground mb-6">Ready to build something? Let's talk.</p>
          <button onClick={scrollToContact} onMouseEnter={() => playHover()}
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-primary-foreground rounded font-bold text-sm hover:bg-primary/90 transition-all glow-cyan">
            Get In Touch — $125/hr
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
