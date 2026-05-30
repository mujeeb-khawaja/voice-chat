import React, { useState } from 'react';

export default function CarbonRacer({ setView, openConcierge }) {
  const [btnText, setBtnText] = useState('Acquire');
  const [isAcquired, setIsAcquired] = useState(false);

  const handleAcquire = () => {
    setBtnText('Acquired');
    setIsAcquired(true);
    setTimeout(() => {
      setBtnText('Acquire');
      setIsAcquired(false);
    }, 2000);
  };

  return (
    <div className="w-full">
      <main className="w-full relative pt-24 md:pt-32">
        {/* Hero Section */}
        <section className="relative min-h-[800px] flex items-center px-6 md:px-16 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 w-full relative z-10">
            {/* Typography / Intro */}
            <div className="md:col-span-5 md:col-start-1 flex flex-col justify-center gap-8 relative z-20">
              <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-[#8e9192] uppercase tracking-[0.2em]">Ref. 994.CF.12</span>
                <h1 className="font-display text-5xl md:text-8xl text-white leading-tight uppercase">Carbon<br/>Racer</h1>
              </div>
              <p className="font-body text-lg text-[#c4c7c8] max-w-md">
                Forged in the crucible of motorsport engineering. A relentless pursuit of weight reduction meets unparalleled horological precision, encased in a pure carbon fiber monolith.
              </p>
              <div className="flex items-center gap-6 mt-8">
                <button 
                  onClick={handleAcquire}
                  className={`px-8 py-4 border border-white/20 text-white font-mono text-xs uppercase tracking-widest transition-all duration-500 rounded-none relative overflow-hidden group hover:border-white hover:bg-white hover:text-black ${isAcquired ? 'bg-white text-black' : ''}`}
                >
                  <span className="relative z-10">{btnText}</span>
                </button>
                <span className="font-mono text-sm text-[#c4c7c8]">$42,500</span>
              </div>
            </div>
            
            {/* Hero Imagery */}
            <div className="md:col-span-7 relative h-[500px] md:h-auto mt-12 md:mt-0 flex items-center justify-center group">
              {/* Atmospheric glow behind watch */}
              <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full mix-blend-screen opacity-50 transition-opacity duration-700 group-hover:opacity-80"></div>
              <img 
                alt="Carbon Racer Watch" 
                className="w-full h-[500px] object-contain object-center drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:-translate-y-4 relative z-10 mix-blend-lighten" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRy5fZHc2RQHYEWj9Qm89cbuN0VKQyuBR2eDrkBcplzJs-a3OkGURAkBKfpbs0DGBf4qkGbNHPFE0n0sfQjo3Eb2ZThNIW_EZpA36MbfVbTzxyNcSeNfcV-bruMzGA8DtZR--LTNKLOlttObs-EMuz7g0qYuVCrXg-FMkTH4S-D_B_osyT2fZL6BbaQG737sKvfLIdntj2RfShRh95_RCPffXofCTCnFP9sBoTz5NTpoNJ5fEMUEI6DtvMxtYJlUmY2DyyC_jIntK2"
              />
            </div>
          </div>
        </section>

        {/* Exploded View / Glassmorphism Overlay Section */}
        <section className="relative min-h-screen py-24 px-6 md:px-16 overflow-hidden border-t border-white/5 bg-black/30">
          {/* Deep Background Image */}
          <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity grayscale">
            <img 
              alt="Movement Background" 
              className="w-full h-full object-cover object-center" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPYedF1eVYSIfTbp1bB4IA_RLIlgHNAZUmb6gC0Ae0udFtxhi8qL-YMFGJlKr2Bq8T2qGI_14_4WKTatYJDi09WkQfEylKTHKWg--O3_Fwus9xmMojbeP_5Xy3FTrXJ_WpFLieTa1MGFe5SCIxh-NaZPuH0-wvMvEAkz8rL5hCd_PMG5iHUa_4X70n2cmm6T_Ga9WGSBGMrAU654leFWNml_s5U-lvKefuSR7Wsml4RodqvvOVF9odicW73zbyNZLk6Tn-v3m89ASJ"
            />
            <div className="absolute inset-0 bg-[#0e0e0e]/80"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
            <div className="md:col-span-4 flex flex-col justify-center">
              <h2 className="font-display text-4xl text-white mb-6">Calibre<br/>CR-X1</h2>
              <p className="font-body text-[#c4c7c8] mb-12 leading-relaxed">
                Visible through the sapphire crystal case back, the skeletonized movement reveals the beating heart of the racer. A column-wheel chronograph mechanism meticulously hand-finished with anglage and black DLC coating.
              </p>
              
              {/* Glass Interactive List */}
              <ul className="space-y-4">
                <li 
                  onClick={openConcierge}
                  className="glass-panel p-6 rounded-lg cursor-pointer hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">01 // Escapement</span>
                    <span className="material-symbols-outlined text-[#8e9192]">arrow_forward</span>
                  </div>
                </li>
                <li 
                  onClick={openConcierge}
                  className="glass-panel p-6 rounded-lg cursor-pointer hover:bg-white/10 transition-colors opacity-70 hover:opacity-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">02 // Mainspring Barrel</span>
                    <span className="material-symbols-outlined text-[#8e9192]">arrow_forward</span>
                  </div>
                </li>
                <li 
                  onClick={openConcierge}
                  className="glass-panel p-6 rounded-lg cursor-pointer hover:bg-white/10 transition-colors opacity-70 hover:opacity-100"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white">03 // Column Wheel</span>
                    <span className="material-symbols-outlined text-[#8e9192]">arrow_forward</span>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Glass Overlay Focus Area */}
            <div className="md:col-span-7 md:col-start-6 relative flex items-center justify-center mt-16 md:mt-0">
              <div className="w-full aspect-square md:aspect-video glass-panel rounded-xl flex items-center justify-center relative overflow-hidden group bg-black/20">
                {/* Simulated Focus Ring */}
                <div className="absolute w-[260px] h-[260px] border border-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-1000 ease-in-out">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0 transform -translate-y-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute bottom-0 transform translate-y-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute left-0 transform -translate-x-1/2"></div>
                  <div className="w-2 h-2 bg-white rounded-full absolute right-0 transform translate-x-1/2"></div>
                </div>
                {/* Technical Crosshairs */}
                <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
                  <div className="w-full h-[1px] bg-white/40"></div>
                  <div className="h-full w-[1px] bg-white/40 absolute"></div>
                </div>
                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-[#8e9192]">
                  MAG 4.5X // CR-X1
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs / Bento Grid */}
        <section className="py-24 px-6 md:px-16 bg-[#0e0e0e]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px] max-w-7xl mx-auto">
            {/* Bento Card 1: Tachymeter (Spans 2 columns on desktop) */}
            <div className="md:col-span-2 glass-panel rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute inset-0 z-0">
                <img 
                  alt="Tachymeter" 
                  className="w-full h-full object-cover object-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-screen" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Srbv-wqp54q9Lb_w8KO_XPla-uMFxPaFQx-QFqsbhFaNC8xAJ3vt550n8lwTu25hAvv1NusBtP0hZ8n27UqSWKxWEh6lA5FzCER294L3-E1bQB-wQyn8MStxDUV4MNJANGz1CKuzOqGFegG_L790L1GLbKyAcdEfQQ5WCfaa5gGz7uU9z1rG4SE577rt5XpJgklEUC9tDMPgrBi_IerOwhZokHNQOnWqcq6bL7FItwiyxi3Xia11RB39ff_s9GcPtxdiOM0jbIIg"
                />
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[32px] text-white mb-4 block">speed</span>
                <h3 className="font-display text-2xl md:text-3xl text-white">Tachymeter Scale</h3>
              </div>
              <div className="relative z-10 max-w-sm">
                <p className="font-body text-sm text-[#c4c7c8] leading-relaxed">
                  Engraved directly into the fixed carbon bezel, allowing for precise calculation of speed over a known distance. Essential for the track, designed for the wrist.
                </p>
              </div>
            </div>
            
            {/* Bento Card 2: Water Resistance */}
            <div className="glass-panel rounded-xl p-8 flex flex-col justify-between group overflow-hidden relative bg-black/20">
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 to-transparent">
                <img 
                  alt="Water" 
                  className="w-full h-full object-cover object-center opacity-20 group-hover:opacity-30 transition-opacity duration-700" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaAcbCqFHFRknUl12deHcA0VKolL09zU1sTFdn3b5_FldeSPSFYSkg5zjNIpThfV_UP2sqKdiqqesUrrgUWY1WnxwLtOC_JmvGRqBDY8uYRE5lL-FOOtq7yazui67p79r_8AWCUYIwVjzvjfUPFYByrfHGxQZBVBln_cWwg4usr6ri_1nmVT6kK7xitVaddvoJ6kHcDvEzxCcVC8JRnUlM6AYiNjKGDsoGchbdekSZpJiIczACzhoFxJj4Qyz0iDVff_Ejh_Xo6rDi"
                />
              </div>
              <div className="relative z-10">
                <span className="material-symbols-outlined text-[32px] text-white mb-4 block">water_drop</span>
                <h3 className="font-display text-2xl text-white">100m</h3>
                <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-wider block mt-2">Water Resistance</span>
              </div>
              <div className="relative z-10 mt-8">
                <p className="font-body text-xs text-[#c4c7c8]">
                  Screw-down crown with dual O-ring seals ensures integrity at depth.
                </p>
              </div>
            </div>
            
            {/* Bento Card 3: Carbon Material */}
            <div className="md:col-span-3 glass-panel rounded-xl p-8 min-h-[300px] flex flex-col md:flex-row items-center gap-12 group overflow-hidden relative bg-black/20">
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-[#131313]/50 opacity-50"></div>
              </div>
              <div className="md:w-1/3 relative z-10">
                <h3 className="font-display text-3xl text-white mb-4">Forged Carbon</h3>
                <p className="font-body text-[#c4c7c8] text-sm leading-relaxed">
                  Unlike woven carbon fiber, forged carbon utilizes chopped fibers compressed under immense pressure and heat. The result is a monolithic case structure that is uniquely patterned, lighter than titanium, and virtually indestructible.
                </p>
              </div>
              <div className="md:w-2/3 h-full relative z-10 overflow-hidden rounded-lg min-h-[200px]">
                <img 
                  alt="Forged Carbon Texture" 
                  className="w-full h-full object-cover object-center transform transition-transform duration-[2s] group-hover:scale-110" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsxxSiQU-D6j5KlvTJXvu7dUKbh3RCGo1K81V556O81Pa1CFStqs9G2Jqu6HxsxVam7DBTqXdrDs-ZYUHZ0PcAoID9LgeRY1VVZhAG18521ZFHyPtfJR3dc6HfP-vR8kQCKc464xL-ahQVkKfhFSC1Q9VzAki2PNJ6A5fVRU1Kmh6JcEAHPDZwnncHJMfmUATbuF_6hu8VXsziLGE8fKnlkwoHxnuCwsuyc2XCWrPnNeU2FSyDbSb7EXmf-11Rmyn-8qudsQulIbma"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
