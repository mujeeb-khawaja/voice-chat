import { useState, useEffect, useRef } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { getGeminiResponse } from '../utils/aiSpeechResponse';
import { speakText, stopSpeaking } from '../utils/speaker';
import { getFeaturedProducts, formatPrice } from '../lib/products';
import AiConcierge1 from '../pages/AiConcierge1';
import ExecutiveBlack from '../pages/ExecutiveBlack';
import RoseGold from '../pages/RoseGold';
import CarbonRacer from '../pages/CarbonRacer';
import MensHub from '../pages/MensHub';
import MensClassic from '../pages/MensClassic';
import MensSports from '../pages/MensSports';
import NoirChic from '../pages/NoirChic';
import WomensHub from '../pages/WomensHub';
import WomensElegant from '../pages/WomensElegant';
import WomensFashion from '../pages/WomensFashion';

const suggestedProducts = getFeaturedProducts(2);

export default function VoiceChatbot() {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route === 'home' ? '/' : `/${route}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const [isActive, setIsActive] = useState(false);
  const [visualState, setVisualState] = useState('idle');

  const [apiError, setApiError] = useState(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [ttsNotification, setTtsNotification] = useState(null); // { msg, type }
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const ttsNotifyTimerRef = useRef(null);

  const recognitionRef = useRef(null);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const isLoopActiveRef = useRef(false);
  const finalTextRef = useRef('');

  const visualStateRef = useRef('idle');
  const speakingStartRef = useRef(0);
  const loudFramesRef = useRef(0);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keep ref in sync
  useEffect(() => {
    visualStateRef.current = visualState;
    if (visualState === 'speaking') speakingStartRef.current = Date.now();
  }, [visualState]);

  useEffect(() => {
    initRecognition();
    return () => {
      deactivate();
      clearTimeout(ttsNotifyTimerRef.current);
    };
  }, []);

  // ── Speech Recognition ──────────────────────────────────
  const initRecognition = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setApiError('Speech recognition not supported.'); return null; }
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onstart = () => setVisualState('listening');

    rec.onresult = (e) => {
      let interim = '', final = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) final += e.results[i][0].transcript;
        else interim += e.results[i][0].transcript;
      }
      const text = final || interim;
      if (final) finalTextRef.current = final;
    };

    rec.onerror = (e) => {
      if (e.error === 'not-allowed') { setApiError('Microphone permission denied.'); deactivate(); }
    };

    rec.onend = () => {
      if (isLoopActiveRef.current) {
        if (finalTextRef.current) {
          const t = finalTextRef.current; finalTextRef.current = '';
          triggerAI(t);
        } else {
          try { rec.start(); } catch (_) {}
        }
      } else {
        if (visualStateRef.current === 'listening') setVisualState('idle');
      }
    };

    recognitionRef.current = rec;
    return rec;
  };

  // ── Mic Analyser for barge-in ───────────────────────────
  const startMic = async () => {
    if (streamRef.current) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AC = window.AudioContext || window.webkitAudioContext;
      const ctx = new AC();
      audioContextRef.current = ctx;
      const src = ctx.createMediaStreamSource(stream);
      const an = ctx.createAnalyser();
      an.fftSize = 256; an.smoothingTimeConstant = 0.45;
      analyserRef.current = an;
      src.connect(an);
      const buf = new Uint8Array(an.frequencyBinCount);
      const tick = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(buf);
        const avg = buf.reduce((s, v) => s + v, 0) / buf.length;
        const vol = Math.min(1, avg / 110);
        if (visualStateRef.current === 'speaking' && Date.now() - speakingStartRef.current > 700 && vol > 0.32) {
          loudFramesRef.current++;
          if (loudFramesRef.current > 5) { loudFramesRef.current = 0; bargeIn(); }
        } else {
          loudFramesRef.current = Math.max(0, loudFramesRef.current - 1);
        }
        animFrameRef.current = requestAnimationFrame(tick);
      };
      animFrameRef.current = requestAnimationFrame(tick);
    } catch (_) {}
  };

  const stopMic = () => {
    cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = null;
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (audioContextRef.current?.state !== 'closed') audioContextRef.current?.close();
    audioContextRef.current = null;
    analyserRef.current = null;
    loudFramesRef.current = 0;
  };

  const bargeIn = () => {
    stopSpeaking();

    loudFramesRef.current = 0;
    isLoopActiveRef.current = true;
    setVisualState('listening');
    try { recognitionRef.current?.abort(); } catch (_) {}
    setTimeout(() => { if (isLoopActiveRef.current) try { recognitionRef.current?.start(); } catch (_) {} }, 150);
  };

  // ── Core voice loop ─────────────────────────────────────
  const startListening = () => {
    isLoopActiveRef.current = true;
    setVisualState('listening');
    try { recognitionRef.current?.start(); } catch (_) {}
  };

  const triggerAI = (text) => {
    isLoopActiveRef.current = false;
    setVisualState('thinking');
    try { recognitionRef.current?.abort(); } catch (_) {}

    getGeminiResponse(text).then(res => {
      if (res.themeChange) { /* theme changes ignored in template UI */ }
      if (res.routeChange) {
        navigateTo(res.routeChange);
      }
      speakText(res.text, {
        onStart: () => setVisualState('speaking'),
        onEnd: () => { if (visualStateRef.current !== 'listening') res.isGoodbye ? deactivate() : startListening(); },
        onError: (e) => { setApiError(e); startListening(); },
        onFallback: showTtsNotification,
      });
    }).catch(e => {
      const msg = e.message || '';
      const isQuota = msg.includes('429') || /quota|rate.?limit|resource_exhausted/i.test(msg);
      if (isQuota) {
        showTtsNotification('ai-quota');
        setVisualState('speaking');
        speakText("I'm currently experiencing high demand. Please try again in a moment.", {
          onStart: () => setVisualState('speaking'),
          onEnd: () => startListening(),
          onError: () => startListening(),
          onFallback: showTtsNotification,
        });
      } else {
        setApiError(msg);
        startListening();
      }
    });
  };

  const activate = () => {
    if (!recognitionRef.current) { if (!initRecognition()) return; }
    setIsDrawerOpen(true);
    setIsActive(true);
    setApiError(null);
    isLoopActiveRef.current = false;
    startMic();
    const greeting = 'Welcome to Timeless. I am Aura, your AI concierge. How can I help you today?';
    setVisualState('speaking');
    speakText(greeting, {
      onStart: () => setVisualState('speaking'),
      onEnd: () => { if (visualStateRef.current !== 'listening') startListening(); },
      onError: () => startListening(),
      onFallback: showTtsNotification,
    });
  };

  const deactivate = () => {
    setIsActive(false);
    isLoopActiveRef.current = false;
    stopSpeaking();
    stopMic();
    try { recognitionRef.current?.abort(); } catch (_) {}
    setVisualState('idle');
  };

  const showTtsNotification = (reason) => {
    clearTimeout(ttsNotifyTimerRef.current);
    const messages = {
      'quota':    'Gemini TTS quota reached. Switching to ElevenLabs.',
      'error':    'Gemini TTS unavailable. Switching to ElevenLabs.',
      'ai-quota': 'Gemini AI rate limited. Switching to ElevenLabs.',
    };
    setTtsNotification({ msg: messages[reason] ?? 'Switching to ElevenLabs.', type: reason });
    ttsNotifyTimerRef.current = setTimeout(() => setTtsNotification(null), 3000);
  };

  const handleOrbClick = () => {
    if (isActive) {
      if (visualState === 'speaking' || visualState === 'thinking') bargeIn();
      else deactivate();
    } else {
      activate();
    }
  };

  const openConcierge = () => { setIsDrawerOpen(true); if (!isActive) activate(); };

  const stateLabel = () => {
    if (!isActive) return 'Click orb to start';
    if (visualState === 'listening') return 'Listening...';
    if (visualState === 'thinking') return 'Thinking...';
    if (visualState === 'speaking') return 'Speaking...';
    return 'Online';
  };

  // ── Shared page props ───────────────────────────────────
  const pageProps = { setView: navigateTo, openConcierge };

  // Orb core CSS class based on state
  const orbClass = `orb-core w-16 h-16 rounded-full z-10 cursor-pointer${isActive ? ` ${visualState}` : ''}`;

  return (
    <div className="font-body-main antialiased">

      {/* ── Top Navbar (exact template HTML) ── */}
      <nav
        id="main-nav"
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl rounded-full flex justify-between items-center px-8 py-4 z-50 border border-transparent transition-all duration-400 ${navScrolled ? 'scrolled' : 'nav-top'}`}
      >
        <button
          onClick={() => navigateTo('home')}
          className="font-display-hero text-2xl tracking-tighter text-on-surface cursor-pointer"
        >
          Timeless
        </button>

        <div className="hidden md:flex gap-8">
          {[['mens-hub','Men'],['womens-hub','Women'],['mens-sports','Sports'],['womens-fashion','Fashion']].map(([route, label]) => (
            <button
              key={route}
              onClick={() => navigateTo(route)}
              className="text-on-surface-variant hover:text-primary transition-colors font-body-main text-sm uppercase tracking-widest bg-transparent border-0 cursor-pointer"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={openConcierge}
            className="hidden md:block font-label-mono text-label-mono uppercase tracking-widest text-primary hover:text-white/70 transition-colors bg-transparent border-0 cursor-pointer"
          >
            Voice Assistant
          </button>
          <div className="flex gap-4">
            <span className="material-symbols-outlined text-on-surface hover:text-primary cursor-pointer transition-colors">shopping_bag</span>
            <span className="material-symbols-outlined text-on-surface hover:text-primary cursor-pointer transition-colors">person</span>
          </div>
        </div>
      </nav>

      {/* ── Main Content ── */}
      <main>
        <Routes>
          <Route path="/"                element={<AiConcierge1  {...pageProps} />} />
          <Route path="/executive-black" element={<ExecutiveBlack {...pageProps} />} />
          <Route path="/rose-gold"       element={<RoseGold       {...pageProps} />} />
          <Route path="/carbon-racer"    element={<CarbonRacer    {...pageProps} />} />
          <Route path="/mens-hub"        element={<MensHub        {...pageProps} />} />
          <Route path="/mens-classic"    element={<MensClassic    {...pageProps} />} />
          <Route path="/mens-sports"     element={<MensSports     {...pageProps} />} />
          <Route path="/noir-chic"       element={<NoirChic       {...pageProps} />} />
          <Route path="/womens-hub"      element={<WomensHub      {...pageProps} />} />
          <Route path="/womens-elegant"  element={<WomensElegant  {...pageProps} />} />
          <Route path="/womens-fashion"  element={<WomensFashion  {...pageProps} />} />
          <Route path="*"               element={<AiConcierge1   {...pageProps} />} />
        </Routes>
      </main>

      {/* ── Floating AI tab — visible when drawer is closed ── */}
      {!isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="hidden md:flex fixed right-0 top-20 z-50 flex-col items-center gap-2 px-2 py-4 bg-surface-container-lowest/80 backdrop-blur-xl border border-r-0 border-white/10 rounded-l-xl shadow-xl cursor-pointer group hover:bg-white/5 transition-colors"
        >
          <div className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-white animate-[pulse_2s_cubic-bezier(0.4,0,0.2,1)_infinite]' : 'bg-white/30'}`} />
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:text-primary transition-colors">graphic_eq</span>
          <span className="font-label-mono text-[8px] uppercase tracking-[0.15em] text-on-surface-variant group-hover:text-primary transition-colors [writing-mode:vertical-rl] rotate-180">Aura</span>
        </button>
      )}

      {/* ── Sidebar — starts below navbar, slides in/out ── */}
      <aside
        className={`hidden md:flex flex-col fixed rounded-t-xl right-0 w-80 border-l border-white/10 bg-surface-container-lowest/80 backdrop-blur-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.5)] p-6 z-40 transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ top: '80px', height: 'calc(100vh - 80px)' }}
      >

        {/* Panel Header — pinned */}
        <div className="flex justify-between items-center mb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-[pulse_2s_cubic-bezier(0.4,0,0.2,1)_infinite]' : 'bg-white/30'}`} />
            <span className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant">Timeless Concierge</span>
          </div>
          <button onClick={() => { deactivate(); setIsDrawerOpen(false); }} className="text-on-surface-variant hover:text-white transition-colors bg-transparent border-0 cursor-pointer">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Scrollable body — flex-1 with min-h-0 so overflow-y-auto actually works */}
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col">

          {/* Voice Orb Area */}
          <div className="flex flex-col items-center justify-center relative py-8">
            <div className="w-48 h-48 rounded-full border border-white/5 absolute" />
            <div className="w-32 h-32 rounded-full border border-white/10 absolute delay-100" />
            <div className="relative w-24 h-24 flex items-center justify-center" onClick={handleOrbClick}>
              <div className="orb-ring w-full h-full" style={{ animationDelay: '0s' }} />
              <div className="orb-ring w-full h-full" style={{ animationDelay: '1.3s' }} />
              <div className="orb-ring w-full h-full" style={{ animationDelay: '2.6s' }} />
              <div className={orbClass} />
            </div>
            <div className="mt-8 text-center px-4">
              <p className="font-body-main text-sm text-on-surface mb-2 animate-[pulse_3s_ease-in-out_infinite]">
                {stateLabel()}
              </p>
              <p className="font-label-mono text-[10px] text-on-surface-variant opacity-50">
                Speak naturally to explore collections
              </p>
            </div>
          </div>

          {/* TTS / AI Fallback Notification */}
          {ttsNotification && (
            <div className={`mx-2 mb-3 px-4 py-3 rounded-xl border ${ttsNotification.type === 'ai-quota' ? 'bg-orange-950/80 border-orange-700/30' : 'bg-amber-950/80 border-amber-700/30'}`}>
              <p className={`font-label-mono text-[10px] leading-relaxed ${ttsNotification.type === 'ai-quota' ? 'text-orange-300' : 'text-amber-300'}`}>{ttsNotification.msg}</p>
            </div>
          )}

          {/* Error */}
          {apiError && (
            <div className="mx-2 mb-4 px-4 py-3 rounded-xl bg-red-950/80 border border-red-900/30">
              <p className="font-label-mono text-[10px] text-red-300 leading-relaxed">{apiError}</p>
              <button onClick={() => setApiError(null)} className="font-label-mono text-[10px] text-red-400 underline mt-1 bg-transparent border-0 cursor-pointer">Dismiss</button>
            </div>
          )}

          {/* Suggested Cards */}
          <div className="mt-auto pt-4 space-y-4">
            <h4 className="font-label-mono text-[10px] uppercase tracking-widest text-on-surface-variant mb-4 pl-2 border-l border-white/20">
              Suggested for you
            </h4>
            {suggestedProducts.map((product) => (
              <button
                key={product.slug}
                type="button"
                onClick={() => navigateTo(product.viewSlug)}
                className="glass-card p-3 rounded-xl flex gap-4 items-center cursor-pointer group w-full text-left"
              >
                <div className="w-12 h-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
                  <img src={product.cardImage || product.image} alt={product.title} className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div>
                  <h5 className="font-body-main text-sm font-medium text-primary">{product.title}</h5>
                  <p className="font-label-mono text-[10px] text-on-surface-variant">{formatPrice(product.price, product.currency)}</p>
                </div>
              </button>
            ))}
          </div>

        </div>{/* end scrollable body */}

        {/* Bottom Tabs — pinned */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 shrink-0">
          <button onClick={handleOrbClick} title="Assistant" className={`p-2 rounded-lg transition-all border-0 cursor-pointer ${isActive ? 'text-primary bg-white/10' : 'text-on-surface-variant hover:text-primary hover:bg-white/5 bg-transparent'}`}>
            <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
          </button>
          <button onClick={() => navigateTo('home')} title="History" className="text-on-surface-variant hover:text-primary hover:bg-white/5 p-2 rounded-lg transition-all bg-transparent border-0 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">history</span>
          </button>
          <button onClick={() => navigateTo('womens-elegant')} title="Wishlist" className="text-on-surface-variant hover:text-primary hover:bg-white/5 p-2 rounded-lg transition-all bg-transparent border-0 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">favorite</span>
          </button>
          <button onClick={() => setApiError(null)} title="Settings" className="text-on-surface-variant hover:text-primary hover:bg-white/5 p-2 rounded-lg transition-all bg-transparent border-0 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">settings</span>
          </button>
        </div>
      </aside>

      {/* ── Footer (exact template HTML) ── */}
      <footer className="bg-background w-full py-20 px-margin-mobile md:px-margin-desktop border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <div className="font-display-hero text-xl text-on-surface mb-6">Timeless</div>
            <p className="font-body-main text-sm text-on-surface-variant">© 2026 Timeless Horology.<br />All rights reserved.</p>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-label-mono text-[10px] uppercase tracking-widest text-primary/50 mb-2">Legal</h6>
            <a href="#" className="font-body-main text-sm text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="font-body-main text-sm text-on-surface-variant hover:text-primary transition-colors">Terms</a>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-label-mono text-[10px] uppercase tracking-widest text-primary/50 mb-2">Discover</h6>
            <a href="#" className="font-body-main text-sm text-on-surface-variant hover:text-primary transition-colors">Heritage</a>
            <a href="#" className="font-body-main text-sm text-on-surface-variant hover:text-primary transition-colors">Contact</a>
          </div>
          <div className="flex flex-col gap-4">
            <h6 className="font-label-mono text-[10px] uppercase tracking-widest text-primary/50 mb-2">Connect</h6>
            <div className="flex gap-4">
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">share</span></a>
              <a href="#" className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">mail</span></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
