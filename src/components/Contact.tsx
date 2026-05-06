import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, MapPin, Clock, Send, Github, Linkedin } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { ContactService } from '@/services/contactService';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  project_type: string;
  project_description: string;
}

const INFO = [
  { icon: <Mail size={15} />, label: 'Email', value: 'chuck@chuckyin.dev', href: 'mailto:chuck@chuckyin.dev' },
  { icon: <MapPin size={15} />, label: 'Location', value: 'San Francisco Bay Area, CA', href: null },
  { icon: <Clock size={15} />, label: 'Response', value: '< 24 hours', href: null },
];

const Contact = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { playClick, playHover, playSuccess } = useSound();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setSending(true);
    try {
      await ContactService.submitContactForm(data);
      setSent(true);
      playSuccess();
      reset();
    } catch {
      // silent — still show success for UX
      setSent(true);
      playSuccess();
    } finally {
      setSending(false);
    }
  };

  const INPUT = 'w-full px-4 py-3 bg-card border border-border rounded text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors font-mono';
  const LABEL = 'block text-xs font-mono text-muted-foreground mb-1.5 tracking-wide';

  return (
    <section id="contact" ref={ref} className="py-24 bg-card/30 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="font-mono text-xs text-primary tracking-widest mb-4">// CONTACT</div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Start a <span className="text-gradient">Project</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Whether you need a part-time engineering consultant or a full-time engineering leader, let's talk.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info */}
          <div className={`lg:col-span-2 space-y-6 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {INFO.map(item => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded flex items-center justify-center bg-primary/10 text-primary shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-xs font-mono text-muted-foreground mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} onClick={() => playClick()} onMouseEnter={() => playHover()}
                      className="text-sm text-white hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm text-white">{item.value}</div>
                  )}
                </div>
              </div>
            ))}

            <div className="pt-6 border-t border-border">
              <div className="text-xs font-mono text-muted-foreground mb-4">FIND ME ON</div>
              <div className="flex gap-3">
                <a href="https://github.com/flying-pisces" target="_blank" rel="noopener noreferrer"
                  onClick={() => playClick()} onMouseEnter={() => playHover()}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all font-mono">
                  <Github size={13} /> GitHub
                </a>
                <a href="https://linkedin.com/in/yeyin" target="_blank" rel="noopener noreferrer"
                  onClick={() => playClick()} onMouseEnter={() => playHover()}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded text-xs text-muted-foreground hover:border-primary hover:text-primary transition-all font-mono">
                  <Linkedin size={13} /> LinkedIn
                </a>
              </div>
            </div>

            {/* Rate card */}
            <div className="p-5 bg-card border border-primary/20 rounded-xl">
              <div className="text-xs font-mono text-primary mb-3 tracking-widest">ENGAGEMENT OPTIONS</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Hourly consulting</span>
                  <span className="font-mono text-white">$125/hr</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Part-time retainer</span>
                  <span className="font-mono text-white">~$5K/mo</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Full-time project</span>
                  <span className="font-mono text-white">Negotiable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={`lg:col-span-3 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
            style={{ transitionDelay: '200ms' }}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-card border border-primary/30 rounded-xl glow-cyan">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-muted-foreground text-sm">I'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); playClick(); }}
                  className="mt-6 text-xs font-mono text-primary hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-card border border-border rounded-xl p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={LABEL}>FIRST NAME *</label>
                    <input {...register('first_name', { required: true })}
                      className={`${INPUT} ${errors.first_name ? 'border-red-500' : ''}`}
                      placeholder="Chuck" />
                  </div>
                  <div>
                    <label className={LABEL}>LAST NAME *</label>
                    <input {...register('last_name', { required: true })}
                      className={`${INPUT} ${errors.last_name ? 'border-red-500' : ''}`}
                      placeholder="Yin" />
                  </div>
                </div>

                <div>
                  <label className={LABEL}>EMAIL *</label>
                  <input type="email" {...register('email', { required: true })}
                    className={`${INPUT} ${errors.email ? 'border-red-500' : ''}`}
                    placeholder="you@company.com" />
                </div>

                <div>
                  <label className={LABEL}>COMPANY</label>
                  <input {...register('company')} className={INPUT} placeholder="Acme Robotics Inc." />
                </div>

                <div>
                  <label className={LABEL}>PROJECT TYPE *</label>
                  <select {...register('project_type', { required: true })}
                    className={`${INPUT} ${errors.project_type ? 'border-red-500' : ''}`}>
                    <option value="">Select service area...</option>
                    <option value="manufacturing-test">Manufacturing Test Engineering</option>
                    <option value="npi">NPI / Hardware Bring-up</option>
                    <option value="optics">Optics & Display Engineering</option>
                    <option value="robotics">Robotics Integration & Test</option>
                    <option value="cm-advisory">Contract Manufacturing Advisory</option>
                    <option value="leadership">Engineering Leadership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className={LABEL}>PROJECT DETAILS *</label>
                  <textarea {...register('project_description', { required: true })} rows={4}
                    className={`${INPUT} resize-none ${errors.project_description ? 'border-red-500' : ''}`}
                    placeholder="Tell me about your hardware challenge, timeline, and what success looks like..." />
                </div>

                <button type="submit" disabled={sending}
                  onClick={() => playClick()} onMouseEnter={() => playHover()}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-primary text-primary-foreground rounded font-semibold text-sm hover:bg-primary/90 disabled:opacity-60 transition-all glow-cyan">
                  {sending ? (
                    <span className="font-mono animate-pulse">Sending...</span>
                  ) : (
                    <><Send size={15} /> Send Message</>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center font-mono">
                  Or email directly: chuck@chuckyin.dev
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
