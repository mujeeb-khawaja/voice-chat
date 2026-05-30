import React, { useEffect, useRef } from 'react';
import { getProductBySlug } from '../lib/products';

export default function AiConcierge1({ setView, openConcierge }) {
  const execBlack   = getProductBySlug('executive-black');
  const roseGold    = getProductBySlug('rose-gold-essence');
  const carbonRacer = getProductBySlug('carbon-racer');

  const scrollRevealRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRefs = scrollRevealRefs.current;
    currentRefs.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      currentRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const addToReveal = (el) => {
    if (el && !scrollRevealRefs.current.includes(el)) {
      scrollRevealRefs.current.push(el);
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section
        className="relative h-screen w-full flex items-center justify-center overflow-hidden parallax-bg bg-cover bg-center"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlIMZuu8KjQ-3sKDRILahMSsCl3RQIHaVl-yLqwIDBcjViAbpSTlNakoir0l2Fw-6yFAGGZChkr0XArhN980MmID0Q2AsX0hawO_C9nvNMG2Q2MpH0w8swGfuXtk3F-qwqHDTy2EIoZY7ryCiU0TVEl-FozxRStFGX3-3HLfhzCM8UAA278OZSImzPXvuYmfEtOjGysRWQzUhIFADNbdvsgh2Gv24ZggFqzvzTbYPCsFQJCe10NfMUMs9d7fCb_P2BwN37uWd3x0sK')`
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/60 to-[#050505] z-0"></div>

        <div className="particle w-2 h-2 left-[20%] top-[30%] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="particle w-3 h-3 right-[25%] top-[40%] animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        <div className="particle w-1.5 h-1.5 left-[40%] bottom-[30%] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-display text-5xl md:text-8xl text-white glow-text mb-6 opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]">
            Time, Redefined.
          </h1>
          <p className="font-body text-lg md:text-xl text-on-surface-variant mb-12 max-w-2xl opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_0.3s_forwards]">
            Discover premium watches curated for every generation. Where traditional horological prestige meets futuristic digital craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_0.6s_forwards]">
            <button
              type="button"
              onClick={() => setView('mens-hub')}
              className="ghost-btn px-8 py-4 rounded-full font-mono text-xs uppercase text-white backdrop-blur-md"
            >
              Shop Collection
            </button>
            <button
              type="button"
              onClick={openConcierge}
              className="px-8 py-4 rounded-full font-mono text-xs uppercase text-black bg-white hover:bg-white/80 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
              Talk to AI Assistant
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_1s_forwards]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">Scroll</span>
          <div className="w-px h-12 bg-linear-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      <div className="h-40 w-full bg-[#050505]"></div>

      {/* Collections Showcase */}
      <section className="py-24 px-6 md:px-16 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={addToReveal} className="flex justify-between items-end mb-16 reveal-up">
            <h2 className="font-display text-3xl md:text-5xl text-white">Curated Selections</h2>
            <button
              type="button"
              onClick={() => setView('mens-hub')}
              className="font-mono text-xs text-on-surface-variant hover:text-white flex items-center gap-2 transition-colors"
            >
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-200">
            {execBlack && (
              <button
                type="button"
                ref={addToReveal}
                onClick={() => setView(execBlack.viewSlug)}
                className="md:col-span-8 glass-card rounded-2xl overflow-hidden relative group cursor-pointer h-100 md:h-full reveal-up text-left"
                style={{ transitionDelay: '0.1s' }}
              >
                <img
                  alt={execBlack.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  src={execBlack.cardImage || execBlack.image}
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="font-mono text-[10px] text-white/70 mb-2 block uppercase tracking-widest">Featured Specimen</span>
                  <h3 className="font-display text-2xl md:text-4xl text-white mb-4">{execBlack.title}</h3>
                  <div className="flex justify-between items-center">
                    <p className="font-body text-on-surface-variant text-sm md:text-base max-w-sm">{execBlack.shortDescription}</p>
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0 ml-4">
                      <span className="material-symbols-outlined">arrow_outward</span>
                    </div>
                  </div>
                </div>
              </button>
            )}

            <div className="md:col-span-4 flex flex-col gap-6 h-full">
              {roseGold && (
                <button
                  type="button"
                  ref={addToReveal}
                  onClick={() => setView(roseGold.viewSlug)}
                  className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-75 reveal-up text-left"
                  style={{ transitionDelay: '0.2s' }}
                >
                  <img
                    alt={roseGold.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                    src={roseGold.cardImage || roseGold.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1 block">{roseGold.collection}</span>
                    <h3 className="font-display text-xl md:text-2xl text-white mb-2">{roseGold.title}</h3>
                    <span className="text-xs font-mono uppercase text-on-surface-variant group-hover:text-white transition-colors flex items-center gap-1">
                      Explore <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                  </div>
                </button>
              )}

              {carbonRacer && (
                <button
                  type="button"
                  ref={addToReveal}
                  onClick={() => setView(carbonRacer.viewSlug)}
                  className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-75 reveal-up text-left"
                  style={{ transitionDelay: '0.3s' }}
                >
                  <img
                    alt={carbonRacer.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    src={carbonRacer.cardImage || carbonRacer.image}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1 block">{carbonRacer.collection}</span>
                    <h3 className="font-display text-xl md:text-2xl text-white mb-2">{carbonRacer.title}</h3>
                    <span className="text-xs font-mono uppercase text-on-surface-variant group-hover:text-white transition-colors flex items-center gap-1">
                      Explore <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                    </span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
