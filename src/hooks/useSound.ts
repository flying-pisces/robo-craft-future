import { useCallback, useRef } from 'react';

type AudioContextType = typeof AudioContext;

let _AudioContext: AudioContextType | null = null;
const getAudioContext = (): AudioContextType => {
  if (!_AudioContext) {
    _AudioContext = window.AudioContext || (window as unknown as { webkitAudioContext: AudioContextType }).webkitAudioContext;
  }
  return _AudioContext;
};

export const useSound = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const enabledRef = useRef<boolean>(true);

  const ctx = useCallback((): AudioContext | null => {
    if (!enabledRef.current) return null;
    try {
      if (!ctxRef.current) {
        const AC = getAudioContext();
        ctxRef.current = new AC();
      }
      if (ctxRef.current.state === 'suspended') {
        ctxRef.current.resume();
      }
      return ctxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playClick = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(900, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ac.currentTime + 0.06);
      gain.gain.setValueAtTime(0.06, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.06);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.06);
    } catch { /* silent */ }
  }, [ctx]);

  const playHover = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, ac.currentTime);
      gain.gain.setValueAtTime(0.015, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.025);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.025);
    } catch { /* silent */ }
  }, [ctx]);

  const playType = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    try {
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.connect(gain);
      gain.connect(ac.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(550 + Math.random() * 300, ac.currentTime);
      gain.gain.setValueAtTime(0.025, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.018);
      osc.start(ac.currentTime);
      osc.stop(ac.currentTime + 0.018);
    } catch { /* silent */ }
  }, [ctx]);

  const playBoot = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    try {
      // Low sweep + chord
      const freqs = [80, 160, 240];
      freqs.forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.1);
        osc.frequency.exponentialRampToValueAtTime(freq * 3, ac.currentTime + 0.4 + i * 0.1);
        gain.gain.setValueAtTime(0.06, ac.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.5 + i * 0.1);
        osc.start(ac.currentTime + i * 0.1);
        osc.stop(ac.currentTime + 0.6 + i * 0.1);
      });
    } catch { /* silent */ }
  }, [ctx]);

  const playSuccess = useCallback(() => {
    const ac = ctx();
    if (!ac) return;
    try {
      const notes = [523, 659, 784]; // C, E, G
      notes.forEach((freq, i) => {
        const osc = ac.createOscillator();
        const gain = ac.createGain();
        osc.connect(gain);
        gain.connect(ac.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ac.currentTime + i * 0.1);
        gain.gain.setValueAtTime(0.08, ac.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.3 + i * 0.1);
        osc.start(ac.currentTime + i * 0.1);
        osc.stop(ac.currentTime + 0.35 + i * 0.1);
      });
    } catch { /* silent */ }
  }, [ctx]);

  const toggle = useCallback((): boolean => {
    enabledRef.current = !enabledRef.current;
    return enabledRef.current;
  }, []);

  const isEnabled = useCallback((): boolean => enabledRef.current, []);

  return { playClick, playHover, playType, playBoot, playSuccess, toggle, isEnabled };
};
