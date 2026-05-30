import React, { useEffect, useRef } from 'react';

export default function AiConcierge1({ setView, openConcierge }) {
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-[#050505] z-0"></div>
        
        {/* Particles */}
        <div className="particle w-2 h-2 left-[20%] top-[30%] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="particle w-3 h-3 right-[25%] top-[40%] animate-pulse" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        <div className="particle w-1.5 h-1.5 left-[40%] bottom-[30%] animate-pulse" style={{ animationDuration: '9s', animationDelay: '2s' }}></div>
        
        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-20">
          <h1 className="font-display text-5xl md:text-8xl text-white glow-text mb-6 opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_forwards]">
            Time, Redefined.
          </h1>
          <p className="font-body text-lg md:text-xl text-[#c4c7c8] mb-12 max-w-2xl opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_0.3s_forwards]">
            Discover premium watches curated for every generation. Where traditional horological prestige meets futuristic digital craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 opacity-0 translate-y-10 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_0.6s_forwards]">
            <button 
              onClick={() => setView('mens-hub')}
              className="ghost-btn px-8 py-4 rounded-full font-mono text-xs uppercase text-white backdrop-blur-md"
            >
              Shop Collection
            </button>
            <button 
              onClick={openConcierge}
              className="px-8 py-4 rounded-full font-mono text-xs uppercase text-black bg-white hover:bg-white/80 transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">graphic_eq</span>
              Talk to AI Assistant
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-[fade-in-up_1.2s_cubic-bezier(0.4,0,0.2,1)_1s_forwards]">
          <span className="font-mono text-[10px] uppercase tracking-widest text-white">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </section>

      {/* Seamless Transition */}
      <div className="h-40 w-full bg-[#050505]"></div>

      {/* Collections Showcase (Bento Grid) */}
      <section className="py-24 px-6 md:px-16 bg-[#050505] relative z-10">
        <div className="max-w-7xl mx-auto">
          <div ref={addToReveal} className="flex justify-between items-end mb-16 reveal-up">
            <h2 className="font-display text-3xl md:text-5xl text-white">Curated Selections</h2>
            <button 
              onClick={() => setView('mens-hub')}
              className="font-mono text-xs text-[#c4c7c8] hover:text-white flex items-center gap-2 transition-colors"
            >
              View All <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[800px]">
            {/* Large Feature (Men's) */}
            <div 
              ref={addToReveal} 
              onClick={() => setView('executive-black')}
              className="md:col-span-8 glass-card rounded-2xl overflow-hidden relative group cursor-pointer h-[400px] md:h-full reveal-up"
              style={{ transitionDelay: '0.1s' }}
            >
              <img 
                alt="Men's Luxury Watch" 
                className="absolute inset-0 w-full h-full object-cover opacity-60" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ2gAY-XPVK-U84Gf2PR86ruaJCbc2rfoMygozdampHWmjVkv28F0DwjPLrBBScHfuctTZoe6TIloab-iQn9S7qlUkRKPknz5cvnCXyj_Av40BmFIaUoW5GLesTq4y-ucba3aBomllwhUpZnXGIgH2Yoe-0M4HSM1-WxutyAD5EH_PRhzYz_jjKU1soweKQImuIZtGenOdO3oliyJPZckM6WifdzxVtCWJBp7-f1bv9WNpyIffIXNH5TuEpj4lC41o6DypHMIEiUFR"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                <span className="font-mono text-[10px] text-white/70 mb-2 block uppercase tracking-widest">Featured Specimen</span>
                <h3 className="font-display text-2xl md:text-4xl text-white mb-4">Executive Black</h3>
                <div className="flex justify-between items-center">
                  <p className="font-body text-[#c4c7c8] text-sm md:text-base max-w-sm">Precision engineering meets boardroom authority. A masterclass in stealth luxury.</p>
                  <button className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all duration-300">
                    <span className="material-symbols-outlined">arrow_outward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Stacked Features */}
            <div className="md:col-span-4 flex flex-col gap-6 h-full">
              {/* Women's */}
              <div 
                ref={addToReveal}
                onClick={() => setView('rose-gold')}
                className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-[300px] reveal-up"
                style={{ transitionDelay: '0.2s' }}
              >
                <img 
                  alt="Women's Luxury Watch" 
                  className="absolute inset-0 w-full h-full object-cover opacity-60" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXPLLfPGpcjaEPddLp2xb8CRMZPtsmkd5PT6FrerDvaLJ29duBnBFzISeYoeYGuavLGI4wqeO0BiraabjwdBFPbZxx79uJfjMkTgTsbDIhvOJHsKj4kytBrWgIu7u58jFWPDGUDhfQ__vzI3hOrmz3qxXDHzTPmc6tcBInwE7llbAclxU8iq7X7iQZtswW-342ERKqzgkkGMKGRs1O-kMFvhoZ34b7lZaCfF4rnMu97rSW2b3sWuE7tGPzZ0vwYiu6ndUtTvIIzFWj"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1 block">Rose Gold Collection</span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-2">Rose Gold Essence</h3>
                  <button className="text-xs font-mono uppercase text-[#c4c7c8] group-hover:text-white transition-colors flex items-center gap-1">
                    Explore <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>

              {/* Kids/Sport */}
              <div 
                ref={addToReveal}
                onClick={() => setView('carbon-racer')}
                className="glass-card rounded-2xl overflow-hidden relative group cursor-pointer flex-1 min-h-[300px] reveal-up"
                style={{ transitionDelay: '0.3s' }}
              >
                <img 
                  alt="Sport Watch" 
                  className="absolute inset-0 w-full h-full object-cover opacity-50" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5fAs73FaLgwpflzFrPP2c7SJ1Ts6AdpOPzMCtwxt_Lp-aGn-wwkjSyY5z8NzlM39NytqhKlrOhznqkI0qY2KLRDkUixaZH4lVRKBpmEX8tZ1ZeHkJyKrQG-L5abnETod9xnBxwr-YwlkEI9Ub_jhAe1-9tjhvB-x1O2p9ferh0miwbtq5uAajydPSy-zq8k6hubJWLarEcgIPo05U0IZb0ojGMnKTgw-7KNCoXcP1tGOAhApURg3h-hwLtSpvP_decNwLpuHro9KS"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-700 group-hover:opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/70 mb-1 block">Velocity Series</span>
                  <h3 className="font-display text-xl md:text-2xl text-white mb-2">Carbon Racer</h3>
                  <button className="text-xs font-mono uppercase text-[#c4c7c8] group-hover:text-white transition-colors flex items-center gap-1">
                    Explore <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
