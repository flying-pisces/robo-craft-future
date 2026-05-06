import { useState } from 'react';
import profileImg from '@/assets/humanoid-back.jpg';
import highlightImg1 from '@/assets/humanoid-front.jpg';
import highlightImg2 from '@/assets/electronics-service.jpg';
import highlightImg3 from '@/assets/automation-service.jpg';
import projectImg1 from '@/assets/robotics-service.jpg';
import projectImg2 from '@/assets/hero-robotics.jpg';
import projectImg3 from '@/assets/tactoglove-hand.jpg';
import projectImg4 from '@/assets/robot-hand-cat.jpg';

type Tab = 'highlights' | 'projects' | 'talks' | 'misc';
type Filter = 'all' | 'hardware' | 'software' | 'robotics';

const HIGHLIGHTS = [
  {
    img: highlightImg1,
    year: '2025',
    q: 'Can modular tactile skin give humanoid robots full-body touch sensation at production scale?',
    detail: 'Building TactoSkin hex modules for full-body coverage — 72K+ sensels, 5-second swap, under $3K per robot.',
    link: 'https://www.sshrobotics.com',
  },
  {
    img: highlightImg2,
    year: '2012–2014',
    q: 'How do you optically calibrate 100 million iPhones across 12 factories simultaneously?',
    detail: 'Designed and deployed the Lumitop automated optical calibration system across Foxconn and Pegatron APAC sites.',
    link: null,
  },
  {
    img: highlightImg3,
    year: '2021–2025',
    q: 'What does it take to scale AR/VR hardware from prototype to global manufacturing?',
    detail: 'Led TechOps manufacturing for Meta Reality Labs — Quest, Ray-Ban smartglasses, and next-gen AR prototypes.',
    link: null,
  },
];

const PROJECTS = [
  {
    img: projectImg1,
    filter: 'robotics',
    title: 'TactoSkin — Modular Tactile Skin for Humanoid Robots',
    meta: 'SSH Robotics · 2025',
    desc: 'Full-stack product website and go-to-market for TactoSkin, a hex-module tactile sensing system for humanoid robots. Three product lines (Hand, Body, Foot) with unified I2C interface and magnetic connectors. Deployed on GitHub Pages with Supabase backend for lead capture.',
    links: [
      { label: 'Webpage', href: 'https://www.sshrobotics.com' },
      { label: 'Code', href: 'https://github.com/flying-pisces/robo-craft-future' },
    ],
    tags: ['React', 'TypeScript', 'Supabase'],
  },
  {
    img: projectImg2,
    filter: 'software',
    title: 'OTW — AI-Powered Job Hunt Automation',
    meta: 'Open Source · 2026',
    desc: 'Python pipeline that runs on GitHub Actions daily. Searches Greenhouse and Lever APIs for hardware/robotics roles, scores them with weighted keyword matching, auto-generates tailored DOCX/PDF resumes per company, and delivers mobile push notifications via ntfy.',
    links: [
      { label: 'Code', href: 'https://github.com/flying-pisces/otw' },
    ],
    tags: ['Python', 'GitHub Actions', 'python-docx'],
  },
  {
    img: projectImg3,
    filter: 'hardware',
    title: 'Lumitop — Automated Optical Calibration for iPhone Display',
    meta: 'Apple · 2012–2014',
    desc: 'Designed and deployed production optical calibration system for iPhone and Mac Retina displays. Deployed across 12 APAC manufacturing sites. Automated colorimetry, white-point calibration, and uniformity correction, reducing per-unit calibration takt time by 30%.',
    links: [],
    tags: ['Optical Metrology', 'Automation', 'APAC Manufacturing'],
    note: 'Professional project',
  },
  {
    img: projectImg4,
    filter: 'robotics',
    title: 'Humanoid Manufacturing Test Framework',
    meta: '1x Robotics · 2025–2026',
    desc: 'Modular hardware-in-the-loop test framework for actuator module validation in humanoid robot manufacturing. Covers mechanical bring-up, electrical functional test, force/torque calibration, and end-of-line pass/fail criteria for the full actuator stack.',
    links: [],
    tags: ['Python', 'ROS2', 'Hardware Testing'],
    note: 'Professional project',
  },
];

const TALKS = [
  {
    year: '2026',
    items: [
      { date: 'Mar', title: 'NVIDIA GTC 2026 — Robotics & Manufacturing Automation panel', venue: 'San Jose, CA', link: null },
      { date: 'Mar', title: 'MassRobotics Challenge — Demo Day finalist presentation', venue: 'Boston, MA', link: null },
    ],
  },
  {
    year: '2025',
    items: [
      { date: 'Nov', title: 'Hello Tomorrow Global Summit — Hardware Innovation track', venue: 'Paris, France', link: null },
      { date: 'Sep', title: 'Infineon Humanoid Hackathon — Finalist pitch presentation', venue: 'Remote', link: null },
      { date: 'Apr', title: '1x Robotics All-Hands — Automation & Test Engineering deep-dive', venue: 'Menlo Park, CA', link: null },
    ],
  },
  {
    year: '2024',
    items: [
      { date: 'Jun', title: 'Meta Reality Labs Manufacturing Summit — Scaling AR/VR HW', venue: 'Redmond, WA', link: null },
      { date: 'Feb', title: 'Startup World Cup — Engineering Services pitch', venue: 'San Francisco, CA', link: null },
    ],
  },
  {
    year: '2021',
    items: [
      { date: 'Mar', title: 'AAAS Annual Meeting — Human-Robot Interactive Demonstration', venue: 'Virtual', link: null },
    ],
  },
];

const MISC = [
  { year: '', text: 'Available for engineering consulting at $125/hr. Remote or Bay Area.', isHighlight: true },
  { year: '2026', text: 'Launched TactoSkin modular tactile sensing for humanoid robots — SSH Robotics.' },
  { year: '2025', text: 'Director of Automation at 1x Humanoid Robotics, Menlo Park.' },
  { year: '2025', text: 'MassRobotics Challenge finalist.' },
  { year: '2025', text: 'NVIDIA GTC Robotics track participant.' },
  { year: '2024', text: 'Infineon Humanoid Hackathon finalist.' },
  { year: '2021', text: 'Led human-robot interactive demo at AAAS 2021.' },
  { year: '2021', text: 'Joined Meta Reality Labs as TechOps Manufacturing Lead (IC7/M2).' },
  { year: '2016', text: 'Product Integration Architect at Oculus — shipped Quest, Go, Rift S.' },
  { year: '2014', text: 'Founding Hardware Engineer at Square (now Block) — built Square Terminal and Square Stand manufacturing lines from scratch.' },
  { year: '2010', text: 'Display Test Engineering Lead at Apple — shipped iPhone 4/4S/5 Retina displays.' },
  { year: '2006', text: 'PhD, Chemical Physics, Kent State University. Thesis on liquid crystal electro-optic devices.' },
  { year: '', text: 'Reviewer: hardware and robotics venues. Open to speaking on manufacturing test, NPI, and humanoid robotics.', isReviewer: true },
];

const Index = () => {
  const [tab, setTab] = useState<Tab>('highlights');
  const [filter, setFilter] = useState<Filter>('all');
  const [showMoreHighlights, setShowMoreHighlights] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);

  const filteredProjects = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.filter === filter);

  return (
    <div id="main">
      {/* Header / Bio */}
      <div id="intro">
        <div id="intro-text">
          <h1>Chuck Yin</h1>
          <p>
            Hi 👋 I'm a hardware engineering leader with 20+ years shipping physical products at{' '}
            <a href="https://apple.com" target="_blank" rel="noopener noreferrer">Apple</a>,{' '}
            <a href="https://squareup.com" target="_blank" rel="noopener noreferrer">Square</a>,{' '}
            <a href="https://oculus.com" target="_blank" rel="noopener noreferrer">Oculus</a>,{' '}
            <a href="https://meta.com" target="_blank" rel="noopener noreferrer">Meta</a>, and{' '}
            <a href="https://1x.tech" target="_blank" rel="noopener noreferrer">1x Humanoid Robotics</a>.
            I built the display test infrastructure that calibrated millions of iPhones, led Meta's AR/VR manufacturing
            operations, and most recently directed automation engineering at 1x — one of the world's most advanced
            humanoid robotics companies. My path started with a PhD in Chemical Physics before I pivoted into
            Silicon Valley hardware. I'm available for{' '}
            <strong>engineering consulting at $125/hr</strong>.
          </p>

          {showFullBio && (
            <div id="more-bio">
              <p style={{ marginTop: '0.75em' }}>
                Chuck (Ye) Yin is a hardware engineering executive with deep expertise in manufacturing test automation,
                new product introduction (NPI), optics and display systems, and robotics integration. He earned his
                Ph.D. in Chemical Physics from Kent State University, where he researched liquid crystal electro-optic
                devices and published 8 peer-reviewed papers. At Apple, he designed and deployed the Lumitop optical
                calibration system across 12 APAC manufacturing sites — a system that became the standard for Retina
                display production. At Square, he was among the founding hardware engineers, building manufacturing test
                infrastructure for Square Terminal and Square Stand from the ground up. At Oculus and Meta, he led
                product integration and TechOps manufacturing for Quest, Ray-Ban smart glasses, and prototype AR/VR
                hardware at global scale. Most recently at 1x Humanoid Robotics, he directed automation and test
                engineering for full-body humanoid robot actuator systems. He is based in the San Francisco Bay Area.
              </p>
            </div>
          )}

          <div id="links">
            <button
              className="toggle-link"
              onClick={() => setShowFullBio(v => !v)}
              style={{ marginRight: '1em' }}
            >
              {showFullBio ? 'Hide Bio ▴' : 'Full Bio ▾'}
            </button>
            <a href="https://scholar.google.com/citations?user=chuckyin" target="_blank" rel="noopener noreferrer">G. Scholar</a>
            {' · '}
            <a href="https://github.com/flying-pisces" target="_blank" rel="noopener noreferrer">Github</a>
            {' · '}
            <a href="https://linkedin.com/in/yeyin" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            {' · '}
            <a href="mailto:chuck@chuckyin.dev">Email</a>
          </div>
        </div>

        <div id="intro-image">
          {/* Replace with: <img src="/chuck-yin.jpg" alt="Chuck Yin" /> */}
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.5em', fontWeight: 700, color: '#a0a8b0', letterSpacing: '0.05em',
            userSelect: 'none',
          }}>
            CY
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div id="menu">
        {(['highlights', 'projects', 'talks', 'misc'] as Tab[]).map(t => (
          <button
            key={t}
            className={`menu-item${tab === t ? ' active' : ''}`}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* ── HIGHLIGHTS ── */}
      {tab === 'highlights' && (
        <div className="section">
          <div className="previews">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="preview-item" onClick={() => h.link && window.open(h.link, '_blank')}>
                <img src={h.img} alt={h.q} />
                <div className="preview-caption">{h.q}</div>
                <div className="preview-year">{h.year}</div>
              </div>
            ))}
          </div>

          {showMoreHighlights && (
            <div style={{ marginTop: '1.5em' }}>
              {HIGHLIGHTS.map((h, i) => (
                <div key={i} className="list-item cf" style={{ marginTop: '1.5em' }}>
                  <div className="thumbnail">
                    <img src={h.img} alt={h.q} />
                  </div>
                  <div className="project-description">
                    <h3>{h.q}</h3>
                    <p className="project-meta">{h.year}</p>
                    <p className="project-desc-text">{h.detail}</p>
                    {h.link && (
                      <div className="project-links">
                        <a href={h.link} target="_blank" rel="noopener noreferrer">[Webpage]</a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <button className="show-more-btn" onClick={() => setShowMoreHighlights(v => !v)}>
              {showMoreHighlights ? 'Show less ▴' : 'Show more ▾'}
            </button>
          </div>
        </div>
      )}

      {/* ── PROJECTS ── */}
      {tab === 'projects' && (
        <div className="section">
          <div className="filter-bar">
            {(['all', 'hardware', 'software', 'robotics'] as Filter[]).map(f => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid">
            {filteredProjects.map((p, i) => (
              <div key={i} className="list-item cf">
                <div className="thumbnail">
                  <img src={p.img} alt={p.title} />
                </div>
                <div className="project-description">
                  <h3>
                    {p.links.length > 0
                      ? <a href={p.links[0].href} target="_blank" rel="noopener noreferrer">{p.title}</a>
                      : p.title}
                  </h3>
                  <p className="project-meta">
                    {p.meta}
                    {p.note && <em style={{ marginLeft: '0.5em' }}>· {p.note}</em>}
                  </p>
                  <p className="project-meta" style={{ fontStyle: 'italic' }}>
                    {p.tags.join(' · ')}
                  </p>
                  <p className="project-desc-text">{p.desc}</p>
                  {p.links.length > 0 && (
                    <div className="project-links">
                      {p.links.map((l, j) => (
                        <span key={j}>
                          <a href={l.href} target="_blank" rel="noopener noreferrer">[{l.label}]</a>
                          {j < p.links.length - 1 && ' · '}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TALKS ── */}
      {tab === 'talks' && (
        <div className="section">
          {TALKS.map(group => (
            <div key={group.year}>
              <div className="talks-year">{group.year}</div>
              {group.items.map((item, i) => (
                <div key={i} className="talk-item">
                  <span className="talk-date">{item.date}</span>
                  <span className="talk-title">
                    {item.link
                      ? <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                      : item.title}
                    {' '}
                    <span className="talk-venue">— {item.venue}</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── MISC ── */}
      {tab === 'misc' && (
        <div className="section">
          {MISC.map((item, i) => {
            if ((item as {isHighlight?: boolean}).isHighlight) {
              return (
                <div key={i} className="misc-highlight">
                  💼 {item.text}{' '}
                  <a href="mailto:chuck@chuckyin.dev">chuck@chuckyin.dev</a>
                </div>
              );
            }
            if ((item as {isReviewer?: boolean}).isReviewer) {
              return (
                <div key={i} className="misc-item" style={{ marginTop: '1em', color: '#a0a8b0', fontSize: '0.9em', fontStyle: 'italic' }}>
                  {item.text}
                </div>
              );
            }
            return (
              <div key={i} className="misc-item">
                <span className="misc-year">{item.year}</span>
                <span className="misc-text">{item.text}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div id="footer">
        <p>
          Chuck Yin · Engineering Consultant · $125/hr ·{' '}
          <a href="mailto:chuck@chuckyin.dev">chuck@chuckyin.dev</a>
        </p>
        <p style={{ marginTop: '0.3em' }}>
          Inspired by <a href="https://kayke.xyz" target="_blank" rel="noopener noreferrer">Kay Ke</a>,{' '}
          <a href="https://andyzeng.github.io" target="_blank" rel="noopener noreferrer">Andy Zeng</a>.
        </p>
      </div>
    </div>
  );
};

export default Index;
