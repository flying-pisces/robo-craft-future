import { useState, useEffect, useCallback } from 'react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Career', href: '#career' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const { playClick, playHover, playBoot, toggle } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = useCallback((href: string) => {
    playClick();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, [playClick]);

  const handleSoundToggle = useCallback(() => {
    const nowOn = toggle();
    setSoundOn(nowOn);
    if (nowOn) playBoot();
  }, [toggle, playBoot]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('#hero')}
            onMouseEnter={() => soundOn && playHover()}
            className="font-mono text-sm font-bold text-primary tracking-widest hover:text-primary/80 transition-colors"
          >
            <span className="text-muted-foreground">&gt; </span>
            CHUCK_YIN
            <span className="animate-blink text-primary ml-0.5">_</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                onMouseEnter={() => soundOn && playHover()}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium tracking-wide"
              >
                {link.label}
              </button>
            ))}
            <a
              href="mailto:chuck@chuckyin.dev"
              onClick={() => playClick()}
              onMouseEnter={() => soundOn && playHover()}
              className="ml-2 px-4 py-1.5 rounded border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 glow-cyan"
            >
              Hire Me
            </a>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleSoundToggle}
              className="p-2 rounded text-muted-foreground hover:text-primary transition-colors"
              title={soundOn ? 'Mute sounds' : 'Enable sounds'}
            >
              {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button
              onClick={() => { playClick(); setMenuOpen(o => !o); }}
              className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors font-mono"
              >
                <span className="text-primary mr-2">&gt;</span>{link.label}
              </button>
            ))}
            <a
              href="mailto:chuck@chuckyin.dev"
              className="block mt-3 px-3 py-2 text-center rounded border border-primary text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Hire Me — $125/hr
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
