import { useEffect, useRef, useState } from 'react';
import { Github, ExternalLink, Star } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const PROJECTS = [
  {
    name: 'TactoSkin — Robot Tactile Skin',
    description: 'Full-stack product website for TactoSkin modular tactile sensing system for humanoid robots. Features hex-module product showcase, contact/inquiry backend, and GitHub Pages deployment with custom domain.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Supabase', 'GitHub Pages'],
    github: 'https://github.com/flying-pisces/robo-craft-future',
    live: 'https://www.sshrobotics.com',
    stars: 12,
    status: 'Live',
    highlight: true,
  },
  {
    name: 'OTW — AI-Powered Job Hunt Automation',
    description: 'Python automation system that runs daily on GitHub Actions. Searches Greenhouse + Lever APIs for hardware/robotics roles, scores them against a weighted profile, auto-generates tailored DOCX/PDF resumes per company, and sends mobile push notifications via ntfy.',
    tags: ['Python', 'GitHub Actions', 'DOCX Generation', 'Automation', 'AI'],
    github: 'https://github.com/flying-pisces/otw',
    live: null,
    stars: 8,
    status: 'Active',
    highlight: false,
  },
  {
    name: 'Lumitop — Optical Calibration System',
    description: 'Production optical calibration and display test automation system for Apple iPhone and Mac display supply chain. Deployed across 12 APAC manufacturing sites; reduced calibration takt time by 30% (professional project).',
    tags: ['Python', 'C++', 'Optical Metrology', 'ATE', 'APAC Manufacturing'],
    github: null,
    live: null,
    stars: null,
    status: 'Professional',
    highlight: false,
  },
  {
    name: 'Humanoid Test Framework',
    description: 'Modular hardware-in-the-loop test framework for actuator validation in humanoid robot manufacturing. Covers mechanical bring-up, electrical functional test, and force/torque calibration (1x Robotics, professional project).',
    tags: ['Python', 'ROS2', 'Hardware Testing', 'Robotics', 'NPI'],
    github: null,
    live: null,
    stars: null,
    status: 'Professional',
    highlight: false,
  },
];

const Projects = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
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
    <section id="projects" ref={ref} className="py-24 bg-card/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs text-primary tracking-widest mb-4">// PROJECTS</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built <span className="text-gradient">Things</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open-source projects and professional engineering systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              className={`group relative bg-card border rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                project.highlight ? 'border-primary/40 hover:border-primary glow-cyan' : 'border-border hover:border-primary/40'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => playHover()}
            >
              {project.highlight && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[hsl(188,94%,42%)] to-[hsl(213,94%,68%)]" />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-white text-base leading-tight group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-2 ml-3 shrink-0">
                    <span className={`px-2 py-0.5 text-xs font-mono rounded-full ${
                      project.status === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      project.status === 'Active' ? 'bg-primary/20 text-primary border border-primary/30' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs font-mono bg-muted text-muted-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      onClick={() => playClick()}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                      <Github size={13} />
                      {project.stars !== null && (
                        <><Star size={11} />{project.stars}</>
                      )}
                      View Source
                    </a>
                  )}
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      onClick={() => playClick()}
                      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono">
                      <ExternalLink size={13} /> Live Site
                    </a>
                  )}
                  {!project.github && !project.live && (
                    <span className="text-xs text-muted-foreground/50 font-mono italic">Professional / Private</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`text-center mt-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}
          style={{ transitionDelay: '500ms' }}>
          <a href="https://github.com/flying-pisces" target="_blank" rel="noopener noreferrer"
            onClick={() => playClick()} onMouseEnter={() => playHover()}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors font-mono border border-border hover:border-primary rounded px-4 py-2">
            <Github size={14} /> More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
