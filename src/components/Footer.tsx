import { Github, Linkedin, Mail } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

const Footer = () => {
  const { playClick, playHover } = useSound();

  return (
    <footer className="py-10 border-t border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <div className="font-mono text-sm font-bold text-primary mb-1">
              <span className="text-muted-foreground">&gt; </span>CHUCK_YIN
            </div>
            <p className="text-xs text-muted-foreground">
              Hardware Engineering Consultant · $125/hr · Bay Area, CA
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://github.com/flying-pisces" target="_blank" rel="noopener noreferrer"
              onClick={() => playClick()} onMouseEnter={() => playHover()}
              className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all">
              <Github size={14} />
            </a>
            <a href="https://linkedin.com/in/chuckyin" target="_blank" rel="noopener noreferrer"
              onClick={() => playClick()} onMouseEnter={() => playHover()}
              className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all">
              <Linkedin size={14} />
            </a>
            <a href="mailto:chuck@chuckyin.dev"
              onClick={() => playClick()} onMouseEnter={() => playHover()}
              className="w-8 h-8 flex items-center justify-center rounded border border-border text-muted-foreground hover:border-primary hover:text-primary transition-all">
              <Mail size={14} />
            </a>
          </div>

          <p className="text-xs text-muted-foreground font-mono">
            © {new Date().getFullYear()} Chuck Yin. Built with React + Tailwind.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
